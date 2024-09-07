import express from 'express';
const router = express();
import verifyAccessToken from '../middlewares/authMiddleware.js';
import {
    getLibraries,
    getSingleLibrary,
    createLibrary,
    updateLibrary,
    deleteLibrary,
} from '../controllers/libraryController.js';

// Auth middleware
router.use(verifyAccessToken);

router.get('/', getLibraries);

router.get('/:id', getSingleLibrary);

router.post('/', createLibrary);

router.put('/:id', updateLibrary);

router.delete('/:id', deleteLibrary);

export default router;