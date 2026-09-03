"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { homeCollections } from "../../data/collections";
import { getGSAP } from "../../lib/gsap";

export default function CategoryGrid() {
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
        ".category-intro",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".category-card").forEach((card) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
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
      className="bg-[var(--background)] py-[clamp(120px,14vw,220px)]"
    >
      <div className="site-container">
        <div className="category-intro grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              The Collection
            </p>
          </div>

          <div>
            <h2 className="font-editorial max-w-[950px] text-[clamp(46px,6vw,90px)] leading-[1.02] tracking-[-0.04em]">
              Four ways to begin.
              <br />
              Infinite ways to make them yours.
            </h2>
          </div>
        </div>

        <div className="mt-[clamp(80px,10vw,150px)] space-y-[clamp(90px,10vw,150px)]">
          {homeCollections.map((collection, index) => {
            const reverse = index % 2 !== 0;

            return (
              <article
                key={collection.title}
                className="category-card"
              >
                <div
                  className={[
                    "grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12",
                    reverse ? "lg:[direction:rtl]" : "",
                  ].join(" ")}
                >
                  <Link
                    href={collection.href}
                    className="group relative aspect-[16/11] overflow-hidden lg:col-span-8"
                  >
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-black/[0.08]" />

                    <div className="absolute left-6 top-6 md:left-8 md:top-8">
                      <span className="text-[9px] uppercase tracking-[0.24em] text-white/70">
                        {collection.id}
                      </span>
                    </div>
                  </Link>

                  <div
                    className={[
                      "lg:col-span-4 lg:[direction:ltr]",
                      reverse ? "lg:pb-8" : "lg:pb-8",
                    ].join(" ")}
                  >
                    <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {collection.subtitle}
                    </p>

                    <h3 className="font-heading text-[clamp(38px,5vw,68px)] leading-[0.96] tracking-[-0.05em]">
                      {collection.title}
                    </h3>

                    <p className="body-lg mt-8 max-w-[430px]">
                      {collection.description}
                    </p>

                    <Link
                      href={collection.href}
                      className="group mt-9 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em]"
                    >
                      <span>Explore collection</span>

                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}