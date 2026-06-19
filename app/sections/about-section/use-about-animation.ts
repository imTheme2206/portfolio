import { useClipReveal } from "@/app/hook/use-clip-reveal";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useSplitText } from "@/app/hook/use-split-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useAboutAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const line1aRef = useRef<HTMLParagraphElement>(null);
  const line1bRef = useRef<HTMLParagraphElement>(null);
  const line2aRef = useRef<HTMLParagraphElement>(null);
  const line2bRef = useRef<HTMLParagraphElement>(null);
  const bioLabelRef = useRef<HTMLDivElement>(null);
  const sectionNumRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const screen = useDetectScreen();

  // runs first (useLayoutEffect): populates charsRef before useGSAP fires
  const { charsRef } = useSplitText(headingRef, {
    type: "lines,chars",
    linesClass: "overflow-hidden",
  });

  // runs second: creates the scrubbed timeline, stores in tlRef, adds text animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });
      tlRef.current = tl;

      tl.from(sectionNumRef.current, { opacity: 0, y: 16, duration: 0.4 }, 0);

      const chars = charsRef.current;
      if (chars.length) {
        tl.from(
          chars,
          { yPercent: 110, opacity: 0, stagger: 0.035, duration: 0.8 },
          0,
        );
      }

      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "expo.out",
          transformOrigin: "left center",
        },
        0.7,
      );

      tl.from(bioLabelRef.current, { opacity: 0, y: 18, duration: 0.3 }, 0.85);
      tl.from(line1aRef.current, { y: 48, opacity: 0, duration: 0.4 }, 0.92);
      tl.from(line1bRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.02);
      tl.from(line2aRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.2);
      tl.from(line2bRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.3);
    },
    { scope: sectionRef },
  );

  // declared after the timeline-creating useGSAP so its useLayoutEffect fires
  // second — tlRef.current is guaranteed to be set at that point
  const imgWrapRef = useClipReveal<HTMLDivElement>({
    from: !screen.isMobile ? "bottom" : "top",
    duration: 1,
    tl: tlRef,
    at: 0,
  });

  return {
    sectionRef,
    imgWrapRef,
    headingRef,
    dividerRef,
    line1aRef,
    line1bRef,
    line2aRef,
    line2bRef,
    bioLabelRef,
    sectionNumRef,
  };
};
