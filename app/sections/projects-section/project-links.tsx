import type { Project } from "@/app/constants";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="relative z-40 mt-9 flex flex-wrap gap-3">
    {project.href && (
      <ProjectLinkButton href={project.href} type="open-in-new" />
    )}
    {project.github && (
      <ProjectLinkButton href={project.github} type="github" />
    )}
  </div>
);

const ProjectLinkButton = ({
  href,
  type,
}: {
  href: string;
  type: "github" | "open-in-new";
}) => {
  return (
    <Link href={href}>
      <div
        className="group font-mono text-[9px] uppercase tracking-[0.22em] opacity-85 transition-opacity hover:opacity-100 [--animated-base-color:currentColor] [--hover-text-color:var(--animated-accent)] [&>div]:overflow-visible grid place-items-center min-h-12 items-center rounded-full border border-current/25 px-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        data-cursor="clickable"
      >
        <Icon
          icon={`mdi:${type}`}
          className="pointer-events-none z-10 text-sm transition-transform duration-300 group-hover:-translate-y-[5%] group-hover:translate-x-0.1 group-hover:text-(--animated-accent)"
        />
      </div>
    </Link>
  );
};
