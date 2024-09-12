const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Check if in production mode
    if (process.env.NODE_ENV === 'production') {
        console.error('Error details:', err);

        // Handle server-side errors (5xx)
        if (statusCode >= 500) {
            return res.status(statusCode).json({
                message: 'Something went wrong, please try again later.',
            });
        } else {
            // Translate the error message if it's a key
            const errorMessage = req.t ? req.t(err.message) : err.message;

            return res.status(statusCode).json({
                message: errorMessage,
            });
        }
    } else {
        // In development mode, return stack trace for debugging
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    }
};

export default errorHandler;