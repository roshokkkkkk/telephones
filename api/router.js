import { Router } from 'express';
import AuthController from './AuthController.js';
import UserController from './UserController.js';
import RoleController from './RoleController.js';
import RoleUserController from './RoleUserController.js';
import AddressController from './AddressController.js';
import ProductController from './ProductController.js';
import CharacteristicController from './CharacteristicController.js';

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

router.post('/addresses', AddressController.create);
router.get('/addresses', AddressController.getAll);
router.get('/addresses/:id', AddressController.getOne);
router.put('/addresses/:id', AddressController.update);
router.delete('/addresses/:id', AddressController.delete);

router.post('/products', ProductController.create);
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getOne);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);
router.post('/products/:id/image', ProductController.uploadImage);

router.post('/characteristics', CharacteristicController.create);
router.get('/characteristics', CharacteristicController.getAll);
router.get('/characteristics/:id', CharacteristicController.getOne);
router.put('/characteristics/:id', CharacteristicController.update);
router.delete('/characteristics/:id', CharacteristicController.delete);

export default router;
