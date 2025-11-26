import { genkit, z } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import * as dotenv from "dotenv";

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