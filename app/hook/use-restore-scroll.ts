import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

const HOME_SCROLL_KEY = "home:scroll-y";
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown"] as const;
const SETTLE_MS = 2000;
const TOLERANCE_PX = 2;

export const rememberHomeScroll = () => {
  try {
    sessionStorage.setItem(HOME_SCROLL_KEY, String(Math.round(window.scrollY)));
  } catch {}
};

export const hasRememberedHomeScroll = () => {
  try {
    return sessionStorage.getItem(HOME_SCROLL_KEY) !== null;
  } catch {
    return false;
  }
};

const consumeRememberedHomeScroll = () => {
  try {
    const value = sessionStorage.getItem(HOME_SCROLL_KEY);
    sessionStorage.removeItem(HOME_SCROLL_KEY);
    const y = value === null ? NaN : Number(value);
    return Number.isFinite(y) ? y : null;
  } catch {
    return null;
  }
};

// Returning to the home page (saved position) or landing on a URL hash, the browser
// and router scroll before ScrollTrigger has inserted its pin spacers, and leftover
// smooth-scroll momentum can move the page afterwards. Scroll once the pinned layout
// exists, then hold the position until the page settles or the user takes over.
export const useRestoreScroll = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const savedY = consumeRememberedHomeScroll();
    const hashTarget =
      savedY === null && window.location.hash
        ? document.getElementById(
            decodeURIComponent(window.location.hash.slice(1)),
          )
        : null;
    if (savedY === null && !hashTarget) return;

    const scrollPaddingTop = () =>
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0;

    const drift = () =>
      hashTarget
        ? hashTarget.getBoundingClientRect().top - scrollPaddingTop()
        : window.scrollY - (savedY as number);

    const scrollToTarget = () => {
      // Lenis is shared across routes; its cached scroll limit may still be the previous page's.
      lenis.resize();
      // Lenis applies the html scroll-padding-top itself for element targets.
      lenis.scrollTo(hashTarget ?? (savedY as number), {
        immediate: true,
        force: true,
      });
    };

    let frame = 0;
    let deadline = performance.now() + SETTLE_MS;
    const holdPosition = () => {
      if (Math.abs(drift()) > TOLERANCE_PX) scrollToTarget();
      if (performance.now() < deadline) {
        frame = requestAnimationFrame(holdPosition);
      }
    };

    // A full page load keeps shifting layout until window "load"; hold until then.
    const extendUntilLoaded = () => {
      deadline = performance.now() + SETTLE_MS;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(holdPosition);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener("refresh", scrollToTarget);
      window.removeEventListener("load", extendUntilLoaded);
      USER_SCROLL_EVENTS.forEach((type) =>
        window.removeEventListener(type, stop),
      );
    };

    ScrollTrigger.refresh();
    scrollToTarget();
    frame = requestAnimationFrame(holdPosition);

    ScrollTrigger.addEventListener("refresh", scrollToTarget);
    if (document.readyState !== "complete") {
      window.addEventListener("load", extendUntilLoaded, { once: true });
    }
    USER_SCROLL_EVENTS.forEach((type) =>
      window.addEventListener(type, stop, { passive: true }),
    );

    return stop;
  }, [lenis]);
};
