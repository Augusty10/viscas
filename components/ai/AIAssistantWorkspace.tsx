"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Send, 
  Trash2, 
  RefreshCw, 
  Mail, 
  Calendar, 
  CheckCircle, 
  User, 
  Database,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { account } from "@/lib/appwrite";
import GmailConnectButton from "../gmail/GmailConnectButton";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function AIAssistantWorkspace() {
  const {
    loading: dashboardLoading,
    error: dashboardError,
    userName,
    recentEmails,
    todayEvents,
    refresh,
  } = useDashboard();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [appwriteId, setAppwriteId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<"emails" | "meetings" | "about">("emails");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when userName changes
  useEffect(() => {
    if (userName && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            role: "assistant",
            content: `Hello ${userName}! I'm **Viscas AI**, your workspace co-pilot. I have loaded your inbox and calendar context.\n\nWhat can I assist you with today? You can ask me to summarize unread emails, check your schedule, or draft replies.`,
            timestamp: new Date(),
          },
        ]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [userName, messages.length]);

  // Fetch Appwrite user ID for logging AI history
  useEffect(() => {
    account
      .get()
      .then((u) => setAppwriteId(u.$id))
      .catch((err) => console.warn("Could not get Appwrite account info:", err));
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Build history payload
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          emails: recentEmails,
          calendar: todayEvents,
          appwriteId,
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: new Date(),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I encountered an issue generating a response. Please try again.",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network error: Failed to connect to the AI model. Please verify your connection.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (prompt: string) => {
    handleSend(prompt);
  };

  const handleContextItemClick = (type: "email" | "meeting", title: string, details: string) => {
    if (type === "email") {
      setInput(`Summarize this email from ${details} with subject "${title}"`);
    } else {
      setInput(`Explain my upcoming meeting "${title}" scheduled at ${details}`);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: `Conversation cleared. I'm ready for new questions, ${userName}!`,
        timestamp: new Date(),
      },
    ]);
  };

  // Helper function to format basic Markdown headers, bold, and list elements in React
  const renderMessageContent = (content: string) => {
    return content.split("\n").map((line, idx) => {
      let text = line;
      let className = "text-slate-700 leading-relaxed text-sm mb-2";

      if (text.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-sm font-bold text-slate-900 mt-4 mb-2">
            {text.replace("### ", "")}
          </h4>
        );
      } else if (text.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-2">
            {text.replace("## ", "")}
          </h3>
        );
      } else if (text.startsWith("# ")) {
        return (
          <h2 key={idx} className="text-lg font-bold text-slate-900 mt-5 mb-2">
            {text.replace("# ", "")}
          </h2>
        );
      }

      // Handle lists
      let isListItem = false;
      if (text.startsWith("- ") || text.startsWith("* ")) {
        text = text.substring(2);
        isListItem = true;
        className = "text-slate-700 leading-relaxed text-sm ml-4 mb-1 flex items-start gap-1.5";
      }

      // Parse Bold (**bold**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="font-semibold text-slate-900">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }

      const formattedLine = parts.length > 0 ? parts : text;

      if (isListItem) {
        return (
          <div key={idx} className={className}>
            <span className="text-violet-500 mt-1.5 shrink-0 block h-1.5 w-1.5 rounded-full bg-violet-500" />
            <span>{formattedLine}</span>
          </div>
        );
      }

      // Check if line is empty (br)
      if (text.trim() === "") {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className={className}>
          {formattedLine}
        </p>
      );
    });
  };

  if (dashboardLoading) {
    return (
      <div className="flex h-[75vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-violet-600" />
          <p className="text-sm font-semibold text-slate-500">Loading AI Workspace...</p>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    if (dashboardError === "Google account not connected") {
      return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-md max-w-xl mx-auto my-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-50 text-violet-500 mb-6">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Activate AI Assistant</h2>
          <p className="mt-3 text-slate-500 max-w-sm">
            Please connect your Google Account to load emails and calendar events into your AI Workspace.
          </p>
          <div className="mt-8">
            <GmailConnectButton onConnected={() => refresh()} />
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 max-w-xl mx-auto my-12">
        <h2 className="text-xl font-semibold text-red-600">Failed to Initialize Workspace</h2>
        <p className="mt-2 text-red-500">{dashboardError}</p>
        <button
          onClick={() => refresh()}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* LEFT PANEL: Chat Interface */}
      <div className="flex-1 flex flex-col bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden h-full">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-sm shadow-violet-200">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-800">Viscas AI Co-Pilot</h2>
                <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-100/50">
                  GPT-4o Mini
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Workspace Context Synchronized
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearConversation}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => refresh()}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition cursor-pointer"
              title="Refresh Workspace Context"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border shadow-sm ${
                  message.role === "user"
                    ? "bg-slate-100 border-slate-200 text-slate-600"
                    : "bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-600 text-white"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-slate-800 text-white rounded-tr-none"
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
                }`}
              >
                {message.role === "user" ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="prose prose-sm max-w-none text-slate-800">
                    {renderMessageContent(message.content)}
                  </div>
                )}
                
                <span
                  className={`text-[9px] mt-2 block text-right ${
                    message.role === "user" ? "text-slate-400" : "text-slate-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 border-violet-600 flex items-center justify-center shrink-0 text-white border shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
                <span className="h-2 w-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 bg-violet-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset suggestions (if no user messages sent yet) */}
        {messages.length <= 1 && !loading && (
          <div className="px-6 py-3 border-t border-slate-50 bg-slate-50/20">
            <p className="text-xs font-semibold text-slate-400 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePresetClick("Do I have any meetings today?")}
                className="text-xs bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 text-slate-600 px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm"
              >
                📅 Do I have any meetings today?
              </button>
              <button
                onClick={() => handlePresetClick("Summarize my unread emails")}
                className="text-xs bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 text-slate-600 px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm"
              >
                ✉️ Summarize my unread emails
              </button>
              <button
                onClick={() => handlePresetClick("What are my top priorities today?")}
                className="text-xs bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 text-slate-600 px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm"
              >
                💡 What are my top priorities?
              </button>
              <button
                onClick={() => handlePresetClick("Draft a professional reply to my latest email")}
                className="text-xs bg-white border border-slate-200 hover:border-violet-300 hover:text-violet-600 text-slate-600 px-3 py-1.5 rounded-full transition cursor-pointer shadow-sm"
              >
                ✍️ Draft reply to latest email
              </button>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-1.5 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-200"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Ask anything about your emails and calendar..."
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="h-9 w-9 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-200 text-white flex items-center justify-center transition shadow-sm disabled:shadow-none cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL: Workspace Context */}
      <div className="w-full xl:w-80 shrink-0 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
        
        {/* Workspace Title */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <Database className="h-4 w-4 text-violet-600" />
            Workspace Context
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Loaded assets visible to AI</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => setActiveTab("emails")}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition cursor-pointer ${
              activeTab === "emails"
                ? "border-violet-600 text-violet-600 bg-violet-50/10"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Emails ({recentEmails.length})
          </button>
          <button
            onClick={() => setActiveTab("meetings")}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition cursor-pointer ${
              activeTab === "meetings"
                ? "border-violet-600 text-violet-600 bg-violet-50/10"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Meetings ({todayEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition cursor-pointer ${
              activeTab === "about"
                ? "border-violet-600 text-violet-600 bg-violet-50/10"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* EMAILS TAB */}
          {activeTab === "emails" && (
            <div className="space-y-3">
              {recentEmails.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">No recent emails loaded</p>
                </div>
              ) : (
                recentEmails.map((email) => (
                  <div
                    key={email.id}
                    onClick={() => handleContextItemClick("email", email.subject, email.sender)}
                    className="p-3 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 rounded-2xl cursor-pointer transition text-left group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[120px]">
                        {email.sender.split("<")[0].trim()}
                      </span>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {email.date ? new Date(email.date).toLocaleDateString([], { month: "short", day: "numeric" }) : ""}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-700 truncate group-hover:text-violet-600 transition">
                      {email.subject}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate mt-1">{email.snippet}</p>
                    <div className="flex justify-end items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition">
                      <span className="text-[9px] text-violet-600 font-medium">Use in prompt</span>
                      <ChevronRight className="h-3 w-3 text-violet-600" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MEETINGS TAB */}
          {activeTab === "meetings" && (
            <div className="space-y-3">
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">No meetings today</p>
                </div>
              ) : (
                todayEvents.map((event) => {
                  const startTime = event.start
                    ? new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "All Day";

                  return (
                    <div
                      key={event.id}
                      onClick={() => handleContextItemClick("meeting", event.title, startTime)}
                      className="p-3 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 rounded-2xl cursor-pointer transition text-left group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">
                          {startTime}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-700 truncate group-hover:text-violet-600 transition">
                        {event.title}
                      </h4>
                      {event.location && (
                        <p className="text-[10px] text-slate-400 truncate mt-1">📍 {event.location}</p>
                      )}
                      <div className="flex justify-end items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition">
                        <span className="text-[9px] text-violet-600 font-medium">Use in prompt</span>
                        <ChevronRight className="h-3 w-3 text-violet-600" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* DETAILS TAB */}
          {activeTab === "about" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Security & Privacy</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Your keys and connection data are processed entirely server-side.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle className="h-4.5 w-4.5 text-violet-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700">Prisma History Synced</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Chat queries are logged to your personal AI history tab securely.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                <Sparkles className="h-6 w-6 text-violet-600 mx-auto" />
                <h4 className="text-xs font-semibold text-slate-700">AI Productivity Tips</h4>
                <p className="text-[10px] text-slate-500">
                  Ask the assistant to draft answers to emails. Simply click any email in the sidebar to populate the context, then hit enter!
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
