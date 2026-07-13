"use client";

import Welcome from "./Welcome";
import StatsCards from "./StatsCards";
import PriorityInbox from "./PriorityInbox";
import TodaySchedule from "./TodaySchedule";
import AIAssistant from "./AIAssistant";
import QuickActions from "./QuickActions";

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
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-xl font-semibold text-red-600">
          Dashboard Error
        </h2>

        <p className="mt-2 text-red-500">
          {error}
        </p>
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Main Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          <AIAssistant
            emails={recentEmails}
            events={todayEvents}
          />

          <PriorityInbox
            emails={priorityEmails}
          />
        </div>

        {/* Right Column - Sidebar Content (1/3 width) */}
        <div className="space-y-8">
          <TodaySchedule
            events={todayEvents}
          />

          <QuickActions />
        </div>
      </div>
    </div>
  );
}
