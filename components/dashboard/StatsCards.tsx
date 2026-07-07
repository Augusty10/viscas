import {
  Mail,
  AlertTriangle,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Unread Emails",
    value: "12",
    subtitle: "+3 since yesterday",
    icon: Mail,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    title: "Priority Emails",
    value: "3",
    subtitle: "Needs your attention",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Today's Meetings",
    value: "2",
    subtitle: "Next at 11:30 AM",
    icon: CalendarDays,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "AI Insights",
    value: "5",
    subtitle: "Suggestions available",
    icon: Sparkles,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

export default function StatsCards() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>

              <span className="text-xs font-medium text-emerald-600">
                Live
              </span>
            </div>

            {/* Content */}
            <div className="mt-6">
              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {stat.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}