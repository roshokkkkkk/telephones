import roleUserService from './RoleUserService.js';

class RoleUserController {
  async create(req, res) {
    try {
      const roleUser = await roleUserService.create(req.body);
      return res.json(roleUser);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const roleUsers = await roleUserService.getAll();
      return res.json(roleUsers);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const roleUser = await roleUserService.getOne(req.params.id);
      if (!roleUser) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(roleUser);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const roleUser = await roleUserService.update(req.params.id, req.body);
      if (!roleUser) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(roleUser);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const roleUser = await roleUserService.delete(req.params.id);
      if (!roleUser) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(roleUser);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new RoleUserController();
