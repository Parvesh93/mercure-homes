"use client";

import { useEffect, useRef, useState } from "react";

import { getGSAP } from "../../lib/gsap";

const milestones = [
  {
    year: "1972",
    title: "Shankar Iron Foundry",
    location: "Ajmer, Rajasthan",
    text:
      "The SDP Group's journey began with a foundry — and a 15-metric-ton single-piece cast iron casting that set an early benchmark for engineering scale and precision.",
  },
  {
    year: "1993",
    title: "Shree Dee Pee Marbles and Granites",
    location: "Kishangarh, Rajasthan",
    text:
      "Entry into stone processing, backed by ownership of White Rajasthani Marble mines and proprietary Diamond Segment Tooling engineered in-house.",
  },
  {
    year: "2001",
    title: "SDP Granites",
    location: "Bengaluru, Karnataka",
    text:
      "Expansion into Red Multi-Colour Granite, producing what became recognised as South India's finest finished granite.",
  },
  {
    year: "2002",
    title: "SDP Machines",
    location: "Ajmer, Rajasthan",
    text:
      "World-class stone-processing machinery, engineered to reduce India's reliance on expensive imports — a torchbearer for 'Make in India' in heavy engineering.",
  },
  {
    year: "2018",
    title: "SDP Stones",
    location: "Shoolgiri, Tamil Nadu",
    text:
      "Exotic natural stone curated from 38 countries, including an exclusive partnership securing Benetton Beige marble from a premier Turkish quarry.",
  },
  {
    year: "2023",
    title: "Mercure Homes",
    location: "Bengaluru, Karnataka",
    text:
      "The culmination of the legacy — where the timeless beauty of natural stone meets the precision of the Group's machines, in bespoke interiors for the home.",
  },
];

export default function LegacyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      /* =====================================
         INTRO
      ====================================== */

      gsap.fromTo(
        ".legacy-timeline-intro",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      /* =====================================
         MILESTONES
      ====================================== */

      gsap.utils
        .toArray<HTMLElement>(
          ".legacy-milestone"
        )
        .forEach((milestone, index) => {
          gsap.fromTo(
            milestone,
            {
              opacity: reduceMotion
                ? 1
                : 0,
              y: reduceMotion
                ? 0
                : 36,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",

              scrollTrigger: {
                trigger: milestone,
                start: "top 82%",
                once: true,
              },
            }
          );

          if (desktop) {
            gsap.timeline({
              scrollTrigger: {
                trigger: milestone,
                start: "top 58%",
                end: "bottom 42%",

                onEnter: () =>
                  setActiveIndex(index),

                onEnterBack: () =>
                  setActiveIndex(index),
              },
            });
          }
        });

      /* =====================================
         TIMELINE LINE
      ====================================== */

      if (!reduceMotion) {
        gsap.fromTo(
          ".legacy-progress-line",
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            ease: "none",

            scrollTrigger: {
              trigger:
                ".legacy-timeline-list",

              start:
                "top 65%",

              end:
                "bottom 55%",

              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const current =
    milestones[activeIndex];

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(120px,13vw,200px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =====================================
          BACKGROUND ATMOSPHERE
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[-8%] top-[12%] h-[380px] w-[380px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[150px]" />

        <div className="absolute bottom-[8%] right-[-7%] h-[420px] w-[420px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            INTRO
        ====================================== */}

        <div className="legacy-timeline-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The Journey
              </p>
            </div>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
              1972 — 2023
            </p>

            <h2
              className={[
                "mt-6",
                "max-w-[900px]",
                "text-[clamp(46px,5.7vw,86px)]",
                "leading-[0.97]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Five decades,
              </span>{" "}

              <span className="font-editorial">
                one continuous evolution.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================
            DESKTOP
        ====================================== */}

        <div
          className={[
            "mt-[clamp(80px,9vw,135px)]",
            "hidden",
            "grid-cols-[0.78fr_1.22fr]",
            "gap-[clamp(70px,8vw,130px)]",
            "lg:grid",
          ].join(" ")}
        >
          {/* =================================
              LEFT — STICKY ACTIVE YEAR
          ================================== */}

          <div className="relative">
            <div
              className={[
                "sticky",
                "top-[125px]",
                "flex",
                "min-h-[620px]",
                "flex-col",
                "justify-between",
              ].join(" ")}
            >
              {/* YEAR */}

              <div>
                <span
                  key={current.year}
                  className={[
                    "block",
                    "font-heading",
                    "text-[clamp(120px,13vw,210px)]",
                    "leading-[0.78]",
                    "tracking-[-0.08em]",
                    "text-[var(--walnut-patina)]/[0.09]",
                  ].join(" ")}
                >
                  {current.year}
                </span>
              </div>

              {/* ACTIVE DETAILS */}

              <div className="max-w-[420px]">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  {current.location}
                </p>

                <h3
                  className={[
                    "mt-4",
                    "font-editorial",
                    "text-[clamp(34px,3.3vw,52px)]",
                    "leading-[1.05]",
                    "tracking-[-0.035em]",
                  ].join(" ")}
                >
                  {current.title}
                </h3>

                <span className="mt-7 block h-px w-12 bg-[var(--brand-gold)]" />
              </div>
            </div>
          </div>

          {/* =================================
              RIGHT — TIMELINE
          ================================== */}

          <div className="legacy-timeline-list relative">
            {/* BASE LINE */}

            <div className="absolute bottom-0 left-[6px] top-0 w-px bg-[var(--walnut-patina)]/12" />

            {/* GOLD PROGRESS */}

            <div className="legacy-progress-line absolute bottom-0 left-[6px] top-0 w-px origin-top bg-[var(--brand-gold)]" />

            {milestones.map(
              (milestone, index) => {
                const isActive =
                  index === activeIndex;

                return (
                  <article
                    key={milestone.year}
                    className={[
                      "legacy-milestone",
                      "relative",
                      "min-h-[70vh]",
                      "border-b",
                      "border-[var(--walnut-patina)]/10",
                      "pb-[clamp(70px,8vw,110px)]",
                      "pl-[55px]",
                      "pt-[clamp(70px,8vw,110px)]",
                    ].join(" ")}
                  >
                    {/* POINT */}

                    <div
                      className={[
                        "absolute",
                        "left-0",
                        "top-[clamp(76px,8vw,116px)]",
                        "flex h-[13px] w-[13px]",
                        "items-center justify-center",
                        "rounded-full",
                        "border",
                        "bg-[var(--ivory-vein)]",
                        "transition-all duration-500",

                        isActive
                          ? "border-[var(--brand-gold)]"
                          : "border-[var(--walnut-patina)]/25",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "block rounded-full",
                          "transition-all duration-500",

                          isActive
                            ? "h-[5px] w-[5px] bg-[var(--brand-gold)]"
                            : "h-[3px] w-[3px] bg-[var(--walnut-patina)]/25",
                        ].join(" ")}
                      />
                    </div>

                    {/* YEAR */}

                    <span
                      className={[
                        "font-heading",
                        "text-[14px]",
                        "tracking-[-0.02em]",

                        isActive
                          ? "text-[var(--brand-gold)]"
                          : "text-[var(--walnut-patina)]/40",
                      ].join(" ")}
                    >
                      {milestone.year}
                    </span>

                    {/* LOCATION */}

                    <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
                      {milestone.location}
                    </p>

                    {/* TITLE */}

                    <h3
                      className={[
                        "mt-4",
                        "max-w-[760px]",
                        "font-editorial",
                        "text-[clamp(42px,4.4vw,68px)]",
                        "leading-[1]",
                        "tracking-[-0.035em]",

                        isActive
                          ? "text-[var(--obsidian-slate)]"
                          : "text-[var(--walnut-patina)]/55",
                      ].join(" ")}
                    >
                      {milestone.title}
                    </h3>

                    {/* COPY */}

                    <p className="mt-7 max-w-[700px] text-[14px] leading-[1.9] text-[var(--walnut-patina)]/62 md:text-[15px]">
                      {milestone.text}
                    </p>
                  </article>
                );
              }
            )}
          </div>
        </div>

        {/* =====================================
            MOBILE / TABLET
        ====================================== */}

        <div className="relative mt-16 lg:hidden">
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--walnut-patina)]/12" />

          <div className="space-y-0">
            {milestones.map(
              (milestone) => (
                <article
                  key={milestone.year}
                  className="relative border-b border-[var(--walnut-patina)]/10 py-10 pl-10"
                >
                  <span className="absolute left-0 top-[46px] h-[11px] w-[11px] rounded-full border border-[var(--brand-gold)] bg-[var(--ivory-vein)]">
                    <span className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-gold)]" />
                  </span>

                  <span className="font-heading text-[14px] text-[var(--brand-gold)]">
                    {milestone.year}
                  </span>

                  <p className="mt-5 text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
                    {milestone.location}
                  </p>

                  <h3 className="font-editorial mt-3 text-[clamp(34px,9vw,50px)] leading-[1.02] tracking-[-0.035em]">
                    {milestone.title}
                  </h3>

                  <p className="mt-6 text-[14px] leading-[1.85] text-[var(--walnut-patina)]/62">
                    {milestone.text}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}