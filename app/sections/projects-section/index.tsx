"use client";

import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { projects } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

const projectShapes = [
  "ellipse(46% 48% at 52% 50%)",
  "polygon(5% 3%, 94% 0%, 100% 82%, 82% 100%, 2% 94%, 0% 18%)",
  "inset(2% 3% 5% 5% round 38% 4% 32% 7%)",
] as const;

const entranceDirections = [
  { xPercent: 105, yPercent: 0, rotation: 2.5 },
  { xPercent: -105, yPercent: 0, rotation: -2.5 },
  { xPercent: 0, yPercent: 105, rotation: 1.5 },
  { xPercent: 0, yPercent: -105, rotation: -1.5 },
] as const;

export const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const media = gsap.matchMedia();

      if (!reduceMotion) {
        gsap.from(".project-intro-reveal", {
          y: 42,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
          },
        });
      }

      media.add("(min-width: 1024px)", () => {
        if (reduceMotion) return;

        const cleanups: Array<() => void> = [];
        const panels = gsap.utils.toArray<HTMLElement>(
          ".project-panel-shell",
          panelsRef.current,
        );

        panels.forEach((shell, index) => {
          const card = shell.querySelector<HTMLElement>(".project-panel");
          const image = shell.querySelector<HTMLElement>(
            ".project-panel-image",
          );
          const mediaFrame = shell.querySelector<HTMLElement>(
            ".project-panel-media",
          );
          const counter = shell.querySelector<HTMLElement>(
            ".project-panel-counter",
          );
          const fragment = shell.querySelector<HTMLElement>(
            ".project-panel-fragment",
          );
          const title = shell.querySelector<HTMLElement>(
            ".project-panel-ghost-title",
          );
          const progress = shell.querySelector<HTMLElement>(
            ".project-panel-progress",
          );
          const direction =
            entranceDirections[index % entranceDirections.length];

          if (!card || !image || !mediaFrame || !counter) return;

          gsap.fromTo(
            card,
            {
              xPercent: direction.xPercent,
              yPercent: direction.yPercent,
              rotation: direction.rotation,
            },
            {
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top 94%",
                end: "top 28%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: shell,
                start: "top 72%",
                end: "bottom 32%",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(
              image,
              { scale: 1.08, yPercent: -2 },
              { scale: 1, yPercent: 2, ease: "none" },
              0,
            )
            .fromTo(
              counter,
              { yPercent: 14, rotation: 3 },
              { yPercent: -14, rotation: -2, ease: "none" },
              0,
            )
            .fromTo(
              fragment,
              {
                xPercent: direction.xPercent ? direction.xPercent * 0.18 : 24,
                yPercent: direction.yPercent ? direction.yPercent * 0.12 : -18,
                rotation: direction.rotation * 4,
              },
              {
                xPercent: direction.xPercent ? direction.xPercent * -0.08 : -18,
                yPercent: direction.yPercent ? direction.yPercent * -0.06 : 12,
                rotation: direction.rotation * -2,
                ease: "none",
              },
              0,
            )
            .fromTo(
              title,
              { xPercent: index % 2 === 0 ? 6 : -6 },
              { xPercent: index % 2 === 0 ? -6 : 6, ease: "none" },
              0,
            )
            .fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

          const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          );
          if (!finePointer.matches) return;

          const mediaX = gsap.quickTo(mediaFrame, "x", {
            duration: 0.55,
            ease: "power3.out",
          });
          const mediaY = gsap.quickTo(mediaFrame, "y", {
            duration: 0.55,
            ease: "power3.out",
          });

          const handlePointerMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            const x = event.clientX - (bounds.left + bounds.width / 2);
            const y = event.clientY - (bounds.top + bounds.height / 2);

            mediaX(x * 0.012);
            mediaY(y * 0.009);
          };
          const reset = () => {
            mediaX(0);
            mediaY(0);
          };

          card.addEventListener("pointermove", handlePointerMove);
          card.addEventListener("pointerleave", reset);
          cleanups.push(() => {
            card.removeEventListener("pointermove", handlePointerMove);
            card.removeEventListener("pointerleave", reset);
          });
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      media.add("(max-width: 1023px)", () => {
        if (reduceMotion) return;

        const panels = gsap.utils.toArray<HTMLElement>(
          ".project-panel",
          panelsRef.current,
        );
        panels.forEach((panel, index) => {
          const image = panel.querySelector(".project-panel-image");
          const title = panel.querySelector(".project-panel-ghost-title");
          const direction =
            entranceDirections[index % entranceDirections.length];

          gsap.from(panel, {
            xPercent: direction.xPercent * 0.18,
            yPercent: direction.yPercent * 0.12,
            rotation: direction.rotation,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel.parentElement,
              start: "top 78%",
            },
          });
          gsap.fromTo(
            image,
            { scale: 1.08, yPercent: -3 },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
          gsap.fromTo(
            title,
            { xPercent: 10 },
            {
              xPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.8,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-20 -mt-12 overflow-hidden rounded-t-[3.5rem] bg-background pt-24 sm:-mt-20 sm:rounded-t-[7rem] sm:pt-36"
    >
      <div className="mx-auto mb-20 max-w-[96rem] px-5 sm:px-10 lg:mb-28">
        <div className="grid gap-8 lg:grid-cols-[0.28fr_1fr] lg:items-end lg:gap-16">
          <div className="project-intro-reveal font-mono text-[10px] uppercase tracking-[0.32em] text-primary/40 lg:pb-4">
            01 / Selected experiments
          </div>
          <div>
            <h2 className="project-intro-reveal max-w-6xl text-balance font-heading text-[clamp(4.5rem,10vw,11rem)] leading-[0.76] tracking-[-0.05em] text-primary">
              Side
              <span className="ml-[0.45em] italic">projects</span>
              <span className="block pl-[12vw] text-primary/22">
                after hours.
              </span>
            </h2>
            <p className="project-intro-reveal mt-7 max-w-xl text-sm leading-relaxed text-primary/58 sm:text-base">
              Experiments and useful tools built to turn side interests into
              working software.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={panelsRef}
        className="relative space-y-8 pb-28 sm:space-y-12 sm:pb-40 lg:space-y-16"
      >
        {projects.map((project, index) => (
          <ProjectPanel key={project.id} project={project} index={index} />
        ))}
      </div>

    </section>
  );
};

const ProjectPanel = ({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) => {
  const shape = projectShapes[index % projectShapes.length];
  const isPrimary = index % 2 === 0;
  const isReversed = index % 2 === 1;

  return (
    <article
      className="project-panel-shell relative isolate overflow-clip px-3 py-5 sm:px-6 sm:py-8 lg:min-h-dvh lg:px-[3vw] lg:py-[6vh]"
    >
      <div
        className={`project-panel relative mx-auto grid w-full max-w-[96rem] grid-rows-[auto_auto_1fr] overflow-hidden rounded-[2rem] border border-current/10 px-5 py-7 shadow-[0_2rem_6rem_rgba(20,18,16,0.12)] will-change-transform sm:rounded-[3rem] sm:px-10 lg:min-h-[min(52rem,88svh)] lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] lg:grid-rows-[auto_1fr_auto] lg:items-center lg:gap-x-16 lg:px-[5vw] lg:py-8 ${isPrimary ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        <div className="relative z-30 col-span-full flex items-center justify-between border-b border-current/15 pb-4 font-mono text-[8px] uppercase tracking-[0.28em]">
          <span className="opacity-55">
            Project / {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-3 opacity-55">
            Selected work
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--animated-accent)]" />
          </span>
        </div>

        <p
          aria-hidden="true"
          className="project-panel-ghost-title pointer-events-none absolute bottom-[2%] left-[-3%] z-0 w-[106%] whitespace-nowrap font-heading text-[clamp(7rem,14vw,15rem)] italic leading-none tracking-[-0.055em] opacity-[0.055] will-change-transform"
        >
          {project.name}
        </p>
        <span
          aria-hidden="true"
          className={`project-panel-counter pointer-events-none absolute top-[10%] z-0 select-none font-heading text-[clamp(10rem,22vw,24rem)] italic leading-none opacity-[0.06] will-change-transform ${isReversed ? "right-[42%]" : "left-[42%]"}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={`project-panel-media relative z-10 mt-7 aspect-[4/3] overflow-hidden bg-card will-change-transform lg:row-start-2 lg:mt-0 lg:h-[68vh] lg:aspect-auto ${isReversed ? "lg:order-2" : "lg:order-1"}`}
          style={{ clipPath: shape }}
        >
          <Image
            src={project.image}
            alt={`${project.name} project preview`}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="project-panel-image object-cover will-change-transform"
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>

        <div
          aria-hidden="true"
          className={`project-panel-fragment pointer-events-none absolute z-30 hidden aspect-[5/4] w-[20%] overflow-hidden border-[7px] shadow-2xl will-change-transform lg:block ${isPrimary ? "border-primary" : "border-secondary"} ${isReversed ? "bottom-[11%] right-[38%]" : "right-[35%] top-[14%]"}`}
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="20vw"
            className="scale-[1.65] object-cover"
          />
          <span className="absolute bottom-3 right-3 font-mono text-[7px] uppercase tracking-[0.2em] text-white/75">
            Detail / {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div
          className={`project-panel-content relative z-20 py-9 lg:row-start-2 lg:self-center lg:py-0 ${isReversed ? "lg:order-1 lg:pl-5" : "lg:order-2 lg:pr-4"}`}
        >
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-45">
            {index === 0 ? "Living project" : "Independent project"}
          </p>
          <h3 className="mt-6 max-w-3xl text-balance font-heading text-[clamp(3.5rem,6.2vw,7.5rem)] italic leading-[0.8] tracking-[-0.045em]">
            {project.name}
          </h3>
          <p className="mt-7 max-w-xl text-pretty text-sm leading-relaxed opacity-65 sm:text-base">
            {project.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[0.19em] opacity-45">
            {project.frameworks.map((framework) => (
              <span key={framework.id}>{framework.name}</span>
            ))}
          </div>
          <ProjectLinks project={project} />
        </div>

        <div className="relative z-30 col-span-full flex items-center gap-4 border-t border-current/15 pt-4">
          <div className="h-px flex-1 overflow-hidden bg-current/15">
            <span className="project-panel-progress block h-full w-full origin-left scale-x-0 bg-current opacity-75 motion-reduce:scale-x-100" />
          </div>
          <span className="font-mono text-[7px] tracking-[0.24em] opacity-45">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
};

const ProjectLinks = ({ project }: { project: (typeof projects)[number] }) => (
  <div className="relative z-40 mt-9 flex flex-wrap gap-3">
    {project.href && (
      <div className="group relative font-mono text-[9px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 [--animated-base-color:currentColor] [--hover-text-color:var(--animated-accent)] [&>div]:overflow-visible [&_.norris]:inline-flex [&_.norris]:min-h-12 [&_.norris]:items-center [&_.norris]:rounded-full [&_.norris]:border [&_.norris]:border-current/25 [&_.norris]:pl-12 [&_.norris]:pr-5 [&_.norris]:focus-visible:outline-2 [&_.norris]:focus-visible:outline-offset-4 [&_.norris]:focus-visible:outline-current">
        <Icon
          icon="mdi:open-in-new"
          className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-sm transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:translate-x-0.5 group-hover:text-[var(--animated-accent)]"
        />
        <AnimatedHoverText
          text="Visit project"
          fontSize="inherit"
          textColor="var(--hover-text-color)"
          href={project.href}
        />
      </div>
    )}
    {project.github && (
      <div className="group relative font-mono text-[9px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 [--animated-base-color:currentColor] [--hover-text-color:var(--animated-accent)] [&>div]:overflow-visible [&_.norris]:inline-flex [&_.norris]:min-h-12 [&_.norris]:items-center [&_.norris]:rounded-full [&_.norris]:border [&_.norris]:border-current/25 [&_.norris]:pl-12 [&_.norris]:pr-5 [&_.norris]:focus-visible:outline-2 [&_.norris]:focus-visible:outline-offset-4 [&_.norris]:focus-visible:outline-current">
        <Icon
          icon="mdi:github"
          className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-sm transition-transform duration-300 group-hover:-translate-y-[60%] group-hover:text-[var(--animated-accent)]"
        />
        <AnimatedHoverText
          text="Source"
          fontSize="inherit"
          textColor="var(--hover-text-color)"
          href={project.github}
        />
      </div>
    )}
  </div>
);
