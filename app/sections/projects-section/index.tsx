"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { Divider } from "@/app/components/divider";
import { SplitText } from "@/app/components/split-text";
import { projects, projectsHeader } from "@/app/constants";
import { useClipReveal } from "@/app/hook/use-clip-reveal";
import { useScrollReveal } from "@/app/hook/use-scroll-reveal";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = Array.from(listRef.current?.children ?? []);
      if (!rows.length) return;

      gsap.from(rows, {
        y: 44,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="flex flex-col gap-y-4 min-h-screen">
      <div>
        <AnimatedHeader
          title={projectsHeader.title}
          text={projectsHeader.description}
          withScrollTrigger={true}
        />
      </div>
      <div className="block">
        <div ref={listRef} className="relative flex flex-col font-normal">
          {projects.map((project, index) => (
            <ProjectRow key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectRow = ({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) => {
  const rowRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const frameworksRef = useScrollReveal<HTMLDivElement>({
    y: 12,
    duration: 0.5,
    start: "top 88%",
  });
  const imageRef = useClipReveal({
    from: "bottom",
  });

  const handleMouseEnter = () => {
    const el = overlayRef.current;
    if (el) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 0.15,
          ease: "power2.out",
        },
      );
    }
    const items = Array.from(frameworksRef.current?.children ?? []);
    if (items.length) {
      gsap.fromTo(
        items,
        { y: 10, opacity: 0.35 },
        { y: 0, opacity: 1, stagger: 0.045, duration: 0.35, ease: "power2.out" },
      );
    }
    gsap.to(titleWrapRef.current, {
      x: 10,
      duration: 0.35,
      ease: "power3.out",
    });
    gsap.to(numberRef.current, {
      x: -22,
      autoAlpha: 0.18,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const el = overlayRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transformOrigin: "bottom",
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(titleWrapRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(numberRef.current, {
      x: 0,
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <article
      ref={rowRef}
      className="relative z-2 flex flex-col py-4 group md:py-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (
          !(nextTarget instanceof Node) ||
          !event.currentTarget.contains(nextTarget)
        ) {
          handleMouseLeave();
        }
      }}
      data-cursor="thumbnail"
      data-image={project.image}
      aria-label={`${project.name}: ${project.description}`}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 hidden md:block duration-200 bg-accent-foreground -z-1 will-change-[clip-path] clip-path"
      />

      <span
        ref={numberRef}
        aria-hidden="true"
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 select-none font-heading text-[clamp(5rem,12vw,10rem)] leading-none text-primary/5 transition-colors duration-500 pointer-events-none will-change-transform sm:block md:group-hover:text-primary-foreground/6 md:group-focus-within:text-primary-foreground/6"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex items-center gap-4 px-4 text-accent-foreground transition-all duration-500 md:px-10 md:group-hover:px-12 md:group-hover:text-primary-foreground md:group-focus-within:px-12 md:group-focus-within:text-primary-foreground">
        <div ref={titleWrapRef} className="flex-1 min-w-0 will-change-transform">
          <SplitText
            component="h4"
            animation="byChar"
            className="text-2xl leading-tight transition-[font-style,letter-spacing] duration-300 md:group-hover:italic md:group-hover:tracking-wide md:group-focus-within:italic md:group-focus-within:tracking-wide lg:text-5xl"
            disableReverse
          >
            {project.name}
          </SplitText>
        </div>

        <div className="shrink-0 hidden md:flex items-center gap-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary/25 transition-colors duration-500 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:group-hover:text-primary-foreground md:group-focus-within:text-primary-foreground"
              aria-label={`${project.name} GitHub repository`}
            >
              <Icon icon="mdi:github" className="text-xl md:text-4xl" />
            </a>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary/25 transition-colors duration-500 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:group-hover:text-primary-foreground md:group-focus-within:text-primary-foreground"
              aria-label={`${project.name} live site`}
            >
              <Icon icon="mdi:open-in-new" className="text-xl md:text-4xl" />
            </a>
          )}
        </div>
      </div>

      <Divider
        className="w-full h-0.5 my-0.5 bg-accent-foreground/80"
        disableReverse
      />

      <div
        ref={frameworksRef}
        className="flex gap-x-4 overflow-scroll px-10 py-1 pl-6 uppercase transition-all duration-500 md:pl-18 md:group-hover:px-12 md:group-focus-within:px-12"
        style={{ scrollbarWidth: "none" }}
      >
        {project.frameworks.map((framework) => (
          <p
            key={framework.id}
            className="text-nowrap text-sm font-bold text-primary transition-colors duration-500 md:text-lg md:leading-loose md:group-hover:text-primary-foreground md:group-focus-within:text-primary-foreground"
          >
            {framework.name}
          </p>
        ))}
      </div>

      <div className="flex px-10 py-3 pl-18 leading-loose transition-all duration-500 md:group-hover:px-12 md:group-focus-within:px-12">
        <SplitText
          component="p"
          animation="byWord"
          className="text-primary text-paragraph transition-colors duration-500 md:group-hover:text-primary-foreground md:group-focus-within:text-primary-foreground"
          disableReverse
        >
          {project.description}
        </SplitText>
      </div>

      <div
        className="mx-6 mt-2 mb-1 md:hidden rounded-xl overflow-hidden relative"
        style={{ aspectRatio: "16/9" }}
        ref={imageRef}
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            className="object-cover"
            fill
          />
        )}
        <span
          aria-hidden="true"
          className="absolute block sm:hidden left-2 top-0 font-heading leading-none select-none pointer-events-none text-primary/30 z-20 md:group-hover:text-primary-foreground/6 transition-colors duration-500 text-[clamp(5rem,12vw,10rem)]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-0 bg-foreground/10 rounded-xl" />
      </div>

      {(project.github || project.href) && (
        <div className="flex md:hidden items-center gap-4 px-6 py-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-primary/50 text-sm font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              aria-label={`${project.name} GitHub repository`}
            >
              <Icon icon="mdi:github" className="text-lg" />
              GitHub
            </a>
          )}
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-primary/50 text-sm font-bold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              aria-label={`${project.name} live site`}
            >
              <Icon icon="mdi:open-in-new" className="text-lg" />
              Visit
            </a>
          )}
        </div>
      )}
    </article>
  );
};
