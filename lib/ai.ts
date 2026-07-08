import OpenAI from "openai";

import {
  SUMMARY_PROMPT,
  REPLY_PROMPT,
  MEETING_PROMPT,
  DAILY_BRIEF_PROMPT,
} from "@/lib/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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