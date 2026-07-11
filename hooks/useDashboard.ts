"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib/dashboard";
import { account } from "@/lib/appwrite";

export type DashboardData = {
  unreadCount: number;
  meetingsCount: number;
  userName: string;

  priorityEmails: any[];
  recentEmails: any[];
  todayEvents: any[];
  events: any[];
};

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    unreadCount: 0,
    meetingsCount: 0,
    userName: "User",

    priorityEmails: [],
    recentEmails: [],
    todayEvents: [],
    events: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  async function refresh() {
    try {
      setLoading(true);

      const token = localStorage.getItem(
        "google_access_token"
      );

      if (!token) {
        setError("Google account not connected");
        return;
      }

      let userName = "User";
      try {
        const u = await account.get();
        userName = u.name;
      } catch (err) {
        console.error("Failed to fetch Appwrite user inside useDashboard", err);
      }

      const dashboard =
        await getDashboardData(token);

      setData({
        ...dashboard,
        userName,
      });

      setError(null);
    } catch (err: any) {
      console.error(err);

      setError(
        err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    ...data,

    loading,

    error,

    refresh,
  };
}