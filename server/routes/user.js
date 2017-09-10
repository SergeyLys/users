import express from 'express';
import * as UserController from '../controllers/user';

const router = express.Router();

router.get('/current-user', UserController.getCurrentUser);
router.put('/change-info', UserController.changeUserInfo);
router.get('/user-list', UserController.getAllUsers);
router.put('/user-banned', UserController.banUser);

export default router;