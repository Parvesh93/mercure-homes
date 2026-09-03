"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

const stats = [
  {
    value: "50",
    suffix: "+",
    label: "Years of legacy",
  },
  {
    value: "1000",
    suffix: "+",
    label: "Machine installations",
  },
  {
    value: "38",
    suffix: "",
    label: "Countries connected",
  },
  {
    value: "3",
    suffix: "",
    label: "Synergistic verticals",
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
      gsap.fromTo(
        ".legacy-heading",
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
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".legacy-stat",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-stats",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".legacy-links",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".legacy-links",
            start: "top 88%",
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
      className="relative overflow-hidden bg-[#171715] py-[clamp(120px,14vw,220px)] text-white"
    >
      <div className="site-container">
        <div className="legacy-heading grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-white/45">
              The SDP Group
            </p>
          </div>

          <div>
            <p className="mb-7 text-[11px] uppercase tracking-[0.22em] text-white/40">
              Since 1975
            </p>

            <h2 className="font-heading max-w-[1000px] text-[clamp(48px,6.5vw,102px)] font-normal leading-[0.96] tracking-[-0.055em]">
              50 years of precision.
              <br />
              One family of brands.
            </h2>

            <p className="mt-10 max-w-[650px] text-[15px] leading-[1.8] text-white/55 md:text-[17px]">
              Mercure Homes carries forward the legacy of the SDP Group —
              a story built across precision manufacturing, natural stone,
              and deeply considered interior craftsmanship.
            </p>
          </div>
        </div>

        <div className="legacy-stats mt-[clamp(80px,9vw,130px)] grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="legacy-stat border-b border-white/15 py-10 sm:border-r lg:border-b-0"
            >
              <div className="px-0 sm:px-7 lg:px-8">
                <div className="flex items-start">
                  <span className="font-heading text-[clamp(52px,5vw,82px)] leading-none tracking-[-0.06em]">
                    {stat.value}
                  </span>

                  <span className="ml-1 mt-2 text-[18px] text-white/50">
                    {stat.suffix}
                  </span>
                </div>

                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="legacy-links mt-16 grid gap-4 border-t border-white/15 pt-12 md:grid-cols-3">
          <Link
            href="/sdp-group"
            className="group border border-white/15 bg-white/[0.015] p-7 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.05]"
          >
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/40">
              01
            </span>

            <h3 className="font-heading mt-12 text-[26px] tracking-[-0.035em]">
              SDP Machines
            </h3>

            <p className="mt-3 text-[13px] leading-[1.7] opacity-55">
              Precision engineering and stone-processing machinery.
            </p>

            <span className="mt-8 block text-[15px] transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </Link>

          <Link
            href="/sdp-group"
            className="group border border-white/15 bg-white/[0.015] p-7 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.05]"
          >
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-45">
              02
            </span>

            <h3 className="font-heading mt-12 text-[26px] tracking-[-0.035em]">
              SDP Stones
            </h3>

            <p className="mt-3 text-[13px] leading-[1.7] opacity-55">
              Natural stones sourced from around the world.
            </p>

            <span className="mt-8 block text-[15px] transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </Link>

          <Link
            href="/sdp-group"
            className="group border border-white/15 bg-white/[0.015] p-7 transition-all duration-500 hover:border-white/30 hover:bg-white/[0.05]"
          >
            <span className="text-[9px] uppercase tracking-[0.22em] opacity-45">
              03
            </span>

            <h3 className="font-heading mt-12 text-[26px] tracking-[-0.035em]">
              Mercure Homes
            </h3>

            <p className="mt-3 text-[13px] leading-[1.7] opacity-55">
              Personalised interiors shaped by design and craft.
            </p>

            <span className="mt-8 block text-[15px] transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>

        <div className="mt-16 flex justify-end">
          <Link
            href="/sdp-group"
            className="group flex items-center gap-5 text-[10px] uppercase tracking-[0.22em]"
          >
            <span>Discover our legacy</span>

            <span className="relative block h-px w-12 overflow-hidden bg-white/25">
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
            </span>
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[12vw] -right-[5vw] select-none font-heading text-[clamp(220px,30vw,560px)] leading-none tracking-[-0.1em] text-white/[0.018]"
      >
        50
      </div>
    </section>
  );
}