import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse, checkAILimit } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], emails = [], calendar = [], appwriteId } = await request.json();

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

    const reply = await generateChatResponse(message, history, emails, calendar);

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
  } catch (error) {
    console.error("AI Chat Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate chat response.",
      },
      {
        status: 500,
      }
    );
  }
}
