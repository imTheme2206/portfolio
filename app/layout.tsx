import type { Metadata } from "next";
import { MouseTracker } from "./components/cursor-follower";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worrachit Pongkatekarm • Software Engineer",
  description: "My humble little portfoilio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MouseTracker />
        {children}
      </body>
    </html>
  );
}
