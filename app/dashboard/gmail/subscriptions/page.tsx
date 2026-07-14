"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GmailConnectButton from "@/components/gmail/GmailConnectButton";
import { getSubscriptions, sendEmail } from "@/lib/gmail";
import { Loader2, ShieldCheck, Mail, AlertCircle, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

type Subscription = {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  date: string;
  mailto: string | null;
  unsubscribeUrl: string | null;
  status: "active" | "unsubscribing" | "unsubscribed" | "failed";
};

export default function SubscriptionManager() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const googleToken = localStorage.getItem("google_access_token");
    if (googleToken) {
      setToken(googleToken);
      fetchSubscriptions(googleToken);
    }
  }, []);

  const fetchSubscriptions = async (googleToken: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const subs = await getSubscriptions(googleToken);
      setSubscriptions(subs);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to scan subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    const googleToken = localStorage.getItem("google_access_token");
    if (googleToken) {
      setToken(googleToken);
      fetchSubscriptions(googleToken);
    }
  };

  const unsubscribeSingle = async (sub: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.senderEmail === sub.senderEmail ? { ...s, status: "unsubscribing" } : s))
    );

    try {
      let success = false;

      // 1. Prefer sending mailto if available as it is silent and fully automated
      if (sub.mailto && token) {
        let to = sub.mailto;
        let subject = "Unsubscribe";
        let body = "Please unsubscribe me from this mailing list.";

        if (sub.mailto.includes("?")) {
          const parts = sub.mailto.split("?");
          to = parts[0];
          const query = parts[1];
          const params = new URLSearchParams(query);
          subject = params.get("subject") || "Unsubscribe";
          body = params.get("body") || "Please unsubscribe me from this mailing list.";
        }

        await sendEmail(token, to, subject, body);
        success = true;
      }

      // 2. Open HTTP link if mailto is not available or as a fallback
      if (sub.unsubscribeUrl) {
        window.open(sub.unsubscribeUrl, "_blank");
        success = true;
      }

      if (success) {
        setSubscriptions((prev) =>
          prev.map((s) => (s.senderEmail === sub.senderEmail ? { ...s, status: "unsubscribed" } : s))
        );
      } else {
        throw new Error("No unsubscribe link or email address found");
      }
    } catch (err) {
      console.error(err);
      setSubscriptions((prev) =>
        prev.map((s) => (s.senderEmail === sub.senderEmail ? { ...s, status: "failed" } : s))
      );
    }
  };

  const unsubscribeSelected = async () => {
    const selectedSubs = subscriptions.filter((s) => selectedIds.includes(s.senderEmail) && s.status === "active");
    if (selectedSubs.length === 0) return;

    await Promise.all(selectedSubs.map((sub) => unsubscribeSingle(sub)));
    setSelectedIds([]);
  };

  const toggleSelect = (senderEmail: string) => {
    setSelectedIds((prev) =>
      prev.includes(senderEmail) ? prev.filter((id) => id !== senderEmail) : [...prev, senderEmail]
    );
  };

  const toggleSelectAll = () => {
    const activeSubs = subscriptions.filter((s) => s.status === "active");
    if (selectedIds.length === activeSubs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(activeSubs.map((s) => s.senderEmail));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/dashboard/gmail"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Gmail
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Subscription Manager</h1>
            <p className="text-slate-500">Scan and unsubscribe from newsletters and mailing lists.</p>
          </div>

          {token && (
            <button
              onClick={() => fetchSubscriptions(token)}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              Rescan Inbox
            </button>
          )}
        </div>

        {/* Content */}
        {!token ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm max-w-xl mx-auto my-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-500 mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Connect Gmail</h2>
            <p className="mt-3 text-slate-500 max-w-sm">
              Please connect your Google Account to scan for mailing lists and newsletter subscriptions.
            </p>
            <div className="mt-8">
              <GmailConnectButton onConnected={handleConnect} />
            </div>
          </div>
        ) : loading ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
            <p className="mt-4 font-medium text-slate-600">Scanning inbox for subscriptions...</p>
            <p className="text-sm text-slate-400">Analyzing headers and list metadata</p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-4 text-lg font-semibold text-red-800">Scanning Failed</h3>
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            <button
              onClick={() => fetchSubscriptions(token)}
              className="mt-6 rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white hover:bg-red-700 transition cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <ShieldCheck className="h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Clean Inbox!</h3>
            <p className="mt-2 text-slate-500 max-w-md">
              We couldn't find any newsletter or mailing list subscriptions in your last 50 emails.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Table Actions */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === subscriptions.filter((s) => s.status === "active").length && selectedIds.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-sm font-semibold text-slate-600">
                  {selectedIds.length > 0 ? `${selectedIds.length} Selected` : "Select All"}
                </span>
              </div>

              {selectedIds.length > 0 && (
                <button
                  onClick={unsubscribeSelected}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition active:scale-95 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                  Unsubscribe Selected
                </button>
              )}
            </div>

            {/* Subscriptions List */}
            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/20 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4 w-12"></th>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Mailing Info</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscriptions.map((sub) => {
                    const initials = sub.senderName ? sub.senderName[0].toUpperCase() : "S";
                    const isSelected = selectedIds.includes(sub.senderEmail);

                    return (
                      <tr
                        key={sub.senderEmail}
                        className={`transition hover:bg-slate-50/30 ${
                          sub.status === "unsubscribed" ? "opacity-50" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={sub.status !== "active"}
                            onChange={() => toggleSelect(sub.senderEmail)}
                            className="h-4.5 w-4.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                          />
                        </td>

                        {/* Sender */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 text-sm">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 truncate">{sub.senderName}</p>
                              <p className="text-xs text-slate-500 truncate">{sub.senderEmail}</p>
                            </div>
                          </div>
                        </td>

                        {/* Subject */}
                        <td className="px-6 py-4">
                          <div className="max-w-[300px]">
                            <p className="text-sm text-slate-700 truncate font-medium">{sub.subject}</p>
                            <p className="text-xs text-slate-400 truncate">
                              Last received: {new Date(sub.date).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {sub.status === "active" && (
                            <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                              Active
                            </span>
                          )}
                          {sub.status === "unsubscribing" && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 animate-pulse">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Unsubscribing
                            </span>
                          )}
                          {sub.status === "unsubscribed" && (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                              Unsubscribed
                            </span>
                          )}
                          {sub.status === "failed" && (
                            <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                              Failed
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          {sub.status === "active" && (
                            <button
                              onClick={() => unsubscribeSingle(sub)}
                              className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-600 transition active:scale-95 cursor-pointer"
                            >
                              Unsubscribe
                            </button>
                          )}
                          {sub.status === "unsubscribed" && (
                            <span className="text-xs text-slate-400 font-medium">Completed</span>
                          )}
                          {sub.status === "failed" && (
                            <button
                              onClick={() => unsubscribeSingle(sub)}
                              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition active:scale-95 cursor-pointer"
                            >
                              Retry
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
