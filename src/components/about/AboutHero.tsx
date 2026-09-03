"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function AboutHero() {
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
        ".about-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".about-hero-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.55,
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
          src="/images/about/hero.jpg"
          alt="Mercure Homes interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[10vh] pt-36">
        <div className="w-full">
          <div className="about-hero-meta mb-8 flex items-center justify-between">
            <p className="eyebrow text-white/60">
              About Mercure
            </p>

            <span className="hidden text-[9px] uppercase tracking-[0.24em] text-white/40 md:block">
              Bengaluru · India
            </span>
          </div>

          <div className="max-w-[1100px] font-heading text-[clamp(54px,8vw,128px)] leading-[0.9] tracking-[-0.06em]">
            <div className="overflow-hidden pb-[0.08em]">
              <div className="about-hero-line">
                Luxury,
              </div>
            </div>

            <div className="overflow-hidden pb-[0.08em]">
              <div className="about-hero-line">
                made personal.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}