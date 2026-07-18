
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const errorResponse = {
        error: {
            message: err.message || 'Internal Server Error',
            type: 'server error',
            details: err.details || undefined
        }
    };

    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        errorResponse.error.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
}

export const notFound = (req, res, next) => {
    const error = new Error(`The requested path ${req.originalUrl} was not found on this server`);
    error.statusCode = 404;
    next(error);
}

