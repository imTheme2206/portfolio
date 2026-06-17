"use client";

import { Marquee } from "@/app/components/marquee";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import {
  ParallaxContainer,
  ParallaxGalleryDelegate,
  ParallaxImageComponent,
  useParallaxEngine,
} from "../../components/parallax-gallery";
import { heroImages } from "./constants";

type FloatLabel = {
  text: string;
  className: string;
  rotation: number;
  size?: "sm" | "md";
};

const floatingLabels: FloatLabel[] = [
  {
    text: "✦ Software Engineer",
    className: "top-[6%] left-[5%] opacity-95",
    rotation: -2,
  },
  {
    text: "Coffee Enjoyer",
    className: "top-[5%] right-[10%] opacity-90",
    rotation: 3,
  },
  {
    text: "(Frontend ／ Motion)",
    className: "top-[20%] left-[8%] opacity-85",
    rotation: 0,
    size: "sm",
  },
  {
    text: "Bangkok — TH",
    className: "top-[30%] right-[5%] opacity-90 origin-right",
    rotation: 90,
  },
  {
    text: "Quietly Crafting",
    className: "top-[33%] left-[4%] opacity-85",
    rotation: -1,
  },
  // {
  //   text: "Available — 2026",
  //   className: "top-[36%] right-[8%] opacity-90",
  //   rotation: 2,
  // },
  {
    text: "Design × Code",
    className: "top-[68%] left-[8%] opacity-80",
    rotation: 1,
  },
  // {
  //   text: "Late Night Builds",
  //   className: "top-[52%] right-[14%] opacity-80",
  //   rotation: -2,
  //   size: "sm",
  // },
  {
    text: "Scroll ↓",
    className: "bottom-[3%] right-[4%] opacity-85",
    rotation: 0,
    size: "sm",
  },
];

export const HeroIndex = () => {
  const { isMobile } = useDetectScreen();
  const enableAutoPanOnDesktop = true;
  const { containerRef, delegate } = useParallaxEngine(
    (container: HTMLElement) => new ParallaxGalleryDelegate(container),
    { autoPan: isMobile || enableAutoPanOnDesktop },
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const labels = gsap.utils.toArray<HTMLElement>(".hero-float");
      if (!labels.length) return;

      labels.forEach((el) => {
        const rot = parseFloat(el.dataset.rotation ?? "0");
        gsap.set(el, { rotation: rot, y: 24, opacity: 0 });
      });

      gsap.to(labels, {
        y: 0,
        opacity: (i, target) =>
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

      const scrollEl =
        overlayRef.current?.querySelector<HTMLElement>(".hero-float-scroll");
      if (scrollEl) {
        tweens.push(
          gsap.to(scrollEl, {
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
          if (visible) {
            t.resume();
          } else {
            t.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="hero-section"
      className="mx-auto relative w-screen h-screen overflow-hidden"
    >
      <ParallaxContainer>
        <div
          ref={containerRef}
          className="absolute inset-0 h-full w-full overflow-hidden grid grid-cols-2 md:grid-cols-4 auto-rows-[4px] gap-y-2 gap-x-2 grid-flow-dense"
        >
          {heroImages.map((img, i) => (
            <ParallaxImageComponent
              key={`${img.src}-${i}`}
              registerLayer={delegate?.registerLayer}
              width={img.width}
              height={img.height}
              src={img.src}
              alt={img.alt}
              index={i}
            />
          ))}
        </div>
      </ParallaxContainer>
      <div className="absolute inset-0 -bottom-[70%] z-999 flex justify-center items-center px-20 font-bold pointer-events-none">
        <div className="justify-center">
          <Marquee>
            {[
              "Worrachit",
              "Pongkatekarm",
              "—",
              "Worrachit",
              "Pongkatekarm",
              "—",
            ].map((text, index) => (
              <h1
                key={index}
                className={`whitespace-nowrap leading-none text-secondary dark:text-primary flex text-[120px] md:text-[200px] mr-24`}
              >
                {text}
              </h1>
            ))}
          </Marquee>
        </div>
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 z-999 pointer-events-none font-heading font-bold text-foreground"
      >
        {floatingLabels.map((label, i) => {
          const opacityMatch = label.className.match(/opacity-(\d+)/);
          const targetOpacity = opacityMatch
            ? (parseInt(opacityMatch[1], 10) / 100).toString()
            : "0.5";
          const sizeClass =
            label.size === "sm"
              ? "text-[10px] md:text-xs tracking-[0.4em]"
              : "text-xs md:text-sm tracking-[0.3em]";
          const isScroll = label.text === "Scroll ↓";
          return (
            <span
              key={i}
              data-rotation={label.rotation}
              data-target-opacity={targetOpacity}
              className={`hero-float hero-float-halo ${
                isScroll ? "hero-float-scroll" : ""
              } absolute italic uppercase ${sizeClass} ${label.className}`}
            >
              {label.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
