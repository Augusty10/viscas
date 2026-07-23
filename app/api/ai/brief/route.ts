import { NextRequest, NextResponse } from "next/server";
import { generateDailyBrief, checkAILimit } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { emails, calendar, appwriteId } = await request.json();

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

    const brief = await generateDailyBrief(emails, calendar);

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
              feature: "brief",
              prompt: `Daily brief context - emails: ${emails?.length || 0} characters, calendar: ${calendar?.length || 0} characters`,
              response: brief || "",
            },
          });
        }
      } catch (dbErr) {
        console.error("Failed to log brief to database:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      brief,
    });
  } catch (error: any) {
    console.error("AI Brief Error:", error);

    let message = "Failed to generate daily brief.";
    const errMsg = error?.message || "";
    if (
      errMsg.includes("paused") ||
      errMsg.includes("inactivity") ||
      errMsg.includes("restore")
    ) {
      message = errMsg;
    }

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      }
    );
  }
}