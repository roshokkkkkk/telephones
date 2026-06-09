import Cart from './Cart.js';
import inventoryService from '../Inventory/InventoryService.js';

class CartService {
  async getAll(userId) {
    if (!userId) {
      const error = new Error('userId обязателен');
      error.status = 400;
      throw error;
    }

    return Cart.find({ userId }).populate('productId').populate('userId');
  }

  async addItem(data) {
    const { productId, userId, quantity } = data || {};
    const qty = Number(quantity);

    if (!productId || !userId || !Number.isFinite(qty) || qty <= 0) {
      const error = new Error('productId, userId и quantity обязательны');
      error.status = 400;
      throw error;
    }

    const inventory = await inventoryService.getByProductId(productId);
    const availableQty = inventory?.quantity || 0;

    if (availableQty < qty) {
      const error = new Error('недостаточно товара на складе');
      error.status = 400;
      throw error;
    }

    const existingItem = await Cart.findOne({ productId, userId });
    if (existingItem) {
      const newQty = existingItem.quantity + qty;
      if (availableQty < newQty) {
        const error = new Error('недостаточно товара на складе');
        error.status = 400;
        throw error;
      }

      existingItem.quantity = newQty;
      await existingItem.save();
      return existingItem.populate('productId userId');
    }

    const item = await Cart.create({ productId, userId, quantity: qty });
    return item.populate('productId userId');
  }

  async updateItem(id, data) {
    const qty = Number(data?.quantity);

    if (!Number.isFinite(qty) || qty <= 0) {
      const error = new Error('quantity обязательна');
      error.status = 400;
      throw error;
    }

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return null;
    }

    const inventory = await inventoryService.getByProductId(cartItem.productId);
    const availableQty = inventory?.quantity || 0;

    if (availableQty < qty) {
      const error = new Error('недостаточно товара на складе');
      error.status = 400;
      throw error;
    }

    cartItem.quantity = qty;
    await cartItem.save();
    return cartItem.populate('productId userId');
  }

  async deleteItem(id) {
    return Cart.findByIdAndDelete(id);
  }

  async clear(userId) {
    if (!userId) {
      const error = new Error('userId обязателен');
      error.status = 400;
      throw error;
    }

    const result = await Cart.deleteMany({ userId });
    return { deletedCount: result.deletedCount };
  }
}

export default new CartService();
