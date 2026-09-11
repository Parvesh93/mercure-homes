"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function TeamPhotoSection() {
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
      /* INTRO */

      gsap.fromTo(
        ".team-photo-intro",
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

      /* IMAGE REVEAL */

      gsap.fromTo(
        image,
        {
          clipPath: "inset(8% 0% 8% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: image,
            start: "top 82%",
            once: true,
          },
        }
      );

      /* IMAGE PARALLAX */

      gsap.fromTo(
        ".team-photo-image",
        {
          scale: 1.08,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: image,
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
        "bg-[var(--alabaster-mist)]",
        "py-[clamp(110px,12vw,180px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div className="site-container">
        {/* ================================
            INTRO
        ================================= */}

        <div className="team-photo-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The Studio
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(44px,5.5vw,80px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                The people behind
              </span>{" "}

              <span className="font-editorial">
                the work.
              </span>
            </h2>
          </div>
        </div>

        {/* ================================
            TEAM IMAGE
        ================================= */}

        <div
          ref={imageRef}
          className="relative mt-[clamp(60px,7vw,100px)] overflow-hidden"
        >
          <div className="relative aspect-[16/8] min-h-[420px]">
            <div className="team-photo-image absolute inset-[-4%]">
              <Image
                src="/images/team/team-photo.jpg"
                alt="Mercure Homes team at the Bengaluru Experience Centre"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.04]" />

            <div
              className={[
                "absolute inset-0",
                "bg-gradient-to-t",
                "from-[var(--obsidian-slate)]/45",
                "via-transparent",
                "to-transparent",
              ].join(" ")}
            />

            {/* IMAGE CAPTION */}

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                  Mercure Homes
                </p>

                <p className="mt-2 font-heading text-[clamp(22px,2.8vw,36px)] tracking-[-0.03em] text-[var(--ivory-vein)]">
                  Bengaluru Studio
                </p>
              </div>

              <span className="hidden text-[8px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/55 md:block">
                Experience Centre
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}