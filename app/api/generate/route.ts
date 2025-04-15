import {
  /* OpenAIStream,  */ /* StreamingTextResponse, */ streamText,
  /* StreamTextResult, */
} from "ai";
import OpenAI from "openai";
import { google } from "@ai-sdk/google";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_MESSAGE = `You are a helpful AI assistant that generates HTML DOM structures. 
Your task is to create valid HTML code based on the user's description.
IMPORTANT: 
1. Do not include DOCTYPE
2. The generated code MUST be wrapped in <html> and <body> tags
3. Use semantic HTML elements where appropriate
4. Include necessary attributes for accessibility
5. Keep the structure clean and well-formatted
6. The code should be in HTML format
7. Use BEM naming convention for classes if needed
8. The main content should be placed inside the <body> tag`;

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const response = await streamText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
      system: SYSTEM_MESSAGE,
    });

    return response.toTextStreamResponse();
  } catch (error) {
    console.error("Error in generate route:", error);
    return new Response("Failed to generate content", { status: 500 });
  }
}
