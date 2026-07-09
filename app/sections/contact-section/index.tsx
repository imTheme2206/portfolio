"use client";

import { AnimatedHeader } from "@/app/components/animated-header";
import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { Marquee } from "@/app/components/marquee";
import { contact, documents, socials } from "@/app/constants";
import { useDetectScreen } from "@/app/hook/use-detect-screen";
import Link from "next/link";
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
      className={`h-dvh min-h-dvh inset-0 w-full bottom-0 sticky flex items-end ${isScrollToBottom ? "" : "-z-10"}`}
    >
      <div className="flex h-full w-full flex-col">
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
  const { sectionRef, statusRef, headlineRef, infoRef, docsRowRef, footerRef } =
    useContactAnimation();

  return (
    <>
      <section
        ref={sectionRef}
        id="contact-section"
        className="relative inset-0 z-0 flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-4 py-5 sm:px-10 sm:py-8"
        aria-label="Contact"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/20"
        />

        <div className="relative z-20 flex flex-col gap-4 md:gap-5">
          <AnimatedHeader title={contact.title} disableFlyMotion />

          <div
            ref={statusRef}
            className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/50 sm:text-xs"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--animated-accent)]" />
            <span>Available for selected work</span>
            <span className="hidden h-px w-10 bg-primary/20 sm:inline-flex" />
            <span>Bangkok · Remote friendly</span>
          </div>

          {/*<div ref={headlineRef} className="max-w-6xl">
            <h2 className="font-heading text-5xl italic leading-[0.92] text-primary text-balance sm:text-7xl lg:text-8xl">
              Let&apos;s build something useful.
            </h2>
          </div>*/}
        </div>

        <div className="relative z-20 mt-6 flex flex-col gap-5">
          <div
            className="docs-scroll order-2 overflow-x-auto pb-1 md:overflow-visible"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div
              ref={docsRowRef}
              className="grid min-w-[38rem] grid-cols-2 gap-4 md:min-w-0"
            >
              {documents.map((doc) => (
                <DocumentTicket key={doc.type} document={doc} />
              ))}
            </div>
          </div>

          <div
            ref={infoRef}
            className="order-1 grid grid-cols-1 gap-3 md:grid-cols-[minmax(18rem,1.2fr)_minmax(10rem,0.45fr)]"
          >
            <ContactAction
              eyebrow="Start here"
              label={contact.email}
              href={`mailto:${contact.email}`}
              isPrimary
            />
            <ContactAction
              eyebrow="Call"
              label={contact.tel}
              href={`tel:${contact.tel}`}
            />
          </div>

          <div
            ref={footerRef}
            className="relative z-20 order-3 flex items-start justify-between gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary/65 sm:text-base">
              {contact.footer.right}
            </span>
            <span className="text-right text-[10px] uppercase tracking-[0.25em] text-primary/65 sm:text-base">
              {contact.footer.left}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

const DocumentTicket = ({
  document,
}: {
  document: (typeof documents)[number];
}) => {
  return (
    <Link
      data-cursor="clickable"
      href={document.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid min-h-28 grid-cols-[5rem_1fr] sm:grid-cols-[12rem_1fr] items-stretch overflow-hidden border-y border-primary/15 text-primary transition-colors duration-300 hover:border-primary/45"
    >
      <div className="flex items-center justify-center border-r border-primary/15 pr-4">
        <span className="font-heading text-xl italic leading-none sm:text-5xl">
          {document.type}
        </span>
      </div>
      <div className="flex flex-col justify-between py-4 pl-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/40">
            Document · PDF
          </p>
          <p className="mt-2 text-base font-light leading-snug text-primary/75">
            {document.label}
          </p>
        </div>
        <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/45 transition-colors duration-300 group-hover:text-primary">
          Open file
        </span>
      </div>
    </Link>
  );
};

const ContactAction = ({
  eyebrow,
  label,
  href,
  isPrimary = false,
}: {
  eyebrow: string;
  label: string;
  href: string;
  isPrimary?: boolean;
}) => {
  return (
    <Link
      data-cursor="clickable"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group flex min-h-28 flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        isPrimary
          ? "border-primary bg-primary text-primary-foreground"
          : "border-primary/15 bg-background/40 text-primary backdrop-blur-md hover:border-primary/35"
      }`}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.28em] ${
          isPrimary ? "text-primary-foreground/50" : "text-primary/45"
        }`}
      >
        {eyebrow}
      </span>
      <span className="text-lg font-light leading-tight sm:text-xl">
        {label}
      </span>
      <span
        className={`mt-4 h-px w-10 transition-all duration-300 group-hover:w-full ${
          isPrimary ? "bg-primary-foreground/35" : "bg-primary/30"
        }`}
      />
    </Link>
  );
};
