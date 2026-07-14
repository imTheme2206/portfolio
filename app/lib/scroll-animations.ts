import gsap from "gsap";

type RevealVars = {
  /** ScrollTrigger start position. */
  start?: string;
  /** Entrance offsets — provide whichever axis applies. */
  y?: number;
  x?: number;
  xPercent?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
};

/**
 * Scroll-triggered "fade up" reveal: tweens `targets` in from an offset while
 * fading from transparent, played once when `trigger` enters the viewport.
 *
 * Must be called inside a useGSAP/matchMedia body (it's an imperative GSAP
 * helper, not a React hook).
 */
export const revealOnScroll = (
  targets: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  { start = "top 80%", duration = 0.8, ease = "power3.out", ...from }: RevealVars = {},
) =>
  gsap.from(targets, {
    autoAlpha: 0,
    duration,
    ease,
    ...from,
    scrollTrigger: { trigger, start },
  });

type ScrubProgressVars = {
  /** Which scale axis the progress bar grows along. */
  axis: "x" | "y";
  start?: string;
  end?: string;
};

/**
 * Scrub-linked progress bar: scales `target` to full along one axis, tied to
 * scroll position between `start` and `end`.
 */
export const scrubProgress = (
  target: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  { axis, start = "top 52%", end = "bottom 48%" }: ScrubProgressVars,
) =>
  gsap.to(target, {
    [axis === "x" ? "scaleX" : "scaleY"]: 1,
    ease: "none",
    scrollTrigger: { trigger, start, end, scrub: true },
  });
