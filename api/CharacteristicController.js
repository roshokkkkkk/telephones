import characteristicService from './CharacteristicService.js';

class CharacteristicController {
  async create(req, res) {
    try {
      const characteristic = await characteristicService.create(req.body);
      return res.json(characteristic);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const characteristics = await characteristicService.getAll();
      return res.json(characteristics);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const characteristic = await characteristicService.getOne(req.params.id);
      if (!characteristic) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(characteristic);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const characteristic = await characteristicService.update(req.params.id, req.body);
      if (!characteristic) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(characteristic);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const characteristic = await characteristicService.delete(req.params.id);
      if (!characteristic) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(characteristic);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new CharacteristicController();
