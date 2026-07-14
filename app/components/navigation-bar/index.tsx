"use client";

import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const NavBar = () => {
  const navRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(navRef.current, {
        y: -24,
        autoAlpha: 0,
        duration: 0.8,
        delay: 0.25,
        ease: "power3.out",
      });
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-100 px-5 pt-5 text-white mix-blend-difference sm:px-10 sm:pt-7"
    >
      <div className="mx-auto flex max-w-[96rem] items-center justify-between">
        <div className="font-heading italic [--animated-base-color:white]">
          <AnimatedHoverText
            text="WP"
            fontSize="1.25rem"
            href="#hero-section"
            textColor="white"
          />
        </div>
        <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] sm:gap-7 sm:text-[10px] sm:tracking-[0.24em]">
          {[
            ["Projects", "#projects"],
            ["About", "#about"],
            ["Experience", "#experience"],
            ["Contact", "#contact-section"],
          ].map(([label, href]) => (
            <div
              key={href}
              className="[--animated-base-color:rgba(255,255,255,0.6)]"
            >
              <AnimatedHoverText
                text={label}
                fontSize="inherit"
                href={href}
                textColor="white"
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
