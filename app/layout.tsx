import type { Metadata } from "next";
import { MouseFollower } from "./components/mouse";
import "./globals.css";

export const metadata: Metadata = {
  title: "Worrachit Pongkatekarm",
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
        <MouseFollower />
        {children}
      </body>
    </html>
  );
}
