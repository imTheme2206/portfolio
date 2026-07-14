"use client";

import { about } from "@/app/constants";
import Image from "next/image";
import { useAboutAnimation } from "./use-about-animation";

const principles = [
  ["01", "Clarity", "Keep things simple enough that they just make sense."],
  ["02", "Character", "Leave a bit of personality in everything I build."],
  ["03", "Continuity", "Build it so the next idea is easy to add."],
] as const;

export const About = () => {
  const { sectionRef, stageRef, portraitRef, storyRef, progressRef } =
    useAboutAnimation();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-30 -mt-10 bg-background sm:-mt-16"
    >
      <div className="hidden h-[280vh] motion-reduce:h-auto lg:block">
        <div
          ref={stageRef}
          className="sticky top-0 h-dvh overflow-hidden motion-reduce:relative"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035]"
          />

          <div className="about-meta absolute left-10 top-10 z-30 font-mono text-[9px] uppercase tracking-[0.3em] text-primary/45">
            {about.sectionLabel}
          </div>
          <div className="about-meta absolute right-10 top-10 z-30 text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.24em] text-primary/35">
            Bangkok, Thailand
          </div>

          <div className="pointer-events-none absolute inset-0">
            <p className="about-title-back absolute left-[3vw] top-[15vh] z-10 whitespace-nowrap font-heading text-[clamp(8rem,15vw,17rem)] leading-[0.72] tracking-[-0.065em]">
              Something
            </p>
            <p className="about-title-front absolute bottom-[11vh] right-[3vw] z-30 whitespace-nowrap font-heading text-[clamp(8rem,15vw,17rem)] italic leading-[0.72] tracking-[-0.065em]">
              about me.
            </p>
          </div>

          <figure
            ref={portraitRef}
            className="absolute left-1/2 top-1/2 z-20 h-[72vh] w-[34vw] overflow-hidden bg-card [clip-path:polygon(10%_0%,100%_7%,91%_100%,0%_92%)]"
          >
            <Image
              fill
              sizes="34vw"
              src={about.portrait.src}
              alt="Worrachit Pongkatekarm working beside a sunlit window"
              className="about-portrait-image object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(23,25,28,0.48)_100%)]" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
              <span className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.26em] text-white/70">
                Worrachit Pongkatekarm
                <span className="block">Software developer</span>
              </span>
              <span className="font-heading text-5xl italic leading-none">
                WP.
              </span>
            </figcaption>
          </figure>

          <p className="about-side-label absolute bottom-1/2 left-8 z-30 origin-bottom-left -rotate-90 font-mono text-[8px] uppercase tracking-[0.32em] text-primary/32">
            Engineering × Design × Motion
          </p>

          <div
            ref={storyRef}
            className="absolute right-[5vw] top-1/2 z-30 w-[39vw] -translate-y-1/2 opacity-0"
          >
            <p className="about-story-item font-mono text-[9px] uppercase tracking-[0.32em] text-primary/35">
              My point of view
            </p>
            <p className="about-story-item mt-7 max-w-2xl text-pretty font-heading text-[clamp(3rem,5vw,5.7rem)] italic leading-[0.91] tracking-[-0.035em]">
              I like building things that work well and still feel like a person
              made them.
            </p>
            <p className="about-story-item mt-8 max-w-xl text-pretty text-sm leading-relaxed text-primary/58">
              I actually studied physics, not computer science—I taught myself
              to code and figured out pretty fast that I liked making things
              people use way more than solving equations. Three years later I'm
              still at it: mostly front-end, based in Bangkok, sticking around
              to fix the little details until everything feels right.
            </p>

            <div className="about-principles mt-12 border-b border-primary/15">
              {principles.map(([number, title, description]) => (
                <div
                  key={number}
                  className="about-principle grid grid-cols-[3rem_0.7fr_1fr] items-start gap-5 border-t border-primary/15 py-5"
                >
                  <span className="font-mono text-[8px] tracking-[0.24em] text-primary/28">
                    {number}
                  </span>
                  <h3 className="font-heading text-2xl italic leading-none">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-primary/48">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/*
          <div className="absolute inset-x-10 bottom-8 z-40 flex items-center gap-5">
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-primary/30">
              Scroll to unfold
            </span>
            <div className="h-px flex-1 overflow-hidden bg-primary/12">
              <span
                ref={progressRef}
                className="block h-full w-full origin-left scale-x-0 bg-primary/55"
              />
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-primary/30">
              02 — 03
            </span>
          </div>*/}
        </div>
      </div>

      <div className="px-5 pb-28 pt-28 sm:px-10 sm:pb-40 sm:pt-40 lg:hidden">
        <div className="flex items-center justify-between border-t border-primary/15 pt-4 font-mono text-[8px] uppercase tracking-[0.28em] text-primary/40">
          <span>{about.sectionLabel}</span>
          <span>Bangkok / TH</span>
        </div>

        <h2 className="about-mobile-reveal relative z-10 mt-14 font-heading text-[clamp(5rem,26vw,11rem)] leading-[0.67] tracking-[-0.06em]">
          Built
          <span className="block text-right italic">with care.</span>
        </h2>

        <figure className="about-mobile-reveal relative z-20 -mt-4 ml-auto aspect-[4/5] w-[82%] rotate-[2deg] overflow-hidden bg-card [clip-path:polygon(8%_0%,100%_5%,93%_100%,0%_94%)] sm:w-[72%]">
          <Image
            fill
            sizes="82vw"
            src={about.portrait.src}
            alt="Worrachit Pongkatekarm working beside a sunlit window"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(23,25,28,0.5)_100%)]" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
            <span className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.22em] text-white/70">
              Theme
              <span className="block">Software developer</span>
            </span>
            <span className="font-heading text-4xl italic">WP.</span>
          </figcaption>
        </figure>

        <div className="about-mobile-reveal mt-20">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary/35">
            My point of view
          </p>
          <p className="mt-6 text-pretty font-heading text-[clamp(2.8rem,12vw,5rem)] italic leading-[0.94] tracking-[-0.03em]">
            I like building things that work well and still feel like a person
            made them.
          </p>
          <p className="mt-8 max-w-xl text-pretty text-sm leading-relaxed text-primary/58">
            I studied physics, then taught myself to code—turns out I like
            making things people use more than solving equations. Three years
            in, still fixing the little details until everything feels right.
          </p>
        </div>

        <div className="about-mobile-reveal mt-16 border-b border-primary/15">
          {principles.map(([number, title, description]) => (
            <article
              key={number}
              className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-primary/15 py-7"
            >
              <span className="font-mono text-[8px] tracking-[0.22em] text-primary/30">
                {number}
              </span>
              <div>
                <h3 className="font-heading text-3xl italic leading-none">
                  {title}
                </h3>
                <p className="mt-3 max-w-sm text-xs leading-relaxed text-primary/48">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
