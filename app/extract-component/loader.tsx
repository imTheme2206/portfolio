"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

type LoaderProps = {
  name?: string;
  label?: string;
  onComplete?: () => void;
};

const ITALIC_FROM = 5;

export function Loader({
  name = "imTheme",
  label = "PORTFOLIO",
  onComplete,
}: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      if (!visible) return;

      const tl = gsap.timeline();
      const counter = { v: 0 };

      // Reveal name letters
      tl.to(".loader-char", {
        yPercent: 0,
        duration: 1.0,
        stagger: 0.06,
        ease: "expo.out",
      });

      // Progress bar + counter
      tl.to(
        counter,
        {
          v: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate() {
            const v = Math.floor(counter.v);
            if (countRef.current)
              countRef.current.textContent = String(v).padStart(3, "0");
            if (fillRef.current) fillRef.current.style.width = `${v}%`;
          },
          onComplete() {
            const exit = gsap.timeline({
              onComplete() {
                setVisible(false);
                onComplete?.();
              },
            });

            exit
              .to(
                ".loader-char",
                {
                  yPercent: -110,
                  duration: 0.3,
                  stagger: 0.03,
                  ease: "expo.in",
                },
                0,
              )
              .to(
                ".loader-bar, .loader-meta",
                { opacity: 0, duration: 0.7, ease: "power2.out" },
                0.1,
              )
              .to(
                ".loader-curtain-top",
                { scaleY: 1, duration: 0.9, ease: "expo.inOut" },
                0.4,
              )
              .to(
                ".loader-curtain-bot",
                { scaleY: 1, duration: 0.9, ease: "expo.inOut" },
                0.4,
              )
              .to(
                containerRef.current,
                { opacity: 0, duration: 0.7, ease: "power2.out" },
                "+=0.1",
              );
          },
        },
        "-=0.4",
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  if (!visible) return null;

  const chars = name.split("").map((ch, i) => ({
    ch,
    italic: i >= ITALIC_FROM,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 overflow-hidden bg-secondary"
    >
      {/* Curtains */}
      <div className="loader-curtain-top absolute top-0 left-0 right-0 h-1/2 origin-top scale-y-0 bg-secondary z-[99]" />
      <div className="loader-curtain-bot absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 bg-secondary z-[99]" />

      {/* Big name */}
      <div className="flex gap-[0.05em] overflow-hidden font-heading font-extralight tracking-[-0.05em] leading-[0.85] text-[clamp(80px,18vw,280px)]">
        {chars.map(({ ch, italic }, i) =>
          italic ? (
            <span
              key={i}
              className="loader-char inline-block translate-y-[110%] text-primary italic will-change-transform"
            >
              {ch}
            </span>
          ) : (
            <span
              key={i}
              className="loader-char inline-block translate-y-[110%] text-primary will-change-transform"
            >
              {ch}
            </span>
          ),
        )}
      </div>

      {/* Progress bar */}
      <div className="loader-bar w-[min(640px,80vw)] space-y-3">
        <div className="h-px w-full bg-primary/10 overflow-hidden">
          <div
            ref={fillRef}
            className="h-full w-0 bg-primary transition-none"
          />
        </div>

        {/* Meta row */}
        <div className="loader-meta flex justify-between font-display text-[12px] tracking-[0.1em] text-primary/50">
          <span>{label}</span>
          <span ref={countRef}>000</span>
        </div>
      </div>
    </div>
  );
}
