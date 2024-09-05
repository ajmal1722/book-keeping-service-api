
export const getBooks = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        console.log('error:', error);
        res.status(200).json({ error: error.message })
    }
}

export const getSingleBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success single post' })
    } catch (error) {
        console.log('error:', error);
        res.status(200).json({ error: error.message })
    }
}

export const createBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success create book' })
    } catch (error) {
        console.log('error:', error);
        res.status(200).json({ error: error.message })
    }
}

export const updateBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success update book' })
    } catch (error) {
        console.log('error:', error);
        res.status(200).json({ error: error.message })
    }
}

export const deleteBook = async (req, res) => {
    try {
        res.status(200).json({ message: 'Success delete book' })
    } catch (error) {
        console.log('error:', error);
        res.status(200).json({ error: error.message })
    }
}
