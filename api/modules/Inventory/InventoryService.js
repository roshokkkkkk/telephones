import Inventory from './Inventory.js';

class InventoryService {
  async getAll() {
    return Inventory.find().populate('productId');
  }

  async getByProductId(productId) {
    return Inventory.findOne({ productId }).populate('productId');
  }

  async setQuantity(productId, quantity) {
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 0) {
      const error = new Error('quantity должна быть 0 или больше');
      error.status = 400;
      throw error;
    }

    return Inventory.findOneAndUpdate(
      { productId },
      { $set: { quantity: qty } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate('productId');
  }

  async increase(productId, quantity) {
    const qty = Number(quantity);
    if (!productId || !Number.isFinite(qty) || qty <= 0) {
      const error = new Error('productId и quantity обязательны');
      error.status = 400;
      throw error;
    }

    return Inventory.findOneAndUpdate(
      { productId },
      { $inc: { quantity: qty } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate('productId');
  }

  async decrease(productId, quantity) {
    const qty = Number(quantity);
    if (!productId || !Number.isFinite(qty) || qty <= 0) {
      const error = new Error('productId и quantity обязательны');
      error.status = 400;
      throw error;
    }

    const updated = await Inventory.findOneAndUpdate(
      { productId, quantity: { $gte: qty } },
      { $inc: { quantity: -qty } },
      { new: true, runValidators: true }
    ).populate('productId');

    if (!updated) {
      const error = new Error('недостаточно товара на складе');
      error.status = 400;
      throw error;
    }

    return updated;
  }
}

export default new InventoryService();
