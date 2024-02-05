import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { AppProvider } from "../contexts";

export const metadata: Metadata = {
  title: "Bank System",
  description: "Financial control app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
