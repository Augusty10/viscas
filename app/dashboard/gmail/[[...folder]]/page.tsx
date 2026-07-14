import DashboardLayout from "@/components/dashboard/DashboardLayout";
import GmailWorkspace from "@/components/gmail/GmailWorkspace";

export type PageProps = {
  params: Promise<{ folder?: string[] }>;
};

export default async function GmailPage({ params }: PageProps) {
  const { folder } = await params;
  const currentFolder = folder && folder.length > 0 ? folder[0] : "inbox";

  return (
    <DashboardLayout>
      <GmailWorkspace currentFolder={currentFolder} />
    </DashboardLayout>
  );
}
