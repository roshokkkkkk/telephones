import RoleUser from './RoleUser.js';

class RoleUserService {
  async create(data) {
    const { roleId, userId } = data || {};
    if (!roleId || !userId) {
      const error = new Error('roleId and userId are required');
      error.status = 400;
      throw error;
    }

    const existing = await RoleUser.findOne({ roleId, userId });
    if (existing) {
      const error = new Error('role already assigned to user');
      error.status = 400;
      throw error;
    }

    return RoleUser.create({ roleId, userId });
  }

  async getAll() {
    return RoleUser.find().populate('roleId').populate('userId');
  }

  async getOne(id) {
    return RoleUser.findById(id).populate('roleId').populate('userId');
  }

  async update(id, data) {
    const { roleId, userId } = data || {};
    if (!roleId || !userId) {
      const error = new Error('roleId and userId are required');
      error.status = 400;
      throw error;
    }

    const existing = await RoleUser.findOne({ roleId, userId, _id: { $ne: id } });
    if (existing) {
      const error = new Error('role already assigned to user');
      error.status = 400;
      throw error;
    }

    return RoleUser.findByIdAndUpdate(id, { roleId, userId }, { new: true, runValidators: true });
  }

  async delete(id) {
    return RoleUser.findByIdAndDelete(id);
  }
}

export default new RoleUserService();
