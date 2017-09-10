import express from 'express';
import * as UserController from '../controllers/user';

const router = express.Router();

router.post('/submit-image', UserController.uploadImage);

export default router;