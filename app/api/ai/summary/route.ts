import { NextRequest, NextResponse } from "next/server";
import { generateSummary, checkAILimit } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, appwriteId } = await request.json();

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

    // Check AI Limit
    const limitCheck = await checkAILimit(appwriteId);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: limitCheck.message,
        },
        {
          status: 403,
        }
      );
    }

    const summary = await generateSummary(email);

    // Save history
    if (appwriteId) {
      try {
        const user = await prisma.user.findUnique({
          where: { appwriteId },
        });
        if (user) {
          await prisma.aIHistory.create({
            data: {
              userId: user.id,
              feature: "summary",
              prompt: `Summarize email: ${email.substring(0, 100)}...`,
              response: summary || "",
            },
          });
        }
      } catch (dbErr) {
        console.error("Failed to log summary to database:", dbErr);
      }
    }

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