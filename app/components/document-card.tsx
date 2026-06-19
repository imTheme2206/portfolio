"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

type DocumentCardProps = {
  label: string;
  type: "CV" | "Resume";
  href: string;
  preview: string;
};

export const DocumentCard = ({
  label,
  type,
  href,
  preview,
}: DocumentCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    // Card lifts up
    gsap.to(cardRef.current, {
      y: -8,
      duration: 0.4,
      ease: "power2.out",
    });

    // Image: gain full color + subtle zoom
    gsap.to(imageRef.current, {
      filter: "grayscale(0%)",
      scale: 1.06,
      duration: 0.7,
      ease: "power2.out",
    });

    // Arrow shoots out then returns
    gsap
      .timeline()
      .to(arrowRef.current, {
        x: 4,
        y: -4,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      .set(arrowRef.current, { x: -4, y: 4 })
      .to(arrowRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    gsap.to(card, {
      rotateY: xPct * 7,
      rotateX: -yPct * 7,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 900,
    });

    gsap.to(glow, {
      x: x - 80,
      y: y - 80,
      opacity: 0.22,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
    });

    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });

    // Image back to grayscale + unzoom
    gsap.to(imageRef.current, {
      filter: "grayscale(50%)",
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      data-cursor="invert"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="doc-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-primary not-dark:shadow-2xl dark:bg-secondary backdrop-blur-sm transition-colors duration-500 hover:border-white/20 dark:hover:bg-secondary/30"
      style={{
        minWidth: "220px",
        aspectRatio: "5/7",
        flexShrink: 0,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-primary opacity-0 blur-3xl will-change-transform"
      />

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-[140px] -skew-x-[15deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{ left: 0 }}
      />

      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.07] px-5 py-2">
        <div className="flex gap-1.5">
          {["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"].map(
            (c, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
            ),
          )}
        </div>
        <span className="font-mono text-base uppercase tracking-[0.2em] text-white/30 transition-colors duration-500 group-hover:text-white/60">
          {type}
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <Image
          ref={imageRef}
          width={320}
          height={420}
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(50%)" }}
          src={preview}
          alt={label}
          priority
        />
        <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:opacity-0" />
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/[0.07] px-5 py-3">
        <span className="text-paragraph text-white/30 transition-colors duration-500 group-hover:text-white/60">
          {label}
        </span>
        <span
          ref={arrowRef}
          className="inline-block text-white/20 transition-colors duration-500 group-hover:text-white/60"
        >
          ↗
        </span>
      </div>
    </a>
  );
};
