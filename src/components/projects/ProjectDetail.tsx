"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
} from "react";

import { getGSAP } from "../../lib/gsap";

import type { ProjectDetail } from "../../data/projectDetails";

export default function ProjectDetailPage({
  project,
}: {
  project: ProjectDetail;
}) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const heroImageRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    const hero =
      heroImageRef.current;

    if (!section || !hero) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const { gsap } =
      getGSAP();

    const ctx =
      gsap.context(() => {
        /* HERO */

        gsap.fromTo(
          ".project-detail-line",
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
          ".project-detail-meta",
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.45,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          hero,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            duration: 2,
            ease: "power2.out",
          }
        );

        gsap.to(hero, {
          yPercent: 7,
          ease: "none",

          scrollTrigger: {
            trigger:
              ".project-detail-hero",

            start: "top top",

            end: "bottom top",

            scrub: true,
          },
        });

        /* INTRO */

        gsap.fromTo(
          ".project-detail-story",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,

            ease:
              "power3.out",

            scrollTrigger: {
              trigger:
                ".project-detail-story",

              start:
                "top 82%",

              once: true,
            },
          }
        );

        /* GALLERY */

        gsap.utils
          .toArray<HTMLElement>(
            ".project-gallery-image"
          )
          .forEach(
            (
              image,
              index
            ) => {
              gsap.fromTo(
                image,
                {
                  opacity: 0,
                  y: 40,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  delay:
                    index % 2
                      ? 0.08
                      : 0,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger:
                      image,

                    start:
                      "top 88%",

                    once: true,
                  },
                }
              );
            }
          );
      }, section);

    return () =>
      ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="bg-[var(--ivory-vein)] text-[var(--obsidian-slate)]"
    >
      {/* =================================================
          HERO
      ================================================== */}

      <section
        data-header-theme="dark"
        className="project-detail-hero relative min-h-[100svh] overflow-hidden bg-[var(--obsidian-slate)] text-[var(--ivory-vein)]"
      >
        <div
          ref={heroImageRef}
          className="absolute inset-[-4%] will-change-transform"
        >
          <Image
            src={
              project.heroImage
            }
            alt={`${project.title}, ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-[var(--walnut-patina)]/20" />

        <div
          className={[
            "absolute inset-0",
            "bg-gradient-to-t",
            "from-[var(--obsidian-slate)]/85",
            "via-[var(--obsidian-slate)]/12",
            "to-[var(--obsidian-slate)]/25",
          ].join(" ")}
        />

        <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[9vh] pt-36">
          <div className="w-full">
            {/* META */}

            <div className="project-detail-meta mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  {project.location}
                </p>
              </div>

              <span className="hidden text-[9px] uppercase tracking-[0.22em] text-white/50 md:block">
                {project.scope}
              </span>
            </div>

            {/* TITLE */}

            <div className="max-w-[1250px]">
              <div className="overflow-hidden pb-[0.1em]">
                <h1
                  className={[
                    "project-detail-line",
                    "font-heading",
                    "text-[clamp(54px,8vw,128px)]",
                    "leading-[0.9]",
                    "tracking-[-0.055em]",
                  ].join(" ")}
                >
                  {project.title}
                </h1>
              </div>
            </div>

            {/* SCALE */}

            <div className="project-detail-meta mt-8 flex items-end gap-5">
              <span className="font-heading text-[clamp(25px,3vw,40px)] leading-none tracking-[-0.04em]">
                {project.sqft}
              </span>

              <span className="mb-[4px] text-[8px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                Project Scale
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PROJECT STORY
      ================================================== */}

      <section
        data-header-theme="light"
        className="project-detail-story py-[clamp(100px,11vw,170px)]"
      >
        <div className="site-container">
          <div
            className={[
              "grid gap-12",
              "lg:grid-cols-[0.72fr_2.28fr]",
            ].join(" ")}
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--brand-gold)]" />

                <p className="eyebrow !text-[var(--brand-gold)]">
                  The Project
                </p>
              </div>
            </div>

            <div>
              <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
                <p className="max-w-[790px] font-editorial text-[clamp(30px,3.5vw,52px)] leading-[1.12] tracking-[-0.03em]">
                  {project.description}
                </p>

                <div className="space-y-7 border-t border-[var(--walnut-patina)]/12 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                      Location
                    </p>

                    <p className="font-heading mt-2 text-[18px]">
                      {project.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                      Scope
                    </p>

                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--walnut-patina)]/65">
                      {project.scope}
                    </p>
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
                      Scale
                    </p>

                    <p className="font-heading mt-2 text-[18px]">
                      {project.sqft}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          GALLERY
      ================================================== */}

      <section className="pb-[clamp(110px,12vw,190px)]">
        <div className="site-container">
          <div className="grid gap-5 md:grid-cols-2">
            {project.gallery.map(
              (
                image,
                index
              ) => {
                const full =
                  index === 0 ||
                  index ===
                    project.gallery.length -
                      1;

                return (
                  <div
                    key={image}
                    className={[
                      "project-gallery-image",
                      "relative overflow-hidden",

                      full
                        ? "md:col-span-2"
                        : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "relative",

                        full
                          ? "aspect-[16/9]"
                          : "aspect-[4/5]",
                      ].join(" ")}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} project detail ${index + 1}`}
                        fill
                        sizes={
                          full
                            ? "100vw"
                            : "(max-width: 768px) 100vw, 50vw"
                        }
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          MATERIALS
          Only shown when source data actually exists
      ================================================== */}

      {project.materials &&
        project.materials.length >
          0 && (
          <section className="border-y border-[var(--walnut-patina)]/12 py-[clamp(70px,8vw,110px)]">
            <div className="site-container">
              <div className="grid gap-10 lg:grid-cols-[0.72fr_2.28fr]">
                <div>
                  <p className="eyebrow !text-[var(--brand-gold)]">
                    Materials
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {project.materials.map(
                    (
                      material,
                      index
                    ) => (
                      <div
                        key={
                          material
                        }
                        className="border-t border-[var(--walnut-patina)]/15 pt-5"
                      >
                        <span className="text-[8px] tracking-[0.2em] text-[var(--brand-gold)]">
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p className="font-heading mt-4 text-[20px] leading-tight tracking-[-0.03em]">
                          {
                            material
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* =================================================
          QUOTE
          Do not render unless client supplies one
      ================================================== */}

      {project.quote && (
        <section className="py-[clamp(100px,11vw,165px)]">
          <div className="site-container">
            <blockquote className="mx-auto max-w-[1050px] text-center">
              <span className="font-editorial text-[50px] leading-none text-[var(--brand-gold)]">
                “
              </span>

              <p className="font-editorial mt-3 text-[clamp(32px,4.2vw,62px)] leading-[1.08] tracking-[-0.035em]">
                {project.quote.text}
              </p>

              {project.quote
                .author && (
                <footer className="mt-7 text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/50">
                  {
                    project
                      .quote
                      .author
                  }
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* =================================================
          BACK
      ================================================== */}

      <section className="border-t border-[var(--walnut-patina)]/12 py-10">
        <div className="site-container">
          <Link
            href="/projects"
            className="group flex w-fit items-center gap-5 text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/65"
          >
            <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:-translate-x-1">
              ←
            </span>

            <span>
              All Projects
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}