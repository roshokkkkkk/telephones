import { Router } from 'express';
import AuthController from './AuthController.js';

const router = new Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export default router;
