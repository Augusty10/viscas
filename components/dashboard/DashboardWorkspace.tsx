"use client";

import Welcome from "./Welcome";
import StatsCards from "./StatsCards";
import PriorityInbox from "./PriorityInbox";
import TodaySchedule from "./TodaySchedule";
import AIAssistant from "./AIAssistant";
import QuickActions from "./QuickActions";

import GmailConnectButton from "../gmail/GmailConnectButton";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardWorkspace() {
  const {
    loading,
    error,

    unreadCount,
    meetingsCount,
    userName,

    priorityEmails,
    recentEmails,

    todayEvents,
    refresh,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-slate-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    if (error === "Google account not connected") {
      return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-md max-w-xl mx-auto my-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-500 mb-6">
            <svg
              className="h-8 w-8 text-sky-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Connect Google Workspace</h2>
          <p className="mt-3 text-slate-500 max-w-sm">
            Please connect your Google Account to access Gmail, sync calendar events, and activate your AI productivity assistant.
          </p>
          <div className="mt-8">
            <GmailConnectButton onConnected={() => refresh()} />
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-xl font-semibold text-red-600">
          Dashboard Error
        </h2>

        <p className="mt-2 text-red-500">
          {error}
        </p>
        <button
          onClick={() => refresh()}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Welcome
        name={userName}
        unreadEmails={unreadCount}
        meetings={meetingsCount}
      />

      <StatsCards
        unreadEmails={unreadCount}
        meetings={meetingsCount}
        priorityEmails={priorityEmails.length}
      />

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <PriorityInbox
          emails={priorityEmails}
        />

        <TodaySchedule
          events={todayEvents}
        />
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <AIAssistant
          emails={recentEmails}
          events={todayEvents}
        />

        <QuickActions />
      </section>
    </div>
  );
}

