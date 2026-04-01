import { Router } from 'express';
import RoleController from './RoleController.js';

const router = new Router();
router.post('/', RoleController.create);
router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getOne);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

export default router;
