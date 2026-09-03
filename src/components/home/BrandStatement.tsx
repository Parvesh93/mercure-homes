"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    const ctx = gsap.context(() => {
      /* -------------------------------------
         Intro label
      ------------------------------------- */

      gsap.fromTo(
        ".brand-label",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      /* -------------------------------------
         Mobile / tablet
      ------------------------------------- */

      if (!desktop) {
        gsap.fromTo(
          ".brand-line",
          {
            opacity: 0.18,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.16,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".brand-statement-copy",
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".brand-support-copy",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".brand-support-copy",
              start: "top 88%",
              once: true,
            },
          }
        );

        return;
      }

      /* -------------------------------------
         Desktop pinned reveal
      ------------------------------------- */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      timeline
        .fromTo(
          ".brand-line-1",
          {
            opacity: 0.12,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
          }
        )
        .fromTo(
          ".brand-line-2",
          {
            opacity: 0.12,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
          }
        )
        .fromTo(
          ".brand-line-3",
          {
            opacity: 0.12,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
          }
        )
        .fromTo(
          ".brand-support-copy",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "none",
          }
        )
        .fromTo(
          ".brand-detail-image",
          {
            opacity: 0,
            scale: 1.08,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "none",
          },
          "<"
        );

      gsap.to(".brand-detail-image-inner", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* subtle brand atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[8%] top-[15%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.035] blur-[130px]" />

        <div className="absolute bottom-[10%] right-[8%] h-[320px] w-[320px] rounded-full bg-[var(--caramel-bronze)]/[0.025] blur-[120px]" />
      </div>

      <div
        ref={pinRef}
        className="relative z-10 flex min-h-[100svh] items-center overflow-hidden"
      >
        <div className="site-container w-full py-[120px] lg:py-[140px]">
          {/* TOP LABEL */}

          <div className="brand-label mb-14 flex items-center justify-between lg:mb-16">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Our Philosophy
              </p>
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/45">
                Made Personal
              </span>

              <span className="h-px w-8 bg-[var(--brand-gold)]/45" />
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-[1.6fr_0.4fr] lg:items-end lg:gap-20">
            {/* MAIN STATEMENT */}

            <div className="brand-statement-copy">
              <div
                className={[
                  "font-editorial",
                  "text-[clamp(52px,7.5vw,118px)]",
                  "leading-[0.96]",
                  "tracking-[-0.045em]",
                  "text-[var(--obsidian-slate)]",
                ].join(" ")}
              >
                <div className="overflow-hidden pb-[0.08em]">
                  <div className="brand-line brand-line-1">
                    Crafting your story,
                  </div>
                </div>

                <div className="overflow-hidden pb-[0.08em]">
                  <div className="brand-line brand-line-2">
                    one statement
                  </div>
                </div>

                <div className="overflow-hidden pb-[0.08em]">
                  <div className="brand-line brand-line-3">
                    at a time.
                  </div>
                </div>
              </div>
            </div>

            {/* SUPPORTING COPY */}

            <div className="brand-support-copy lg:pb-3">
              <p className="max-w-[420px] text-[15px] leading-[1.9] text-[var(--walnut-patina)]/68 md:text-[16px]">
                We believe true luxury is personal.
                Every material, proportion and detail is
                considered around the people who will
                live with it.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px w-12 bg-[var(--brand-gold)]" />

                <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40">
                  Personal by design
                </span>
              </div>
            </div>
          </div>

          {/* DETAIL IMAGE */}

          <div className="mt-16 flex justify-end lg:mt-10">
            <div className="brand-detail-image relative w-[42vw] max-w-[520px] overflow-hidden opacity-0 max-lg:w-[70vw] max-lg:opacity-100">
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="brand-detail-image-inner absolute inset-[-6%]">
                  <Image
                    src="/images/home/craft.jpg"
                    alt="Mercure Homes material craftsmanship"
                    fill
                    sizes="(max-width: 1024px) 70vw, 42vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.035]" />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[var(--walnut-patina)]/10 pt-4">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[var(--brand-gold)]" />

                  <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/50">
                    Material · Detail · Craft
                  </span>
                </div>

                <span className="text-[9px] tracking-[0.18em] text-[var(--brand-gold)]">
                  01
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAINT BRAND M */}

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute -right-[6vw] top-[3%]",
            "select-none",
            "font-heading",
            "text-[clamp(240px,28vw,520px)]",
            "leading-none",
            "text-[var(--walnut-patina)]/[0.025]",
          ].join(" ")}
        >
          M
        </div>
      </div>

      <div className="site-container relative z-10">
        <div className="h-px w-full bg-[var(--walnut-patina)]/12" />
      </div>
    </section>
  );
}