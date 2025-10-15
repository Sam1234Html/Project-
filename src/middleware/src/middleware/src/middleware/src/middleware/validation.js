// src/middleware/validation.js
const { ValidationError } = require('./error-handler');

/**
 * Validation middleware for product creation (POST)
 */
const validateProductCreation = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string') {
        errors.push('Name must be a non-empty string.');
    }
    if (!description || typeof description !== 'string') {
        errors.push('Description must be a non-empty string.');
    }
    if (typeof price !== 'number' || price <= 0) {
        errors.push('Price must be a positive number.');
    }
    if (!category || typeof category !== 'string') {
        errors.push('Category must be a non-empty string.');
    }
    if (typeof inStock !== 'boolean') {
        errors.push('inStock must be a boolean.');
    }

    if (errors.length > 0) {
        // Task 4: Custom Error Class
        throw new ValidationError('Invalid product creation data.', errors);
    }

    next();
};

/**
 * Validation middleware for product update (PUT)
 */
const validateProductUpdate = (req, res, next) => {
    const updates = req.body;
    const errors = [];
    const allowedFields = ['name', 'description', 'price', 'category', 'inStock'];

    // Check for unknown fields
    for (const key in updates) {
        if (!allowedFields.includes(key)) {
            errors.push(`Field '${key}' is not allowed for update.`);
        }
    }

    if (updates.name !== undefined && typeof updates.name !== 'string') {
        errors.push('Name must be a string if provided.');
    }
    if (updates.price !== undefined && (typeof updates.price !== 'number' || updates.price <= 0)) {
        errors.push('Price must be a positive number if provided.');
    }
    if (updates.inStock !== undefined && typeof updates.inStock !== 'boolean') {
        errors.push('inStock must be a boolean if provided.');
    }

    if (errors.length > 0) {
        throw new ValidationError('Invalid product update data.', errors);
    }
    
    // Ensure at least one valid field is present for update
    const validUpdates = Object.keys(updates).filter(key => allowedFields.includes(key));
    if (validUpdates.length === 0) {
        throw new ValidationError('No valid update fields provided.');
    }


    next();
};

/**
 * Basic ID validation middleware (check for a valid UUID format)
 */
const validateId = (req, res, next) => {
    // Simple UUID pattern check
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidPattern.test(req.params.id)) {
        throw new ValidationError('Invalid product ID format (must be a UUID).');
    }
    next();
};


module.exports = {
    validateProductCreation,
    validateProductUpdate,
    validateId
};
