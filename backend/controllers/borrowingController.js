import User from "../models/userSchema.js";
import Library from "../models/librarySchema.js";
import createError from "../utils/error.js";

export const borrowBook = async (req, res, next) => {
    try {
        const { libraryId, bookId } = req.body; 
        const userId = req.user.id; // Assuming the user is authenticated and user ID is available

        // Validate input
        if (!libraryId || !bookId) {
            return next(createError(req.t('LIBRARY_BOOK_ID_REQUIRED'), 400)); // Library ID and Book ID are required
        }

        // Find the library by ID
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError(req.t('LIBRARY_NOT_FOUND'), 404)); // Library not found
        }

        // Find the inventory item in the library for the given book
        const inventoryItem = library.inventory.find(item => item.bookId.equals(bookId));
        if (!inventoryItem) {
            return next(createError(req.t('BOOK_NOT_FOUND_IN_INVENTORY'), 404)); // Book not found in inventory
        }

        // Check if the book is already borrowed
        if (!inventoryItem.isAvailable) {
            return next(createError(req.t('BOOK_ALREADY_BORROWED'), 400)); // Book is already borrowed
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(req.t('USER_NOT_FOUND'), 404)); // User not found
        }

        // Check if the user has the 'borrower' role, and add it if not
        if (!user.roles.includes('borrower')) {
            user.roles.push('borrower');
            await user.save();
        }

        // Update inventory status to borrowed
        inventoryItem.isAvailable = false;
        inventoryItem.borrower = userId;
        inventoryItem.borrowedAt = new Date();

        // Save the updated library to the database
        await library.save();

        // Update the user's borrowed books list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { borrowedBooks: bookId }
        });

        res.status(200).json({
            message: req.t('BOOK_BORROWED_SUCCESSFULLY'),
            book: {
                id: bookId,
                borrower: {
                    id: userId,
                    name: user.name,
                    email: user.email
                },
                charge: inventoryItem.charge,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const returnBook = async (req, res, next) => {
    try {
        const { libraryId } = req.body; // Assume the request includes the library ID
        const bookId = req.params.id; // Book ID to be returned
        const userId = req.user.id; // Assuming the user is authenticated and user ID is available

        // Validate input
        if (!libraryId || !bookId) {
            return next(createError(req.t('LIBRARY_BOOK_ID_REQUIRED'), 400)); // Library ID and Book ID are required
        }

        // Find the library by ID
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError(req.t('LIBRARY_NOT_FOUND'), 404)); // Library not found
        }

        // Find the inventory item in the library for the given book
        const inventoryItem = library.inventory.find(item => item.bookId.equals(bookId));
        if (!inventoryItem) {
            return next(createError(req.t('BOOK_NOT_FOUND_IN_INVENTORY'), 404)); // Book not found in inventory
        }

        // Check if the book is already available
        if (inventoryItem.isAvailable) {
            return next(createError(req.t('BOOK_NOT_BORROWED'), 400)); // Book is not borrowed
        }

        // Check if the user returning the book is the one who borrowed it
        if (!inventoryItem.borrower.equals(userId)) {
            return next(createError(req.t('BOOK_NOT_BORROWED_BY_USER'), 403)); // Forbidden
        }

        // Update inventory status to available
        inventoryItem.isAvailable = true;
        inventoryItem.borrower = null;
        inventoryItem.borrowedAt = null;

        // Save the updated library to the database
        await library.save();

        // Remove the book from the user's borrowed books list
        await User.findByIdAndUpdate(userId, {
            $pull: { borrowedBooks: bookId }
        });

        res.status(200).json({
            message: req.t('BOOK_RETURNED_SUCCESSFULLY'),
            book: {
                id: bookId,
                libraryId: library._id,
            },
        });
    } catch (error) {
        next(error);
    }
};