"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   COMPANIES
========================================================= */

const companies = [
  {
    number: "01",
    title: "SDP Machines",
    label: "Engineering",
    image: "/images/about/sdp-machines.jpg",
    description:
      "Based in Ajmer, Rajasthan, South Asia's leading stone-processing machine manufacturer, exported globally.",
  },
  {
    number: "02",
    title: "SDP Stones",
    label: "Material",
    image: "/images/about/sdp-stones.jpg",
    description:
      "Importers and processors of exotic natural stone, sourced from thirty-eight countries.",
  },
  {
    number: "03",
    title: "Mercure Homes",
    label: "Interiors",
    image: "/images/about/mercure-homes.jpg",
    description:
      "The Group's interior atelier, where material knowledge and engineering precision finally become a home.",
  },
];

/* =========================================================
   VALUES
========================================================= */

const values = [
  {
    number: "01",
    title: "Craftsmanship",
    text:
      "Quiet mastery, rooted in artistry, heritage and an uncompromising attention to detail.",
    icon: "craft",
  },
  {
    number: "02",
    title: "Personalisation",
    text:
      "Every creation is tailored around the client — from dimensions and materials to finishes and details.",
    icon: "personal",
  },
  {
    number: "03",
    title: "Integrity",
    text:
      "Transparent in process, honest in material and uncompromising in the authenticity of what we make.",
    icon: "integrity",
  },
  {
    number: "04",
    title: "Guidance",
    text:
      "We mentor rather than sell, helping every client navigate materials, ideas and decisions with clarity.",
    icon: "guidance",
  },
  {
    number: "05",
    title: "Confidence",
    text:
      "Quiet authority rooted in expertise — assured without excess, considered without compromise.",
    icon: "confidence",
  },
];

/* =========================================================
   VALUE ICON
========================================================= */

function ValueIcon({
  type,
}: {
  type: string;
}) {
  const commonProps = {
    width: 38,
    height: 38,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "craft":
      return (
        <svg {...commonProps}>
          <path d="M7 25 23 9" />
          <path d="m20 7 5 5" />
          <path d="M6 21 11 26" />
          <path d="M17 6h9v9" />
        </svg>
      );

    case "personal":
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="11" r="4" />
          <path d="M8 26c.8-5.2 3.5-8 8-8s7.2 2.8 8 8" />
          <path d="M5 8V5h3" />
          <path d="M24 5h3v3" />
        </svg>
      );

    case "integrity":
      return (
        <svg {...commonProps}>
          <path d="M16 4 26 8v7c0 6.2-4 10.6-10 13-6-2.4-10-6.8-10-13V8l10-4Z" />
          <path d="m11.5 16 3 3 6-7" />
        </svg>
      );

    case "guidance":
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="16" r="11" />
          <path d="m19.5 12.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
        </svg>
      );

    case "confidence":
      return (
        <svg {...commonProps}>
          <circle cx="16" cy="16" r="11" />
          <circle cx="16" cy="16" r="5" />
          <circle
            cx="16"
            cy="16"
            r="1.2"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   SECTION
========================================================= */

export default function SDPGroupSection() {
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
        /* =====================================
           INTRO
        ====================================== */

        gsap.fromTo(
          ".sdp-about-intro",
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
              trigger:
                section,
              start:
                "top 78%",
              once: true,
            },
          }
        );

        /* =====================================
           COMPANY CARDS
        ====================================== */

        gsap.utils
          .toArray<HTMLElement>(
            ".sdp-about-card"
          )
          .forEach(
            (
              card,
              index
            ) => {
              const image =
                card.querySelector<HTMLElement>(
                  ".sdp-about-image"
                );

              gsap.fromTo(
                card,
                {
                  opacity: 0,
                  y: 50,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  delay:
                    index *
                    0.08,
                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger:
                      card,
                    start:
                      "top 85%",
                    once: true,
                  },
                }
              );

              if (image) {
                gsap.fromTo(
                  image,
                  {
                    scale: 1.08,
                  },
                  {
                    scale: 1,
                    ease:
                      "none",

                    scrollTrigger:
                      {
                        trigger:
                          card,
                        start:
                          "top bottom",
                        end:
                          "bottom top",
                        scrub: 1,
                      },
                  }
                );
              }
            }
          );

        /* =====================================
           CONNECTION LINE
        ====================================== */

        gsap.fromTo(
          ".sdp-line-progress",
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 1.5,
            ease:
              "power3.inOut",

            scrollTrigger: {
              trigger:
                ".sdp-about-line",
              start:
                "top 85%",
              once: true,
            },
          }
        );

        /* =====================================
           VALUES
        ====================================== */

        gsap.fromTo(
          ".about-values",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                ".about-values",
              start:
                "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".about-value-card",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.75,
            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                ".about-values-grid",
              start:
                "top 88%",
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
        "bg-[var(--alabaster-mist)]",
        "py-[clamp(90px,14vw,90px)]",
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
        <div className="absolute -left-[8%] top-[10%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[140px]" />

        <div className="absolute bottom-[8%] right-[-6%] h-[420px] w-[420px] rounded-full bg-[var(--caramel-bronze)]/[0.025] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            SDP GROUP INTRO
        ====================================== */}

        <div className="sdp-about-intro grid gap-12 lg:grid-cols-[0.72fr_2.28fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The SDP Group
              </p>
            </div>
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/45">
              A fifty-year legacy
            </p>

            <h2
              className={[
                "mt-6 max-w-[1000px]",
                "text-[clamp(48px,6vw,92px)]",
                "leading-[0.96]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                From engineering
              </span>

              <br />

              <span className="font-editorial">
                to the interior.
              </span>
            </h2>

            <p className="mt-8 max-w-[680px] text-[15px] leading-[1.9] text-[var(--walnut-patina)]/65 md:text-[16px]">
              Mercure Homes is the
              newest chapter of the SDP
              Group — a fifty-year-old
              family of companies built
              on stone, precision
              engineering and material
              mastery.
            </p>
          </div>
        </div>

        {/* =====================================
            COMPANY LINEAGE
        ====================================== */}

        <div className="mt-[clamp(80px,9vw,135px)]">
          <div className="grid gap-7 lg:grid-cols-3">
            {companies.map(
              (company) => (
                <article
                  key={
                    company.title
                  }
                  className="sdp-about-card group"
                >
                  <div
                    data-cursor="Explore"
                    className="relative aspect-[4/5] overflow-hidden"
                  >
                    <div className="sdp-about-image absolute inset-[-4%]">
                      <Image
                        src={
                          company.image
                        }
                        alt={
                          company.title
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>

                    <div
                      className={[
                        "absolute inset-0",
                        "bg-gradient-to-t",
                        "from-[var(--obsidian-slate)]/68",
                        "via-[var(--obsidian-slate)]/5",
                        "to-[var(--obsidian-slate)]/10",
                      ].join(" ")}
                    />

                    {/* number */}

                    <span className="absolute left-6 top-6 text-[9px] tracking-[0.22em] text-[var(--brand-gold)]">
                      {
                        company.number
                      }
                    </span>

                    {/* label */}

                    <span className="absolute right-6 top-6 text-[8px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/65">
                      {
                        company.label
                      }
                    </span>

                    {/* title */}

                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-heading text-[clamp(30px,3vw,44px)] leading-none tracking-[-0.04em] text-[var(--ivory-vein)]">
                        {
                          company.title
                        }
                      </h3>

                      <span className="mt-5 block h-px w-10 bg-[var(--brand-gold)] transition-all duration-700 group-hover:w-20" />
                    </div>
                  </div>

                  <p className="mt-6 max-w-[390px] text-[13px] leading-[1.8] text-[var(--walnut-patina)]/62">
                    {
                      company.description
                    }
                  </p>
                </article>
              )
            )}
          </div>

          {/* =================================
              CONNECTION LINE
          ================================== */}

          <div className="sdp-about-line relative mt-[clamp(65px,7vw,100px)] hidden lg:block">
            <div className="absolute left-0 right-0 top-[5px] h-px bg-[var(--walnut-patina)]/12" />

            <div className="sdp-line-progress absolute left-0 right-0 top-[5px] h-px origin-left bg-[var(--brand-gold)]/65" />

            <div className="relative grid grid-cols-3">
              {companies.map(
                (company) => (
                  <div
                    key={
                      company.title
                    }
                    className="flex flex-col items-center"
                  >
                    <span className="relative z-10 h-[11px] w-[11px] rounded-full border border-[var(--brand-gold)] bg-[var(--alabaster-mist)]" />

                    <span className="mt-4 text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40">
                      {
                        company.label
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* =================================
              SDP CTA
          ================================== */}

          <div className="mt-10 flex justify-end">
            <Link
              href="/sdp-group"
              className={[
                "group flex items-center gap-4",
                "text-[9px]",
                "uppercase",
                "tracking-[0.22em]",
                "text-[var(--walnut-patina)]/55",
              ].join(" ")}
            >
              <span>
                Explore the SDP Group
              </span>

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* =================================================
            VALUES — COMPACT
        ================================================== */}

        <div
          className={[
            "about-values",
            "mt-[clamp(90px,9vw,135px)]",
            "border-t",
            "border-[var(--walnut-patina)]/12",
            "pt-[clamp(50px,5vw,70px)]",
          ].join(" ")}
        >
          {/* =================================
              VALUES HEADER
          ================================== */}

          <div className="grid gap-8 lg:grid-cols-[0.7fr_2.3fr]">
            <div className="flex items-start gap-4">
              <span className="mt-[5px] h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Our Values
              </p>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42">
                What guides every
                decision
              </p>

              <h2
                className={[
                  "mt-5 max-w-[900px]",
                  "text-[clamp(40px,4.8vw,70px)]",
                  "leading-[0.98]",
                  "tracking-[-0.045em]",
                ].join(" ")}
              >
                <span className="font-heading">
                  Built on principles
                </span>{" "}

                <span className="font-editorial">
                  that stay constant.
                </span>
              </h2>
            </div>
          </div>

          {/* =================================
              VALUES GRID
          ================================== */}

          <div
            className={[
              "about-values-grid",
              "mt-[clamp(45px,5vw,65px)]",
              "grid",
              "border-t",
              "border-[var(--walnut-patina)]/12",
              "sm:grid-cols-2",
              "lg:grid-cols-[0.7fr_repeat(5,1fr)]",
            ].join(" ")}
          >
            {/* INTRO COLUMN */}

            <div
              className={[
                "border-b",
                "border-[var(--walnut-patina)]/10",
                "py-7 pr-8",
                "sm:col-span-2",
                "lg:col-span-1",
                "lg:border-b-0",
                "lg:border-r",
                "lg:border-[var(--walnut-patina)]/10",
              ].join(" ")}
            >
              <p className="max-w-[210px] text-[12px] leading-[1.75] text-[var(--walnut-patina)]/55">
                Five principles that
                guide how we design,
                make and work.
              </p>
            </div>

            {/* VALUE CARDS */}

            {values.map((value) => (
  <article
    key={value.title}
    className={[
      "about-value-card",
      "group relative",
      "border-b",
      "border-[var(--walnut-patina)]/10",
      "py-7",
      "sm:px-6",
      "lg:border-b-0",
      "lg:border-r",
      "lg:border-[var(--walnut-patina)]/10",
      "lg:last:border-r-0",
    ].join(" ")}
  >
    {/* ICON */}

    <div
      className={[
        "flex h-[46px] items-start",
        "text-[var(--caramel-bronze)]/70",
        "transition-all duration-500",
        "group-hover:-translate-y-1",
        "group-hover:text-[var(--brand-gold)]",
      ].join(" ")}
    >
      <ValueIcon type={value.icon} />
    </div>

    {/* TITLE */}

    <h3
      className={[
        "font-heading",
        "mt-5",
        "text-[clamp(20px,1.5vw,25px)]",
        "leading-none",
        "tracking-[-0.035em]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {value.title}
    </h3>

    {/* DESCRIPTION */}

    <p className="mt-4 text-[12px] leading-[1.7] text-[var(--walnut-patina)]/55">
      {value.text}
    </p>

    {/* ACCENT */}

    <span
      className={[
        "mt-6 block",
        "h-px w-6",
        "bg-[var(--brand-gold)]/55",
        "transition-all duration-500",
        "group-hover:w-12",
      ].join(" ")}
    />
  </article>
))}
          </div>
        </div>
      </div>
    </section>
  );
}