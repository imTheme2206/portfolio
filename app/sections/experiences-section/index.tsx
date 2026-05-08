"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { workExperiences } from "@/app/constants";
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

    // Phase 1 — unrotate + grow; circle text scales up and fades; image gains color
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

      // Phase 2 — squash into landscape pill; pill label slides in
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

      // Phase 3 — flood to full screen; pill text fades, image zooms
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

      // Phase 4 — content arrives
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        ease: "power1.out",
        duration: 0.25,
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
            subtitle="Behind the scene, Beyond the screen"
            title="Experiences"
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
    <section data-cursor="invert" id="last-section" className="relative">
      {/* 300vh scroll space drives the card expansion */}
      <div ref={spacerRef} style={{ height: "300vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center bg-background">
          <div
            ref={cardRef}
            className="absolute bg-secondary-foreground text-primary-foreground overflow-hidden"
            style={{ width: "14rem", height: "14rem", borderRadius: "50%" }}
          >
            {/* Hero image — starts desaturated, gains color in phase 1 */}
            <Image
              ref={imageRef}
              src="/assets/images/hero-section/hero-4.webp"
              alt="Experience preview"
              fill
              className="object-cover object-center opacity-0"
              style={{
                filter: "grayscale(100%)",
                willChange: "transform, filter",
              }}
              priority
            />

            {/* Soft dark overlay so text is always legible */}
            <div className="absolute inset-0 bg-secondary-foreground/50 pointer-events-none" />

            {/* Circle phase — large centred italic label */}
            <div
              ref={circleTextRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary-foreground/50">
                03 — Chapter
              </span>
              <span className="font-heading italic text-5xl text-primary-foreground leading-none">
                Experience
              </span>
            </div>

            {/* Pill phase — left label + right tagline */}
            <div
              ref={pillTextRef}
              className="absolute inset-0 flex items-center justify-between px-14 pointer-events-none"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary-foreground/50">
                  Since 2019
                </span>
                <span className="font-heading italic text-3xl text-primary-foreground leading-none">
                  {workExperiences.length} roles
                </span>
              </div>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-primary-foreground/40">
                Behind the screen →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content overlaps the last 100vh of the spacer so it appears
          seamlessly as the card reaches full-screen */}
      <div
        ref={contentRef}
        className="relative bg-secondary-foreground text-primary-foreground"
        style={{ marginTop: "-100vh" }}
      >
        <AnimatedHeader
          subtitle="Behind the scene, Beyond the screen"
          title="Experiences"
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

  return (
    <div
      className="sticky px-10 pt-6 pb-12 bg-secondary-foreground rounded-b-4xl border-t border-secondary/50"
      style={
        isDesktop
          ? {
              top: `calc(5vh + ${index * 5}em)`,
              marginBottom: `${(total - index - 1) * 5}rem`,
            }
          : { top: 0 }
      }
    >
      <div className="flex items-center justify-between gap-4 font-light">
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl lg:text-5xl">{service.title}</h2>
          <p className="text-paragraph leading-relaxed tracking-widest lg:text-2xl text-pretty">
            {service.description}
          </p>
          <div className="flex flex-col gap-2 text-paragraph sm:gap-4 lg:text-3xl">
            {service.highlights.map((item, itemIndex) => (
              <div key={`item-${index}-${itemIndex}`}>
                <h3 className="flex">
                  <span className="mr-12 text-lg">0{itemIndex + 1}</span>
                  {item.title}
                </h3>
                {itemIndex < service.highlights.length - 1 && (
                  <div className="w-full h-px my-2 bg-secondary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
