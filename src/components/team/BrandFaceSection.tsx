"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function BrandFaceSection() {
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
        gsap.fromTo(
          ".brand-face-intro",
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".brand-face-image",
          {
            clipPath:
              "inset(8% 0% 8% 0%)",
          },
          {
            clipPath:
              "inset(0% 0% 0% 0%)",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger:
                ".brand-face-image",
              start: "top 85%",
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
        "bg-[var(--ivory-vein)]",
        "py-[clamp(100px,11vw,165px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div className="site-container">
        <div className="brand-face-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Brand Face
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[850px]",
                "text-[clamp(42px,5.2vw,76px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Marketing-facing
              </span>{" "}

              <span className="font-editorial">
                profile pending.
              </span>
            </h2>
          </div>
        </div>

        <div
          className={[
            "mt-[clamp(60px,7vw,95px)]",
            "grid gap-12",
            "lg:grid-cols-[0.82fr_1.18fr]",
            "lg:items-center",
            "lg:gap-[clamp(60px,7vw,110px)]",
          ].join(" ")}
        >
          {/* IMAGE PLACEHOLDER */}

          <div className="brand-face-image relative overflow-hidden">
            <div className="relative aspect-[4/5] bg-[var(--alabaster-mist)]">
              <Image
                src="/images/team/brand-face.jpg"
                alt="Mercure Homes marketing brand face"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.03]" />
            </div>
          </div>

          {/* CONTENT PLACEHOLDER */}

          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
              Pending confirmation
            </p>

            <div className="mt-7 border-y border-[var(--walnut-patina)]/12 py-8">
              <p className="max-w-[680px] font-editorial text-[clamp(26px,3vw,42px)] leading-[1.18] tracking-[-0.025em] text-[var(--walnut-patina)]/45">
                Short marketing-facing bio pending from client.
              </p>
            </div>

            <p className="mt-7 max-w-[600px] text-[13px] leading-[1.8] text-[var(--walnut-patina)]/48">
              This profile will be used as the more social and lead-generation-facing brand presence, distinct from the founder&apos;s note.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}