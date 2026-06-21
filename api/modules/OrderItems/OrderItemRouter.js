import { Router } from 'express';
import OrderItemController from './OrderItemController.js';

const router = new Router();

router.post('/', OrderItemController.create);
router.get('/', OrderItemController.getAll);
router.get('/:id', OrderItemController.getOne);
router.put('/:id', OrderItemController.update);
router.delete('/:id', OrderItemController.delete);

export default router;
