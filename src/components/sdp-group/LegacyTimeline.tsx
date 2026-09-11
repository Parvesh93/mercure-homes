"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   MILESTONES
========================================================= */

const milestones = [
  {
    year: "1972",
    title: "Shankar Iron Foundry",
    location: "Ajmer, Rajasthan",

    image:
      "/images/sdp-group/timeline/1972.jpg",

    text:
      "The SDP Group's journey began with a foundry — and a 15-metric-ton single-piece cast iron casting that set an early benchmark for engineering scale and precision.",
  },

  {
    year: "1993",
    title:
      "Shree Dee Pee Marbles and Granites",
    location: "Kishangarh, Rajasthan",

    image:
      "/images/sdp-group/timeline/1993.webp",

    text:
      "Entry into stone processing, backed by ownership of White Rajasthani Marble mines and proprietary Diamond Segment Tooling engineered in-house.",
  },

  {
    year: "2001",
    title: "SDP Granites",
    location: "Bengaluru, Karnataka",

    image:
      "/images/sdp-group/timeline/2001.webp",

    text:
      "Expansion into Red Multi-Colour Granite, producing what became recognised as South India's finest finished granite.",
  },

  {
    year: "2002",
    title: "SDP Machines",
    location: "Ajmer, Rajasthan",

    image:
      "/images/sdp-group/timeline/2002.jpg",

    text:
      "World-class stone-processing machinery, engineered to reduce India's reliance on expensive imports — a torchbearer for 'Make in India' in heavy engineering.",
  },

  {
    year: "2018",
    title: "SDP Stones",
    location: "Shoolgiri, Tamil Nadu",

    image:
      "/images/sdp-group/timeline/2018.jpg",

    text:
      "Exotic natural stone curated from 38 countries, including an exclusive partnership securing Benetton Beige marble from a premier Turkish quarry.",
  },

  {
    year: "2023",
    title: "Mercure Homes",
    location: "Bengaluru, Karnataka",

    image:
      "/images/sdp-group/timeline/2023.jpg",

    text:
      "The culmination of the legacy — where the timeless beauty of natural stone meets the precision of the Group's machines, in bespoke interiors for the home.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function LegacyTimeline() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const desktopWrapRef =
    useRef<HTMLDivElement>(null);

  const leftPanelRef =
    useRef<HTMLDivElement>(null);

  const timelineRef =
    useRef<HTMLDivElement>(null);

  const imageRef =
    useRef<HTMLDivElement>(null);

  const activeContentRef =
    useRef<HTMLDivElement>(null);

  const milestoneRefs =
    useRef<
      Array<HTMLElement | null>
    >([]);

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const current =
    milestones[activeIndex];

  /* =========================================================
     GSAP
  ========================================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    const desktopWrap =
      desktopWrapRef.current;

    const leftPanel =
      leftPanelRef.current;

    const timeline =
      timelineRef.current;

    if (
      !section ||
      !desktopWrap ||
      !leftPanel ||
      !timeline
    ) {
      return;
    }

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
        /* =============================================
           INTRO
        ============================================== */

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
            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                section,

              start:
                "top 80%",

              once: true,
            },
          }
        );

        /* =============================================
           DESKTOP
        ============================================== */

        if (
          desktop &&
          !reduceMotion
        ) {
          /* -----------------------------------------
             PIN LEFT PANEL
          ----------------------------------------- */

          ScrollTrigger.create({
            trigger:
              desktopWrap,

            start:
              "top 95px",

            endTrigger:
              timeline,

            end:
              "bottom bottom",

            pin:
              leftPanel,

            pinSpacing:
              false,

            anticipatePin:
              1,

            invalidateOnRefresh:
              true,
          });

          /* -----------------------------------------
             MILESTONE ACTIVATION
          ----------------------------------------- */

          milestoneRefs.current.forEach(
            (
              milestone,
              index
            ) => {
              if (!milestone) {
                return;
              }

              ScrollTrigger.create(
                {
                  trigger:
                    milestone,

                  start:
                    "top 55%",

                  end:
                    "bottom 45%",

                  onEnter:
                    () => {
                      setActiveIndex(
                        index
                      );
                    },

                  onEnterBack:
                    () => {
                      setActiveIndex(
                        index
                      );
                    },
                }
              );

              /* reveal */

              gsap.fromTo(
                milestone,
                {
                  opacity: 0,
                  y: 36,
                },
                {
                  opacity: 1,
                  y: 0,

                  duration:
                    0.85,

                  ease:
                    "power3.out",

                  scrollTrigger:
                    {
                      trigger:
                        milestone,

                      start:
                        "top 84%",

                      once:
                        true,
                    },
                }
              );
            }
          );

          /* -----------------------------------------
             TIMELINE PROGRESS
          ----------------------------------------- */

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
                  timeline,

                start:
                  "top 65%",

                end:
                  "bottom 55%",

                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }, section);

    return () =>
      ctx.revert();
  }, []);

  /* =========================================================
     ACTIVE MILESTONE CHANGE
  ========================================================= */

  useEffect(() => {
    const image =
      imageRef.current;

    const content =
      activeContentRef.current;

    if (!image || !content) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const { gsap } =
      getGSAP();

    /* image transition */

    gsap.fromTo(
      image,
      {
        opacity: 0,
        scale: 1.06,
        y: 14,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,

        duration: 0.85,

        ease:
          "power3.out",
      }
    );

    /* content transition */

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 14,
      },
      {
        opacity: 1,
        y: 0,

        duration: 0.65,

        ease:
          "power3.out",
      }
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative",
        "overflow-x-clip",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(110px,12vw,180px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =================================================
          BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={[
            "absolute",
            "left-[-8%]",
            "top-[12%]",
            "h-[380px]",
            "w-[380px]",
            "rounded-full",
            "bg-[var(--gilded-ochre)]/[0.025]",
            "blur-[150px]",
          ].join(" ")}
        />

        <div
          className={[
            "absolute",
            "bottom-[8%]",
            "right-[-7%]",
            "h-[420px]",
            "w-[420px]",
            "rounded-full",
            "bg-[var(--caramel-bronze)]/[0.02]",
            "blur-[150px]",
          ].join(" ")}
        />
      </div>

      <div className="site-container relative z-10">
        {/* =================================================
            INTRO
        ================================================== */}

        <div
          className={[
            "legacy-timeline-intro",
            "grid gap-10",
            "lg:grid-cols-[0.7fr_2.3fr]",
          ].join(" ")}
        >
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
                one continuous
                evolution.
              </span>
            </h2>
          </div>
        </div>

        {/* =================================================
            DESKTOP
        ================================================== */}

        <div
          ref={desktopWrapRef}
          className={[
            "mt-[clamp(80px,9vw,130px)]",
            "hidden",
            "grid-cols-[0.95fr_1.05fr]",
            "items-start",
            "gap-[clamp(70px,7vw,115px)]",
            "lg:grid",
          ].join(" ")}
        >
          {/* =============================================
              LEFT — GSAP PINNED
          ============================================== */}

          <div className="relative min-h-screen">
            <div
              ref={leftPanelRef}
              className={[
                "flex",
                "h-[calc(100vh-105px)]",
                "min-h-[680px]",
                "w-full",
                "flex-col",
                "py-6",
              ].join(" ")}
            >
              {/* =========================================
                  YEAR + PROGRESS
              ========================================== */}

              <div className="flex items-start justify-between">
                <span
                  key={
                    current.year
                  }
                  className={[
                    "block",
                    "font-heading",
                    "text-[clamp(86px,9vw,145px)]",
                    "leading-[0.8]",
                    "tracking-[-0.08em]",
                    "text-[var(--walnut-patina)]/[0.09]",
                    "animate-[legacyYear_600ms_cubic-bezier(0.22,1,0.36,1)]",
                  ].join(" ")}
                >
                  {
                    current.year
                  }
                </span>

                <span className="pt-2 text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/35">
                  {String(
                    activeIndex +
                      1
                  ).padStart(
                    2,
                    "0"
                  )}{" "}
                  / 06
                </span>
              </div>

              {/* =========================================
                  IMAGE
              ========================================== */}

              <div
                className={[
                  "relative",
                  "my-8",
                  "min-h-0",
                  "flex-1",
                  "overflow-hidden",
                  "bg-[var(--alabaster-mist)]",
                ].join(" ")}
              >
                <div
                  ref={imageRef}
                  key={
                    current.image
                  }
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      current.image
                    }
                    alt={`${current.title}, ${current.year}`}
                    fill
                    priority={
                      activeIndex ===
                      0
                    }
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>

                {/* subtle tone */}

                <div className="pointer-events-none absolute inset-0 bg-[var(--walnut-patina)]/[0.035]" />

                <div
                  className={[
                    "pointer-events-none",
                    "absolute inset-0",
                    "bg-gradient-to-t",
                    "from-[var(--obsidian-slate)]/45",
                    "via-transparent",
                    "to-transparent",
                  ].join(" ")}
                />

                {/* YEAR ON IMAGE */}

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <span className="text-[8px] uppercase tracking-[0.22em] text-white/60">
                    {
                      current.location
                    }
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    {
                      current.year
                    }
                  </span>
                </div>
              </div>

              {/* =========================================
                  ACTIVE DETAILS
              ========================================== */}

              <div
                ref={
                  activeContentRef
                }
                key={
                  current.title
                }
              >
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  {
                    current.location
                  }
                </p>

                <h3
                  className={[
                    "font-editorial",
                    "mt-3",
                    "max-w-[520px]",
                    "text-[clamp(30px,3vw,46px)]",
                    "leading-[1.02]",
                    "tracking-[-0.035em]",
                  ].join(" ")}
                >
                  {
                    current.title
                  }
                </h3>

                <div className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-[var(--brand-gold)]" />

                  <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/35">
                    Milestone
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================
              RIGHT — SCROLLING TIMELINE
          ============================================== */}

          <div
            ref={timelineRef}
            className="legacy-timeline-list relative"
          >
            {/* BASE LINE */}

            <div
              className={[
                "absolute",
                "bottom-0",
                "left-[6px]",
                "top-0",
                "w-px",
                "bg-[var(--walnut-patina)]/12",
              ].join(" ")}
            />

            {/* GOLD PROGRESS */}

            <div
              className={[
                "legacy-progress-line",
                "absolute",
                "bottom-0",
                "left-[6px]",
                "top-0",
                "w-px",
                "origin-top",
                "bg-[var(--brand-gold)]",
              ].join(" ")}
            />

            {milestones.map(
              (
                milestone,
                index
              ) => {
                const isActive =
                  index ===
                  activeIndex;

                return (
                  <article
                    key={
                      milestone.year
                    }
                    ref={(
                      element
                    ) => {
                      milestoneRefs.current[
                        index
                      ] =
                        element;
                    }}
                    className={[
                      "legacy-milestone",
                      "relative",
                      "flex",
                      "min-h-[72vh]",
                      "items-center",
                      "border-b",
                      "border-[var(--walnut-patina)]/10",
                      "pl-[58px]",
                      "py-[clamp(70px,8vw,110px)]",
                    ].join(" ")}
                  >
                    {/* =================================
                        POINT
                    ================================== */}

                    <div
                      className={[
                        "absolute",
                        "left-0",
                        "top-1/2",
                        "flex",
                        "-translate-y-1/2",
                        "items-center",
                        "justify-center",
                        "rounded-full",
                        "border",
                        "bg-[var(--ivory-vein)]",
                        "transition-all",
                        "duration-500",

                        isActive
                          ? [
                              "h-[17px]",
                              "w-[17px]",
                              "border-[var(--brand-gold)]",
                            ].join(
                              " "
                            )
                          : [
                              "h-[11px]",
                              "w-[11px]",
                              "border-[var(--walnut-patina)]/25",
                            ].join(
                              " "
                            ),
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "block",
                          "rounded-full",
                          "transition-all",
                          "duration-500",

                          isActive
                            ? "h-[5px] w-[5px] bg-[var(--brand-gold)]"
                            : "h-[3px] w-[3px] bg-[var(--walnut-patina)]/25",
                        ].join(" ")}
                      />
                    </div>

                    {/* =================================
                        CONTENT
                    ================================== */}

                    <div className="w-full">
                      <div className="flex items-center justify-between gap-8">
                        <span
                          className={[
                            "font-heading",
                            "text-[14px]",
                            "tracking-[-0.02em]",
                            "transition-colors",
                            "duration-500",

                            isActive
                              ? "text-[var(--brand-gold)]"
                              : "text-[var(--walnut-patina)]/38",
                          ].join(" ")}
                        >
                          {
                            milestone.year
                          }
                        </span>

                        <span
                          className={[
                            "h-px",
                            "transition-all",
                            "duration-700",

                            isActive
                              ? "w-14 bg-[var(--brand-gold)]"
                              : "w-7 bg-[var(--walnut-patina)]/16",
                          ].join(" ")}
                        />
                      </div>

                      <p className="mt-6 text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
                        {
                          milestone.location
                        }
                      </p>

                      <h3
                        className={[
                          "font-editorial",
                          "mt-4",
                          "max-w-[730px]",
                          "text-[clamp(40px,4.2vw,66px)]",
                          "leading-[1]",
                          "tracking-[-0.035em]",
                          "transition-all",
                          "duration-700",

                          isActive
                            ? "text-[var(--obsidian-slate)]"
                            : "text-[var(--walnut-patina)]/45",
                        ].join(" ")}
                      >
                        {
                          milestone.title
                        }
                      </h3>

                      <p
                        className={[
                          "mt-7",
                          "max-w-[680px]",
                          "text-[14px]",
                          "leading-[1.9]",
                          "transition-all",
                          "duration-700",
                          "md:text-[15px]",

                          isActive
                            ? "translate-y-0 text-[var(--walnut-patina)]/68 opacity-100"
                            : "translate-y-2 text-[var(--walnut-patina)]/42 opacity-65",
                        ].join(" ")}
                      >
                        {
                          milestone.text
                        }
                      </p>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            MOBILE / TABLET
        ================================================== */}

        <div className="relative mt-16 lg:hidden">
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-[var(--walnut-patina)]/12" />

          <div>
            {milestones.map(
              (
                milestone,
                index
              ) => (
                <article
                  key={
                    milestone.year
                  }
                  className={[
                    "relative",
                    "border-b",
                    "border-[var(--walnut-patina)]/10",
                    "py-10",
                    "pl-10",
                  ].join(" ")}
                >
                  {/* NODE */}

                  <span className="absolute left-0 top-[46px] h-[11px] w-[11px] rounded-full border border-[var(--brand-gold)] bg-[var(--ivory-vein)]">
                    <span className="absolute left-1/2 top-1/2 h-[4px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-gold)]" />
                  </span>

                  {/* YEAR */}

                  <span className="font-heading text-[14px] text-[var(--brand-gold)]">
                    {
                      milestone.year
                    }
                  </span>

                  {/* IMAGE */}

                  <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-[var(--alabaster-mist)]">
                    <Image
                      src={
                        milestone.image
                      }
                      alt={`${milestone.title}, ${milestone.year}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.035]" />

                    <span className="absolute bottom-4 right-4 text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  {/* LOCATION */}

                  <p className="mt-6 text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
                    {
                      milestone.location
                    }
                  </p>

                  {/* TITLE */}

                  <h3 className="font-editorial mt-3 text-[clamp(34px,9vw,50px)] leading-[1.02] tracking-[-0.035em]">
                    {
                      milestone.title
                    }
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-6 text-[14px] leading-[1.85] text-[var(--walnut-patina)]/62">
                    {
                      milestone.text
                    }
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </div>

      {/* =================================================
          ANIMATION
      ================================================== */}

      <style jsx global>{`
        @keyframes legacyYear {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}