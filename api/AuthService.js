import bcrypt from 'bcryptjs';
import User from './User.js';

function sanitizeUser(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
}

class AuthService {
  async register(data) {
    const { email, phone, password } = data;
    if (!email || !password) {
      const error = new Error('email and password are required');
      error.status = 400;
      throw error;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const error = new Error('email already exists');
      error.status = 400;
      throw error;
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        const error = new Error('phone already exists');
        error.status = 400;
        throw error;
      }
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...data, password: hash });
    return sanitizeUser(user);
  }

  async login({ email, phone, password }) {
    if (!password || (!email && !phone)) {
      const error = new Error('email or phone and password are required');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne(email ? { email } : { phone });
    if (!user) {
      const error = new Error('invalid credentials');
      error.status = 400;
      throw error;
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      const error = new Error('invalid credentials');
      error.status = 400;
      throw error;
    }

    return sanitizeUser(user);
  }
}

export default new AuthService();
