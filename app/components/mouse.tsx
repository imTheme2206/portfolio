"use client";

import { useLayoutEffect, useRef } from "react";

type Vector2D = {
  x: number;
  y: number;
};

export const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const mousePositionRef = useRef<Vector2D>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    let hasMoved = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        followerRef.current?.classList.remove("opacity-0");
      }
      mousePositionRef.current.x = e.clientX;
      mousePositionRef.current.y = e.clientY;

      if (followerRef.current) {
        followerRef.current.style.transform = `
          translate3d(${mousePositionRef.current.x}px, ${mousePositionRef.current.y}px, 0)
        `;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed will-change-transform shadow w-12 h-12 rounded-full border-zinc-100 border-2 border-solid inset-0 z-999 transition-all opacity-0 ease-out duration-200 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
    ></div>
  );
};
