"use client";

import { contact, documents, socials } from "@/app/constants";
import Link from "next/link";
import { useContactAnimation } from "./use-contact-animation";

export const Contacts = () => {
  const { sectionRef, ruleRef, headingRef, emailRef } = useContactAnimation();

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      aria-label="Contact"
      className="relative z-40 -mt-px bg-background text-primary"
    >
      <div className="mx-auto flex min-h-dvh w-full max-w-[96rem] flex-col px-5 pb-24 pt-9 sm:px-10 sm:pb-10 sm:pt-12">
        <div
          ref={headingRef}
          className="relative grid gap-7 pt-6 lg:grid-cols-[0.28fr_1fr] lg:gap-16"
        >
          <span
            ref={ruleRef}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left bg-primary/25"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-primary/65">
            04 / Contact
          </p>
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-4">
            <h2 className="font-heading text-5xl leading-none tracking-tight sm:text-7xl">
              {contact.title}
              <span className="text-animated-accent">.</span>
            </h2>
            <p className="flex items-center gap-3 pt-2 font-mono text-xs uppercase tracking-widest text-primary/65">
              <span className="h-2 w-2 shrink-0 rounded-full bg-animated-accent" />
              Available for selected work
            </p>
          </div>
        </div>

        <div
          ref={emailRef}
          className="flex flex-1 flex-col justify-center py-20 sm:py-28"
        >
          <p className="mb-7 font-mono text-xs uppercase tracking-widest text-primary/65">
            Start here / Email ↗
          </p>
          <Link
            data-cursor="clickable"
            href={`mailto:${contact.email}`}
            aria-label={`Email ${contact.email}`}
            className="group relative block w-fit max-w-full whitespace-nowrap font-heading text-2xl italic leading-none tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-8 focus-visible:ring-offset-background sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
          >
            {contact.email}
            <span className="mt-5 block h-px w-full bg-primary/20 sm:mt-8">
              <span className="block h-full w-full origin-left scale-x-0 bg-animated-accent transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </span>
          </Link>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-primary/65 sm:text-base">
            Bangkok · Remote friendly
          </p>
        </div>

        <div className="grid gap-9 border-t border-primary/20 py-7 sm:py-9 lg:grid-cols-[0.28fr_0.25fr_0.47fr] lg:gap-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary/65">
            Other ways to connect
          </p>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/65">
              Call
            </p>
            <Link
              data-cursor="clickable"
              href={`tel:${contact.tel.replace(/\s/g, "")}`}
              className="mt-4 inline-block font-heading text-2xl italic leading-tight underline decoration-primary/25 underline-offset-8 transition-colors hover:text-animated-accent focus-visible:text-animated-accent sm:text-3xl"
            >
              {contact.tel}
            </Link>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/65">
              {contact.docsLabel}
            </p>
            <div className="mt-1 grid sm:grid-cols-2 sm:gap-6">
              {documents.map((document) => (
                <Link
                  key={document.type}
                  data-cursor="clickable"
                  href={document.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-20 items-center justify-between gap-5 border-b border-primary/20 py-3 transition-colors hover:border-primary/60 focus-visible:border-primary"
                >
                  <span>
                    <span className="block font-heading text-2xl italic leading-none sm:text-3xl">
                      {document.type}
                    </span>
                    <span className="mt-2 block font-mono text-xs uppercase tracking-widest text-primary/65">
                      {document.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-heading text-2xl text-primary/45 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <footer className="grid gap-6 border-t border-primary/20 pt-6 font-mono text-xs uppercase tracking-widest text-primary/65 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10">
          <div>
            <p>{contact.footer.right}</p>
            <p className="mt-2">{contact.footer.left}</p>
          </div>
          <nav
            aria-label="Social links"
            className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end"
          >
            {socials
              .filter((social) => social.title && social.link)
              .map((social) => (
                <Link
                  key={social.title}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/65 underline decoration-primary/20 underline-offset-4 transition-colors hover:text-animated-accent focus-visible:text-animated-accent"
                >
                  {social.title}
                </Link>
              ))}
          </nav>
        </footer>
      </div>
    </section>
  );
};
