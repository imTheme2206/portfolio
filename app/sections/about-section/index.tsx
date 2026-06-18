"use client";

import { Marquee } from "@/app/components/marquee";
import { about, marqueeWords } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText as GSAPSplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const line1aRef = useRef<HTMLParagraphElement>(null);
  const line1bRef = useRef<HTMLParagraphElement>(null);
  const line2aRef = useRef<HTMLParagraphElement>(null);
  const line2bRef = useRef<HTMLParagraphElement>(null);
  const bioLabelRef = useRef<HTMLDivElement>(null);
  const sectionNumRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const split = headingRef.current
        ? new GSAPSplitText(headingRef.current, {
            type: "lines,chars",
            linesClass: "overflow-hidden",
          })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // t 0 – 1.0 : image clip reveal
      tl.fromTo(
        imgWrapRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        0,
      );

      // t 0 – 0.4 : section number
      tl.from(sectionNumRef.current, { opacity: 0, y: 16, duration: 0.4 }, 0);

      // t 0 – 0.8 : heading chars assemble
      if (split?.chars) {
        tl.from(
          split.chars,
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.035,
            duration: 0.8,
          },
          0,
        );
      }

      // t 0.7 : divider scaleX
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: "expo.out",
          transformOrigin: "left center",
        },
        0.7,
      );

      // t 0.85 : bio label
      tl.from(bioLabelRef.current, { opacity: 0, y: 18, duration: 0.3 }, 0.85);

      // t 0.92 / 1.02 : paragraph 1, lines a & b
      tl.from(line1aRef.current, { y: 48, opacity: 0, duration: 0.4 }, 0.92);
      tl.from(line1bRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.02);

      // t 1.2 / 1.3 : paragraph 2, lines a & b
      tl.from(line2aRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.2);
      tl.from(line2bRef.current, { y: 48, opacity: 0, duration: 0.4 }, 1.3);
    },
    { scope: sectionRef },
  );

  return (
    <div>
      <section ref={sectionRef} className="h-screen relative">
        <div className="h-full grid grid-rows-[45%_55%] lg:grid-rows-none grid-cols-1 lg:grid-cols-[44fr_56fr]">
          <div className="relative flex flex-col justify-center px-6 md:px-14 lg:px-16 pt-4 pb-4 lg:pt-12 lg:pb-10 overflow-hidden order-2 lg:order-1">
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
                fill
                priority
                sizes="56vw"
                src={about.portrait.src}
                alt={about.portrait.alt}
                className="object-cover object-center"
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
}
