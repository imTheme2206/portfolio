"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { experiencesHeader, workExperiences } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Experiences = () => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const circleTextRef = useRef<HTMLDivElement>(null);
  const pillTextRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useDetectScreen();

  useGSAP(() => {
    if (!isDesktop) return;

    gsap.set(contentRef.current, { autoAlpha: 0, y: 24 });
    gsap.set(cardRef.current, { rotate: -8, transformOrigin: "center center" });
    gsap.set(pillTextRef.current, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: spacerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
      },
    });

    tl.to(cardRef.current, {
      rotate: 0,
      width: "55vw",
      height: "55vw",
      borderRadius: "50%",
      ease: "power1.inOut",
      duration: 0.25,
    })
      .to(
        imageRef.current,
        { opacity: 1, filter: "grayscale(0%)", ease: "none", duration: 0.25 },
        "<",
      )
      .to(
        circleTextRef.current,
        { scale: 1.25, opacity: 0, ease: "power1.in", duration: 0.25 },
        "<",
      )
      .to(cardRef.current, {
        width: "82vw",
        height: "22rem",
        borderRadius: "999px",
        ease: "power2.inOut",
        duration: 0.25,
      })
      .to(
        pillTextRef.current,
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
        "<0.1",
      )
      .to(imageRef.current, { scale: 1.08, ease: "none", duration: 0.25 }, "<")
      .to(cardRef.current, {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        ease: "power1.in",
        duration: 0.25,
      })
      .to(
        pillTextRef.current,
        { opacity: 0, y: -10, ease: "power1.in", duration: 0.15 },
        "<",
      )
      .to(imageRef.current, { scale: 1.18, ease: "none", duration: 0.25 }, "<")
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        ease: "power1.out",
        duration: 0.15,
      });
  }, [isDesktop]);

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
              <span className="font-mono text-5xl tracking-[0.15em] uppercase text-primary-foreground">
                {experiencesHeader.pillText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative bg-secondary-foreground text-primary-foreground"
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
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const els = innerRef.current?.querySelectorAll("[data-reveal]");
    if (!els?.length) return;

    gsap.from(els, {
      scrollTrigger: {
        trigger: innerRef.current,
        start: "top 60%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      stagger: 0.07,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      className="sticky px-10 pt-8 pb-10 bg-secondary-foreground rounded-b-4xl border-t border-secondary/50"
      style={
        isDesktop
          ? {
              top: `calc(5vh + ${index * 5}rem)`,
              marginBottom: `${(total - index - 1) * 5}rem`,
            }
          : { top: 0 }
      }
    >
      <div ref={innerRef}>
        <div
          data-reveal
          className="flex items-center gap-4 mb-8 font-mono text-[11px] tracking-[0.25em] uppercase text-primary-foreground/25"
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 h-px bg-primary-foreground/10 relative" />
          <p className="absolute top-0 right-0 bg-primary px-4 sm:text-lg sm:-mt-2">
            {service.company}
          </p>
        </div>

        {/* Title + company */}
        <div
          data-reveal
          className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-3 lg:gap-10 mb-8 overflow-hidden"
        >
          <h2 className="font-heading italic  text-2xl sm:text-5xl lg:text-7xl leading-none truncate text-primary-foreground relative z-10">
            {service.title}
          </h2>
        </div>

        <div data-reveal className="w-full h-px bg-secondary/40 mb-4 sm:mb-8" />

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <p
            data-reveal
            className="text-primary-foreground/60 leading-relaxed text-base lg:text-lg text-pretty font-light"
          >
            {service.description}
          </p>

          <div className="flex flex-col">
            {service.highlights.map((item, i) => (
              <div
                key={`${index}-${i}`}
                data-reveal
                className="group/row flex items-baseline justify-between py-3.5 border-b border-secondary/20 last:border-0 cursor-default overflow-hidden"
              >
                <div className="flex items-baseline gap-5 min-w-0">
                  <span className="shrink-0 font-mono text-[10px] tracking-widest text-primary-foreground/25">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col">
                    <p className="text-primary-foreground font-light text-base lg:text-lg transition-all duration-100 group-hover/row:italic group-hover/row:translate-x-1 truncate">
                      {item.title}
                    </p>
                    <p className="hidden sm:block shrink-0 font-mono text-[11px] text-primary-foreground/35 opacity-0 translate-y-2 transition-all duration-300 group-hover/row:opacity-100 group-hover/row:translate-y-0 truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
