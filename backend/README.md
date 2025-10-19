# Backend Architecture

This backend is refactored following separation of concerns principles and modular architecture.

## 📁 Project Structure

```
backend/src/
├── index.ts           # Main entry point
├── server.ts          # Express configuration
├── genkit.ts          # Genkit configuration and flows
├── routes/            # API routes
│   ├── flows.ts       # Endpoints for Genkit flows
│   └── health.ts      # Health check endpoints
└── types/             # TypeScript type definitions
    └── api.ts         # Types for requests/responses
```

## 🏗️ Architecture

### **index.ts** - Entry Point

- Initializes Genkit by importing `genkit.ts`
- Starts the Express server
- Global error handling

### **genkit.ts** - AI Logic

- Genkit and Google AI configuration
- Tool definitions (`getOrderStatusTool`)
- Flow definitions (`orderSupportFlow`)
- Completely separated from Express

### **server.ts** - HTTP Server

- Express configuration
- Middleware (CORS, JSON parsing)
- Route registration
- `startServer()` function for initialization

### **routes/** - Endpoints

- **flows.ts**: Handles Genkit flow endpoints
- **health.ts**: Health check and status endpoints

### **types/** - TypeScript Types

- **api.ts**: Interfaces for API requests/responses

## 🔧 Benefits of this Architecture

1. **Separation of Concerns**: Genkit and Express are completely separated
2. **Maintainability**: Each file has a specific responsibility
3. **Scalability**: Easy to add new flows, routes, or middleware
4. **Testability**: Each module can be tested independently
5. **Type Safety**: TypeScript with clear interfaces for the entire API

## 🚀 Usage

```bash
# Development
npx tsx src/index.ts

# Production (after compilation)
node dist/index.js
```

## 📡 API Endpoints

- `GET /health` - Health check
- `POST /api/flows/orderSupportFlow` - Execute support flow
