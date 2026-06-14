import orderService from './OrderService.js';

class OrderController {
  async create(req, res) {
    try {
      const order = await orderService.create(req.body);
      return res.json(order);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const orders = await orderService.getAll();
      return res.json(orders);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const order = await orderService.getOne(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(order);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const order = await orderService.updateStatus(req.params.id, req.body.status);
      if (!order) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(order);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const order = await orderService.delete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(order);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new OrderController();
