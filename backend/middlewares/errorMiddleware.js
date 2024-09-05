const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    if (process.env.NODE_ENV === 'production') {
        console.error('Error details:', err);

        // Respond with a user-friendly message in production
        res.status(statusCode).json({
            message: 'An unexpected error occurred. Please try again later.',
        });
    } else {
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    }
};

export default errorHandler;