import { OAuthProvider } from "appwrite";
import { account } from "./appwrite";

export async function loginWithGoogle() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:3000/dashboard",
    "http://localhost:3000/login"
  );
}

export async function logout() {
  await account.deleteSession("current");
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}