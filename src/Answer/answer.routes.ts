import {Router} from 'express';
import answerController from './answer.controller';

const router = Router();
router.post('/', answerController.create);
router.get('/', answerController.getAll);  
router.get('/:id', answerController.getById);
router.get('/active', answerController.getActive);
router.put('/:id', answerController.update);
router.delete('/:id', answerController.remove);
router.delete('/soft/:id', answerController.softDelete);
router.patch('/restore/:id', answerController.restore);
export default router;