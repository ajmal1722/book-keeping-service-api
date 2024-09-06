import express from 'express';
const router = express();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import { borrowBook } from '../controllers/borrowingController.js';

// Auth middleware
router.use(verifyAccessToken);

router.post('/borrow', borrowBook);

export default router;