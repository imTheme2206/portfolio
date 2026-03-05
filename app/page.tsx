"use client";

import { HeroIndex } from "@/app/sections/hero-section";
import gsap from "gsap";
import { Flip, ScrollTrigger, SplitText } from "gsap/all";
import ReactLenis from "lenis/react";
import { useLayoutEffect, useRef } from "react";
import { Gap } from "./components/gap";
import { NavBar } from "./components/navigation-bar";
import { Experiences } from "./sections/experiences-section";
import { About } from "./sections/about-section";
import { Skills } from "./sections/works-section";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
export default function Home() {
  const lenisRef = useRef<any | null>(null);

  useLayoutEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 750);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
        <main>
          <NavBar />
          <div className="w-dvw">
            <HeroIndex />
            <Skills />
            <Gap size="xl" />
          </div>
          <About />
          <Gap size="xl" />
          <Experiences />

          <Gap size="xl" />
          <Gap size="xl" />
          <Gap size="xl" />
          <Gap size="xl" />
          <Gap size="xl" />
          <Gap size="xl" />
          <Gap size="xl" />
          {/*
        <Gap size="lg" />
        <Gap size="lg" />
        */}
        </main>
      </ReactLenis>
    </>
  );
}
