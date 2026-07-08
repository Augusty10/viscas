import { NextRequest, NextResponse } from "next/server";

import { generateDailyBrief } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { emails, calendar } = await request.json();

    const brief = await generateDailyBrief(
      emails,
      calendar
    );

    return NextResponse.json({
      success: true,
      brief,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate daily brief.",
      },
      {
        status: 500,
      }
    );
  }
}