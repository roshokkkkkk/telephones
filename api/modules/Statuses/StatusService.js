import Status from './Status.js';

class StatusService {
  async create(data) {
    if (!data?.name) {
      const error = new Error('name обязателен');
      error.status = 400;
      throw error;
    }

    const existing = await Status.findOne({ name: data.name });
    if (existing) {
      const error = new Error('статус уже существует');
      error.status = 400;
      throw error;
    }

    return Status.create({ name: data.name });
  }

  async getAll() {
    return Status.find();
  }

  async getOne(id) {
    return Status.findById(id);
  }

  async update(id, data) {
    if (data?.name) {
      const existing = await Status.findOne({ name: data.name, _id: { $ne: id } });
      if (existing) {
        const error = new Error('статус уже существует');
        error.status = 400;
        throw error;
      }
    }

    return Status.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Status.findByIdAndDelete(id);
  }
}

export default new StatusService();
