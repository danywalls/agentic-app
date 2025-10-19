import { Router } from "express";
import type { HealthResponse } from "../types/api.js";

const router = Router();

router.get('/', (req, res) => {
  const response: HealthResponse = { 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  };
  res.json(response);
});

export default router;