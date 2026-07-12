"use client";

import { useState, useEffect } from "react";

import GmailLayout from "./GmailLayout";
import GmailConnectButton from "./GmailConnectButton";
import EmailList from "./EmailList";
import EmailPreview from "./EmailPreview";
import AISummary from "./AISummary";
import SuggestedReplies from "./SuggestedReplies";
import EmailActions from "./EmailActions";
import ComposeWindow from "./ComposeWindow";
import { useGmailStore } from "@/hooks/useGmail";

import {
  getInbox,
  getEmail,
  parseEmail,
  searchEmails,
} from "@/lib/gmail";

type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
};

export default function GmailWorkspace() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const setStoreAccessToken = useGmailStore((state) => state.setAccessToken);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("google_access_token");
    if (token) {
      setAccessToken(token);
      setStoreAccessToken(token);

      const loadInbox = async () => {
        try {
          const inbox = await getInbox(token);
          const emailsData = await Promise.all(
            inbox.messages.map((message: any) =>
              getEmail(token, message.id)
            )
          );
          const parsed = emailsData.map(parseEmail);
          setEmails(parsed);
          if (parsed.length > 0) {
            setSelectedEmail(parsed[0]);
          }
        } catch (error) {
          console.error("Auto-fetch failed, token might be expired:", error);
        }
      };
      loadInbox();
    }
  }, [setStoreAccessToken]);

  const handleConnected = (
    gmailEmails: Email[],
    token: string
  ) => {
    setEmails(gmailEmails);
    setAccessToken(token);
    setStoreAccessToken(token);

    if (gmailEmails.length > 0) {
      setSelectedEmail(gmailEmails[0]);
    }
  };

  const handleSearch = async (query: string) => {
    if (!accessToken) return;

    if (!query.trim()) {
      handleRefresh();
      return;
    }

    try {
      const result = await searchEmails(accessToken, query);

      if (!result.messages) {
        setEmails([]);
        setSelectedEmail(null);
        return;
      }

      const fetchedEmails = await Promise.all(
        result.messages.map((message: any) =>
          getEmail(accessToken, message.id)
        )
      );

      const parsed = fetchedEmails.map(parseEmail);

      setEmails(parsed);

      if (parsed.length > 0) {
        setSelectedEmail(parsed[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefresh = async () => {
    if (!accessToken) return;

    try {
      const inbox = await getInbox(accessToken);

      const fetchedEmails = await Promise.all(
        inbox.messages.map((message: any) =>
          getEmail(accessToken, message.id)
        )
      );

      const parsed = fetchedEmails.map(parseEmail);

      setEmails(parsed);

      if (parsed.length > 0) {
        setSelectedEmail(parsed[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mb-4">
        <GmailConnectButton onConnected={handleConnected} />
      </div>

      <GmailLayout
        onSearch={handleSearch}
        onRefresh={handleRefresh}
      >
        <div className="grid h-full grid-cols-12 gap-6">
          <section className="col-span-4 overflow-y-auto">
            <EmailList
              emails={emails}
              onEmailSelect={setSelectedEmail}
            />
          </section>

          <section className="col-span-5 overflow-y-auto">
            <EmailPreview email={selectedEmail} />
          </section>

          <aside className="col-span-3 space-y-6 overflow-y-auto">
            <AISummary email={selectedEmail?.body || selectedEmail?.snippet || ""}/>
            <SuggestedReplies email={selectedEmail} />
            <EmailActions />
          </aside>
        </div>
      </GmailLayout>

      <ComposeWindow onSent={handleRefresh} />
    </>
  );
}