"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Years",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Installations",
  },
  {
    value: 38,
    suffix: "",
    label: "Countries",
  },
];

const brands = [
  {
    number: "01",
    title: "SDP Machines",
    subtitle: "Engineering",
    image: "/images/legacy/sdp-machines.jpg",
    text:
      "Precision engineering shaped through decades of stone-processing expertise.",
    href: "/sdp-group",
  },
  {
    number: "02",
    title: "SDP Stones",
    subtitle: "Materials",
    image: "/images/legacy/sdp-stones.webp",
    text:
      "Natural stone knowledge extending from global sourcing into the built environment.",
    href: "/sdp-group",
  },
  {
    number: "03",
    title: "Mercure Homes",
    subtitle: "Interiors",
    image: "/images/legacy/mercure-homes.jpg",
    text:
      "Personal interiors where craft, material and design come together.",
    href: "/sdp-group",
  },
];

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      /* =====================================
         INTRO
      ====================================== */

      gsap.fromTo(
        ".legacy-intro",
        {
          opacity: 0,
          y: 40,
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

      /* =====================================
         HERO IMAGE REVEAL
      ====================================== */

      gsap.fromTo(
        ".legacy-main-image-wrap",
        {
          clipPath: "inset(8% 0% 8% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-main-image-wrap",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".legacy-main-image",
        {
          scale: 1.1,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: ".legacy-main-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      /* =====================================
         COUNTERS
      ====================================== */

      gsap.utils
        .toArray<HTMLElement>(".legacy-number")
        .forEach((element, index) => {
          const finalValue = stats[index].value;

          const counter = {
            value: 0,
          };

          gsap.to(counter, {
            value: finalValue,
            duration: 1.8,
            ease: "power2.out",

            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },

            onUpdate: () => {
              element.textContent =
                Math.round(counter.value).toLocaleString();
            },
          });
        });

      /* =====================================
         BRAND CARDS
      ====================================== */

      gsap.utils
        .toArray<HTMLElement>(".legacy-brand-card")
        .forEach((card) => {
          const image =
            card.querySelector<HTMLElement>(
              ".legacy-brand-image"
            );

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
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
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }
            );
          }
        });

      /* =====================================
         MATERIAL BRIDGE
      ====================================== */

      gsap.fromTo(
        ".legacy-material",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-material",
            start: "top 82%",
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
        "py-[clamp(130px,15vw,230px)]",
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
        <div className="absolute left-[-8%] top-[8%] h-[440px] w-[440px] rounded-full bg-[var(--caramel-bronze)]/[0.055] blur-[150px]" />

        <div className="absolute bottom-[10%] right-[-8%] h-[520px] w-[520px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[170px]" />
      </div>

      <div className="site-container relative z-10">

        {/* =====================================
            INTRO
        ====================================== */}

        <div className="legacy-intro">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            {/* LEFT */}

            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  The SDP Group
                </p>
              </div>

              <div className="mt-10 flex items-end gap-4">
                <span className="font-heading text-[clamp(120px,17vw,250px)] leading-[0.72] tracking-[-0.09em] text-[var(--ivory-vein)]">
                  50
                </span>

                <div className="pb-3">
                  <span className="font-heading text-[40px] text-[var(--brand-gold)]">
                    +
                  </span>

                  <p className="mt-2 max-w-[140px] text-[9px] uppercase leading-[1.6] tracking-[0.22em] text-[var(--alabaster-mist)]/45">
                    Years of precision
                    and material knowledge
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="lg:pb-5">
              <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--alabaster-mist)]/38">
                An SDP Group Company
              </p>

              <h2
                className={[
                  "mt-6 max-w-[860px]",
                  "text-[clamp(48px,6vw,92px)]",
                  "leading-[0.96]",
                  "tracking-[-0.045em]",
                ].join(" ")}
              >
                <span className="font-heading">
                  Precision became
                </span>

                <br />

                <span className="font-editorial">
                  a way of designing.
                </span>
              </h2>

              <p className="mt-8 max-w-[600px] text-[15px] leading-[1.85] text-[var(--alabaster-mist)]/58">
                Mercure Homes carries forward a legacy shaped
                by engineering, natural stone and decades of
                making with precision.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================
            CINEMATIC LEGACY IMAGE
        ====================================== */}

        <div className="legacy-main-image-wrap relative mt-[clamp(70px,8vw,120px)] overflow-hidden">
          <div className="relative aspect-[16/8] min-h-[420px]">
            <div className="legacy-main-image absolute inset-[-5%]">
              <Image
                src="/images/legacy/legacy-main.webp"
                alt="SDP Group legacy"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-slate)]/55 via-transparent to-[var(--obsidian-slate)]/10" />

            {/* image caption */}

            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between md:bottom-9 md:left-9 md:right-9">
              <div>
                <p className="text-[9px] uppercase tracking-[0.23em] text-[var(--brand-gold)]">
                  Built on experience
                </p>

                <p className="mt-2 font-heading text-[clamp(24px,3vw,38px)] tracking-[-0.035em] text-[var(--ivory-vein)]">
                  From engineering to interiors
                </p>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/50 md:block">
                Since 1970s
              </span>
            </div>
          </div>
        </div>

        {/* =====================================
            STATS
        ====================================== */}

        <div className="mt-[clamp(55px,6vw,90px)] grid border-y border-[var(--alabaster-mist)]/10 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "py-9 md:py-11",
                index !== stats.length - 1
                  ? "sm:border-r sm:border-[var(--alabaster-mist)]/10"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-end justify-between px-0 sm:px-7 lg:px-10">
                <div className="flex items-start">
                  <span className="legacy-number font-heading text-[clamp(48px,5vw,76px)] leading-none tracking-[-0.055em]">
                    0
                  </span>

                  {stat.suffix && (
                    <span className="ml-1 mt-1 text-[16px] text-[var(--brand-gold)]">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="pb-1 text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================
            BRAND LINEAGE
        ====================================== */}

        <div className="mt-[clamp(110px,12vw,180px)]">

          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  One Legacy
                </p>
              </div>

              <h3 className="mt-7 font-editorial text-[clamp(42px,5vw,76px)] leading-[1] tracking-[-0.035em]">
                Three disciplines.
                <br />
                One understanding of making.
              </h3>
            </div>

            <Link
              href="/sdp-group"
              className="group hidden items-center gap-5 text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/55 md:flex"
            >
              Discover the group

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>

          {/* Visual cards */}

          <div className="grid gap-6 lg:grid-cols-3">
            {brands.map((brand) => (
              <Link
                key={brand.title}
                href={brand.href}
                data-cursor="Explore"
                className="legacy-brand-card group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="legacy-brand-image absolute inset-[-4%]">
                    <Image
                      src={brand.image}
                      alt={brand.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/[0.08]" />

                  <span className="absolute left-6 top-6 text-[9px] tracking-[0.2em] text-[var(--brand-gold)]">
                    {brand.number}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                      {brand.subtitle}
                    </p>

                    <h4 className="mt-3 font-heading text-[clamp(30px,3vw,44px)] leading-none tracking-[-0.04em]">
                      {brand.title}
                    </h4>

                    <p className="mt-4 max-w-[330px] text-[13px] leading-[1.7] text-[var(--alabaster-mist)]/65">
                      {brand.text}
                    </p>

                    <span className="mt-6 inline-block text-[16px] text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/sdp-group"
            className="group mt-9 flex w-fit items-center gap-4 text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/55 md:hidden"
          >
            Discover the group

            <span className="text-[var(--brand-gold)]">
              ↗
            </span>
          </Link>
        </div>

        {/* =====================================
            MATERIAL BRIDGE
        ====================================== */}

        <div
          className={[
            "legacy-material",
            "mt-[clamp(120px,14vw,210px)]",
            "grid gap-12",
            "border-t border-[var(--alabaster-mist)]/10",
            "pt-[clamp(60px,7vw,100px)]",
            "lg:grid-cols-[0.85fr_1.15fr]",
            "lg:items-center",
          ].join(" ")}
        >
          {/* IMAGE */}

          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/legacy/material-bridge.webp"
              alt="Natural stone material detail"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-[1600ms] hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.04]" />

            <div className="absolute bottom-6 left-6">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                Material Intelligence
              </p>
            </div>
          </div>

          {/* TEXT */}

          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The Material Bridge
              </p>
            </div>

            <blockquote className="mt-8 max-w-[900px] font-editorial text-[clamp(38px,4.8vw,72px)] leading-[1.04] tracking-[-0.035em] text-[var(--ivory-vein)]">
              The understanding of stone
              that begins at the source,
              continues into the home.
            </blockquote>

            <p className="mt-7 max-w-[520px] text-[14px] leading-[1.85] text-[var(--alabaster-mist)]/55">
              Material expertise moves through the group —
              from sourcing and engineering to the way
              surfaces are ultimately experienced within a space.
            </p>

            <Link
              href="/collections"
              className="group mt-9 flex w-fit items-center gap-5 text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/60"
            >
              Explore materials & collections

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}