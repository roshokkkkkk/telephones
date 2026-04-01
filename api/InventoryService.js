import Inventory from './Inventory.js';

class InventoryService {
  async getAll() {
    return Inventory.find().populate('productId');
  }

  async getByProductId(productId) {
    return Inventory.findOne({ productId }).populate('productId');
  }

  async setQuantity(productId, quantity) {
    return Inventory.findOneAndUpdate(
      { productId },
      { $set: { quantity } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).populate('productId');
  }
}

export default new InventoryService();
