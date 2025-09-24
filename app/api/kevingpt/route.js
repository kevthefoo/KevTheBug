import OpenAI from "openai";

import { NextResponse } from "next/server";

export async function POST(req) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  });

  const body = await req.json();
  const userQuestion = body.userQuestion;
  console.log(userQuestion)
  try {
    const response = await client.responses.create({
      model: "gpt-5-nano-2025-08-07",
      input: `hello ${userQuestion} `,
    });

    const answer = response.output_text;
    
    return NextResponse.json({ answer: answer }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}
