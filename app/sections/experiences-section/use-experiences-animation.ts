import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useExperiencesAnimation = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const circleTextRef = useRef<HTMLDivElement>(null);
  const pillTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (
      !spacerRef.current ||
      !cardRef.current ||
      !contentRef.current ||
      !imageRef.current ||
      !circleTextRef.current ||
      !pillTextRef.current
    ) {
      return;
    }

    gsap.set(cardRef.current, {
      rotate: -8,
      transformOrigin: "center center",
      willChange: "width, height, border-radius, transform",
    });
    gsap.set(pillTextRef.current, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    tl.addLabel("circle")
      .to(cardRef.current, {
        rotate: 0,
        width: () => (window.innerWidth < 640 ? "76vw" : "55vw"),
        height: () => (window.innerWidth < 640 ? "76vw" : "55vw"),
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
      .addLabel("pill")
      .to(cardRef.current, {
        width: () => (window.innerWidth < 640 ? "90vw" : "82vw"),
        height: () => (window.innerWidth < 640 ? "18rem" : "22rem"),
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
      .addLabel("fullBleed")
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
      .to(imageRef.current, { scale: 1.18, ease: "none", duration: 0.25 }, "<");

    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, y: 32 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      },
    );

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 65%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    }
  }, []);

  return {
    spacerRef,
    cardRef,
    contentRef,
    imageRef,
    circleTextRef,
    pillTextRef,
    progressRef,
  };
};
