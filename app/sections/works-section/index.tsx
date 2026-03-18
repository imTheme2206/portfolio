"use client";

import { Marquee } from "@/app/components/marquee";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import React, { useRef } from "react";

const frameworks = [
  {
    text: "Next.JS",
    icon: "nextjs-dark",
  },
  {
    text: "React.JS",
    icon: "react-dark",
  },
  {
    text: "Laravel",
    icon: "laravel-dark",
  },
  {
    text: "Node.JS",
    icon: "nodejs-dark",
  },
  {
    text: "Vue.JS",
    icon: "vuejs-dark",
  },
  {
    text: "",
    icon: "",
  },
];
const languages = [
  {
    text: "JavaScript",
    icon: "javascript",
  },
  {
    text: "TypeScript",
    icon: "typescript",
  },
  {
    text: "HTML",
    icon: "HTML",
  },
  {
    text: "CSS",
    icon: "CSS",
  },
  {
    text: "PHP",
    icon: "php-dark",
  },
  {
    text: "Go",
    icon: "golang",
  },
  {
    text: "",
    icon: "",
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLTableSectionElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const scrollContents =
        gsap.utils.toArray<HTMLElement>(".scroll-contents");
      const totalSlides = scrollContents.length;

      gsap.to(trackRef.current, {
        xPercent: -(100 * totalSlides),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerWidth * totalSlides}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="relative overflow-hidden">
      <section
        ref={sectionRef}
        className="relative overflow-hidden flex flex-col gap-12 py-6 bg-secondary-foreground text-primary-foreground"
      >
        <Marquee speed={0.5}>
          {[...languages, ...languages, ...languages].map((l, index) => (
            <React.Fragment key={index}>
              {l.text !== "" ? (
                <div className="flex gap-2 text-2xl font-semibold w-42 mx-24 items-center group">
                  <Icon
                    icon={`skill-icons:${l.icon.toLowerCase()}`}
                    className="size-8 grayscale group-hover:grayscale-0 will-change-transform transition-all"
                  />
                  {l.text}
                </div>
              ) : (
                <div className=""></div>
              )}
            </React.Fragment>
          ))}
        </Marquee>
        <Marquee speed={0.5} reverse>
          {[...frameworks, ...frameworks, ...frameworks].map((l, index) => (
            <React.Fragment key={index}>
              {l.text !== "" ? (
                <div className="flex gap-2 text-2xl font-semibold w-42 mx-24 items-center group">
                  <Icon
                    icon={`skill-icons:${l.icon.toLowerCase()}`}
                    className="size-8 grayscale group-hover:grayscale-0 will-change-transform transition-all"
                  />
                  {l.text}
                </div>
              ) : (
                <div className=""></div>
              )}
            </React.Fragment>
          ))}
        </Marquee>
      </section>
    </section>
  );
};
