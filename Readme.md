## Prerequisites

- Node.js and npm installed
- Postgres database installed and running

## Getting Started

1. **Fill the .env file:**

   - Add postgres database url in the DATABASE_URL variable
   - You can optionally set the Port

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Sync the db with prisma models:**

   ```bash
   npm run prisma
   ```

4. **Run the App:**
   ```bash
   npm run dev
   ```

- Open the app in your web browser at http://localhost:8000/

## API Endpoints

- **GET /initialize-db**

  - Initialize the database with data fetched from the API
  - Sample response:

  ```json
  {
    "success": true,
    "message": "Database initialized successfully"
  }
  ```

- **GET /transactions?month=january&search=abc&page=1&limit=10**

  - Get all transactions for a specific month
  - Optional query parameters: search, page, limit
  - Sample response:

  ```json
  {
    "success": true,
    "transactions": ["..."]
  }
  ```

- **GET /statistics?month=january**

  - Get statistics for a specific month
  - Sample response:

  ```json
  {
    "success": true,
    "statistics": {
      "totalSaleAmount": 1234,
      "totalSoldItems": 2,
      "totalNotSoldItems": 4
    }
  }
  ```

- **GET /chart/bar?month=january**

  - Get bar chart data for a specific month
  - Sample response:
  ```json
  {
    "success": true,
    "barChartData": [
      {
        "range": "0 - 100",
        "count": 0
      },
      "..."
    ]
  }
  ```

- **GET /chart/pie?month=january**

  - Get pie chart data for a specific month
  - Sample response:
  ```json
  {
	"success": true,
	"pieChartData": [
	  {
		"category": "Men's Clothing",
		"count": 2
	  },
	  "..."
	]
  }
  ```

- **GET /combined-data?month=january**
  - Get combined data for a specific month
  - Includes statistics, bar chart and pie chart data
