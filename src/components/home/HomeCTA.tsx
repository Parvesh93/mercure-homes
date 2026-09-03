"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-image-mask",
        {
          clipPath: "inset(10% 0% 10% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".cta-content",
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
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        image,
        {
          scale: 1.08,
          yPercent: -3,
        },
        {
          scale: 1,
          yPercent: 3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--background)] py-[clamp(90px,10vw,150px)]"
    >
      <div className="site-container">
        <div className="cta-image-mask relative overflow-hidden">

          {/* Image */}
          <div className="relative min-h-[620px] overflow-hidden md:min-h-[720px]">
            <div
              ref={imageRef}
              className="absolute inset-[-5%] will-change-transform"
            >
              <Image
                src="/images/home/hero.jpg"
                alt="Mercure Homes interior"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

            {/* Content */}
            <div className="cta-content relative z-10 flex min-h-[620px] items-end p-8 text-white md:min-h-[720px] md:p-12 lg:p-16">
              <div className="max-w-[760px]">
                <p className="mb-8 text-[10px] uppercase tracking-[0.28em] text-white/55">
                  Begin Your Journey
                </p>

                <h2 className="font-heading text-[clamp(48px,6vw,92px)] leading-[0.96] tracking-[-0.055em]">
                  Ready to make
                  <br />
                  it yours?
                </h2>

                <p className="mt-8 max-w-[520px] text-[15px] leading-[1.8] text-white/65 md:text-[17px]">
                  Tell us about your space, your ideas, and how you want
                  your home to feel. Every Mercure project begins with a
                  conversation.
                </p>

                <Link
                  href="/contact"
                  data-cursor="Begin"
                  className="group mt-10 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-white"
                >
                  <span>
                    Start a conversation
                  </span>

                  <span className="relative block h-px w-14 overflow-hidden bg-white/35">
                    <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
                  </span>

                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom meta */}
            <div className="absolute bottom-8 right-8 z-10 hidden text-right md:block">
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                Bengaluru · India
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-white/30">
                Consultations by appointment
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}