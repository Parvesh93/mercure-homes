"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const lineOneRef = useRef<HTMLDivElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);
  const lineThreeRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const lines = [
        lineOneRef.current,
        lineTwoRef.current,
        lineThreeRef.current,
      ];

      gsap.set(lines, {
        yPercent: 110,
      });

      gsap.set(labelRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(bodyRef.current, {
        opacity: 0,
        y: 25,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
        },
      });

      timeline
        .to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          lines,
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.15
        )
        .to(
          bodyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          0.75
        );

      gsap.to(".brand-statement-inner", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
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
      id="story"
      className="relative overflow-hidden bg-[var(--background)]"
    >
      <div className="brand-statement-inner site-container py-[clamp(120px,15vw,230px)]">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_2.3fr] lg:gap-20">
          <div>
            <p
              ref={labelRef}
              className="eyebrow text-[var(--text-secondary)]"
            >
              Our Philosophy
            </p>
          </div>

          <div>
            <div className="font-editorial text-[clamp(46px,7vw,110px)] leading-[0.98] tracking-[-0.04em] text-[var(--text-primary)]">
              <div className="overflow-hidden pb-[0.08em]">
                <div ref={lineOneRef}>Crafting your story,</div>
              </div>

              <div className="overflow-hidden pb-[0.08em]">
                <div ref={lineTwoRef}>one statement</div>
              </div>

              <div className="overflow-hidden pb-[0.08em]">
                <div ref={lineThreeRef}>at a time.</div>
              </div>
            </div>

            <div className="mt-14 flex justify-end md:mt-20">
              <p
                ref={bodyRef}
                className="max-w-[520px] text-[15px] leading-[1.8] text-[var(--text-secondary)] md:text-[17px]"
              >
                We believe true luxury is personal. Every space, material,
                proportion and detail is considered around the people who
                will live with it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-container">
        <div className="hairline" />
      </div>

<div
  aria-hidden="true"
  className="pointer-events-none absolute right-[-8vw] top-[8%] select-none font-editorial text-[clamp(180px,28vw,520px)] leading-none text-black/[0.025]"
>
  M
</div>

    </section>
  );
}