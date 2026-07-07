"use client";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";

export function logoutGoogle() {
  googleLogout();
}