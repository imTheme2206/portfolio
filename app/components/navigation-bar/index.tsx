"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const commonAnimationEasing = {
  duration: 0.25,
  ease: "power1.inOut",
};

export const NavBar = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nameBadgeRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "bottom top",
        toggleActions: "reverse play play reverse",
      },
    });

    navTween.fromTo(
      navRef.current,
      {
        backgroundColor: "transparent",
        pointerEvents: "none",
      },
      {
        ...commonAnimationEasing,
        // backgroundColor: "rgba(11,11,11,0.2)",
        // backdropFilter: "blur(10px)",
        pointerEvents: "auto",
      },
      0,
    );

    navTween.fromTo(
      containerRef.current,
      {
        x: "0",
      },
      {
        ...commonAnimationEasing,
        x: "5vw 0",
      },
      0,
    );

    navTween.fromTo(
      nameBadgeRef.current,
      {
        width: 0,
        opacity: 0,
      },
      {
        ...commonAnimationEasing,
        width: "100%",
        opacity: 1,
      },
      0,
    );
  });

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-100">
      <div
        id="nav-contents"
        className={`w-full h-20 px-6 text-2xl flex items-center`}
      >
        <div
          ref={nameBadgeRef}
          className="origin-left w-0 opacity-0 whitespace-nowrap"
        >
          imTheme
        </div>
        <div
          ref={containerRef}
          className="flex gap-6 mx-auto uppercase align-middle font-semibold will-change-transform"
        ></div>
      </div>
    </nav>
  );
};
