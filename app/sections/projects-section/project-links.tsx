import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import type { Project } from "@/app/constants";
import { Icon } from "@iconify/react";

export const ProjectLinks = ({ project }: { project: Project }) => (
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
