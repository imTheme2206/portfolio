import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { MouseTracker } from "./components/cursor-follower";
import { ScrollTrack } from "./components/scroll-track";
import { ThemeSwitcher } from "./components/theme-switcher";
import { Loader } from "./extract-component/loader";
import "./globals.css";
import { ThemeProvider } from "./hook/use-theme-provider";

export const metadata: Metadata = {
  title: "Worrachit Pongkatekarm • Software Engineer",
  description: "My humble little portfoilio",
  openGraph: {
    title: "Worrachit Pongkatekarm • Software Engineer",
    description: "My humble little portfoilio",
    images: ["/assets/images/share-meta.avif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worrachit Pongkatekarm • Software Engineer",
    description: "My humble little portfoilio",
    images: ["/assets/images/share-meta.avif"],
  },
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
          <body className={`antialiased overflow-x-hidden`}>
            <Loader />
            <MouseTracker />
            <ScrollTrack />
            {children}
            <ThemeSwitcher />
          </body>
        </html>
      </ThemeProvider>
    </ReactLenis>
  );
}
