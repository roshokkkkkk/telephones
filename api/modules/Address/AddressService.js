import Address from './Address.js';

class AddressService {
  async create(data) {
    const { city, street, house, userId } = data || {};
    if (!city || !street || !house || !userId) {
      const error = new Error('город, улица, дом и userId обязательны');
      error.status = 400;
      throw error;
    }
    return Address.create(data);
  }

  async getAll() {
    return Address.find().populate('userId');
  }

  async getOne(id) {
    return Address.findById(id).populate('userId');
  }

  async update(id, data) {
    return Address.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('userId');
  }

  async delete(id) {
    return Address.findByIdAndDelete(id);
  }
}

export default new AddressService();

