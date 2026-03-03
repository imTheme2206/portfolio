"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";

gsap.registerPlugin(Observer);

type MarqueeProps = {
  items: string[];
  speed?: number;
  fontSize?: string;
  gap?: number;
  reverse?: boolean;
};

const horizontalLoop = (
  items: HTMLElement[],
  config: any,
): gsap.core.Timeline => {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap =
      config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;
  gsap.set(items, {
    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string,
      ));
      let parsedXPercentage =
        parseFloat(gsap.getProperty(el, "x", "px") as string) / w;
      let elementPercentage = gsap.getProperty(el, "xPercent") as number;
      xPercents[i] = snap(parsedXPercentage * 100 + elementPercentage);
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      Number(gsap.getProperty(items[length - 1], "scaleX")) +
    (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
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
  function toIndex(index: number, vars: any) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true); // pre-render for performance
  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }
  return tl;
};

export const Marquee = ({
  items,
  speed = 1,
  fontSize = "text-[120px] md:text-[200px]",
  reverse = false,
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!railRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLHeadingElement>(
        railRef.current!.querySelectorAll("h4"),
      );

      const tl = horizontalLoop(elements, {
        repeat: -1,
        speed,
        reversed: reverse,
      });

      // smoother timeScale control
      const quickTimeScale = gsap.quickTo(tl, "timeScale", {
        duration: 0.4,
        ease: "power3",
      });

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onChangeY(self) {
          const velocity = self.velocityY;
          const direction = velocity < 0 ? -1 : 1;

          quickTimeScale(direction * (1 + Math.abs(velocity) / 1000));
        },
        onStop() {
          quickTimeScale(reverse ? -1 : 1);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full flex items-center"
    >
      <div ref={railRef} className="flex will-change-transform">
        {[...items, ...items].map((text, i) => (
          <h4
            key={i}
            className={`whitespace-nowrap leading-none mr-24 text-white ${fontSize}`}
          >
            {text}
          </h4>
        ))}
      </div>
    </div>
  );
};
