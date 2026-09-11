"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function ProcessHero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const { gsap } =
      getGSAP();

    const ctx =
      gsap.context(() => {
        gsap.fromTo(
          ".process-hero-line",
          {
            yPercent: 110,
          },
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.1,
            ease: "power4.out",
          }
        );

        gsap.fromTo(
          ".process-hero-meta",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.45,
            ease: "power3.out",
          }
        );
      }, section);

    return () =>
      ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "pt-[clamp(170px,16vw,240px)]",
        "pb-[clamp(100px,11vw,160px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div className="site-container">
        {/* META */}

        <div className="process-hero-meta flex items-center gap-4">
          <span className="h-px w-8 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            The Process
          </p>
        </div>

        {/* TITLE */}

        <div className="mt-[clamp(55px,7vw,90px)] max-w-[1150px]">
          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "process-hero-line",
                "font-heading",
                "text-[clamp(54px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              From the first
            </div>
          </div>

          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "process-hero-line",
                "font-editorial",
                "text-[clamp(54px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.04em]",
              ].join(" ")}
            >
              conversation
            </div>
          </div>

          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "process-hero-line",
                "font-heading",
                "text-[clamp(54px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              to the final detail.
            </div>
          </div>
        </div>

        {/* SOURCE INTRO */}

        <div className="process-hero-meta mt-[clamp(45px,5vw,70px)] grid gap-8 lg:grid-cols-[0.72fr_2.28fr]">
          <div />

          <p className="max-w-[760px] text-[16px] leading-[1.9] text-[var(--walnut-patina)]/68 md:text-[17px]">
            From the first conversation to the
            final detail, every Mercure project
            is shaped through a considered
            process — personal, collaborative
            and precise.
          </p>
        </div>
      </div>
    </section>
  );
}