import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

export const useHeroAnimation = ({
  sectionRef,
  galleryRef,
  contentRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
}) => {
  useGSAP(
    () => {
      const tiles = Array.from(galleryRef.current?.children ?? []);
      const content = sectionRef.current?.querySelectorAll(".hero-reveal") ?? [];
      const nameMarquee = sectionRef.current?.querySelector(
        ".hero-name-marquee",
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          tiles,
          { autoAlpha: 0, y: 56, scale: 0.96, clipPath: "inset(15% 0)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0)",
            duration: 1.05,
            stagger: { amount: 0.5, from: "random" },
          },
        )
        .from(
          content,
          { y: 34, autoAlpha: 0, duration: 0.8, stagger: 0.09 },
          "-=0.55",
        );

      const scrollTimeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(galleryRef.current, { scale: 0.94, yPercent: 6, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -7, autoAlpha: 0.25, ease: "none" }, 0);

      if (nameMarquee) {
        scrollTimeline.fromTo(
          nameMarquee,
          { yPercent: 0, autoAlpha: 1 },
          { yPercent: 38, autoAlpha: 0.18, ease: "none" },
          0,
        );
      }
    },
    { scope: sectionRef },
  );
};
