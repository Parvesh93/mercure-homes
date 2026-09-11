"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function BrandStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;

    if (!section || !pin) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      /* =================================================
         EYEBROW
      ================================================== */

      gsap.fromTo(
        ".brand-strip-eyebrow",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* =================================================
         REDUCED MOTION
      ================================================== */

      if (reduceMotion) {
        gsap.set(".brand-strip-word", {
          opacity: 1,
          y: 0,
        });

        gsap.set(".brand-strip-second", {
          opacity: 1,
          y: 0,
        });

        gsap.set(".brand-strip-number", {
          opacity: 1,
          xPercent: 0,
        });

        gsap.set(".brand-strip-ghost", {
          opacity: 1,
          scale: 1,
        });

        if (line) {
          gsap.set(line, {
            scaleX: 1,
          });
        }

        if (dot) {
          gsap.set(dot, {
            left: "100%",
          });
        }

        return;
      }

      /* =================================================
         MOBILE / TABLET
      ================================================== */

      if (!desktop) {
        gsap.fromTo(
          ".brand-strip-word",
          {
            opacity: 0.12,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".brand-strip-copy",
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".brand-strip-second",
          {
            opacity: 0.2,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".brand-strip-second",
              start: "top 85%",
              once: true,
            },
          }
        );

        return;
      }

      /* =================================================
         DESKTOP INITIAL STATES
      ================================================== */

      const words = gsap.utils.toArray<HTMLElement>(
        ".brand-strip-word"
      );

      gsap.set(words, {
        opacity: 0.12,
        y: 20,
      });

      gsap.set(".brand-strip-ghost", {
        opacity: 0,
        scale: 0.92,
      });

      gsap.set(".brand-strip-number", {
        opacity: 0,
        xPercent: 8,
      });

      gsap.set(".brand-strip-second", {
        opacity: 0.18,
        y: 20,
      });

      if (line) {
        gsap.set(line, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      if (dot) {
        gsap.set(dot, {
          left: "0%",
        });
      }

      /* =================================================
         MAIN PINNED TIMELINE
      ================================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin,
          anticipatePin: 1,
        },
      });

      timeline
        /* -----------------------------------------------
           atmosphere
        ----------------------------------------------- */

        .to(
          ".brand-strip-ghost",
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "none",
          },
          0
        )

        .to(
          ".brand-strip-number",
          {
            opacity: 1,
            xPercent: 0,
            duration: 1.1,
            ease: "none",
          },
          0
        )

        /* -----------------------------------------------
           main statement
        ----------------------------------------------- */

        .to(
          words,
          {
            opacity: 1,
            y: 0,
            stagger: 0.075,
            duration: 0.34,
            ease: "none",
          },
          0.25
        )

        /* -----------------------------------------------
           second sentence
        ----------------------------------------------- */

        .to(
          ".brand-strip-second",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "none",
          },
          1.35
        )

        /* -----------------------------------------------
           subtle final lift
        ----------------------------------------------- */

        .to(
          ".brand-strip-copy",
          {
            yPercent: -2.5,
            duration: 0.7,
            ease: "none",
          },
          1.95
        );

      /* =================================================
         PROGRESS THROUGH ENTIRE PIN
      ================================================== */

      if (line) {
        gsap.fromTo(
          line,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: true,
            },
          }
        );
      }

      if (dot) {
        gsap.fromTo(
          dot,
          {
            left: "0%",
          },
          {
            left: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: true,
            },
          }
        );
      }

      /* =================================================
         BACKGROUND PARALLAX
      ================================================== */

      gsap.to(".brand-strip-number", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".brand-strip-orbit", {
        rotate: 22,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  const firstSentence = [
    "Five",
    "decades",
    "of",
    "craft,",
    "considered",
    "into",
    "every",
    "detail.",
  ];

  const secondSentence = [
    "Your",
    "home",
    "is",
    "where",
    "the",
    "next",
    "story",
    "begins.",
  ];

  return (
    <section
      ref={sectionRef}
      id="story"
      data-header-theme="light"
      className={[
        "relative",
        "bg-[var(--ivory-vein)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div
        ref={pinRef}
        className={[
          "relative",
          "flex",
          "min-h-[100svh]",
          "items-center",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* =================================================
            BACKGROUND ATMOSPHERE
        ================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* oversized 50 */}

          <div
            className={[
              "brand-strip-number",
              "absolute",
              "right-[-6vw]",
              "top-1/2",
              "-translate-y-1/2",
              "select-none",
              "font-heading",
              "text-[clamp(280px,36vw,680px)]",
              "leading-none",
              "tracking-[-0.1em]",
              "text-[var(--walnut-patina)]/[0.035]",
            ].join(" ")}
          >
            50
          </div>

          {/* architectural orbit */}

          <div
            className={[
              "brand-strip-orbit",
              "absolute",
              "right-[8vw]",
              "top-[16%]",
              "hidden",
              "h-[320px]",
              "w-[320px]",
              "rounded-full",
              "border",
              "border-[var(--brand-gold)]/10",
              "lg:block",
            ].join(" ")}
          >
            <span
              className={[
                "absolute",
                "left-1/2",
                "top-[-5px]",
                "h-[9px]",
                "w-[9px]",
                "-translate-x-1/2",
                "rounded-full",
                "bg-[var(--brand-gold)]",
              ].join(" ")}
            />

            <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--brand-gold)]/[0.05]" />

            <span className="absolute left-0 top-1/2 h-px w-full bg-[var(--brand-gold)]/[0.05]" />
          </div>

          {/* glow */}

          <div
            className={[
              "brand-strip-ghost",
              "absolute",
              "left-[22%]",
              "top-[22%]",
              "h-[400px]",
              "w-[400px]",
              "rounded-full",
              "bg-[var(--gilded-ochre)]/[0.035]",
              "blur-[150px]",
            ].join(" ")}
          />
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className={[
            "site-container",
            "relative z-10",
            "w-full",
            "pb-[clamp(120px,14vh,165px)]",
            "pt-[clamp(100px,11vh,140px)]",
          ].join(" ")}
        >
          {/* EYEBROW */}

          <div className="brand-strip-eyebrow flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Our Legacy
              </p>
            </div>

            <span className="hidden text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/35 lg:block">
              50 Years
            </span>
          </div>

          {/* =================================================
              STATEMENT
          ================================================== */}

          <div
            className={[
              "brand-strip-copy",
              "mt-[clamp(52px,6vw,82px)]",
              "max-w-[1360px]",
            ].join(" ")}
          >
            {/* FIRST SENTENCE */}

            <div
              className={[
                "font-heading",
                "text-[clamp(44px,5.8vw,92px)]",
                "leading-[0.98]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              {firstSentence.map(
                (word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="brand-strip-word mr-[0.22em] inline-block"
                  >
                    {word}
                  </span>
                )
              )}
            </div>

            {/* SECOND SENTENCE */}

            <div
              className={[
                "brand-strip-second",
                "mt-[0.12em]",
                "font-editorial",
                "text-[clamp(44px,5.8vw,92px)]",
                "leading-[1]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              {secondSentence.map(
                (word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className="brand-strip-word mr-[0.22em] inline-block"
                  >
                    {word}
                  </span>
                )
              )}
            </div>
          </div>

          {/* SMALL LEGACY MARKER */}

          <div className="mt-[clamp(35px,4vw,55px)] flex justify-end lg:pr-[3%]">
            <div className="flex items-center gap-4">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

              <span className="text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/38">
                1972 — Today
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            PINNED PROGRESS
            Independent from text layout
        ================================================== */}

        <div
          className={[
            "pointer-events-none",
            "absolute",
            "bottom-[clamp(30px,4vh,50px)]",
            "left-[var(--page-padding)]",
            "right-[var(--page-padding)]",
            "z-20",
            "hidden",
            "lg:block",
          ].join(" ")}
        >
          <div className="relative mx-auto max-w-[1180px]">
            {/* BASE LINE */}

            <div className="h-px w-full bg-[var(--walnut-patina)]/14" />

            {/* ACTIVE LINE */}

            <div
              ref={lineRef}
              className={[
                "absolute",
                "left-0",
                "top-0",
                "h-px",
                "w-full",
                "origin-left",
                "bg-[var(--brand-gold)]",
                "will-change-transform",
              ].join(" ")}
            />

            {/* MOVING DOT */}

            <span
              ref={dotRef}
              className={[
                "absolute",
                "top-1/2",
                "h-[9px]",
                "w-[9px]",
                "-translate-x-1/2",
                "-translate-y-1/2",
                "rounded-full",
                "bg-[var(--brand-gold)]",
                "shadow-[0_0_0_5px_rgba(194,151,71,0.08)]",
              ].join(" ")}
            />

            {/* LABELS */}

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[7px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/30">
                1972
              </span>

              <span className="text-[7px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/30">
                Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}