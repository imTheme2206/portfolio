import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { Marquee } from "@/app/components/marquee";
import React from "react";

const socials = [
  {
    title: "instagram",
    link: "",
  },
  {
    title: "linkedin",
    link: "",
  },
  {
    title: "facebook",
    link: "",
  },
  {
    title: "github",
    link: "",
  },
  {
    title: "",
    link: "",
  },
];

export const Contacts = () => {
  return (
    <div>
      <Marquee speed={0.5}>
        {[...socials, ...socials, ...socials].map((l, index) => (
          <React.Fragment key={index}>
            {l.title !== "" ? (
              <div className="flex gap-2 text-2xl font-semibold mx-24 w-full items-center group">
                <AnimatedHoverText text={l.title} fontSize="5rem" />
              </div>
            ) : (
              <div className=""></div>
            )}
          </React.Fragment>
        ))}
      </Marquee>
    </div>
  );
};
