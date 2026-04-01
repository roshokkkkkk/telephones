import authService from './AuthService.js';

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const user = await authService.login(req.body);
      return res.json(user);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new AuthController();
