import { Router } from 'express';
import StatusController from './StatusController.js';

const router = new Router();

router.post('/', StatusController.create);
router.get('/', StatusController.getAll);
router.get('/:id', StatusController.getOne);
router.put('/:id', StatusController.update);
router.delete('/:id', StatusController.delete);

export default router;
