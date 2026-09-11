"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   CONTENT
========================================================= */

const steps = [
  {
    number: "01",
    title: "Discover",
    eyebrow:
      "An introduction to Mercure.",
    text:
      "Through trusted recommendations, design collaborations, our showroom and digital presence, discover our world of craftsmanship, materials and considered design.",
  },
  {
    number: "02",
    title: "Understand",
    eyebrow:
      "A conversation before a concept.",
    text:
      "We begin by understanding your space, your way of living and what you envision for it. Where needed, we visit the site to understand the architecture, materials and context firsthand.",
  },
  {
    number: "03",
    title: "Curate",
    eyebrow:
      "A direction shaped around you.",
    text:
      "We bring together materials, textures, finishes and ideas to create a considered design direction — balancing your aesthetic, lifestyle and investment.",
  },
  {
    number: "04",
    title: "Define",
    eyebrow:
      "Clarity in every detail.",
    text:
      "Once the direction is established, we refine the design, align on the investment and bring together the drawings, materials and specifications that will guide the making.",
  },
  {
    number: "05",
    title: "Make",
    eyebrow:
      "Crafted with intention.",
    text:
      "From approved drawings and materials to production, every piece moves through a considered process of making, with regular updates along the way.",
  },
  {
    number: "06",
    title: "Deliver",
    eyebrow:
      "Made for its final setting.",
    text:
      "From site coordination to delivery, we ensure every detail is ready for its place. And when the project is complete, our relationship continues beyond the final handover.",
  },
];

/* =========================================================
   MORPHING PROCESS OBJECT
========================================================= */

function ProcessObject({
  active,
}: {
  active: number;
}) {
  const transforms = [
    {
      outer:
        "rotate(0deg) scale(0.72)",
      inner:
        "rotate(45deg) scale(0.55)",
      x: "28%",
      y: "28%",
    },
    {
      outer:
        "rotate(12deg) scale(0.82)",
      inner:
        "rotate(-18deg) scale(0.64)",
      x: "68%",
      y: "24%",
    },
    {
      outer:
        "rotate(-8deg) scale(0.9)",
      inner:
        "rotate(30deg) scale(0.48)",
      x: "76%",
      y: "65%",
    },
    {
      outer:
        "rotate(0deg) scale(0.96)",
      inner:
        "rotate(0deg) scale(0.72)",
      x: "52%",
      y: "72%",
    },
    {
      outer:
        "rotate(15deg) scale(1)",
      inner:
        "rotate(-30deg) scale(0.58)",
      x: "26%",
      y: "61%",
    },
    {
      outer:
        "rotate(0deg) scale(1)",
      inner:
        "rotate(45deg) scale(0.78)",
      x: "50%",
      y: "50%",
    },
  ];

  const state =
    transforms[active];

  return (
    <div className="relative h-full w-full">
      {/* outer circles */}

      <div className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--walnut-patina)]/10" />

      <div className="absolute left-1/2 top-1/2 aspect-square w-[61%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--walnut-patina)]/[0.07]" />

      {/* guides */}

      <div className="absolute left-1/2 top-[14%] h-[72%] w-px bg-[var(--walnut-patina)]/[0.06]" />

      <div className="absolute left-[14%] top-1/2 h-px w-[72%] bg-[var(--walnut-patina)]/[0.06]" />

      {/* morphing object */}

      <div
        className={[
          "absolute",
          "left-1/2 top-1/2",
          "h-[44%] w-[44%]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "border",
          "border-[var(--brand-gold)]/60",
          "transition-transform",
          "duration-[900ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
        ].join(" ")}
        style={{
          transform: `
            translate(-50%, -50%)
            ${state.outer}
          `,
        }}
      >
        <div
          className={[
            "absolute inset-[13%]",
            "border",
            "border-[var(--brand-gold)]/30",
            "bg-[var(--brand-gold)]/[0.035]",
            "transition-transform",
            "duration-[900ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
          ].join(" ")}
          style={{
            transform:
              state.inner,
          }}
        />

        <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--brand-gold)]/18" />

        <div className="absolute left-0 top-1/2 h-px w-full bg-[var(--brand-gold)]/18" />
      </div>

      {/* moving point */}

      <span
        className={[
          "absolute z-10",
          "h-[10px] w-[10px]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "bg-[var(--brand-gold)]",
          "transition-all",
          "duration-[900ms]",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
        ].join(" ")}
        style={{
          left: state.x,
          top: state.y,
        }}
      >
        <span className="absolute inset-[-7px] rounded-full border border-[var(--brand-gold)]/20" />
      </span>

      {/* large number */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <span
          key={
            steps[active]
              .number
          }
          className={[
            "block",
            "font-heading",
            "text-[clamp(150px,16vw,260px)]",
            "leading-none",
            "tracking-[-0.09em]",
            "text-[var(--walnut-patina)]/[0.045]",
            "animate-[processNumber_650ms_cubic-bezier(0.22,1,0.36,1)]",
          ].join(" ")}
        >
          {
            steps[active]
              .number
          }
        </span>
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

  const pinWrapRef =
    useRef<HTMLDivElement>(null);

  const leftPanelRef =
    useRef<HTMLDivElement>(null);

  const rightPanelRef =
    useRef<HTMLDivElement>(null);

  const stepRefs =
    useRef<
      Array<HTMLElement | null>
    >([]);

  const [
    activeStep,
    setActiveStep,
  ] = useState(0);

  const current =
    steps[activeStep];

  const progress =
    ((activeStep + 1) /
      steps.length) *
    100;

  /* =========================================================
     GSAP PIN + STEP ACTIVATION
  ========================================================= */

  useEffect(() => {
    const section =
      sectionRef.current;

    const pinWrap =
      pinWrapRef.current;

    const leftPanel =
      leftPanelRef.current;

    const rightPanel =
      rightPanelRef.current;

    if (
      !section ||
      !pinWrap ||
      !leftPanel ||
      !rightPanel
    ) {
      return;
    }

    const desktop =
      window.matchMedia(
        "(min-width: 1024px)"
      ).matches;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (
      !desktop ||
      reduceMotion
    ) {
      return;
    }

    const {
      gsap,
      ScrollTrigger,
    } = getGSAP();

    const ctx =
      gsap.context(() => {
        /* =============================================
           INTRO
        ============================================== */

        gsap.fromTo(
          ".process-intro",
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                section,
              start:
                "top 82%",
              once: true,
            },
          }
        );

        /* =============================================
           PIN LEFT PANEL
        ============================================== */

        ScrollTrigger.create({
          trigger: pinWrap,

          start: "top top",

          endTrigger:
            rightPanel,

          end: "bottom bottom",

          pin:
            leftPanel,

          pinSpacing: false,

          anticipatePin: 1,

          invalidateOnRefresh:
            true,
        });

        /* =============================================
           ACTIVE STEP
        ============================================== */

        stepRefs.current.forEach(
          (
            step,
            index
          ) => {
            if (!step) return;

            ScrollTrigger.create(
              {
                trigger:
                  step,

                start:
                  "top 52%",

                end:
                  "bottom 48%",

                onEnter:
                  () =>
                    setActiveStep(
                      index
                    ),

                onEnterBack:
                  () =>
                    setActiveStep(
                      index
                    ),
              }
            );
          }
        );

        ScrollTrigger.refresh();
      }, section);

    return () =>
      ctx.revert();
  }, []);

  /* =========================================================
     CLICK STEP
  ========================================================= */

  const selectStep = (
    index: number
  ) => {
    setActiveStep(index);

    const element =
      stepRefs.current[
        index
      ];

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative",
        "overflow-x-clip",
        "bg-[var(--alabaster-mist)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =================================================
          BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className={[
            "absolute",
            "-left-[10%]",
            "top-[15%]",
            "h-[420px]",
            "w-[420px]",
            "rounded-full",
            "bg-[var(--gilded-ochre)]/[0.02]",
            "blur-[160px]",
          ].join(" ")}
        />
      </div>

      {/* =================================================
          DESKTOP
      ================================================== */}

      <div
        ref={pinWrapRef}
        className="relative hidden lg:block"
      >
        <div className="site-container">
          <div
            className={[
              "grid",
              "grid-cols-[0.95fr_1.05fr]",
              "items-start",
              "gap-[clamp(65px,7vw,120px)]",
            ].join(" ")}
          >
            {/* =============================================
                LEFT / PINNED
            ============================================== */}

            <div className="relative min-h-[100vh]">
              <div
                ref={leftPanelRef}
                className={[
                  "flex",
                  "h-[100vh]",
                  "w-full",
                  "flex-col",
                  "py-[50px]",
                ].join(" ")}
              >
                {/* HEADER */}

                <div className="process-intro flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-8 bg-[var(--brand-gold)]" />

                    <p className="eyebrow !text-[var(--brand-gold)]">
                      The Process
                    </p>
                  </div>

                  <p className="text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/35">
                    {
                      current.number
                    }{" "}
                    / 06
                  </p>
                </div>

                {/* VISUAL */}

                <div className="relative min-h-0 flex-1">
                  <ProcessObject
                    active={
                      activeStep
                    }
                  />
                </div>

                {/* CURRENT STEP */}

                <div>
                  <div className="flex items-end justify-between gap-8">
                    <div>
                      <p
                        key={
                          current.eyebrow
                        }
                        className="animate-[processCopy_500ms_ease-out] text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]"
                      >
                        {
                          current.eyebrow
                        }
                      </p>

                      <h3
                        key={
                          current.title
                        }
                        className={[
                          "animate-[processCopy_500ms_ease-out]",
                          "font-editorial",
                          "mt-3",
                          "text-[clamp(36px,3.5vw,54px)]",
                          "leading-none",
                          "tracking-[-0.035em]",
                        ].join(" ")}
                      >
                        {
                          current.title
                        }
                      </h3>
                    </div>

                    <span className="mb-2 h-[7px] w-[7px] rounded-full bg-[var(--brand-gold)]" />
                  </div>

                  {/* PROGRESS */}

                  <div className="relative mt-7 h-px bg-[var(--walnut-patina)]/12">
                    <div
                      className={[
                        "absolute",
                        "inset-y-0",
                        "left-0",
                        "bg-[var(--brand-gold)]",
                        "transition-[width]",
                        "duration-700",
                        "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      ].join(" ")}
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================
                RIGHT / SCROLLING
            ============================================== */}

            <div
              ref={rightPanelRef}
              className={[
                "relative",
                "border-l",
                "border-[var(--walnut-patina)]/10",
                "py-[clamp(100px,10vw,150px)]",
                "pl-[clamp(45px,5vw,80px)]",
              ].join(" ")}
            >
              {/* TIMELINE LINE */}

              <div
                aria-hidden="true"
                className={[
                  "absolute",
                  "bottom-[150px]",
                  "left-[-1px]",
                  "top-[150px]",
                  "w-px",
                  "bg-[var(--walnut-patina)]/[0.06]",
                ].join(" ")}
              />

              <div className="space-y-4">
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
                        ref={(
                          element
                        ) => {
                          stepRefs.current[
                            index
                          ] =
                            element;
                        }}
                        className={[
                          "process-step",
                          "relative",
                        ].join(
                          " "
                        )}
                      >
                        {/* NODE */}

                        <span
                          className={[
                            "absolute",
                            "left-[calc(-1*clamp(45px,5vw,80px)-1px)]",
                            "top-[34px]",
                            "-translate-x-1/2",
                            "rounded-full",
                            "border",
                            "transition-all",
                            "duration-500",

                            isActive
                              ? [
                                  "h-[15px]",
                                  "w-[15px]",
                                  "border-[var(--brand-gold)]",
                                  "bg-[var(--alabaster-mist)]",
                                ].join(
                                  " "
                                )
                              : [
                                  "h-[7px]",
                                  "w-[7px]",
                                  "border-[var(--walnut-patina)]/20",
                                  "bg-[var(--alabaster-mist)]",
                                ].join(
                                  " "
                                ),
                          ].join(
                            " "
                          )}
                        >
                          {isActive && (
                            <span
                              className={[
                                "absolute",
                                "left-1/2",
                                "top-1/2",
                                "h-[5px]",
                                "w-[5px]",
                                "-translate-x-1/2",
                                "-translate-y-1/2",
                                "rounded-full",
                                "bg-[var(--brand-gold)]",
                              ].join(
                                " "
                              )}
                            />
                          )}
                        </span>

                        {/* CARD */}

                        <button
                          type="button"
                          onClick={() =>
                            selectStep(
                              index
                            )
                          }
                          className={[
                            "group",
                            "w-full",
                            "border-b",
                            "border-[var(--walnut-patina)]/10",
                            "py-8",
                            "text-left",
                            "transition-all",
                            "duration-700",

                            isActive
                              ? "pb-12"
                              : "opacity-55 hover:opacity-90",
                          ].join(
                            " "
                          )}
                        >
                          <div className="grid grid-cols-[58px_1fr_auto] items-start gap-5">
                            {/* NUMBER */}

                            <span
                              className={[
                                "pt-[5px]",
                                "font-heading",
                                "text-[13px]",
                                "tracking-[0.03em]",
                                "transition-colors",
                                "duration-500",

                                isActive
                                  ? "text-[var(--brand-gold)]"
                                  : "text-[var(--walnut-patina)]/42",
                              ].join(
                                " "
                              )}
                            >
                              {
                                step.number
                              }
                            </span>

                            {/* CONTENT */}

                            <div>
                              <p
                                className={[
                                  "text-[9px]",
                                  "uppercase",
                                  "tracking-[0.21em]",
                                  "transition-colors",
                                  "duration-500",

                                  isActive
                                    ? "text-[var(--brand-gold)]"
                                    : "text-[var(--walnut-patina)]/42",
                                ].join(
                                  " "
                                )}
                              >
                                {
                                  step.eyebrow
                                }
                              </p>

                              <h2
                                className={[
                                  "font-editorial",
                                  "mt-3",
                                  "leading-[0.95]",
                                  "tracking-[-0.04em]",
                                  "transition-all",
                                  "duration-700",

                                  isActive
                                    ? "text-[clamp(48px,5vw,76px)] text-[var(--obsidian-slate)]"
                                    : "text-[clamp(36px,3.5vw,52px)] text-[var(--walnut-patina)]/55",
                                ].join(
                                  " "
                                )}
                              >
                                {
                                  step.title
                                }
                              </h2>

                              {/* COPY */}

                              <div
                                className={[
                                  "grid",
                                  "transition-all",
                                  "duration-700",
                                  "ease-[cubic-bezier(0.22,1,0.36,1)]",

                                  isActive
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0",
                                ].join(
                                  " "
                                )}
                              >
                                <div className="overflow-hidden">
                                  <p className="max-w-[600px] pt-6 text-[14px] leading-[1.9] text-[var(--walnut-patina)]/68 md:text-[15px]">
                                    {
                                      step.text
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* INDICATOR */}

                            <span
                              className={[
                                "mt-2",
                                "flex",
                                "h-8",
                                "w-8",
                                "items-center",
                                "justify-center",
                                "rounded-full",
                                "border",
                                "text-[14px]",
                                "transition-all",
                                "duration-500",

                                isActive
                                  ? [
                                      "rotate-45",
                                      "border-[var(--brand-gold)]",
                                      "text-[var(--brand-gold)]",
                                    ].join(
                                      " "
                                    )
                                  : [
                                      "border-[var(--walnut-patina)]/16",
                                      "text-[var(--walnut-patina)]/35",
                                      "group-hover:border-[var(--brand-gold)]/50",
                                    ].join(
                                      " "
                                    ),
                              ].join(
                                " "
                              )}
                            >
                              +
                            </span>
                          </div>
                        </button>
                      </article>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          MOBILE / TABLET
      ================================================== */}

      <div className="site-container py-[clamp(90px,12vw,140px)] lg:hidden">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            The Process
          </p>
        </div>

        {/* PROGRESS */}

        <div className="mt-10 flex items-center gap-2">
          {steps.map(
            (
              step,
              index
            ) => (
              <button
                key={
                  step.number
                }
                type="button"
                aria-label={`View ${step.title}`}
                onClick={() =>
                  setActiveStep(
                    index
                  )
                }
                className="relative h-[3px] flex-1 overflow-hidden bg-[var(--walnut-patina)]/12"
              >
                <span
                  className={[
                    "absolute inset-0",
                    "origin-left",
                    "bg-[var(--brand-gold)]",
                    "transition-transform",
                    "duration-500",

                    index <=
                    activeStep
                      ? "scale-x-100"
                      : "scale-x-0",
                  ].join(" ")}
                />
              </button>
            )
          )}
        </div>

        {/* VISUAL */}

        <div className="relative mt-10 aspect-[4/3] overflow-hidden">
          <ProcessObject
            active={
              activeStep
            }
          />
        </div>

        {/* ACCORDION */}

        <div className="mt-8 border-t border-[var(--walnut-patina)]/12">
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
                  className="border-b border-[var(--walnut-patina)]/12"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep(
                        index
                      )
                    }
                    className="w-full py-6 text-left"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex min-w-0 gap-5">
                        <span
                          className={[
                            "pt-[4px]",
                            "text-[9px]",
                            "tracking-[0.18em]",

                            isActive
                              ? "text-[var(--brand-gold)]"
                              : "text-[var(--walnut-patina)]/38",
                          ].join(
                            " "
                          )}
                        >
                          {
                            step.number
                          }
                        </span>

                        <div>
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
                            {
                              step.eyebrow
                            }
                          </p>

                          <h2
                            className={[
                              "font-editorial",
                              "mt-2",
                              "text-[clamp(36px,9vw,54px)]",
                              "leading-none",
                              "tracking-[-0.04em]",

                              isActive
                                ? "text-[var(--obsidian-slate)]"
                                : "text-[var(--walnut-patina)]/55",
                            ].join(
                              " "
                            )}
                          >
                            {
                              step.title
                            }
                          </h2>
                        </div>
                      </div>

                      <span
                        className={[
                          "flex",
                          "h-8",
                          "w-8",
                          "shrink-0",
                          "items-center",
                          "justify-center",
                          "rounded-full",
                          "border",
                          "transition-transform",
                          "duration-500",

                          isActive
                            ? [
                                "rotate-45",
                                "border-[var(--brand-gold)]",
                                "text-[var(--brand-gold)]",
                              ].join(
                                " "
                              )
                            : [
                                "border-[var(--walnut-patina)]/15",
                                "text-[var(--walnut-patina)]/40",
                              ].join(
                                " "
                              ),
                        ].join(
                          " "
                        )}
                      >
                        +
                      </span>
                    </div>

                    <div
                      className={[
                        "grid",
                        "transition-all",
                        "duration-700",

                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden">
                        <p className="ml-[34px] mt-5 max-w-[580px] text-[14px] leading-[1.85] text-[var(--walnut-patina)]/65">
                          {
                            step.text
                          }
                        </p>
                      </div>
                    </div>
                  </button>
                </article>
              );
            }
          )}
        </div>
      </div>

      {/* =================================================
          ANIMATIONS
      ================================================== */}

      <style jsx global>{`
        @keyframes processNumber {
          from {
            opacity: 0;
            transform: translateY(18px)
              scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateY(0)
              scale(1);
          }
        }

        @keyframes processCopy {
          from {
            opacity: 0;
            transform: translateY(
              8px
            );
          }

          to {
            opacity: 1;
            transform: translateY(
              0
            );
          }
        }
      `}</style>
    </section>
  );
}