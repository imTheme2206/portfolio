"use client";

import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { Theme, useTheme } from "@/app/hook/use-theme-provider";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useCallback, useRef } from "react";

const REVEAL_DURATION_MS = 500;
const REVEAL_EASE = "cubic-bezier(0.77, 0, 0.175, 1)";

const canHover = (e: React.PointerEvent) =>
  e.pointerType === "mouse" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const scaleTo = (el: HTMLElement, scale: number, duration: number) =>
  gsap.to(el, { scale, duration, ease: "power2.out", overwrite: "auto" });

export function ThemeSwitcher() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitionRef = useRef<ViewTransition | null>(null);
  // Theme the in-flight transition is heading to; getTheme() lags until its callback runs.
  const pendingThemeRef = useRef<Theme | null>(null);
  const { applyTheme, getTheme } = useTheme();

  const handleToggle = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const currentTheme = pendingThemeRef.current ?? getTheme();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    if (typeof document.startViewTransition !== "function") {
      applyTheme(nextTheme);
      return;
    }

    transitionRef.current?.skipTransition();

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );

    pendingThemeRef.current = nextTheme;
    const transition = document.startViewTransition(() =>
      applyTheme(nextTheme),
    );
    transitionRef.current = transition;

    transition.finished
      .catch(() => {})
      .finally(() => {
        if (transitionRef.current !== transition) return;
        transitionRef.current = null;
        pendingThemeRef.current = null;
      });

    if (prefersReducedMotion()) return; // CSS cross-fade handles it

    // WAAPI, not GSAP: GSAP can't target ::view-transition pseudo-elements.
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${cx}px ${cy}px)`,
              `circle(${radius}px at ${cx}px ${cy}px)`,
            ],
          },
          {
            duration: REVEAL_DURATION_MS,
            easing: REVEAL_EASE,
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }, [applyTheme, getTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="bg-foreground text-background size-12"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPointerEnter={(e) => {
        if (canHover(e)) scaleTo(e.currentTarget, 1.06, 0.2);
      }}
      onPointerLeave={(e) => scaleTo(e.currentTarget, 1, 0.2)}
      onPointerDown={(e) => scaleTo(e.currentTarget, 0.93, 0.1)}
      onPointerUp={(e) =>
        scaleTo(e.currentTarget, canHover(e) ? 1.06 : 1, 0.16)
      }
      onPointerCancel={(e) => scaleTo(e.currentTarget, 1, 0.16)}
    >
      <span
        className="dark:opacity-100 opacity-0 transition-opacity ease-in-out duration-300 dark:transform-[rotate(0deg)] transform-[rotate(30deg)]"
        aria-hidden="true"
        style={{ position: "absolute", lineHeight: 0 }}
      >
        <Icon icon="ph:sun-bold" width={22} height={22} />
      </span>
      <span
        className="dark:opacity-0 opacity-100 transition-opacity ease-in-out duration-300 dark:transform-[rotate(-30deg)] transform-[rotate(0deg)]"
        aria-hidden="true"
        style={{ position: "absolute", lineHeight: 0 }}
      >
        <Icon icon="ph:moon-bold" width={22} height={22} />
      </span>
    </button>
  );
}
