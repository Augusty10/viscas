"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { getInbox } from "@/lib/gmail";

export default function GmailConnectButton() {
  const login = useGoogleLogin({
    scope: [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),

    onSuccess: async (tokenResponse) => {
      console.log("Access Token:", tokenResponse.access_token);

      try {
        const inbox = await getInbox(tokenResponse.access_token);

        console.log("Inbox:", inbox);
      } catch (error) {
        console.error("Failed to fetch inbox:", error);
      }
    },

    onError: () => {
      console.log("Google Consent Failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="rounded-xl bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
    >
      Connect Gmail
    </button>
  );
}