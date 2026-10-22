"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GoogleButton from "@/components/auth/GoogleButton";
import { signupWithEmail, loginWithEmail } from "@/lib/auth-client";
import { Loader2, Mail, Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/common/Logo";

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
      } catch (syncErr: unknown) {
        console.warn("Failed to auto-sync user on sign-in:", syncErr);
        const errMsg = (syncErr as Error)?.message || "";
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
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-sky-200/40 via-cyan-100/30 to-emerald-200/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md z-10 flex flex-col gap-4">
        {/* Back to Home Link & Security Tag */}
        <div className="flex items-center justify-between px-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-500">256-bit Encrypted</span>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="border-slate-200/90 bg-white/95 shadow-xl backdrop-blur-md">
          <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
            {/* Brand Logo & Header */}
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="mb-3 inline-block">
                <Logo showText={true} className="!text-slate-900" />
              </Link>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {isSignUp
                  ? "Start managing your email & calendar with AI"
                  : "Sign in to access your unified AI workspace"}
              </p>
            </div>

            {/* Segmented Auth Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/70">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError(null);
                }}
                className={`flex items-center justify-center rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  !isSignUp
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError(null);
                }}
                className={`flex items-center justify-center rounded-lg py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isSignUp
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Feedback Banner */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-destructive-border bg-destructive-surface p-3.5 text-xs sm:text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-destructive" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Primary Email/Password Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    startIcon={<User className="h-4 w-4" />}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  startIcon={<Mail className="h-4 w-4" />}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  {!isSignUp && (
                    <span className="text-[11px] font-medium text-slate-400">
                      Minimum 8 characters
                    </span>
                  )}
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  startIcon={<Lock className="h-4 w-4" />}
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="default"
                fullWidth
                loading={loading}
                className="mt-1 font-bold"
              >
                {isSignUp ? "Create Workspace Account" : "Sign In to Viscas"}
              </Button>
            </form>

            {/* Non-overlapping Flex Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social OAuth Actions */}
            <div>
              <GoogleButton />
            </div>

            {/* Card Footer Disclaimer */}
            <p className="text-center text-[11px] text-slate-500 leading-normal">
              By continuing, you agree to Viscas&apos;s{" "}
              <Link href="/#" className="underline hover:text-slate-800">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/#" className="underline hover:text-slate-800">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}