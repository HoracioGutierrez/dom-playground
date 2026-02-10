import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_MESSAGE = `You are a helpful AI assistant that generates HTML DOM structures.
Your task is to create valid HTML code based on the user's description.
IMPORTANT:
1. Generate ONLY the content elements described - do NOT wrap in html/head/body unless the user explicitly asks for a full page
2. Do NOT use markdown code fences. Output ONLY raw HTML
3. Do not include DOCTYPE
4. Use semantic HTML elements where appropriate
5. Include necessary attributes for accessibility
6. Keep the structure clean and well-formatted
7. The code should be in HTML format
8. Use BEM naming convention for classes if needed`;

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const response = await streamText({
      model: google("gemini-2.0-flash"),
      prompt: prompt,
      system: SYSTEM_MESSAGE,
    });

    return response.toTextStreamResponse();
  } catch (error) {
    console.error("Error in generate route:", error);
    return new Response("Failed to generate content", { status: 500 });
  }
}
