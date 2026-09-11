"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

/*
 * The walkthrough video is still listed as
 * pending in the supplied content document.
 *
 * Once the client sends it, place it at:
 *
 * public/videos/about/experience-centre.mp4
 *
 * and change this to:
 *
 * const WALKTHROUGH_VIDEO =
 *   "/videos/about/experience-centre.mp4";
 */

const WALKTHROUGH_VIDEO =
  "/videos/about/experience-centre.mp4";

export default function ExperienceCentre() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;

    if (!section || !visual) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      /* -------------------------------------
         Intro
      ------------------------------------- */

      gsap.fromTo(
        ".experience-intro",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* -------------------------------------
         Visual reveal
      ------------------------------------- */

      gsap.fromTo(
        visual,
        {
          clipPath: "inset(8% 0% 8% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.out",

          scrollTrigger: {
            trigger: visual,
            start: "top 82%",
            once: true,
          },
        }
      );

      /* -------------------------------------
         Slow internal image movement
      ------------------------------------- */

      gsap.fromTo(
        ".experience-media",
        {
          scale: 1.08,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",

          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      /* -------------------------------------
         Supporting content
      ------------------------------------- */

      gsap.fromTo(
        ".experience-details",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: ".experience-details",
            start: "top 85%",
            once: true,
          },
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
        "py-[clamp(120px,14vw,120px)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* =====================================
          AMBIENT BACKGROUND
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[8%] top-[12%] h-[420px] w-[420px] rounded-full bg-[var(--caramel-bronze)]/[0.05] blur-[150px]" />

        <div className="absolute bottom-[6%] right-[-6%] h-[460px] w-[460px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[160px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            INTRO
        ====================================== */}

        <div className="experience-intro grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The Experience Centre
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className={[
                "max-w-[940px]",
                "text-[clamp(48px,6.2vw,96px)]",
                "leading-[0.96]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                A world designed
              </span>

              <br />

              <span className="font-editorial">
                to be walked through.
              </span>
            </h2>

            <div className="shrink-0 lg:pb-2">
              <p className="font-heading text-[clamp(44px,4.5vw,72px)] leading-none tracking-[-0.05em] text-[var(--brand-gold)]">
                18,000
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/42">
                sq ft · Bengaluru
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            MAIN VISUAL
        ====================================== */}

        <div
          ref={visualRef}
          className="relative mt-[clamp(70px,8vw,120px)] overflow-hidden"
        >
          <div className="relative aspect-[16/8] min-h-[440px] lg:min-h-[620px]">
            {WALKTHROUGH_VIDEO ? (
              <video
                className="experience-media absolute inset-[-4%] h-[108%] w-[108%] object-cover"
                src={WALKTHROUGH_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <div className="experience-media absolute inset-[-4%]">
                <Image
                  src="/images/about/experience-centre.jpg"
                  alt="Mercure Homes Experience Centre in Bengaluru"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )}

            {/* warm overlay */}
            <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.08]" />

            <div
              className={[
                "absolute inset-0",
                "bg-gradient-to-t",
                "from-[var(--obsidian-slate)]/70",
                "via-transparent",
                "to-[var(--obsidian-slate)]/10",
              ].join(" ")}
            />

            {/* =================================
                VISUAL META
            ================================== */}

            <div className="absolute left-6 top-6 flex items-center gap-4 md:left-8 md:top-8">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

              <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/65">
                Bengaluru · India
              </span>
            </div>

            {/* walkthrough indicator */}
            <div className="absolute right-6 top-6 md:right-8 md:top-8">
              <div className="flex items-center gap-4">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/55">
                  Walkthrough
                </span>

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--alabaster-mist)]/30">
                  <span className="ml-[2px] text-[11px] text-[var(--brand-gold)]">
                    ▶
                  </span>
                </span>
              </div>
            </div>

            {/* bottom message */}
            <div className="absolute bottom-7 left-7 right-7 md:bottom-9 md:left-9 md:right-9">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    Experience Mercure
                  </p>

                  <p className="mt-3 max-w-[680px] font-heading text-[clamp(26px,3.2vw,46px)] leading-[1.04] tracking-[-0.035em] text-[var(--ivory-vein)]">
                    Materials are meant
                    to be seen in daylight,
                    touched and lived with.
                  </p>
                </div>

                <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/45 md:block">
                  Visit by appointment
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            DETAILS
        ====================================== */}

        <div
          className={[
            "experience-details",
            "mt-[clamp(50px,6vw,85px)]",
            "grid gap-12",
            "lg:grid-cols-[0.8fr_1.2fr]",
            "lg:gap-[clamp(70px,8vw,130px)]",
          ].join(" ")}
        >
          {/* left */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
              Inside the Atelier
            </p>

            <div className="mt-7 grid grid-cols-2 gap-6 border-y border-[var(--alabaster-mist)]/10 py-7">
              <div>
                <p className="font-heading text-[28px] tracking-[-0.04em]">
                  18,000
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/38">
                  sq ft
                </p>
              </div>

              <div className="border-l border-[var(--alabaster-mist)]/10 pl-6">
                <p className="font-heading text-[28px] tracking-[-0.04em]">
                  Bengaluru
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/38">
                  Experience Centre
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div>
            <p className="max-w-[760px] text-[16px] leading-[1.9] text-[var(--alabaster-mist)]/62">
              Our 18,000 sq ft Experience Centre in Bengaluru
              is where the Mercure world is meant to be walked
              through, not just described. Kitchens, wardrobes,
              furniture, lighting and carpets are staged as
              lived-in spaces rather than showroom displays —
              every material within arm&apos;s reach, every finish
              visible in daylight.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className={[
                  "group flex items-center gap-5",
                  "text-[10px]",
                  "uppercase",
                  "tracking-[0.21em]",
                  "text-[var(--ivory-vein)]",
                ].join(" ")}
              >
                <span>
                  Schedule a visit
                </span>

                <span className="relative block h-px w-12 overflow-hidden bg-[var(--alabaster-mist)]/20">
                  <span
                    className={[
                      "absolute inset-0",
                      "-translate-x-full",
                      "bg-[var(--brand-gold)]",
                      "transition-transform duration-700",
                      "group-hover:translate-x-0",
                    ].join(" ")}
                  />
                </span>
              </Link>

              <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/35">
                Visit by appointment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          BACKGROUND NUMBER
      ====================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute bottom-[-7vw] right-[-2vw]",
          "select-none",
          "font-heading",
          "text-[clamp(220px,30vw,560px)]",
          "leading-none",
          "tracking-[-0.08em]",
          "text-[var(--ivory-vein)]/[0.018]",
        ].join(" ")}
      >
        18
      </div>
    </section>
  );
}