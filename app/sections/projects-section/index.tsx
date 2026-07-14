"use client";

import { projects } from "@/app/constants";
import { ProjectPanel } from "./project-panel";
import { useProjectsAnimation } from "./use-projects-animation";

export const Projects = () => {
  const { sectionRef, panelsRef } = useProjectsAnimation();

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
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
};
