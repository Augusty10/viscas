import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { appwriteId, name, email, avatar } =
      await request.json();

    if (!appwriteId || !email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: {
        appwriteId,
      },
      update: {
        name,
        email,
        avatar,
      },
      create: {
        appwriteId,
        name,
        email,
        avatar,
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: any) {
    console.error("User sync error:", error);

    let errorMessage = "Failed to sync user.";
    const errorStr = String(error?.message || error || "");

    if (
      errorStr.includes("paused due to inactivity") ||
      errorStr.includes("restore it from the console")
    ) {
      errorMessage = "Project is paused due to inactivity. Please restore it from the console to resume operations.";
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}