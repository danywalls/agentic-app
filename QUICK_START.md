# Quick Start Guide

## 🚀 Development Scripts

### Start Everything

```bash
npm run dev
```

This starts both backend (port 3400) and frontend (port 4201) simultaneously.

### Individual Services

```bash
# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend
```

### Setup (First Time)

```bash
# Install all dependencies and create .env file
npm run setup

# Then edit backend/.env with your Google AI API key
# Finally run:
npm run dev
```

## 📱 Access Points

- **Frontend**: http://localhost:4201
- **Backend API**: http://localhost:3400
- **Health Check**: http://localhost:3400/health

## 🔑 Environment Setup

1. Get API key from [Google AI Studio](https://ai.google.dev/)
2. Add to `backend/.env`:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

## 🛠️ Available Scripts

| Script                 | Description                |
| ---------------------- | -------------------------- |
| `npm run dev`          | Start both services        |
| `npm run dev:backend`  | Start backend only         |
| `npm run dev:frontend` | Start frontend only        |
| `npm run setup`        | Install deps + create .env |
| `npm run install:all`  | Install all dependencies   |
