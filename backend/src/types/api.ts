export interface FlowRequest {
  data: string;
}

export interface FlowResponse {
  result: string;
}

export interface ErrorResponse {
  error: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}