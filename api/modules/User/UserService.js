import bcrypt from 'bcryptjs';
import User from './User.js';

function sanitizeUser(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  return obj;
}

class UserService {
  async create(data) {
    const { email, phone, password } = data;
    if (!email || !password) {
      const error = new Error('email и пароль обязательны');
      error.status = 400;
      throw error;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      const error = new Error('email уже существует');
      error.status = 400;
      throw error;
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        const error = new Error('телефон уже существует');
        error.status = 400;
        throw error;
      }
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...data, password: hash });
    return sanitizeUser(user);
  }

  async getAll() {
    return User.find().select('-password');
  }

  async getOne(id) {
    return User.findById(id).select('-password');
  }

  async update(id, data) {
    if (data.email) {
      const existing = await User.findOne({ email: data.email, _id: { $ne: id } });
      if (existing) {
        const error = new Error('email уже существует');
        error.status = 400;
        throw error;
      }
    }

    if (data.phone) {
      const existingPhone = await User.findOne({ phone: data.phone, _id: { $ne: id } });
      if (existingPhone) {
        const error = new Error('телефон уже существует');
        error.status = 400;
        throw error;
      }
    }

    const payload = { ...data };
    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return sanitizeUser(user);
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return sanitizeUser(user);
  }
}

export default new UserService();

