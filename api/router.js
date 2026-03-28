import { Router } from 'express';
import AuthController from './AuthController.js';
import UserController from './UserController.js';
import RoleController from './RoleController.js';
import RoleUserController from './RoleUserController.js';

const router = new Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.post('/users', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOne);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.post('/roles', RoleController.create);
router.get('/roles', RoleController.getAll);
router.get('/roles/:id', RoleController.getOne);
router.put('/roles/:id', RoleController.update);
router.delete('/roles/:id', RoleController.delete);

router.post('/role-users', RoleUserController.create);
router.get('/role-users', RoleUserController.getAll);
router.get('/role-users/:id', RoleUserController.getOne);
router.put('/role-users/:id', RoleUserController.update);
router.delete('/role-users/:id', RoleUserController.delete);

export default router;
