import Order from './Order.js';
import Cart from '../Cart/Cart.js';
import inventoryService from '../Inventory/InventoryService.js';

class OrderService {
  async create(data) {
    const { userId, addressId } = data || {};
    if (!userId || !addressId) {
      const error = new Error('userId \u0438 addressId \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b');
      error.status = 400;
      throw error;
    }

    const cartItems = await Cart.find({ userId }).populate('productId');
    if (!cartItems.length) {
      const error = new Error('\u043a\u043e\u0440\u0437\u0438\u043d\u0430 \u043f\u0443\u0441\u0442\u0430');
      error.status = 400;
      throw error;
    }

    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = item.productId;
      if (!product) {
        const error = new Error('\u0442\u043e\u0432\u0430\u0440 \u0438\u0437 \u043a\u043e\u0440\u0437\u0438\u043d\u044b \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d');
        error.status = 400;
        throw error;
      }

      const inventory = await inventoryService.getByProductId(product._id);
      const availableQty = inventory?.quantity || 0;
      if (availableQty < item.quantity) {
        const error = new Error('\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0442\u043e\u0432\u0430\u0440\u0430 \u043d\u0430 \u0441\u043a\u043b\u0430\u0434\u0435');
        error.status = 400;
        throw error;
      }

      total += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      userId,
      addressId,
      items: orderItems,
      status: data.status || 'created',
      total,
    });

    for (const item of cartItems) {
      const inventory = await inventoryService.getByProductId(item.productId._id);
      const currentQty = inventory?.quantity || 0;
      await inventoryService.setQuantity(item.productId._id, currentQty - item.quantity);
    }

    await Cart.deleteMany({ userId });
    return order;
  }

  async getAll() {
    return Order.find().populate('userId').populate('addressId').populate('items.productId');
  }

  async getOne(id) {
    return Order.findById(id).populate('userId').populate('addressId').populate('items.productId');
  }

  async updateStatus(id, status) {
    if (!status) {
      const error = new Error('status \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u0435\u043d');
      error.status = 400;
      throw error;
    }

    return Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
  }

  async delete(id) {
    return Order.findByIdAndDelete(id);
  }
}

export default new OrderService();
