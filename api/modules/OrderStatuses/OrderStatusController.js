import orderStatusService from './OrderStatusService.js';

class OrderStatusController {
  async create(req, res) {
    try {
      const orderStatus = await orderStatusService.create(req.body);
      return res.json(orderStatus);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const orderStatuses = await orderStatusService.getAll();
      return res.json(orderStatuses);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const orderStatus = await orderStatusService.getOne(req.params.id);
      if (!orderStatus) {
        return res.status(404).json({ message: '\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e' });
      }

      return res.json(orderStatus);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const orderStatus = await orderStatusService.update(req.params.id, req.body);
      if (!orderStatus) {
        return res.status(404).json({ message: '\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e' });
      }

      return res.json(orderStatus);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const orderStatus = await orderStatusService.delete(req.params.id);
      if (!orderStatus) {
        return res.status(404).json({ message: '\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e' });
      }

      return res.json(orderStatus);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new OrderStatusController();
