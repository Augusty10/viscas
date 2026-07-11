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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync user.",
      },
      {
        status: 500,
      }
    );
  }
}