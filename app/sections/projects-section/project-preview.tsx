"use client";

import type { Project } from "@/app/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const ProjectPreview = ({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) => {
  const root = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const syncPlayback = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    userPaused.current = paused;
    syncPlayback.current?.();
  }, [paused]);

  useGSAP(
    () => {
      const element = root.current;
      if (!element || project.images.length < 2) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const slides = gsap.utils.toArray<HTMLElement>(
          ".preview-slide",
          element,
        );
        const progress = element.querySelector(".preview-progress");
        let visible = false;
        let hovered = false;
        let focused = false;
        const playback = gsap.timeline({ paused: true, repeat: -1 });
        const sync = () =>
          playback.paused(
            userPaused.current ||
              !visible ||
              hovered ||
              focused ||
              document.hidden,
          );
        syncPlayback.current = sync;

        slides.forEach((slide, index) => {
          const next = slides[(index + 1) % slides.length];
          playback
            .call(() => setActive(index))
            .fromTo(
              progress,
              { scaleX: 0 },
              { scaleX: 1, duration: 1, ease: "none" },
            )
            .set(next, {
              visibility: "visible",
              opacity: 0,
              xPercent: 4,
              zIndex: 2,
            })
            .to(next, {
              opacity: 1,
              xPercent: 0,
              duration: 0.8,
              ease: "power3.inOut",
            })
            .to(
              slide,
              { opacity: 0, xPercent: -4, duration: 0.8, ease: "power3.inOut" },
              "<",
            )
            .set(slide, { visibility: "hidden", xPercent: 0, zIndex: 0 })
            .set(next, { zIndex: 1 });
        });

        const observer = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            sync();
          },
          { threshold: 0.25 },
        );
        observer.observe(element);
        const enter = () => {
          hovered = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;
          sync();
        };
        const leave = () => {
          hovered = false;
          sync();
        };
        const focus = () => {
          focused = true;
          sync();
        };
        const blur = (event: FocusEvent) => {
          focused = element.contains(event.relatedTarget as Node | null);
          sync();
        };
        element.addEventListener("mouseenter", enter);
        element.addEventListener("mouseleave", leave);
        element.addEventListener("focusin", focus);
        element.addEventListener("focusout", blur);
        document.addEventListener("visibilitychange", sync);
        return () => {
          observer.disconnect();
          element.removeEventListener("mouseenter", enter);
          element.removeEventListener("mouseleave", leave);
          element.removeEventListener("focusin", focus);
          element.removeEventListener("focusout", blur);
          document.removeEventListener("visibilitychange", sync);
          syncPlayback.current = null;
        };
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        setActive(0);
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [project.images], revertOnUpdate: true },
  );

  return (
    <div ref={root}>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-current/10 bg-card">
        {project.images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`preview-slide absolute inset-0 ${index === 0 ? "visible opacity-100" : "invisible opacity-0"}`}
            aria-hidden={active !== index}
          >
            <Image
              src={src}
              alt={`${project.name} project preview ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-contain"
              priority={priority && index === 0}
              loading={index === 0 ? undefined : "eager"}
            />
          </div>
        ))}
      </div>
      {project.images.length > 1 && (
        <div className="mt-3 items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] hidden">
          <span
            className="opacity-55"
            aria-label={`Preview ${active + 1} of ${project.images.length}`}
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(project.images.length).padStart(2, "0")}
          </span>
          <div
            className="h-px flex-1 overflow-hidden bg-current/15"
            aria-hidden="true"
          >
            <span className="preview-progress hidden h-full origin-left scale-x-0 bg-current opacity-60" />
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-pressed={paused}
            aria-label={
              paused ? "Resume preview slideshow" : "Pause preview slideshow"
            }
            className="min-h-11 px-3 opacity-65 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      )}
      {project.images.length > 1 && (
        <div className="mt-3 hidden gap-3 motion-reduce:grid motion-reduce:grid-cols-2">
          {project.images.slice(1).map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-video overflow-hidden rounded-lg border border-current/10 bg-card"
            >
              <Image
                src={src}
                alt={`${project.name} project preview ${index + 2}`}
                fill
                sizes="50vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
