"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { getGSAP } from "../../lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.set(
        [
          eyebrowRef.current,
          titleRef.current,
          descriptionRef.current,
          ctaRef.current,
          scrollRef.current,
        ],
        {
          opacity: 0,
          y: 30,
        }
      );

      gsap.set(imageRef.current, {
        scale: 1.08,
      });

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .to(imageRef.current, {
          scale: 1,
          duration: 2.2,
          ease: "power2.out",
        })
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          0.45
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
          },
          0.65
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          1
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.15
        )
        .to(
          scrollRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.35
        );

      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-[#181816]"
    >
      {/* Background */}
      <div
        ref={imageRef}
        className="absolute inset-[-5%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/images/home/hero.jpg')",
        }}
      />

      {/* Dark cinematic overlays */}
      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/5" />

      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20" />

      {/* Main Content */}
      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[9vh] pt-32 md:pb-[11vh]">
        <div className="w-full">
          <div className="max-w-[1050px]">
            <p
              ref={eyebrowRef}
              className="mb-7 text-[10px] uppercase tracking-[0.32em] text-white/65 md:text-[11px]"
            >
              Luxury Interior Atelier · Bengaluru
            </p>

            <h1
              ref={titleRef}
              className="font-heading max-w-225 text-[clamp(54px,7.2vw,112px)] font-normal leading-[0.92] tracking-[-0.055em] text-white"
            >
              Crafted
              <br />
              around you.
            </h1>

            <div className="mt-9 flex flex-col gap-8 md:mt-11 md:flex-row md:items-end md:justify-between">
              <p
  ref={descriptionRef}
  className="max-w-[440px] text-[15px] font-light leading-[1.7] text-white/75 md:text-[16px]"
>
  Italian design sensibility meets Indian craftsmanship
  in spaces created entirely around you.
</p>

              <Link
                ref={ctaRef}
                href="#story"
                className="group flex w-fit items-center gap-5 text-[10px] font-medium uppercase tracking-[0.22em] !text-white md:text-[11px]"
              >
                <span>Explore our world</span>

                <span className="relative block h-px w-12 overflow-hidden bg-white/60">
                  <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-7 right-[var(--page-padding)] z-10 hidden items-center gap-3 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] text-white/45">
          Scroll
        </span>

        <span className="relative h-[48px] w-px overflow-hidden bg-white/20">
          <span className="hero-scroll-line absolute left-0 top-0 h-[18px] w-px bg-white" />
        </span>
      </div>
    </section>
  );
}