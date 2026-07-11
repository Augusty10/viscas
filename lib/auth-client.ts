import { account } from "@/lib/appwrite";
import { OAuthProvider, ID } from "appwrite";

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

export async function signupWithEmail(email: string, password: string, name: string) {
  return await account.create(ID.unique(), email, password, name);
}

export async function loginWithEmail(email: string, password: string) {
  return await account.createEmailPasswordSession(email, password);
}
