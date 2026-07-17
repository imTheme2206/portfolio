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
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px)] [background-size:8.333vw_100%]"
      />

      <div className="relative mx-auto max-w-[96rem] px-5 sm:px-10">
        <header className="experience-header relative flex min-h-[78svh] flex-col justify-between pb-20 lg:min-h-[88svh] lg:pb-28">
          <div className="experience-intro flex items-center justify-between border-t border-secondary/20 pt-5 font-mono text-[8px] uppercase tracking-[0.3em] text-primary-foreground/42 sm:text-[9px]">
            <span>03 / Experience</span>
            <span>Career archive · 2022—Now</span>
          </div>

          <span
            aria-hidden="true"
            className="experience-header-index pointer-events-none absolute -right-2 top-[8%] font-heading text-[clamp(13rem,35vw,34rem)] italic leading-none tracking-[-0.08em] text-primary-foreground/[0.035]"
          >
            03
          </span>

          <div className="relative z-10 my-auto py-20 lg:py-28">
            <p className="experience-kicker mb-6 ml-1 font-mono text-[8px] uppercase tracking-[0.34em] text-[var(--animated-accent)]">
              Selected chapters / 03
            </p>
            <h2 className="font-heading text-[clamp(5.4rem,14vw,14rem)] leading-[0.66] tracking-[-0.065em]">
              <span className="experience-heading-line block">Experience</span>
              <span className="experience-heading-line block pl-[13vw] italic text-primary-foreground/28">
                archive.
              </span>
            </h2>
          </div>

          <div className="experience-intro relative z-10 grid gap-8 border-b border-secondary/20 pb-6 sm:grid-cols-[1fr_auto] sm:items-end lg:grid-cols-[0.55fr_0.45fr]">
            <p className="max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/52 sm:text-base">
              From production interfaces to the systems, contracts, and delivery
              paths behind them—each role widened the frame.
            </p>
            <div className="flex items-end justify-between gap-12 sm:justify-end">
              <p className="font-heading text-4xl italic leading-none text-primary-foreground/76 sm:text-5xl">
                Pixels
                <span className="mx-3 text-primary-foreground/22">→</span>
                Pipelines
              </p>
              <p className="hidden text-right font-mono text-[8px] uppercase leading-relaxed tracking-[0.25em] text-primary-foreground/30 lg:block">
                Bangkok, TH
                <span className="block">Scroll to trace</span>
              </p>
            </div>
          </div>
        </header>

        <div className="relative lg:grid lg:grid-cols-[minmax(16rem,0.28fr)_minmax(0,1fr)] lg:gap-20">
          <aside className="relative hidden lg:block">
            <div className="sticky top-0 flex h-dvh flex-col justify-center py-20">
              <div className="border-t border-secondary/20 pt-6">
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.27em] text-primary-foreground/30">
                  <span>Career index</span>
                  <span>03 entries</span>
                </div>

                <div ref={activeRoleRef} className="mt-8 flex items-end gap-4">
                  <span className="font-heading text-[7.5rem] italic leading-[0.65] tracking-[-0.06em]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="pb-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.2em] text-primary-foreground/32">
                    Active
                    <span className="block">chapter</span>
                  </span>
                </div>

                <div className="relative mt-12 pl-7">
                  <span className="absolute bottom-0 left-0 top-0 w-px bg-secondary/16">
                    <span
                      ref={progressRef}
                      className="block h-full w-full origin-top scale-y-0 bg-[var(--animated-accent)]"
                    />
                  </span>

                  <ol className="space-y-8">
                    {workExperiences.map((role, index) => (
                      <li
                        key={role.company}
                        className={`relative transition-opacity duration-500 ${index === activeIndex ? "opacity-100" : "opacity-28"}`}
                      >
                        <span
                          className={`absolute -left-[1.925rem] top-1.5 h-2 w-2 rounded-full border transition-colors duration-500 ${index <= activeIndex ? "border-[var(--animated-accent)] bg-[var(--animated-accent)]" : "border-primary-foreground/35 bg-secondary-foreground"}`}
                        />
                        <p className="font-heading text-xl italic leading-tight">
                          {role.company}
                        </p>
                        <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.2em] text-primary-foreground/38">
                          {role.range}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </aside>

          <div ref={listRef}>
            {workExperiences.map((role, index) => (
              <article
                key={`${role.company}-${role.range}`}
                className="experience-role relative flex min-h-[92svh] flex-col justify-center py-24 sm:py-28 lg:min-h-dvh lg:py-32"
              >
                <span className="experience-chapter-rule absolute inset-x-0 top-0 h-px origin-left bg-secondary/22" />

                <span
                  aria-hidden="true"
                  className="experience-year pointer-events-none absolute -right-3 top-[8%] font-heading text-[clamp(9rem,22vw,21rem)] italic leading-none tracking-[-0.07em] text-primary-foreground/[0.045]"
                >
                  {getStartYear(role.range)}
                </span>

                <span
                  aria-hidden="true"
                  className="experience-chapter-index pointer-events-none absolute bottom-[8%] left-0 font-mono text-[clamp(4rem,8vw,8rem)] leading-none tracking-[-0.06em] text-primary-foreground/[0.035]"
                >
                  /{String(index + 1).padStart(2, "0")}
                </span>

                <div className="experience-role-content relative z-10 will-change-transform">
                  <div className="experience-role-meta flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.24em] text-primary-foreground/38">
                    <span className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--animated-accent)]" />
                      Chapter {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{role.range}</span>
                  </div>

                  <div className="experience-title-mask mt-10 overflow-hidden pb-3 sm:mt-14">
                    <h3 className="experience-role-title max-w-5xl text-balance font-heading text-[clamp(4rem,9vw,9rem)] italic leading-[0.76] tracking-[-0.05em]">
                      {role.title}
                    </h3>
                  </div>

                  <div className="mt-10 grid gap-7 sm:mt-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
                    <div className="experience-role-detail">
                      <p className="font-mono text-[7px] uppercase tracking-[0.28em] text-primary-foreground/30">
                        Organisation
                      </p>
                      <p className="mt-3 max-w-xs font-heading text-2xl italic leading-tight sm:text-3xl">
                        {role.company}
                      </p>
                    </div>
                    <p className="experience-role-detail max-w-3xl text-pretty text-sm leading-relaxed text-primary-foreground/58 sm:text-base lg:text-lg">
                      {role.description}
                    </p>
                  </div>

                  <div className="mt-12 border-b border-secondary/20 sm:mt-16 lg:ml-[10%] lg:mt-20">
                    <div className="mb-4 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.26em] text-primary-foreground/28">
                      <span>Selected impact</span>
                      <span>01—03</span>
                    </div>
                    {role.highlights
                      .slice(0, 3)
                      .map((highlight, highlightIndex) => (
                        <div
                          key={highlight.title}
                          className="experience-highlight group relative grid gap-3 border-t border-secondary/20 py-5 sm:grid-cols-[2.5rem_0.72fr_1fr] sm:items-start sm:gap-6 sm:px-2 sm:py-6"
                        >
                          <span className="experience-highlight-trace absolute inset-x-0 top-[-1px] h-px origin-left scale-x-0 bg-[var(--animated-accent)]" />
                          <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--animated-accent)]">
                            {String(highlightIndex + 1).padStart(2, "0")}
                          </span>
                          <h4 className="font-heading text-xl italic leading-none transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                            {highlight.title}
                          </h4>
                          <p className="max-w-lg text-[10px] leading-relaxed text-primary-foreground/44 sm:text-xs">
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
