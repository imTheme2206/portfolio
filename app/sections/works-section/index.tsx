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
  // {
  //   text: "GSAP",
  //   icon: "GSAP",
  // },
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

  // useGSAP(
  //   () => {
  //     const scrollContents =
  //       gsap.utils.toArray<HTMLElement>(".scroll-contents");
  //     const totalSlides = scrollContents.length;
  //     const slidePercent = 100 / totalSlides;

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top top",
  //         end: `+=${window.innerWidth * totalSlides}`,
  //         scrub: 0.5,
  //         pin: true,
  //         anticipatePin: 1,
  //       },
  //     });

  //     for (let i = 0; i < totalSlides; i++) {
  //       const from = -slidePercent * i;
  //       const to = -slidePercent * (i + 1);
  //       const mid = (from + to) / 2;

  //       // resist zone: slow crawl out of the current card position
  //       tl.fromTo(
  //         trackRef.current,
  //         { xPercent: from },
  //         { xPercent: mid, duration: 0.7, ease: "power3.in" },
  //       );

  //       // release zone: fast movement into the next card position
  //       tl.to(trackRef.current, {
  //         xPercent: to,
  //         duration: 0.3,
  //         ease: "power1.out",
  //       });
  //     }
  //   },
  //   { scope: sectionRef },
  // );

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
        {/*<Marquee
          reverse
          speed={0.5}
        />*/}
      </section>
    </section>
  );
};
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useRef } from "react";

// export const Experiences = () => {
//   const sectionRef = useRef<HTMLTableSectionElement | null>(null);
//   const trackRef = useRef<HTMLDivElement | null>(null);

//   useGSAP(
//     () => {
//       const scrollContents =
//         gsap.utils.toArray<HTMLElement>(".scroll-contents");

//       const totalWidth =
//         scrollContents.reduce((acc, card) => acc + card.offsetWidth, 0) +
//         (scrollContents.length + 1) * 32; // gap-8 = 32px

//       gsap.to(trackRef.current, {
//         x: () => -(totalWidth - window.innerWidth),
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: () => `+=${totalWidth}`,
//           scrub: true,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section className="relative overflow-hidden">
//       <section ref={sectionRef} className="relative h-screen overflow-hidden">
//         <div className=" absolute top-50 left-20 text-7xl">WORK EXP</div>
//         <div
//           ref={trackRef}
//           className="flex gap-16 h-full items-center px-20 will-change-transform"
//         >
//           <div className="scroll-contents min-w-[80vw]"></div>
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="scroll-contents card min-w-[80vw] h-[75vh] rounded-2xl border-2 border-stone-800 backdrop-blur-md border-solid flex items-center justify-center text-6xl font-bold text-white"
//             >
//               Card {i}
//             </div>
//           ))}
//           <div className="scroll-contents min-w-screen"></div>
//         </div>
//       </section>
//     </section>
//   );
// };
