import GoogleButton from "@/components/auth/GoogleButton";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold">
          Welcome to Viscas
        </h1>

        <p className="mt-3 text-center text-slate-600">
          Continue with your Google account.
        </p>

        <div className="mt-8">
          <GoogleButton />
        </div>
      </div>
    </main>
  );
}