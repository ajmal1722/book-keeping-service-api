import express from 'express';
const router = express();
import {
    getBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/booksController.js';

router.get('/', getBooks);

router.get('/:id', getSingleBook);

router.post('/', createBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router