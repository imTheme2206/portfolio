import { AnimatedHoverText } from "@/app/components/animated-hover-text";
import { Marquee } from "@/app/components/marquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

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

export const Contacts = () => {
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
        <Contacts2 />
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

gsap.registerPlugin(ScrollTrigger);

// ─── Split text into spans ────────────────────────────────────────────────────
function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = text
    .split("")
    .map((ch) =>
      ch === " "
        ? `<span style="display:inline-block;width:0.28em"> </span>`
        : `<span class="char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${ch}</span></span>`,
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".char > span");
}

function splitWords(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = text
    .split(" ")
    .map(
      (w) =>
        `<span class="word" style="display:inline-block;overflow:hidden;margin-right:0.3em"><span style="display:inline-block">${w}</span></span>`,
    )
    .join("");
  return el.querySelectorAll<HTMLElement>(".word > span");
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Contacts2() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Lenis smooth scroll ──────────────────────────────────────────────────
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      // ── Title split-char reveal ────────────────────────────────────────────
      const titleChars = splitChars(titleRef.current!);
      gsap.fromTo(
        titleChars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

      // ── Sub line word reveal ───────────────────────────────────────────────
      const subWords = splitWords(subRef.current!);
      gsap.fromTo(
        subWords,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );

      // ── Horizontal line expand ─────────────────────────────────────────────
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.inOut",
          delay: 0.2,
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
        },
      );

      // ── Contact links slide up ─────────────────────────────────────────────
      gsap.fromTo(
        [emailRef.current, phoneRef.current],
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 88%",
          },
        },
      );

      // ── CV + Resume cards entrance ─────────────────────────────────────────
      gsap.fromTo(
        [cvRef.current, resumeRef.current],
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: cvRef.current,
            start: "top 88%",
          },
        },
      );

      // ── Footer fade ────────────────────────────────────────────────────────
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Google Fonts ──────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        :root {
          --bg:        #1a1916;
          --surface:   #222018;
          --card:      #252320;
          --border:    #2e2c28;
          --text:      #c9c4b8;
          --muted:     #6b6760;
          --accent:    #c8a97e;
          --accent-dim:#8a7356;
          --white:     #e8e3d9;
        }

        /* ── Section ──────────────────────────────────────────────────── */
        .contact-section {
          min-height: 100dvh;
          width: 100%;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(5rem, 10vw, 9rem) clamp(1.5rem, 8vw, 8rem);
          position: relative;
          overflow: hidden;
        }

        /* ── Subtle grain overlay ─────────────────────────────────────── */
        .contact-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
        }

        /* ── Tag label ────────────────────────────────────────────────── */
        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-dim);
          margin-bottom: 1.8rem;
        }

        /* ── Main title ───────────────────────────────────────────────── */
        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(5rem, 12vw, 11rem);
          line-height: 0.9;
          color: var(--white);
          letter-spacing: -0.01em;
          margin-bottom: 2.2rem;
        }

        /* ── Sub text ─────────────────────────────────────────────────── */
        .contact-sub {
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: var(--muted);
          max-width: 38ch;
          margin-bottom: 3.5rem;
          line-height: 1.9;
        }

        /* ── Divider ──────────────────────────────────────────────────── */
        .divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 3rem;
        }

        /* ── Contact row ──────────────────────────────────────────────── */
        .contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 2.5rem 5rem;
          margin-bottom: 4.5rem;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .contact-label {
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-dim);
        }

        .contact-link {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          font-size: clamp(1.1rem, 2.2vw, 1.55rem);
          color: var(--white);
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          display: inline-block;
          transition: color 0.3s ease;
        }

        .contact-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 1px;
          background: var(--accent);
          transition: width 0.45s cubic-bezier(0.77, 0, 0.175, 1);
        }

        .contact-link:hover { color: var(--accent); }
        .contact-link:hover::after { width: 100%; }

        /* ── Cards grid ───────────────────────────────────────────────── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 50%), 1fr));
          gap: 1.2rem;
          margin-bottom: 5rem;
        }

        /* ── Document card ────────────────────────────────────────────── */
        .doc-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: border-color 0.4s ease;
          group: true;
        }

        .doc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 30%, rgba(200,169,126,0.06) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .doc-card:hover {
          border-color: var(--accent-dim);
        }

        .doc-card:hover::before { opacity: 1; }

        /* preview area */
        .card-preview {
          height: 650px;
          background: var(--surface);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid var(--border);
        }

        /* fake document lines */
        .fake-doc {
          width: 72%;
          height: 80%;
          background: #1e1c1a;
          border: 1px solid #2a2825;
          border-radius: 1px;
          padding: 1.4rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.5s ease;
        }

        .doc-card:hover .fake-doc {
          transform: translateY(-6px) rotate(-0.3deg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .doc-line {
          height: 1px;
          background: var(--border);
          border-radius: 1px;
        }

        .doc-line.thick {
          height: 6px;
          background: #2e2c28;
          border-radius: 2px;
          margin-bottom: 0.2rem;
        }

        .doc-line.accent-line {
          background: rgba(200,169,126,0.25);
          width: 40%;
        }

        .doc-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--accent-dim);
          opacity: 0.4;
          margin-bottom: 0.5rem;
        }

        /* corner badge */
        .corner-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-dim);
          background: rgba(200,169,126,0.07);
          border: 1px solid rgba(200,169,126,0.15);
          padding: 4px 8px;
          border-radius: 1px;
        }

        /* card footer */
        .card-footer {
          padding: 1.1rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          color: var(--white);
          letter-spacing: 0.02em;
        }

        .card-meta {
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          margin-top: 0.2rem;
        }

        .card-arrow {
          font-size: 0.85rem;
          color: var(--accent-dim);
          transition: transform 0.35s ease, color 0.3s ease;
        }

        .doc-card:hover .card-arrow {
          transform: translate(4px, -4px);
          color: var(--accent);
        }

        /* ── Footer bar ───────────────────────────────────────────────── */
        .contact-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .footer-copy {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: var(--muted);
        }

        .footer-socials {
          display: flex;
          gap: 1.8rem;
        }

        .social-link {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .social-link:hover { color: var(--accent); }

        /* ── Ambient glow ──────────────────────────────────────────────── */
        .glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,169,126,0.04) 0%, transparent 70%);
          pointer-events: none;
          top: -100px;
          right: -100px;
        }
      `}</style>

      <section ref={sectionRef} className="contact-section">
        {/* ambient glow */}
        <div className="glow" />

        {/* tag */}
        <p className="tag">— Available for work · Let&apos;s connect</p>

        {/* title */}
        <h2 ref={titleRef} className="contact-title">
          Contact
        </h2>

        {/* subline */}
        <p ref={subRef} className="contact-sub">
          Open to select freelance projects and full-time positions. I respond
          within 24 hours.
        </p>

        {/* divider */}
        <div ref={lineRef} className="divider" />

        {/* contact links */}
        <div className="contact-row">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a
              ref={emailRef}
              href="mailto:hello@dev.io"
              className="contact-link"
            >
              hello@yourname.dev
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone</span>
            <a ref={phoneRef} href="tel:+15550001234" className="contact-link">
              +1 (555) 000-1234
            </a>
          </div>
        </div>

        {/* footer */}
        {/*<div ref={footerRef} className="contact-footer">
          <p className="footer-copy">© 2025 Your Name. Crafted with intent.</p>
          <div className="footer-socials">
            <a href="#" className="social-link">
              GitHub
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
            <a href="#" className="social-link">
              Dribbble
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
          </div>
        </div>*/}
      </section>
      {/* document cards */}
      <div className="flex overflow-scroll lg:grid lg:grid-cols-2 gap-6">
        {/* CV card */}
        <div ref={cvRef} className="doc-card min-w-120">
          <div className="card-preview ">
            <span className="corner-badge">2025</span>
            <div className="fake-doc">
              <div className="doc-avatar" />
              <div className="doc-line thick" />
              <div className="doc-line accent-line" />
              <div className="doc-line" style={{ width: "90%" }} />
              <div className="doc-line" style={{ width: "75%" }} />
              <div className="doc-line" style={{ width: "85%" }} />
              <div
                className="doc-line"
                style={{ width: "60%", marginTop: "0.5rem" }}
              />
              <div className="doc-line" style={{ width: "80%" }} />
              <div className="doc-line" style={{ width: "70%" }} />
            </div>
          </div>
          <div className="card-footer">
            <div>
              <p className="card-title">Curriculum Vitae</p>
              <p className="card-meta">PDF · 1 page · Updated Jan 2025</p>
            </div>
            <span className="card-arrow">↗</span>
          </div>
        </div>

        {/* Resume card */}
        <div ref={resumeRef} className="doc-card overflow-scroll">
          <div className="card-preview">
            <span className="corner-badge">2025</span>
            <div className="fake-doc">
              <div className="doc-line thick" />
              <div className="doc-line accent-line" />
              <div className="doc-line" style={{ width: "85%" }} />
              <div className="doc-line" style={{ width: "92%" }} />
              <div className="doc-line" style={{ width: "65%" }} />
              <div
                className="doc-line"
                style={{ width: "78%", marginTop: "0.5rem" }}
              />
              <div className="doc-line" style={{ width: "88%" }} />
              <div className="doc-line" style={{ width: "55%" }} />
              <div className="doc-line" style={{ width: "72%" }} />
            </div>
          </div>
          <div className="card-footer">
            <div>
              <p className="card-title">Résumé</p>
              <p className="card-meta">PDF · 2 pages · Updated Feb 2025</p>
            </div>
            <span className="card-arrow">↗</span>
          </div>
        </div>
      </div>
    </>
  );
}
