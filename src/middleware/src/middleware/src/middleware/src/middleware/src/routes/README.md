# 🚂 Express.js RESTful API (Week 2 Assignment)

A fully functional Express.js API implementing standard CRUD operations, proper routing, middleware, and comprehensive error handling, along with advanced features like filtering and pagination.

## 🚀 Features

* **RESTful CRUD:** Operations for a `products` resource.
* **Custom Middleware:** Logging, JSON parsing, and API Key authentication.
* **Data Validation:** Middleware to validate product data upon creation/update.
* **Comprehensive Error Handling:** Global handler, custom error classes, and proper HTTP status codes.
* **Advanced Features:** Filtering by category, pagination, product search by name, and statistics endpoint.

## 🛠️ Setup and Installation

### Prerequisites

* Node.js (v18+)
* npm

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd express-rest-api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** based on the provided `.env.example`.

## 🏃 Running the Server

1.  **Start the server:**
    ```bash
    npm start
    ```
2.  The API will be running at `http://localhost:3000`.

## 📄 API Endpoints Documentation

| HTTP Method | Endpoint | Description | Authentication Required |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Hello World welcome message. | No |
| **GET** | `/api/products` | Lists all products. Supports filtering (`?category=...`) and pagination (`?page=1&limit=10`). | No |
| **GET** | `/api/products/:id` | Get a specific product by ID. | No |
| **GET** | `/api/products/search?name=...` | Search products by name keyword. | No |
| **GET** | `/api/products/stats` | Get product statistics (count by category, total). | No |
| **POST** | `/api/products` | Create a new product. | **Yes** (`x-api-key`) |
| **PUT** | `/api/products/:id` | Update an existing product. | **Yes** (`x-api-key`) |
| **DELETE** | `/api/products/:id` | Delete a product. | **Yes** (`x-api-key`) |

### Example Request (Create Product)

**Request:**
