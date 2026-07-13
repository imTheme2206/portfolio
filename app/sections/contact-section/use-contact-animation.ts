import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useContactAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const docsRowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lastSection = document.getElementById("last-section");
      if (!lastSection) return;

      const docCards = Array.from(docsRowRef.current?.children ?? []);
      const infoCards = Array.from(infoRef.current?.children ?? []);
      const statusDot = statusRef.current?.querySelector("span") ?? null;

      gsap.set([statusRef.current, footerRef.current], {
        y: 28,
        opacity: 0,
      });
      gsap.set([...docCards, ...infoCards], {
        y: 44,
        opacity: 0,
        rotateX: -7,
        transformPerspective: 900,
        transformOrigin: "center top",
      });

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
      });

      if (statusDot) {
        tl.to(
          statusDot,
          {
            scale: 1.8,
            repeat: 1,
            yoyo: true,
            duration: 0.28,
            ease: "power2.inOut",
          },
          "-=0.05",
        );
      }

      tl.to(
        docCards,
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.62,
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
            duration: 0.01,
          },
          "-=0.24",
        )
        .to(
          infoCards,
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.58,
            stagger: 0.09,
            ease: "expo.out",
          },
          "<",
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

  return { sectionRef, statusRef, infoRef, docsRowRef, footerRef };
};
