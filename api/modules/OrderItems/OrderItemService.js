import Order from '../Orders/Order.js';
import Product from '../Product/Product.js'; // Добавьте импорт

function recalculateTotal(order) {
  order.total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function mapOrderItem(order, item) {
  return {
    orderId: order._id,
    ...item.toObject(),
  };
}

class OrderItemService {
  async create(data) {
    const { orderId, productId, quantity, price } = data || {};
    const qty = Number(quantity);
    const itemPrice = Number(price);

    // Валидация
    if (!orderId || !productId || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(itemPrice) || itemPrice < 0) {
      const error = new Error('orderId, productId, quantity и price обязательны');
      error.status = 400;
      throw error;
    }

    // Проверяем существование заказа
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error('Заказ не найден');
      error.status = 404;
      throw error;
    }

    // Проверяем существование продукта
    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Продукт не найден');
      error.status = 404;
      throw error;
    }

    // Проверяем, не существует ли уже такой товар в заказе
    const existingItem = order.items.find(item => 
      item.productId.toString() === productId.toString()
    );
    
    if (existingItem) {
      // Если товар уже есть, обновляем количество
      existingItem.quantity += qty;
      existingItem.price = itemPrice; // Или оставляем старую цену
    } else {
      // Добавляем новый товар
      order.items.push({ productId, quantity: qty, price: itemPrice });
    }

    recalculateTotal(order);
    await order.save();
    await order.populate('items.productId');

    // Находим добавленный/обновленный элемент
    const createdItem = order.items.find(item => 
      item.productId._id.toString() === productId.toString()
    );
    
    return mapOrderItem(order, createdItem);
  }

  async getAll() {
    const orders = await Order.find().populate('items.productId');
    return orders.flatMap((order) => 
      order.items.map((item) => mapOrderItem(order, item))
    );
  }

  async getOne(id) {
    const order = await Order.findOne({ 'items._id': id }).populate('items.productId');
    if (!order) {
      return null;
    }

    const item = order.items.id(id);
    if (!item) {
      return null;
    }

    return mapOrderItem(order, item);
  }

  async update(id, data) {
    const order = await Order.findOne({ 'items._id': id });
    if (!order) {
      const error = new Error('Элемент заказа не найден');
      error.status = 404;
      throw error;
    }

    const item = order.items.id(id);
    if (!item) {
      const error = new Error('Элемент заказа не найден');
      error.status = 404;
      throw error;
    }

    // Проверка продукта при обновлении
    if (data.productId) {
      const product = await Product.findById(data.productId);
      if (!product) {
        const error = new Error('Продукт не найден');
        error.status = 404;
        throw error;
      }
      item.productId = data.productId;
    }

    if (data.quantity !== undefined) {
      const qty = Number(data.quantity);
      if (!Number.isFinite(qty) || qty <= 0) {
        const error = new Error('quantity должна быть больше 0');
        error.status = 400;
        throw error;
      }
      item.quantity = qty;
    }

    if (data.price !== undefined) {
      const itemPrice = Number(data.price);
      if (!Number.isFinite(itemPrice) || itemPrice < 0) {
        const error = new Error('price должен быть 0 или больше');
        error.status = 400;
        throw error;
      }
      item.price = itemPrice;
    }

    recalculateTotal(order);
    await order.save();
    await order.populate('items.productId');

    // Находим обновленный элемент
    const updatedItem = order.items.id(id);
    return mapOrderItem(order, updatedItem);
  }

  async delete(id) {
    const order = await Order.findOne({ 'items._id': id });
    if (!order) {
      const error = new Error('Элемент заказа не найден');
      error.status = 404;
      throw error;
    }

    const item = order.items.id(id);
    if (!item) {
      const error = new Error('Элемент заказа не найден');
      error.status = 404;
      throw error;
    }

    const deletedItem = mapOrderItem(order, item);
    item.deleteOne();
    recalculateTotal(order);
    await order.save();

    return deletedItem;
  }
}

export default new OrderItemService();