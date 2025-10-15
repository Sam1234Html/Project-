// server.js
const express = require('express');
const bodyParser = require('body-parser');

// Import routes and middleware
const productRoutes = require('./src/routes/product.routes');
const loggerMiddleware = require('./src/middleware/logger');
const { globalErrorHandler } = require('./src/middleware/error-handler');

// Task 1: Express.js Setup
const app = express();
const PORT = process.env.PORT || 3000;

// --- Task 3: Middleware Implementation ---

// Middleware 1: Custom Logger
app.use(loggerMiddleware);

// Middleware 2: JSON Body Parser
app.use(bodyParser.json());

// --- Task 1: "Hello World" Route ---
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to the Express.js RESTful API.');
});

// --- Task 2: RESTful API Routes (Mount Router) ---
app.use('/api', productRoutes);

// --- Task 4: Error Handling (Global) ---
app.use(globalErrorHandler);

// Task 1: Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
