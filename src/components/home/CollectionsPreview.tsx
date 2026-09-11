"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { homeCollections } from "../../data/collections";
import { getGSAP } from "../../lib/gsap";

export default function CollectionsPreview() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const horizontalSection = horizontalSectionRef.current;
    const track = trackRef.current;

    if (!horizontalSection || !track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    if (reduceMotion || !desktop) return;

    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return Math.max(
          0,
          track.scrollWidth - window.innerWidth
        );
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),

        ease: "none",

        scrollTrigger: {
          trigger: horizontalSection,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(
          ".mercure-collection-image"
        )
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              xPercent: -3,
              scale: 1.07,
            },
            {
              xPercent: 5,
              scale: 1,
              ease: "none",

              scrollTrigger: {
                trigger: image,
                containerAnimation:
                  horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
    }, horizontalSection);

    const refreshTimer =
      window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="collections"
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* subtle brand atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[8%] h-[260px] w-[260px] rounded-full bg-[var(--walnut-patina)]/[0.07] blur-[100px]" />

        <div className="absolute bottom-[10%] right-[8%] h-[320px] w-[320px] rounded-full bg-[var(--caramel-bronze)]/[0.045] blur-[120px]" />
      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div className="relative z-10 hidden lg:block">
        {/* INTRO */}

        <div className="site-container pb-[90px] pt-[150px]">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-2">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  Our Collections
                </p>
              </div>
            </div>

            <div className="col-span-8 col-start-4">
              <h2 className="font-heading max-w-[1050px] text-[clamp(58px,6.5vw,105px)] leading-[0.93] tracking-[-0.05em] text-[var(--ivory-vein)]">
                Designed for
                <br />

                <span className="font-editorial tracking-[-0.035em]">
                  the way you live.
                </span>
              </h2>

              <div className="mt-10 flex items-end justify-between gap-10">
                <p className="max-w-[520px] text-[15px] leading-[1.85] text-[var(--alabaster-mist)]/60">
                  Four distinct collections.
                  Each one shaped by material,
                  proportion and the way a space
                  is meant to feel.
                </p>

                <div className="flex items-center gap-5">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[var(--alabaster-mist)]/42">
                    Scroll to explore
                  </span>

                  <span className="relative h-px w-14 overflow-hidden bg-[var(--alabaster-mist)]/15">
                    <span className="absolute inset-y-0 left-0 w-1/2 bg-[var(--brand-gold)]" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL EXPERIENCE */}

        <div
          ref={horizontalSectionRef}
          className="relative h-screen overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex h-full w-max items-center gap-[28px] pl-[var(--page-padding)] pr-[20vw]"
          >
            {homeCollections.map(
              (collection, index) => (
                <article
                  key={collection.slug}
                  className="w-[72vw] shrink-0"
                >
                  <Link
                    href={collection.href}
                    data-cursor="Explore"
                    className="group block"
                  >
                    {/* IMAGE */}

                    <div className="relative h-[64vh] min-h-[500px] overflow-hidden">
                      <div className="mercure-collection-image absolute inset-[-5%]">
                        <Image
                          src={collection.image}
                          alt={collection.title}
                          fill
                          sizes="72vw"
                          priority={index === 0}
                          className="object-cover"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/[0.08] transition-colors duration-700 group-hover:bg-black/[0.14]" />

                      {/* INDEX */}

                      <div className="absolute left-7 top-7 flex items-center gap-3">
                        <span className="text-[9px] tracking-[0.22em] text-[var(--brand-gold)]">
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span className="h-px w-7 bg-[var(--brand-gold)]/70" />
                      </div>

                      {/* ARROW */}

                      <span className="absolute right-7 top-7 text-[18px] text-[var(--ivory-vein)]/80 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>

                    {/* DETAILS */}

                    <div className="mt-7 grid grid-cols-[1fr_0.85fr] gap-12 border-t border-[var(--alabaster-mist)]/10 pt-6">
                      <div>
                        <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]/80">
                          {collection.subtitle}
                        </p>

                        <h3 className="font-heading text-[clamp(42px,4vw,64px)] leading-none tracking-[-0.045em] text-[var(--ivory-vein)]">
                          {collection.title}
                        </h3>
                      </div>

                      <div className="pt-1">
                        <p className="max-w-[430px] text-[14px] leading-[1.8] text-[var(--alabaster-mist)]/58">
                          {collection.description}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/65">
                          Explore collection

                          <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            )}
          </div>
        </div>

        <div className="h-[90px]" />
      </div>

      {/* =====================================================
          MOBILE / TABLET
      ===================================================== */}

      <div className="site-container relative z-10 py-[110px] lg:hidden">
        <div className="flex items-center gap-4">
          <span className="h-px w-7 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            Our Collections
          </p>
        </div>

        <h2 className="font-heading mt-8 text-[clamp(44px,12vw,68px)] leading-[0.95] tracking-[-0.05em] text-[var(--ivory-vein)]">
          Designed for
          <br />

          <span className="font-editorial tracking-[-0.035em]">
            the way you live.
          </span>
        </h2>

        <p className="mt-7 max-w-[500px] text-[14px] leading-[1.85] text-[var(--alabaster-mist)]/60">
          Four distinct collections, shaped by
          material, proportion and the way a
          space is meant to feel.
        </p>

        <div className="mt-16 space-y-20">
          {homeCollections.map(
            (collection, index) => (
              <article
                key={collection.slug}
              >
                <Link
                  href={collection.href}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-black/[0.05]" />

                    <div className="absolute left-5 top-5 flex items-center gap-3">
                      <span className="text-[9px] tracking-[0.2em] text-[var(--brand-gold)]">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="h-px w-6 bg-[var(--brand-gold)]/70" />
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--alabaster-mist)]/10 pt-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--brand-gold)]/80">
                      {collection.subtitle}
                    </p>

                    <div className="mt-2 flex items-start justify-between gap-6">
                      <h3 className="font-heading text-[36px] leading-none tracking-[-0.04em] text-[var(--ivory-vein)]">
                        {collection.title}
                      </h3>

                      <span className="mt-2 text-lg text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>

                    <p className="mt-5 text-[14px] leading-[1.8] text-[var(--alabaster-mist)]/58">
                      {collection.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/62">
                      Explore collection

                      <span className="text-[var(--brand-gold)]">
                        ↗
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}