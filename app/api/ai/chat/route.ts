import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse, checkAILimit } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], emails = [], calendar = [], appwriteId, googleAccessToken } = await request.json();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
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

    const reply = await generateChatResponse(message, history, emails, calendar, googleAccessToken);

    // Persist to AI History if user is authenticated and synced
    if (appwriteId) {
      try {
        const user = await prisma.user.findUnique({
          where: { appwriteId },
        });

        if (user) {
          await prisma.aIHistory.create({
            data: {
              userId: user.id,
              feature: "chat",
              prompt: message,
              response: reply || "",
            },
          });
        }
      } catch (dbError) {
        console.error("Failed to log AI History to database:", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);

    let message = "Failed to generate chat response.";
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
