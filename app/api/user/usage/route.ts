import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const appwriteId = searchParams.get("appwriteId");

    if (!appwriteId) {
      return NextResponse.json(
        { success: false, message: "Missing user ID." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { appwriteId },
      include: {
        _count: {
          select: { aiHistory: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      count: user._count.aiHistory,
      plan: user.plan,
    });
  } catch (error) {
    console.error("GET Usage Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error retrieving usage." },
      { status: 500 }
    );
  }
}
