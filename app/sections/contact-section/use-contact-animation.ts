import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useContactAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const docsRowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lastSection = document.getElementById("last-section");
      const docCards = Array.from(docsRowRef.current?.children ?? []);

      gsap.set(
        [
          statusRef.current,
          headlineRef.current,
          infoRef.current,
          footerRef.current,
        ],
        {
          y: 28,
          opacity: 0,
        },
      );
      gsap.set(docCards, { y: 40, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: lastSection,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(statusRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      })
        .to(
          headlineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "circ.out",
          },
          "-=0.12",
        )
        .to(
          docCards,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=0.18",
        )
        .to(
          infoRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.24",
        )
        .to(
          footerRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.2",
        );
    },
    { scope: sectionRef },
  );

  return { sectionRef, statusRef, headlineRef, infoRef, docsRowRef, footerRef };
};
