// src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const { products, addProduct, updateProduct, deleteProduct } = require('../data/products');
const { NotFoundError, ValidationError } = require('../middleware/error-handler');
const { authenticateApiKey } = require('../middleware/auth');
const { validateProductCreation, validateProductUpdate, validateId } = require('../middleware/validation');

// Helper to wrap async routes for error handling (Task 4)
const asyncHandler = fn => (req, res, next) => {
    // Handle both synchronous and asynchronous errors by catching and passing to next()
    Promise.resolve(fn(req, res, next)).catch(next);
};

// --- Task 2: RESTful API Routes & Task 5: Advanced Features ---

/**
 * GET /api/products: List all products (Task 5: Filtering, Pagination)
 */
router.get('/products', asyncHandler(async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;

    let filteredProducts = products;

    // Task 5: Filtering by category
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Task 5: Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;

    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
        throw new ValidationError('Page and limit parameters must be positive integers.');
    }

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.status(200).json({
        total: filteredProducts.length,
        page: pageNum,
        limit: limitNum,
        data: paginatedProducts,
    });
}));

/**
 * GET /api/products/search?name=term: Search products by name (Task 5)
 */
router.get('/products/search', asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new ValidationError('Search term (name) is required and must be a non-empty string.');
    }

    const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
    );

    res.status(200).json(searchResults);
}));

/**
 * GET /api/products/stats: Get product statistics (Task 5)
 */
router.get('/products/stats', asyncHandler(async (req, res) => {
    const stats = products.reduce((acc, product) => {
        const { category, inStock } = product;
        
        acc.totalCount = (acc.totalCount || 0) + 1;
        
        // Count by category
        acc.countByCategory[category] = (acc.countByCategory[category] || 0) + 1;

        // Count in stock
        if (inStock) {
            acc.totalInStock = (acc.totalInStock || 0) + 1;
        }

        return acc;
    }, { 
        totalCount: 0, 
        totalInStock: 0, 
        countByCategory: {} 
    });

    res.status(200).json(stats);
}));

/**
 * GET /api/products/:id: Get a specific product by ID
 */
router.get('/products/:id', validateId, asyncHandler(async (req, res) => {
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
        // Task 4: Custom Error Class
        throw new NotFoundError(`Product with ID ${req.params.id} not found.`);
    }

    res.status(200).json(product);
}));

/**
 * POST /api/products: Create a new product
 */
router.post('/products', 
    authenticateApiKey, // Task 3: Authentication Middleware
    validateProductCreation, // Task 3: Validation Middleware
    asyncHandler(async (req, res) => {
        const newProduct = addProduct(req.body);
        // Task 4: Proper HTTP status code
        res.status(201).json(newProduct); 
    })
);

/**
 * PUT /api/products/:id: Update an existing product
 */
router.put('/products/:id', 
    validateId,
    authenticateApiKey,
    validateProductUpdate, // Task 3: Validation Middleware
    asyncHandler(async (req, res) => {
        const updatedProduct = updateProduct(req.params.id, req.body);
        
        if (!updatedProduct) {
            throw new NotFoundError(`Product with ID ${req.params.id} not found.`);
        }

        res.status(200).json(updatedProduct);
    })
);

/**
 * DELETE /api/products/:id: Delete a product
 */
router.delete('/products/:id', 
    validateId,
    authenticateApiKey,
    asyncHandler(async (req, res) => {
        const wasDeleted = deleteProduct(req.params.id);

        if (!wasDeleted) {
            throw new NotFoundError(`Product with ID ${req.params.id} not found.`);
        }
        
        // Task 4: Proper HTTP status code (204 No Content)
        res.status(204).send(); 
    })
);

module.exports = router;
