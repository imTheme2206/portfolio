import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { AnimatedText } from "./animated-text";

type AnimatedHeaderProps = {
  subtitle?: string;
  title?: string;
  text?: string;
  textFlow?: "horizontal" | "vertical";
  withScrollTrigger?: boolean;
  disableFlyMotion?: boolean;
};

export const AnimatedHeader = (props: AnimatedHeaderProps) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  const title = props.title || "";
  const shouldSplitTitle = (props.title || "").includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: props.withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: !props.disableFlyMotion ? "50vh" : undefined,
      duration: 1,
      ease: "circ.out",
    });

    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: !props.disableFlyMotion ? "200" : undefined,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2",
    );
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0, 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-12 pt-16 sm:gap-16"
        >
          {props.subtitle && (
            <p
              className={`text-lg font-light tracking-[0.5rem] uppercase px-10`}
            >
              {props.subtitle}
            </p>
          )}
          {title !== "" ? (
            <div className="px-10 relative">
              <h1
                className={`flex flex-col gap-12 uppercase banner-text-responsive sm:gap-16 md:block text-7xl md:text-9xl`}
              >
                {titleParts.map((part, index) => (
                  <span key={index}>{part} </span>
                ))}
              </h1>
              <div className="absolute inset-x-0 border-t-2" />
            </div>
          ) : (
            <div className="h-32"></div>
          )}
          {props.text && (
            <div className={`relative px-10`}>
              <div className="py-12 sm:py-16 text-end">
                <AnimatedText
                  text={props.text}
                  flow={props.textFlow}
                  className={`font-light uppercase value-text-responsive flex flex-col text-xl`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
