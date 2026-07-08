"use client";

import { useGoogleLogin } from "@react-oauth/google";
import {
  getInbox,
  getEmail,
  parseEmail,
} from "@/lib/gmail";

type GmailConnectButtonProps = {
  onConnected: (
    emails: any[],
    accessToken: string
  ) => void;
};

export default function GmailConnectButton({
  onConnected,
}: GmailConnectButtonProps) {
  const login = useGoogleLogin({
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),

    onSuccess: async (tokenResponse) => {
      try {
        const inbox = await getInbox(tokenResponse.access_token);

        const emails = await Promise.all(
          inbox.messages.map((message: any) =>
            getEmail(tokenResponse.access_token, message.id)
          )
        );

        const parsedEmails = emails.map(parseEmail);

        onConnected(
          parsedEmails,
          tokenResponse.access_token
        );
      } catch (error) {
        console.error(error);
      }
    },

    onError: () => {
      console.log("Google Consent Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
    >
      Connect Gmail
    </button>
  );
}