"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function AboutStory() {
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
      gsap.fromTo(
        ".about-story-label",
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
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-story-line",
        {
          opacity: 0.16,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-story-heading",
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-story-copy",
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
            trigger: ".about-story-copy",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-story-image-wrap",
        {
          clipPath: "inset(10% 0% 10% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-story-image-wrap",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-story-image",
        {
          scale: 1.08,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-story-image-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(90px,14vw,90px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* subtle atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[6%] top-[12%] h-[320px] w-[320px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[130px]" />

        <div className="absolute bottom-[8%] right-[5%] h-[360px] w-[360px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[140px]" />
      </div>

      <div className="site-container relative z-10">
        {/* top label */}
        <div className="about-story-label flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              Our Story
            </p>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/42 md:block">
            Bengaluru · India
          </span>
        </div>

        {/* main editorial statement */}
        <div className="about-story-heading mt-[clamp(55px,7vw,95px)] max-w-[1120px]">
          <div className="overflow-hidden pb-[0.08em]">
            <div className="about-story-line font-heading text-[clamp(50px,6.3vw,96px)] leading-[0.95] tracking-[-0.05em]">
              Personalisation is not
            </div>
          </div>

          <div className="overflow-hidden pb-[0.1em]">
            <div className="about-story-line font-editorial text-[clamp(50px,6.3vw,96px)] leading-[0.95] tracking-[-0.04em]">
              an option.
            </div>
          </div>

          <div className="overflow-hidden pb-[0.08em]">
            <div className="about-story-line font-heading text-[clamp(50px,6.3vw,96px)] leading-[0.95] tracking-[-0.05em]">
              It is the starting point.
            </div>
          </div>
        </div>

        {/* story composition */}
        <div className="mt-[clamp(80px,9vw,135px)] grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-[clamp(70px,8vw,130px)]">
          {/* image */}
          <div className="about-story-image-wrap relative overflow-hidden">
            <div className="relative aspect-[4/5]">
              <div className="about-story-image absolute inset-[-5%]">
                <Image
                  src="/images/about/story.jpg"
                  alt="Mercure Homes craftsmanship and interior detail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.04]" />

              <div className="absolute bottom-6 left-6">
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  Material · Craft · Precision
                </p>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="about-story-copy lg:pt-10">
            <p className="max-w-[650px] text-[17px] leading-[1.9] text-[var(--walnut-patina)]/72">
              Mercure Homes is a luxury interior atelier based in
              Bengaluru, India, where Italian contemporary design
              meets Indian craftsmanship. We believe a home is
              never simply furnished; it is composed. Every
              decision is deliberate, nothing is ornamental for
              its own sake, and every piece that leaves our
              atelier carries the story of the family it was made
              for.
            </p>

            <div className="my-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--brand-gold)]" />

              <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40">
                The newest chapter of the SDP Group
              </span>
            </div>

            <p className="max-w-[650px] text-[15px] leading-[1.9] text-[var(--walnut-patina)]/62">
              We are the newest chapter of the SDP Group, a
              fifty-year-old family of companies built on stone,
              precision engineering and material mastery. What
              began as a foundry in Ajmer became a marble house
              in Kishangarh, then a machine manufacturer
              competing with global giants, then a stone importer
              curating from thirty-eight countries. Mercure Homes
              is where all of that expertise finally arrives at
              the home itself.
            </p>

            {/* small lineage row */}
            <div className="mt-12 grid grid-cols-3 border-y border-[var(--walnut-patina)]/12">
              <div className="py-5">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                  01
                </p>

                <p className="mt-2 font-heading text-[15px] tracking-[-0.02em]">
                  Stone
                </p>
              </div>

              <div className="border-l border-[var(--walnut-patina)]/10 px-5 py-5">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                  02
                </p>

                <p className="mt-2 font-heading text-[15px] tracking-[-0.02em]">
                  Precision
                </p>
              </div>

              <div className="border-l border-[var(--walnut-patina)]/10 pl-5 py-5">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                  03
                </p>

                <p className="mt-2 font-heading text-[15px] tracking-[-0.02em]">
                  Interiors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* decorative M */}
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute right-[-6vw] top-[15%]",
          "select-none",
          "font-heading",
          "text-[clamp(220px,28vw,520px)]",
          "leading-none",
          "text-[var(--walnut-patina)]/[0.018]",
        ].join(" ")}
      >
        M
      </div>
    </section>
  );
}