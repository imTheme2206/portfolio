"use client";

import { Marquee } from "@/app/components/marquee";
import { floatingLabels, heroImages, heroName } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import {
  ParallaxContainer,
  ParallaxGalleryDelegate,
  ParallaxImageComponent,
  useParallaxEngine,
} from "../../components/parallax-gallery";
import { useHeroAnimation } from "./use-hero-animation";

export const HeroIndex = () => {
  const { isMobile } = useDetectScreen();
  const { containerRef, delegate } = useParallaxEngine(
    (container: HTMLElement) => new ParallaxGalleryDelegate(container),
    { autoPan: isMobile || true },
  );
  const { overlayRef, scrollIndicatorRef } = useHeroAnimation();

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
            {[...heroName, "—", ...heroName, "—"].map((text, index) => (
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
              ref={isScroll ? scrollIndicatorRef : undefined}
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
