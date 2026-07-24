import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { sendEmail } from "./gmail";
import { createEvent } from "./calendar";

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

function cleanJSONString(str: string): string {
  if (!str) return "";
  let cleaned = str.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

/**
 * Email Summary
 */
export async function generateSummary(email: string) {
  const res = await generate(`
${SUMMARY_PROMPT}

EMAIL:

${email}
`);
  return cleanJSONString(res);
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
  const res = await generate(`
${MEETING_PROMPT}

MEETING:

${event}
`);
  return cleanJSONString(res);
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
  calendar: any[],
  googleAccessToken?: string | null
) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: `${CHAT_ASSISTANT_PROMPT}
      
Current local time is: ${new Date().toISOString()}

WORKSPACE CONTEXT:
EMAILS:
${JSON.stringify(emails, null, 2)}

CALENDAR EVENTS:
${JSON.stringify(calendar, null, 2)}`,
    },
  ];

  // Add conversation history
  for (const msg of history) {
    const role = msg.role === "user" ? "user" : "assistant";
    messages.push({
      role,
      content: msg.content,
    });
  }

  // Add user message
  messages.push({
    role: "user",
    content: message,
  });

  const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
      type: "function",
      function: {
        name: "send_email",
        description: "Send an email to a recipient.",
        parameters: {
          type: "object",
          properties: {
            to: {
              type: "string",
              description: "The recipient's email address.",
            },
            subject: {
              type: "string",
              description: "The email subject line.",
            },
            body: {
              type: "string",
              description: "The body of the email in plain text.",
            },
          },
          required: ["to", "subject", "body"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "create_calendar_event",
        description: "Schedule/create a new calendar event or meeting.",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the meeting or event.",
            },
            description: {
              type: "string",
              description: "The description of the meeting or event.",
            },
            location: {
              type: "string",
              description: "The location (physical address or link) for the meeting.",
            },
            start: {
              type: "string",
              description: "The start date and time of the event (ISO 8601 string, e.g. '2026-07-25T14:00:00+05:30').",
            },
            end: {
              type: "string",
              description: "The end date and time of the event (ISO 8601 string, e.g. '2026-07-25T15:00:00+05:30').",
            },
            attendees: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of attendee email addresses.",
            },
            createMeetLink: {
              type: "boolean",
              description: "Whether to create a Google Meet conference link for this event.",
            },
          },
          required: ["title", "start", "end"],
        },
      },
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages,
      tools,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0].message;

    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      messages.push(responseMessage);

      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.type !== "function") continue;
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        let toolResult = "";
        try {
          if (!googleAccessToken) {
            toolResult = "Error: Google Account is not connected. Tell the user to connect their Google Account to send emails or schedule calendar events.";
          } else if (functionName === "send_email") {
            const { to, subject, body } = functionArgs;
            await sendEmail(googleAccessToken, to, subject, body);
            toolResult = `Successfully sent email to ${to} with subject "${subject}".`;
          } else if (functionName === "create_calendar_event") {
            const { title, description, location, start, end, attendees, createMeetLink } = functionArgs;
            const event = await createEvent(googleAccessToken, {
              title,
              description,
              location,
              start,
              end,
              attendees,
              createMeetLink,
            });
            toolResult = `Successfully scheduled calendar event: "${title}" starting at ${start} and ending at ${end}. Event ID: ${event.id}.`;
          }
        } catch (error: any) {
          console.error(`Error executing tool ${functionName}:`, error);
          toolResult = `Error executing action: ${error.message || error}`;
        }

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: toolResult,
        } as any);
      }

      const secondResponse = await openai.chat.completions.create({
        model: MODEL,
        messages,
      });

      return secondResponse.choices[0].message.content;
    }

    return responseMessage.content;
  } catch (error) {
    console.error("OpenAI Chat Assistant Error:", error);
    throw new Error("Failed to generate AI response.");
  }
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
  } catch (error: any) {
    console.error("Error in checkAILimit:", error);
    const errorStr = String(error?.message || error || "");
    if (
      errorStr.includes("paused due to inactivity") ||
      errorStr.includes("restore it from the console")
    ) {
      throw new Error("Project is paused due to inactivity. Please restore it from the console to resume operations.");
    }
    // Graceful fallback to allow request if DB query fails to prevent breaking app
    return { allowed: true, count: 0, plan: "FREE" };
  }
}