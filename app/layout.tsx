import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { MouseTracker } from "./components/cursor-follower";
import { ThemeSwitcher } from "./components/theme-switcher";
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
    <ReactLenis root>
      <html lang="en">
        <body className={`antialiased`}>
          <MouseTracker />
          <ThemeSwitcher />
          {children}
        </body>
      </html>
    </ReactLenis>
  );
}
