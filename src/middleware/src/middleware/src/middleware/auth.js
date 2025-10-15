// src/middleware/auth.js
const { AuthenticationError } = require('./error-handler');

// NOTE: In a real application, load this from environment variables (e.g., using dotenv)
const API_KEY = 'supersecretkey'; 

/**
 * Authentication middleware (Task 3)
 * Checks for a custom API key in the 'x-api-key' header.
 */
const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        throw new AuthenticationError('API Key is missing. Access denied.');
    }

    if (apiKey !== API_KEY) {
        throw new AuthenticationError('Invalid API Key. Access denied.');
    }

    // Authentication successful
    next();
};

module.exports = { authenticateApiKey };
