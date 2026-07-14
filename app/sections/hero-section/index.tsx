"use client";

import { Marquee } from "@/app/components/marquee";
import { heroImages } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useReducedMotion } from "@/app/hook/use-reduced-motion";
import { useRef } from "react";
import {
  ParallaxContainer,
  ParallaxGalleryDelegate,
  ParallaxImageComponent,
  useParallaxEngine,
} from "../../components/parallax-gallery";
import { useHeroAnimation } from "./use-hero-animation";

export const HeroIndex = () => {
  const { isMobile } = useDetectScreen();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { containerRef, delegate } = useParallaxEngine(
    (container: HTMLElement) => new ParallaxGalleryDelegate(container),
    { autoPan: isMobile && !reducedMotion, disabled: reducedMotion },
  );

  useHeroAnimation({ sectionRef, galleryRef: containerRef, contentRef });

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative min-h-dvh overflow-hidden bg-background"
    >
      <ParallaxContainer reduceMotion={reducedMotion}>
        <div
          ref={containerRef}
          aria-hidden="true"
          className="absolute inset-0 grid h-full w-full grid-flow-dense auto-rows-[5px] grid-cols-2 gap-2 overflow-hidden opacity-55 md:grid-cols-4"
        >
          {heroImages.map((img, i) => (
            <ParallaxImageComponent
              key={`${img.src}-${i}`}
              registerLayer={delegate?.registerLayer}
              width={img.width}
              height={img.height}
              src={img.src}
              alt=""
              index={i}
            />
          ))}
        </div>
      </ParallaxContainer>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,25,28,0.08)_0%,rgba(23,25,28,0.16)_35%,var(--background)_100%)]" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          ref={contentRef}
          className="relative z-10 mx-auto flex min-h-dvh max-w-[96rem] flex-col justify-between px-5 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32"
        >
          <div className="hero-reveal flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70">
            <span>Software engineer</span>
            <span className="hidden sm:inline">Bangkok · Thailand</span>
          </div>

          <div className="hero-reveal ml-auto max-w-2xl text-right">
            <p className="ml-auto max-w-xl text-sm leading-relaxed text-primary/70 sm:text-base">
              Frontend engineering, systems thinking, and motion—composed into
              digital experiences that remain clear under complexity.
            </p>
            <p className="mt-5 font-heading text-2xl italic sm:text-4xl">
              Complex systems. Clear experiences.
            </p>
          </div>

          <div className="hero-reveal flex items-end justify-between gap-6">
            <div className="group relative inline-flex items-center font-mono text-xl uppercase tracking-[0.3em] [--animated-base-color:var(--primary)] [--hover-text-color:var(--animated-accent)]">
              <span className="pointer-events-none ml-3 inline-block transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </div>
            <p className="max-w-48 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.24em] text-primary/55 sm:max-w-72">
              Frontend · Systems · Motion
            </p>
          </div>
        </div>
      </div>

      <div className="hero-name-marquee pointer-events-none absolute inset-x-0 bottom-[clamp(14rem,20vw,14rem)] z-20 overflow-hidden">
        <h1 className="sr-only">Worrachit Pongkatekarm</h1>
        <Marquee speed={0.72}>
          {[0, 1, 2].map((iteration) => (
            <span
              key={iteration}
              aria-hidden="true"
              className="mr-12 whitespace-nowrap font-heading text-[clamp(7rem,17vw,16rem)] leading-[0.72] tracking-[-0.055em] text-primary sm:mr-20"
            >
              Worrachit <em className="font-normal">Pongkatekarm</em>
              <span className="ml-12 text-primary/25 sm:ml-20">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
