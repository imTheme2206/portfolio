import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { type RefObject, useRef } from "react";

type Direction = "top" | "bottom" | "left" | "right";

interface ClipRevealOptions {
  from?: Direction;
  duration?: number;
  ease?: string;
  start?: string;
  tl?: RefObject<gsap.core.Timeline | null>;
  at?: string | number;
}

const clipFrom = (from: Direction): string => {
  switch (from) {
    case "top":    return "inset(100% 0% 0% 0%)";
    case "bottom": return "inset(0% 0% 100% 0%)";
    case "left":   return "inset(0% 0% 0% 100%)";
    case "right":  return "inset(0% 100% 0% 0%)";
  }
};

export const useClipReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ClipRevealOptions = {},
) => {
  const {
    from = "top",
    duration = 1,
    ease = "power2.inOut",
    start = "top 80%",
    tl,
    at,
  } = options;

  const ref = useRef<T>(null);
  const startClip = clipFrom(from);
  const endClip = "inset(0% 0% 0% 0%)";

  useGSAP(
    () => {
      if (!ref.current) return;

      if (tl) {
        tl.current?.fromTo(
          ref.current,
          { clipPath: startClip },
          { clipPath: endClip, duration, ease },
          at,
        );
      } else {
        gsap.fromTo(ref.current,
          { clipPath: startClip },
          {
            clipPath: endClip,
            duration,
            ease,
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return ref;
};
