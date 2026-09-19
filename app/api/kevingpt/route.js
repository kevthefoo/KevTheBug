import OpenAI from "openai";
import { handleChat } from "@/lib/chat-handler.mjs";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request) {
  return handleChat(request, {
    generate: async (input) => {
      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_SECRET_KEY,
        maxRetries: 0,
        timeout: 15000,
      });
      return client.responses.create(input);
    },
  });
}
