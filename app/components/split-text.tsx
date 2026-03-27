import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText as SplitTextPlugin } from "gsap/SplitText";
import React, { useRef } from "react";

gsap.registerPlugin(SplitTextPlugin);
export const SplitText = ({
  children,
  animation,
  component,
  className,
  offSet = 0,
  disableReverse = false,
  style,
}: {
  children: React.ReactNode;
  animation?: "byWord" | "byChar";
  component: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  offSet?: number;
  disableReverse?: boolean;
  style?: React.CSSProperties;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const splitType = animation === "byChar" ? "chars,words" : "words";
  const byCharConfig = {
    opacity: 0,
    yPercent: 110,
    rotateX: -90,
    stagger: 0.025,
    duration: 0.7,
    ease: "expo.out",
  };

  const byWordConfig = {
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.6,
    ease: "power3.out",
  };

  useGSAP(() => {
    if (contentRef.current) {
      const split = new SplitTextPlugin(contentRef.current, {
        type: splitType,
      });
      gsap.from(animation === "byChar" ? split.chars : split.words, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: `top ${82 + offSet}%`,
          toggleActions: `play none none ${disableReverse ? "none" : "reverse"}`,
        },
        ...(animation === "byChar" ? byCharConfig : byWordConfig),
      });
    }
  }, []);

  return React.createElement(
    component,
    { ref: contentRef, className: className, style: style },
    children,
  );
};
