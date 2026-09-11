"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function TeamHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-hero-line",
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
        ".team-hero-meta",
        {
          opacity: 0,
          y: 18,
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
        image,
        {
          scale: 1.07,
        },
        {
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        }
      );

      gsap.to(image, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* TEAM IMAGE */}

      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src="/images/team/team-hero-2.jpg"
          alt="Mercure Homes team at the Bengaluru studio"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* BRAND OVERLAY */}

      <div className="absolute inset-0 bg-[var(--walnut-patina)]/18" />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/78",
          "via-[var(--obsidian-slate)]/12",
          "to-[var(--obsidian-slate)]/28",
        ].join(" ")}
      />

      {/* CONTENT */}

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[9vh] pt-36">
        <div className="w-full">
          {/* META */}

          <div className="team-hero-meta mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Our Team
              </p>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/45 md:block">
              Bengaluru · India
            </span>
          </div>

          {/* TITLE */}

          <div className="max-w-[1150px]">
            <div className="overflow-hidden pb-[0.08em]">
              <div
                className={[
                  "team-hero-line",
                  "font-heading",
                  "text-[clamp(54px,7.5vw,120px)]",
                  "leading-[0.92]",
                  "tracking-[-0.05em]",
                ].join(" ")}
              >
                The people
              </div>
            </div>

            <div className="overflow-hidden pb-[0.1em]">
              <div
                className={[
                  "team-hero-line",
                  "font-editorial",
                  "text-[clamp(54px,7.5vw,120px)]",
                  "leading-[0.92]",
                  "tracking-[-0.04em]",
                ].join(" ")}
              >
                behind Mercure.
              </div>
            </div>
          </div>

          {/* SMALL META */}

          <div className="team-hero-meta mt-9 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--brand-gold)]/70" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/45">
              Studio · Craft · Design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}