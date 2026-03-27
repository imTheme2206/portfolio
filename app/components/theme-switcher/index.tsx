"use client";

import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

export function ThemeSwitcher() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Resolve the effective theme: honour class first, then system preference
  const getEffectiveTheme = useCallback((): "light" | "dark" => {
    if (document.documentElement.classList.contains("light")) return "light";
    return "dark";
  }, []);

  // Apply theme + persist preference
  const applyTheme = useCallback((theme: "light" | "dark") => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, []);

  // Bootstrap: system preference + stored preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
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

  const handleToggle = useCallback(() => {
    if (isAnimatingRef.current) return;
    const currentTheme = getEffectiveTheme();
    const nextTheme: "light" | "dark" =
      currentTheme === "dark" ? "light" : "dark";

    // The ripple colour is the OPPOSITE of the current mode, i.e. the theme we're switching INTO
    // Dark  → switching to Light → ripple is light  (oklch(0.984 0.003 247.858))
    // Light → switching to Dark  → ripple is dark   (oklch(0.279 0.041 260.031))
    const rippleColor =
      nextTheme === "light"
        ? "oklch(0.9374 0.017 101.17)"
        : "oklch(0.2833 0.017 101.17)";

    const btn = buttonRef.current;
    const ripple = rippleRef.current;
    if (!btn || !ripple) return;

    isAnimatingRef.current = true;

    // Position the ripple at the button's centre
    const btnRect = btn.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;

    // Diameter needed to cover the entire viewport
    const maxDist = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );
    const diameter = maxDist * 2 + 20;

    gsap.set(ripple, {
      width: 0,
      height: 0,
      x: cx,
      y: cy,
      xPercent: -50,
      yPercent: -50,
      borderRadius: "50%",
      backgroundColor: rippleColor,
      opacity: 1,
      display: "block",
      pointerEvents: "none",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(ripple, { display: "none", opacity: 0 });
        isAnimatingRef.current = false;
      },
    });

    tl
      // 1. Expand the ripple to fill the screen
      .to(ripple, {
        width: diameter,
        height: diameter,
        duration: 0.55,
        ease: "power3.inOut",
      })
      // 2. Exactly mid-animation, flip the theme (the ripple covers everything, so it's invisible)
      .call(() => applyTheme(nextTheme), undefined, "<+0.38")
      // 3. Brief pause at full coverage
      .to(ripple, { opacity: 1, duration: 0.05 })
      // 4. Collapse the ripple away to reveal the new theme
      .to(ripple, {
        width: 0,
        height: 0,
        opacity: 0,
        duration: 0.9,
        ease: "power3.inOut",
      });
  }, [applyTheme, getEffectiveTheme]);

  return (
    <>
      {/* Full-screen ripple overlay */}
      <div
        ref={rippleRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "none",
          pointerEvents: "none",
        }}
      />

      {/* Toggle button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Toggle theme"
        className="theme-switcher-btn bg-foreground text-background size-14"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
          borderRadius: "50%",
          // border: "1.5px solid var(--switcher-border)",
          // background: "var(--switcher-bg)",
          // color: "var(--switcher-icon)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backdropFilter: "blur(12px)",
          // WebkitBackdropFilter: "blur(12px)",
          // boxShadow: "0 4px 32px 0 var(--switcher-shadow)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.12,
            duration: 0.25,
            ease: "power2.out",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        }}
        onMouseDown={(e) => {
          gsap.to(e.currentTarget, {
            scale: 0.93,
            duration: 0.12,
            ease: "power2.in",
          });
        }}
        onMouseUp={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.08,
            duration: 0.15,
            ease: "power2.out",
          });
        }}
      >
        {/* Sun icon — visible in dark mode (clicking will switch to light) */}
        <span
          className="icon-sun"
          aria-hidden="true"
          style={{ position: "absolute", lineHeight: 0 }}
        >
          <Icon icon="ph:sun-bold" width={22} height={22} />
        </span>
        {/* Moon icon — visible in light mode (clicking will switch to dark) */}
        <span
          className="icon-moon"
          aria-hidden="true"
          style={{ position: "absolute", lineHeight: 0 }}
        >
          <Icon icon="ph:moon-bold" width={22} height={22} />
        </span>
      </button>

      {/* Scoped styles */}
      <style>{`
        /* ── Dark mode defaults ── */
        :root {
          --switcher-bg:     oklch(0.35 0.04 260 / 0.55);
          --switcher-border: oklch(0.984 0.003 247.858 / 0.18);
          --switcher-icon:   oklch(0.984 0.003 247.858);
          --switcher-shadow: oklch(0 0 0 / 0.45);
        }

        /* ── Light mode overrides ── */
        html.light {
          --switcher-bg:     oklch(0.92 0.01 260 / 0.60);
          --switcher-border: oklch(0.279 0.041 260.031 / 0.20);
          --switcher-icon:   oklch(0.279 0.041 260.031);
          --switcher-shadow: oklch(0.279 0.041 260.031 / 0.18);
        }

        /* Icon visibility logic */
        .icon-sun  { opacity: 1;  transition: opacity 0.3s ease, transform 0.3s ease; transform: rotate(0deg); }
        .icon-moon { opacity: 0;  transition: opacity 0.3s ease, transform 0.3s ease; transform: rotate(-30deg); }

        html.light .icon-sun  { opacity: 0;  transform: rotate(30deg); }
        html.light .icon-moon { opacity: 1;  transform: rotate(0deg);  }

        /* Button focus ring */
        .theme-switcher-btn:focus-visible {
          outline: 2px solid var(--switcher-icon);
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
