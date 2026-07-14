import type { Metadata } from "next";
import { MouseTracker } from "./components/cursor-follower";
import { ScrollTrack } from "./components/scroll-track";
import { SmoothScrollProvider } from "./components/smooth-scroll-provider";
import { ThemeSwitcher } from "./components/theme-switcher";
import "./globals.css";
import { ThemeProvider } from "./hook/use-theme-provider";

export const metadata: Metadata = {
  title: "Worrachit Pongkatekarm • Software Engineer",
  description:
    "Software engineer in Bangkok crafting clear, expressive interfaces for complex systems.",
  openGraph: {
    title: "Worrachit Pongkatekarm • Software Engineer",
    description:
      "Software engineer in Bangkok crafting clear, expressive interfaces for complex systems.",
    images: ["/assets/images/share-meta.avif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worrachit Pongkatekarm • Software Engineer",
    description:
      "Software engineer in Bangkok crafting clear, expressive interfaces for complex systems.",
    images: ["/assets/images/share-meta.avif"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScrollProvider>
      <ThemeProvider>
        <html lang="en" className="dark">
          <head>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; window.scrollTo(0, 0);",
              }}
            />
          </head>
          <body className={`antialiased overflow-x-hidden`}>
            <MouseTracker />
            <ScrollTrack />
            {children}
            <ThemeSwitcher />
          </body>
        </html>
      </ThemeProvider>
    </SmoothScrollProvider>
  );
}
