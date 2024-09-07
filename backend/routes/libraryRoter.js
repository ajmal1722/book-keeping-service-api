import express from 'express';
const router = express();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    getLibraries,
    getSingleLibrary,
    createLibrary,
    updateLibrary,
    deleteLibrary,
    getBooksFromLibrary,
    addBookToInventory,
    removeBookFromInventory
} from '../controllers/libraryController.js';

// Auth middleware
router.use(verifyAccessToken);

router.get('/', getLibraries);

router.get('/:id', getSingleLibrary);

router.post('/', createLibrary);

router.put('/:id', updateLibrary);

router.delete('/:id', deleteLibrary);


// Library Inventory


router.get('/:id/inventory', getBooksFromLibrary);

router.post('/:id/inventory', addBookToInventory);

router.delete('/:id/inventory/:bookId', removeBookFromInventory);

export default router;