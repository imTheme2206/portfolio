"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { DocumentCard } from "@/app/components/document-card";
import { Marquee } from "@/app/components/marquee";
import { contact, documents, socials } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import React, { useEffect, useRef, useState } from "react";
import { useContactAnimation } from "./use-contact-animation";

export const Contacts = () => {
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const screen = useDetectScreen();

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
                  <div className="flex gap-2 text-2xl font-semibold mx-24 mb-6 mt-4 sm:mb-0 w-full items-center group">
                    <AnimatedHoverText
                      text={l.title}
                      fontSize={screen.isDesktop ? "5rem" : "3rem"}
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

const ContactSection = () => {
  const { sectionRef, infoRef, docsRowRef } = useContactAnimation();

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
          <div
            className="docs-scroll overflow-x-auto pb-1 mb-6 md:overflow-visible grid place-items-center"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div
              ref={docsRowRef}
              className="flex w-full md:justify-center gap-4 md:gap-10 px-4"
            >
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
              <span className="text-base sm:text-2xl uppercase tracking-[0.25em] text-primary">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-sm sm:text-xl"
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {contact.email}
              </a>
            </div>
            <div className="flex gap-2 px-4 items-center">
              <span className=" text-base sm:text-2xl uppercase tracking-[0.25em] text-primary">
                Tel
              </span>
              <a
                href={`tel:${contact.tel}`}
                className="contact-email text-primary/40 transition-colors duration-300 hover:text-primary text-sm sm:text-xl"
                style={{
                  letterSpacing: "-0.01em",
                }}
              >
                {contact.tel}
              </a>
            </div>
          </div>
          <div className="relative z-20 flex items-start justify-between px-4">
            <span className=" text-[10px] sm:text-base uppercase tracking-[0.25em] text-primary">
              {contact.footer.right}
            </span>
            <span className=" text-[10px] sm:text-base uppercase tracking-[0.25em] text-primary">
              {contact.footer.left}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
