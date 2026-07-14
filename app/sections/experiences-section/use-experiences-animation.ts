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
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

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

      gsap.from(".experience-intro", {
        y: 42,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      roles.forEach((role) => {
        const content = role.querySelector(".experience-role-content");
        const year = role.querySelector(".experience-year");
        const highlights = role.querySelectorAll(".experience-highlight");

        gsap.from(content, {
          y: 48,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: role,
            start: "top 76%",
          },
        });

        gsap.from(highlights, {
          x: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: highlights[0] ?? role,
            start: "top 82%",
          },
        });

        media.add("(min-width: 1024px)", () => {
          gsap.from(year, {
            xPercent: 24,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: role,
              start: "top 80%",
            },
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

          const contentX = gsap.quickTo(content, "x", {
            duration: 0.55,
            ease: "power3.out",
          });
          const contentY = gsap.quickTo(content, "y", {
            duration: 0.55,
            ease: "power3.out",
          });
          const yearX = gsap.quickTo(year, "x", {
            duration: 0.75,
            ease: "power3.out",
          });
          const yearY = gsap.quickTo(year, "y", {
            duration: 0.75,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = role.getBoundingClientRect();
            const x = event.clientX - (bounds.left + bounds.width / 2);
            const y = event.clientY - (bounds.top + bounds.height / 2);

            contentX(x * 0.035);
            contentY(y * 0.025);
            yearX(x * -0.05);
            yearY(y * -0.035);
          };

          const resetPosition = () => {
            contentX(0);
            contentY(0);
            yearX(0);
            yearY(0);
          };

          role.addEventListener("pointermove", handlePointerMove);
          role.addEventListener("pointerleave", resetPosition);

          return () => {
            role.removeEventListener("pointermove", handlePointerMove);
            role.removeEventListener("pointerleave", resetPosition);
          };
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 52%",
          end: "bottom 48%",
          scrub: true,
        },
      });

      gsap.to(mobileProgressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 52%",
          end: "bottom 48%",
          scrub: true,
        },
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
