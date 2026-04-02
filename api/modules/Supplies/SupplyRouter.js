import { Router } from 'express';
import SupplyController from './SupplyController.js';

const router = new Router();

router.post('/', SupplyController.create);
router.get('/', SupplyController.getAll);
router.get('/:id', SupplyController.getOne);
router.put('/:id', SupplyController.update);
router.delete('/:id', SupplyController.delete);

export default router;
