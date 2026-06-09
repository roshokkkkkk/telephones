import { Router } from 'express';
import CartController from './CartController.js';

const router = new Router();

router.get('/', CartController.getAll);
router.post('/items', CartController.addItem);
router.patch('/items/:id', CartController.updateItem);
router.delete('/items/:id', CartController.deleteItem);
router.delete('/', CartController.clear);

export default router;
