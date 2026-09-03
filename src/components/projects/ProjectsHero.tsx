"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function ProjectsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
        ".projects-hero-label",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".projects-hero-title-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".projects-hero-ghost",
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.2,
          delay: 0.45,
          ease: "power3.inOut",
        }
      );

      gsap.fromTo(
        image,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.08,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          delay: 0.35,
          ease: "power4.out",
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
  data-header-theme="light"
  className="relative overflow-hidden bg-[var(--background)] pb-[clamp(90px,10vw,150px)] pt-[clamp(160px,16vw,240px)]"
>
      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT */}
<div className="flex flex-col">
  <div>
    <p className="projects-hero-label eyebrow text-[var(--text-secondary)]">
      Projects
    </p>

    <div className="mt-[clamp(55px,7vw,100px)]">
      <div className="overflow-hidden pb-[0.1em]">
        <div className="projects-hero-title-line font-heading text-[clamp(54px,6vw,96px)] leading-[0.92] tracking-[-0.055em]">
          Spaces shaped
        </div>
      </div>

      <div className="overflow-hidden pb-[0.12em]">
        <div className="projects-hero-title-line font-editorial text-[clamp(54px,6vw,96px)] leading-[0.96] tracking-[-0.045em]">
          around you.
        </div>
      </div>
    </div>
  </div>

  <div className="mt-[clamp(36px,4vw,60px)] max-w-[650px]">
    <div
      ref={lineRef}
      className="mb-6 h-px w-[82%] origin-left bg-black/15"
    />

    <p className="projects-hero-label text-[15px] leading-[1.75] text-[var(--text-secondary)] md:text-[16px]">
      Selected residential, hospitality and turnkey interiors,
      developed through material, proportion and deeply personal
      design decisions.
    </p>
  </div>
</div>

          {/* RIGHT */}
          <div className="relative min-h-[560px] lg:min-h-[640px]">
            {/* Ghost typography */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 select-none text-right"
            >
              <div className="projects-hero-ghost font-heading text-[clamp(70px,8vw,128px)] leading-[0.82] tracking-[-0.07em] text-black/[0.035]">
                PROJECTS
              </div>

              <div className="projects-hero-ghost font-heading text-[clamp(70px,8vw,128px)] leading-[0.82] tracking-[-0.07em] text-black/[0.025]">
                PROJECTS
              </div>

              <div className="projects-hero-ghost font-heading text-[clamp(70px,8vw,128px)] leading-[0.82] tracking-[-0.07em] text-black/[0.018]">
                PROJECTS
              </div>
            </div>

            {/* Image strip */}
            <div
              ref={imageRef}
              className="absolute bottom-0 right-0 w-[72%] overflow-hidden will-change-transform max-lg:w-[82%]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/projects/project-01.jpg"
                  alt="Mercure Homes project"
                  fill
                  priority
                  sizes="(max-width: 1024px) 82vw, 40vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/[0.04]" />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  Selected Work
                </span>

                <span className="text-[9px] tracking-[0.18em] text-[var(--text-muted)]">
                  01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}