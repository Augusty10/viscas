import {
  MailPlus,
  CalendarPlus,
  Sparkles,
  Inbox,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Compose Email",
    description: "Write a new email instantly.",
    icon: MailPlus,
  },
  {
    title: "Create Event",
    description: "Schedule a meeting or reminder.",
    icon: CalendarPlus,
  },
  {
    title: "Ask AI",
    description: "Get smart assistance instantly.",
    icon: Sparkles,
  },
  {
    title: "Open Gmail",
    description: "Go to your complete inbox.",
    icon: Inbox,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used shortcuts
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
                  <Icon className="h-6 w-6 text-sky-600" />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}