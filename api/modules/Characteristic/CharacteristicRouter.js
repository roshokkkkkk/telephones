import { Router } from 'express';
import CharacteristicController from './CharacteristicController.js';

const router = new Router();
router.post('/', CharacteristicController.create);
router.get('/', CharacteristicController.getAll);
router.get('/:id', CharacteristicController.getOne);
router.put('/:id', CharacteristicController.update);
router.delete('/:id', CharacteristicController.delete);

export default router;
