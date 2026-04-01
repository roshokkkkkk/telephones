import { Router } from 'express';
import ProductCharacteristicController from './ProductCharacteristicController.js';

const router = new Router();
router.post('/', ProductCharacteristicController.create);
router.get('/', ProductCharacteristicController.getAll);
router.get('/:id', ProductCharacteristicController.getOne);
router.put('/:id', ProductCharacteristicController.update);
router.delete('/:id', ProductCharacteristicController.delete);

export default router;
