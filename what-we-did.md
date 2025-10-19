# What We Did: Building an AI-Powered Chat Application with Angular and Genkit

## 🎯 Project Overview

We built a complete AI-powered chat application that combines Angular with Google's Genkit framework to create an intelligent customer support assistant. This post explains the journey, decisions, and architectural improvements we made along the way.

## 🚀 Initial Challenge

We started with a basic Genkit setup that only worked through the Genkit Developer UI. The challenge was to make it accessible through a modern web interface while maintaining clean architecture and scalability.

## 📋 What We Built

### Frontend: Angular + Kendo UI

- **Angular 20** with standalone components
- **Kendo UI Conversational Components** for modern chat interface
- **Signal-based state management** for reactive UI
- **HTTP client** for backend communication

### Backend: Node.js + Express + Genkit

- **Google Genkit** for AI flow orchestration
- **Express.js** server for REST API
- **Google Gemini 2.5 Flash** as the LLM
- **TypeScript** throughout for type safety

## 🔧 Key Changes and Why We Made Them

### 1. **From Genkit UI to REST API**

**What we changed:**

- Added Express.js server to expose Genkit flows as HTTP endpoints
- Created REST API wrapper around Genkit functionality

**Why:**

```javascript
// Before: Only accessible through Genkit Developer UI
// After: Accessible via REST API
POST /api/flows/orderSupportFlow
{
  "data": "What's my order status for 123-456?"
}
```

**Reasoning:**

- Genkit's Developer UI is great for testing but not suitable for production apps
- REST APIs provide universal access from any frontend framework
- Enables integration with web, mobile, or other applications

### 2. **Backend Architecture Refactoring**

**What we changed:**

```
Before (monolithic):
src/index.ts (everything mixed together)

After (modular):
src/
├── index.ts          # Entry point
├── server.ts         # Express configuration
├── genkit.ts         # AI logic
├── routes/
│   ├── flows.ts      # Flow endpoints
│   └── health.ts     # Health checks
└── types/
    └── api.ts        # TypeScript interfaces
```

**Why we refactored:**

1. **Separation of Concerns**: Genkit logic is completely separate from HTTP server logic
2. **Maintainability**: Each file has a single responsibility
3. **Scalability**: Easy to add new AI flows or API endpoints
4. **Testability**: Each module can be unit tested independently
5. **Type Safety**: Clear interfaces for all API contracts

### 3. **Express Server Integration**

**What we added:**

```typescript
// server.ts - Clean Express setup
app.use("/api/flows", flowsRouter);
app.use("/health", healthRouter);

// routes/flows.ts - Dedicated flow handling
router.post("/orderSupportFlow", async (req, res) => {
  const { data }: FlowRequest = req.body;
  const result = await orderSupportFlow(data);
  res.json({ result });
});
```

**Why Express over alternatives:**

- **Simplicity**: Lightweight and well-documented
- **Ecosystem**: Huge middleware ecosystem
- **Flexibility**: Easy to add authentication, logging, rate limiting
- **Performance**: Fast enough for our use case
- **Community**: Large community and extensive resources

### 4. **Angular Frontend with Kendo UI**

**What we built:**

```typescript
// GenkitService - Clean HTTP communication
export class GenkitService {
  public sendMessage(text: string): void {
    const payload = { data: text };
    this.http
      .post<GenkitResponse>(GENKIT_API_URL, payload)
      .subscribe((response) => {
        this._response.set({
          author: BOT,
          text: response.result,
          timestamp: new Date(),
        });
      });
  }
}
```

**Why Angular + Kendo UI:**

- **Angular 20**: Latest features, standalone components, signals
- **Kendo UI**: Professional chat components out of the box
- **TypeScript**: End-to-end type safety
- **Reactive**: Signal-based state management

## 🛠️ Technical Decisions Deep Dive

### CORS Configuration

```typescript
app.use(
  cors({
    origin: [
      "http://localhost:4200", // Angular default
      "http://localhost:4201", // Alternative port
      "http://localhost:56354", // Dynamic ports
      "http://localhost:57784",
    ],
    credentials: true,
  })
);
```

**Why:** Support multiple development environments and dynamic port allocation.

### Environment Configuration

```bash
# .env.example
GOOGLE_GENAI_API_KEY=your_key_here
PORT=3400
NODE_ENV=development
```

**Why:** Keep sensitive data secure and environment-specific configuration separate.

### TypeScript Interfaces

```typescript
export interface FlowRequest {
  data: string;
}

export interface FlowResponse {
  result: string;
}
```

**Why:** Ensure type safety between frontend and backend, catch errors at compile time.

## 🎉 Results Achieved

### ✅ **Functional Benefits**

- Real-time AI chat interface
- Order status inquiries with tool calling
- Error handling and loading states
- Health monitoring endpoints

### ✅ **Technical Benefits**

- Clean separation of concerns
- Scalable modular architecture
- Type-safe end-to-end communication
- Easy to add new AI flows
- Production-ready structure

### ✅ **Developer Experience**

- Hot reload in development
- Clear error messages
- Comprehensive documentation
- Easy setup with `.env.example`

## 🔮 What's Next

This architecture sets us up for future enhancements:

1. **Authentication**: Easy to add JWT middleware
2. **Rate Limiting**: Express middleware for API protection
3. **Monitoring**: Health checks and metrics endpoints ready
4. **New AI Flows**: Simple to add new Genkit flows
5. **Database Integration**: Clean service layer for data persistence
6. **Deployment**: Docker-ready structure

## 📚 Key Learnings

1. **Genkit + Express**: Powerful combination for AI applications
2. **Modular Architecture**: Upfront investment pays off in maintainability
3. **Type Safety**: TypeScript interfaces prevent runtime errors
4. **Separation of Concerns**: Keep AI logic separate from HTTP logic
5. **Developer Experience**: Good tooling and documentation accelerate development

## 🎯 Takeaways

Building this AI chat application taught us that:

- Modern AI frameworks like Genkit work best when properly architected
- REST APIs provide the flexibility needed for real applications
- Clean separation of concerns is crucial for maintainable AI applications
- TypeScript and proper interfaces prevent many common integration issues
- The upfront investment in good architecture pays dividends in development speed

The end result is a production-ready AI chat application with clean architecture, type safety, and room for future growth.
