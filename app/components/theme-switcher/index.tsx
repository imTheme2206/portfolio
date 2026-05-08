"use client";

import { Theme, useTheme } from "@/app/hook/use-theme-provider";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import { useCallback, useRef } from "react";

export function ThemeSwitcher() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const { applyTheme, getTheme } = useTheme();

  const handleToggle = useCallback(() => {
    if (isAnimatingRef.current) return;
    const currentTheme = getTheme();
    const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";

    const rippleColor =
      nextTheme === "light"
        ? "var(--theme-switcher-light)"
        : "var(--theme-switcher-dark)";

    const btn = buttonRef.current;
    const ripple = rippleRef.current;
    if (!btn || !ripple) return;

    isAnimatingRef.current = true;

    const btnRect = btn.getBoundingClientRect();
    const cx = btnRect.left + btnRect.width / 2;
    const cy = btnRect.top + btnRect.height / 2;

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
      zIndex: 9999,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(ripple, { display: "none", opacity: 0 });
        isAnimatingRef.current = false;
      },
    });

    tl.to(ripple, {
      width: diameter,
      height: diameter,
      duration: 0.55,
      ease: "power3.inOut",
    })
      .call(() => applyTheme(nextTheme), undefined, "<+0.38")
      .to(ripple, { opacity: 1, duration: 0.05 })
      .to(ripple, {
        width: 0,
        height: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(ripple, {
        width: 0,
        height: 0,
        opacity: 0,
        zIndex: 29,
        duration: 0.4,
        ease: "power3.inOut",
      });
  }, [applyTheme, getTheme]);

  return (
    <>
      <div
        ref={rippleRef}
        aria-hidden="true"
        className="fixed inset-0 hidden pointer-events-none z-9999"
      />
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
    </>
  );
}
