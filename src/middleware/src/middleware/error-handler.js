// src/middleware/error-handler.js

// --- Task 4: Custom Error Classes ---

class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found.') {
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Invalid data provided.', errors = []) {
        super(message, 400, { errors });
    }
}

class AuthenticationError extends AppError {
    constructor(message = 'Authentication failed.') {
        super(message, 401);
    }
}

// --- Task 4: Global Error Handling Middleware ---

/**
 * Global error handling middleware
 */
const globalErrorHandler = (err, req, res, next) => {
    // Default to 500 Internal Server Error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred.';

    // Log the error for server-side debugging
    if (statusCode >= 500) {
        console.error('--- Global Error Handler (500) ---');
        console.error(err.stack);
        console.error('---------------------------------');
    }
    
    // Task 4: Proper error responses with appropriate HTTP status codes
    const response = {
        status: 'error',
        message: message
    };

    // Add specific details for client-facing errors (like validation)
    if (err.details) {
        response.details = err.details;
    }

    // Hide internal details for 500 errors
    if (statusCode === 500 && process.env.NODE_ENV === 'production') {
        response.message = 'An unexpected server error occurred.';
    }

    res.status(statusCode).json(response);
};

module.exports = {
    globalErrorHandler,
    AppError,
    NotFoundError,
    ValidationError,
    AuthenticationError
};
