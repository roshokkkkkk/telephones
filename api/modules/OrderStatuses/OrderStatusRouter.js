import { Router } from 'express';
import OrderStatusController from './OrderStatusController.js';

const router = new Router();

router.post('/', OrderStatusController.create);
router.get('/', OrderStatusController.getAll);
router.get('/:id', OrderStatusController.getOne);
router.put('/:id', OrderStatusController.update);
router.delete('/:id', OrderStatusController.delete);

export default router;
