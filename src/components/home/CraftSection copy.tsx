"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
        ".craft-copy",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "inset(12% 8% 12% 8%)",
          scale: 1.08,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.to(imageRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
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
      className="relative overflow-hidden bg-[var(--background)] py-[clamp(120px,14vw,220px)]"
    >
      <div className="site-container">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          <div className="craft-copy">
            <p className="eyebrow mb-9 text-[var(--text-secondary)]">
              Made Personal
            </p>

            <h2 className="font-editorial max-w-[650px] text-[clamp(48px,6vw,96px)] leading-[0.98] tracking-[-0.045em] text-[var(--text-primary)]">
              Nothing begins
              <br />
              with a catalogue.
            </h2>

            <div className="mt-12 max-w-[540px]">
              <p className="body-lg">
                Every Mercure interior begins with a conversation —
                how you live, what you value, and how you want a space
                to feel.
              </p>

              <p className="body-lg mt-6">
                From proportions and materials to finishes and furniture,
                each decision is shaped around the person it is made for.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/15 pt-7">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                Conceive
              </span>

              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                Design
              </span>

              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                Craft
              </span>

              <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                Install
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] overflow-hidden will-change-transform"
            >
              <Image
                src="/images/home/craft.jpg"
                alt="Mercure Homes craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/[0.06]" />
            </div>

            <div className="absolute -bottom-7 -left-7 hidden h-[135px] w-[135px] border border-black/15 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}