import saleService from './SaleService.js';

class SaleController {
  async create(req, res) {
    try {
      const sale = await saleService.create(req.body);
      return res.json(sale);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const sales = await saleService.getAll();
      return res.json(sales);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const sale = await saleService.getOne(req.params.id);
      if (!sale) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(sale);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const sale = await saleService.update(req.params.id, req.body);
      if (!sale) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(sale);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const sale = await saleService.delete(req.params.id);
      if (!sale) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(sale);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new SaleController();
