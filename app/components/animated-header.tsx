import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { AnimatedText } from "./animated-text";
import { Divider } from "./divider";
import { SplitText } from "./split-text";

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
  const title = props.title || "";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: props.withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top bottom",
          }
        : undefined,
    });

    tl.from(contextRef.current, {
      y: !props.disableFlyMotion ? "10vh" : undefined,
      duration: 1,
      ease: "circ.out",
    });
  }, []);

  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0, 100%)" }}>
        <div className="flex flex-col justify-center gap-12 pt-16 sm:gap-16">
          {props.subtitle && (
            <SplitText
              component="p"
              animation="byChar"
              className={`text-lg font-light tracking-[0.5rem] uppercase px-10`}
            >
              {props.subtitle}
            </SplitText>
          )}
          {title !== "" ? (
            <div className="px-10 relative">
              <SplitText
                component="h1"
                animation="byChar"
                className={`text-7xl md:text-9xl`}
              >
                {title}
              </SplitText>
              <Divider className="absolute inset-x-0 border-t-2" />
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
