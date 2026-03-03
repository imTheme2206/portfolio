import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export const AnimatedText = (props: AnimatedTextProps) => {
  const containerRef = useRef(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const lines = props.text.split("\\n").filter((l) => l.trim() !== "");

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
    // if (lineRefs.current.length > 0) {
    //   lineRefs.current.map((line, idx) => {
    //     gsap.from(line, {
    //       y: 100,
    //       opacity: 0,
    //       duration: 1,
    //       stagger: 0.3,
    //       ease: "back.out",
    //       scrollTrigger: {
    //         trigger: lineRefs.current[idx - 1],
    //       },
    //     });
    //   });
    // }
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
