"use client";

import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Lock,
  CreditCard,
  Sliders,
  Loader2,
  Download,
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  Mail,
  ShieldAlert
} from "lucide-react";
import { account } from "@/lib/appwrite";

type ActiveTab = "profile" | "security" | "billing" | "preferences";

type MockInvoice = {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Failed" | "Pending";
};

export default function SettingsWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // User States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [appwriteId, setAppwriteId] = useState("");
  const [googleAvatar, setGoogleAvatar] = useState<string | undefined>("/logo/dp.jpg");

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Payment/Billing States
  const [currentPlan, setCurrentPlan] = useState("Free"); // "Free" or "Pro" or "Team"
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardHolder, setCardHolder] = useState("");
  const [cardCvc, setCardCvc] = useState("•••");
  const [isEditingCard, setIsEditingCard] = useState(false);
  
  // Preference States
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      return savedTheme || "system";
    }
    return "system";
  });
  const [autoSync, setAutoSync] = useState(true);
  const [aiUsageCount, setAiUsageCount] = useState(0);

  // Simulated Invoice list
  const [invoices] = useState<MockInvoice[]>([
    { id: "INV-2026-001", date: "July 1, 2026", amount: "$19.00", status: "Paid" },
    { id: "INV-2026-002", date: "June 1, 2026", amount: "$19.00", status: "Paid" },
    { id: "INV-2026-003", date: "May 1, 2026", amount: "$19.00", status: "Paid" },
  ]);

  // Load account on mount
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    async function loadAccount() {
      try {
        const u = await account.get();
        setName(u.name || "");
        setEmail(u.email || "");
        setAppwriteId(u.$id);
        setCardHolder(u.name || "");

        // Load plan and usage count directly from DB
        const resUsage = await fetch(`/api/user/usage?appwriteId=${u.$id}`);
        if (resUsage.ok) {
          const usageData = await resUsage.json();
          if (usageData.success) {
            setAiUsageCount(usageData.count);
            setCurrentPlan(usageData.plan || "FREE");
            localStorage.setItem("viscas_plan", usageData.plan || "FREE");
          }
        } else {
          // Load plan from localStorage if updated
          const savedPlan = localStorage.getItem("viscas_plan");
          if (savedPlan) {
            setCurrentPlan(savedPlan);
          }
        }

        // Load card info from localStorage if updated
        const savedCardNum = localStorage.getItem("viscas_card_number");
        if (savedCardNum) setCardNumber(savedCardNum);

        // Load custom photo if active
        setGoogleAvatar("/logo/dp.jpg");
      } catch (err) {
        console.error("Failed to load user in Settings", err);
      }
    }
    loadAccount();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const clearMessages = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    
    if (!name.trim()) {
      setErrorMsg("Name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      // 1. Update name in Appwrite session
      const updatedUser = await account.updateName(name);

      // 2. Sync to Postgres database
      await fetch("/api/user/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appwriteId: updatedUser.$id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: googleAvatar || "",
        }),
      });

      setSuccessMsg("Profile information updated successfully!");
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg((err as Error).message || "Failed to update profile info");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!currentPassword) {
      setErrorMsg("Current password is required");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      await account.updatePassword(newPassword, currentPassword);
      setSuccessMsg("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg((err as Error).message || "Failed to update password. Check old password.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("viscas_card_number", cardNumber);
      setIsEditingCard(false);
      setSuccessMsg("Payment details saved successfully!");
      setLoading(false);
    }, 800);
  };

  const handleUpgradePlan = async (plan: string) => {
    clearMessages();
    setLoading(true);

    try {
      // 1. Create order on backend
      const orderRes = await fetch("/api/billing/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appwriteId }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.message || "Failed to create payment order.");
      }

      // 2. Open Razorpay Checkout modal
      const options = {
        key: orderData.keyId,
        amount: 1900, // INR (1900 paise = 19 INR)
        currency: "INR",
        name: "Viscas AI Workspace",
        description: `Upgrade to Viscas ${plan}`,
        order_id: orderData.orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            setLoading(true);
            const verifyRes = await fetch("/api/billing/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                appwriteId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              setCurrentPlan(plan);
              localStorage.setItem("viscas_plan", plan);
              setSuccessMsg(`Congratulations! Your account has been upgraded to Viscas ${plan}!`);
            } else {
              setErrorMsg(verifyData.message || "Payment verification failed.");
            }
          } catch (verifyErr: unknown) {
            console.error("Verification error:", verifyErr);
            setErrorMsg((verifyErr as Error).message || "Verification connection error.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: "#0EA5E9",
        },
      };

      const rzp = new (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void } }).Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      console.error("Payment setup error:", err);
      setErrorMsg((err as Error).message || "Failed to initiate Razorpay checkout.");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Sync classList for theme visual changes
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(newTheme);
    }

    setSuccessMsg(`Theme updated to ${newTheme}`);
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Workspace Settings</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal details, credentials, billings, and display preferences.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border border-slate-100 rounded-3xl p-3 shadow-sm shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab("profile"); clearMessages(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "profile"
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <UserIcon className="h-4.5 w-4.5" />
              Profile & Account
            </button>
            
            <button
              onClick={() => { setActiveTab("security"); clearMessages(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "security"
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Lock className="h-4.5 w-4.5" />
              Security & Credentials
            </button>
            
            <button
              onClick={() => { setActiveTab("billing"); clearMessages(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "billing"
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <CreditCard className="h-4.5 w-4.5" />
              Payment & Plan
            </button>
            
            <button
              onClick={() => { setActiveTab("preferences"); clearMessages(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition cursor-pointer ${
                activeTab === "preferences"
                  ? "bg-sky-50 text-sky-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Sliders className="h-4.5 w-4.5" />
              Preferences
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <div className="flex-1 w-full bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {/* Global Alert Banners */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-emerald-800">{successMsg}</p>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-rose-800">{errorMsg}</p>
            </div>
          )}

          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
                <p className="text-slate-400 text-xs mt-1">Configure your personal public account profile info.</p>
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center gap-5 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div className="relative">
                  {googleAvatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={googleAvatar}
                      alt="Google avatar"
                      className="h-16 w-16 rounded-2xl object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white flex items-center justify-center font-bold text-xl uppercase shadow-md shadow-sky-100">
                      {name ? name.substring(0, 2) : "US"}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Profile Image</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {googleAvatar ? "Using linked Google Workspace profile photo." : "Fallback initials avatar active."}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="name-input" className="text-xs font-semibold text-slate-600">Full Name</label>
                  <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition-all duration-200 text-slate-800 font-medium"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-input" className="text-xs font-semibold text-slate-600">Email Address (Read Only)</label>
                  <div className="relative">
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-slate-100/70 border border-slate-200/50 rounded-2xl px-4 py-3 text-sm focus:outline-none text-slate-400 cursor-not-allowed font-medium pr-10"
                    />
                    <Mail className="absolute right-4 top-3.5 h-4 w-4 text-slate-300" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Your email address is linked directly to your OAuth / Email Session login authentication account.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="user-id-input" className="text-xs font-semibold text-slate-600">Appwrite Account ID</label>
                  <input
                    id="user-id-input"
                    type="text"
                    value={appwriteId}
                    disabled
                    className="w-full bg-slate-100/70 border border-slate-200/50 rounded-2xl px-4 py-3 text-xs focus:outline-none text-slate-400 cursor-not-allowed font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-2xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-sm font-semibold transition cursor-pointer shadow-sm hover:shadow flex items-center gap-2"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Security Credentials</h3>
                <p className="text-slate-400 text-xs mt-1">Secure your Viscas account and update your password.</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="current-pw-input" className="text-xs font-semibold text-slate-600">Current Password</label>
                  <input
                    id="current-pw-input"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition-all duration-200 text-slate-800 font-medium"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="new-pw-input" className="text-xs font-semibold text-slate-600">New Password</label>
                  <input
                    id="new-pw-input"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition-all duration-200 text-slate-800 font-medium"
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="confirm-pw-input" className="text-xs font-semibold text-slate-600">Confirm New Password</label>
                  <input
                    id="confirm-pw-input"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 transition-all duration-200 text-slate-800 font-medium"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-2xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 text-sm font-semibold transition cursor-pointer shadow-sm hover:shadow flex items-center gap-2"
                  >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: BILLING & PAYMENT */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              
              {/* Header */}
              <div>
                <h3 className="text-lg font-bold text-slate-900">Plan & Subscription</h3>
                <p className="text-slate-400 text-xs mt-1">Manage payment methods, tiers, and invoice statements.</p>
              </div>

              {/* Plan Card */}
              <div className="p-6 border border-slate-100 rounded-3xl bg-gradient-to-r from-sky-500 to-sky-700 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded border border-white/10">
                    Current Plan
                  </span>
                  <h3 className="text-2xl font-bold mt-2">Viscas {currentPlan}</h3>
                  <p className="text-white/80 text-xs mt-1">
                    {currentPlan === "FREE" || currentPlan === "Free"
                      ? "Get started with fundamental AI-assisted summaries." 
                      : "Unlock full workflow context automation & priority workspace assistant features."}
                  </p>
                </div>
                {currentPlan !== "PREMIUM" && currentPlan !== "Pro" && (
                  <button
                    onClick={() => handleUpgradePlan("PREMIUM")}
                    disabled={loading}
                    className="rounded-2xl bg-white text-sky-700 hover:bg-slate-50 px-5 py-3 text-xs font-bold transition shrink-0 cursor-pointer text-center flex items-center gap-1.5"
                  >
                    {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    Upgrade to Premium ($19)
                  </button>
                )}
              </div>

              {/* AI Usage statistics */}
              <div className="p-5 border border-slate-100 rounded-3xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Usage Quota</h4>
                  <p className="text-slate-800 text-sm font-semibold mt-1">
                    {currentPlan === "PREMIUM" || currentPlan === "Pro" 
                      ? "Unlimited Access Enabled" 
                      : `${aiUsageCount} / 10 queries used`}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {currentPlan === "PREMIUM" || currentPlan === "Pro" 
                      ? "Enjoy unrestricted workspace co-pilot access." 
                      : "Free plan accounts are limited to a total of 10 AI assistant requests."}
                  </p>
                </div>
                {currentPlan !== "PREMIUM" && currentPlan !== "Pro" && (
                  <div className="w-full sm:w-32 bg-slate-200 rounded-full h-2 overflow-hidden shrink-0">
                    <div 
                      className="bg-sky-500 h-full rounded-full transition-all duration-350" 
                      style={{ width: `${Math.min((aiUsageCount / 10) * 100, 100)}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Payment Method details */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">Saved Payment Method</h4>
                  <button
                    onClick={() => setIsEditingCard(!isEditingCard)}
                    className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    {isEditingCard ? "Cancel" : "Change card"}
                  </button>
                </div>

                {!isEditingCard ? (
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                    <div className="h-10 w-16 bg-slate-800 rounded-lg flex items-center justify-center text-white text-[10px] font-bold font-mono shadow-sm shrink-0 border border-slate-700">
                      VISA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{cardNumber}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Expires {cardExpiry} • Holder: {cardHolder}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveCard} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="cardholder-input" className="text-[10px] font-bold text-slate-500">Cardholder Name</label>
                        <input
                          id="cardholder-input"
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800 font-medium"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="cardnumber-input" className="text-[10px] font-bold text-slate-500">Card Number</label>
                        <input
                          id="cardnumber-input"
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800 font-medium"
                          placeholder="1234 5678 9101 1121"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label htmlFor="cardexpiry-input" className="text-[10px] font-bold text-slate-500">Expiry Date</label>
                        <input
                          id="cardexpiry-input"
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800 font-medium"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="cardcvc-input" className="text-[10px] font-bold text-slate-500">CVC</label>
                        <input
                          id="cardcvc-input"
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-800 font-medium"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                      >
                        {loading && <Loader2 className="h-3 w-3 animate-spin" />}
                        Save Details
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Invoices list */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Billing Statements</h4>
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold">
                      <tr>
                        <th className="px-4 py-3">Statement ID</th>
                        <th className="px-4 py-3">Billing Date</th>
                        <th className="px-4 py-3">Paid Amount</th>
                        <th className="px-4 py-3">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50/50">
                          <td className="px-4 py-3 font-mono">{inv.id}</td>
                          <td className="px-4 py-3">{inv.date}</td>
                          <td className="px-4 py-3">{inv.amount}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                setSuccessMsg(`Invoice ${inv.id} downloaded successfully!`);
                                setTimeout(() => setSuccessMsg(""), 3000);
                              }}
                              className="text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer font-semibold"
                            >
                              <Download className="h-3.5 w-3.5" /> PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Workspace Preferences</h3>
                <p className="text-slate-400 text-xs mt-1">Tweak visual settings and dashboard sync processes.</p>
              </div>

              {/* Theme selection */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-600">Visual Display Mode</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`p-4 border rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition ${
                      theme === "light"
                        ? "border-sky-500 bg-sky-50/20 text-sky-600 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-xs">Light</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`p-4 border rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition ${
                      theme === "dark"
                        ? "border-sky-500 bg-sky-50/20 text-sky-600 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-xs">Dark</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`p-4 border rounded-2xl flex flex-col items-center gap-2 cursor-pointer transition ${
                      theme === "system"
                        ? "border-sky-500 bg-sky-50/20 text-sky-600 font-semibold"
                        : "border-slate-100 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    <Laptop className="h-5 w-5" />
                    <span className="text-xs">System</span>
                  </button>
                </div>
              </div>

              {/* Sync settings */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-600">Sync Controls</h4>
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Auto Workspace Background Sync</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Fetch fresh messages from Google servers on dashboard reload.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSync}
                      onChange={(e) => setAutoSync(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
                  </label>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
