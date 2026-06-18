"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Gap } from "./components/gap";
import { About } from "./sections/about-section";
import { Contacts } from "./sections/contact-section";
import { Experiences } from "./sections/experiences-section";
import { HeroIndex } from "./sections/hero-section";
import { Projects } from "./sections/projects-section";
import { Skills } from "./sections/works-section";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <>
      <main className="h-full relative bg-background z-20">
        <HeroIndex />
        <Skills />
        <About />
        <Gap size="xl" />
        <Projects />
        <Gap size="xl" />
        <Experiences />
        <div />
      </main>
      <Contacts />
    </>
  );
}
