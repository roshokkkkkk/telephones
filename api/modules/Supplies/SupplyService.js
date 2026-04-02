import Supply from './Supply.js';
import inventoryService from '../Inventory/InventoryService.js';

class SupplyService {
  async create(data) {
    const { productId, quantity } = data || {};
    const qty = Number(quantity);
    if (!productId || !Number.isFinite(qty) || qty <= 0) {
      const error = new Error('productId и quantity обязательны');
      error.status = 400;
      throw error;
    }

    const supply = await Supply.create({ ...data, quantity: qty });
    const current = await inventoryService.getByProductId(productId);
    const currentQty = current?.quantity || 0;
    await inventoryService.setQuantity(productId, currentQty + qty);
    return supply;
  }

  async getAll() {
    return Supply.find().populate('productId');
  }

  async getOne(id) {
    return Supply.findById(id).populate('productId');
  }

  async update(id, data) {
    return Supply.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Supply.findByIdAndDelete(id);
  }
}

export default new SupplyService();
