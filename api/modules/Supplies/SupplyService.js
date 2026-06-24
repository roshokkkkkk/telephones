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
    await inventoryService.increase(productId, qty);
    return supply;
  }

  async getAll() {
    return Supply.find().populate('productId');
  }

  async getOne(id) {
    return Supply.findById(id).populate('productId');
  }

  async update(id, data) {
    const supply = await Supply.findById(id);
    if (!supply) {
      return null;
    }

    const oldProductId = supply.productId.toString();
    const oldQty = supply.quantity;
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
        await inventoryService.increase(newProductId, diff);
      }
      if (diff < 0) {
        await inventoryService.decrease(newProductId, Math.abs(diff));
      }
    } else {
      await inventoryService.decrease(oldProductId, oldQty);
      try {
        await inventoryService.increase(newProductId, newQty);
      } catch (error) {
        await inventoryService.increase(oldProductId, oldQty);
        throw error;
      }
    }

    Object.assign(supply, { ...data, productId: newProductId, quantity: newQty });
    await supply.save();
    return supply.populate('productId');
  }

  async delete(id) {
    const supply = await Supply.findByIdAndDelete(id);
    if (supply) {
      await inventoryService.decrease(supply.productId, supply.quantity);
    }

    return supply;
  }
}

export default new SupplyService();
