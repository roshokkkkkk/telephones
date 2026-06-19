import OrderStatus from './OrderStatus.js';

class OrderStatusService {
  async create(data) {
    const { orderId, statusId } = data || {};
    if (!orderId || !statusId) {
      const error = new Error('orderId \u0438 statusId \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u044b');
      error.status = 400;
      throw error;
    }

    return OrderStatus.create(data);
  }

  async getAll() {
    return OrderStatus.find().populate('orderId').populate('statusId');
  }

  async getOne(id) {
    return OrderStatus.findById(id).populate('orderId').populate('statusId');
  }

  async update(id, data) {
    return OrderStatus.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('orderId')
      .populate('statusId');
  }

  async delete(id) {
    return OrderStatus.findByIdAndDelete(id);
  }
}

export default new OrderStatusService();
