"use client";

import { Marquee } from "@/app/components/marquee";
import { about, marqueeWords } from "@/app/constants";
import Image from "next/image";
import { useAboutAnimation } from "./use-about-animation";

export const About = () => {
  const {
    sectionRef,
    imgWrapRef,
    headingRef,
    dividerRef,
    line1aRef,
    line1bRef,
    line2aRef,
    line2bRef,
    bioLabelRef,
    sectionNumRef,
    portraitRef,
  } = useAboutAnimation();

  return (
    <div>
      <section ref={sectionRef} className="h-screen relative">
        <div className="h-full grid grid-rows-[40%_60%] lg:grid-rows-none grid-cols-1 lg:grid-cols-[44fr_56fr]">
          <div className="relative flex flex-col sm:justify-center px-6 md:px-14 lg:px-16 pt-10 pb-4 lg:pt-12 lg:pb-10 overflow-hidden order-2 lg:order-1">
            <span
              ref={sectionNumRef}
              className="block text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8 select-none"
            >
              {about.sectionLabel}
            </span>

            <h2
              ref={headingRef}
              className="text-primary overflow-hidden"
              style={{
                fontSize: "clamp(3rem, 7vw, 8rem)",
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
              }}
            >
              {about.heading}
            </h2>

            <div
              ref={dividerRef}
              className="h-px bg-foreground my-8"
              style={{ transformOrigin: "left center" }}
            />

            <div
              ref={bioLabelRef}
              className="flex items-center gap-3 mb-5 text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
            >
              <span className="inline-block w-6 h-px bg-muted-foreground" />
              <span>{about.bioLabel}</span>
            </div>

            <div
              className="mb-7 overflow-hidden"
              style={{
                fontSize: "clamp(1rem, 1.15vw, 1.35rem)",
                lineHeight: 1.55,
              }}
            >
              <p ref={line1aRef} className="text-foreground/90 font-display">
                {about.paragraphs[0][0]}
              </p>
              <p ref={line1bRef} className="text-foreground/90 font-display">
                {about.paragraphs[0][1]}
              </p>
            </div>

            <div
              className="mb-10 overflow-hidden"
              style={{
                fontSize: "clamp(1rem, 1.15vw, 1.35rem)",
                lineHeight: 1.55,
              }}
            >
              <p ref={line2aRef} className="text-foreground/90 font-display">
                {about.paragraphs[1][0]}
              </p>
              <p ref={line2bRef} className="text-foreground/90 font-display">
                {about.paragraphs[1][1]}
              </p>
            </div>
          </div>

          <div
            className="relative will-change-transform h-full order-1 lg:order-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div ref={imgWrapRef} className="absolute inset-0 overflow-hidden">
              <Image
                ref={portraitRef}
                fill
                priority
                sizes="56vw"
                src={about.portrait.src}
                alt={about.portrait.alt}
                className="object-cover object-center grayscale-50"
                style={{
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-foreground/15 py-6 overflow-hidden">
        <Marquee speed={0.6}>
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map(
            (word, i) => (
              <span
                key={`${word}-${i}`}
                className={`font-heading whitespace-nowrap mr-10 md:mr-16 text-[clamp(2rem,6vw,5rem)] leading-none ${
                  word === "✦"
                    ? "text-muted-foreground"
                    : "text-foreground/15 hover:text-foreground transition-colors duration-500"
                }`}
              >
                {word}
              </span>
            ),
          )}
        </Marquee>
      </div>
    </div>
  );
};
