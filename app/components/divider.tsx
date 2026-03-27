"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const Divider = (props: {
  className: string;
  disableReverse?: boolean;
}) => {
  const lineRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 88%",
          toggleActions: `play none none ${props.disableReverse ? "none" : "reverse"}`,
        },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "expo.inOut",
      });
    }
  }, [lineRef]);
  return (
    <div
      ref={lineRef}
      className={props.className}
      style={{
        transformOrigin: "left center",
      }}
    />
  );
};
