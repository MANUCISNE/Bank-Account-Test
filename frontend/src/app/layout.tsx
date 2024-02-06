import type { Metadata } from "next";
import "./globals.css";
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
