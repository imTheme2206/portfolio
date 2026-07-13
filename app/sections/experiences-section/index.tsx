"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { experiencesHeader, workExperiences } from "@/app/constants";
import { useScrollReveal } from "@/app/hook/use-scroll-reveal";
import { useTextReveal } from "@/app/hook/use-text-reveal";
import Image from "next/image";
import { useExperiencesAnimation } from "./use-experiences-animation";

export const Experiences = () => {
  const {
    spacerRef,
    cardRef,
    contentRef,
    imageRef,
    circleTextRef,
    pillTextRef,
    progressRef,
  } = useExperiencesAnimation();

  return (
    <section
      id="last-section"
      className="relative bg-secondary-foreground rounded-b-3xl"
    >
      <div ref={spacerRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center bg-background">
          <div
            ref={cardRef}
            className="absolute bg-secondary-foreground text-primary-foreground overflow-hidden"
            style={{ width: "14rem", height: "14rem", borderRadius: "50%" }}
            data-cursor="invert"
          >
            <Image
              ref={imageRef}
              src={experiencesHeader.image.src}
              alt={experiencesHeader.image.alt}
              fill
              sizes="100vw"
              className="object-cover object-center opacity-0"
              style={{
                filter: "grayscale(100%)",
                willChange: "transform, filter",
              }}
            />
            <div className="absolute inset-0 bg-secondary-foreground/50 pointer-events-none" />

            <div
              ref={circleTextRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
            >
              <span className="font-heading italic text-5xl text-primary-foreground leading-none">
                {experiencesHeader.circleText}
              </span>
            </div>

            <div
              ref={pillTextRef}
              className="absolute inset-0 flex items-center justify-between gap-4 px-5 pointer-events-none sm:px-14"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50">
                  {experiencesHeader.since}
                </span>
                <span className="font-heading italic text-xl text-primary-foreground leading-none sm:text-3xl">
                  {workExperiences.length} roles
                </span>
              </div>
              <span className="text-right font-heading italic text-xl tracking-[0.1em] uppercase text-primary-foreground sm:text-3xl sm:tracking-[0.15em]">
                {experiencesHeader.pillText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative bg-secondary-foreground text-primary-foreground rounded-b-4xl"
        data-cursor="invert"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-24 left-8 top-44 hidden w-px overflow-hidden bg-secondary/20 lg:block"
        >
          <span
            ref={progressRef}
            className="block h-full w-full origin-top scale-y-0 bg-primary-foreground/70"
          />
        </div>
        <AnimatedHeader
          subtitle={experiencesHeader.subtitle}
          title={experiencesHeader.title}
          withScrollTrigger={false}
          dividerColor="light"
        />
        <ExperienceList />
      </div>
    </section>
  );
};

const ExperienceList = () => {
  return (
    <div className="mt-12">
      {workExperiences.map((service, index) => (
        <ExperienceCard service={service} index={index} key={index} />
      ))}
    </div>
  );
};

const ExperienceCard = ({
  service,
  index,
}: {
  service: (typeof workExperiences)[number];
  index: number;
}) => {
  const metaRef = useScrollReveal<HTMLElement>({
    y: 20,
    stagger: 0.07,
    start: "top 80%",
  });
  const titleRef = useScrollReveal<HTMLDivElement>({
    y: 20,
    stagger: 0.07,
    start: "top 80%",
  });
  const highlightsRef = useScrollReveal<HTMLDivElement>({
    y: 20,
    stagger: 0.06,
    start: "top 80%",
  });

  const descRef = useTextReveal<HTMLParagraphElement>({
    by: "lines",
    duration: 0.25,
    start: "top 80%",
    stagger: 0.07,
  });

  return (
    <article className="relative border-t border-secondary/35 px-4 py-10 sm:px-10 sm:py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(13rem,18rem)_1fr] lg:gap-14">
        <aside ref={metaRef} className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-start justify-between gap-4 lg:block">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary-foreground/35">
                0{index + 1}
              </span>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-primary-foreground/55 sm:text-sm">
                {service.range}
              </p>
            </div>

            <span className="rounded-full border border-secondary/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/65 lg:mt-6 lg:inline-flex">
              {service.company}
            </span>
          </div>
        </aside>

        <div>
          <div ref={titleRef} className="mb-8">
            <h2 className="font-heading text-4xl italic leading-[0.95] text-primary-foreground text-balance sm:text-6xl lg:text-8xl">
              {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1fr)] lg:gap-12">
            <p
              ref={descRef}
              className="max-w-3xl text-pretty text-base font-light leading-relaxed text-primary-foreground/85 lg:text-xl"
            >
              {service.description}
            </p>

            <div ref={highlightsRef} className="flex flex-col">
              {service.highlights.map((item, i) => (
                <div
                  key={`${index}-${i}`}
                  className="group/row grid grid-cols-[2.5rem_1fr] gap-4 border-b border-secondary/20 py-4 last:border-0"
                >
                  <span className="font-mono text-[10px] tracking-widest text-primary-foreground/25">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-lg font-light leading-snug text-primary-foreground transition-all duration-200 group-hover/row:translate-x-1 group-hover/row:italic">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-primary-foreground/55">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
