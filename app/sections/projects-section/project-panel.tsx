import type { Project } from "@/app/constants";
import Image from "next/image";
import { ProjectLinks } from "./project-links";

const projectShapes = [
  // "ellipse(46% 48% at 52% 50%)",
  "polygon(5% 1%, 84% 2%, 95% 2%, 100% 82%, 92% 100%, 2% 94%, 0% 18%)",
  "polygon(5% 3%, 94% 0%, 100% 82%, 82% 100%, 2% 94%, 0% 18%)",
  "inset(2% 3% 5% 5% round 38% 4% 32% 7%)",
] as const;

type ProjectPanelProps = {
  project: Project;
  index: number;
  total: number;
};

export const ProjectPanel = ({ project, index, total }: ProjectPanelProps) => {
  const shape = projectShapes[index % projectShapes.length];
  const isPrimary = index % 2 === 0;
  const isReversed = index % 2 === 1;

  return (
    <article className="project-panel-shell relative isolate overflow-clip px-3 py-5 sm:px-6 sm:py-8 lg:min-h-dvh lg:px-[3vw] lg:py-[6vh]">
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
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
};
