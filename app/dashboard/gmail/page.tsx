import DashboardLayout from "@/components/dashboard/DashboardLayout";

import GmailLayout from "@/components/gmail/GmailLayout";

import EmailList from "@/components/gmail/EmailList";
import EmailPreview from "@/components/gmail/EmailPreview";

import AISummary from "@/components/gmail/AISummary";
import SuggestedReplies from "@/components/gmail/SuggestedReplies";
import EmailActions from "@/components/gmail/EmailActions";
import GmailConnectButton from "@/components/gmail/GmailConnectButton";


export default function GmailPage() {
  return (
    <DashboardLayout>
        <GmailConnectButton />
      <GmailLayout>
        <div className="grid h-full grid-cols-12 gap-6">
          {/* Email List */}
          <section className="col-span-4 overflow-y-auto">
            <EmailList />
          </section>

          {/* Email Preview */}
          <section className="col-span-5 overflow-y-auto">
            <EmailPreview />
          </section>

          {/* AI Workspace */}
          <aside className="col-span-3 space-y-6 overflow-y-auto">
            <AISummary />

            <SuggestedReplies />

            <EmailActions />
          </aside>
        </div>
      </GmailLayout>
    </DashboardLayout>
  );
}