import { error } from "console";

export const getBooks = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        next(error);
    }
}

export const getSingleBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success single post' })
    } catch (error) {
        next(error);
    }
}

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

export const updateBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success update book' })
    } catch (error) {
        next(error);
    }
}

export const deleteBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success delete book' })
    } catch (error) {
        next(error)
    }
}
