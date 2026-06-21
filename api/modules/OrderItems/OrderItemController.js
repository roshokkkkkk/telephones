import orderItemService from './OrderItemService.js';

class OrderItemController {
  async create(req, res) {
    try {
      const item = await orderItemService.create(req.body);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await orderItemService.getAll();
      return res.json(items);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const item = await orderItemService.getOne(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await orderItemService.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const item = await orderItemService.delete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new OrderItemController();
