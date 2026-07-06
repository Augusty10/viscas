import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back, Dhanraj 👋
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Here's your productivity overview for today.
        </p>
      </div>
    </DashboardLayout>
  );
}