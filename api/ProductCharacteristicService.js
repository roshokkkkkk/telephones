import ProductCharacteristic from './ProductCharacteristic.js';

class ProductCharacteristicService {
  async create(data) {
    const { productId, characteristicId, value } = data || {};
    if (!productId || !characteristicId || !value) {
      const error = new Error('productId, characteristicId, value are required');
      error.status = 400;
      throw error;
    }

    const existing = await ProductCharacteristic.findOne({ productId, characteristicId });
    if (existing) {
      const error = new Error('product characteristic already exists');
      error.status = 400;
      throw error;
    }

    return ProductCharacteristic.create({ productId, characteristicId, value });
  }

  async getAll() {
    return ProductCharacteristic.find().populate('productId').populate('characteristicId');
  }

  async getOne(id) {
    return ProductCharacteristic.findById(id).populate('productId').populate('characteristicId');
  }

  async update(id, data) {
    const { productId, characteristicId, value } = data || {};
    if (!productId || !characteristicId || !value) {
      const error = new Error('productId, characteristicId, value are required');
      error.status = 400;
      throw error;
    }

    const existing = await ProductCharacteristic.findOne({ productId, characteristicId, _id: { $ne: id } });
    if (existing) {
      const error = new Error('product characteristic already exists');
      error.status = 400;
      throw error;
    }

    return ProductCharacteristic.findByIdAndUpdate(
      id,
      { productId, characteristicId, value },
      { new: true, runValidators: true }
    ).populate('productId').populate('characteristicId');
  }

  async delete(id) {
    return ProductCharacteristic.findByIdAndDelete(id);
  }
}

export default new ProductCharacteristicService();
