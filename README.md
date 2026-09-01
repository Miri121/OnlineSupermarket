# Shopping Cart System

A full-stack shopping cart application with three main components:

- **Client**: React + TypeScript + Redux Toolkit + Material-UI
- **Products Server**: .NET 8 (compatible with .NET 10) + SQL Server + Entity Framework
- **Orders Server**: Node.js + TypeScript + Express + Elasticsearch

---

## System Architecture

### Component 1: Client (React + Redux Toolkit + MUI)

- Handles UI for both shopping list and order summary screens
- State management with Redux Toolkit
- Material-UI for modern, responsive design

### Component 2: .NET Server (Products & Categories)

- **Technology**: .NET 9 with C# 12 (latest version, compatible with Visual Studio 2022)
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
   - Alternative: .NET 8 SDK (LTS) - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
3. **SQL Server** or **SQL Server LocalDB** - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
4. **Elasticsearch** (v8.x) - [Download](https://www.elastic.co/downloads/elasticsearch)
5. **Visual Studio 2022** (optional, for .NET development) - [Download](https://visualstudio.microsoft.com/)

---

## Installation Instructions

### 1. Clone or Extract the Project

```bash
cd "c:/Users/user/Desktop/פרוייקט 1"
```

---

### 2. Setup Client (React Application)

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

1. Open **Visual Studio 2022**
2. Click **File** → **Open** → **Project/Solution**
3. Navigate to `dotnet-server` folder
4. Select `ShoppingCartAPI.csproj`
5. Press **F5** or click **Start** to run the project

The .NET server will run on **http://localhost:5000**

**Note**: The database will be automatically created using SQL Server LocalDB on first run. The connection string is configured in `appsettings.json`.

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

#### Stop Services

```bash
cd node-server/elasticsearch

# Stop services (keeps data)
docker-compose stop

# Stop and remove containers (keeps data)
docker-compose down

# Stop, remove containers and volumes (deletes all data)
docker-compose down -v
```

#### Alternative - Manual Installation:

1. Download and extract Elasticsearch
2. Navigate to the `bin` folder
3. Run `elasticsearch.bat`
4. Verify it's running by visiting **http://localhost:9200**

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

## Running the Complete System

To run the entire system, you need to start all three components:

### Terminal 1 - Client:

```bash
cd client
npm run dev
```

### Terminal 2 - .NET Server:

```bash
cd dotnet-server
dotnet run
```

### Terminal 3 - Elasticsearch:

```bash
# Start Elasticsearch (if not using Docker)
cd path/to/elasticsearch/bin
elasticsearch.bat
```

### Terminal 4 - Node.js Server:

```bash
cd node-server
npm run dev
```

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
   - Click "Add to Cart" button
4. **View Cart**: Cart summary appears at the bottom showing all selected items
5. **Continue**: Click "Continue to Order" button to proceed to checkout

### Screen 2 - Order Summary

1. **Review Order**: View all selected products in a table format
2. **Fill Customer Information**:
   - Full Name (required)
   - Full Address (required)
   - Email (required)
3. **Submit Order**: Click "Confirm Order" button
4. **Confirmation**: Success message appears and redirects to shopping page

---

## Database Information

### SQL Server (Products Database)

**Connection String** (in `appsettings.json`):

```json
"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ShoppingCartDB;Trusted_Connection=True;MultipleActiveResultSets=true"
```

**Tables**:

- `Categories` - Product categories
- `Products` - Products with category relationships

**Seed Data**: The database is automatically seeded with sample categories and products on first run.

### Elasticsearch (Orders Database)

**Index Name**: `orders`

**Mapping File**: `node-server/elasticsearch-mapping.json`

The mapping is automatically applied when the Node.js server starts. You can also manually create the index using:

```bash
curl -X PUT "localhost:9200/orders" -H "Content-Type: application/json" -d @node-server/elasticsearch-mapping.json
```

---

## Project Structure

```
פרוייקט 1/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── screens/                 # Screen components
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
│   │   ├── ShoppingCartContext.cs
│   │   └── DbInitializer.cs
│   ├── Models/
│   │   ├── Category.cs
│   │   └── Product.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── ShoppingCartAPI.csproj
│
├── node-server/                     # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── elasticsearch.ts
│   │   │   └── orderMapping.ts
│   │   ├── routes/
│   │   │   └── orderRoutes.ts
│   │   ├── types/
│   │   │   └── order.ts
│   │   └── server.ts
│   ├── elasticsearch-mapping.json
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                        # This file
```

---

## API Documentation

### .NET Server API

#### Get All Categories

```http
GET http://localhost:5000/api/categories
```

#### Get Products by Category

```http
GET http://localhost:5000/api/products/category/{categoryId}
```

### Node.js Server API

#### Create Order

```http
POST http://localhost:3001/api/orders
Content-Type: application/json

{
  "fullName": "John Doe",
  "address": "123 Main St, City, Country",
  "email": "john@example.com",
  "products": [
    {
      "productId": 1,
      "productName": "Laptop",
      "quantity": 1,
      "price": 999.99,
      "categoryName": "Electronics"
    }
  ],
  "totalAmount": 999.99,
  "orderDate": "2024-01-01T00:00:00Z"
}
```

#### Get All Orders

```http
GET http://localhost:3001/api/orders
```

---

## Troubleshooting

### Client Issues

**Problem**: Dependencies not installing

```bash
# Clear npm cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### .NET Server Issues

**Problem**: Database connection error

- Ensure SQL Server LocalDB is installed
- Check connection string in `appsettings.json`
- Try running: `sqllocaldb start mssqllocaldb`

**Problem**: Port 5000 already in use

- Change port in `Properties/launchSettings.json`
- Update client API URL in `client/src/store/productsSlice.ts`

### Node.js Server Issues

**Problem**: Cannot connect to Elasticsearch

- Ensure Elasticsearch is running on port 9200
- Check `.env` file configuration
- Verify Elasticsearch health: `curl http://localhost:9200/_cluster/health`

**Problem**: Port 3001 already in use

- Change port in `.env` file
- Update client API URL in `client/src/screens/OrderSummaryScreen.tsx`

---

## Building for Production

### Client

```bash
cd client
npm run build
# Output will be in client/dist folder
```

### .NET Server

```bash
cd dotnet-server
dotnet publish -c Release -o ./publish
```

### Node.js Server

```bash
cd node-server
npm run build
npm start
```

---

## Technologies Used

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- Material-UI (MUI)
- Vite
- Axios
- React Router

### Backend (.NET)

- .NET 8
- Entity Framework Core
- SQL Server
- Swagger/OpenAPI

### Backend (Node.js)

- Node.js
- TypeScript
- Express
- Elasticsearch
- CORS

---

## License

This project is created for educational purposes.

---

## Support

For issues or questions:

1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Ensure all services are running on correct ports
4. Check console logs for error messages
