import express from 'express';
const router = express();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import { borrowBook, returnBook } from '../controllers/borrowingController.js';

// Auth middleware
router.use(verifyAccessToken);

router.post('/borrow', borrowBook);

router.put('/return/:id', returnBook);

export default router;