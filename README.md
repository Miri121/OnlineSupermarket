# Online Supermarket System

A full-stack online supermarket application with three main components:

- **Client**: React + TypeScript + Redux Toolkit + Material-UI
- **Products Server**: .NET 10 + SQL Server + Entity Framework
- **Orders Server**: Node.js + TypeScript + Express + Elasticsearch

---

## System Architecture

### Component 1: Client (React + Redux Toolkit + MUI)

- Handles UI for both shopping list and order summary screens
- State management with Redux Toolkit
- Material-UI for modern, responsive design

### Component 2: .NET Server (Products & Categories)

- **Technology**: .NET 10
- **Database**: SQL Server with Entity Framework Core
- **Purpose**: Manages categories and products
- **Endpoints**:
  - `GET /api/categories` - Get all categories
  - `GET /api/categories/{id}` - Get category by ID
  - `GET /api/products` - Get all products
  - `GET /api/products/{id}` - Get product by ID
  - `GET /api/products/category/{categoryId}` - Get products by category

### Component 3: Node.js Server (Orders)

- **Technology**: Node.js + TypeScript + Express
- **Database**: Elasticsearch
- **Purpose**: Manages order submissions
- **Endpoints**:
  - `POST /api/orders` - Create new order
  - `GET /api/orders` - Get all orders
  - `GET /api/orders/{id}` - Get order by ID
  - `GET /api/orders/search/email/{email}` - Search orders by email

---

## Prerequisites

Before installation, ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **.NET 10 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/10.0)
3. **SQL Server** - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
4. **Elasticsearch** (v8.x) - [Download](https://www.elastic.co/downloads/elasticsearch)

---

## Installation Instructions

### 1. Clone or Extract the Project

---

## Note:

For convenience, a VS Code workspace file, `OnlineSupermarket.code-workspace`, is provided at the root of the project. Opening this file in VS Code will automatically launch all three services (`dotnet-server`, `node-server`, and `client`) in separate terminals.

#### On the first run,

the script will also install any missing dependencies, so it may take a few extra seconds before all services are up and running.

### 2. Setup Client (React Application)

#or#:

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The client will run on **http://localhost:3000**

---

### 3. Setup .NET Server (Products & Categories)

#### Option A: Using Command Line

```bash
# Navigate to dotnet-server directory
cd dotnet-server

# Restore dependencies
dotnet restore

# Run the application
dotnet run
```

#### Option B: Using Visual Studio

1. Open **Visual Studio**
2. Click **File** → **Open** → **Project/Solution**
3. Navigate to `dotnet-server` folder
4. Select `OnlineSupermarket.APIcsproj `
5. Press **F5** or click **Start** to run the project

The .NET server will run on **http://localhost:5000**

**Note**: The database will be automatically created using SQL Server on first run. The connection string is configured in `appsettings.Development.json`.

---

### 4. Setup Elasticsearch & Kibana (Using Docker)

#### Recommended: Using Docker Compose

```bash
# Navigate to node-server/elasticsearch directory
cd node-server/elasticsearch

# Start Elasticsearch and Kibana
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f
```

**Services will be available at:**

- Elasticsearch: http://localhost:9200
- Kibana: http://localhost:5601

#### Verify Elasticsearch

```bash
# Check cluster health
curl http://localhost:9200/_cluster/health?pretty

# List all indices
curl http://localhost:9200/_cat/indices?v
```

---

### 5. Setup Node.js Server (Orders)

```bash
# Navigate to node-server directory
cd node-server

# Install dependencies
npm install

# Start development server
npm run dev
```

The Node.js server will run on **http://localhost:3001**

**Note**: The Elasticsearch index and mapping will be automatically created on first run.

---

## Application URLs

- **Client Application**: http://localhost:3000
- **.NET API**: http://localhost:5000
- **.NET Swagger UI**: http://localhost:5000/swagger
- **Node.js API**: http://localhost:3001
- **Elasticsearch**: http://localhost:9200

---

## Usage Guide

### Screen 1 - Shopping List (רשימת קניות)

1. **View Categories**: On page load, all categories are displayed
2. **Select Category**: Click on a category chip to view its products
3. **Add Products**:
   - Enter quantity for desired products
   - Click "הוסף מוצר לסל" button
4. **Show Cart**: Clicking on the cart icon (top left) will display all selected items.
5. **Continue**: Click on the "המשך להזמנה" button to proceed to checkout.

### Screen 2 - Order Summary

1. **Review Order**: View all selected products in a table format
2. **Fill Customer Information**:
   - Full Name (required)
   - Address (required)
   - Email (required)
3. **Submit Order**: Click "אישור הזמנה" button
4. **Confirmation**: Success message appears and redirects to shopping page

---

## Database Information

### SQL Server (Products Database)

```
**Tables**:

- `Categories` - Product categories
- `Products` - Products with category relationships

**Seed Data**: The database is automatically seeded with sample categories and products on first run.
```

### Elasticsearch (Orders Database)

**Index Name**: `orders`

**Mapping File**: `node-server/elasticsearch/elasticsearch-mapping.json`

The mapping is automatically applied when the Node.js server starts. You can also manually create the index using:

```bash
curl -X PUT "localhost:9200/orders" -H "Content-Type: application/json" -d @node-server/elasticsearch/elasticsearch-mapping.json
```

---

## Project Structure

```
 OnlineSupermarket/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/                 # Screen components
│   │   │   ├── ShoppingListScreen.tsx
│   │   │   └── OrderSummaryScreen.tsx
│   │   ├── store/                   # Redux store
│   │   │   ├── store.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── productsSlice.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── dotnet-server/                   # .NET Backend
│   ├── Controllers/
│   │   ├── CategoriesController.cs
│   │   └── ProductsController.cs
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── DbInitializer.cs
│   ├── DTOs/
│   │   ├── CategoryDto.cs
│   │   └── ProductDto.cs
│   ├── Models/
│   │   ├── Category.cs
│   │   └── Product.cs
│   ├── Services/
│   │   ├── CategoryService.cs
│   │   └── ProductService.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── ShoppingCartAPI.csproj
│
├── node-server/                     # Node.js Backend
│   ├── elasticsearch/
│   │   ├── docker-compose.yml
│   │   ├── elasticsearch-mapping.json
│   │   ├── elasticsearch.ts
│   │   └── orderMapping.ts
│   ├── src/
│   │   ├── config/
│   │   │   └── orderMapping.ts
│   │   ├── controllers/
│   │   │   └── orderController.ts
│   │   ├── middleware/
│   │   │   ├── asyncHandler.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── requestLogger.ts
│   │   ├── routes/
│   │   │   └── orderRoutes.ts
│   │   ├── services/
│   │   │   └── orderService.ts
│   │   ├── types/
│   │   │   └── order.ts
│   │   ├── utils/
│   │   │   └── logger.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                        # This file
```

---
