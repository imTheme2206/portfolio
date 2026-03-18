"use client";

import { useLayoutEffect, useRef } from "react";
import { useDetectScreen } from "../hook/use-detect-screen";

type Vector2D = {
  x: number;
  y: number;
};

type CursorVariant =
  | "default"
  | "experience"
  | "inverse"
  | "big"
  | "clickable"
  | "thumbnail";

const imageCache = new Map<string, boolean>();

const preloadImage = (src: string, callback?: () => void) => {
  if (imageCache.get(src)) {
    callback?.();
    return;
  }
  const img = new Image();
  img.src = src;

  img.onload = () => {
    imageCache.set(src, true);
    callback?.();
  };
};

export const MouseFollower = () => {
  const followerRef = useRef<HTMLDivElement | null>(null);
  const variantRef = useRef<CursorVariant>("default");
  const mousePositionRef = useRef<Vector2D>({ x: 0, y: 0 });
  const textRef = useRef<HTMLSpanElement | null>(null);
  const imgARef = useRef<HTMLSpanElement | null>(null);
  const imgBRef = useRef<HTMLSpanElement | null>(null);
  const currentImageRef = useRef<string | null>(null);
  const activeLayer = useRef<"A" | "B">("A");

  const { isMobile } = useDetectScreen();

  useLayoutEffect(() => {
    if (isMobile) {
      return;
    }
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
      const dataUrl = target?.getAttribute("data-image") as string;

      variantRef.current = variant || "default";
      updateCursor(variantRef.current, dataUrl);
    };

    const updateCursor = (variant: CursorVariant, dataUrl?: string) => {
      if (!follower || isMobile || !textRef.current) {
        return;
      }

      // Reset
      follower.className =
        "fixed pointer-events-none will-change-transform z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out";

      switch (variant) {
        case "experience":
          textRef.current.textContent = "";
          follower.classList.add(
            "w-10",
            "h-10",
            "border-2",
            "border-black",
            "rounded-full",
            "bg-transparent",
          );
          break;

        case "inverse":
          textRef.current.textContent = "";
          follower.classList.add(
            "w-12",
            "h-12",
            "bg-primary",
            "mix-blend-difference",
            "rounded-full",
          );
          break;

        case "thumbnail":
          follower.classList.add(
            "w-126",
            "h-72",
            "-translate-y-74",
            "bg-secondary-foreground",
            "rounded-lg",
            "transition-transform",
            "flex",
            "items-center",
            "justify-center",
          );

          if (!dataUrl || !imgARef.current || !imgBRef.current) {
            return;
          }
          if (currentImageRef.current === dataUrl) {
            return;
          }
          const nextLayer =
            activeLayer.current === "A" ? imgBRef.current : imgARef.current;
          const currentLayer =
            activeLayer.current === "A" ? imgARef.current : imgBRef.current;

          preloadImage(dataUrl, () => {
            if (!nextLayer || !currentLayer) {
              return;
            }
            // apply new image
            nextLayer.style.backgroundImage = `url(${dataUrl})`;
            // switch active layer
            activeLayer.current = activeLayer.current === "A" ? "B" : "A";
          });

          break;

        case "clickable":
          follower.classList.add(
            "w-18",
            "h-18",
            "text-primary-foreground",
            "bg-secondary-foreground",
            "border-2",
            "border-primary",
            "flex",
            "items-center",
            "rounded-full",
            "justify-center",
          );
          textRef.current.textContent = "CLICK";
          break;

        case "big":
          follower.classList.add(
            "w-24",
            "h-24",
            "border-2",
            "border-primary",
            "rounded-full",
          );
          break;

        default:
          textRef.current.textContent = "";
          imgARef.current!.style.backgroundImage = "";
          imgBRef.current!.style.backgroundImage = "";
          follower.classList.add(
            "w-10",
            "h-10",
            "border-2",
            "border-primary",
            "rounded-full",
          );
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

  if (isMobile) {
    return null;
  }

  return (
    <div ref={followerRef} className="fixed opacity-0 pointer-events-none">
      <span
        ref={imgARef}
        className="absolute inset-1 bg-center bg-cover bg-no-repeat transition-opacity duration-300"
      />
      <span
        ref={imgBRef}
        className="absolute inset-1 bg-center bg-cover bg-no-repeat transition-opacity duration-300"
      />
      <span
        ref={textRef}
        className="text-xs font-bold pointer-events-none"
      ></span>
    </div>
  );
};
