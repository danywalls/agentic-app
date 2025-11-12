import express from "express";
import cors from "cors";
import flowsRouter from "./routes/flows";
import healthRouter from "./routes/health";

const app = express();
const PORT = process.env.PORT || 3400;

app.use(cors({
  origin: [
    'http://localhost:4200', 
    'http://localhost:4201', 
    'http://localhost:56354', 
    'http://localhost:57784'
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/flows', flowsRouter);
app.use('/health', healthRouter);

export function startServer() {
  return new Promise<void>((resolve) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🤖 API endpoint: http://localhost:${PORT}/api/flows`);
      resolve();
    });
  });
}

export { app };