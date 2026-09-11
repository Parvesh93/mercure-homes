"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { getGSAP } from "../../lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;

    if (!section || !media) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { gsap } = getGSAP();

    /* =====================================================
       CURSOR MEDIA MOVEMENT
    ===================================================== */

    const handleMouseMove = (event: MouseEvent) => {
      if (reduceMotion) return;

      const x =
        (event.clientX / window.innerWidth - 0.5) * 2;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(media, {
        xPercent: x * 0.8,
        yPercent: y * 0.5,
        duration: 1.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const ctx = gsap.context(() => {
      /* ===================================================
         REDUCED MOTION
      =================================================== */

      if (reduceMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            descriptionRef.current,
            primaryCtaRef.current,
            secondaryCtaRef.current,
            scrollRef.current,
          ],
          {
            opacity: 1,
            y: 0,
          }
        );

        gsap.set(media, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
        });

        return;
      }

      /* ===================================================
         INITIAL STATES
      =================================================== */

      gsap.set(
        [
          eyebrowRef.current,
          titleRef.current,
          descriptionRef.current,
          primaryCtaRef.current,
          secondaryCtaRef.current,
          scrollRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(media, {
        scale: 1.08,
      });

      /* ===================================================
         INTRO
      =================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(media, {
          scale: 1,
          duration: 2.2,
          ease: "power2.out",
        })

        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          0.45
        )

        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
          },
          0.65
        )

        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          1
        )

        .to(
          primaryCtaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.12
        )

        .to(
          secondaryCtaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.2
        )

        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.35
        );

      /* ===================================================
         SCROLL PARALLAX
      =================================================== */

      gsap.to(media, {
        yPercent: 8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    /* =====================================================
       POINTER INTERACTION
    ===================================================== */

    if (!reduceMotion) {
      window.addEventListener(
        "mousemove",
        handleMouseMove,
        {
          passive: true,
        }
      );
    }

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =================================================
          BACKGROUND VIDEO
      ================================================== */}

      <div
        ref={mediaRef}
        className="absolute inset-[-5%] overflow-hidden will-change-transform"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/home/hero.jpg"
        >
          <source
            src="/videos/home/hero.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =================================================
          CINEMATIC OVERLAYS
      ================================================== */}

      <div className="absolute inset-0 bg-[var(--walnut-patina)]/18" />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-r",
          "from-[var(--obsidian-slate)]/78",
          "via-[var(--obsidian-slate)]/32",
          "to-[var(--obsidian-slate)]/8",
        ].join(" ")}
      />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/68",
          "via-transparent",
          "to-[var(--obsidian-slate)]/24",
        ].join(" ")}
      />

      {/* subtle warm brand atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[16%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[150px]" />
      </div>

      {/* =================================================
          CONTENT
      ================================================== */}

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[9vh] pt-32 md:pb-[11vh]">
        <div className="w-full">
          <div className="max-w-[1180px]">
            {/* EYEBROW */}

            <p
              ref={eyebrowRef}
              className={[
                "mb-7",
                "text-[10px]",
                "uppercase",
                "tracking-[0.30em]",
                "text-[var(--brand-gold)]",
                "md:text-[11px]",
              ].join(" ")}
            >
              Luxury Interior Atelier · Bengaluru
            </p>

            {/* =================================================
                H1
                Exact approved Home headline
            ================================================== */}

            <h1
              ref={titleRef}
              className={[
                "max-w-[1080px]",
                "text-[clamp(50px,6.8vw,108px)]",
                "font-normal",
                "leading-[0.93]",
                "tracking-[-0.05em]",
                "text-[var(--ivory-vein)]",
              ].join(" ")}
            >
              <span className="font-heading">
                Crafting Your Story,
              </span>

              <br />

              <span className="font-editorial">
                One Statement at a Time.
              </span>
            </h1>

            {/* =================================================
    DESCRIPTION + CTAS
================================================== */}

<div className="mt-9 md:mt-11">

  {/* DESCRIPTION */}

  <p
    ref={descriptionRef}
    className={[
      "max-w-[650px]",
      "text-[14px]",
      "font-light",
      "leading-[1.85]",
      "text-[var(--alabaster-mist)]/72",
      "md:text-[16px]",
    ].join(" ")}
  >
    A luxury interior atelier in Bengaluru, where
    Italian design sensibility meets Indian
    craftsmanship, carried forward by the SDP
    Group&apos;s fifty-year legacy in stone and
    precision manufacturing.
  </p>

  {/* CTAS */}

  <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5 md:mt-9">

    {/* PRIMARY */}

    <Link
      ref={primaryCtaRef}
      href="/collections"
      className={[
        "group",
        "flex w-fit",
        "items-center gap-5",
        "text-[10px]",
        "font-medium",
        "uppercase",
        "tracking-[0.22em]",
        "!text-[var(--ivory-vein)]",
        "md:text-[11px]",
      ].join(" ")}
    >
      <span>
        Explore Our World
      </span>

      <span className="relative block h-px w-12 overflow-hidden bg-[var(--alabaster-mist)]/35">
        <span
          className={[
            "absolute inset-0",
            "-translate-x-full",
            "bg-[var(--brand-gold)]",
            "transition-transform",
            "duration-700",
            "group-hover:translate-x-0",
          ].join(" ")}
        />
      </span>

      <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
        ↗
      </span>
    </Link>

    {/* SECONDARY */}

    <Link
      ref={secondaryCtaRef}
      href="/contact"
      className={[
        "group",
        "flex w-fit",
        "items-center gap-4",
        "text-[9px]",
        "font-medium",
        "uppercase",
        "tracking-[0.20em]",
        "!text-[var(--alabaster-mist)]/58",
        "transition-colors",
        "duration-500",
        "hover:!text-[var(--ivory-vein)]",
        "md:text-[10px]",
      ].join(" ")}
    >
      <span>
        Begin Your Project
      </span>

      <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>

  </div>
</div>
          </div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================== */}

      <div
        ref={scrollRef}
        className={[
          "absolute",
          "bottom-7",
          "right-[var(--page-padding)]",
          "z-10",
          "hidden items-center gap-3",
          "md:flex",
        ].join(" ")}
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-[var(--alabaster-mist)]/42">
          Scroll
        </span>

        <span className="relative h-[48px] w-px overflow-hidden bg-[var(--alabaster-mist)]/18">
          <span className="hero-scroll-line absolute left-0 top-0 h-[18px] w-px bg-[var(--brand-gold)]" />
        </span>
      </div>
    </section>
  );
}