# My Agentic App

An AI chat application that combines Angular with Genkit to create an intelligent customer support assistant.

## 🏗️ Architecture

- **Frontend**: Angular 20 + Kendo UI Conversational Components
- **Backend**: Node.js + TypeScript + Google Genkit + Express
- **AI**: Google Gemini 2.5 Flash

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Google AI API Key

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd my-agentic-app

# Install all dependencies and setup environment
npm run setup

# Edit backend/.env and add your GOOGLE_GENAI_API_KEY
# Then start both backend and frontend in development mode
npm run dev
```

### Manual Setup

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your GOOGLE_GENAI_API_KEY
```

#### 2. Frontend Setup

```bash
cd my-angular-chat-ui

# Install dependencies
npm install
```

### 3. Get Google AI API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Create a new API key
3. Copy it to the `backend/.env` file

## 🎯 Running the Application

### Development Mode (Both services)

```bash
# Start both backend and frontend together
npm run dev
```

### Individual Services

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

### Manual Start

### Manual Start

#### Backend

```bash
cd backend
npx tsx src/index.ts
```

Server will be available at: `http://localhost:3400`

#### Frontend

```bash
cd my-angular-chat-ui
ng serve
```

Application will be available at: `http://localhost:4200`

## 📋 Features

- ✅ Conversational AI chat
- ✅ Order status inquiries
- ✅ Modern UI with Kendo components
- ✅ REST API with Express
- ✅ Google Gemini integration

## 🛠️ Development

### Project Structure

```
my-agentic-app/
├── backend/                 # Node.js + Genkit server
│   ├── src/
│   │   ├── index.ts        # Main entry point
│   │   ├── server.ts       # Express configuration
│   │   ├── genkit.ts       # Genkit and AI logic
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript types
│   ├── .env.example        # Environment variables example
│   └── package.json
└── my-angular-chat-ui/     # Angular application
    ├── src/
    │   └── app/
    │       ├── app.ts      # Main component
    │       └── services/   # Angular services
    └── package.json
```

### API Endpoints

- `POST /api/flows/orderSupportFlow` - Send message to AI agent
- `GET /health` - Server health check

## 📝 Notes

- The `.env` file contains sensitive information and should not be committed
- The project includes Genkit tools for development and debugging
- CORS is configured for local development
