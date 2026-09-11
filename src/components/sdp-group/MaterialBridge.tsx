"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function MaterialBridge() {
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
        /* INTRO */

        gsap.fromTo(
          ".material-bridge-intro",
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

        /* IMAGE */

        gsap.fromTo(
          ".material-bridge-image-wrap",
          {
            clipPath:
              "inset(8% 0% 8% 0%)",
          },
          {
            clipPath:
              "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger:
                ".material-bridge-image-wrap",
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".material-bridge-image",
          {
            scale: 1.08,
            yPercent: -3,
          },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger:
                ".material-bridge-image-wrap",
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        /* COPY */

        gsap.fromTo(
          ".material-bridge-copy",
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger:
                ".material-bridge-copy",
              start: "top 84%",
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
        "py-[clamp(120px,13vw,190px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div className="site-container">
        {/* INTRO */}

        <div className="material-bridge-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Material Bridge
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(46px,5.8vw,86px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                From stone
              </span>{" "}

              <span className="font-editorial">
                to the home.
              </span>
            </h2>
          </div>
        </div>

        {/* CONTENT */}

        <div
          className={[
            "mt-[clamp(75px,8vw,115px)]",
            "grid gap-14",
            "lg:grid-cols-[0.95fr_1.05fr]",
            "lg:items-center",
            "lg:gap-[clamp(70px,8vw,130px)]",
          ].join(" ")}
        >
          {/* IMAGE */}

          <div className="material-bridge-image-wrap relative overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="material-bridge-image absolute inset-[-4%]">
                <Image
                  src="/images/sdp-group/material-bridge.jpg"
                  alt="Natural stone used in Mercure Homes interiors"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.04]" />
            </div>
          </div>

          {/* COPY */}

          <div className="material-bridge-copy">
            <p
              className={[
                "max-w-[760px]",
                "font-editorial",
                "text-[clamp(34px,4.2vw,64px)]",
                "leading-[1.06]",
                "tracking-[-0.035em]",
              ].join(" ")}
            >
              The same Italian and international marbles
              we import through SDP Stones, we use in your home.
            </p>

            <Link
              href="/collections"
              className={[
                "group mt-10 flex w-fit",
                "items-center gap-5",
                "text-[10px]",
                "uppercase",
                "tracking-[0.22em]",
                "text-[var(--walnut-patina)]/65",
              ].join(" ")}
            >
              <span>
                Explore Collections
              </span>

              <span className="relative block h-px w-12 overflow-hidden bg-[var(--walnut-patina)]/18">
                <span
                  className={[
                    "absolute inset-0",
                    "-translate-x-full",
                    "bg-[var(--brand-gold)]",
                    "transition-transform duration-700",
                    "group-hover:translate-x-0",
                  ].join(" ")}
                />
              </span>

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}