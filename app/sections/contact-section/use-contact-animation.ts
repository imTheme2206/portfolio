import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useContactAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const docsRowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lastSection = document.getElementById("last-section");
      const docCards = Array.from(docsRowRef.current?.children ?? []);

      gsap.set(infoRef.current, { y: 28, opacity: 0 });
      gsap.set(docCards, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lastSection,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(infoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }).to(
        docCards,
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.14,
          ease: "expo.out",
        },
        "-=0.2",
      );
    },
    { scope: sectionRef },
  );

  return { sectionRef, infoRef, docsRowRef };
};
