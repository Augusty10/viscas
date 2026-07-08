export async function getInbox(accessToken: string) {
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch inbox");
  }

  return response.json();
}

export async function getEmail(
  accessToken: string,
  messageId: string
) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch email");
  }

  return response.json();
}




// export function parseEmail(email: any) {
//   const headers = email.payload.headers;

//   const getHeader = (name: string) =>
//     headers.find((h: any) => h.name === name)?.value || "";

//   return {
//     id: email.id,
//     sender: getHeader("From"),
//     subject: getHeader("Subject"),
//     snippet: email.snippet,
//     date: getHeader("Date"),
//   };
// // }

export function parseEmail(email: any) {
  const headers = email.payload.headers;

  const getHeader = (name: string) =>
    headers.find((h: any) => h.name === name)?.value || "";

  function decodeBase64(data?: string) {
    if (!data) return "";

    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");

    try {
      return decodeURIComponent(
        escape(window.atob(base64))
      );
    } catch {
      return window.atob(base64);
    }
  }

  let body = "";

  // Simple text email
  if (email.payload.body?.data) {
    body = decodeBase64(email.payload.body.data);
  }

  // Multipart email
  if (!body && email.payload.parts) {
    const part = email.payload.parts.find(
      (p: any) => p.mimeType === "text/plain"
    );

    if (part?.body?.data) {
      body = decodeBase64(part.body.data);
    }
  }

  // Fallback
  if (!body) {
    body = email.snippet;
  }

  return {
    id: email.id,
    sender: getHeader("From"),
    subject: getHeader("Subject"),
    snippet: email.snippet,
    body,
    date: getHeader("Date"),
  };
}
export async function searchEmails(
  accessToken: string,
  query: string
) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(
      query
    )}&maxResults=20`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  return response.json();
}