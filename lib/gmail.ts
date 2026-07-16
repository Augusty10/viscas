/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function getAttachment(
  accessToken: string,
  messageId: string,
  attachmentId: string
) {
  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch attachment");
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

  // Parse attachments
  const attachments: { filename: string; mimeType: string; attachmentId: string; size: number }[] = [];
  if (email.payload.parts) {
    email.payload.parts.forEach((part: any) => {
      if (part.filename && part.body?.attachmentId) {
        attachments.push({
          filename: part.filename,
          mimeType: part.mimeType,
          attachmentId: part.body.attachmentId,
          size: part.body.size || 0,
        });
      }
      if (part.parts) {
        part.parts.forEach((subPart: any) => {
          if (subPart.filename && subPart.body?.attachmentId) {
            attachments.push({
              filename: subPart.filename,
              mimeType: subPart.mimeType,
              attachmentId: subPart.body.attachmentId,
              size: subPart.body.size || 0,
            });
          }
        });
      }
    });
  }

  return {
    id: email.id,
    sender: getHeader("From"),
    subject: getHeader("Subject"),
    snippet: email.snippet,
    body,
    date: getHeader("Date"),
    attachments,
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
// ================================
// Dashboard APIs
// ================================

export async function getUnreadEmailCount(
  accessToken: string
) {
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch unread emails");
  }

  const data = await response.json();

  return data.resultSizeEstimate ?? 0;
}

export async function getStarredEmails(
  accessToken: string
) {
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:starred&maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch starred emails");
  }

  return response.json();
}

export async function getImportantEmails(
  accessToken: string
) {
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:important&maxResults=10",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch important emails");
  }

  return response.json();
}

export async function sendEmail(
  accessToken: string,
  to: string,
  subject: string,
  body: string
) {
  const emailContent = [
    `To: ${to}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Mime-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body
  ].join('\r\n');

  const encodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        raw: encodedEmail,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to send email");
  }

  return response.json();
}

export async function getFolderMessages(
  accessToken: string,
  folder: string
) {
  let query = "label:INBOX";
  if (folder === "starred") {
    query = "label:STARRED";
  } else if (folder === "sent") {
    query = "label:SENT";
  } else if (folder === "drafts") {
    query = "label:DRAFT";
  } else if (folder === "spam") {
    query = "label:SPAM";
  } else if (folder === "trash") {
    query = "label:TRASH";
  }

  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(
      query
    )}&maxResults=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${folder} messages`);
  }

  return response.json();
}

export async function getSubscriptions(accessToken: string) {
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages for subscription scanner");
  }

  const listData = await response.json();
  if (!listData.messages || listData.messages.length === 0) {
    return [];
  }

  const emails = await Promise.all(
    listData.messages.map(async (msg: any) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=List-Unsubscribe&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (detailRes.ok) {
          return await detailRes.json();
        }
      } catch (e) {
        console.warn("Failed to fetch message metadata", e);
      }
      return null;
    })
  );

  const subscriptionsMap = new Map<string, any>();

  for (const email of emails) {
    if (!email || !email.payload?.headers) continue;

    const headers = email.payload.headers;
    const listUnsubscribe = headers.find((h: any) => h.name.toLowerCase() === "list-unsubscribe")?.value;
    
    if (!listUnsubscribe) continue;

    const fromVal = headers.find((h: any) => h.name.toLowerCase() === "from")?.value || "";
    const subject = headers.find((h: any) => h.name.toLowerCase() === "subject")?.value || "";
    const dateVal = headers.find((h: any) => h.name.toLowerCase() === "date")?.value || "";

    let senderName = "Unknown Sender";
    let senderEmail = fromVal;

    const emailMatch = fromVal.match(/^(.*?)\s*<([^>]+)>/);
    if (emailMatch) {
      senderName = emailMatch[1].replace(/['"]/g, "").trim() || "Unknown Sender";
      senderEmail = emailMatch[2].trim();
    } else {
      senderName = fromVal.split("@")[0] || "Unknown Sender";
    }

    const mailtoMatch = listUnsubscribe.match(/<mailto:([^>]+)>/i);
    const urlMatch = listUnsubscribe.match(/<(https?:\/\/[^>]+)>/i);

    const mailto = mailtoMatch ? mailtoMatch[1] : null;
    const unsubscribeUrl = urlMatch ? urlMatch[1] : null;

    if (!mailto && !unsubscribeUrl) continue;

    if (!subscriptionsMap.has(senderEmail)) {
      subscriptionsMap.set(senderEmail, {
        id: email.id,
        senderName,
        senderEmail,
        subject,
        date: dateVal,
        mailto,
        unsubscribeUrl,
        status: "active",
      });
    }
  }

  return Array.from(subscriptionsMap.values());
}