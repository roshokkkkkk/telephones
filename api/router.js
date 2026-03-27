import { Router } from 'express';
import AuthController from './AuthController.js';
import UserController from './UserController.js';

const router = new Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.post('/users', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOne);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;
