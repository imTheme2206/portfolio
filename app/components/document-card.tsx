import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

type DocumentCardProps = {
  label: string;
  type: "CV" | "Resume";
  href: string;
};
// ─── Document Card ─────────────────────────────────────────────────────────────
export const DocumentCard = ({ label, type, href }: DocumentCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
      rotateY: xPct * 6,
      rotateX: -yPct * 6,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });

    gsap.to(glow, {
      x: x - 80,
      y: y - 80,
      opacity: 0.18,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.7)",
    });
    gsap.to(glow, { opacity: 0, duration: 0.4 });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      data-cursor="invert"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-primary not-dark:shadow-2xl dark:bg-secondary backdrop-blur-sm transition-colors duration-500 hover:border-white/20 dark:hover:bg-secondary/30"
      style={{
        minWidth: "400px",
        aspectRatio: "5/7",
        flexShrink: 0,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glow blob */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-40 w-40 rounded-full bg-primary opacity-0 blur-3xl will-change-transform will-chnage-[opacity]"
      />

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-2">
        <div className="flex gap-1.5">
          {["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"].map(
            (c, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
            ),
          )}
        </div>
        <span className="text-paragraph uppercase tracking-[0.2em] text-white/30">
          {type}
        </span>
      </div>

      <Image
        width="320"
        height="420"
        className="min-w-75 aspect-5/7 object-cover m-auto grayscale-50"
        src="/assets/images/hero-section/hero-1.webp"
        alt={label}
        priority
      />

      <div className="flex items-center justify-between mt-auto border-t border-white/[0.07] px-5 py-2">
        <span className="text-paragraph text-white/30 transition-colors duration-300 group-hover:text-white/60">
          {label}
        </span>
        <span className="translate-x-0 text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/60">
          ↗
        </span>
      </div>
    </a>
  );
};
