import inventoryService from './InventoryService.js';

class InventoryController {
  async getAll(req, res) {
    try {
      const items = await inventoryService.getAll();
      return res.json(items);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getByProduct(req, res) {
    try {
      const item = await inventoryService.getByProductId(req.params.productId);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async setQuantity(req, res) {
    try {
      const productId = req.params.productId || req.body.productId;
      const qty = Number(req.body.quantity);
      if (!productId || !Number.isFinite(qty) || qty < 0) {
        return res.status(400).json({ message: 'productId and valid quantity are required' });
      }
      const item = await inventoryService.setQuantity(productId, qty);
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new InventoryController();
