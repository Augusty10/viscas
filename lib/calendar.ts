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