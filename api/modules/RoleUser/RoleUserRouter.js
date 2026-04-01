import { Router } from 'express';
import RoleUserController from './RoleUserController.js';

const router = new Router();
router.post('/', RoleUserController.create);
router.get('/', RoleUserController.getAll);
router.get('/:id', RoleUserController.getOne);
router.put('/:id', RoleUserController.update);
router.delete('/:id', RoleUserController.delete);

export default router;
