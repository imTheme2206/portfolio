import { prefersReducedMotion } from "@/app/hook/use-reduced-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useContactAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .from(
          ruleRef.current,
          { scaleX: 0, duration: 0.7, ease: "power3.out" },
        )
        .from(headingRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        }, "-=0.5")
        .from(emailRef.current, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        }, "-=0.25");
    },
    { scope: sectionRef },
  );

  return { sectionRef, ruleRef, headingRef, emailRef };
};
