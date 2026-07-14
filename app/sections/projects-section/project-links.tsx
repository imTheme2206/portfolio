import type { Project } from "@/app/constants";
import { Icon } from "@iconify/react";

export const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="relative z-40 mt-9 flex flex-wrap gap-3">
    {project.href && (
      <div
        className="group font-mono text-[9px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 [--animated-base-color:currentColor] [--hover-text-color:var(--animated-accent)] [&>div]:overflow-visible grid place-items-center min-h-12 items-center rounded-full border border-current/25 px-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        data-cursor="clickable"
      >
        <Icon
          icon="mdi:open-in-new"
          className="pointer-events-none z-10 text-sm transition-transform duration-300 group-hover:-translate-y-[5%] group-hover:translate-x-0.1 group-hover:text-[var(--animated-accent)]"
        />
        {/*<AnimatedHoverText
          text="Visit project"
          fontSize="inherit"
          textColor="var(--hover-text-color)"
          href={project.href}
        />*/}
      </div>
    )}
    {project.github && (
      <div
        className="group font-mono text-[9px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 [--animated-base-color:currentColor] [--hover-text-color:var(--animated-accent)] [&>div]:overflow-visible grid place-items-center min-h-12 items-center rounded-full border border-current/25 px-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        data-cursor="clickable"
      >
        <Icon
          icon="mdi:github"
          className="pointer-events-none z-10 text-sm transition-transform duration-300 group-hover:-translate-y-[5%] group-hover:translate-x-0.1 group-hover:text-[var(--animated-accent)]"
        />
        {/*<AnimatedHoverText
          text="Source"
          fontSize="inherit"
          textColor="var(--hover-text-color)"
          href={project.github}
        />*/}
      </div>
    )}
  </div>
);
