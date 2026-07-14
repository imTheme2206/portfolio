import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { attachPointerParallax } from "@/app/lib/pointer-parallax";
import { revealOnScroll } from "@/app/lib/scroll-animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const entranceDirections = [
  { xPercent: 105, yPercent: 0, rotation: 2.5 },
  { xPercent: -105, yPercent: 0, rotation: -2.5 },
  { xPercent: 0, yPercent: 105, rotation: 1.5 },
  { xPercent: 0, yPercent: -105, rotation: -1.5 },
] as const;

export const useProjectsAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const media = gsap.matchMedia();

      if (!reduceMotion) {
        revealOnScroll(".project-intro-reveal", sectionRef.current, {
          y: 42,
          stagger: 0.08,
          start: "top 76%",
        });
      }

      media.add("(min-width: 1024px)", () => {
        if (reduceMotion) return;

        const cleanups: Array<() => void> = [];
        const panels = gsap.utils.toArray<HTMLElement>(
          ".project-panel-shell",
          panelsRef.current,
        );

        panels.forEach((shell, index) => {
          const card = shell.querySelector<HTMLElement>(".project-panel");
          const image = shell.querySelector<HTMLElement>(
            ".project-panel-image",
          );
          const mediaFrame = shell.querySelector<HTMLElement>(
            ".project-panel-media",
          );
          const counter = shell.querySelector<HTMLElement>(
            ".project-panel-counter",
          );
          const fragment = shell.querySelector<HTMLElement>(
            ".project-panel-fragment",
          );
          const title = shell.querySelector<HTMLElement>(
            ".project-panel-ghost-title",
          );
          const progress = shell.querySelector<HTMLElement>(
            ".project-panel-progress",
          );
          const direction =
            entranceDirections[index % entranceDirections.length];

          if (!card || !image || !mediaFrame || !counter) return;

          gsap.fromTo(
            card,
            {
              xPercent: direction.xPercent,
              yPercent: direction.yPercent,
              rotation: direction.rotation,
            },
            {
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 94%",
                end: "top 28%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: shell,
                start: "top 72%",
                end: "bottom 32%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              image,
              { scale: 1.08, yPercent: -2 },
              { scale: 1, yPercent: 2, ease: "none" },
              0,
            )
            .fromTo(
              counter,
              { yPercent: 14, rotation: 3 },
              { yPercent: -14, rotation: -2, ease: "none" },
              0,
            )
            .fromTo(
              fragment,
              {
                xPercent: direction.xPercent ? direction.xPercent * 0.18 : 24,
                yPercent: direction.yPercent ? direction.yPercent * 0.12 : -18,
                rotation: direction.rotation * 4,
              },
              {
                xPercent: direction.xPercent ? direction.xPercent * -0.08 : -18,
                yPercent: direction.yPercent ? direction.yPercent * -0.06 : 12,
                rotation: direction.rotation * -2,
                ease: "none",
              },
              0,
            )
            .fromTo(
              title,
              { xPercent: index % 2 === 0 ? 6 : -6 },
              { xPercent: index % 2 === 0 ? -6 : 6, ease: "none" },
              0,
            )
            .fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

          const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          );
          if (!finePointer.matches) return;

          cleanups.push(
            attachPointerParallax(card, [
              { el: mediaFrame, strengthX: 0.012, strengthY: 0.009 },
            ]),
          );
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      media.add("(max-width: 1023px)", () => {
        if (reduceMotion) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          ".project-panel",
          panelsRef.current,
        );
        panels.forEach((panel, index) => {
          const image = panel.querySelector(".project-panel-image");
          const title = panel.querySelector(".project-panel-ghost-title");
          const direction =
            entranceDirections[index % entranceDirections.length];

          gsap.from(panel, {
            xPercent: direction.xPercent * 0.18,
            yPercent: direction.yPercent * 0.12,
            rotation: direction.rotation,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel.parentElement,
              start: "top 78%",
            },
          });
          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
          gsap.fromTo(
            title,
            { xPercent: 10 },
            {
              xPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.8,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return { sectionRef, panelsRef };
};
