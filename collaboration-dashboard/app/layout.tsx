import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/_components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Civic Demo",
  description: "Demo app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="pb-24">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
