
import { Router } from 'express';
import formsController from '../controllers/forms.controller';

const router = Router();

router.post('/', formsController.create);
router.get('/', formsController.getAll);
//router.get('/deleted', formsController.getDeleted);
router.get('/token/:token', formsController.getByToken);
router.get('/:id', formsController.getById);
 router.put('/:id', formsController.update);
 router.delete('/:id', formsController.softDelete);
 router.patch('/:id/restore', formsController.restore);

export default router;
