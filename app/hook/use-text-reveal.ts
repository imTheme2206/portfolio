import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject, useRef } from "react";
import { useSplitText } from "./use-split-text";

interface TextRevealOptions {
  by?: "chars" | "words" | "lines";
  linesClass?: string;
  start?: string;
  stagger?: number;
  duration?: number;
  ease?: string;
  triggerRef?: RefObject<HTMLElement | null>;
}

export const useTextReveal = <T extends HTMLElement = HTMLElement>(
  options: TextRevealOptions = {},
) => {
  const {
    by = "chars",
    linesClass,
    start = "top 80%",
    stagger = 0.03,
    duration = 0.7,
    ease = "power2.out",
    triggerRef,
  } = options;

  const ref = useRef<T>(null);

  // declared before useGSAP so its useLayoutEffect runs first,
  // ensuring refs are populated when the animation callback fires
  const { charsRef, wordsRef, linesRef } = useSplitText(ref, {
    type: by === "chars" ? "lines,chars" : by,
    linesClass,
  });

  useGSAP(
    () => {
      const targets =
        by === "chars"
          ? charsRef.current
          : by === "words"
            ? wordsRef.current
            : linesRef.current;

      if (!targets.length) return;

      gsap.from(targets, {
        scrollTrigger: {
          trigger: triggerRef?.current ?? ref.current,
          start,
          toggleActions: "play none none none",
        },
        yPercent: 110,
        opacity: 0,
        stagger,
        duration,
        ease,
      });
    },
    { scope: ref },
  );

  return ref;
};
