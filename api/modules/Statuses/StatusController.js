import statusService from './StatusService.js';

class StatusController {
  async create(req, res) {
    try {
      const status = await statusService.create(req.body);
      return res.json(status);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const statuses = await statusService.getAll();
      return res.json(statuses);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const status = await statusService.getOne(req.params.id);
      if (!status) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(status);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const status = await statusService.update(req.params.id, req.body);
      if (!status) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(status);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const status = await statusService.delete(req.params.id);
      if (!status) {
        return res.status(404).json({ message: 'Не найдено' });
      }

      return res.json(status);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new StatusController();
