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
          "You are a Polish language teacher. Evaluate the user's English translation of a Polish sentence. Provide feedback on accuracy and suggest improvements if needed. Answer completly in markdown formatting",
      },
      { role: "user", content: input },
    ],
    model: "gpt-4o",
    temperature: 0.7,
    max_tokens: 4096,
    top_p: 1,
  });
  return response.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  const { polishSentence, userTranslation } = await request.json();
  const feedback = await main(
    `Polish sentence: "${polishSentence}". User's translation: "${userTranslation}". Evaluate the translation and provide feedback.`
  );
  return Response.json({ feedback });
}
