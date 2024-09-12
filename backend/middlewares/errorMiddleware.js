const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    if (process.env.NODE_ENV === 'production') {
        console.error('Error details:', err);
        
        if (statusCode >= 500) {
            return res.status(statusCode).json({
                message: 'Something went wrong, please try again later.',
            });
        } else {
            return res.status(statusCode).json({
                message: err.message,
            });
        }
    } else {
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    }
};

export default errorHandler;