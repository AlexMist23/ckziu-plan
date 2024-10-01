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
          "You are a Polish to English translator. Translate the given Polish sentence to English.",
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
  const { sentence } = await request.json();
  const translation = await main(
    `Translate this Polish sentence to English: ${sentence}`
  );
  return Response.json({ translation });
}
