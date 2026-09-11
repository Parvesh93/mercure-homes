"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function ProjectsHero() {
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
      /* =====================================
         TITLE REVEAL
      ====================================== */

      gsap.fromTo(
        ".projects-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      /* =====================================
         META / SUPPORTING COPY
      ====================================== */

      gsap.fromTo(
        ".projects-hero-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      /* =====================================
         IMAGE INTRO
      ====================================== */

      gsap.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );

      /* =====================================
         IMAGE PARALLAX
      ====================================== */

      gsap.to(image, {
        yPercent: 7,
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
      {/* =====================================
          BACKGROUND IMAGE
      ====================================== */}

      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src="/images/projects/project-01.jpg"
          alt="Mercure Homes project"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* =====================================
          BRAND OVERLAYS
      ====================================== */}

      <div className="absolute inset-0 bg-[var(--walnut-patina)]/18" />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/82",
          "via-[var(--obsidian-slate)]/14",
          "to-[var(--obsidian-slate)]/30",
        ].join(" ")}
      />

      {/* extra left-side contrast for typography */}

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-r",
          "from-[var(--obsidian-slate)]/38",
          "via-transparent",
          "to-transparent",
        ].join(" ")}
      />

      {/* =====================================
          SUBTLE BRAND WARMTH
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.03] blur-[140px]" />
      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[10vh] pt-36">
        <div className="w-full">
          {/* =================================
              META
          ================================== */}

          <div className="projects-hero-meta mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Projects
              </p>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.24em] text-[var(--alabaster-mist)]/48 md:block">
              Selected Work
            </span>
          </div>

          {/* =================================
              TITLE
          ================================== */}

          <div
            className={[
              "max-w-[1200px]",
              "text-[clamp(54px,8vw,128px)]",
              "leading-[0.9]",
              "tracking-[-0.055em]",
            ].join(" ")}
          >
            <div className="overflow-hidden pb-[0.08em]">
              <div className="projects-hero-line font-heading">
                Spaces shaped
              </div>
            </div>

            <div className="overflow-hidden pb-[0.1em]">
              <div className="projects-hero-line font-editorial">
                around you.
              </div>
            </div>
          </div>

          {/* =================================
              SOURCE COPY
          ================================== */}

          <div className="projects-hero-meta mt-10 max-w-[760px]">
            <p className="text-[15px] font-light leading-[1.85] text-[var(--alabaster-mist)]/70 md:text-[17px]">
              A glimpse of our most recent residences and show
              spaces, each composed around its site, its light,
              and the people who live in it.
            </p>

            {/* subtle bottom cue */}

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--brand-gold)]/65" />

              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/45">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          PROJECT INDEX
      ====================================== */}

      <div className="projects-hero-meta absolute bottom-[10vh] right-[var(--page-padding)] z-10 hidden items-end gap-3 lg:flex">
        <span className="font-heading text-[24px] leading-none tracking-[-0.04em] text-[var(--ivory-vein)]">
          01
        </span>

        <span className="pb-[2px] text-[8px] tracking-[0.2em] text-[var(--alabaster-mist)]/38">
          / 05
        </span>
      </div>
    </section>
  );
}