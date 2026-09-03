"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function AboutStory() {
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
        ".about-story-reveal",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
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
      className="bg-[var(--background)] py-[clamp(120px,14vw,220px)]"
    >
      <div className="site-container">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_2.3fr] lg:gap-20">
          <div className="about-story-reveal">
            <p className="eyebrow text-[var(--text-secondary)]">
              Our Philosophy
            </p>
          </div>

          <div>
            <h2 className="about-story-reveal font-editorial max-w-[1000px] text-[clamp(44px,6vw,90px)] leading-[1.02] tracking-[-0.04em]">
              Personalisation is not
              an option we offer.
              It is how we begin.
            </h2>

            <div className="mt-14 grid gap-9 md:grid-cols-2 md:gap-14">
              <p className="about-story-reveal body-lg">
                Mercure Homes is a luxury interior atelier where Italian
                contemporary design thinking meets the depth of Indian
                craftsmanship.
              </p>

              <p className="about-story-reveal body-lg">
                Every project is shaped around its owner — from spatial
                planning and material selection to furniture, finishes
                and the smallest details that make a home unmistakably
                personal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}