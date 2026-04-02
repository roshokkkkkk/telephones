import { Router } from 'express';
import authRouter from './modules/Auth/AuthRouter.js';
import userRouter from './modules/User/UserRouter.js';
import roleRouter from './modules/Role/RoleRouter.js';
import roleUserRouter from './modules/RoleUser/RoleUserRouter.js';
import addressRouter from './modules/Address/AddressRouter.js';
import productRouter from './modules/Product/ProductRouter.js';
import characteristicRouter from './modules/Characteristic/CharacteristicRouter.js';
import productCharacteristicRouter from './modules/ProductCharacteristic/ProductCharacteristicRouter.js';
import inventoryRouter from './modules/Inventory/InventoryRouter.js';
import postRouter from './modules/Post/PostRouter.js';
import supplyRouter from './modules/Supplies/SupplyRouter.js';

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/role-users', roleUserRouter);
router.use('/addresses', addressRouter);
router.use('/products', productRouter);
router.use('/characteristics', characteristicRouter);
router.use('/product-characteristics', productCharacteristicRouter);
router.use('/inventory', inventoryRouter);
router.use('/posts', postRouter);
router.use('/supplies', supplyRouter);

export default router;
