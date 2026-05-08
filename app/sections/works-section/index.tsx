"use client";

import { Marquee } from "@/app/components/marquee";
import { Icon } from "@iconify/react";
import React from "react";

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
  return (
    <section className="relative overflow-hidden">
      <section className="relative overflow-hidden flex flex-col gap-6 py-6 bg-secondary-foreground text-primary-foreground">
        <Marquee speed={0.5} reverse>
          {[...frameworks, ...frameworks, ...frameworks].map((l, index) => (
            <React.Fragment key={index}>
              {l.text !== "" ? (
                <div className="flex gap-2 text-2xl font-semibold w-42 mx-12 items-center group">
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
