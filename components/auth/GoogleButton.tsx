"use client";

import { loginWithGoogle } from "@/lib/auth";

export default function GoogleButton() {
  return (
    <button
      onClick={loginWithGoogle}
      className="flex w-full items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white transition hover:bg-sky-700"
    >
      Continue with Google
    </button>
  );
}