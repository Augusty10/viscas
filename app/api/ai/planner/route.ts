import { NextRequest, NextResponse } from "next/server";

import { generateMeetingPlan } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { event } = await request.json();

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

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error("AI Planner Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate meeting plan.",
      },
      {
        status: 500,
      }
    );
  }
}