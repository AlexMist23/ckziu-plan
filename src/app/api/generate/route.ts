import { NextRequest } from "next/server";
import OpenAI from "openai";

const token = process.env.GITHUB_ACCESS_TOKEN;

async function main(input: string) {
  if (!token) {
    throw new Error("GITHUB_ACCESS_TOKEN environment variable not set");
  }
  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });

  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a Polish language teacher. Generate a medium length Polish sentence based on the given context.",
      },
      { role: "user", content: input },
    ],
    model: "gpt-4o",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1,
  });
  return response.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  const { context } = await request.json();
  const sentence = await main(
    `Generate a simple Polish sentence about: ${context}`
  );
  return Response.json({ sentence });
}
