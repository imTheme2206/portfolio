"use client";

import { Marquee } from "@/app/components/marquee";
import { about, marqueeWords, skills } from "@/app/constants";
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
  const tiltRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<SVGSVGElement>(null);
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
      // ── Mouse tilt on image ──
      // const tiltEl = tiltRef.current;
      // let onMove: ((e: MouseEvent) => void) | null = null;
      // let onLeave: (() => void) | null = null;
      // if (tiltEl) {
      //   const tiltY = gsap.quickTo(tiltEl, "rotateY", {
      //     duration: 0.7,
      //     ease: "power3.out",
      //   });
      //   const tiltX = gsap.quickTo(tiltEl, "rotateX", {
      //     duration: 0.7,
      //     ease: "power3.out",
      //   });
      //   gsap.set(tiltEl, {
      //     transformPerspective: 900,
      //     transformOrigin: "center center",
      //   });
      //   onMove = (e: MouseEvent) => {
      //     const r = tiltEl.getBoundingClientRect();
      //     tiltY(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 7);
      //     tiltX(-(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 7));
      //   };
      //   onLeave = () => {
      //     tiltY(0);
      //     tiltX(0);
      //   };
      //   tiltEl.addEventListener("mousemove", onMove);
      //   tiltEl.addEventListener("mouseleave", onLeave);
      // }

      // ── SplitText heading for scrub control ──
      const split = headingRef.current
        ? new GSAPSplitText(headingRef.current, {
            type: "lines,chars",
            linesClass: "overflow-hidden",
          })
        : null;

      // ── Main pinned scrub timeline ──
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
      tl.from(".float-label", { opacity: 0, y: 16, duration: 0.4 }, 0);
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

      // t 1.55 : skill chips
      const skillEls = gsap.utils.toArray<HTMLElement>(".about-skill");
      tl.from(
        skillEls,
        { scale: 0, opacity: 0, stagger: 0.055, duration: 0.35 },
        1.55,
      );

      return () => {
        if (tiltEl && onMove) tiltEl.removeEventListener("mousemove", onMove);
        if (tiltEl && onLeave)
          tiltEl.removeEventListener("mouseleave", onLeave);
        split?.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <div>
      {/* ── Pinned section ── */}
      <section ref={sectionRef} className="h-screen relative">
        <div className="h-full grid grid-rows-[45%_55%] lg:grid-rows-none grid-cols-1 lg:grid-cols-[44fr_56fr]">
          {/* ── Left: text ── */}
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

            {/* Paragraph 1 — 2 lines */}
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

            {/* Paragraph 2 — 2 lines */}
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

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="about-skill text-[11px] font-display px-3 py-1.5 rounded-full border border-foreground/20 text-foreground/80 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300 cursor-default select-none"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={tiltRef}
            className="relative will-change-transform h-full order-1 lg:order-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div ref={imgWrapRef} className="absolute inset-0 overflow-hidden">
              <Image
                fill
                loading="lazy"
                sizes="56vw"
                src={about.portrait.src}
                alt={about.portrait.alt}
                className="object-cover object-center"
              />
            </div>

            {/* Rotating sticker */}
            {/*<div className="absolute bottom-10 -left-7 z-10 pointer-events-none hidden lg:block">
              <div className="relative w-28 h-28 md:w-36 md:h-36">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl">✦</span>
                </div>
                <svg
                  ref={stickerRef}
                  viewBox="0 0 100 100"
                  className="w-full h-full text-white"
                >
                  <defs>
                    <path
                      id="about-sticker-path"
                      d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    style={{
                      fontFamily: "Syne",
                      fontSize: "8.5px",
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                    }}
                  >
                    <textPath href="#about-sticker-path">
                      Available 2026 · Open to Work · Bangkok ·
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>*/}

            {/*<span
              className="float-label absolute top-8 right-8 z-10 italic uppercase text-[10px] tracking-[0.4em] text-white/70 bg-black/25 backdrop-blur-sm px-3 py-1 rounded-sm"
              style={{ transform: "rotate(2deg)" }}
            >
              Self-portrait
            </span>*/}
          </div>
        </div>
      </section>

      {/* ── Marquee strip after pin ── */}
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
