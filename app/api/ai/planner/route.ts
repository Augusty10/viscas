import { NextRequest, NextResponse } from "next/server";
import { generateMeetingPlan, checkAILimit } from "@/lib/ai";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { event, appwriteId } = await request.json();

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Meeting details are required.",
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

    const meeting = `
Title: ${event.title}

Description:
${event.description}

Location:
${event.location}

Start:
${event.start}

End:
${event.end}

Attendees:
${event.attendees
  ?.map((attendee: any) => attendee.email)
  .join(", ") || "None"}

Google Meet:
${event.meetLink || "N/A"}
`;

    const plan = await generateMeetingPlan(meeting);

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
              feature: "planner",
              prompt: `Meeting plan query for: ${event.title}`,
              response: plan || "",
            },
          });
        }
      } catch (dbErr) {
        console.error("Failed to log planner to database:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch (error: any) {
    console.error("AI Planner Error:", error);

    let message = "Failed to generate meeting plan.";
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