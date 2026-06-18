"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { DocumentCard } from "@/app/components/document-card";
import { Marquee } from "@/app/components/marquee";
import { contact, documents, socials } from "@/app/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useEffect, useRef, useState } from "react";

export const Contacts = () => {
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrollToBottom(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`min-h-screen inset-0 w-full bottom-0 sticky flex items-end ${isScrollToBottom ? "" : "-z-10"}`}
    >
      <div className="w-full">
        <ContactSection />
        <div>
          <div ref={sentinelRef} aria-hidden="true" />

          <Marquee speed={0.5}>
            {[...socials, ...socials, ...socials].map((l, index) => (
              <React.Fragment key={index}>
                {l.title !== "" ? (
                  <div className="flex gap-2 text-2xl font-semibold mx-24 w-full items-center group">
                    <AnimatedHoverText
                      text={l.title}
                      fontSize="5rem"
                      textColor={l.textColor}
                      href={l.link}
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
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const docsLabelRef = useRef<HTMLParagraphElement>(null);
  const docsRowRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#last-section",
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

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
          <AnimatedHeader title={contact.title} />
        </div>

        <div className="relative z-20 flex flex-col gap-5">
          {/*<p
            ref={docsLabelRef}
            className="text-paragraph leading-relaxed uppercase tracking-[0.3em] text-primary px-4"
          >
            {contact.docsLabel}
          </p>*/}

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
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.type}
                  type={doc.type}
                  label={doc.label}
                  href={doc.href}
                  preview={doc.preview}
                />
              ))}
            </div>
          </div>

          <div
            ref={infoRef}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-2"
          >
            <div className="flex gap-2 px-4 items-center">
              <span className="text-2xl uppercase tracking-[0.25em] text-primary">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-xl"
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {contact.email}
              </a>
            </div>
            <div className="flex gap-2 px-4 items-center">
              <span className="text-2xl uppercase tracking-[0.25em] text-primary">
                Tel
              </span>
              <a
                href={`tel:${contact.tel}`}
                className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-xl"
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {contact.tel}
              </a>
            </div>
          </div>
          <div className="relative z-20 flex items-start justify-between px-4">
            <span className="text-base uppercase tracking-[0.25em] text-primary">
              {contact.footer.right}
            </span>
            <span className="text-base uppercase tracking-[0.25em] text-primary">
              {contact.footer.left}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
