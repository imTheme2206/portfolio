import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { MouseTracker } from "./components/cursor-follower";
import { ThemeSwitcher } from "./components/theme-switcher";
import { Loader } from "./extract-component/loader";
import "./globals.css";
import { ThemeProvider } from "./hook/use-theme-provider";

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
      <ThemeProvider>
        <html lang="en" className="dark">
          <body className={`antialiased`}>
            <Loader
            // onComplete={() => startIntroAnimation()}
            />
            <MouseTracker />
            {children}
            <ThemeSwitcher />
          </body>
        </html>
      </ThemeProvider>
    </ReactLenis>
  );
}
