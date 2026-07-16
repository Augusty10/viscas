"use client";

import { useState, useEffect } from "react";
import {
  Languages,
  WandSparkles,
  Copy,
  Download,
  Share2,
  Loader2,
  X,
  Check,
} from "lucide-react";
import { account } from "@/lib/appwrite";
import { getAttachment } from "@/lib/gmail";
import { jsPDF } from "jspdf";
import { useGmailStore } from "@/hooks/useGmail";

type Attachment = {
  filename: string;
  mimeType: string;
  attachmentId: string;
  size: number;
};

type Email = {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  attachments?: Attachment[];
};

type EmailActionsProps = {
  email: Email | null;
};

const languages = [
  { name: "Spanish 🇪🇸", code: "Spanish" },
  { name: "French 🇫🇷", code: "French" },
  { name: "German 🇩🇪", code: "German" },
  { name: "Hindi 🇮🇳", code: "Hindi" },
  { name: "Japanese 🇯🇵", code: "Japanese" },
];

export default function EmailActions({ email }: EmailActionsProps) {
  const [appwriteId, setAppwriteId] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const accessToken = useGmailStore((state) => state.accessToken);

  // Fetch appwrite user on mount
  useEffect(() => {
    account.get()
      .then((u) => setAppwriteId(u.$id))
      .catch((e) => console.error("EmailActions: Failed to load user ID:", e));
  }, []);

  const handleAction = async (actionTitle: string, extra?: string) => {
    if (!email) return;
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(actionTitle);

    try {
      if (actionTitle === "Translate") {
        const lang = extra || "Spanish";
        const prompt = `Translate the following email into ${lang}. Provide a clean layout with "Translated Subject" and "Translated Body".\n\nSubject: ${email.subject}\n\nBody: ${email.body}`;
        
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt, appwriteId }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Translation failed.");
        }

        setModalTitle(`Translated to ${lang}`);
        setModalContent(data.reply);
        setShowModal(true);
      } 
      
      else if (actionTitle === "Improve Writing") {
        const prompt = `Improve the writing of the following email to make it more professional, grammatically correct, and clear. Maintain the original message context. Respond with "Improved Subject" and "Improved Body".\n\nSubject: ${email.subject}\n\nBody: ${email.body}`;
        
        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt, appwriteId }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to improve writing.");
        }

        setModalTitle("AI Improved Writing");
        setModalContent(data.reply);
        setShowModal(true);
      } 
      
      else if (actionTitle === "Copy Summary") {
        const response = await fetch("/api/ai/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.body || email.snippet, appwriteId }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to generate summary.");
        }

        const parsed = JSON.parse(data.summary);
        const summaryText = parsed.summary || "No summary available.";
        
        await navigator.clipboard.writeText(summaryText);
        setSuccessMsg("AI Summary copied to clipboard!");
        setTimeout(() => setSuccessMsg(""), 3000);
      } 
      
      else if (actionTitle === "Download PDF") {
        // 1. Generate Email PDF
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");
        
        // Header Info
        doc.setFontSize(22);
        doc.setTextColor(14, 165, 233); // Sky Blue theme
        doc.text("VISCAS EMAIL REPORT", 14, 25);
        
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.5);
        doc.line(14, 30, 196, 30);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139); // Slate secondary
        doc.text(`From: ${email.sender}`, 14, 38);
        doc.text(`Date: ${email.date}`, 14, 44);
        
        doc.setFontSize(14);
        doc.setTextColor(15, 23, 42); // Slate primary
        const splitSubject = doc.splitTextToSize(`Subject: ${email.subject}`, 180);
        doc.text(splitSubject, 14, 52);
        
        doc.line(14, 58, 196, 58);
        
        // Body text
        doc.setFontSize(11);
        doc.setTextColor(51, 65, 85);
        const splitBody = doc.splitTextToSize(email.body || "No body content available.", 180);
        doc.text(splitBody, 14, 68);

        // Attachments Metadata Listing
        if (email.attachments && email.attachments.length > 0) {
          const attachY = Math.min(260, 78 + (splitBody.length * 5));
          doc.setDrawColor(14, 165, 233);
          doc.line(14, attachY, 196, attachY);
          
          doc.setFontSize(11);
          doc.setTextColor(14, 165, 233);
          doc.text("ATTACHMENTS INCLUDED IN MAIL:", 14, attachY + 8);
          
          doc.setFontSize(10);
          doc.setTextColor(71, 85, 105);
          email.attachments.forEach((att, idx) => {
            const sizeKB = (att.size / 1024).toFixed(1);
            doc.text(`• ${att.filename} (${sizeKB} KB) - Downloaded automatically`, 14, attachY + 16 + (idx * 6));
          });
        }
        
        doc.save(`viscas_mail_${email.id}.pdf`);

        // 2. Download Real Attachments if available in Gmail
        if (email.attachments && email.attachments.length > 0 && accessToken) {
          for (const att of email.attachments) {
            try {
              const resAtt = await getAttachment(accessToken, email.id, att.attachmentId);
              if (resAtt.data) {
                // Convert Base64URL to Base64
                const base64 = resAtt.data.replace(/-/g, "+").replace(/_/g, "/");
                const byteCharacters = atob(base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: att.mimeType });
                
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = att.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            } catch (attErr) {
              console.error(`Failed to download attachment ${att.filename}:`, attErr);
            }
          }
        }
        
        setSuccessMsg("Email PDF generated and attachments downloaded successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } 
      
      else if (actionTitle === "Share") {
        const shareText = `Subject: ${email.subject}\nFrom: ${email.sender}\nDate: ${email.date}\n\nSnippet: ${email.snippet}\n\nShared via Viscas AI Workspace`;
        
        if (navigator.share) {
          await navigator.share({
            title: email.subject,
            text: shareText,
          });
          setSuccessMsg("Email details shared successfully!");
        } else {
          await navigator.clipboard.writeText(shareText);
          setSuccessMsg("Email text details copied to clipboard!");
        }
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg((err as Error).message || "Action execution failed.");
    } finally {
      setLoading(null);
    }
  };

  if (!email) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <h2 className="mb-2 text-lg font-semibold">AI Actions</h2>
        <p className="text-sm text-slate-400">Select an email from the list to enable smart actions.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm relative">
        <h2 className="mb-5 text-lg font-semibold">AI Actions</h2>

        {successMsg && (
          <div className="mb-4 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 p-3 rounded-2xl animate-fade-in flex items-center gap-1.5">
            <Check className="h-4 w-4" />
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 border border-red-200 p-3 rounded-2xl animate-fade-in">
            {errorMsg}
          </div>
        )}

        <div className="space-y-3">
          {/* Translate Button */}
          <button
            onClick={() => setShowLangSelector(!showLangSelector)}
            disabled={loading !== null}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-semibold">Translate</span>
            </div>
            {loading === "Translate" && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </button>

          {/* Lang Selector Panel */}
          {showLangSelector && (
            <div className="p-3 border border-slate-100 rounded-2xl bg-slate-50 grid grid-cols-2 gap-2 animate-fade-in-down">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setShowLangSelector(false);
                    handleAction("Translate", lang.code);
                  }}
                  className="p-2 bg-white border border-slate-200 hover:border-sky-400 rounded-xl text-xs font-bold transition text-slate-700 hover:bg-sky-50/20 cursor-pointer"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}

          {/* Improve Writing Button */}
          <button
            onClick={() => handleAction("Improve Writing")}
            disabled={loading !== null}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <WandSparkles className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-semibold">Improve Writing</span>
            </div>
            {loading === "Improve Writing" && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </button>

          {/* Copy Summary Button */}
          <button
            onClick={() => handleAction("Copy Summary")}
            disabled={loading !== null}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Copy className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-semibold">Copy Summary</span>
            </div>
            {loading === "Copy Summary" && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </button>

          {/* Download PDF Button */}
          <button
            onClick={() => handleAction("Download PDF")}
            disabled={loading !== null}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-semibold">Download PDF</span>
            </div>
            {loading === "Download PDF" && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </button>

          {/* Share Button */}
          <button
            onClick={() => handleAction("Share")}
            disabled={loading !== null}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-slate-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-sky-600" />
              <span className="text-sm font-semibold">Share</span>
            </div>
            {loading === "Share" && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </button>
        </div>
      </div>

      {/* AI Dialog Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">{modalTitle}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed text-sm text-slate-605 whitespace-pre-wrap font-medium">
              {modalContent}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(modalContent);
                  setSuccessMsg("Copied to clipboard!");
                  setTimeout(() => setSuccessMsg(""), 3000);
                }}
                className="rounded-xl border border-slate-200 hover:border-sky-500 hover:bg-sky-50/20 px-4 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer flex items-center gap-1.5"
              >
                <Copy className="h-4 w-4" />
                Copy Output
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}