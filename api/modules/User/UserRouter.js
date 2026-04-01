import { Router } from 'express';
import UserController from './UserController.js';

const router = new Router();
router.post('/', UserController.create);
router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
