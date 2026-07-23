import { NextRequest, NextResponse } from "next/server";
import { generateReply, checkAILimit } from "@/lib/ai";
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

    const reply = await generateReply(email);

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
              feature: "reply",
              prompt: `Draft reply for email: ${email.substring(0, 100)}...`,
              response: reply || "",
            },
          });
        }
      } catch (dbErr) {
        console.error("Failed to log reply to database:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error: any) {
    console.error("AI Reply Error:", error);

    let message = "Failed to generate AI reply.";
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