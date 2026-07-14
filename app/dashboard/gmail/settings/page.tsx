"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Settings, Sparkles, Sliders, MessageSquare, Power, Check } from "lucide-react";
import Link from "next/link";

type GmailSettingsType = {
  maxEmails: number;
  syncInterval: string;
  aiTone: string;
  enableAISummary: boolean;
  enableSuggestedReplies: boolean;
  signature: string;
  appendSignature: boolean;
};

const DEFAULT_SETTINGS: GmailSettingsType = {
  maxEmails: 10,
  syncInterval: "manual",
  aiTone: "professional",
  enableAISummary: true,
  enableSuggestedReplies: true,
  signature: "Best regards,\nDhanraj",
  appendSignature: true,
};

export default function GmailSettings() {
  const [settings, setSettings] = useState<GmailSettingsType>(DEFAULT_SETTINGS);
  const [token, setToken] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const googleToken = localStorage.getItem("google_access_token");
    setToken(googleToken);

    const saved = localStorage.getItem("gmail_settings");
    if (saved) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  const handleSave = (newSettings: GmailSettingsType) => {
    setSettings(newSettings);
    localStorage.setItem("gmail_settings", JSON.stringify(newSettings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("google_access_token");
    setToken(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-slate-100 pb-5">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-sky-500" />
            Gmail Settings
          </h1>
          <p className="text-slate-500 mt-2">
            Configure your AI email preferences, synchronization frequency, and signatures.
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700 font-semibold text-sm transition">
            <Check className="h-5 w-5 text-green-600" />
            Settings saved successfully!
          </div>
        )}

        <div className="grid gap-6">
          {/* Connection Settings */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Power className="h-5 w-5 text-sky-500" />
              Account Connection
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 rounded-2xl">
              <div>
                <p className="font-semibold text-slate-800">Google Workspace Sync</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-block h-2 w-2 rounded-full ${token ? "bg-green-500 animate-pulse" : "bg-slate-400"}`} />
                  <p className="text-xs text-slate-500 font-medium">{token ? "Connected to Gmail & Calendar" : "Not connected"}</p>
                </div>
              </div>
              {token ? (
                <button
                  onClick={handleDisconnect}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition cursor-pointer animate-duration-150 active:scale-95"
                >
                  Disconnect Account
                </button>
              ) : (
                <Link
                  href="/dashboard/gmail"
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
                >
                  Connect Account
                </Link>
              )}
            </div>
          </div>

          {/* Sync Preferences */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Sliders className="h-5 w-5 text-sky-500" />
              Synchronization & Limits
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">Sync Frequency</label>
                  <span className="text-xs text-slate-400">Choose how often Viscas fetches new emails in the background.</span>
                </div>
                <select
                  value={settings.syncInterval}
                  onChange={(e) => handleSave({ ...settings, syncInterval: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-500 focus:bg-white cursor-pointer"
                >
                  <option value="manual">Manual Refresh</option>
                  <option value="5m">Every 5 minutes</option>
                  <option value="15m">Every 15 minutes</option>
                  <option value="hourly">Every hour</option>
                </select>
              </div>

              <div className="border-t border-slate-100 my-4" />

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">Max Emails to Fetch</label>
                  <span className="text-xs text-slate-400">Limit the number of loaded emails per folder to save API quota.</span>
                </div>
                <select
                  value={settings.maxEmails}
                  onChange={(e) => handleSave({ ...settings, maxEmails: parseInt(e.target.value) })}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-500 focus:bg-white cursor-pointer"
                >
                  <option value={10}>10 emails (Recommended)</option>
                  <option value={20}>20 emails</option>
                  <option value={50}>50 emails</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-sky-500" />
              AI Copilot Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">AI Response Tone</label>
                  <span className="text-xs text-slate-400">Select the default style of AI draft suggestions.</span>
                </div>
                <select
                  value={settings.aiTone}
                  onChange={(e) => handleSave({ ...settings, aiTone: e.target.value })}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-sky-500 focus:bg-white cursor-pointer"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual / Friendly</option>
                  <option value="concise">Concise & Direct</option>
                  <option value="detailed">Elaborate & Detailed</option>
                </select>
              </div>

              <div className="border-t border-slate-100 my-4" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">AI Summaries</label>
                  <span className="text-xs text-slate-400 block">Show automatic smart digests next to email previews.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableAISummary}
                  onChange={(e) => handleSave({ ...settings, enableAISummary: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              <div className="border-t border-slate-100 my-4" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">Suggested Replies</label>
                  <span className="text-xs text-slate-400 block">Offer one-click reply drafts next to selected emails.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableSuggestedReplies}
                  onChange={(e) => handleSave({ ...settings, enableSuggestedReplies: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Email Composer & Signatures */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-sky-500" />
              Composer & Signatures
            </h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="font-medium text-slate-700 block text-sm">Auto-append Signature</label>
                  <span className="text-xs text-slate-400 block">Append your custom signature automatically when creating new emails.</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appendSignature}
                  onChange={(e) => handleSave({ ...settings, appendSignature: e.target.checked })}
                  className="h-5 w-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-slate-700 text-sm">Email Signature</label>
                <textarea
                  rows={4}
                  value={settings.signature}
                  onChange={(e) => handleSave({ ...settings, signature: e.target.value })}
                  placeholder="e.g. Best regards, Dhanraj"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-medium text-slate-800 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
