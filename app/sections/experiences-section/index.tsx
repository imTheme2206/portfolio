"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { experiencesHeader, workExperiences } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useScrollReveal } from "@/app/hook/use-scroll-reveal";
import { useTextReveal } from "@/app/hook/use-text-reveal";
import Image from "next/image";
import { useExperiencesAnimation } from "./use-experiences-animation";

export const Experiences = () => {
  const { isDesktop } = useDetectScreen();
  const {
    spacerRef,
    cardRef,
    contentRef,
    imageRef,
    circleTextRef,
    pillTextRef,
  } = useExperiencesAnimation({ isDesktop });

  if (!isDesktop) {
    return (
      <section
        data-cursor="invert"
        id="last-section"
        className="min-h-screen text-primary-foreground flex justify-center"
      >
        <div className="bg-secondary-foreground w-full rounded-4xl">
          <AnimatedHeader
            subtitle={experiencesHeader.subtitle}
            title={experiencesHeader.title}
            withScrollTrigger={false}
            dividerColor="light"
          />
          <div className="mt-12">
            {workExperiences.map((service, index) => (
              <ExperienceCards service={service} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
              priority
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
              className="absolute inset-0 flex items-center justify-between px-14 pointer-events-none"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50">
                  {experiencesHeader.since}
                </span>
                <span className="font-heading italic text-3xl text-primary-foreground leading-none">
                  {workExperiences.length} roles
                </span>
              </div>
              <span className="font-heading italic text-3xl tracking-[0.15em] uppercase text-primary-foreground">
                {experiencesHeader.pillText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative bg-secondary-foreground text-primary-foreground rounded-b-4xl"
        style={{ marginTop: "-90vh" }}
        data-cursor="invert"
      >
        <AnimatedHeader
          subtitle={experiencesHeader.subtitle}
          title={experiencesHeader.title}
          withScrollTrigger={false}
          dividerColor="light"
        />
        <div className="mt-12">
          {workExperiences.map((service, index) => (
            <ExperienceCards service={service} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceCards = ({
  service,
  index,
}: {
  service: (typeof workExperiences)[number];
  index: number;
}) => {
  const { isDesktop } = useDetectScreen();
  const total = workExperiences.length;
  const headerRef = useScrollReveal<HTMLDivElement>({
    y: 20,
    stagger: 0.07,
    start: "top 80%",
  });
  const highlightsRef = useScrollReveal<HTMLDivElement>({
    y: 20,
    stagger: 0.07,
    start: "top 80%",
  });

  const descRef = useTextReveal({
    by: "lines",
    duration: 0.25,
    start: "top 80%",
    stagger: 0.07,
  });

  return (
    <div
      className="sticky px-4 sm:px-10 pt-8 pb-10 bg-secondary-foreground rounded-b-4xl border-t border-secondary/50"
      style={
        isDesktop
          ? {
              top: `calc(5vh + ${index * 5}rem)`,
              marginBottom: `${(total - index - 1) * 5}rem`,
            }
          : { top: 0 }
      }
    >
      <div ref={headerRef}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-baseline gap-4 mb-8 font-mono sm:tracking-[0.25em] uppercase text-primary-foreground/60 text-xs sm:text-sm">
          <p className="text-sm flex-1">{service.range}</p>
          <span className="hidden sm:block flex-1 h-px bg-primary-foreground/10 relative" />
          <p className="absolute top-0 right-0 bg-primary px-4 sm:text-lg mt-1/2 sm:-mt-2">
            {service.company}
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-10 mb-8 overflow-hidden">
          <h2 className="font-heading italic text-2xl sm:text-5xl lg:text-7xl leading-none truncate text-primary-foreground relative z-10">
            {service.title}
          </h2>
        </div>

        <div className="w-full h-px bg-secondary/40 mb-4 sm:mb-8" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <p
          ref={descRef}
          className="text-primary-foreground leading-relaxed text-base lg:text-xl text-pretty font-light"
        >
          {service.description}
        </p>

        <div ref={highlightsRef} className="flex flex-col">
          {service.highlights.map((item, i) => (
            <div
              key={`${index}-${i}`}
              className="group/row flex items-baseline justify-between py-3.5 border-b border-secondary/20 last:border-0 cursor-default overflow-hidden"
            >
              <div className="flex items-baseline gap-5 min-w-0">
                <span className="shrink-0 font-mono text-[10px] tracking-widest text-primary-foreground/25">
                  0{i + 1}
                </span>
                <div className="flex flex-col">
                  <p className="text-primary-foreground font-light text-lg lg:text-lg transition-all duration-100 group-hover/row:italic group-hover/row:translate-x-1 truncate">
                    {item.title}
                  </p>
                  <p className="hidden sm:block shrink-0 font-mono text-sm text-primary-foreground/60 opacity-0 translate-y-2 transition-all duration-300 group-hover/row:opacity-100 group-hover/row:translate-y-0 truncate">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
