import cartService from './CartService.js';

class CartController {
  async getAll(req, res) {
    try {
      const items = await cartService.getAll(req.query.userId);
      return res.json(items);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async addItem(req, res) {
    try {
      const item = await cartService.addItem(req.body);
      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateItem(req, res) {
    try {
      const item = await cartService.updateItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async deleteItem(req, res) {
    try {
      const item = await cartService.deleteItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(item);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async clear(req, res) {
    try {
      const result = await cartService.clear(req.query.userId);
      return res.json(result);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new CartController();
