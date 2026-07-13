import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

export const useHeroAnimation = ({
  galleryRef,
  marqueeRef,
}: {
  galleryRef: RefObject<HTMLDivElement | null>;
  marqueeRef: RefObject<HTMLDivElement | null>;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLSpanElement>(null);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const section = document.getElementById("hero-section");
      const tiles = Array.from(galleryRef.current?.children ?? []);
      const labels = Array.from(
        overlayRef.current?.children ?? [],
      ) as HTMLElement[];
      const marquee = marqueeRef.current;
      if (!section || !labels.length) return;

      if (tiles.length) {
        gsap.set(tiles, {
          autoAlpha: 0,
          y: () => gsap.utils.random(22, 80, 1),
          scale: 0.94,
          clipPath: "inset(18% 0% 18% 0%)",
        });
      }

      if (marquee) {
        gsap.set(marquee, { autoAlpha: 0, yPercent: 90 });
      }

      labels.forEach((el) => {
        const rot = parseFloat(el.dataset.rotation ?? "0");
        gsap.set(el, { rotation: rot, y: 24, opacity: 0 });
      });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.to(tiles, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        stagger: { amount: 0.65, from: "random" },
      });

      intro.to(
        labels,
        {
          y: 0,
          opacity: (_, target) =>
            parseFloat((target as HTMLElement).dataset.targetOpacity ?? "0.5"),
          duration: 0.9,
          stagger: { amount: 0.55, from: "random" },
        },
        "-=0.45",
      );

      intro.to(
        marquee,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.05,
          ease: "expo.out",
        },
        "-=0.35",
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        })
        .to(
          galleryRef.current,
          {
            scale: 0.96,
            ease: "none",
          },
          0,
        )
        .to(
          marquee,
          {
            yPercent: -34,
            autoAlpha: 0.38,
            ease: "none",
          },
          0,
        )
        .to(
          overlayRef.current,
          {
            yPercent: -8,
            autoAlpha: 0.25,
            ease: "none",
          },
          0,
        );

      const tweens: gsap.core.Tween[] = [];

      labels.forEach((el, i) => {
        const rot = parseFloat(el.dataset.rotation ?? "0");
        const yAmp = gsap.utils.random(6, 14, 1);
        const xAmp = gsap.utils.random(4, 10, 1);
        const rotAmp = gsap.utils.random(0.6, 1.8, 0.1);
        const dur = gsap.utils.random(3.4, 5.6, 0.1);

        tweens.push(
          gsap.to(el, {
            y: `+=${yAmp}`,
            x: `+=${xAmp}`,
            rotation: rot + rotAmp,
            duration: dur,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.2 + (i % 5) * 0.18,
          }),
        );

        tweens.push(
          gsap.to(el, {
            opacity: `+=${gsap.utils.random(-0.1, 0.1, 0.01)}`,
            duration: gsap.utils.random(2.2, 3.8, 0.1),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.4 + i * 0.07,
          }),
        );
      });

      if (scrollIndicatorRef.current) {
        tweens.push(
          gsap.to(scrollIndicatorRef.current, {
            y: 6,
            duration: 1.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.5,
          }),
        );
      }

      floatTweensRef.current = tweens;
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    const section = document.getElementById("hero-section");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        floatTweensRef.current.forEach((t) => {
          if (visible) t.resume();
          else t.pause();
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return { overlayRef, scrollIndicatorRef };
};
