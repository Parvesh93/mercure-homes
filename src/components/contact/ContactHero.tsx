"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

const projectTypes = [
  "Modular",
  "Lighting",
  "Terrain",
  "Sculpt",
  "Turnkey",
  "Soft Furnishings",
];

const referralSources = [
  "Instagram",
  "Google",
  "Referral",
  "Architect / Designer",
  "YouTube",
  "Other",
];

export default function ContactHero() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [submitted, setSubmitted] =
    useState(false);

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
          ".contact-hero-line",
          {
            yPercent: 110,
          },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power4.out",
          }
        );

        gsap.fromTo(
          ".contact-hero-meta",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          ".contact-form-wrap",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.55,
            ease: "power3.out",
          }
        );
      }, section);

    return () =>
      ctx.revert();
  }, []);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /*
     * Temporary frontend state.
     * Replace with API/server action later.
     */

    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "pt-[clamp(175px,16vw,245px)]",
        "pb-[clamp(100px,11vw,165px)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* =====================================
          AMBIENT BACKGROUND
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[10%] top-[10%] h-[460px] w-[460px] rounded-full bg-[var(--caramel-bronze)]/[0.055] blur-[160px]" />

        <div className="absolute bottom-[5%] right-[-8%] h-[500px] w-[500px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[170px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            TOP
        ====================================== */}

        <div className="contact-hero-meta flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              Contact
            </p>
          </div>

          <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/40 md:block">
            Bengaluru · India
          </span>
        </div>

        {/* =====================================
            HEADING
        ====================================== */}

        <div className="mt-[clamp(55px,7vw,95px)] max-w-[1200px]">
          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "contact-hero-line",
                "font-heading",
                "text-[clamp(52px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              Crafting your story,
            </div>
          </div>

          <div className="overflow-hidden pb-[0.1em]">
            <div
              className={[
                "contact-hero-line",
                "font-editorial",
                "text-[clamp(52px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.04em]",
              ].join(" ")}
            >
              one statement at a time.
            </div>
          </div>

          <div className="overflow-hidden pb-[0.08em]">
            <div
              className={[
                "contact-hero-line",
                "font-heading",
                "text-[clamp(52px,7vw,108px)]",
                "leading-[0.94]",
                "tracking-[-0.05em]",
              ].join(" ")}
            >
              Let&apos;s begin with yours.
            </div>
          </div>
        </div>

        {/* =====================================
            FORM + CONTACT DETAILS
        ====================================== */}

        <div
          className={[
            "contact-form-wrap",
            "mt-[clamp(75px,8vw,120px)]",
            "grid gap-16",
            "border-t",
            "border-[var(--alabaster-mist)]/10",
            "pt-[clamp(55px,6vw,85px)]",
            "lg:grid-cols-[0.72fr_1.28fr]",
            "lg:gap-[clamp(80px,9vw,150px)]",
          ].join(" ")}
        >
          {/* =================================
              CONTACT DETAILS
          ================================== */}

          <div>
            <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
              Begin a conversation
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/35">
                  Phone
                </p>

                <a
                  href="tel:+918431001900"
                  className={[
                    "mt-2 block",
                    "font-heading",
                    "text-[clamp(22px,2.3vw,32px)]",
                    "tracking-[-0.03em]",
                    "text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  +91 84310 01900
                </a>
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/35">
                  Email
                </p>

                <a
                  href="mailto:info@mercurehomes.com"
                  className={[
                    "mt-2 block",
                    "font-heading",
                    "text-[clamp(20px,2vw,28px)]",
                    "tracking-[-0.03em]",
                    "text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  info@mercurehomes.com
                </a>
              </div>
            </div>

            {/* RESPONSE */}

            <div className="mt-10 flex items-center gap-4">
              <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />

              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/50">
                We respond within 24 hours
              </p>
            </div>

            {/* WHATSAPP */}

            <a
              href="https://wa.me/918431001900"
              target="_blank"
              rel="noreferrer"
              className={[
                "group mt-9",
                "flex w-fit",
                "items-center gap-5",
                "text-[10px]",
                "uppercase",
                "tracking-[0.22em]",
                "text-[var(--ivory-vein)]",
              ].join(" ")}
            >
              <span>
                WhatsApp
              </span>

              <span className="relative block h-px w-12 overflow-hidden bg-[var(--alabaster-mist)]/20">
                <span
                  className={[
                    "absolute inset-0",
                    "-translate-x-full",
                    "bg-[var(--brand-gold)]",
                    "transition-transform duration-700",
                    "group-hover:translate-x-0",
                  ].join(" ")}
                />
              </span>

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>

          {/* =================================
              FORM
          ================================== */}

          <div>
            {submitted ? (
              <div
                className={[
                  "flex min-h-[520px]",
                  "items-center",
                  "border-y",
                  "border-[var(--alabaster-mist)]/10",
                  "py-12",
                ].join(" ")}
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    Thank you
                  </p>

                  <p className="font-editorial mt-5 max-w-[620px] text-[clamp(34px,4vw,58px)] leading-[1.08] tracking-[-0.03em]">
                    We&apos;ll be in touch
                    within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid gap-x-7 gap-y-8 md:grid-cols-2"
              >
                {/* NAME */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className={[
                      "mt-3 w-full",
                      "border-0",
                      "border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors",
                      "duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={[
                      "mt-3 w-full",
                      "border-0 border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className={[
                      "mt-3 w-full",
                      "border-0 border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  />
                </div>

                {/* PROJECT TYPE */}

                <div>
                  <label
                    htmlFor="projectType"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    Project Type
                  </label>

                  <select
                    id="projectType"
                    name="projectType"
                    required
                    defaultValue=""
                    className={[
                      "mt-3 w-full",
                      "border-0 border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  >
                    <option
                      value=""
                      disabled
                      className="text-black"
                    >
                      Select
                    </option>

                    {projectTypes.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-black"
                        >
                          {type}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* HOW DID YOU HEAR */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="source"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    How did you hear about us
                  </label>

                  <select
                    id="source"
                    name="source"
                    defaultValue=""
                    className={[
                      "mt-3 w-full",
                      "border-0 border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  >
                    <option
                      value=""
                      className="text-black"
                    >
                      Select
                    </option>

                    {referralSources.map(
                      (source) => (
                        <option
                          key={source}
                          value={source}
                          className="text-black"
                        >
                          {source}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* MESSAGE */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/42"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={[
                      "mt-3 w-full resize-none",
                      "border-0 border-b",
                      "border-[var(--alabaster-mist)]/18",
                      "bg-transparent",
                      "px-0 py-3",
                      "text-[15px]",
                      "text-[var(--ivory-vein)]",
                      "outline-none",
                      "transition-colors duration-300",
                      "focus:border-[var(--brand-gold)]",
                    ].join(" ")}
                  />
                </div>

                {/* SUBMIT */}

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className={[
                      "group mt-3",
                      "flex items-center gap-5",
                      "text-[10px]",
                      "uppercase",
                      "tracking-[0.22em]",
                      "text-[var(--ivory-vein)]",
                    ].join(" ")}
                  >
                    <span>
                      Submit enquiry
                    </span>

                    <span className="relative block h-px w-14 overflow-hidden bg-[var(--alabaster-mist)]/20">
                      <span
                        className={[
                          "absolute inset-0",
                          "-translate-x-full",
                          "bg-[var(--brand-gold)]",
                          "transition-transform duration-700",
                          "group-hover:translate-x-0",
                        ].join(" ")}
                      />
                    </span>

                    <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}