import { account } from "@/lib/appwrite";
import { OAuthProvider } from "appwrite";

export function loginWithGoogle() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    `${window.location.origin}/dashboard`,
    `${window.location.origin}/login`
  );
}

export async function logout() {
  await account.deleteSession("current");
}
