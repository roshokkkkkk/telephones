import { Router } from 'express';
import InventoryController from './InventoryController.js';

const router = new Router();
router.get('/', InventoryController.getAll);
router.get('/:productId', InventoryController.getByProduct);
router.post('/', InventoryController.setQuantity);
router.patch('/:productId', InventoryController.setQuantity);

export default router;
