import User from "../models/userSchema.js";
import Book from "../models/bookSchema.js";
import Library from "../models/librarySchema.js";
import createError from "../utils/error.js";

export const borrowBook = async (req, res, next) => {
    try {
        const { libraryId, bookId } = req.body; 
        const userId = req.user.id; // Assuming the user is authenticated and user ID is available

        // Validate input
        if (!libraryId || !bookId) {
            return next(createError('Library ID and Book ID are required', 400));
        }

        // Find the library by ID
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError('Library not found', 404)); // Library not found
        }

        // Find the inventory item in the library for the given book
        const inventoryItem = library.inventory.find(item => item.bookId.equals(bookId));
        if (!inventoryItem) {
            return next(createError('Book not found in this library inventory', 404)); // Book not found in inventory
        }

        // Check if the book is already borrowed
        if (!inventoryItem.isAvailable) {
            return next(createError('Book is already borrowed', 400)); // Bad Request
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // User not found
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

        // update the user's borrowed books list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { borrowedBooks: bookId }
        });

        res.status(200).json({
            message: 'Book borrowed successfully',
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