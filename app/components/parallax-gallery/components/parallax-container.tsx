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
      className="max-w-full w-full grid place-items-center h-full"
      style={{
        scale: 1.15,
      }}
    >
      <div
        ref={contentRef}
        className="w-full h-full relative px-16 py-16 grid gap-16 mr-auto"
      >
        <div className="max-h-[40dvh] md:max-h-[60dvh] xl:max-h-[90vh] overflow-hidden">
          {props.children}
        </div>
      </div>
    </div>
  );
};
