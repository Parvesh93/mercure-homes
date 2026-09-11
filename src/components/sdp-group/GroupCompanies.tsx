"use client";

import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

const companies = [
  {
    number: "01",
    title: "SDP Machines",
    location: "Ajmer, Rajasthan",
    text:
      "World-class stone-processing machinery, engineered to reduce India's reliance on expensive imports — a torchbearer for 'Make in India' in heavy engineering.",
    video:
      "https://www.youtube.com/embed/q5CbyGRPTyM",
  },
  {
    number: "02",
    title: "SDP Stones",
    location: "Shoolgiri, Tamil Nadu",
    text:
      "Exotic natural stone curated from 38 countries, including an exclusive partnership securing Benetton Beige marble from a premier Turkish quarry.",
    video:
      "https://www.youtube.com/embed/aud6STneDJg",
  },
];

export default function GroupCompanies() {
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
        ".group-company-intro",
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

      gsap.utils
        .toArray<HTMLElement>(".group-company-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: index * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                once: true,
              },
            }
          );
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "py-[clamp(120px,13vw,200px)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-[var(--caramel-bronze)]/[0.05] blur-[150px]" />

        <div className="absolute bottom-[8%] right-[-8%] h-[460px] w-[460px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[170px]" />
      </div>

      <div className="site-container relative z-10">
        {/* INTRO */}

        <div className="group-company-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                The Group Today
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[920px]",
                "text-[clamp(46px,5.7vw,86px)]",
                "leading-[0.97]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Engineering and stone,
              </span>{" "}

              <span className="font-editorial">
                carried forward.
              </span>
            </h2>
          </div>
        </div>

        {/* COMPANIES */}

        <div className="mt-[clamp(75px,8vw,120px)] space-y-[clamp(90px,10vw,150px)]">
          {companies.map((company, index) => {
            const reverse = index % 2 !== 0;

            return (
              <article
                key={company.title}
                className={[
                  "group-company-card",
                  "grid gap-12",
                  "lg:grid-cols-2",
                  "lg:items-center",
                  "lg:gap-[clamp(60px,7vw,110px)]",
                ].join(" ")}
              >
                {/* VIDEO */}

                <div
                  className={[
                    "relative overflow-hidden",
                    reverse ? "lg:order-2" : "",
                  ].join(" ")}
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <iframe
                      src={company.video}
                      title={company.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/42">
                      {company.location}
                    </span>

                    <span className="text-[8px] tracking-[0.18em] text-[var(--brand-gold)]">
                      {company.number}
                    </span>
                  </div>
                </div>

                {/* COPY */}

                <div className={reverse ? "lg:order-1" : ""}>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    {company.location}
                  </span>

                  <h3
                    className={[
                      "mt-5",
                      "font-editorial",
                      "text-[clamp(42px,4.8vw,72px)]",
                      "leading-[1]",
                      "tracking-[-0.035em]",
                    ].join(" ")}
                  >
                    {company.title}
                  </h3>

                  <p className="mt-7 max-w-[620px] text-[15px] leading-[1.9] text-[var(--alabaster-mist)]/60">
                    {company.text}
                  </p>

                  <span className="mt-8 block h-px w-12 bg-[var(--brand-gold)]" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}