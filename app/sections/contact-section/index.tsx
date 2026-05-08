"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { DocumentCard } from "@/app/components/document-card";
import { Marquee } from "@/app/components/marquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useEffect, useRef, useState } from "react";

const email = "pkk.theme@gmail.com";
const socials = [
  {
    title: "facebook",
    link: "",
    textColor: "#4267B2",
  },
  {
    title: "github",
    link: "",
    textColor: "#2dba4e",
  },
  {
    title: "instagram",
    link: "",
    textColor: "#C13584",
  },
  {
    title: "line",
    link: "",
    textColor: "#06c755",
  },
  {
    title: "linkedin",
    link: "",
    textColor: "#0e76a8",
  },
  {
    title: "",
    link: "",
  },
];

export const Contacts = (props: { ref?: HTMLDivElement }) => {
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight + containerRef.current.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;
    setIsScrollToBottom(scrollTop + windowHeight >= documentHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen inset-0 w-full bottom-0 sticky flex items-end ${isScrollToBottom ? "" : "-z-10"}`}
    >
      <div className="w-full">
        <ContactSection {...props} />
        <div>
          <Marquee speed={0.5}>
            {[...socials, ...socials, ...socials].map((l, index) => (
              <React.Fragment key={index}>
                {l.title !== "" ? (
                  <div className="flex gap-2 text-2xl font-semibold mx-24 w-full items-center group">
                    <AnimatedHoverText
                      text={l.title}
                      fontSize="5rem"
                      textColor={l.textColor}
                    />
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </React.Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function ContactSection(props: { ref?: HTMLDivElement }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const docsLabelRef = useRef<HTMLParagraphElement>(null);
  const docsRowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.ref) {
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          scrollTrigger: {
            trigger: props.ref!,
            start: "top bottom",
            onLeave: () => tl.play(),
            onEnterBack: () => tl.reverse(),
          },
        },
      });

      // ── Initial states ───────────────────────────────────────────────────
      gsap.set(
        [
          infoRef.current,
          dividerRef.current,
          docsLabelRef.current,
          footerRef.current,
        ],
        { y: 28, opacity: 0 },
      );
      gsap.set(docsRowRef.current?.querySelectorAll(".doc-card") ?? [], {
        y: 40,
        opacity: 0,
      });

      // ── Timeline ─────────────────────────────────────────────────────────
      tl.to(
        dividerRef.current,
        { scaleX: 1, opacity: 1, duration: 0.4, ease: "expo.out" },
        "-=0.3",
      )
        .to(infoRef.current, { y: 0, opacity: 1, duration: 0.3 }, "-=0.4")
        .to(docsLabelRef.current, { y: 0, opacity: 1, duration: 0.3 }, "-=0.3")
        .to(
          docsRowRef.current?.querySelectorAll(".doc-card") ?? [],
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.14,
            ease: "expo.out",
          },
          "-=0.3",
        )
        .to(footerRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact-section"
        className=" inset-0 z-0 flex flex-col justify-between overflow-hidden px-0"
        aria-label="Contact"
      >
        <div className="relative z-20 flex flex-col mb-8 md:mb-10">
          <AnimatedHeader title="Contact" />
        </div>

        <div className="relative z-20 flex flex-col gap-5">
          <p
            ref={docsLabelRef}
            className="text-paragraph leading-relaxed uppercase tracking-[0.3em] text-primary px-4"
          >
            Documents
          </p>

          {/* Cards row — horizontal scroll on mobile, flex on desktop */}
          <div
            ref={docsRowRef}
            className="docs-scroll overflow-x-auto pb-1 mb-6 md:overflow-visible grid place-items-center"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div className="flex gap-4 md:gap-10 px-4">
              <DocumentCard
                type="CV"
                label="Curriculum Vitae · PDF"
                href="/cv.pdf"
              />
              <DocumentCard
                type="Resume"
                label="Resume · PDF"
                href="/resume.pdf"
              />
            </div>
          </div>

          <div
            ref={infoRef}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-12"
          >
            <div className="flex gap-2 px-4 items-center">
              <span className="text-paragraph uppercase tracking-[0.25em] text-primary">
                Email
              </span>
              <a
                href={`mailto:${email}`}
                className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-paragraph"
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {email}
              </a>
            </div>
          </div>
          <div className="relative z-20 flex items-start justify-between px-4">
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              Portfolio · 2026
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              Based in Bangkok
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
