import { Router } from 'express';
import SaleController from './SaleController.js';

const router = new Router();

router.post('/', SaleController.create);
router.get('/', SaleController.getAll);
router.get('/:id', SaleController.getOne);
router.put('/:id', SaleController.update);
router.delete('/:id', SaleController.delete);

export default router;
