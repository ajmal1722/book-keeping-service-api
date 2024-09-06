import User from "../models/userSchema.js";
import Book from "../models/bookSchema.js";
import createError from "../utils/error.js";

export const borrowBook = async (req, res, next) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id; // Assuming the user is authenticated and user ID is available

        // Validate book ID
        if (!bookId) {
            return next(createError('Book ID is required', 400));
        }

        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return next(createError('Book not found', 404)); // Book not found
        }

        // Check if the book is already borrowed
        if (book.isAvailable === false) {
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

        // Update book status to borrowed
        book.isAvailable = false;
        book.borrower = userId;
        book.borrowedAt = new Date();

        // Handle charges
        const charge = book.charge || 0;

        // Save the updated book to the database
        await book.save();

        // Optionally update the user's borrowed books list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { borrowedBooks: book._id }
        });

        res.status(200).json({
            message: 'Book borrowed successfully',
            book: {
                id: book._id,
                title: book.title,
                borrower: userId,
                charge: charge,
            },
        });
    } catch (error) {
        next(error);
    }
};