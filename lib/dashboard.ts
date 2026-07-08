import {
  getInbox,
  getEmail,
  parseEmail,
  getUnreadEmailCount,
  getImportantEmails,
} from "./gmail";

import {
  getEvents,
  parseEvent,
} from "./calendar";

export async function getDashboardData(
  accessToken: string
) {
  // ---------------- Gmail ----------------

  const unreadCount =
    await getUnreadEmailCount(accessToken);

  const importantResult =
    await getImportantEmails(accessToken);

  let priorityEmails: any[] = [];

  if (importantResult.messages?.length) {
    const emails = await Promise.all(
      importantResult.messages
        .slice(0, 5)
        .map((message: any) =>
          getEmail(accessToken, message.id)
        )
    );

    priorityEmails = emails.map(parseEmail);
  }

  // Recent Inbox

  const inbox = await getInbox(accessToken);

  let recentEmails: any[] = [];

  if (inbox.messages?.length) {
    const emails = await Promise.all(
      inbox.messages
        .slice(0, 5)
        .map((message: any) =>
          getEmail(accessToken, message.id)
        )
    );

    recentEmails = emails.map(parseEmail);
  }

  // ---------------- Calendar ----------------

  const calendar = await getEvents(accessToken);

  const events =
    calendar.items?.map(parseEvent) ?? [];

  const today = new Date();

  const todayEvents = events.filter((event: any) => {
    const date = new Date(event.start);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() ===
        today.getFullYear()
    );
  });

  return {
    unreadCount,

    priorityEmails,

    recentEmails,

    todayEvents,

    meetingsCount: todayEvents.length,

    events,
  };
}