import gsap from "gsap";

type ParallaxLayer = {
  /** Element to translate toward the pointer. */
  el: HTMLElement;
  /** Multipliers applied to the pointer offset from the bounds centre. */
  strengthX: number;
  strengthY: number;
  /** quickTo tween settings; defaults tuned for a soft magnetic feel. */
  duration?: number;
  ease?: string;
};

/**
 * Wire a magnetic pointer-parallax effect: as the pointer moves over `bounds`,
 * each layer is translated toward it (scaled by its strength) using gsap.quickTo,
 * and reset to origin on pointerleave.
 *
 * Returns a cleanup function that removes the listeners.
 */
export const attachPointerParallax = (
  bounds: HTMLElement,
  layers: ParallaxLayer[],
): (() => void) => {
  const setters = layers.map((layer) => ({
    layer,
    x: gsap.quickTo(layer.el, "x", {
      duration: layer.duration ?? 0.55,
      ease: layer.ease ?? "power3.out",
    }),
    y: gsap.quickTo(layer.el, "y", {
      duration: layer.duration ?? 0.55,
      ease: layer.ease ?? "power3.out",
    }),
  }));

  const handlePointerMove = (event: PointerEvent) => {
    const rect = bounds.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    setters.forEach((setter) => {
      setter.x(x * setter.layer.strengthX);
      setter.y(y * setter.layer.strengthY);
    });
  };

  const reset = () => {
    setters.forEach((setter) => {
      setter.x(0);
      setter.y(0);
    });
  };

  bounds.addEventListener("pointermove", handlePointerMove);
  bounds.addEventListener("pointerleave", reset);

  return () => {
    bounds.removeEventListener("pointermove", handlePointerMove);
    bounds.removeEventListener("pointerleave", reset);
  };
};
