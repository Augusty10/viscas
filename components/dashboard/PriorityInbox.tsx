"use client";

import { useEffect, useState } from "react";
import { Star, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  getImportantEmails,
  getEmail,
  parseEmail,
} from "@/lib/gmail";

type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
};

type PriorityInboxProps = {
  emails?: Email[];
};

export default function PriorityInbox({ emails: propEmails }: PriorityInboxProps) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(propEmails === undefined);

  useEffect(() => {
    if (propEmails !== undefined) {
      setEmails(propEmails);
      setLoading(false);
      return;
    }

    async function loadPriorityEmails() {
      try {
        const token = localStorage.getItem("google_access_token");

        if (!token) {
          setLoading(false);
          return;
        }

        const result = await getImportantEmails(token);

        if (!result.messages) {
          setLoading(false);
          return;
        }

        const fetched = await Promise.all(
          result.messages.slice(0, 5).map((message: any) =>
            getEmail(token, message.id)
          )
        );

        setEmails(fetched.map(parseEmail));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPriorityEmails();
  }, [propEmails]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Priority Inbox
          </h2>

          <p className="text-sm text-slate-500">
            Important Gmail messages
          </p>
        </div>

        <Link
          href="/dashboard/gmail"
          className="flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-slate-500">
          Loading emails...
        </div>
      ) : emails.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <Mail className="mx-auto mb-3 h-10 w-10 text-slate-400" />

          <p className="font-medium">
            No important emails
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Your important Gmail messages will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
          {emails.map((email) => (
            <div
              key={email.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold">
                    {email.sender}
                  </p>

                  <p className="mt-1 font-medium text-slate-700">
                    {email.subject || "(No Subject)"}
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {email.snippet}
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    {new Date(email.date).toLocaleString()}
                  </p>
                </div>

                <Star className="ml-4 h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}