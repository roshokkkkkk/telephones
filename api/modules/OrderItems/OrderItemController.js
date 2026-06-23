import orderItemService from './OrderItemService.js';

class OrderItemController {
  async create(req, res) {
    try {
      console.log('Creating order item with data:', req.body);
      const item = await orderItemService.create(req.body);
      return res.json(item);
    } catch (error) {
      console.error('Error creating order item:', error);
      return res.status(error.status || 500).json({ 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  async getAll(req, res) {
    try {
      const items = await orderItemService.getAll();
      return res.json(items);
    } catch (error) {
      console.error('Error getting order items:', error);
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const item = await orderItemService.getOne(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Элемент заказа не найден' });
      }
      return res.json(item);
    } catch (error) {
      console.error('Error getting order item:', error);
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const item = await orderItemService.update(req.params.id, req.body);
      return res.json(item);
    } catch (error) {
      console.error('Error updating order item:', error);
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const item = await orderItemService.delete(req.params.id);
      return res.json(item);
    } catch (error) {
      console.error('Error deleting order item:', error);
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new OrderItemController();