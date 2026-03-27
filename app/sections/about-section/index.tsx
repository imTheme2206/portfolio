"use client";

import { Divider } from "@/app/components/divider";
import { SplitText } from "@/app/components/split-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "GSAP"] },
  { label: "Backend", items: ["Node.js", "Go", "PostgreSQL", "Redis"] },
  {
    label: "Craft",
    items: ["Motion Design", "System Design", "DevOps", "Open Source"],
  },
];

const STATS = [
  { value: "3+", label: "Years of craft" },
  { value: "∞", label: "Coffees consumed" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  let ctx: gsap.Context = gsap.context(() => {});
  useGSAP(() => {
    ctx = gsap.context(() => {
      // ── Stats: count up + fade ──
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          stagger: 0.12,
          duration: 0.8,
          ease: "expo.out",
        });
      }

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
    <>
      {/* ── Google Font ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');



        /* Image frame */
        .img-frame {
          position: relative;
          overflow: hidden;
          background: var(--warm);
        }
        .img-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            transparent 40%,
            rgba(200,82,42,0.08) 100%
          );
        }

        /* Stat card */
        .stat-card {
          border-top: 1px solid rgba(10,10,9,0.15);
          padding: 20px 0;
        }
        .stat-value {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--ink);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 16px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 6px;
        }


        /* Heading perspective */
        .heading-wrap { perspective: 800px; overflow: hidden; }
      `}</style>
      <section
        ref={sectionRef}
        className="about-section"
        style={{
          background: "var(--paper)",
          minHeight: "100dvh",
          position: "relative",
          overflow: "hidden",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 120px) clamp(24px, 5vw, 80px) 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Row 1 — Label + Heading */}
          <div style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <div className="heading-wrap flex items-center gap-x-8">
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
              <Divider className="bg-foreground h-0.5 w-full" />
            </div>
          </div>

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
                className="img-frame object-cover mt-12"
                style={{
                  width: "100%",
                  // aspectRatio: "3/4",
                  borderRadius: "6px",
                  marginBottom: "40px",
                  // maxHeight: "500px",
                  overflow: "hidden",
                }}
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
            <div style={{ paddingTop: "8px" }}>
              {/* Divider */}
              <Divider className="bg-foreground h-px mb-8" />

              {/* Bio */}
              <SplitText
                component="p"
                animation="byWord"
                style={{
                  fontSize: "clamp(1.2rem, 1.4vw, 2.5rem)",
                  lineHeight: 1.75,
                  // color: "var(--ink)",
                  marginBottom: "48px",
                  fontWeight: 400,
                }}
              >
                I'm a software developer obsessed with the intersection of
                engineering precision and design intention. I build interfaces
                that feel inevitable — where every pixel has a reason, every
                transition earns its place, and performance is never optional.
                <br />
                <br />
                My background spans product startups, agency work, and
                open-source. I care deeply about the craft: readable code,
                thoughtful abstractions, and systems that scale without losing
                their soul.
              </SplitText>
              {/* Stats grid */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 gap-x-8 place-items-center"
              >
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="stat-card flex gap-x-4 items-center"
                  >
                    <div className="stat-value font-display">{s.value}</div>
                    <div className="stat-label text-muted font-display">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Large background text watermark ── */}
        {/*<div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(80px, 18vw, 240px)",
              color: "rgba(10,10,9,0.04)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              transform: "translateY(20%)",
            }}
          >
            developer.
          </p>
        </div>*/}
      </section>
    </>
  );
}
