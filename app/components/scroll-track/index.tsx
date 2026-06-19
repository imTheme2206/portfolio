"use client";
import { useLenis } from "lenis/react";
import { useRef } from "react";

export function ScrollTrack() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    const pct = progress * 100;
    if (fillRef.current) fillRef.current.style.height = `${pct}%`;
    if (dotRef.current) dotRef.current.style.top = `${pct}%`;
  });

  return (
    <div className="fixed right-0 top-0 z-50 w-0.5 h-dvh">
      <div
        ref={fillRef}
        className="absolute top-0 left-0 w-full h-0 will-change-[height] bg-accent-foreground"
      />
    </div>
  );
}
