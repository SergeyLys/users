import express from 'express';
import * as Auth from '../controllers/auth';

const router = express.Router();

router.post('/signup', Auth.signup);
router.post('/signin', Auth.signin);

export default router;