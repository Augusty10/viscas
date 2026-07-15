import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      appwriteId,
    } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !appwriteId) {
      return NextResponse.json(
        { success: false, message: "Missing payment parameters." },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || "dummysecret123";

    // Generate expected signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(text)
      .digest("hex");

    // Allow mock pass in development or verify signature
    const isValid =
      generated_signature === razorpay_signature ||
      key_secret === "dummysecret123" ||
      !process.env.RAZORPAY_KEY_SECRET;

    if (isValid) {
      // Update plan to PREMIUM
      const user = await prisma.user.update({
        where: { appwriteId },
        data: { plan: "PREMIUM" },
      });

      return NextResponse.json({
        success: true,
        message: "Payment successfully verified and plan upgraded!",
        user,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Signature verification failed." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server verification error." },
      { status: 500 }
    );
  }
}
