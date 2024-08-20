import { errorHandler } from '../Utils/errorHandler.js'; // Import your custom errorHandler class

const errorMiddleware = (err, req, res, next) => {
    // Check if the error is an instance of errorHandler
    if (err instanceof errorHandler) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }
    
    // Handle unexpected errors
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export default errorMiddleware; // Export the middleware
