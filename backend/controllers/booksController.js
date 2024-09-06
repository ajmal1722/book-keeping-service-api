import Book from "../models/bookSchema.js";
import User from "../models/userSchema.js";
import createError from "../utils/error.js";

export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();

        res.status(200).json({ books })
    } catch (error) {
        next(error);
    }
}

export const getSingleBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        // Check if the provided ID is valid
        if (!bookId) {
            return next(createError('Book ID is required', 400));
        }

        // Fetch the book from the database by ID
        const book = await Book.findById(bookId);

        // Check if the book exists
        if (!book) {
            return next(createError('Book not found', 404)); // Not Found
        }

        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        const authorId = req.user.id;
        const { title } = req.body;
        
        if (!title) {
            return next(createError('Title is required', 400));
        }

        // Check if the author exists
        const author = await User.findById(authorId);
        if (!author) {
            return next(createError('Author not found', 404)); // Not Found
        }

        // Check and add "author" role if not already present
        if (!author.roles.includes('author')) {
            author.roles.push('author');
            await author.save(); // Save the user with updated roles
        }

        // Create a new book
        const newBook = new Book({
            title: title.trim(), // Trim whitespace
            author: author._id, // Reference to the author's ID
        });

        // Save the new book to the database
        await newBook.save();

        res.status(201).json({ 
            message: 'Book created successfully', 
            book: { 
                id: newBook._id, 
                title: newBook.title, 
                author: author.name, 
                createdAt: newBook.createdAt 
            } 
        });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Success update book' })
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Success delete book' })
    } catch (error) {
        next(error)
    }
}
