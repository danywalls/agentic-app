import { genkit, z } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model("gemini-2.5-flash", {
    temperature: 0.8,
  }),
});

export const getOrderStatusTool = ai.defineTool(
  {
    name: "getOrderStatus",

    description: "Get the status of a user's order by their order ID.",

    inputSchema: z.object({
      orderId: z.string().describe("The unique ID of the customer's order"),
    }),

    outputSchema: z.object({
      status: z.string(),
      estimatedDelivery: z.string(),
    }),
  },
  async (input) => {
    if (input.orderId === "123-456") {
      return { status: "Shipped", estimatedDelivery: "October 9, 2025" };
    }

    return { status: "Not Found", estimatedDelivery: "N/A" };
  },
);
export const orderSupportFlow = ai.defineFlow(
  {
    name: "orderSupportFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const llmResponse = await ai.generate({
      prompt: prompt,
      tools: [getOrderStatusTool],
    });
    return llmResponse.text;
  },
);

// Express server to expose the flow as REST API
const app = express();
const PORT = process.env.PORT || 3400;

// Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:56354', 'http://localhost:57784'], // Angular dev server ports
  credentials: true
}));
app.use(express.json());

// API endpoint for the order support flow
app.post('/api/flows/orderSupportFlow', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { data } = req.body;
    
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ error: 'Invalid input: data field is required and must be a string' });
    }

    const result = await orderSupportFlow(data);
    console.log('Flow result:', result);
    
    res.json({ result });
  } catch (error) {
    console.error('Error executing flow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/flows/orderSupportFlow`);
});
