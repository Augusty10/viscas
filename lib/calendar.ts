export async function getEvents(accessToken: string) {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=20&singleEvents=true&orderBy=startTime",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

export function parseEvent(event: any) {
  return {
    id: event.id,
    title: event.summary || "Untitled Event",
    description: event.description || "",
    location: event.location || "",
    start:
      event.start?.dateTime ||
      event.start?.date,
    end:
      event.end?.dateTime ||
      event.end?.date,
    attendees: event.attendees || [],
    meetLink: event.hangoutLink || "",
  };
}

export async function createEvent(
  accessToken: string,
  eventData: {
    title: string;
    description?: string;
    location?: string;
    start: string;
    end: string;
    attendees?: string[];
    createMeetLink?: boolean;
  }
) {
  const body: any = {
    summary: eventData.title,
    description: eventData.description || "",
    location: eventData.location || "",
    start: {
      dateTime: eventData.start,
    },
    end: {
      dateTime: eventData.end,
    },
  };

  if (eventData.attendees && eventData.attendees.length > 0) {
    body.attendees = eventData.attendees.map((email) => ({ email }));
  }

  if (eventData.createMeetLink) {
    body.conferenceData = {
      createRequest: {
        requestId: Math.random().toString(36).substring(2, 11),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    };
  }

  const url = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
  if (eventData.createMeetLink) {
    url.searchParams.append("conferenceDataVersion", "1");
  }

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Failed to create calendar event");
  }

  return response.json();
}