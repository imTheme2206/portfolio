import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const Experiences = () => {
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
      <section ref={sectionRef} className="relative h-screen overflow-hidden">
        <div className=" absolute top-50 left-20 text-7xl">WORK EXP</div>
        <div
          ref={trackRef}
          className="flex h-full items-center will-change-transform"
        >
          <div className="scroll-contents min-w-svw min-h-svh"></div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="scroll-contents card min-w-svw min-h-svh rounded-2xl border-2 border-stone-800 backdrop-blur-md border-solid flex items-center justify-center text-6xl font-bold text-white"
            >
              Card {i}
            </div>
          ))}
          <div className="scroll-contents min-w-screen"></div>
        </div>
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
