import mongoose from "mongoose";
import Book from "../models/bookSchema.js";
import User from "../models/userSchema.js";
import createError from "../utils/error.js";
import bucket from "../config/firbaseConfig.js";

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
            return next(createError(req.t('BOOK_ID_REQUIRED'), 400)); // Book ID is required
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
                    coverImage: { $first: '$imageUrl' },
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
            return next(createError(req.t('BOOK_NOT_FOUND'), 404)); // Not Found
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
        const file = req.file;
        
        if (!title?.trim()) {
            return next(createError(req.t('TITLE_REQUIRED'), 400));
        }

        if (!file) {
            return next(createError(req.t('IMAGE_REQUIRED'), 400));
        }
    
        // Check if the title exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return next(createError(req.t('BOOK_EXISTS'), 409));
        }
    
        // Check if the author exists
        const author = await User.findById(authorId);
        if (!author) {
            return next(createError(req.t('AUTHOR_NOT_FOUND'), 404)); // Not Found
        }
    
        // Handle image file upload 
        let imageUrl = '';
        if (file) {
            // Upload the image to Firebase Storage
            const blob = bucket.file(`book-images/${Date.now()}_${file.originalname}`);
            const blobStream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
  
        blobStream.on('error', (err) => {
            console.error('Upload error:', err); // Log detailed error
            return next(createError(req.t('UPLOAD_FAILED'), 500));
        });
  
        blobStream.on('finish', async () => {
            // Construct a public URL for the uploaded image
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    
            // Create a new book with the image URL
            const newBook = new Book({
                title: title.trim(), // Trim whitespace
                author: author._id, // Reference to the author's ID
                imageUrl, // Set the image URL
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
                message: req.t('BOOK_CREATED_SUCCESS'),
                book: {
                id: newBook._id,
                title: newBook.title,
                author: author.name,
                imageUrl: newBook.imageUrl,
                createdAt: newBook.createdAt,
                },
            });
        });
  
            // Pipe the file data into the blobStream
            blobStream.end(file.buffer);
        } else {
            return next(createError('Image file is required', 400));
        }
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
            return next(createError(req.t('BOOK_NOT_FOUND'), 404)); // Book not found
        }
        
        // Check if the user is the author of the book
        if (book.author.toString() !== userId) { // Converted ObjectId to string 
            return next(createError(req.t('PERMISSION_DENIED'), 403)); // Forbidden
        }

        // Handle cover image upload
        let imageUrl = book.imageUrl; // Retain existing image URL if no new image is uploaded
        if (req.file) {
            const file = req.file;
            
            // Upload the new image to Firebase Storage
            const blob = bucket.file(`book-images/${Date.now()}_${file.originalname}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                console.error('Upload error:', err); // Log detailed error
                return next(createError(req.t('UPLOAD_FAILED'), 500)); // Image upload failed
            });

            blobStream.on('finish', async () => {
                // Construct a public URL for the uploaded image
                imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                // Update the book with new data
                const updatedBook = await Book.findByIdAndUpdate(
                    bookId,
                    { title: req.body.title.trim(), imageUrl }, // Update title and imageUrl
                    { new: true, runValidators: true } // Return updated document and run schema validators
                );

                res.status(200).json({ 
                    message: req.t('BOOK_UPDATED_SUCCESS'), 
                    book: { 
                        id: updatedBook._id, 
                        title: updatedBook.title, 
                        author: updatedBook.author, 
                        imageUrl: updatedBook.imageUrl,
                        updatedAt: updatedBook.updatedAt 
                    } 
                });
            });

            // Pipe the file data into the blobStream
            blobStream.end(req.file.buffer);
        } else {
            // Update the book with new data (excluding imageUrl)
            const updatedBook = await Book.findByIdAndUpdate(
                bookId,
                { title: req.body.title.trim() }, // Only update title
                { new: true, runValidators: true } // Return updated document and run schema validators
            );

            res.status(200).json({ 
                message: req.t('BOOK_UPDATED_SUCCESS'), 
                book: { 
                    id: updatedBook._id, 
                    title: updatedBook.title, 
                    author: updatedBook.author, 
                    imageUrl: updatedBook.imageUrl,
                    updatedAt: updatedBook.updatedAt 
                } 
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;

        // Find the book by ID
        const book = await Book.findById(bookId);
        if (!book) {
            return next(createError(req.t('BOOK_NOT_FOUND'), 404)); // Book not found
        }

        // Find the author by ID
        const author = await User.findById(book.author);
        if (!author) {
            return next(createError(req.t('AUTHOR_NOT_FOUND'), 404)); // Not Found
        }
        
        // Check if the user is the author of the book
        if (book.author.toString() !== userId) { // Converted ObjectId to string 
            return next(createError(req.t('PERMISSION_DENIED'), 403)); // Forbidden
        }

        // Delete the book
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return next(createError(req.t('DELETE_FAILED'), 500)); // Internal Server Error
        }

        // Remove the book from the author's booksWritten list
        author.booksWritten = author.booksWritten.filter(bookId => !bookId.equals(book._id));
        await author.save();

        res.status(200).json({ 
            message: req.t('DELETE_SUCCESS'),
            bookId: bookId 
        });
    } catch (error) {
        next(error)
    }
}