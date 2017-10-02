import express from 'express';
import * as TaskControllers from '../controllers/task';

const router = express.Router();

router.post('/task-create', TaskControllers.create);
router.get('/task-getall', TaskControllers.getAll);

export default router;