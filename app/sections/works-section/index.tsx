"use client";

import { Marquee } from "@/app/components/marquee";
import { skillFrameworks } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import React, { useRef } from "react";

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const railMaskRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!railMaskRef.current) return;

      gsap.fromTo(
        railMaskRef.current,
        {
          clipPath: "inset(0% 100% 0% 0%)",
          y: 24,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <section
        ref={railMaskRef}
        className="relative overflow-hidden flex flex-col gap-6 py-6 bg-secondary-foreground text-primary-foreground will-change-[clip-path,transform]"
      >
        <Marquee speed={0.5} reverse>
          {[...skillFrameworks, ...skillFrameworks, ...skillFrameworks].map(
            (l, index) => (
              <React.Fragment key={index}>
                {l.text !== "" ? (
                  <div className="flex gap-2 text-2xl font-semibold w-42 mx-12 items-center group transition-transform duration-300 hover:-translate-y-1">
                    <Icon
                      icon={`skill-icons:${l.icon.toLowerCase()}`}
                      className="size-8 grayscale transition-all duration-300 will-change-transform group-hover:rotate-3 group-hover:scale-110 group-hover:grayscale-0"
                    />
                    {l.text}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </React.Fragment>
            ),
          )}
        </Marquee>
      </section>
    </section>
  );
};
