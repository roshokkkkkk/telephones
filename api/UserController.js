import userService from './UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await userService.create(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const user = await userService.getOne(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await userService.delete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new UserController();
