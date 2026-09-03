"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { CollectionItem } from "../../../data/collections";
import { getGSAP } from "../../../lib/gsap";

interface CollectionHeroProps {
  collection: CollectionItem;
}

export default function CollectionHero({
  collection,
}: CollectionHeroProps) {
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
        ".collection-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.1,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".collection-hero-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );

      gsap.to(imageRef.current, {
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
      className="relative min-h-[100svh] overflow-hidden bg-[#171715] text-white"
    >
      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/42" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/25" />

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[10vh] pt-36">
        <div className="w-full">
          <div className="collection-hero-meta mb-8 flex items-center justify-between">
            <p className="eyebrow text-white/60">
              {collection.subtitle}
            </p>

            <span className="hidden text-[9px] uppercase tracking-[0.24em] text-white/40 md:block">
              {collection.id} / 04
            </span>
          </div>

          <div className="overflow-hidden pb-[0.08em]">
            <h1 className="collection-hero-line font-heading text-[clamp(58px,9vw,150px)] leading-[0.88] tracking-[-0.065em]">
              {collection.title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}