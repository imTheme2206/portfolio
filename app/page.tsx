"use client";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { NavBar } from "./components/navigation-bar";
import { About } from "./sections/about-section";
import { Contacts } from "./sections/contact-section";
import { Experiences } from "./sections/experiences-section";
import { HeroIndex } from "./sections/hero-section";
import { Projects } from "./sections/projects-section";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <>
      <NavBar />
      <main className="relative z-20 bg-background">
        <HeroIndex />
        <Projects />
        <About />
        <Experiences />
        <Contacts />
      </main>
    </>
  );
}
