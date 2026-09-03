"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function HomeCTA() {
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
        ".home-cta-content",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
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
      className="relative overflow-hidden bg-[var(--background)] py-[clamp(130px,15vw,240px)]"
    >
      <div className="site-container">
        <div className="home-cta-content">
          <p className="eyebrow mb-10 text-[var(--text-secondary)]">
            Begin Your Journey
          </p>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-end">
            <h2 className="font-heading max-w-[1000px] text-[clamp(58px,8vw,130px)] font-normal leading-[0.9] tracking-[-0.065em] text-[var(--text-primary)]">
              Ready to create
              <br />
              something personal?
            </h2>

            <div className="lg:pb-3">
              <p className="max-w-[420px] text-[15px] leading-[1.8] text-[var(--text-secondary)] md:text-[17px]">
                Tell us about your space, your ideas, and how you want
                your home to feel. We’ll take it from there.
              </p>

              <Link
                href="/contact"
                className="group mt-9 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[var(--text-primary)]"
              >
                <span>Start the conversation</span>

                <span className="relative block h-px w-14 overflow-hidden bg-black/20">
                  <span className="absolute inset-0 -translate-x-full bg-black transition-transform duration-700 group-hover:translate-x-0" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[7vw] right-[-4vw] select-none font-editorial text-[clamp(220px,28vw,520px)] leading-none text-black/[0.025]"
      >
        M
      </div>
    </section>
  );
}