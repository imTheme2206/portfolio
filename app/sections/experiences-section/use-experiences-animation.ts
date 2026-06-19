import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useExperiencesAnimation = ({
  isDesktop,
}: {
  isDesktop: boolean;
}) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const circleTextRef = useRef<HTMLDivElement>(null);
  const pillTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isDesktop) return;

    gsap.set(contentRef.current, { autoAlpha: 0, y: 24 });
    gsap.set(cardRef.current, { rotate: -8, transformOrigin: "center center" });
    gsap.set(pillTextRef.current, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
      },
    });

    tl.to(cardRef.current, {
      rotate: 0,
      width: "55vw",
      height: "55vw",
      borderRadius: "50%",
      ease: "power1.inOut",
      duration: 0.25,
    })
      .to(
        imageRef.current,
        { opacity: 1, filter: "grayscale(0%)", ease: "none", duration: 0.25 },
        "<",
      )
      .to(
        circleTextRef.current,
        { scale: 1.25, opacity: 0, ease: "power1.in", duration: 0.25 },
        "<",
      )
      .to(cardRef.current, {
        width: "82vw",
        height: "22rem",
        borderRadius: "999px",
        ease: "power2.inOut",
        duration: 0.25,
      })
      .to(
        pillTextRef.current,
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
        "<0.1",
      )
      .to(imageRef.current, { scale: 1.08, ease: "none", duration: 0.25 }, "<")
      .to(cardRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        ease: "power1.in",
        duration: 0.25,
      })
      .to(
        pillTextRef.current,
        { opacity: 0, y: -10, ease: "power1.in", duration: 0.15 },
        "<",
      )
      .to(imageRef.current, { scale: 1.18, ease: "none", duration: 0.25 }, "<")
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        ease: "power1.out",
        duration: 0.15,
      });
  }, [isDesktop]);

  return { spacerRef, cardRef, contentRef, imageRef, circleTextRef, pillTextRef };
};
