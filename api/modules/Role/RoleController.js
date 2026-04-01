import roleService from './RoleService.js';

class RoleController {
  async create(req, res) {
    try {
      const role = await roleService.create(req.body);
      return res.json(role);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const roles = await roleService.getAll();
      return res.json(roles);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const role = await roleService.getOne(req.params.id);
      if (!role) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(role);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const role = await roleService.update(req.params.id, req.body);
      if (!role) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(role);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const role = await roleService.delete(req.params.id);
      if (!role) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(role);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new RoleController();
