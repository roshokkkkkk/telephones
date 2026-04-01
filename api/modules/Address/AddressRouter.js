import { Router } from 'express';
import AddressController from './AddressController.js';

const router = new Router();
router.post('/', AddressController.create);
router.get('/', AddressController.getAll);
router.get('/:id', AddressController.getOne);
router.put('/:id', AddressController.update);
router.delete('/:id', AddressController.delete);

export default router;
