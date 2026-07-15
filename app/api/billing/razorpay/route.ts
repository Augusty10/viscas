import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { appwriteId } = await request.json();

    if (!appwriteId) {
      return NextResponse.json(
        { success: false, message: "User session required." },
        { status: 401 }
      );
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { appwriteId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User account not synced." },
        { status: 404 }
      );
    }

    const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_dummykey123";
    const key_secret = process.env.RAZORPAY_KEY_SECRET || "dummysecret123";

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: 1900, // 19.00 INR (paise) or USD equivalent
      currency: "INR",
      receipt: `receipt_${user.id}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      keyId: key_id,
    });
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create payment order." },
      { status: 500 }
    );
  }
}
