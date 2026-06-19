import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useHeroAnimation = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLSpanElement>(null);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const labels = Array.from(
        overlayRef.current?.children ?? [],
      ) as HTMLElement[];
      if (!labels.length) return;

      labels.forEach((el) => {
        const rot = parseFloat(el.dataset.rotation ?? "0");
        gsap.set(el, { rotation: rot, y: 24, opacity: 0 });
      });

      gsap.to(labels, {
        y: 0,
        opacity: (_, target) =>
          parseFloat((target as HTMLElement).dataset.targetOpacity ?? "0.5"),
        duration: 1.1,
        ease: "power3.out",
        stagger: { amount: 0.9, from: "random" },
        delay: 0.3,
      });

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
