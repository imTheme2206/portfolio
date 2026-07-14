"use client";

import { useReducedMotion } from "@/app/hook/use-reduced-motion";
import ReactLenis from "lenis/react";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        smoothWheel: !reducedMotion,
        lerp: reducedMotion ? 1 : 0.1,
      }}
    >
      {children}
    </ReactLenis>
  );
};
