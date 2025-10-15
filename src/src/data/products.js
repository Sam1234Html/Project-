// src/data/products.js
const { v4: uuidv4 } = require('uuid');

// Initial set of products
let products = [
    {
        id: '264775d7-017e-4094-8703-a419c9918731',
        name: 'Laptop Pro X',
        description: 'High-performance laptop for professionals.',
        price: 1999.99,
        category: 'Electronics',
        inStock: true
    },
    {
        id: '1e5e78b3-3a9d-4c31-8608-d21a1b4d00f6',
        name: 'Organic Coffee Beans',
        description: 'Fair-trade, medium roast coffee.',
        price: 15.50,
        category: 'Food & Beverage',
        inStock: true
    },
    {
        id: '0f1d9a2c-7b8e-4a6f-9c0d-3e5b1f7a4d6c',
        name: 'Leather Wallet',
        description: 'Slim, genuine leather bifold wallet.',
        price: 45.00,
        category: 'Accessories',
        inStock: false
    },
];

module.exports = {
    products,
    // Helper function to simulate adding a product with a unique ID
    addProduct: (product) => {
        const newProduct = { id: uuidv4(), ...product };
        products.push(newProduct);
        return newProduct;
    },
    // Helper function to update a product
    updateProduct: (id, updates) => {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            return products[index];
        }
        return null;
    },
    // Helper function to delete a product
    deleteProduct: (id) => {
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);
        return products.length < initialLength; // Return true if deleted
    }
};
