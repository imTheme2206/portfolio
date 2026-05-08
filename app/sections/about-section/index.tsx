"use client";

import { Divider } from "@/app/components/divider";
import { SplitText } from "@/app/components/split-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  let ctx: gsap.Context = gsap.context(() => {});
  useGSAP(() => {
    ctx = gsap.context(() => {
      // ── Image parallax ──
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
          yPercent: -20,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden pb-25"
      // style={{
      //   padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px) 0",
      // }}
    >
      <div>
        <div className="perspective-distant flex items-center gap-x-8 my-14 px-12">
          <SplitText
            component="h2"
            className="w-full max-w-fit text-primary"
            animation="byChar"
            style={{
              fontSize: "clamp(3rem, 8vw, 8.5rem)",
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            About Me
          </SplitText>
          <Divider className="bg-foreground h-px w-full" />
        </div>
      </div>
      <div className="px-10 md:px-14 lg:px-32">
        {/* Row 1 — Label + Heading */}

        {/* Row 2 — Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{
            gap: "clamp(40px, 5vw, 80px)",
          }}
        >
          {/* Left col */}
          <div>
            {/* Image frame */}
            <div
              ref={imgRef}
              className="img-frame object-cover mt-12 w-full overflow-hidden mb-10 rounded-b-md"
            >
              <Image
                height={420}
                width={560}
                loading="lazy"
                layout="responsive"
                src="/assets/images/hero-section/hero-4.webp"
                alt="test"
                className="object-center"
              />
            </div>
          </div>

          {/* Right col */}
          <div className="pt-4 px-6">
            {/* Divider */}
            <Divider className="bg-foreground h-px mb-8" />

            {/* Bio */}
            <SplitText
              component="p"
              animation="byWord"
              className="text-paragraph"
              style={{
                marginBottom: "48px",
                fontWeight: 400,
              }}
            >
              I'm a software developer obsessed with the intersection of
              engineering precision and design intention. I build interfaces
              that feel inevitable — where every pixel has a reason, every
              transition earns its place, and performance is never optional.
            </SplitText>

            <SplitText
              component="p"
              animation="byWord"
              className="text-paragraph"
              style={{
                marginBottom: "48px",
                fontWeight: 400,
              }}
            >
              My background spans product startups, agency work, and
              open-source. I care deeply about the craft: readable code,
              thoughtful abstractions, and systems that scale without losing
              their soul.
            </SplitText>
          </div>
        </div>
      </div>
    </section>
  );
}
