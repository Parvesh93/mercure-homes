"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   CONTENT
   Kept to the supplied Mercure website-content document.
========================================================= */

const steps = [
  {
    number: "01",
    title: "Discover",
    eyebrow: "An introduction to Mercure.",
    text:
      "Through trusted recommendations, design collaborations, our showroom and digital presence, discover our world of craftsmanship, materials and considered design.",
  },
  {
    number: "02",
    title: "Understand",
    eyebrow: "A conversation before a concept.",
    text:
      "We begin by understanding your space, your way of living and what you envision for it. Where needed, we visit the site to understand the architecture, materials and context firsthand.",
  },
  {
    number: "03",
    title: "Curate",
    eyebrow: "A direction shaped around you.",
    text:
      "We bring together materials, textures, finishes and ideas to create a considered design direction — balancing your aesthetic, lifestyle and investment.",
  },
  {
    number: "04",
    title: "Define",
    eyebrow: "Clarity in every detail.",
    text:
      "Once the direction is established, we refine the design, align on the investment and bring together the drawings, materials and specifications that will guide the making.",
  },
  {
    number: "05",
    title: "Make",
    eyebrow: "Crafted with intention.",
    text:
      "From approved drawings and materials to production, every piece moves through a considered process of making, with regular updates along the way.",
  },
  {
    number: "06",
    title: "Deliver",
    eyebrow: "Made for its final setting.",
    text:
      "From site coordination to delivery, we ensure every detail is ready for its place. And when the project is complete, our relationship continues beyond the final handover.",
  },
];

/* =========================================================
   ABSTRACT PROCESS VISUAL
========================================================= */

function ProcessVisual({
  active,
}: {
  active: number;
}) {
  return (
    <div className="relative h-full w-full">
      {/* outer architectural frame */}

      <div className="absolute inset-[8%] border border-[var(--walnut-patina)]/12" />

      <div className="absolute inset-[16%] border border-[var(--walnut-patina)]/8" />

      {/* changing geometry */}

      <div
        className={[
          "absolute left-1/2 top-1/2",
          "-translate-x-1/2 -translate-y-1/2",
          "transition-all duration-[900ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",

          active === 0
            ? "h-[38%] w-[38%] rotate-0"
            : "",

          active === 1
            ? "h-[50%] w-[32%] rotate-[8deg]"
            : "",

          active === 2
            ? "h-[42%] w-[52%] -rotate-[7deg]"
            : "",

          active === 3
            ? "h-[55%] w-[55%] rotate-0"
            : "",

          active === 4
            ? "h-[62%] w-[42%] rotate-[10deg]"
            : "",

          active === 5
            ? "h-[60%] w-[60%] rotate-0"
            : "",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0",
            "border",
            "border-[var(--brand-gold)]/60",
            "transition-all duration-[900ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
          ].join(" ")}
        />

        <div
          className={[
            "absolute inset-[14%]",
            "bg-[var(--brand-gold)]/[0.06]",
            "transition-all duration-[900ms]",
          ].join(" ")}
        />

        {/* inner structure */}

        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--brand-gold)]/25" />

        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--brand-gold)]/25" />
      </div>

      {/* moving point */}

      <div
        className={[
          "absolute h-[9px] w-[9px]",
          "rounded-full",
          "bg-[var(--brand-gold)]",
          "transition-all duration-[900ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",

          active === 0
            ? "left-[22%] top-[30%]"
            : "",

          active === 1
            ? "left-[68%] top-[25%]"
            : "",

          active === 2
            ? "left-[72%] top-[68%]"
            : "",

          active === 3
            ? "left-[38%] top-[70%]"
            : "",

          active === 4
            ? "left-[28%] top-[52%]"
            : "",

          active === 5
            ? "left-[50%] top-[50%]"
            : "",
        ].join(" ")}
      />

      {/* vertical measurement */}

      <div className="absolute bottom-[10%] left-[7%] top-[10%] flex flex-col justify-between">
        {steps.map(
          (step, index) => (
            <div
              key={step.number}
              className="flex items-center gap-3"
            >
              <span
                className={[
                  "block h-px",
                  "transition-all duration-500",

                  index === active
                    ? "w-8 bg-[var(--brand-gold)]"
                    : "w-4 bg-[var(--walnut-patina)]/20",
                ].join(" ")}
              />

              <span
                className={[
                  "text-[8px]",
                  "tracking-[0.18em]",
                  "transition-colors duration-500",

                  index === active
                    ? "text-[var(--brand-gold)]"
                    : "text-[var(--walnut-patina)]/30",
                ].join(" ")}
              >
                {step.number}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROCESS JOURNEY
========================================================= */

export default function ProcessJourney() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [activeStep, setActiveStep] =
    useState(0);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const desktop =
      window.matchMedia(
        "(min-width: 1024px)"
      ).matches;

    if (
      reduceMotion ||
      !desktop
    ) {
      return;
    }

    const {
      gsap,
      ScrollTrigger,
    } = getGSAP();

    const ctx =
      gsap.context(() => {
        const stepElements =
          gsap.utils.toArray<HTMLElement>(
            ".process-step"
          );

        stepElements.forEach(
          (
            step,
            index
          ) => {
            ScrollTrigger.create({
              trigger:
                step,

              start:
                "top 55%",

              end:
                "bottom 45%",

              onEnter: () =>
                setActiveStep(
                  index
                ),

              onEnterBack: () =>
                setActiveStep(
                  index
                ),
            });

            gsap.fromTo(
              step,
              {
                opacity:
                  0.18,
                y: 60,
              },
              {
                opacity: 1,
                y: 0,

                duration:
                  0.8,

                ease:
                  "power3.out",

                scrollTrigger:
                  {
                    trigger:
                      step,

                    start:
                      "top 82%",

                    once:
                      true,
                  },
              }
            );
          }
        );

        /* intro */

        gsap.fromTo(
          ".process-journey-intro",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease:
              "power3.out",

            scrollTrigger:
              {
                trigger:
                  section,

                start:
                  "top 80%",

                once:
                  true,
              },
          }
        );

        /* large step number */

        gsap.fromTo(
          ".process-number-wrap",
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,

            ease:
              "power3.out",

            scrollTrigger:
              {
                trigger:
                  section,

                start:
                  "top 75%",

                once:
                  true,
              },
          }
        );
      }, section);

    ScrollTrigger.refresh();

    return () =>
      ctx.revert();
  }, []);

  const current =
    steps[activeStep];

  const progress =
    ((activeStep + 1) /
      steps.length) *
    100;

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--alabaster-mist)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =====================================
          DESKTOP
      ====================================== */}

      <div className="hidden lg:block">
        <div className="site-container">
          <div
            className={[
              "grid",
              "grid-cols-[0.92fr_1.08fr]",
              "gap-[clamp(70px,8vw,140px)]",
            ].join(" ")}
          >
            {/* =================================
                LEFT — STICKY EXPERIENCE
            ================================== */}

            <div className="relative">
              <div
                className={[
                  "sticky",
                  "top-[110px]",
                  "flex",
                  "h-[calc(100vh-130px)]",
                  "flex-col",
                  "py-[60px]",
                ].join(" ")}
              >
                {/* META */}

                <div className="process-journey-intro flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-[var(--brand-gold)]" />

                    <p className="eyebrow !text-[var(--brand-gold)]">
                      The Process
                    </p>
                  </div>

                  <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/35">
                    {current.number}
                    {" / "}
                    06
                  </span>
                </div>

                {/* VISUAL */}

                <div className="relative min-h-0 flex-1">
                  <ProcessVisual
                    active={
                      activeStep
                    }
                  />

                  {/* LARGE NUMBER */}

                  <div
                    className={[
                      "process-number-wrap",
                      "pointer-events-none",
                      "absolute",
                      "left-1/2",
                      "top-1/2",
                      "-translate-x-1/2",
                      "-translate-y-1/2",
                      "select-none",
                    ].join(" ")}
                  >
                    <span
                      key={
                        current.number
                      }
                      className={[
                        "block",
                        "font-heading",
                        "text-[clamp(160px,17vw,280px)]",
                        "leading-none",
                        "tracking-[-0.09em]",
                        "text-[var(--walnut-patina)]/[0.055]",
                        "animate-[process-number-in_650ms_cubic-bezier(0.22,1,0.36,1)]",
                      ].join(" ")}
                    >
                      {
                        current.number
                      }
                    </span>
                  </div>
                </div>

                {/* ACTIVE STEP */}

                <div className="grid grid-cols-[1fr_auto] items-end gap-8">
                  <div>
                    <p
                      key={
                        current.eyebrow
                      }
                      className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]"
                    >
                      {
                        current.eyebrow
                      }
                    </p>

                    <p
                      key={
                        current.title
                      }
                      className="font-editorial mt-3 text-[clamp(34px,3.5vw,54px)] leading-none tracking-[-0.035em]"
                    >
                      {
                        current.title
                      }
                    </p>
                  </div>

                  <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand-gold)]" />
                </div>

                {/* PROGRESS */}

                <div className="relative mt-8 h-px bg-[var(--walnut-patina)]/14">
                  <div
                    className="absolute inset-y-0 left-0 bg-[var(--brand-gold)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* =================================
                RIGHT — SCROLLING STEPS
            ================================== */}

            <div className="border-l border-[var(--walnut-patina)]/10 pl-[clamp(50px,5vw,90px)]">
              {steps.map(
                (
                  step,
                  index
                ) => {
                  const isActive =
                    activeStep ===
                    index;

                  return (
                    <article
                      key={
                        step.number
                      }
                      className={[
                        "process-step",
                        "relative",
                        "flex",
                        "min-h-[88vh]",
                        "items-center",
                        "border-b",
                        "border-[var(--walnut-patina)]/10",
                        "py-20",
                      ].join(" ")}
                    >
                      {/* TIMELINE POINT */}

                      <span
                        className={[
                          "absolute",
                          "left-[-55px]",
                          "top-1/2",
                          "-translate-x-1/2",
                          "-translate-y-1/2",
                          "rounded-full",
                          "border",
                          "transition-all",
                          "duration-700",

                          isActive
                            ? [
                                "h-4",
                                "w-4",
                                "border-[var(--brand-gold)]",
                                "bg-[var(--alabaster-mist)]",
                              ].join(
                                " "
                              )
                            : [
                                "h-2",
                                "w-2",
                                "border-[var(--walnut-patina)]/20",
                                "bg-[var(--alabaster-mist)]",
                              ].join(
                                " "
                              ),
                        ].join(" ")}
                      >
                        {isActive && (
                          <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand-gold)]" />
                        )}
                      </span>

                      <div className="w-full">
                        {/* NUMBER */}

                        <div className="flex items-center gap-4">
                          <span
                            className={[
                              "font-heading",
                              "text-[18px]",
                              "tracking-[-0.03em]",
                              "transition-colors",
                              "duration-500",

                              isActive
                                ? "text-[var(--brand-gold)]"
                                : "text-[var(--walnut-patina)]/30",
                            ].join(" ")}
                          >
                            {
                              step.number
                            }
                          </span>

                          <span
                            className={[
                              "h-px",
                              "transition-all",
                              "duration-700",

                              isActive
                                ? "w-12 bg-[var(--brand-gold)]"
                                : "w-7 bg-[var(--walnut-patina)]/18",
                            ].join(" ")}
                          />
                        </div>

                        {/* EYEBROW */}

                        <p className="mt-10 text-[10px] uppercase tracking-[0.23em] text-[var(--walnut-patina)]/46">
                          {
                            step.eyebrow
                          }
                        </p>

                        {/* TITLE */}

                        <h2
                          className={[
                            "mt-5",
                            "font-editorial",
                            "text-[clamp(58px,6vw,96px)]",
                            "leading-[0.93]",
                            "tracking-[-0.045em]",
                            "transition-colors",
                            "duration-700",

                            isActive
                              ? "text-[var(--obsidian-slate)]"
                              : "text-[var(--walnut-patina)]/38",
                          ].join(" ")}
                        >
                          {
                            step.title
                          }
                        </h2>

                        {/* COPY */}

                        <p
                          className={[
                            "mt-8",
                            "max-w-[630px]",
                            "text-[15px]",
                            "leading-[1.9]",
                            "transition-all",
                            "duration-700",

                            isActive
                              ? "translate-y-0 text-[var(--walnut-patina)]/68 opacity-100"
                              : "translate-y-3 text-[var(--walnut-patina)]/38 opacity-55",
                          ].join(" ")}
                        >
                          {
                            step.text
                          }
                        </p>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          MOBILE / TABLET
      ====================================== */}

      <div className="site-container py-[clamp(100px,12vw,150px)] lg:hidden">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            The Process
          </p>
        </div>

        <div className="mt-14">
          {steps.map(
            (
              step,
              index
            ) => (
              <article
                key={
                  step.number
                }
                className="border-t border-[var(--walnut-patina)]/12 py-10 last:border-b"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-[14px] text-[var(--brand-gold)]">
                    {
                      step.number
                    }
                  </span>

                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]/70" />
                </div>

                <p className="mt-7 text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/45">
                  {
                    step.eyebrow
                  }
                </p>

                <h2 className="font-editorial mt-4 text-[clamp(44px,11vw,68px)] leading-[0.96] tracking-[-0.04em]">
                  {
                    step.title
                  }
                </h2>

                <p className="mt-6 max-w-[580px] text-[14px] leading-[1.85] text-[var(--walnut-patina)]/65">
                  {
                    step.text
                  }
                </p>
              </article>
            )
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes process-number-in {
          from {
            opacity: 0;
            transform: translateY(18px)
              scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0)
              scale(1);
          }
        }
      `}</style>
    </section>
  );
}