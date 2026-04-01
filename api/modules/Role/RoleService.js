import Role from './Role.js';

class RoleService {
  async create(data) {
    if (!data?.name) {
      const error = new Error('название обязательно');
      error.status = 400;
      throw error;
    }

    const existing = await Role.findOne({ name: data.name });
    if (existing) {
      const error = new Error('роль уже существует');
      error.status = 400;
      throw error;
    }

    return Role.create({ name: data.name });
  }

  async getAll() {
    return Role.find();
  }

  async getOne(id) {
    return Role.findById(id);
  }

  async update(id, data) {
    if (data?.name) {
      const existing = await Role.findOne({ name: data.name, _id: { $ne: id } });
      if (existing) {
        const error = new Error('роль уже существует');
        error.status = 400;
        throw error;
      }
    }

    return Role.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Role.findByIdAndDelete(id);
  }
}

export default new RoleService();

