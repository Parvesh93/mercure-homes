"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function BrandStrip() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const pinRef =
    useRef<HTMLDivElement>(null);

  const lineRef =
    useRef<HTMLDivElement>(null);

  const dotRef =
    useRef<HTMLSpanElement>(null);

  const mobileLineRef =
    useRef<HTMLDivElement>(null);

  const mobileDotRef =
    useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    const pin =
      pinRef.current;

    const line =
      lineRef.current;

    const dot =
      dotRef.current;

    const mobileLine =
      mobileLineRef.current;

    const mobileDot =
      mobileDotRef.current;

    if (!section || !pin) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const desktop =
      window.matchMedia(
        "(min-width: 1024px)"
      ).matches;

    const {
      gsap,
      ScrollTrigger,
    } = getGSAP();

    const ctx =
      gsap.context(() => {
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
          gsap.set(
            [
              ".brand-strip-word",
              ".brand-strip-second",
              ".mobile-brand-line",
              ".mobile-brand-secondary",
            ],
            {
              opacity: 1,
              y: 0,
            }
          );

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

          if (mobileLine) {
            gsap.set(
              mobileLine,
              {
                scaleX: 1,
              }
            );
          }

          if (mobileDot) {
            gsap.set(
              mobileDot,
              {
                left: "100%",
              }
            );
          }

          return;
        }

        /* =================================================
           MOBILE / TABLET
        ================================================== */

        if (!desktop) {
          gsap.fromTo(
            ".mobile-brand-line",
            {
              opacity: 0,
              y: 24,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger:
                  ".mobile-brand-copy",
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".mobile-brand-secondary",
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger:
                  ".mobile-brand-secondary",
                start: "top 88%",
                once: true,
              },
            }
          );

          if (mobileLine) {
            gsap.fromTo(
              mobileLine,
              {
                scaleX: 0,
                transformOrigin:
                  "left center",
              },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger:
                    ".mobile-legacy-progress",
                  start:
                    "top 88%",
                  end:
                    "bottom 65%",
                  scrub: true,
                },
              }
            );
          }

          if (mobileDot) {
            gsap.fromTo(
              mobileDot,
              {
                left: "0%",
              },
              {
                left: "100%",
                ease: "none",
                scrollTrigger: {
                  trigger:
                    ".mobile-legacy-progress",
                  start:
                    "top 88%",
                  end:
                    "bottom 65%",
                  scrub: true,
                },
              }
            );
          }

          gsap.to(
            ".mobile-brand-orbit",
            {
              rotate: 18,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start:
                  "top bottom",
                end:
                  "bottom top",
                scrub: 1.2,
              },
            }
          );

          return;
        }

        /* =================================================
           DESKTOP
        ================================================== */

        const words =
          gsap.utils.toArray<HTMLElement>(
            ".brand-strip-word"
          );

        gsap.set(words, {
          opacity: 0.12,
          y: 20,
        });

        gsap.set(
          ".brand-strip-ghost",
          {
            opacity: 0,
            scale: 0.92,
          }
        );

        gsap.set(
          ".brand-strip-number",
          {
            opacity: 0,
            xPercent: 8,
          }
        );

        gsap.set(
          ".brand-strip-second",
          {
            opacity: 0.18,
            y: 20,
          }
        );

        if (line) {
          gsap.set(line, {
            scaleX: 0,
            transformOrigin:
              "left center",
          });
        }

        if (dot) {
          gsap.set(dot, {
            left: "0%",
          });
        }

        const timeline =
          gsap.timeline({
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

          .to(
            ".brand-strip-copy",
            {
              yPercent: -2.5,
              duration: 0.7,
              ease: "none",
            },
            1.95
          );

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

        gsap.to(
          ".brand-strip-number",
          {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );

        gsap.to(
          ".brand-strip-orbit",
          {
            rotate: 22,
            ease: "none",
            transformOrigin:
              "50% 50%",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );

        ScrollTrigger.refresh();
      }, section);

    return () => {
      ctx.revert();
    };
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
        "overflow-x-clip",
        "bg-[var(--ivory-vein)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =================================================
          DESKTOP
      ================================================== */}

      <div
        ref={pinRef}
        className={[
          "relative",
          "hidden",
          "min-h-[100svh]",
          "items-center",
          "overflow-hidden",
          "lg:flex",
        ].join(" ")}
      >
        {/* BACKGROUND */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* 50 */}

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

          {/* ORBIT */}

          <div
            className={[
              "brand-strip-orbit",
              "absolute",
              "right-[8vw]",
              "top-[16%]",
              "h-[320px]",
              "w-[320px]",
              "rounded-full",
              "border",
              "border-[var(--brand-gold)]/10",
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

          {/* GLOW */}

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

        {/* CONTENT */}

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

            <span className="text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/35">
              50 Years
            </span>
          </div>

          {/* STATEMENT */}

          <div
            className={[
              "brand-strip-copy",
              "mt-[clamp(52px,6vw,82px)]",
              "max-w-[1360px]",
            ].join(" ")}
          >
            <div
              className={[
                "font-heading",
                "text-[clamp(44px,5.8vw,92px)]",
                "leading-[0.98]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              {firstSentence.map(
                (
                  word,
                  index
                ) => (
                  <span
                    key={`${word}-${index}`}
                    className="brand-strip-word mr-[0.22em] inline-block"
                  >
                    {word}
                  </span>
                )
              )}
            </div>

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
                (
                  word,
                  index
                ) => (
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

          {/* MARKER */}

          <div className="mt-[clamp(35px,4vw,55px)] flex justify-end lg:pr-[3%]">
            <div className="flex items-center gap-4">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

              <span className="text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/38">
                1972 — Today
              </span>
            </div>
          </div>
        </div>

        {/* PROGRESS */}

        <div
          className={[
            "pointer-events-none",
            "absolute",
            "bottom-[clamp(30px,4vh,50px)]",
            "left-[var(--page-padding)]",
            "right-[var(--page-padding)]",
            "z-20",
          ].join(" ")}
        >
          <div className="relative mx-auto max-w-[1180px]">
            <div className="h-px w-full bg-[var(--walnut-patina)]/14" />

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

      {/* =================================================
          MOBILE / TABLET
      ================================================== */}

      <div
        className={[
          "relative",
          "px-[var(--page-padding)]",
          "pb-[90px]",
          "pt-[90px]",
          "lg:hidden",
        ].join(" ")}
      >
        {/* =============================================
            TOP
        ============================================== */}

        <div className="brand-strip-eyebrow flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              Our Legacy
            </p>
          </div>

          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/35">
            50 Years
          </span>
        </div>

        {/* =============================================
            MOBILE VISUAL
        ============================================== */}

        <div
          className={[
            "relative",
            "mt-10",
            "aspect-[16/9]",
            "overflow-hidden",
          ].join(" ")}
        >
          {/* 50 */}

          <div
            aria-hidden="true"
            className={[
              "absolute",
              "left-[-3%]",
              "top-1/2",
              "-translate-y-1/2",
              "font-heading",
              "text-[clamp(120px,38vw,190px)]",
              "leading-none",
              "tracking-[-0.09em]",
              "text-[var(--walnut-patina)]/[0.045]",
            ].join(" ")}
          >
            50
          </div>

          {/* ORBIT */}

          <div
            className={[
              "mobile-brand-orbit",
              "absolute",
              "right-[2%]",
              "top-1/2",
              "h-[145px]",
              "w-[145px]",
              "-translate-y-1/2",
              "rounded-full",
              "border",
              "border-[var(--brand-gold)]/12",
            ].join(" ")}
          >
            <span
              className={[
                "absolute",
                "left-1/2",
                "top-[-4px]",
                "h-[7px]",
                "w-[7px]",
                "-translate-x-1/2",
                "rounded-full",
                "bg-[var(--brand-gold)]",
              ].join(" ")}
            />

            <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--brand-gold)]/[0.06]" />

            <span className="absolute left-0 top-1/2 h-px w-full bg-[var(--brand-gold)]/[0.06]" />
          </div>
        </div>

        {/* =============================================
            MOBILE COPY
        ============================================== */}

        <div className="mobile-brand-copy mt-10">
          <h2
            className={[
              "mobile-brand-line",
              "font-heading",
              "max-w-[540px]",
              "text-[clamp(38px,11vw,58px)]",
              "leading-[0.98]",
              "tracking-[-0.045em]",
            ].join(" ")}
          >
            Five decades of craft,
            considered into every
            detail.
          </h2>

          <p
            className={[
              "mobile-brand-secondary",
              "font-editorial",
              "mt-5",
              "max-w-[520px]",
              "text-[clamp(34px,9vw,50px)]",
              "leading-[1.02]",
              "tracking-[-0.04em]",
              "text-[var(--walnut-patina)]/70",
            ].join(" ")}
          >
            Your home is where the
            next story begins.
          </p>
        </div>

        {/* =============================================
            MOBILE TIMELINE
        ============================================== */}

        <div className="mobile-legacy-progress mt-12">
          <div className="relative">
            {/* BASE */}

            <div className="h-px w-full bg-[var(--walnut-patina)]/14" />

            {/* ACTIVE */}

            <div
              ref={mobileLineRef}
              className={[
                "absolute",
                "left-0",
                "top-0",
                "h-px",
                "w-full",
                "origin-left",
                "bg-[var(--brand-gold)]",
              ].join(" ")}
            />

            {/* DOT */}

            <span
              ref={mobileDotRef}
              className={[
                "absolute",
                "top-1/2",
                "h-[8px]",
                "w-[8px]",
                "-translate-x-1/2",
                "-translate-y-1/2",
                "rounded-full",
                "bg-[var(--brand-gold)]",
                "shadow-[0_0_0_5px_rgba(194,151,71,0.08)]",
              ].join(" ")}
            />
          </div>

          {/* YEARS */}

          <div className="mt-4 flex items-start justify-between">
            <div>
              <p className="font-heading text-[14px] text-[var(--brand-gold)]">
                1972
              </p>

              <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/35">
                Beginning
              </p>
            </div>

            <div className="text-right">
              <p className="font-heading text-[14px] text-[var(--brand-gold)]">
                Today
              </p>

              <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/35">
                Mercure Homes
              </p>
            </div>
          </div>
        </div>

        {/* =============================================
            BOTTOM MARKER
        ============================================== */}

        <div className="mt-10 flex items-center gap-4">
          <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/38">
            1972 — Today
          </span>
        </div>
      </div>
    </section>
  );
}