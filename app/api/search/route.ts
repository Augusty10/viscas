import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || !query.trim()) {
      return NextResponse.json({ success: true, emails: [], events: [] });
    }

    const [emails, events] = await Promise.all([
      prisma.email.findMany({
        where: {
          OR: [
            { subject: { contains: query, mode: "insensitive" } },
            { sender: { contains: query, mode: "insensitive" } },
            { summary: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.calendarEvent.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { location: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      success: true,
      emails,
      events,
    });
  } catch (error) {
    console.error("Global search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to perform global search.",
      },
      {
        status: 500,
      }
    );
  }
}
