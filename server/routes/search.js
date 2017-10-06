import express from 'express';
import {getUser} from '../controllers/search';

const router = express.Router();

router.get('/user/:name', getUser);

export default router;