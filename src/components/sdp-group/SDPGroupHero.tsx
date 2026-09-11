"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function SDPGroupHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sdp-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".sdp-hero-meta",
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

      gsap.fromTo(
        ".sdp-hero-number",
        {
          opacity: 0,
          scale: 0.9,
          y: 50,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "pt-[clamp(180px,16vw,250px)]",
        "pb-[clamp(110px,12vw,170px)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* BACKGROUND NUMBER */}

      <div
        aria-hidden="true"
        className={[
          "sdp-hero-number",
          "pointer-events-none",
          "absolute right-[-5vw] top-[4%]",
          "select-none",
          "font-heading",
          "text-[clamp(300px,38vw,720px)]",
          "leading-none",
          "tracking-[-0.1em]",
          "text-[var(--ivory-vein)]/[0.025]",
        ].join(" ")}
      >
        50
      </div>

      {/* subtle warmth */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[10%] top-[12%] h-[430px] w-[430px] rounded-full bg-[var(--caramel-bronze)]/[0.05] blur-[160px]" />

        <div className="absolute bottom-[5%] right-[-8%] h-[480px] w-[480px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[170px]" />
      </div>

      <div className="site-container relative z-10">
        {/* META */}

        <div className="sdp-hero-meta flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              The SDP Group
            </p>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/40 md:block">
            1972 — 2023
          </span>
        </div>

        {/* TITLE */}

        <div className="mt-[clamp(60px,7vw,100px)] max-w-[1150px]">
          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "sdp-hero-line",
                "font-heading",
                "text-[clamp(54px,7vw,110px)]",
                "leading-[0.94]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              A legacy of precision,
            </div>
          </div>

          <div className="overflow-hidden pb-[0.1em]">
            <div
              className={[
                "sdp-hero-line",
                "font-editorial",
                "text-[clamp(54px,7vw,110px)]",
                "leading-[0.94]",
                "tracking-[-0.04em]",
              ].join(" ")}
            >
              a future of beauty.
            </div>
          </div>
        </div>

        {/* FACTUAL INTRO */}

        <div className="sdp-hero-meta mt-[clamp(45px,5vw,70px)] grid gap-8 lg:grid-cols-[0.72fr_2.28fr]">
          <div />

          <p className="max-w-[760px] text-[15px] leading-[1.9] text-[var(--alabaster-mist)]/62 md:text-[16px]">
            From a 1972 iron foundry to Mercure Homes in
            2023 — the SDP Group&apos;s fifty-year journey
            spans stone, machines and interior design.
          </p>
        </div>
      </div>
    </section>
  );
}