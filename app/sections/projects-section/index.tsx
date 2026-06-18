"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { Divider } from "@/app/components/divider";
import { SplitText } from "@/app/components/split-text";
import { projects, projectsHeader } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export const Projects = () => {
  const overlayRefs = useRef<HTMLDivElement[]>([]);
  const frameworkRefs = useRef<(HTMLElement | null)[][]>(
    projects.map(() => []),
  );

  useGSAP(() => {
    projects.forEach((_, i) => {
      const items = frameworkRefs.current[i]?.filter(Boolean);
      if (!items?.length) return;

      gsap.from(items, {
        scrollTrigger: {
          trigger: items[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 12,
        stagger: 0.07,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    const el = overlayRefs.current[index];
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

    const items = frameworkRefs.current[index]?.filter(Boolean);
    if (items?.length) {
      gsap.fromTo(
        items,
        { y: 6, opacity: 0.4 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: "power2.out" },
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transformOrigin: "bottom",
      duration: 0.2,
      ease: "power2.in",
    });
  };

  return (
    <section className="flex flex-col min-h-screen">
      <AnimatedHeader
        title={projectsHeader.title}
        text={projectsHeader.description}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-normal">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col py-4 md:py-5 cursor-pointer group z-2"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            data-cursor="thumbnail"
            data-image={project.image}
          >
            <div
              ref={(el) => {
                overlayRefs.current[index] = el as HTMLDivElement;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-accent-foreground -z-1 will-change-[clip-path] clip-path"
            />

            <span
              aria-hidden="true"
              className="absolute hidden sm:block right-6 top-1/2 -translate-y-1/2 font-heading leading-none select-none pointer-events-none text-primary/5 z-20 md:group-hover:text-primary-foreground/6 transition-colors duration-500 text-[clamp(5rem,12vw,10rem)]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-4 px-4 md:px-10 text-accent-foreground transition-all duration-500 md:group-hover:px-12 md:group-hover:text-primary-foreground">
              <div className="flex-1 min-w-0">
                <SplitText
                  component="h4"
                  animation="byChar"
                  className="text-2xl lg:text-5xl leading-tight transition-[font-style,letter-spacing] duration-300 md:group-hover:italic md:group-hover:tracking-wide"
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
                    className="text-primary/25 md:group-hover:text-primary-foreground transition-colors duration-500 hover:scale-110 active:scale-95"
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
                    className="text-primary/25 md:group-hover:text-primary-foreground transition-colors duration-500 hover:scale-110 active:scale-95"
                    aria-label={`${project.name} live site`}
                  >
                    <Icon
                      icon="mdi:open-in-new"
                      className="text-xl md:text-4xl"
                    />
                  </a>
                )}
              </div>
            </div>

            <Divider
              className="w-full h-0.5 my-0.5 bg-accent-foreground/80"
              disableReverse
            />

            <div
              className="flex px-10 gap-x-4 uppercase transition-all duration-500 md:group-hover:px-12 py-1 pl-6 md:pl-18 overflow-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              {project.frameworks.map((framework, fi) => (
                <p
                  key={framework.id}
                  ref={(el) => {
                    frameworkRefs.current[index][fi] = el;
                  }}
                  className="text-primary transition-colors duration-500 text-nowrap md:group-hover:text-primary-foreground font-bold text-sm md:text-lg md:leading-loose"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            <div className="flex px-10 leading-loose transition-all duration-500 py-3 md:group-hover:px-12 pl-18">
              <SplitText
                component="p"
                animation="byWord"
                className="text-primary text-paragraph transition-colors duration-500 md:group-hover:text-primary-foreground"
                disableReverse
              >
                {project.description}
              </SplitText>
            </div>

            <div
              className="mx-6 mt-2 mb-1 md:hidden rounded-xl overflow-hidden relative"
              style={{ aspectRatio: "16/9" }}
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
                    className="flex items-center gap-1.5 text-primary/50 text-sm font-bold uppercase tracking-wide"
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
                    className="flex items-center gap-1.5 text-primary/50 text-sm font-bold uppercase tracking-wide"
                    aria-label={`${project.name} live site`}
                  >
                    <Icon icon="mdi:open-in-new" className="text-lg" />
                    Visit
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
