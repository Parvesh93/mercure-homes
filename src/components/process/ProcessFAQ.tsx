"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

const faqs = [
  {
    question:
      "What is the minimum project size Mercure Homes takes on?",
    answer:
      "We work across single categories (a kitchen, a set of carpets) through to full turnkey homes — scope is discussed and confirmed at the design consultation stage.",
  },
  {
    question:
      "How long does a typical project take?",
    answer:
      "Timelines typically range between 6–8 weeks, depending on the scope and requirements of the project. A detailed stage-by-stage timeline is shared as part of your Project Kit.",
  },
  {
    question:
      "How much of the design can I customise?",
    answer:
      "Every piece is made to order — dimensions, finishes and materials are shaped around you. Nothing leaves our atelier without your approval.",
  },
  {
    question:
      "Where are your factories located?",
    answer:
      "We have manufacturing facilities in Ajmer, Rajasthan and Jigani, Karnataka, where we produce everything in-house — from furniture and lighting to modular systems and other bespoke elements. This allows us to maintain greater control over quality, detailing, and execution across every project.",
  },
  {
    question:
      "Do you work outside Bengaluru?",
    answer:
      "Yes — while our atelier and Experience Centre are based in Bengaluru, we execute turnkey and modular projects pan-India.",
  },
];

export default function ProcessFAQ() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const { gsap } =
      getGSAP();

    const ctx =
      gsap.context(() => {
        gsap.fromTo(
          ".faq-intro",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".faq-row",
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.75,
            ease: "power3.out",

            scrollTrigger: {
              trigger: ".faq-list",
              start: "top 85%",
              once: true,
            },
          }
        );
      }, section);

    return () =>
      ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(120px,13vw,190px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* subtle atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-[8%] top-[12%] h-[400px] w-[400px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            INTRO
        ====================================== */}

        <div className="faq-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                FAQ
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(46px,5.7vw,84px)]",
                "leading-[0.97]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Questions,
              </span>{" "}

              <span className="font-editorial">
                answered.
              </span>
            </h2>
          </div>
        </div>

        {/* =====================================
            FAQ
        ====================================== */}

        <div
          className={[
            "faq-list",
            "mt-[clamp(70px,8vw,110px)]",
            "border-t",
            "border-[var(--walnut-patina)]/14",
          ].join(" ")}
        >
          {faqs.map(
            (faq, index) => {
              const isOpen =
                openIndex === index;

              return (
                <article
                  key={faq.question}
                  className={[
                    "faq-row",
                    "border-b",
                    "border-[var(--walnut-patina)]/12",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(
                        isOpen
                          ? null
                          : index
                      )
                    }
                    className={[
                      "group",
                      "grid w-full",
                      "grid-cols-[1fr_auto]",
                      "items-center",
                      "gap-8",
                      "py-[clamp(24px,3vw,38px)]",
                      "text-left",
                    ].join(" ")}
                    aria-expanded={
                      isOpen
                    }
                  >
                    <div className="flex items-start gap-6 md:gap-10">
                      <span
                        className={[
                          "mt-[7px]",
                          "text-[8px]",
                          "tracking-[0.2em]",
                          "transition-colors",
                          "duration-500",

                          isOpen
                            ? "text-[var(--brand-gold)]"
                            : "text-[var(--walnut-patina)]/35",
                        ].join(" ")}
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <h3
                        className={[
                          "max-w-[900px]",
                          "font-heading",
                          "text-[clamp(20px,2.1vw,32px)]",
                          "leading-[1.25]",
                          "tracking-[-0.03em]",
                          "transition-colors",
                          "duration-500",

                          isOpen
                            ? "text-[var(--obsidian-slate)]"
                            : "text-[var(--walnut-patina)]/70",
                        ].join(" ")}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    {/* plus / minus */}

                    <span
                      className={[
                        "relative",
                        "flex h-10 w-10",
                        "shrink-0",
                        "items-center",
                        "justify-center",
                        "rounded-full",
                        "border",
                        "transition-all",
                        "duration-500",

                        isOpen
                          ? [
                              "border-[var(--brand-gold)]",
                              "text-[var(--brand-gold)]",
                            ].join(" ")
                          : [
                              "border-[var(--walnut-patina)]/18",
                              "text-[var(--walnut-patina)]/45",
                              "group-hover:border-[var(--brand-gold)]/50",
                            ].join(" "),
                      ].join(" ")}
                    >
                      <span className="absolute h-px w-3 bg-current" />

                      <span
                        className={[
                          "absolute h-3 w-px",
                          "bg-current",
                          "transition-transform",
                          "duration-500",

                          isOpen
                            ? "rotate-90 scale-y-0"
                            : "rotate-0 scale-y-100",
                        ].join(" ")}
                      />
                    </span>
                  </button>

                  {/* ANSWER */}

                  <div
                    className={[
                      "grid",
                      "transition-[grid-template-rows,opacity]",
                      "duration-700",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",

                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div className="grid pb-[clamp(28px,3vw,42px)] md:grid-cols-[70px_1fr] md:gap-10">
                        <div />

                        <p className="max-w-[760px] text-[14px] leading-[1.9] text-[var(--walnut-patina)]/65 md:text-[15px]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        {/* =====================================
            CONTACT CTA
            Required by source document
        ====================================== */}

        <div
          className={[
            "mt-[clamp(55px,6vw,85px)]",
            "flex",
            "justify-end",
          ].join(" ")}
        >
          <Link
            href="/contact"
            className={[
              "group flex",
              "items-center gap-5",
              "text-[10px]",
              "uppercase",
              "tracking-[0.22em]",
              "text-[var(--walnut-patina)]/65",
            ].join(" ")}
          >
            <span>
              Get in touch
            </span>

            <span className="relative block h-px w-12 overflow-hidden bg-[var(--walnut-patina)]/18">
              <span
                className={[
                  "absolute inset-0",
                  "-translate-x-full",
                  "bg-[var(--brand-gold)]",
                  "transition-transform",
                  "duration-700",
                  "group-hover:translate-x-0",
                ].join(" ")}
              />
            </span>

            <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}