"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function SDPGroupHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      /* =================================================
         REDUCED MOTION
      ================================================== */

      if (reduceMotion) {
        gsap.set(
          [
            ".sdp-hero-line",
            ".sdp-hero-meta",
            ".sdp-hero-description",
            ".sdp-hero-number",
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            yPercent: 0,
          }
        );

        gsap.set(image, {
          scale: 1,
          yPercent: 0,
        });

        return;
      }

      /* =================================================
         IMAGE ENTRANCE
      ================================================== */

      gsap.fromTo(
        image,
        {
          scale: 1.1,
        },
        {
          scale: 1,
          duration: 2.2,
          ease: "power3.out",
        }
      );

      /* =================================================
         META
      ================================================== */

      gsap.fromTo(
        ".sdp-hero-meta",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.35,
          ease: "power3.out",
        }
      );

      /* =================================================
         TITLE
      ================================================== */

      gsap.fromTo(
        ".sdp-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          delay: 0.48,
          ease: "power4.out",
        }
      );

      /* =================================================
         DESCRIPTION
      ================================================== */

      gsap.fromTo(
        ".sdp-hero-description",
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.9,
          ease: "power3.out",
        }
      );

      /* =================================================
         50
      ================================================== */

      gsap.fromTo(
        ".sdp-hero-number",
        {
          opacity: 0,
          x: 50,
          scale: 0.94,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.5,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      /* =================================================
         PARALLAX
      ================================================== */

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

      gsap.to(".sdp-hero-number", {
        yPercent: -8,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
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
        "relative",
        "min-h-[100svh]",
        "overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* =================================================
          BACKGROUND IMAGE
      ================================================== */}

      <div
        ref={imageRef}
        className={[
          "absolute",
          "inset-[-4%]",
          "will-change-transform",
        ].join(" ")}
      >
        <Image
          src="/images/sdp-group/hero.webp"
          alt="The SDP Group"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* =================================================
          CINEMATIC OVERLAYS
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[var(--walnut-patina)]/15" />

      <div
        className={[
          "pointer-events-none",
          "absolute inset-0",
          "bg-gradient-to-r",
          "from-[var(--obsidian-slate)]/82",
          "via-[var(--obsidian-slate)]/38",
          "to-[var(--obsidian-slate)]/10",
        ].join(" ")}
      />

      <div
        className={[
          "pointer-events-none",
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/82",
          "via-[var(--obsidian-slate)]/12",
          "to-[var(--obsidian-slate)]/28",
        ].join(" ")}
      />

      {/* =================================================
          SUBTLE WARM LIGHT
      ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={[
            "absolute",
            "-left-[8%]",
            "top-[12%]",
            "h-[440px]",
            "w-[440px]",
            "rounded-full",
            "bg-[var(--caramel-bronze)]/[0.06]",
            "blur-[160px]",
          ].join(" ")}
        />
      </div>

      {/* =================================================
          BACKGROUND 50
      ================================================== */}

      <div
        aria-hidden="true"
        className={[
          "sdp-hero-number",
          "pointer-events-none",
          "absolute",
          "right-[-5vw]",
          "top-[11%]",
          "z-[2]",
          "hidden",
          "select-none",
          "font-heading",
          "text-[clamp(300px,38vw,700px)]",
          "leading-none",
          "tracking-[-0.1em]",
          "text-[var(--ivory-vein)]/[0.045]",
          "lg:block",
        ].join(" ")}
      >
        50
      </div>

      {/* =================================================
          CONTENT
      ================================================== */}

      <div
        className={[
          "site-container",
          "relative z-10",
          "flex",
          "min-h-[100svh]",
          "items-end",
          "pb-[9vh]",
          "pt-36",
          "md:pb-[10vh]",
        ].join(" ")}
      >
        <div className="w-full">
          {/* =============================================
              META
          ============================================== */}

          <div className="sdp-hero-meta mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The SDP Group
              </p>
            </div>

            <span
              className={[
                "hidden",
                "text-[9px]",
                "uppercase",
                "tracking-[0.24em]",
                "text-[var(--alabaster-mist)]/45",
                "md:block",
              ].join(" ")}
            >
              1972 — 2023
            </span>
          </div>

          {/* =============================================
              TITLE
          ============================================== */}

          <div className="max-w-[1180px]">
            <div className="overflow-hidden pb-[0.08em]">
              <div
                className={[
                  "sdp-hero-line",
                  "font-heading",
                  "text-[clamp(52px,7vw,112px)]",
                  "leading-[0.92]",
                  "tracking-[-0.055em]",
                ].join(" ")}
              >
                A legacy of precision,
              </div>
            </div>

            <div className="overflow-hidden pb-[0.1em]">
              <div
                className={[
                  "sdp-hero-line",
                  "font-editorial",
                  "text-[clamp(52px,7vw,112px)]",
                  "leading-[0.95]",
                  "tracking-[-0.045em]",
                ].join(" ")}
              >
                a future of beauty.
              </div>
            </div>
          </div>

          {/* =============================================
              DESCRIPTION
          ============================================== */}

          <div className="sdp-hero-description mt-[clamp(32px,4vw,52px)]">
            <div className="mb-6 h-px w-[min(520px,75vw)] bg-[var(--brand-gold)]/35" />

            <p
              className={[
                "max-w-[720px]",
                "text-[14px]",
                "font-light",
                "leading-[1.85]",
                "text-[var(--alabaster-mist)]/72",
                "md:text-[16px]",
              ].join(" ")}
            >
              From a 1972 iron foundry to Mercure Homes in
              2023 — the SDP Group&apos;s fifty-year journey
              spans stone, machines and interior design.
            </p>
          </div>
        </div>
      </div>

      {/* =================================================
          BOTTOM INDEX
      ================================================== */}

      <div
        className={[
          "absolute",
          "bottom-7",
          "right-[var(--page-padding)]",
          "z-10",
          "hidden",
          "items-center",
          "gap-4",
          "md:flex",
        ].join(" ")}
      >
        <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

        <span className="text-[8px] uppercase tracking-[0.24em] text-white/40">
          Five Decades
        </span>
      </div>
    </section>
  );
}