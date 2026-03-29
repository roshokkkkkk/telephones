import Product from './Product.js';
import fileService from './fileService.js';

class ProductService {
  async create(data, file) {
    const { name, price } = data || {};
    if (!name || price === undefined) {
      const error = new Error('name and price are required');
      error.status = 400;
      throw error;
    }

    const payload = { ...data };
    if (file) {
      const fileName = fileService.saveFile(file);
      payload.image = fileName;
    }

    return Product.create(payload);
  }

  async getAll() {
    return Product.find();
  }

  async getOne(id) {
    return Product.findById(id);
  }

  async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }

  async setImage(id, file) {
    if (!file) {
      const error = new Error('image file is required');
      error.status = 400;
      throw error;
    }
    const fileName = fileService.saveFile(file);
    return Product.findByIdAndUpdate(id, { image: fileName }, { new: true });
  }
}

export default new ProductService();
