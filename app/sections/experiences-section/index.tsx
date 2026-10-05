"use client";

import { workExperiences } from "@/app/constants";
import { useExperiencesAnimation } from "./use-experiences-animation";

const getStartYear = (range: string) => range.match(/\d{4}/)?.[0] ?? range;
const getSceneTone = (index: number) =>
  index % 2 === 0
    ? "bg-primary text-primary-foreground"
    : "bg-secondary text-secondary-foreground";

export const Experiences = () => {
  const { sectionRef, overtureRef, progressRef, exitRef } =
    useExperiencesAnimation();

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Experience"
      className="relative z-40 -mt-16 bg-primary pt-16 text-primary-foreground [clip-path:polygon(0_4rem,68%_0,100%_3rem,100%_100%,0_100%)] sm:-mt-24 sm:pt-24 sm:[clip-path:polygon(0_7rem,68%_0,100%_5rem,100%_100%,0_100%)]"
      data-cursor="invert"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:8.333vw_100%]"
      />

      <div
        ref={overtureRef}
        aria-hidden="true"
        className="experience-overture relative hidden h-svh overflow-hidden bg-primary lg:block motion-reduce:lg:hidden [@media(max-height:699px)]:hidden"
      >
        <div className="experience-overture-intro absolute inset-0 flex flex-col justify-between px-10 pb-12 pt-12 xl:px-20">
          <div className="flex justify-between gap-6 border-t border-current/20 pt-5 font-mono text-xs uppercase tracking-[0.25em] opacity-45">
            <span>03 / Experience</span>
            <span>Career archive · 2022—Now</span>
          </div>
          <div className="mx-auto w-full max-w-[96rem]">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--animated-accent)]">
              Selected chapters / 03
            </p>
            <h2 className="experience-overture-heading font-heading text-8xl leading-[0.78] tracking-tight xl:text-9xl">
              Experience
              <span className="block pl-[12vw] italic opacity-30">
                archive.
              </span>
            </h2>
            <span className="experience-overture-line mt-12 block h-px w-full origin-left scale-x-0 bg-[var(--animated-accent)]" />
          </div>
          <div className="flex items-end justify-between gap-10 border-b border-current/20 pb-5">
            <p className="max-w-md text-base leading-relaxed opacity-55">
              From production interfaces to the systems, contracts, and delivery
              paths behind them—each role widened the frame.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-40">
              Scroll to trace ↓
            </p>
          </div>
        </div>

        {workExperiences.map((role, index) => (
          <div
            key={role.company}
            className={["experience-scene invisible absolute inset-0 overflow-hidden", getSceneTone(index)].join(" ")}
            data-cursor={index % 2 === 0 ? "invert" : ""}
          >
            <div className="experience-scene-poster absolute inset-0 flex flex-col justify-between px-10 pb-12 pt-12 xl:px-20">
              <div className="flex justify-between gap-6 border-t border-current/20 pt-5 font-mono text-xs uppercase tracking-[0.25em] opacity-45">
                <span>Career chapter / {String(index + 1).padStart(2, "0")}</span>
                <span>{role.range}</span>
              </div>
              <div className="experience-scene-content relative mx-auto w-full max-w-[96rem]">
                <span className="experience-scene-year pointer-events-none absolute -right-3 -top-20 font-heading text-9xl italic leading-none opacity-10">
                  {getStartYear(role.range)}
                </span>
                <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--animated-accent)]">
                  {String(index + 1).padStart(2, "0")} / 03 · The work
                </p>
                <div className="overflow-hidden pb-4">
                  <p className="experience-scene-title max-w-6xl text-balance font-heading text-8xl italic leading-[0.82] tracking-tight xl:text-9xl">
                    {role.title}
                  </p>
                </div>
                <p className="experience-scene-company mt-10 font-heading text-3xl italic xl:text-4xl">
                  {role.company}
                </p>
              </div>
              <div className="flex justify-between border-b border-current/20 pb-5 font-mono text-xs uppercase tracking-[0.2em] opacity-40">
                <span>Bangkok, TH</span>
                <span>Scroll to reveal the work ↓</span>
              </div>
            </div>

            <div className={["experience-scene-detail invisible absolute inset-0 flex flex-col justify-between overflow-hidden px-10 pb-10 pt-10 xl:px-20", getSceneTone(index)].join(" ")}>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--animated-accent)]"
              />
              <div className="experience-detail-piece flex justify-between gap-6 border-t border-current/20 pt-4 font-mono text-xs uppercase tracking-[0.2em] opacity-45">
                <span>Chapter {String(index + 1).padStart(2, "0")} / 03</span>
                <span>{role.range}</span>
              </div>
              <div className="mx-auto grid w-full max-w-[96rem] grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] items-start gap-10 xl:gap-20">
                <div className="experience-detail-piece">
                  <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-[var(--animated-accent)]">
                    The role / {getStartYear(role.range)}
                  </p>
                  <h3 className="max-w-xl text-balance font-heading text-5xl italic leading-[0.88] tracking-tight xl:text-6xl">
                    {role.title}
                  </h3>
                  <p className="mt-6 font-heading text-2xl italic opacity-75">
                    {role.company}
                  </p>
                  <p className="mt-7 max-w-xl text-sm leading-relaxed opacity-60 xl:text-base">
                    {role.description}
                  </p>
                </div>
                <div className="experience-detail-piece">
                  <div className="mb-4 flex justify-between border-b border-current/20 pb-3 font-mono text-xs uppercase tracking-[0.22em] opacity-40">
                    <span>Selected impact</span>
                    <span>01—05</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 xl:gap-x-10">
                    {role.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={highlight.title}
                        className="border-b border-current/20 py-3 xl:py-4"
                      >
                        <span className="font-mono text-xs text-[var(--animated-accent)]">
                          {String(highlightIndex + 1).padStart(2, "0")}
                        </span>
                        <h4 className="mt-2 font-heading text-lg italic leading-tight xl:text-xl">
                          {highlight.title}
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed opacity-50">
                          {highlight.description.replace(/^\(|\)$/g, "")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="experience-detail-piece flex justify-between border-b border-current/20 pb-3 font-mono text-xs uppercase tracking-[0.2em] opacity-40">
                <span>Experience / {String(index + 1).padStart(2, "0")}</span>
                <span>Continue scrolling ↓</span>
              </div>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute bottom-0 inset-x-0 z-40 h-1 bg-current/10">
          <span
            ref={progressRef}
            className="block h-full w-full origin-left scale-x-0 bg-[var(--animated-accent)]"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-10 lg:hidden motion-reduce:lg:block [@media(max-height:699px)]:block">
        <div className="flex justify-between gap-6 border-t border-current/20 pt-5 font-mono text-xs uppercase tracking-[0.2em] opacity-45">
          <span>03 / Experience</span>
          <span>2022—Now</span>
        </div>
        <h2 className="mt-16 font-heading text-7xl leading-[0.82] tracking-tight sm:text-8xl">
          Experience <span className="italic opacity-30">archive.</span>
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed opacity-55">
          From production interfaces to the systems, contracts, and delivery
          paths behind them—each role widened the frame.
        </p>

        <div className="mt-20 space-y-6 pb-20">
          {workExperiences.map((role, index) => (
            <article
              key={role.company}
              className={["experience-mobile-scene rounded-[2rem] border border-current/10 px-5 py-16 shadow-lg sm:px-10 sm:py-20", getSceneTone(index)].join(" ")}
              data-cursor={index % 2 === 0 ? "invert" : ""}
            >
              <div className="flex justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em] opacity-45">
                <span>Chapter {String(index + 1).padStart(2, "0")}</span>
                <span>{role.range}</span>
              </div>
              <div className="relative mt-16">
                <span className="pointer-events-none absolute right-0 -top-12 font-heading text-8xl italic leading-none opacity-10 sm:text-9xl">
                  {getStartYear(role.range)}
                </span>
                <div className="relative overflow-hidden pb-3">
                  <h3 className="experience-mobile-title font-heading text-6xl italic leading-[0.85] tracking-tight sm:text-8xl">
                    {role.title}
                  </h3>
                </div>
                <p className="experience-mobile-company mt-8 font-heading text-2xl italic sm:text-3xl">
                  {role.company}
                </p>
              </div>
              <p className="experience-mobile-detail mt-12 max-w-2xl text-base leading-relaxed opacity-60">
                {role.description}
              </p>
              <div className="experience-mobile-detail mt-12 border-b border-current/20">
                <div className="flex justify-between pb-4 font-mono text-xs uppercase tracking-[0.2em] opacity-40">
                  <span>Selected impact</span>
                  <span>01—05</span>
                </div>
                {role.highlights.map((highlight, highlightIndex) => (
                  <div
                    key={highlight.title}
                    className="grid gap-2 border-t border-current/20 py-5 sm:grid-cols-[2.5rem_0.8fr_1fr] sm:gap-5"
                  >
                    <span className="font-mono text-xs text-[var(--animated-accent)]">
                      {String(highlightIndex + 1).padStart(2, "0")}
                    </span>
                    <h4 className="font-heading text-2xl italic leading-tight">
                      {highlight.title}
                    </h4>
                    <p className="text-sm leading-relaxed opacity-50">
                      {highlight.description.replace(/^\(|\)$/g, "")}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* The desktop stage is visual; this copy remains available to assistive technology. */}
      <div className="hidden lg:block lg:sr-only motion-reduce:lg:hidden [@media(max-height:699px)]:hidden">
        <h2>Experience</h2>
        {workExperiences.map((role) => (
          <article key={role.company}>
            <h3>{role.title} at {role.company}</h3>
            <p>{role.range}</p>
            <p>{role.description}</p>
            <ul>
              {role.highlights.map((highlight) => (
                <li key={highlight.title}>
                  {highlight.title}: {highlight.description}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div
        ref={exitRef}
        aria-hidden="true"
        className="experience-exit relative h-40 overflow-hidden sm:h-56"
      >
        <div className="experience-exit-accent absolute inset-0 bg-[var(--animated-accent)] [clip-path:polygon(0_78%,32%_29%,68%_53%,100%_8%,100%_100%,0_100%)]" />
        <div className="experience-exit-surface absolute inset-0 bg-background [clip-path:polygon(0_85%,32%_37%,68%_61%,100%_16%,100%_100%,0_100%)]" />
      </div>
    </section>
  );
};
