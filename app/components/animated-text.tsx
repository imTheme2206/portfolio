import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

type AnimatedTextProps = {
  text: string;
  flow?: "horizontal" | "vertical";
  className?: string;
};

export const AnimatedText = ({
  flow = "vertical",
  ...props
}: AnimatedTextProps) => {
  const containerRef = useRef(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const lines = props.text.split("\n").filter((l) => l.trim() !== "");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        x: flow === "horizontal" ? 100 : undefined,
        y: flow === "vertical" ? 100 : undefined,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });

  return (
    <div ref={containerRef} className={props.className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => {
            lineRefs.current[index] = el!;
          }}
        >
          {line}
        </span>
      ))}
    </div>
  );
};
