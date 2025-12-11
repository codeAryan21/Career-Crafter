const errorHandler = (err, req, res, next) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];
    
    return res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { errors }),
        timestamp: new Date().toISOString()
    });
};

export default errorHandler;
