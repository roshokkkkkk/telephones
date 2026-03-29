import addressService from './AddressService.js';

class AddressController {
  async create(req, res) {
    try {
      const address = await addressService.create(req.body);
      return res.json(address);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const addresses = await addressService.getAll();
      return res.json(addresses);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async getOne(req, res) {
    try {
      const address = await addressService.getOne(req.params.id);
      if (!address) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(address);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const address = await addressService.update(req.params.id, req.body);
      if (!address) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(address);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const address = await addressService.delete(req.params.id);
      if (!address) {
        return res.status(404).json({ message: 'Not found' });
      }
      return res.json(address);
    } catch (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new AddressController();
