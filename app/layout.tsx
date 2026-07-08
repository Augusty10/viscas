import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Viscas",
  description: "The AI Workspace for Email & Calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <body className={`${inter.variable} ${sora.variable}`}>
  <GoogleOAuthProvider
    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
  >
    {children}
  </GoogleOAuthProvider>
</body>
    </html>
  );
}