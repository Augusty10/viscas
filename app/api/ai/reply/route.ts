import { NextRequest, NextResponse } from "next/server";

import { generateReply } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email content is required.",
        },
        {
          status: 400,
        }
      );
    }

    const reply = await generateReply(email);

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Reply Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate AI reply.",
      },
      {
        status: 500,
      }
    );
  }
}