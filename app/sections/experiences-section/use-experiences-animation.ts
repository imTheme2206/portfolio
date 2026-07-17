import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { attachPointerParallax } from "@/app/lib/pointer-parallax";
import { scrubProgress } from "@/app/lib/scroll-animations";
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
        gsap.set(".experience-highlight-trace", { scaleX: 1 });
        return;
      }

      const media = gsap.matchMedia();

      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".experience-header",
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      });

      introTimeline
        .from(".experience-intro", {
          y: 34,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.09,
        })
        .from(
          ".experience-kicker",
          { x: -28, autoAlpha: 0, duration: 0.55 },
          "-=0.42",
        )
        .from(
          ".experience-heading-line:first-child",
          { xPercent: -18, autoAlpha: 0, duration: 1 },
          "-=0.38",
        )
        .from(
          ".experience-heading-line:last-child",
          { xPercent: 18, autoAlpha: 0, duration: 1 },
          "<",
        );

      gsap.fromTo(
        ".experience-header-index",
        { yPercent: -12, rotation: -4 },
        {
          yPercent: 24,
          rotation: 2,
          ease: "none",
          scrollTrigger: {
            trigger: ".experience-header",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );

      roles.forEach((role, index) => {
        const rule = role.querySelector(".experience-chapter-rule");
        const meta = role.querySelector(".experience-role-meta");
        const title = role.querySelector(".experience-role-title");
        const details = role.querySelectorAll(".experience-role-detail");
        const year = role.querySelector(".experience-year");
        const chapterIndex = role.querySelector(".experience-chapter-index");
        const highlights = role.querySelectorAll(".experience-highlight");
        const traces = role.querySelectorAll(".experience-highlight-trace");

        const chapterTimeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: role,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        chapterTimeline
          .from(rule, { scaleX: 0, duration: 0.9, ease: "power2.inOut" })
          .from(
            meta,
            { x: index % 2 === 0 ? -26 : 26, autoAlpha: 0, duration: 0.55 },
            "-=0.56",
          )
          .from(
            title,
            { yPercent: 110, rotation: 2, duration: 0.95 },
            "-=0.32",
          )
          .from(
            details,
            { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.68 },
            "-=0.52",
          )
          .from(
            highlights,
            {
              y: 26,
              autoAlpha: 0,
              stagger: 0.1,
              duration: 0.62,
            },
            "-=0.35",
          )
          .to(
            traces,
            {
              scaleX: 1,
              stagger: 0.08,
              duration: 0.65,
              ease: "power2.inOut",
            },
            "-=0.72",
          );

        gsap.fromTo(
          year,
          { xPercent: 24, yPercent: -12, rotation: -5 },
          {
            xPercent: -12,
            yPercent: 16,
            rotation: 1,
            ease: "none",
            scrollTrigger: {
              trigger: role,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          chapterIndex,
          { yPercent: 38 },
          {
            yPercent: -28,
            ease: "none",
            scrollTrigger: {
              trigger: role,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      media.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
        () => {
          const cleanups = roles.map((role) => {
            const content = role.querySelector<HTMLElement>(
              ".experience-role-content",
            );
            const year = role.querySelector<HTMLElement>(".experience-year");

            if (!content || !year) return () => undefined;

            return attachPointerParallax(role, [
              { el: content, strengthX: 0.035, strengthY: 0.025 },
              {
                el: year,
                strengthX: -0.05,
                strengthY: -0.035,
                duration: 0.75,
              },
            ]);
          });

          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );

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
