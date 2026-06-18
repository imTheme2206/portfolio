import { useEffect, useRef, useState } from "react";
import {
  ParallaxEngine,
  type AutoPanConfig,
  type ParallaxDelegate,
} from "../controller/parallax-engine";

type UseParallaxOptions = {
  disabled?: boolean;
  autoPan?: boolean | Partial<AutoPanConfig>;
};

export function useParallaxEngine<T extends ParallaxDelegate>(
  delegateFactory: (container: HTMLElement) => T,
  optionsOrDisabled?: boolean | UseParallaxOptions,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<ParallaxEngine | null>(null);
  const [delegate, setDelegate] = useState<T | null>(null);

  const options: UseParallaxOptions =
    typeof optionsOrDisabled === "boolean"
      ? { disabled: optionsOrDisabled }
      : (optionsOrDisabled ?? {});
  const { disabled, autoPan } = options;

  useEffect(() => {
    if (disabled) return;
    if (!containerRef.current) return;

    const newDelegate = delegateFactory(containerRef.current);
    const engine = new ParallaxEngine(containerRef.current, newDelegate);

    setDelegate(newDelegate);
    engineRef.current = engine;

    engine.attach();

    if (autoPan) {
      const autoPanConfig =
        typeof autoPan === "object" ? autoPan : undefined;

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries[0].isIntersecting;
          if (visible) {
            engine.startAutoPan(autoPanConfig);
          } else {
            engine.stopAutoPan();
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        engine.detach();
      };
    }

    return () => engine.detach();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, autoPan]);

  return {
    containerRef,
    delegate,
    engineRef,
  };
}
