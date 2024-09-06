import express from 'express';
const router = express();
import {
    userCreate,
    userLogin,
} from '../controllers/userController.js';

router.post('/register', userCreate);

router.post('/login', userLogin);

export default router