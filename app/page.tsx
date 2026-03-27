"use client";

import { HeroIndex } from "@/app/sections/hero-section";
import gsap from "gsap";
import { Flip, ScrollTrigger, SplitText } from "gsap/all";
import { Gap } from "./components/gap";
import { NavBar } from "./components/navigation-bar/index";
import { About } from "./sections/about-section";
import { Contacts } from "./sections/contact-section";
import { Experiences } from "./sections/experiences-section";
import { Projects } from "./sections/projects-section";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
export default function Home() {
  return (
    <>
      <main className="h-full relative bg-background z-20 rounded-4xl">
        <NavBar />
        <HeroIndex />
        {/*<Skills />*/}
        {/*<div className="w-dvw">
        </div>*/}

        <About />
        <Projects />
        <Gap size="xl" />
        <Experiences />
        {/*
        <Gap size="lg" />
        <Gap size="lg" />
        */}
      </main>
      <Contacts />
    </>
  );
}
