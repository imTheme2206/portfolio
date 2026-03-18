"use client";

import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useCursorEngine } from "./use-cursor-engine";

export const MouseTracker = () => {
  const { trackerRef, imageRef, textRef } = useCursorEngine();
  const { isMobile } = useDetectScreen();

  if (isMobile) {
    return null;
  }

  return (
    <div ref={trackerRef} className="fixed opacity-0 pointer-events-none">
      <div
        ref={imageRef}
        className="relative w-full h-full overflow-hidden rounded-lg"
      />
      <span
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center text-xs font-bold pointer-events-none"
      />
    </div>
  );
};
