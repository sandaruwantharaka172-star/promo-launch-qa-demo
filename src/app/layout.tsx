import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Launchproof · Promotional Campaign QA Demo",
  description: "A compact Next.js demonstration of promotional campaign implementation, QA and launch-readiness checks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
