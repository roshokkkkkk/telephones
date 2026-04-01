import Characteristic from './Characteristic.js';

class CharacteristicService {
  async create(data) {
    if (!data?.name) {
      const error = new Error('название обязательно');
      error.status = 400;
      throw error;
    }

    const existing = await Characteristic.findOne({ name: data.name });
    if (existing) {
      const error = new Error('характеристика уже существует');
      error.status = 400;
      throw error;
    }

    return Characteristic.create({ name: data.name });
  }

  async getAll() {
    return Characteristic.find();
  }

  async getOne(id) {
    return Characteristic.findById(id);
  }

  async update(id, data) {
    if (data?.name) {
      const existing = await Characteristic.findOne({ name: data.name, _id: { $ne: id } });
      if (existing) {
        const error = new Error('характеристика уже существует');
        error.status = 400;
        throw error;
      }
    }

    return Characteristic.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Characteristic.findByIdAndDelete(id);
  }
}

export default new CharacteristicService();

