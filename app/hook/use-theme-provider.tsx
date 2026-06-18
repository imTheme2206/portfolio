"use client";
import { createContext, useCallback, useContext, useEffect } from "react";

export type Theme = "light" | "dark";

type ThemeContextProps = {
  applyTheme: (theme: Theme) => void;
  getTheme: () => Theme;
};
export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Resolve the effective theme: honour class first, then system preference
  const getTheme = useCallback((): Theme => {
    if (typeof document === "undefined") {
      return "dark";
    }
    if (document.documentElement.classList.contains("dark")) {
      return "dark";
    }
    return "light";
  }, []);

  // Apply theme + persist preference
  const applyTheme = useCallback((theme: Theme) => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    localStorage.setItem("theme", theme);
  }, []);

  // Bootstrap: system preference + stored preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      applyTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    applyTheme(prefersDark ? "dark" : "light");

    // Listen for OS-level changes (only when the user hasn't stored a preference)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ applyTheme, getTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
