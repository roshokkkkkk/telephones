import supplyService from './SupplyService.js';

class SupplyController {
  async create(req, res) {
    try {
      const supply = await supplyService.create(req.body);
      return res.json(supply);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const supplies = await supplyService.getAll();
      return res.json(supplies);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const supply = await supplyService.getOne(req.params.id);
      if (!supply) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(supply);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const supply = await supplyService.update(req.params.id, req.body);
      if (!supply) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(supply);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const supply = await supplyService.delete(req.params.id);
      if (!supply) {
        return res.status(404).json({ message: 'Не найдено' });
      }
      return res.json(supply);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new SupplyController();
