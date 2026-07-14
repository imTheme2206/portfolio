"use client";

import { useReducedMotion } from "@/app/hook/use-reduced-motion";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

type MarqueeProps = {
  // items: string[];
  children: React.ReactNode;
  speed?: number;
  fontSize?: string;
  gap?: number;
  reverse?: boolean;
};

interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number;
  paddingRight?: number;
  reversed?: boolean;
}

const horizontalLoop = (
  items: HTMLElement[],
  config: HorizontalLoopConfig,
): gsap.core.Timeline => {
  items = gsap.utils.toArray(items);
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    },
  });
  const length = items.length;
  const startX = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 80;
  const snap = gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural

  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string,
      ));
      const parsedXPercentage =
        parseFloat(gsap.getProperty(el, "x", "px") as string) / w;
      const elementPercentage = gsap.getProperty(el, "xPercent") as number;
      xPercents[i] = snap(parsedXPercentage * 100 + elementPercentage);
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      Number(gsap.getProperty(items[length - 1], "scaleX")) +
    (config.paddingRight ?? 0);
  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index: number, vars: gsap.TweenVars) {
    vars = vars || {};
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: gsap.TweenVars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }
  return tl;
};

export const Marquee = ({
  // items,
  children,
  speed = 1,
  reverse = false,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!railRef.current) return;

    let cleanup: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLHeadingElement>(
        railRef.current!.children,
      );

      const tl = horizontalLoop(elements, {
        repeat: -1,
        speed,
        reversed: reverse,
      });

      if (reducedMotion) tl.pause(0);

      const quickTimeScale = gsap.quickTo(tl, "timeScale", {
        duration: 0.4,
        ease: "power2",
      });

      let storedDirection = reverse ? -1 : 1;
      let visible = true;

      const observer = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onChangeY(self) {
          if (!visible || reducedMotion) return;
          const velocity = self.velocityY;
          const direction = velocity < 0 ? -1 : 1;
          const actualDirection = reverse ? direction * -1 : direction;
          storedDirection = actualDirection;
          const boost = gsap.utils.clamp(1, 4, 1 + Math.abs(velocity) / 1500);

          quickTimeScale(actualDirection * boost);
        },
        onStop() {
          if (!visible || reducedMotion) return;
          quickTimeScale(storedDirection);
        },
      });

      // Pause the loop while the strip is off-screen so it stops driving the
      // compositor when the user can't see it; resume on the current direction.
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !reducedMotion) tl.resume();
          else tl.pause();
        },
        { threshold: 0 },
      );
      io.observe(containerRef.current!);
      cleanup = () => {
        io.disconnect();
        observer.kill();
      };
    }, containerRef);

    return () => {
      cleanup?.();
      ctx.revert();
    };
  }, [speed, reverse, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center overflow-x-hidden h-72"
    >
      <div ref={railRef} className="flex will-change-transform">
        {children}
      </div>
    </div>
  );
};
