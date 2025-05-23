import { Router } from 'express';
import fieldController from './field.controller';

const router = Router();
router.post('/', fieldController.create);
router.get('/', fieldController.getAll);
router.get('/:id', fieldController.getById);
router.put('/:id', fieldController.update);
router.delete('/:id', fieldController.remove);
router.delete('/soft/:id', fieldController.softDelete);
router.patch('/restore/:id', fieldController.restore);
router.get('/active', fieldController.getActive);
export default router;