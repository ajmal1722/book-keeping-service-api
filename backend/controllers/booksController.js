import Book from "../models/bookSchema.js";

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
            const error = new Error('Book ID is required.');
            error.statusCode = 400; // Bad Request
            throw error;
        }

        // Fetch the book from the database by ID
        const book = await Book.findById(bookId);

        // Check if the book exists
        if (!book) {
            const error = new Error('Book not found.');
            error.statusCode = 404; // Not Found
            throw error;
        }

        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        if (!req.body.name) {
            console.log('No body provided');
            // Throw an error with a message
            res.status(400)
            throw new Error('Please provide a name for the book');
        }


        res.status(200).json({ name });
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
