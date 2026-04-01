import productService from './ProductService.js';

class ProductController {
  async create(req, res) {
    try {
      const file = req.files?.image || req.files?.picture || null;
      const product = await productService.create(req.body, file);
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const product = await productService.getOne(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const product = await productService.delete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async uploadImage(req, res) {
    try {
      const file = req.files?.image || req.files?.picture || null;
      const product = await productService.setImage(req.params.id, file);
      if (!product) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(product);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new ProductController();
