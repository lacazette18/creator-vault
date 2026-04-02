import type { Metadata } from "next";
import "./globals.css";
import { AuthProviderClient } from "@/components/AuthProvider";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "CreatorVault - Dashboard",
  description: "Track your creator revenues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProviderClient>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 ml-64">
              {children}
            </main>
          </div>
        </AuthProviderClient>
      </body>
    </html>
  );
}
