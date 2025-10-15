// src/middleware/logger.js
/**
 * Custom logger middleware (Task 3)
 */
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    
    console.log(`[${timestamp}] ${method} ${url}`);
    
    next();
};

module.exports = loggerMiddleware;
