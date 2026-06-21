import Order from '../Orders/Order.js';

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

    if (!orderId || !productId || !Number.isFinite(qty) || qty <= 0 || !Number.isFinite(itemPrice) || itemPrice < 0) {
      const error = new Error('orderId, productId, quantity и price обязательны');
      error.status = 400;
      throw error;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return null;
    }

    order.items.push({ productId, quantity: qty, price: itemPrice });
    recalculateTotal(order);
    await order.save();

    const createdItem = order.items[order.items.length - 1];
    return mapOrderItem(order, createdItem);
  }

  async getAll() {
    const orders = await Order.find().populate('items.productId');
    return orders.flatMap((order) => order.items.map((item) => mapOrderItem(order, item)));
  }

  async getOne(id) {
    const order = await Order.findOne({ 'items._id': id }).populate('items.productId');
    if (!order) {
      return null;
    }

    const item = order.items.id(id);
    return item ? mapOrderItem(order, item) : null;
  }

  async update(id, data) {
    const order = await Order.findOne({ 'items._id': id });
    if (!order) {
      return null;
    }

    const item = order.items.id(id);
    if (!item) {
      return null;
    }

    if (data.productId) {
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

    return mapOrderItem(order, item);
  }

  async delete(id) {
    const order = await Order.findOne({ 'items._id': id });
    if (!order) {
      return null;
    }

    const item = order.items.id(id);
    if (!item) {
      return null;
    }

    const deletedItem = mapOrderItem(order, item);
    item.deleteOne();
    recalculateTotal(order);
    await order.save();

    return deletedItem;
  }
}

export default new OrderItemService();
