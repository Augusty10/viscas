import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIAssistant() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100">
          <Sparkles className="h-6 w-6 text-sky-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            AI Assistant
          </h2>

          <p className="text-sm text-slate-500">
            Your productivity companion
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <p className="text-sm leading-7 text-slate-700">
          👋 Good morning!
          <br />
          You have <span className="font-semibold">3 unread emails</span> that
          may require a response.
          <br />
          Your next meeting starts in{" "}
          <span className="font-semibold">1 hour</span>.
          <br />
          Everything else looks under control.
        </p>
      </div>

      {/* Suggested Actions */}
      <div className="mt-6 space-y-3">
        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
          <span>Summarize today's emails</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
          <span>Prepare meeting notes</span>
          <ArrowRight className="h-4 w-4" />
        </button>

        <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
          <span>Draft smart replies</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* CTA */}
      <Button className="mt-6 w-full">
        Open AI Workspace
      </Button>
    </div>
  );
}