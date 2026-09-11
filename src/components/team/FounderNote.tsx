"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function FounderNote() {
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
        /* INTRO */

        gsap.fromTo(
          ".founder-intro",
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                section,
              start:
                "top 80%",
              once: true,
            },
          }
        );

        /* IMAGE */

        gsap.fromTo(
          ".founder-image-wrap",
          {
            clipPath:
              "inset(8% 0% 8% 0%)",
          },
          {
            clipPath:
              "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".founder-image-wrap",
              start:
                "top 84%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".founder-image",
          {
            scale: 1.08,
          },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".founder-image-wrap",
              start:
                "top 84%",
              once: true,
            },
          }
        );

        /* NOTE */

        gsap.fromTo(
          ".founder-note-copy",
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
              trigger:
                ".founder-note-copy",
              start:
                "top 84%",
              once: true,
            },
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
        "py-[clamp(120px,13vw,190px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* subtle brand atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[8%] top-[14%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[140px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            INTRO
        ====================================== */}

        <div className="founder-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Founder&apos;s Note
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(46px,5.5vw,82px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                A personal point
              </span>

              <br />

              <span className="font-editorial">
                of view.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================
            FOUNDER CONTENT
        ====================================== */}

        <div
          className={[
            "mt-[clamp(70px,8vw,120px)]",
            "grid gap-14",
            "lg:grid-cols-[0.9fr_1.1fr]",
            "lg:items-center",
            "lg:gap-[clamp(70px,8vw,130px)]",
          ].join(" ")}
        >
          {/* IMAGE */}

          <div className="founder-image-wrap relative overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--alabaster-mist)]">
              <div className="founder-image absolute inset-0">
                <Image
                  src="/images/team/founder.jpg"
                  alt="Founder of Mercure Homes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.035]" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40">
                Mercure Homes
              </span>

              <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                Bengaluru
              </span>
            </div>
          </div>

          {/* NOTE */}

          <div className="founder-note-copy">
            <span className="font-editorial text-[48px] leading-none text-[var(--brand-gold)]">
              “
            </span>

            {/* =================================
                PENDING CLIENT CONTENT
            ================================== */}

            <div
              className={[
                "mt-5",
                "border-y",
                "border-[var(--walnut-patina)]/12",
                "py-8",
              ].join(" ")}
            >
              <p className="max-w-[700px] font-editorial text-[clamp(28px,3.2vw,46px)] leading-[1.2] tracking-[-0.025em] text-[var(--walnut-patina)]/45">
                Founder&apos;s note pending from client.
              </p>

              <p className="mt-6 max-w-[640px] text-[13px] leading-[1.8] text-[var(--walnut-patina)]/45">
                120–150 word first-person note to cover why
                Mercure Homes was started, what personalisation
                means, and the SDP Group heritage.
              </p>
            </div>

            {/* SIGNATURE PLACEHOLDER */}

            <div className="mt-8 flex items-end justify-between gap-8">
              <div>
                <p className="font-heading text-[18px] tracking-[-0.02em] text-[var(--obsidian-slate)]/45">
                  Founder Name
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/38">
                  Founder · Mercure Homes
                </p>
              </div>

              <span className="h-px w-16 bg-[var(--brand-gold)]/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}