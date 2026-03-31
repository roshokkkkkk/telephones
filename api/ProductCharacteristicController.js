import productCharacteristicService from './ProductCharacteristicService.js';

class ProductCharacteristicController {
  async create(req, res) {
    try {
      const item = await productCharacteristicService.create(req.body);
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await productCharacteristicService.getAll();
      return res.json(items);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const item = await productCharacteristicService.getOne(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await productCharacteristicService.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const item = await productCharacteristicService.delete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new ProductCharacteristicController();
