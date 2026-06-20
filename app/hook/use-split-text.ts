import { SplitText as GSAPSplitText } from "gsap/all";
import { useLayoutEffect, useRef, type RefObject } from "react";

interface SplitTextOptions {
  type: string;
  linesClass?: string;
  wordsClass?: string;
  charsClass?: string;
}

export const useSplitText = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: SplitTextOptions = { type: "" },
) => {
  const charsRef = useRef<HTMLElement[]>([]);
  const wordsRef = useRef<HTMLElement[]>([]);
  const linesRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const split = new GSAPSplitText(ref.current, options);
    charsRef.current = (split.chars as HTMLElement[]) ?? [];
    wordsRef.current = (split.words as HTMLElement[]) ?? [];
    linesRef.current = (split.lines as HTMLElement[]) ?? [];
    return () => split.revert();
    // options is intentionally excluded — split runs once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { charsRef, wordsRef, linesRef };
};
