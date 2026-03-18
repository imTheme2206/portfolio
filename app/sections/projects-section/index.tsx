import { AnimatedHeader } from "@/app/components/animated-header";
import { projects } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const Projects = () => {
  const overlayRefs = useRef<HTMLDivElement[]>([]);
  const projectDesc = "This is what a free time gets me";
  useGSAP(() => {});

  const handleMouseEnter = (index: number) => {
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        // scaleY: 0,
        // transformOrigin: "bottom",
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        // scaleY: 1,
        duration: 0.15,
        ease: "power2.out",
      },
    );
  };

  const handleMouseLeave = (index: number) => {
    const el = overlayRefs.current[index];
    if (!el) return;

    // gsap.killTweensOf(el);
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
        title={"Projects"}
        text={projectDesc}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-normal">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            data-cursor="thumbnail"
            data-image={`/assets/images/hero-section/hero-${index + 1}.webp`}
          >
            <div
              ref={(el) => {
                if (overlayRefs.current) {
                  overlayRefs.current[index] = el as HTMLDivElement;
                }
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-accent-foreground -z-10 will-change-[clip-path]  clip-path"
            />

            <div className="flex justify-between px-10 text-accent-foreground transition-all duration-500 md:group-hover:px-12 md:group-hover:text-primary-foreground">
              <h4 className="lg:text-4xl text-3xl leading-none mb-1">
                {project.name}
              </h4>
            </div>

            <div className="w-full h-0.5 my-0.5 bg-accent-foreground/80"></div>

            <div className="flex px-10 text-md leading-loose uppercase transtion-all duration-500 md:text-lg gap-x-4 md:group-hover:px-12 py-1">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-primary transition-colors duration-500 md:group-hover:text-primary-foreground font-bold"
                >
                  {framework.name}
                </p>
              ))}
            </div>

            <div className="flex px-10 text-md leading-loose transtion-all duration-500 md:text-lg py-4 gap-x-5 md:group-hover:px-12">
              <div className="text-primary transition-colors duration-500 md:group-hover:text-primary-foreground">
                {project.description}
              </div>
            </div>
            <div className="relative flex items-center justify-center px-10 md:hidden h-100">
              <div className="object-cover w-full h-full rounded-md brightness-10 bg-accent-foreground"></div>
              <img
                src={project.image}
                alt={`${project.name}-image`}
                className="absolute bg-center px-14 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
