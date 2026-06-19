import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
}

export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) => {
  const {
    y = 20,
    duration = 0.6,
    stagger = 0.07,
    ease = "power2.out",
    start = "top 88%",
  } = options;

  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      const children = Array.from(containerRef.current?.children ?? []);
      if (!children.length) return;

      gsap.from(children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
        },
        opacity: 0,
        y,
        stagger,
        duration,
        ease,
      });
    },
    { scope: containerRef },
  );

  return containerRef;
};
