"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function AtelierSection() {
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
        imageRef.current,
        {
          clipPath: "inset(8% 0% 8% 0%)",
          scale: 1.06,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".atelier-copy",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
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
      className="bg-[var(--surface-light)] py-[clamp(110px,12vw,190px)]"
    >
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
          <div
            ref={imageRef}
            className="relative aspect-[16/11] overflow-hidden"
          >
            <Image
              src="/images/about/atelier.jpg"
              alt="Mercure Homes atelier in Bengaluru"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          </div>

          <div className="atelier-copy lg:pb-8">
            <p className="eyebrow mb-8 text-[var(--text-secondary)]">
              The Atelier
            </p>

            <h2 className="heading-md">
              Where ideas
              become tangible.
            </h2>

            <p className="body-lg mt-8">
              Our atelier in Bengaluru is where design thinking,
              materials and craftsmanship come together — a place
              where every project evolves through conversation,
              experimentation and detail.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}