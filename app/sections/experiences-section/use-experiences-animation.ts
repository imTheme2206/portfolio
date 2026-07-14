import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { attachPointerParallax } from "@/app/lib/pointer-parallax";
import { revealOnScroll, scrubProgress } from "@/app/lib/scroll-animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";

export const useExperiencesAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const activeRoleRef = useRef<HTMLDivElement>(null);
  const mobileActiveRoleRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();

      const roles = Array.from(
        listRef.current?.querySelectorAll<HTMLElement>(".experience-role") ?? [],
      );

      roles.forEach((role, index) => {
        ScrollTrigger.create({
          trigger: role,
          start: "top 52%",
          end: "bottom 48%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
          onLeaveBack: () => setActiveIndex(Math.max(0, index - 1)),
        });
      });

      if (reduceMotion) {
        gsap.set(progressRef.current, { scaleY: 1 });
        gsap.set(mobileProgressRef.current, { scaleX: 1 });
        return;
      }

      const media = gsap.matchMedia();

      revealOnScroll(".experience-intro", sectionRef.current, {
        y: 42,
        stagger: 0.1,
        start: "top 70%",
      });

      roles.forEach((role) => {
        const content = role.querySelector(".experience-role-content");
        const year = role.querySelector(".experience-year");
        const highlights = role.querySelectorAll(".experience-highlight");

        revealOnScroll(content, role, { y: 48, start: "top 76%" });

        revealOnScroll(highlights, highlights[0] ?? role, {
          x: 30,
          stagger: 0.08,
          duration: 0.62,
          start: "top 82%",
        });

        media.add("(min-width: 1024px)", () => {
          revealOnScroll(year, role, {
            xPercent: 24,
            duration: 1,
            start: "top 80%",
          });
        });

        media.add("(max-width: 1023px)", () => {
          gsap.fromTo(
            year,
            { xPercent: 38, rotation: -5, autoAlpha: 0 },
            {
              xPercent: -12,
              rotation: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: role,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
              },
            },
          );
        });
      });

      media.add("(hover: hover) and (pointer: fine)", () => {
        const cleanups = roles.map((role) => {
          const content = role.querySelector<HTMLElement>(
            ".experience-role-content",
          );
          const year = role.querySelector<HTMLElement>(".experience-year");

          if (!content || !year) return () => undefined;

          return attachPointerParallax(role, [
            { el: content, strengthX: 0.035, strengthY: 0.025 },
            { el: year, strengthX: -0.05, strengthY: -0.035, duration: 0.75 },
          ]);
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      scrubProgress(progressRef.current, listRef.current, { axis: "y" });
      scrubProgress(mobileProgressRef.current, listRef.current, { axis: "x" });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const activeDisplays = [
        ...(activeRoleRef.current?.children ?? []),
        ...(mobileActiveRoleRef.current?.children ?? []),
      ];

      gsap.fromTo(
        activeDisplays,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.035,
          duration: 0.48,
          ease: "power3.out",
        },
      );
    },
    { scope: sectionRef, dependencies: [activeIndex] },
  );

  return {
    sectionRef,
    listRef,
    progressRef,
    activeRoleRef,
    mobileActiveRoleRef,
    mobileProgressRef,
    activeIndex,
  };
};
