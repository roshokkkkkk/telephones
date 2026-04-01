import { Router } from 'express';
import ProductController from './ProductController.js';

const router = new Router();
router.post('/', ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.post('/:id/image', ProductController.uploadImage);

export default router;
