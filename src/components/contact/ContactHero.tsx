"use client";

import Image from "next/image";
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

  const imageRef =
    useRef<HTMLDivElement>(null);

  const formSectionRef =
    useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    const section =
      sectionRef.current;

    const image =
      imageRef.current;

    if (
      !section ||
      !image
    ) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const { gsap } =
      getGSAP();

    const ctx =
      gsap.context(() => {
        if (reduceMotion) {
          gsap.set(
            [
              ".contact-hero-line",
              ".contact-hero-meta",
              ".contact-hero-description",
              ".contact-scroll",
            ],
            {
              opacity: 1,
              y: 0,
              yPercent: 0,
            }
          );

          gsap.set(image, {
            scale: 1,
            yPercent: 0,
          });

          return;
        }

        /* =========================================
           IMAGE
        ========================================== */

        gsap.fromTo(
          image,
          {
            scale: 1.1,
          },
          {
            scale: 1,
            duration: 2.2,
            ease:
              "power3.out",
          }
        );

        /* =========================================
           META
        ========================================== */

        gsap.fromTo(
          ".contact-hero-meta",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.35,
            ease:
              "power3.out",
          }
        );

        /* =========================================
           TITLE
        ========================================== */

        gsap.fromTo(
          ".contact-hero-line",
          {
            yPercent: 110,
          },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.11,
            delay: 0.45,
            ease:
              "power4.out",
          }
        );

        /* =========================================
           SUPPORTING LINE
        ========================================== */

        gsap.fromTo(
          ".contact-hero-description",
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.95,
            ease:
              "power3.out",
          }
        );

        /* =========================================
           SCROLL INDICATOR
        ========================================== */

        gsap.fromTo(
          ".contact-scroll",
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.15,
            ease:
              "power3.out",
          }
        );

        /* =========================================
           PARALLAX
        ========================================== */

        gsap.to(image, {
          yPercent: 7,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        /* =========================================
           FORM REVEAL
        ========================================== */

        gsap.fromTo(
          ".contact-form-wrap",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                ".contact-form-wrap",
              start:
                "top 84%",
              once: true,
            },
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

    setSubmitted(true);
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* =================================================
          HERO
      ================================================== */}

      <section
        ref={sectionRef}
        data-header-theme="dark"
        className={[
          "relative",
          "min-h-[100svh]",
          "overflow-hidden",
          "bg-[var(--obsidian-slate)]",
          "text-[var(--ivory-vein)]",
        ].join(" ")}
      >
        {/* =============================================
            BACKGROUND IMAGE
        ============================================== */}

        <div
          ref={imageRef}
          className={[
            "absolute",
            "inset-[-4%]",
            "will-change-transform",
          ].join(" ")}
        >
          <Image
            src="/images/contact/hero.jpg"
            alt="Mercure Homes interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* =============================================
            OVERLAYS
        ============================================== */}

        <div className="pointer-events-none absolute inset-0 bg-[var(--walnut-patina)]/16" />

        <div
          className={[
            "pointer-events-none",
            "absolute inset-0",
            "bg-gradient-to-r",
            "from-[var(--obsidian-slate)]/82",
            "via-[var(--obsidian-slate)]/38",
            "to-[var(--obsidian-slate)]/8",
          ].join(" ")}
        />

        <div
          className={[
            "pointer-events-none",
            "absolute inset-0",
            "bg-gradient-to-t",
            "from-[var(--obsidian-slate)]/80",
            "via-[var(--obsidian-slate)]/10",
            "to-[var(--obsidian-slate)]/24",
          ].join(" ")}
        />

        {/* =============================================
            WARM ATMOSPHERE
        ============================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className={[
              "absolute",
              "-left-[8%]",
              "top-[14%]",
              "h-[420px]",
              "w-[420px]",
              "rounded-full",
              "bg-[var(--caramel-bronze)]/[0.055]",
              "blur-[160px]",
            ].join(" ")}
          />
        </div>

        {/* =============================================
            HERO CONTENT
        ============================================== */}

        <div
          className={[
            "site-container",
            "relative z-10",
            "flex",
            "min-h-[100svh]",
            "items-end",
            "pb-[9vh]",
            "pt-36",
            "md:pb-[10vh]",
          ].join(" ")}
        >
          <div className="w-full">
            {/* META */}

            <div className="contact-hero-meta mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  Contact
                </p>
              </div>

              {/* <span
                className={[
                  "hidden",
                  "text-[9px]",
                  "uppercase",
                  "tracking-[0.24em]",
                  "text-[var(--alabaster-mist)]/45",
                  "md:block",
                ].join(" ")}
              >
                Bengaluru · India
              </span> */}
            </div>

            {/* TITLE */}

            <div className="max-w-[1220px]">
              <div className="overflow-hidden pb-[0.08em]">
                <div
                  className={[
                    "contact-hero-line",
                    "font-heading",
                    "text-[clamp(50px,6.7vw,108px)]",
                    "leading-[0.92]",
                    "tracking-[-0.055em]",
                  ].join(" ")}
                >
                  Crafting your story,
                </div>
              </div>

              <div className="overflow-hidden pb-[0.08em]">
                <div
                  className={[
                    "contact-hero-line",
                    "font-editorial",
                    "text-[clamp(50px,6.7vw,108px)]",
                    "leading-[0.95]",
                    "tracking-[-0.045em]",
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
                    "text-[clamp(50px,6.7vw,108px)]",
                    "leading-[0.92]",
                    "tracking-[-0.055em]",
                  ].join(" ")}
                >
                  Let&apos;s begin with yours.
                </div>
              </div>
            </div>

            {/* CONTACT SHORTCUTS */}

            <div className="contact-hero-description mt-[clamp(32px,4vw,50px)]">
              <div className="mb-6 h-px w-[min(520px,75vw)] bg-[var(--brand-gold)]/35" />

              <div
                className={[
                  "flex",
                  "flex-col",
                  "gap-5",
                  "sm:flex-row",
                  "sm:items-center",
                  "sm:gap-9",
                ].join(" ")}
              >
                <a
                  href="tel:+918431001900"
                  className={[
                    "group",
                    "flex w-fit",
                    "items-center gap-4",
                    "text-[9px]",
                    "uppercase",
                    "tracking-[0.2em]",
                    "text-[var(--alabaster-mist)]/70",
                    "transition-colors",
                    "hover:text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  <span>
                    +91 84310 01900
                  </span>

                  <span className="text-[var(--brand-gold)]">
                    ↗
                  </span>
                </a>

                <a
                  href="mailto:info@mercurehomes.com"
                  className={[
                    "group",
                    "flex w-fit",
                    "items-center gap-4",
                    "text-[9px]",
                    "uppercase",
                    "tracking-[0.2em]",
                    "text-[var(--alabaster-mist)]/70",
                    "transition-colors",
                    "hover:text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  <span>
                    info@mercurehomes.com
                  </span>

                  <span className="text-[var(--brand-gold)]">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================
            SCROLL / BEGIN
        ============================================== */}

        <button
          type="button"
          onClick={scrollToForm}
          className={[
            "contact-scroll",
            "absolute",
            "bottom-7",
            "right-[var(--page-padding)]",
            "z-20",
            "hidden",
            "items-center",
            "gap-4",
            "md:flex",
          ].join(" ")}
        >
          <span className="text-[8px] uppercase tracking-[0.24em] text-white/45">
            Begin a conversation
          </span>

          <span className="relative h-[48px] w-px overflow-hidden bg-white/20">
            <span
              className={[
                "absolute",
                "left-0 top-0",
                "h-[18px]",
                "w-px",
                "bg-[var(--brand-gold)]",
                "animate-[contactScroll_1.8s_ease-in-out_infinite]",
              ].join(" ")}
            />
          </span>
        </button>
      </section>

      {/* =================================================
          CONTACT / FORM SECTION
      ================================================== */}

      <section
        ref={formSectionRef}
        data-header-theme="light"
        className={[
          "relative",
          "overflow-x-clip",
          "bg-[var(--ivory-vein)]",
          "py-[clamp(90px,10vw,150px)]",
          "text-[var(--obsidian-slate)]",
        ].join(" ")}
      >
        {/* ATMOSPHERE */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div
            className={[
              "absolute",
              "-left-[8%]",
              "top-[12%]",
              "h-[380px]",
              "w-[380px]",
              "rounded-full",
              "bg-[var(--gilded-ochre)]/[0.025]",
              "blur-[150px]",
            ].join(" ")}
          />

          <div
            className={[
              "absolute",
              "bottom-[6%]",
              "right-[-7%]",
              "h-[420px]",
              "w-[420px]",
              "rounded-full",
              "bg-[var(--caramel-bronze)]/[0.02]",
              "blur-[150px]",
            ].join(" ")}
          />
        </div>

        <div className="site-container relative z-10">
          <div
            className={[
              "contact-form-wrap",
              "grid gap-16",
              "lg:grid-cols-[0.72fr_1.28fr]",
              "lg:gap-[clamp(80px,9vw,150px)]",
            ].join(" ")}
          >
            {/* =========================================
                CONTACT DETAILS
            ========================================== */}

            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  Begin a conversation
                </p>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
                    Phone
                  </p>

                  <a
                    href="tel:+918431001900"
                    className={[
                      "mt-3 block",
                      "font-heading",
                      "text-[clamp(24px,2.3vw,34px)]",
                      "tracking-[-0.03em]",
                      "text-[var(--obsidian-slate)]",
                    ].join(" ")}
                  >
                    +91 84310 01900
                  </a>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
                    Email
                  </p>

                  <a
                    href="mailto:info@mercurehomes.com"
                    className={[
                      "mt-3 block",
                      "font-heading",
                      "text-[clamp(22px,2vw,30px)]",
                      "tracking-[-0.03em]",
                      "text-[var(--obsidian-slate)]",
                    ].join(" ")}
                  >
                    info@mercurehomes.com
                  </a>
                </div>
              </div>

              {/* RESPONSE */}

              <div className="mt-10 flex items-center gap-4">
                <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />

                <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/52">
                  We respond within 24 hours
                </p>
              </div>

              {/* WHATSAPP */}

              <a
                href="https://wa.me/918431001900"
                target="_blank"
                rel="noreferrer"
                className={[
                  "group",
                  "mt-9",
                  "flex w-fit",
                  "items-center gap-5",
                  "text-[10px]",
                  "uppercase",
                  "tracking-[0.22em]",
                  "text-[var(--walnut-patina)]/70",
                ].join(" ")}
              >
                <span>
                  WhatsApp
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
              </a>
            </div>

            {/* =========================================
                FORM
            ========================================== */}

            <div>
              {submitted ? (
                <div
                  className={[
                    "flex",
                    "min-h-[520px]",
                    "items-center",
                    "border-y",
                    "border-[var(--walnut-patina)]/12",
                    "py-12",
                  ].join(" ")}
                >
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                      Thank you
                    </p>

                    <p
                      className={[
                        "font-editorial",
                        "mt-5",
                        "max-w-[620px]",
                        "text-[clamp(34px,4vw,58px)]",
                        "leading-[1.08]",
                        "tracking-[-0.03em]",
                      ].join(" ")}
                    >
                      We&apos;ll be in touch
                      within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="grid gap-x-7 gap-y-8 md:grid-cols-2"
                >
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="fullName"
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
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
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
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
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
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
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
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
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
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
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
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
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
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
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
                        "outline-none",
                        "transition-colors duration-300",
                        "focus:border-[var(--brand-gold)]",
                      ].join(" ")}
                    >
                      <option
                        value=""
                        disabled
                      >
                        Select
                      </option>

                      {projectTypes.map(
                        (type) => (
                          <option
                            key={
                              type
                            }
                            value={
                              type
                            }
                          >
                            {type}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* SOURCE */}

                  <div className="md:col-span-2">
                    <label
                      htmlFor="source"
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
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
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
                        "outline-none",
                        "transition-colors duration-300",
                        "focus:border-[var(--brand-gold)]",
                      ].join(" ")}
                    >
                      <option value="">
                        Select
                      </option>

                      {referralSources.map(
                        (
                          source
                        ) => (
                          <option
                            key={
                              source
                            }
                            value={
                              source
                            }
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
                      className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={[
                        "mt-3 w-full",
                        "resize-none",
                        "border-0 border-b",
                        "border-[var(--walnut-patina)]/18",
                        "bg-transparent",
                        "px-0 py-3",
                        "text-[15px]",
                        "text-[var(--obsidian-slate)]",
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
                        "text-[var(--obsidian-slate)]",
                      ].join(" ")}
                    >
                      <span>
                        Submit enquiry
                      </span>

                      <span className="relative block h-px w-14 overflow-hidden bg-[var(--walnut-patina)]/18">
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

      <style jsx global>{`
        @keyframes contactScroll {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }

          30% {
            opacity: 1;
          }

          70% {
            opacity: 1;
          }

          100% {
            transform: translateY(48px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}