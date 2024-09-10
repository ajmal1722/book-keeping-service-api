import mongoose from "mongoose";
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
        const book = await Book.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId.createFromHexString(bookId)
                }
            },
            {
                $lookup: {
                    from: 'users', // Name of the collection
                    localField: 'author', // Local field (author ID) in the Book collection
                    foreignField: '_id', // Foreign field in the Author collection
                    as: 'author_details' // Output array containing the author details
                }
            },
            {
                $unwind: {
                    path: '$author_details',
                }
            },
            {
                $lookup: {
                    from: 'libraries', // Name of the Library collection
                    let: { bookId: '$_id' }, // Reference the book ID
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ['$$bookId', '$inventory.bookId'], // Match the book ID within the inventory array
                                },
                            },
                        },
                        {
                            $unwind: '$inventory', // Unwind the inventory array to get each inventory item
                        },
                        {
                            $match: {
                                'inventory.bookId': mongoose.Types.ObjectId.createFromHexString(bookId) // Ensure the inventory item matches the book ID
                            }
                        },
                        {
                            $lookup: {
                                from: 'users', // Name of the User (Borrower) collection
                                localField: 'inventory.borrower', // Local field (borrower ID) in the inventory
                                foreignField: '_id', // Foreign field in the User collection
                                as: 'inventory.borrower_details' // Output array containing the borrower details
                            }
                        },
                        {
                            $unwind: {
                                path: '$inventory.borrower_details', // Unwind the borrower details array
                                preserveNullAndEmptyArrays: true, // Allow for no borrower details
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                'inventory.bookId': 1,
                                'inventory.isAvailable': 1,
                                'inventory.borrower': 1,
                                'inventory.borrower_details': 1 // Include borrower details
                            }
                        }
                    ],
                    as: 'library_details' // Output array containing the library details
                }
            },
            {
                $unwind: {
                    path: '$library_details',
                    preserveNullAndEmptyArrays: true // Allow for libraries without any inventory
                }
            },
            {
                $group: {
                    _id: '$_id',
                    title: { $first: '$title' },
                    isAvailable: { $first: '$isAvailable' },
                    createdAt: { $first: '$createdAt' },
                    author_details: { // Fetch a single author object
                        $first: {
                            _id: '$author_details._id',
                            name: '$author_details.name',
                            email: '$author_details.email'
                        }
                    },
                    library_details: { // Collect all library details as objects
                        $push: {
                            _id: '$library_details._id',
                            name: '$library_details.name',
                            inventory: {
                                isAvailable: '$library_details.inventory.isAvailable',
                                borrower_details: {
                                    _id: '$library_details.inventory.borrower_details._id',
                                    name: '$library_details.inventory.borrower_details.name',
                                    email: '$library_details.inventory.borrower_details.email'
                                }
                            }
                        }
                    },
                }
            },
        ]);

        // Check if the book exists
        if (!book.length) {
            return next(createError('Book not found', 404)); // Not Found
        }

        res.status(200).json({ book: book[0] });
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        const authorId = req.user.id;
        const { title } = req.body;
        
        if (!title.trim()) {
            return next(createError('Title is required', 400));
        }

        // Check if the title exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return next(createError('Book with same title is already exists', 409))
        }

        // Check if the author exists
        const author = await User.findById(authorId);
        if (!author) {
            return next(createError('Author not found', 404)); // Not Found
        }

        // Create a new book
        const newBook = new Book({
            title: title.trim(), // Trim whitespace
            author: author._id, // Reference to the author's ID
        });

        // Save the new book to the database
        await newBook.save();

        // Check and add "author" role if not already present
        if (!author.roles.includes('author')) {
            author.roles.push('author');
            await author.save(); // Save the user with updated roles
        }

        // Update the author's booksWritten list
        if (!author.booksWritten.includes(newBook._id)) {
            author.booksWritten.push(newBook._id);
            await author.save(); // Save the updated author
        }

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
        const bookId = req.params.id;
        const userId = req.user.id;

        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return next(createError('Book not found', 404)); // Book not found
        }
        
        // Check if the user is the author of the book
        if (book.author.toString() !== userId) { // Converted ObjectId to string 
            return next(createError('You do not have permission. Only author can update the book', 403)); // Forbidden
        }

        // Validate input data for updates
        const { title } = req.body;
        if (!title) {
            return next(createError('Title is required', 400)); // Bad Request
        }

        // Update the book with new data
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title: title.trim() }, // Only update provided fields
            { new: true, runValidators: true } // Return updated document and run schema validators
        );

        res.status(200).json({ 
            message: 'Book updated successfully', 
            book: { 
                id: updatedBook._id, 
                title: updatedBook.title, 
                author: updatedBook.author, 
                updatedAt: updatedBook.updatedAt 
            } 
        });
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;

        // Find the book by ID
        const book = await Book.findById(bookId);
        if (!book) {
            return next(createError('Book not found', 404)); // Book not found
        }

        // Find the author by ID
        const author = await User.findById(book.author);
        if (!author) {
            return next(createError('Author not found', 404)); // Not Found
        }
        
        // Check if the user is the author of the book
        if (book.author.toString() !== userId) { // Converted ObjectId to string 
            return next(createError('You do not have permission. Only author can delete the book', 403)); // Forbidden
        }

        // Delete the book
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return next(createError('Failed to delete the book', 500)); // Internal Server Error
        }

        // Remove the book from the author's booksWritten list
        author.booksWritten = author.booksWritten.filter(bookId => !bookId.equals(book._id));
        await author.save();

        res.status(200).json({ 
            message: 'Book deleted successfully', 
            bookId: bookId 
        });
    } catch (error) {
        next(error)
    }
}