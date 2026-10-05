import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useExperiencesAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const overtureRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = overtureRef.current;
          if (!stage) return;

          const line = stage.querySelector(".experience-overture-line");
          const heading = stage.querySelector(".experience-overture-heading");
          const scenes = Array.from(
            stage.querySelectorAll<HTMLElement>(".experience-scene"),
          );

          gsap.set(scenes, {
            autoAlpha: 0,
            clipPath: "inset(0 100% 0 0)",
          });
          scenes.forEach((scene) => {
            gsap.set(scene.querySelector(".experience-scene-detail"), {
              autoAlpha: 0,
              yPercent: 100,
              clipPath: "polygon(0 7%, 100% 0, 100% 100%, 0 100%)",
            });
          });

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => "+=" + Math.round(window.innerHeight * 4.8),
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set(progressRef.current, { scaleX: self.progress });
              },
            },
          });

          timeline
            .to(line, { scaleX: 1, duration: 0.55, ease: "power2.inOut" })
            .to(heading, { yPercent: -16, autoAlpha: 0, duration: 0.45 }, ">-0.1");

          scenes.forEach((scene) => {
            const title = scene.querySelector(".experience-scene-title");
            const company = scene.querySelector(".experience-scene-company");
            const posterContent = scene.querySelector(".experience-scene-content");
            const detail = scene.querySelector(".experience-scene-detail");

            timeline
              .fromTo(
                scene,
                { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" },
                {
                  autoAlpha: 1,
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.65,
                  ease: "power3.inOut",
                },
              )
              .fromTo(
                title,
                { yPercent: 110, rotation: 2 },
                { yPercent: 0, rotation: 0, duration: 0.6 },
                "<0.12",
              )
              .fromTo(
                company,
                { y: 25, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.5 },
                "<0.08",
              )
              .to(scene, { opacity: 1, duration: 0.12 })
              .to(posterContent, {
                y: () => -Math.min(window.innerHeight * 0.24, 200),
                scale: 0.92,
                duration: 0.55,
                ease: "power2.inOut",
              })
              // A full sheet rises after the poster clears. Its angled top
              // edge is the same motif used at the section boundaries.
              .fromTo(
                detail,
                {
                  autoAlpha: 1,
                  yPercent: 100,
                  clipPath: "polygon(0 7%, 100% 0, 100% 100%, 0 100%)",
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  duration: 0.55,
                  ease: "power3.inOut",
                },
                "<",
              )
              .to(detail, { opacity: 1, duration: 1.2 });
          });
        },
      );

      media.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference), (max-height: 699px) and (prefers-reduced-motion: no-preference)",
        () => {
          const scenes = gsap.utils.toArray<HTMLElement>(
            ".experience-mobile-scene",
          );

          scenes.forEach((scene) => {
            const title = scene.querySelector(".experience-mobile-title");
            const company = scene.querySelector(".experience-mobile-company");
            const details = scene.querySelectorAll(".experience-mobile-detail");

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: scene,
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              })
              .from(title, {
                yPercent: 110,
                duration: 0.8,
                ease: "power3.out",
              })
              .from(
                company,
                { y: 24, autoAlpha: 0, duration: 0.55 },
                "-=0.4",
              );

            gsap.from(details, {
              y: 28,
              autoAlpha: 0,
              stagger: 0.1,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: details[0],
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
      );

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const exit = exitRef.current;
        if (!exit) return;

        const accent = exit.querySelector(".experience-exit-accent");
        const surface = exit.querySelector(".experience-exit-surface");

        gsap.fromTo(
          [accent, surface],
          { yPercent: 85 },
          {
            yPercent: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: exit,
              start: "top 95%",
              end: "bottom 70%",
              scrub: 0.7,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return { sectionRef, overtureRef, progressRef, exitRef };
};
