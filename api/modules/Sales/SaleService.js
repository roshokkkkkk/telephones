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

    await inventoryService.decrease(productId, qty);
    return Sale.create({ ...data, quantity: qty });
  }

  async getAll() {
    return Sale.find().populate('productId');
  }

  async getOne(id) {
    return Sale.findById(id).populate('productId');
  }

  async update(id, data) {
    const sale = await Sale.findById(id);
    if (!sale) {
      return null;
    }

    const oldProductId = sale.productId.toString();
    const oldQty = sale.quantity;
    const newProductId = data.productId || oldProductId;
    const newQty = data.quantity === undefined ? oldQty : Number(data.quantity);

    if (!Number.isFinite(newQty) || newQty <= 0) {
      const error = new Error('quantity должна быть больше 0');
      error.status = 400;
      throw error;
    }

    if (oldProductId === newProductId) {
      const diff = newQty - oldQty;
      if (diff > 0) {
        await inventoryService.decrease(newProductId, diff);
      }
      if (diff < 0) {
        await inventoryService.increase(newProductId, Math.abs(diff));
      }
    } else {
      await inventoryService.increase(oldProductId, oldQty);
      try {
        await inventoryService.decrease(newProductId, newQty);
      } catch (error) {
        await inventoryService.decrease(oldProductId, oldQty);
        throw error;
      }
    }

    Object.assign(sale, { ...data, productId: newProductId, quantity: newQty });
    await sale.save();
    return sale.populate('productId');
  }

  async delete(id) {
    const sale = await Sale.findByIdAndDelete(id);
    if (sale) {
      await inventoryService.increase(sale.productId, sale.quantity);
    }

    return sale;
  }
}

export default new SaleService();
