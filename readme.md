# Agentic App

This project is an AI-powered order support application built with Google's Genkit and Angular. It demonstrates how to build an agentic workflow that can assist users with checking their order status.

## Overview

The application consists of a backend service powered by Genkit and a frontend chat interface. The AI agent uses the `gemini-2.5-flash` model to understand user queries and calls a custom tool to retrieve order information.

## Features

### Backend (`/backend`)
- **Framework**: Built using [Genkit](https://firebase.google.com/docs/genkit) and TypeScript.
- **AI Model**: Utilizes Google's `gemini` for natural language processing.
- **Tools**: Includes a `getOrderStatus` tool that can look up order details by ID.
    - *Note: Currently mocks data for order ID "123-456".*
- **Flows**: Defines an `orderSupportFlow` that orchestrates the interaction between the user prompt, the LLM, and the available tools.

### Frontend (`/genkit-frontend`)
- **Framework**: Angular application.
- **UI Component**: Integrates Kendo UI Conversational UI for a rich chat experience.
- **Integration**: Connects to the backend flow to send user messages and display the AI's responses.

## Getting Started

### Prerequisites
- Node.js installed.
- A Google Cloud project with Vertex AI API enabled (for Genkit).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (e.g., `GOOGLE_GENAI_API_KEY` if using AI Studio, or configured via `gcloud` for Vertex AI).
4. Start the Genkit developer UI:
   ```bash
   npx genkit start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd genkit-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`.

## Usage
1. Open the chat interface in the frontend.
2. Ask about an order, for example: "Where is my order 123-456?"
3. The agent will use the `getOrderStatus` tool to find the information and respond to you.
