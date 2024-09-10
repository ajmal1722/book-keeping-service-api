import express from 'express';
const router = express();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    getBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/booksController.js';
import upload from '../config/multer.js';

// Middleware for authorization
router.use(verifyAccessToken);

router.get('/', getBooks);

router.get('/:id', getSingleBook);

router.post('/', upload.single('image'), createBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router