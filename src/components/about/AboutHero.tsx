"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".about-hero-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".about-hero-copy",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.75,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );

      gsap.to(image, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* IMAGE */}
      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src="/images/about/hero.jpg"
          alt="Mercure Homes luxury interior atelier in Bengaluru"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* WARM BRAND OVERLAY */}
      <div className="absolute inset-0 bg-[var(--walnut-patina)]/20" />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/80",
          "via-[var(--obsidian-slate)]/12",
          "to-[var(--obsidian-slate)]/28",
        ].join(" ")}
      />

      {/* CONTENT */}
      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[9vh] pt-36">
        <div className="w-full">
          {/* META */}
          <div className="about-hero-meta mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                About Mercure Homes
              </p>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <span className="text-[9px] uppercase tracking-[0.24em] text-[var(--alabaster-mist)]/48">
                Bengaluru · India
              </span>

              <span className="h-px w-8 bg-[var(--brand-gold)]/45" />
            </div>
          </div>

          {/* TITLE */}
          <div
            className={[
              "max-w-[1200px]",
              "text-[clamp(54px,7.7vw,124px)]",
              "leading-[0.92]",
              "tracking-[-0.05em]",
              "text-[var(--ivory-vein)]",
            ].join(" ")}
          >
            <div className="overflow-hidden pb-[0.08em]">
              <div className="about-hero-line font-heading">
                A home is never
              </div>
            </div>

            <div className="overflow-hidden pb-[0.1em]">
              <div className="about-hero-line font-editorial">
                simply furnished.
              </div>
            </div>

            <div className="overflow-hidden pb-[0.08em]">
              <div className="about-hero-line font-heading">
                It is composed.
              </div>
            </div>
          </div>

          {/* SUPPORTING FACT */}
          <div className="about-hero-copy mt-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[680px] text-[14px] leading-[1.85] text-[var(--alabaster-mist)]/66 md:text-[15px]">
              Mercure Homes is a luxury interior atelier based
              in Bengaluru, India, where Italian contemporary
              design meets Indian craftsmanship.
            </p>

            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--brand-gold)]/65" />

              <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/42">
                An SDP Group Company
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}