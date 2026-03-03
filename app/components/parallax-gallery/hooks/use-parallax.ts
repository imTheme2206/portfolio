import { useEffect, useRef, useState } from "react";
import {
  ParallaxEngine,
  type ParallaxDelegate,
} from "../controller/parallax-engine";

export function useParallaxEngine<T extends ParallaxDelegate>(
  delegateFactory: (container: HTMLElement) => T,
  disabled?: boolean,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<ParallaxEngine | null>(null);
  const [delegate, setDelegate] = useState<T | null>(null);

  useEffect(() => {
    if (disabled) return;
    if (!containerRef.current) return;

    const newDelegate = delegateFactory(containerRef.current);
    const engine = new ParallaxEngine(containerRef.current, newDelegate);

    setDelegate(newDelegate);
    engineRef.current = engine;

    engine.attach();
    return () => engine.detach();
  }, [disabled]);

  return {
    containerRef,
    delegate,
  };
}
