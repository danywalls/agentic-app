import { Router } from "express";
import { orderSupportFlow } from "../genkit";
import type { FlowRequest, FlowResponse, ErrorResponse } from "../types/api";

const router = Router();

router.post('/orderSupportFlow', async (req, res) => {
  try {
    const { data }: FlowRequest = req.body;
    
    if (!data || typeof data !== 'string') {
      const errorResponse: ErrorResponse = { 
        error: 'Invalid input: data field is required and must be a string' 
      };
      return res.status(400).json(errorResponse);
    }

    const result = await orderSupportFlow(data);
    const response: FlowResponse = { result };
    
    res.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = { error: 'Internal server error' };
    res.status(500).json(errorResponse);
  }
});

export default router;