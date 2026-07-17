import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { revealOnScroll } from "@/app/lib/scroll-animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useAboutAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const mobileJourneyRef = useRef<HTMLDivElement>(null);
  const mobilePortraitRef = useRef<HTMLElement>(null);
  const mobileProgressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduceMotion = prefersReducedMotion();
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        if (reduceMotion) {
          gsap.set(portraitRef.current, {
            xPercent: -112,
            yPercent: -50,
            scale: 0.82,
            rotation: -3,
          });
          gsap.set(storyRef.current, { autoAlpha: 1 });
          gsap.set([".about-title-back", ".about-title-front"], {
            autoAlpha: 0.06,
          });
          gsap.set(progressRef.current, { scaleX: 1 });
          return;
        }

        gsap.set(portraitRef.current, {
          xPercent: -50,
          yPercent: -50,
          rotation: -5,
          scale: 0.78,
          clipPath: "polygon(10% 0%, 100% 7%, 91% 100%, 0% 92%)",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });

        timeline
          .from(".about-meta", {
            y: 18,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.12,
          })
          .from(
            ".about-title-back",
            { xPercent: -24, autoAlpha: 0, duration: 0.22 },
            0,
          )
          .from(
            ".about-title-front",
            { xPercent: 24, autoAlpha: 0, duration: 0.22 },
            0,
          )
          .fromTo(
            portraitRef.current,
            {
              xPercent: -50,
              yPercent: -50,
              rotation: -5,
              scale: 0.78,
            },
            {
              rotation: 1.5,
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
            },
            0.04,
          )
          .from(
            ".about-side-label",
            { y: 28, autoAlpha: 0, duration: 0.12 },
            0.12,
          )
          .to(
            ".about-title-back",
            { xPercent: 34, autoAlpha: 0, duration: 0.24 },
            0.38,
          )
          .to(
            ".about-title-front",
            { xPercent: -28, autoAlpha: 0, duration: 0.24 },
            0.38,
          )
          .to(
            portraitRef.current,
            {
              xPercent: -116,
              scale: 0.84,
              rotation: -3,
              clipPath: "polygon(4% 0%, 96% 0%, 100% 94%, 8% 100%)",
              duration: 0.3,
              ease: "power3.inOut",
            },
            0.38,
          )
          .to(
            storyRef.current,
            { autoAlpha: 1, duration: 0.18, ease: "power2.out" },
            0.55,
          )
          .from(
            ".about-story-item",
            {
              y: 36,
              autoAlpha: 0,
              stagger: 0.06,
              duration: 0.18,
              ease: "power3.out",
            },
            0.55,
          )
          .from(
            ".about-principle",
            {
              x: 26,
              autoAlpha: 0,
              stagger: 0.055,
              duration: 0.16,
              ease: "power3.out",
            },
            0.68,
          )
          .to(
            progressRef.current,
            { scaleX: 1, duration: 0.9, ease: "none" },
            0,
          )
          .to(
            ".about-portrait-image",
            { scale: 1.09, yPercent: 3, duration: 1, ease: "none" },
            0,
          );
      });

      media.add("(max-width: 1023px)", () => {
        if (reduceMotion) {
          gsap.set(mobileProgressRef.current, { scaleX: 1 });
          return;
        }

        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: mobileJourneyRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
          },
        });

        mobileTimeline
          .from(
            ".about-mobile-meta",
            { y: 14, autoAlpha: 0, duration: 0.12 },
            0,
          )
          .from(
            ".about-mobile-title-back",
            { xPercent: -34, autoAlpha: 0, duration: 0.25 },
            0,
          )
          .from(
            ".about-mobile-title-front",
            { xPercent: 42, autoAlpha: 0, duration: 0.25 },
            0.04,
          )
          .fromTo(
            mobilePortraitRef.current,
            {
              yPercent: 14,
              rotation: -5,
              scale: 0.82,
              clipPath: "polygon(18% 0%, 100% 8%, 88% 100%, 0% 89%)",
            },
            {
              yPercent: 0,
              rotation: 2,
              scale: 1,
              clipPath: "polygon(8% 0%, 100% 5%, 93% 100%, 0% 94%)",
              duration: 0.42,
              ease: "power2.out",
            },
            0,
          )
          .from(
            ".about-mobile-axis",
            { y: 24, autoAlpha: 0, duration: 0.18 },
            0.15,
          )
          .to(
            ".about-mobile-title-back",
            { xPercent: 22, yPercent: -18, autoAlpha: 0.14, duration: 0.48 },
            0.44,
          )
          .to(
            ".about-mobile-title-front",
            { xPercent: -28, yPercent: 18, autoAlpha: 0.16, duration: 0.48 },
            0.44,
          )
          .to(
            mobilePortraitRef.current,
            {
              yPercent: -7,
              rotation: -1.5,
              scale: 0.91,
              clipPath: "polygon(2% 4%, 94% 0%, 100% 92%, 7% 100%)",
              duration: 0.48,
              ease: "power3.inOut",
            },
            0.44,
          )
          .to(
            ".about-mobile-portrait-image",
            { scale: 1.12, yPercent: 4, duration: 1, ease: "none" },
            0,
          )
          .to(
            mobileProgressRef.current,
            { scaleX: 1, duration: 1, ease: "none" },
            0,
          )
          .to(
            ".about-mobile-scroll",
            { autoAlpha: 0.45, duration: 0.2 },
            0.8,
          );

        revealOnScroll(".about-mobile-story-line", sectionRef.current, {
          y: 44,
          stagger: 0.12,
          duration: 0.85,
          start: "top 78%",
        });

        const principles = gsap.utils.toArray<HTMLElement>(
          ".about-mobile-principle",
        );

        principles.forEach((principle, index) => {
          const number = principle.querySelector(
            ".about-mobile-principle-number",
          );

          gsap.from(principle, {
            xPercent: index % 2 === 0 ? 12 : -12,
            autoAlpha: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: principle,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.fromTo(
            number,
            { yPercent: -90 },
            {
              yPercent: 90,
              ease: "none",
              scrollTrigger: {
                trigger: principle,
                start: "top bottom",
                end: "bottom top",
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

  return {
    sectionRef,
    stageRef,
    portraitRef,
    storyRef,
    progressRef,
    mobileJourneyRef,
    mobilePortraitRef,
    mobileProgressRef,
  };
};
