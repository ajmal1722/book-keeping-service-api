import Library from "../models/librarySchema.js";
import User from "../models/userSchema.js";
import createError from "../utils/error.js";

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
        const newLibrary = new Library({ name: name.trim() });
        
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


    } catch (error) {
        next(error);
    }
}

export const deleteLibrary = async (req, res, next) => {
    try {
        const libraryId = req.params.id;

        // Validate input
        if (!libraryId) {
            return next(createError('Library ID is required', 400)); // Bad Request
        }
        
        // Find and delete the Library
        const deletedLibrary = await Library.findByIdAndDelete(libraryId);

        // Check if the library was found and deleted
        if (!deletedLibrary) {
            return next(createError('Library not found', 404)); // Not Found
        }

        // Respond with success message
        res.status(200).json({ 
            message: 'Library deleted successfully', 
            deletedId: deletedLibrary._id 
        });
    } catch (error) {
        next(error); 
    }
};