"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import GoogleButton from "@/components/auth/GoogleButton";
import { signupWithEmail, loginWithEmail } from "@/lib/auth-client";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { account } from "@/lib/appwrite";

function LoginForm() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if session is already active on mount and redirect to dashboard
  useEffect(() => {
    async function checkSession() {
      const errorParam = searchParams.get("error");
      if (
        errorParam &&
        (errorParam.includes("paused") ||
          errorParam.includes("inactivity") ||
          errorParam.includes("restore"))
      ) {
        return;
      }

      try {
        await account.get();
        window.location.href = "/dashboard";
      } catch {
        // No session active, let user sign in
      }
    }
    checkSession();
  }, [searchParams]);

  // Parse URL query errors (e.g. from OAuth failure redirects)
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      try {
        const decoded = decodeURIComponent(errorParam);
        const parsed = JSON.parse(decoded);
        if (parsed?.type === "user_already_exists" || parsed?.code === 409) {
          setTimeout(() => {
            setError("An account with this email address already exists. Please sign in instead.");
            setIsSignUp(false); // Switch to Sign In tab automatically
          }, 0);
        } else {
          setTimeout(() => {
            setError(parsed?.message || "Authentication failed.");
          }, 0);
        }
      } catch {
        setTimeout(() => {
          setError(errorParam);
        }, 0);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (isSignUp && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      try {
        // Clear any existing active session first to prevent 409 Conflict (session already active)
        await account.deleteSession("current");
      } catch {
        // Ignore if there is no active session
      }

      if (isSignUp) {
        // Sign Up
        await signupWithEmail(email, password, name);
        // Auto Login after signing up
        await loginWithEmail(email, password);
      } else {
        // Sign In
        await loginWithEmail(email, password);
      }

      // Get fresh details and auto-sync user to PostgreSQL database
      const u = await account.get();
      try {
        const response = await fetch("/api/user/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appwriteId: u.$id,
            name: u.name,
            email: u.email,
            avatar: null,
          }),
        });
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to sync user.");
        }
      } catch (syncErr: any) {
        console.warn("Failed to auto-sync user on sign-in:", syncErr);
        const errMsg = syncErr?.message || "";
        if (
          errMsg.includes("paused") ||
          errMsg.includes("inactivity") ||
          errMsg.includes("restore")
        ) {
          throw syncErr;
        }
      }
      
      // Redirect to dashboard with a full reload to verify session cookies
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      console.error("Auth error:", err);
      setError((err as Error)?.message || "Authentication failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        {/* Glow decoration */}
        <div className="absolute -top-12 -left-12 -z-10 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 -z-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? "Get started with your Viscas workspace"
                : "Sign in to manage your productivity"}
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              {isSignUp && (
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    style={{ paddingLeft: "2.75rem" }}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  />
                </div>
              )}

              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  style={{ paddingLeft: "2.75rem" }}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min. 8 characters)"
                  style={{ paddingLeft: "2.75rem" }}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pr-12 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex h-12 w-full items-center justify-center rounded-2xl bg-sky-500 text-sm font-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Or continue with
              </span>
            </div>

            <div className="mt-6">
              <GoogleButton />
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="font-medium text-sky-500 hover:text-sky-600 transition"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}