"use client";

import { useLayoutEffect, useRef } from "react";

type Vector2D = {
  x: number;
  y: number;
};

type CursorVariant = "default" | "experience" | "inverse" | "big";

export const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const variantRef = useRef<CursorVariant>("default");
  const mousePositionRef = useRef<Vector2D>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    let hasMoved = false;
    const follower = followerRef.current;
    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        followerRef.current?.classList.remove("opacity-0");
      }

      const targetedPOI = e.target as HTMLDivElement;
      const target = targetedPOI.parentElement?.getAttribute("id");
      mousePositionRef.current.x = e.clientX;
      mousePositionRef.current.y = e.clientY;

      if (followerRef.current) {
        followerRef.current.style.transform = `
          translate3d(${mousePositionRef.current.x}px, ${mousePositionRef.current.y}px, 0)
        `;

        if (target === "experience") {
          followerRef.current.style.borderColor = `black`;
        } else {
          followerRef.current.style.borderColor = "";
        }
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      const variant = target?.getAttribute("data-cursor") as CursorVariant;

      variantRef.current = variant || "default";
      updateCursor(variantRef.current);
    };

    const updateCursor = (variant: CursorVariant) => {
      if (!follower) return;

      // Reset
      follower.className =
        "fixed pointer-events-none will-change-transform rounded-full z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out";

      switch (variant) {
        case "experience":
          follower.classList.add(
            "w-16",
            "h-16",
            "border-2",
            "border-black",
            "bg-transparent",
          );
          break;

        case "inverse":
          follower.classList.add(
            "w-12",
            "h-12",
            "bg-primary",
            "mix-blend-difference",
          );
          break;

        case "big":
          follower.classList.add("w-24", "h-24", "border-2", "border-primary");
          break;

        default:
          follower.classList.add("w-12", "h-12", "border-2", "border-primary");
      }
    };
    updateCursor("default");
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed opacity-0 pointer-events-none"
    ></div>
  );
};
