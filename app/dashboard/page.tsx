import DashboardLayout from "@/components/dashboard/DashboardLayout";

import Welcome from "@/components/dashboard/Welcome";
import StatsCards from "@/components/dashboard/StatsCards";
import PriorityInbox from "@/components/dashboard/PriorityInbox";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import AIAssistant from "@/components/dashboard/AIAssistant";
import QuickActions from "@/components/dashboard/QuickActions";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <Welcome />

        {/* Stats */}
        <StatsCards />

        {/* Inbox + Schedule */}
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <PriorityInbox />
          <TodaySchedule />
        </section>

        {/* AI + Quick Actions */}
        <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <AIAssistant />
          <QuickActions />
        </section>
      </div>
    </DashboardLayout>
  );
}