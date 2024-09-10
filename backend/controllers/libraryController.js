import Library from "../models/librarySchema.js";
import User from "../models/userSchema.js";
import Book from "../models/bookSchema.js";
import createError from "../utils/error.js";
import mongoose from "mongoose";

export const getLibraries = async (req, res, next) => {
    try {
        // Fetch libraries
        const libraries = await Library.find();

        // If no libraries are found
        if (libraries.length === 0) {
            return res.status(404).json({ message: 'No libraries found' });
        }

        res.status(200).json({ libraries });
    } catch (error) {
        next(error);
    }
}

export const getSingleLibrary = async (req, res, next) => {
    try {
        const libraryId = req.params.id;

        // Validate input
        if (!libraryId) {
            return next(createError('Library ID is required', 400)); // Bad Request
        }

        const libraryDetails = await Library.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(libraryId)
                }
            },
            {
                $unwind: {
                    path: '$inventory',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'inventory.bookId',
                    foreignField: '_id',
                    as: 'book_details'
                }
            },
            {
                $unwind: {
                    path: '$book_details',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'inventory.borrower',
                    foreignField: '_id',
                    as: 'borrower_details'
                }
            },
            {
                $unwind: {
                    path: '$borrower_details',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    createdAt: { $first: '$createdAt' },
                    inventory: {
                        $push: {
                            book_details: {
                                bookId: '$book_details._id',
                                title: '$book_details.title',
                                charge: '$inventory.charge',
                                isAvailable: '$inventory.isAvailable',
                                borrower_details: {
                                    _id: '$borrower_details._id',
                                    name: '$borrower_details.name',
                                    email: '$borrower_details.email',
                                },
                                borrowedAt: '$inventory.borrowedAt'
                            },
                        }
                    }
                }
            }
        ])
        
        if (!libraryDetails.length) {
            return next(createError('Library not found', 404)); // Not Found
        }

        // Respond with the library details
        res.status(200).json({
            message: 'Library details retrieved successfully',
            library: libraryDetails
        });
    } catch (error) {
        next(error);
    }
}

export const createLibrary = async (req, res, next) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!name?.trim()) {
            return next(createError('Library name is required', 400)); // Bad Request
        }

        // Fetch the user to verify roles
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // User not found
        }

        // Check if a library with the same name already exists
        const existingLibrary = await Library.findOne({ name: name.trim() });
        if (existingLibrary) {
            return next(createError('A library with this name already exists', 409)); // Conflict
        }

        // Create a new library instance
        const newLibrary = new Library({
            name: name.trim(),
            owner: userId
        });
        
        // Save the library to the database
        await newLibrary.save();

        // Check if the user has the 'library' role
        if (!user.roles.includes('library')) {
            user.roles.push('library');
            await user.save();
        }

        // Update the user's librariesOwned field
        user.librariesOwned.push(newLibrary._id);
        await user.save();

        // Respond with success message
        res.status(201).json({ 
            message: 'Library created successfully', 
            library: { id: newLibrary._id, name: newLibrary.name } 
        });
    } catch (error) {
        next(error);
    }
}

export const updateLibrary = async (req, res, next) => {
    try {
        const libraryId = req.params.id;
        const userId = req.user.id;
        const { name } = req.body;

        // Validate input
        if (!libraryId) {
            return next(createError('Library ID is required', 400)); // Bad Request
        }

        // check if the library exists
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError('Library not found', 404));
        }
        
        // Fetch the user to verify roles
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // User not found
        }

        // Check if the user has the 'library' role and owns the library
        if (!user.roles.includes('library') || !user.librariesOwned.includes(libraryId)) {
            return next(createError('You do not have access to delete this library', 403)); // Forbidden
        }

        // Update the library
        if (name) {
            library.name = name.trim(); // Trim whitespace
        }

        const updatedLibrary = await library.save();

        // Respond with success message
        res.status(200).json({ 
            message: 'Library updated successfully', 
            library: { 
                id: updatedLibrary._id, 
                name: updatedLibrary.name 
            } 
        });
    } catch (error) {
        next(error);
    }
}

export const deleteLibrary = async (req, res, next) => {
    try {
        const libraryId = req.params.id;
        const userId = req.user.id;

        // Validate input
        if (!libraryId) {
            return next(createError('Library ID is required', 400)); // Bad Request
        }

        // check if the library exists
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError('Library not found', 404));
        }
        
        // Fetch the user to verify roles
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // User not found
        }

        // Check if the user has the 'library' role and owns the library
        if (!user.roles.includes('library') || !user.librariesOwned.includes(libraryId)) {
            return next(createError('You do not have access to delete this library', 403)); // Forbidden
        }

        // Find and delete the Library
        const deletedLibrary = await Library.findByIdAndDelete(libraryId);

        // Check if the library was found and deleted
        if (!deletedLibrary) {
            return next(createError('Library not found', 404)); // Not Found
        }

        // Remove the library from the user's librariesOwned list
        user.librariesOwned = user.librariesOwned.filter(id => id.toString() !== libraryId);
        await user.save();

        // Respond with success message
        res.status(200).json({ 
            message: 'Library deleted successfully', 
            deletedId: deletedLibrary._id 
        });
    } catch (error) {
        next(error); 
    }
};


// Library Inventory


export const getLibraryInventory = async (req, res, next) => {
    try {
        const libraryId = req.params.id;

        // Validate input
        if (!libraryId) {
            return next(createError('Library ID is required', 400)); // Bad Request
        }

        const libraryInventory = await Library.aggregate([
            {
                $match: {
                  _id: mongoose.Types.ObjectId.createFromHexString(libraryId)
                }
            },
            {
                $unwind: {
                    path: '$inventory',
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'inventory.bookId',
                    foreignField: '_id',
                    as: 'book_details'
                }
            },
            {
                $unwind: {
                    path: '$book_details',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        name: '$name',
                        createdAt: '$createdAt'
                    },
                    books: { $push: '$book_details' }
                }
            },
            {
                $project: {
                    _id: '$_id._id',
                    name: '$_id.name',
                    createdAt: '$_id.createdAt',
                    inventory: '$books'
                }
            }
        ]);

        if (!libraryInventory.length) {
            return next(createError('Library not found or inventory is empty', 404)); // Not Found
        }

        // Respond with the library inventory
        res.status(200).json({
            message: 'Library inventory retrieved successfully',
            library: libraryInventory
        });
    } catch (error) {
        next(error);
    }
}

export const addBookToInventory = async (req, res, next) => {
    try {
        const libraryId = req.params.id;
        const { bookId, charge } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!bookId) {
            return next(createError('Book ID is required', 400)); // Bad Request
        }
        if (!charge) {
            return next(createError('Charge is required', 400)); // Bad Request
        }

        // Check if the library exists
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError('Library not found', 404)); // Not Found
        }

        // Fetch the user to verify roles and ownership
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // Not Found
        }

        // Check if the user has the 'library' role and owns the library
        if (!user.roles.includes('library') || !user.librariesOwned.includes(libraryId)) {
            return next(createError('You do not have access to add books to this library', 403)); // Forbidden
        }

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return next(createError('Book not found', 404)); // Not Found
        }

        // Check if the book is already in the inventory
        const isBookPresent = library.inventory.some(item => item.bookId.equals(bookId));
        if (isBookPresent) {
            return next(createError('Book already exists in the inventory', 409)); // Conflict
        }
        
        // Add the book to the library's inventory
        library.inventory.push({
            bookId: book._id,
            charge,
        });
        await library.save();

        res.status(200).json({
            message: 'Book added to inventory successfully',
            inventory: library.inventory,
        });
    } catch (error) {
        next(error);
    }
}

export const removeBookFromInventory = async (req, res, next) => {
    try {
        const libraryId = req.params.id;
        const bookId = req.params.bookId;
        const userId = req.user.id;

        // Validate input
        if (!libraryId || !bookId) {
            return next(createError('Library ID and Book ID are required', 400)); // Bad Request
        }

        // Check if the library exists
        const library = await Library.findById(libraryId);
        if (!library) {
            return next(createError('Library not found', 404)); // Not Found
        }

        // Fetch the user to verify roles and ownership
        const user = await User.findById(userId);
        if (!user) {
            return next(createError('User not found', 404)); // Not Found
        }
        
        // Check if the user has the 'library' role and owns the library
        if (!user.roles.includes('library') || !user.librariesOwned.includes(libraryId)) {
            return next(createError('You do not have access to remove books from this library', 403)); // Forbidden
        }

        // Check if the book is in the library's inventory
        const bookIndex = library.inventory.indexOf(bookId);
        if (bookIndex === -1) {
            return next(createError('Book not found in the inventory', 404)); // Not Found
        }

        // Remove the book from the library's inventory
        library.inventory.splice(bookIndex, 1); // Remove the book from the inventory array
        await library.save();

        res.status(200).json({
            message: 'Book removed from inventory successfully',
            inventory: library.inventory,
        });
    } catch (error) {
        next(error);
    }
}