"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mercurehomes/",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MercureHomes/featured",
  },
];

export default function ContactLocation() {
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
        ".contact-location-intro",
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
        ".contact-map-wrap",
        {
          clipPath: "inset(7% 0% 7% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-map-wrap",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".contact-location-details",
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-location-details",
            start: "top 84%",
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
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(110px,12vw,180px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute bottom-[5%] right-[-6%] h-[380px] w-[380px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* INTRO */}

        <div className="contact-location-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Visit the Atelier
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(44px,5.4vw,80px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Experience Mercure
              </span>{" "}

              <span className="font-editorial">
                in Bengaluru.
              </span>
            </h2>
          </div>
        </div>

        {/* MAP + DETAILS */}

        <div
          className={[
            "mt-[clamp(70px,8vw,110px)]",
            "grid gap-14",
            "lg:grid-cols-[1.15fr_0.85fr]",
            "lg:items-stretch",
            "lg:gap-[clamp(60px,7vw,110px)]",
          ].join(" ")}
        >
          {/* MAP */}

          <div className="contact-map-wrap relative min-h-[460px] overflow-hidden bg-[var(--alabaster-mist)]">
            <iframe
              title="Mercure Homes Bengaluru"
              src="https://www.google.com/maps?q=Axis%20Inspiron%2C%20BTM%204th%20Stage%2C%20Bengaluru%2C%20Karnataka%20560076&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[0.95]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* DETAILS */}

          <div className="contact-location-details flex flex-col justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                Mercure Homes
              </p>

              <address className="mt-7 not-italic">
                <p
                  className={[
                    "max-w-[520px]",
                    "font-editorial",
                    "text-[clamp(30px,3.2vw,46px)]",
                    "leading-[1.18]",
                    "tracking-[-0.03em]",
                  ].join(" ")}
                >
                  Axis Inspiron,
                  <br />
                  BTM 4th Stage,
                  <br />
                  Bengaluru, Karnataka,
                  <br />
                  560076
                </p>
              </address>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-[6px] w-[6px] rounded-full bg-[var(--brand-gold)]" />

                <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/55">
                  Visit by appointment
                </span>
              </div>
            </div>

            {/* SOCIAL */}

            <div className="mt-14 border-t border-[var(--walnut-patina)]/12 pt-7">
              <p className="text-[8px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/38">
                Follow Mercure Homes
              </p>

              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "group flex items-center gap-3",
                      "text-[12px]",
                      "text-[var(--walnut-patina)]/65",
                      "transition-colors duration-300",
                      "hover:text-[var(--obsidian-slate)]",
                    ].join(" ")}
                  >
                    <span>{social.label}</span>

                    <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}