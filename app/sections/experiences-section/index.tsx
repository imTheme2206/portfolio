"use client";

import { workExperiences } from "@/app/constants";
import { useExperiencesAnimation } from "./use-experiences-animation";

const getStartYear = (range: string) => range.match(/\d{4}/)?.[0] ?? range;

export const Experiences = () => {
  const {
    sectionRef,
    listRef,
    progressRef,
    activeRoleRef,
    mobileActiveRoleRef,
    mobileProgressRef,
    activeIndex,
  } = useExperiencesAnimation();
  const activeRole = workExperiences[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-40 -mt-16 bg-secondary-foreground pb-28 pt-36 text-primary-foreground [clip-path:polygon(0_4rem,68%_0,100%_3rem,100%_100%,0_100%)] sm:-mt-24 sm:pb-40 sm:pt-48 sm:[clip-path:polygon(0_7rem,68%_0,100%_5rem,100%_100%,0_100%)]"
      data-cursor="invert"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:8.333vw_100%]"
      />

      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-10">
        <header>
          <div className="experience-intro flex items-center justify-between border-t border-secondary/20 pt-5 font-mono text-[9px] uppercase tracking-[0.32em] text-primary-foreground/42">
            <span>03 / Experience</span>
            <span>2022 — Present</span>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.27fr_1fr] lg:items-end lg:gap-16">
            <p className="experience-intro max-w-xs text-sm leading-relaxed text-primary-foreground/48 lg:pb-4">
              A career moving from production interfaces into the systems,
              contracts, and delivery paths behind them.
            </p>
            <h2 className="experience-intro text-balance font-heading text-[clamp(5rem,11.5vw,12.5rem)] leading-[0.7] tracking-[-0.06em]">
              From pixels
              <span className="block pl-[10vw] italic text-primary-foreground/28">
                to pipelines.
              </span>
            </h2>
          </div>
        </header>

        <div className="relative mt-28 lg:mt-44 lg:grid lg:grid-cols-[minmax(17rem,0.31fr)_minmax(0,1fr)] lg:gap-16">
          <div className="sticky top-4 z-30 -mx-4 mb-10 lg:hidden">
            <div
              ref={mobileActiveRoleRef}
              className="relative border-y border-secondary/20 bg-secondary-foreground/95 px-3 py-4"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.26em] text-primary-foreground/28">
                    Active signal / {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2  font-heading text-xl italic leading-none sm:max-w-none sm:text-2xl">
                    {activeRole.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-heading text-xl italic leading-[0.72] text-primary-foreground/28">
                    {getStartYear(activeRole.range)}
                  </p>
                  <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.18em] text-primary-foreground/32">
                    {activeRole.range}
                  </p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-px h-px bg-secondary/16"
              >
                <span
                  ref={mobileProgressRef}
                  className="block h-full w-full origin-left scale-x-0 bg-primary-foreground/72"
                />
              </span>
            </div>
          </div>

          <aside className="relative hidden lg:block">
            <div className="sticky top-0 flex h-dvh flex-col justify-center py-24">
              <div
                ref={activeRoleRef}
                className="relative min-h-[18rem] border-t border-secondary/20 pt-6"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-primary-foreground/30">
                    Active chapter
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.22em] text-primary-foreground/30">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(workExperiences.length).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-6 font-heading text-[clamp(7rem,11vw,11rem)] italic leading-[0.72] tracking-[-0.06em] text-primary-foreground/12">
                  {getStartYear(activeRole.range)}
                </p>
                <p className="mt-8 max-w-xs font-heading text-3xl italic leading-none">
                  {activeRole.company}
                </p>
                <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.23em] text-primary-foreground/36">
                  {activeRole.range}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-5">
                <div className="relative h-28 w-px bg-secondary/16">
                  <span
                    ref={progressRef}
                    className="block h-full w-full origin-top scale-y-0 bg-primary-foreground/72"
                  />
                  {workExperiences.map((role, index) => (
                    <span
                      key={role.company}
                      className={`absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full border border-primary-foreground transition-colors duration-500 ${index <= activeIndex ? "bg-primary-foreground" : "bg-secondary-foreground"}`}
                      style={{
                        top: `${(index / (workExperiences.length - 1)) * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="flex h-28 flex-col justify-between font-mono text-[8px] uppercase tracking-[0.22em] text-primary-foreground/28">
                  <span>Now / systems</span>
                  <span>Then / interface</span>
                </div>
              </div>
            </div>
          </aside>

          <div ref={listRef}>
            {workExperiences.map((role, index) => (
              <article
                key={`${role.company}-${role.range}`}
                className="experience-role relative flex min-h-dvh flex-col justify-center py-20 sm:py-24 lg:py-28"
              >
                <span
                  aria-hidden="true"
                  className="experience-year pointer-events-none absolute right-0 top-6 font-heading text-[clamp(8rem,19vw,19rem)] italic leading-none tracking-[-0.06em] text-primary-foreground/[0.045]"
                >
                  {getStartYear(role.range)}
                </span>

                <div className="experience-role-content relative z-10 will-change-transform">
                  <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.25em] text-primary-foreground/34">
                    <span>
                      Chapter {String(index + 1).padStart(2, "0")} /{" "}
                      {role.company}
                    </span>
                    <span>{role.range}</span>
                  </div>

                  <h3 className="mt-10 max-w-5xl text-balance font-heading text-[clamp(4rem,8vw,8.5rem)] italic leading-[0.78] tracking-[-0.045em]">
                    {role.title}
                  </h3>
                  <p className="mt-8 max-w-3xl text-pretty text-sm leading-relaxed text-primary-foreground/58 sm:text-base lg:ml-[12%] lg:text-lg">
                    {role.description}
                  </p>

                  <div className="mt-10 border-b border-secondary/20 sm:mt-12 lg:ml-[12%] lg:mt-16">
                    {role.highlights
                      .slice(0, 3)
                      .map((highlight, highlightIndex) => (
                        <div
                          key={highlight.title}
                          className="experience-highlight group grid gap-2 border-t border-secondary/20 py-4 transition-colors duration-500 hover:bg-secondary/5 sm:grid-cols-[3rem_0.72fr_1fr] sm:items-start sm:gap-6 sm:px-3 sm:py-5"
                        >
                          <span className="font-mono text-[8px] tracking-[0.22em] text-primary-foreground/24">
                            {String(highlightIndex + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-heading text-xl italic leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                            {highlight.title}
                          </h4>
                          <p className="max-w-lg text-[10px] leading-relaxed text-primary-foreground/42 sm:text-xs">
                            {highlight.description.replace(/^\(|\)$/g, "")}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
