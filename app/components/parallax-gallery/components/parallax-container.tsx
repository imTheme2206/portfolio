import { useRef } from "react";
import { ParallaxContainerDelegate } from "../controller/parallax-container-delegate";
import { useParallaxEngine } from "../hooks/use-parallax";

export const ParallaxContainer = (props: {
  reduceMotion?: boolean;
  children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const { containerRef } = useParallaxEngine(
    (container) =>
      new ParallaxContainerDelegate(container, contentRef.current!),
    props.reduceMotion,
  );

  return (
    <div
      ref={containerRef}
      className="w-full grid place-items-center h-full"
      style={{
        scale: 1.1,
      }}
    >
      <div
        ref={contentRef}
        className="w-full relative px-16 py-16 grid gap-16 mr-auto"
      >
        <div className="h-screen">{props.children}</div>
      </div>
    </div>
  );
};
