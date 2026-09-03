"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { getGSAP } from "../../lib/gsap";

const steps = [
  {
    number: "01",
    title: "Conceive",
    eyebrow: "It begins with you",
    text:
      "Every Mercure interior starts with a conversation — how you live, what you value, and how you want your home to feel.",
  },
  {
    number: "02",
    title: "Design",
    eyebrow: "Ideas take form",
    text:
      "Proportion, material, function and atmosphere are developed together so every decision feels connected to the wider space.",
  },
  {
    number: "03",
    title: "Craft",
    eyebrow: "Made with intention",
    text:
      "Furniture, finishes and details are shaped with precision, combining contemporary design thinking with Indian craftsmanship.",
  },
  {
    number: "04",
    title: "Install",
    eyebrow: "The final composition",
    text:
      "Every element comes together on site with the same attention to detail that defined the project from the first conversation.",
  },
];

export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.matchMedia(
      "(min-width: 1024px)"
    ).matches;

    if (reduceMotion || !desktop) return;

    const { gsap, ScrollTrigger } = getGSAP();

    let currentStep = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",

        onUpdate: (self) => {
          const nextStep = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );

          if (nextStep !== currentStep) {
            currentStep = nextStep;
            setActiveStep(nextStep);
          }
        },
      });

      gsap.fromTo(
        image,
        {
          scale: 1.07,
        },
        {
          scale: 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".craft-intro",
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const current = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative",
        "bg-[var(--ivory-vein)]",
        "text-[var(--obsidian-slate)]",
        "lg:h-[400vh]",
      ].join(" ")}
    >
      {/* subtle background warmth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[6%] top-[14%] h-[340px] w-[340px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[130px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[360px] w-[360px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[140px]" />
      </div>

      {/* =========================
          DESKTOP
      ========================== */}

      <div className="relative z-10 hidden h-screen lg:sticky lg:top-0 lg:block">
        <div className="site-container flex h-full flex-col pb-[44px] pt-[110px]">
          {/* TOP */}

          <div className="craft-intro flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Made Personal
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/45">
                Our Atelier Process
              </p>

              <span className="h-px w-8 bg-[var(--brand-gold)]/40" />
            </div>
          </div>

          {/* MAIN */}

          <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_0.95fr] gap-[clamp(70px,7vw,130px)] pt-10">
            {/* LEFT */}

            <div className="flex min-h-0 flex-col">
              {/* IMAGE */}

              <div
                data-cursor="Explore"
                className="relative min-h-0 flex-1 overflow-hidden"
              >
                <div
                  ref={imageRef}
                  className="absolute inset-[-5%] will-change-transform"
                >
                  <Image
                    src="/images/home/craft.jpg"
                    alt="Mercure Homes craftsmanship"
                    fill
                    sizes="58vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.05]" />

                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-[var(--ivory-vein)]">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.23em] text-[var(--alabaster-mist)]/65">
                      Atelier
                    </p>

                    <p className="font-heading text-[26px] tracking-[-0.03em]">
                      Designed around you
                    </p>
                  </div>

                  <span className="text-[9px] tracking-[0.2em] text-[var(--brand-gold)]">
                    {String(activeStep + 1).padStart(2, "0")} / 04
                  </span>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="mt-8 grid grid-cols-4 gap-3">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className="relative h-px bg-[var(--walnut-patina)]/12"
                  >
                    <div
                      className={[
                        "absolute inset-0",
                        "origin-left",
                        "bg-[var(--brand-gold)]",
                        "transition-transform duration-700",

                        index <= activeStep
                          ? "scale-x-100"
                          : "scale-x-0",
                      ].join(" ")}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex min-h-0 flex-col justify-between pb-1">
              {/* CURRENT STEP */}

              <div>
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-[40px] leading-none tracking-[-0.05em] text-[var(--brand-gold)]">
                    {current.number}
                  </span>

                  <span className="h-px w-12 bg-[var(--brand-gold)]/45" />
                </div>

                <p className="mt-7 text-[10px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/48">
                  {current.eyebrow}
                </p>

                <h2 className="mt-4 font-editorial text-[clamp(48px,4.5vw,76px)] leading-[0.95] tracking-[-0.04em] text-[var(--obsidian-slate)]">
                  {current.title}
                </h2>

                <p className="mt-6 max-w-[540px] text-[15px] leading-[1.8] text-[var(--walnut-patina)]/68">
                  {current.text}
                </p>
              </div>

              {/* ALL STEPS */}

              <div className="mt-8 border-t border-[var(--walnut-patina)]/14">
                {steps.map((step, index) => {
                  const isActive =
                    index === activeStep;

                  return (
                    <div
                      key={step.number}
                      className={[
                        "grid grid-cols-[48px_1fr_auto] items-center",
                        "border-b border-[var(--walnut-patina)]/10",
                        "py-[13px]",
                        "transition-all duration-500",

                        isActive
                          ? "opacity-100"
                          : "opacity-35",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "text-[9px]",
                          "tracking-[0.18em]",

                          isActive
                            ? "text-[var(--brand-gold)]"
                            : "text-[var(--walnut-patina)]/55",
                        ].join(" ")}
                      >
                        {step.number}
                      </span>

                      <span className="font-heading text-[19px] tracking-[-0.025em] text-[var(--obsidian-slate)]">
                        {step.title}
                      </span>

                      <span
                        className={[
                          "h-[6px] w-[6px]",
                          "rounded-full",
                          "transition-all duration-500",

                          isActive
                            ? "scale-100 bg-[var(--brand-gold)]"
                            : "scale-0 bg-transparent",
                        ].join(" ")}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE / TABLET
      ========================== */}

      <div className="site-container relative z-10 py-[110px] lg:hidden">
        <div className="flex items-center gap-4">
          <span className="h-px w-7 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            Made Personal
          </p>
        </div>

        <h2 className="font-editorial mt-8 text-[clamp(48px,12vw,72px)] leading-[0.98] tracking-[-0.04em] text-[var(--obsidian-slate)]">
          From an idea
          <br />
          to something
          <br />
          entirely yours.
        </h2>

        <div className="relative mt-14 aspect-[4/5] overflow-hidden">
          <Image
            src="/images/home/craft.jpg"
            alt="Mercure Homes craftsmanship"
            fill
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.04]" />

          <div className="absolute bottom-5 left-5">
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/70">
              Our Atelier
            </p>

            <p className="mt-2 font-heading text-[24px] text-[var(--ivory-vein)]">
              Designed around you
            </p>
          </div>
        </div>

        <div className="mt-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="border-t border-[var(--walnut-patina)]/14 py-8 last:border-b last:border-[var(--walnut-patina)]/14"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.2em] text-[var(--brand-gold)]">
                  {step.number}
                </span>

                <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/45">
                  {step.eyebrow}
                </span>
              </div>

              <h3 className="font-heading mt-5 text-[38px] tracking-[-0.035em] text-[var(--obsidian-slate)]">
                {step.title}
              </h3>

              <p className="mt-5 text-[14px] leading-[1.85] text-[var(--walnut-patina)]/68">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}