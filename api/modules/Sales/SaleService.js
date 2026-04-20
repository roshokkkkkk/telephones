import Sale from './Sale.js';
import inventoryService from '../Inventory/InventoryService.js';

class SaleService {
  async create(data) {
    const { productId, quantity } = data || {};
    const qty = Number(quantity);
    if (!productId || !Number.isFinite(qty) || qty <= 0) {
      const error = new Error('productId и quantity обязательны');
      error.status = 400;
      throw error;
    }

    const current = await inventoryService.getByProductId(productId);
    const currentQty = current?.quantity || 0;

    if (currentQty < qty) {
      const error = new Error('недостаточно товара на складе');
      error.status = 400;
      throw error;
    }

    const sale = await Sale.create({ ...data, quantity: qty });
    await inventoryService.setQuantity(productId, currentQty - qty);
    return sale;
  }

  async getAll() {
    return Sale.find().populate('productId');
  }

  async getOne(id) {
    return Sale.findById(id).populate('productId');
  }

  async update(id, data) {
    return Sale.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Sale.findByIdAndDelete(id);
  }
}

export default new SaleService();
