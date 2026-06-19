"use client";

import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useLayoutEffect, useRef } from "react";
import {
  defaultTrackerClassName,
  registerImageElement,
  variantConfig,
} from "./config";
import { CursorVariant } from "./types";

export const useCursorEngine = () => {
  const trackerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDetectScreen();

  useLayoutEffect(() => {
    const tracker = trackerRef.current;
    const thunbnailContainer = imageRef.current;
    const textContainer = textRef.current;
    let rafId: number | null = null;
    if (!tracker || !thunbnailContainer || isMobile) {
      return;
    }

    thunbnailContainer.appendChild(registerImageElement());
    let hasMoved = false;

    let requestId = 0;
    let currentImage: string | null = null;
    const imageCache = new Map<string, Promise<void>>();

    const preloadImage = (src: string) => {
      if (imageCache.has(src)) {
        return imageCache.get(src)!;
      }
      const img = new Image();
      img.src = src;
      const promise = img.decode().catch(() => {});
      imageCache.set(src, promise);
      return promise;
    };

    let currentVariant: CursorVariant = "default";

    const updateCursor = (variant: CursorVariant, image?: string) => {
      if (!tracker || !textContainer) {
        return;
      }
      currentVariant = variant;

      const config = variantConfig[variant] || variantConfig.default;

      const thumbnailElement =
        thunbnailContainer.firstChild as HTMLImageElement;

      tracker.className = defaultTrackerClassName;

      tracker.classList.add(...config.classNames);
      textContainer.textContent = config.text || "";

      if (thumbnailElement) {
        thumbnailElement.style.opacity = config.showThumbnail ? "1" : "0";
      }

      if (config.showThumbnail && image && thumbnailElement) {
        const id = ++requestId;

        preloadImage(image).then(() => {
          if (id !== requestId || currentImage === image) {
            return;
          }

          currentImage = image;
          thumbnailElement.src = image;
        });
      }
    };

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const ease = 0.15;

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (Math.abs(targetX - currentX) < 0.1) currentX = targetX;
      if (Math.abs(targetY - currentY) < 0.1) currentY = targetY;

      tracker.style.transform = `
        translate3d(${currentX}px, ${currentY}px, 0)
      `;

      if (currentX === targetX && currentY === targetY) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        tracker.classList.remove("opacity-0");
      }

      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (currentVariant !== "clickable") {
        return;
      }
      updateCursor("clicked");

      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onReleaseClick = (e: MouseEvent) => {
      if (currentVariant !== "clicked") {
        return;
      }
      updateCursor("clickable");

      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    let hoverTimeout: ReturnType<typeof setTimeout> | undefined;
    const onHover = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      const variant = el?.getAttribute("data-cursor") as CursorVariant;
      const image = el?.getAttribute("data-image") || undefined;

      clearTimeout(hoverTimeout);

      hoverTimeout = setTimeout(() => {
        updateCursor(variant || "default", image);
      }, 70);
    };

    updateCursor("default");
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mousedown", onClick);
    window.addEventListener("mouseup", onReleaseClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("mouseup", onReleaseClick);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return {
    trackerRef,
    imageRef,
    textRef,
  };
};
