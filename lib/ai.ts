import OpenAI from "openai";
import prisma from "@/lib/prisma";

import {
  SUMMARY_PROMPT,
  REPLY_PROMPT,
  MEETING_PROMPT,
  DAILY_BRIEF_PROMPT,
  CHAT_ASSISTANT_PROMPT,
} from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build",
});

const MODEL =
  process.env.OPENAI_MODEL ?? "gpt-4o-mini";

/**
 * Generic AI Request
 */
async function generate(prompt: string) {
  try {
    const response = await openai.responses.create({
      model: MODEL,
      input: prompt,
      temperature: 0.3,
    });

    return response.output_text;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate AI response.");
  }
}

/**
 * Email Summary
 */
export async function generateSummary(email: string) {
  return generate(`
${SUMMARY_PROMPT}

EMAIL:

${email}
`);
}

/**
 * Smart Reply
 */
export async function generateReply(email: string) {
  return generate(`
${REPLY_PROMPT}

EMAIL:

${email}
`);
}

/**
 * Meeting Planner
 */
export async function generateMeetingPlan(event: string) {
  return generate(`
${MEETING_PROMPT}

MEETING:

${event}
`);
}

/**
 * Daily Brief
 */
export async function generateDailyBrief(
  emails: string,
  calendar: string
) {
  return generate(`
${DAILY_BRIEF_PROMPT}

EMAILS:

${emails}

CALENDAR:

${calendar}
`);
}

/**
 * Chat Assistant
 */
export async function generateChatResponse(
  message: string,
  history: { role: "user" | "assistant"; content: string }[],
  emails: any[],
  calendar: any[]
) {
  const formattedHistory = history
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n\n");

  const prompt = `
${CHAT_ASSISTANT_PROMPT}

WORKSPACE CONTEXT:
EMAILS:
${JSON.stringify(emails, null, 2)}

CALENDAR EVENTS:
${JSON.stringify(calendar, null, 2)}

CONVERSATION HISTORY:
${formattedHistory}

USER MESSAGE:
${message}
`;

  return generate(prompt);
}

/**
 * Check AI Usage Limit
 */
export async function checkAILimit(appwriteId?: string): Promise<{ allowed: boolean; count: number; plan: string; message?: string }> {
  if (!appwriteId) {
    return { allowed: true, count: 0, plan: "FREE" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { appwriteId },
      include: {
        _count: {
          select: { aiHistory: true },
        },
      },
    });

    if (!user) {
      return { allowed: true, count: 0, plan: "FREE" };
    }

    const count = user._count.aiHistory;
    const plan = user.plan || "FREE";

    if (plan === "FREE" && count >= 10) {
      return {
        allowed: false,
        count,
        plan,
        message: "You have reached the limit of 10 free AI requests. Please upgrade to Premium.",
      };
    }

    return { allowed: true, count, plan };
  } catch (error) {
    console.error("Error in checkAILimit:", error);
    // Graceful fallback to allow request if DB query fails to prevent breaking app
    return { allowed: true, count: 0, plan: "FREE" };
  }
}