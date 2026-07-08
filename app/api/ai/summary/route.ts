import { NextRequest, NextResponse } from "next/server";

import { generateSummary } from "@/lib/ai";

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

    const summary = await generateSummary(email);

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("AI Summary Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate summary.",
      },
      {
        status: 500,
      }
    );
  }
}