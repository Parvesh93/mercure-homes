"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { featuredProjects } from "../../data/projects";
import { getGSAP } from "../../lib/gsap";

export default function FeaturedProjects() {
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
      /* =====================================
         INTRO
      ====================================== */

      gsap.fromTo(
        ".projects-intro",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      /* =====================================
         PROJECTS
      ====================================== */

      gsap.utils
        .toArray<HTMLElement>(".featured-project")
        .forEach((project) => {
          const imageWrap =
            project.querySelector<HTMLElement>(
              ".featured-project-image-wrap"
            );

          const image =
            project.querySelector<HTMLElement>(
              ".featured-project-image"
            );

          const title =
            project.querySelector<HTMLElement>(
              ".featured-project-title"
            );

          const details =
            project.querySelector<HTMLElement>(
              ".featured-project-details"
            );

          if (!imageWrap || !image) return;

          /* Image reveal */

          gsap.fromTo(
            imageWrap,
            {
              clipPath: "inset(10% 0% 10% 0%)",
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.5,
              ease: "power3.out",

              scrollTrigger: {
                trigger: project,
                start: "top 80%",
                once: true,
              },
            }
          );

          /* Image parallax */

          gsap.fromTo(
            image,
            {
              scale: 1.12,
              yPercent: -4,
            },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",

              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          /* Title */

          if (title) {
            gsap.fromTo(
              title,
              {
                opacity: 0,
                y: 55,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: project,
                  start: "top 70%",
                  once: true,
                },
              }
            );
          }

          /* Details */

          if (details) {
            gsap.fromTo(
              details,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.1,
                ease: "power3.out",

                scrollTrigger: {
                  trigger: project,
                  start: "top 68%",
                  once: true,
                },
              }
            );
          }
        });
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
        "py-[clamp(120px,14vw,220px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =====================================
          SUBTLE BRAND ATMOSPHERE
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[5%] top-[18%] h-[340px] w-[340px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[130px]" />

        <div className="absolute bottom-[12%] right-[5%] h-[360px] w-[360px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[140px]" />
      </div>

      {/* =====================================
          INTRO
      ====================================== */}

      <div className="site-container relative z-10">
        <div className="projects-intro grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
          {/* Label */}

          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Selected Projects
              </p>
            </div>
          </div>

          {/* Heading */}

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className={[
                "max-w-[900px]",
                "text-[clamp(48px,6vw,92px)]",
                "leading-[0.95]",
                "tracking-[-0.05em]",
                "text-[var(--obsidian-slate)]",
              ].join(" ")}
            >
              <span className="font-heading">
                Spaces shaped
              </span>

              <br />

              <span className="font-editorial tracking-[-0.035em]">
                with intention.
              </span>
            </h2>

            <Link
              href="/projects"
              className={[
                "group flex w-fit items-center gap-5",
                "text-[10px]",
                "uppercase",
                "tracking-[0.22em]",
                "text-[var(--walnut-patina)]/65",
                "transition-colors duration-500",
                "hover:text-[var(--obsidian-slate)]",
              ].join(" ")}
            >
              <span>View all projects</span>

              <span className="relative block h-px w-14 overflow-hidden bg-[var(--walnut-patina)]/18">
                <span
                  className={[
                    "absolute inset-0",
                    "-translate-x-full",
                    "bg-[var(--brand-gold)]",
                    "transition-transform duration-700",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:translate-x-0",
                  ].join(" ")}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================
          PROJECTS
      ====================================== */}

      <div className="relative z-10 mt-[clamp(100px,12vw,180px)] space-y-[clamp(140px,16vw,240px)]">
        {featuredProjects.map(
          (project, index) => {
            const reverse =
              index % 2 !== 0;

            return (
              <article
                key={project.id}
                className="featured-project relative"
              >
                <div className="site-container">
                  {/* ---------------------------------
                      NUMBER
                  ---------------------------------- */}

                  <div
                    className={[
                      "mb-6 flex",
                      reverse
                        ? "justify-end"
                        : "justify-start",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-px w-7 bg-[var(--brand-gold)]/65" />

                      <span className="text-[10px] tracking-[0.24em] text-[var(--brand-gold)]">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* ---------------------------------
                      IMAGE
                  ---------------------------------- */}

                  <Link
                    href={project.href}
                    data-cursor="View"
                    className={[
                      "featured-project-image-wrap",
                      "group relative block overflow-hidden",

                      reverse
                        ? "ml-auto w-[88%]"
                        : "mr-auto w-[88%]",

                      "max-lg:w-full",
                    ].join(" ")}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="featured-project-image absolute inset-[-6%]">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 88vw"
                          className="object-cover"
                        />
                      </div>

                      {/* restrained overlay */}

                      <div
                        className={[
                          "absolute inset-0",
                          "bg-[var(--walnut-patina)]/[0.05]",
                          "transition-colors duration-700",
                          "group-hover:bg-[var(--walnut-patina)]/[0.11]",
                        ].join(" ")}
                      />

                      {/* Project meta */}

                      <div className="absolute left-7 top-7 flex items-center gap-4">
                        <span className="text-[9px] uppercase tracking-[0.23em] text-[var(--ivory-vein)]/80">
                          {project.category}
                        </span>

                        <span className="h-px w-8 bg-[var(--brand-gold)]/70" />

                        <span className="text-[9px] uppercase tracking-[0.23em] text-[var(--ivory-vein)]/62">
                          {project.location}
                        </span>
                      </div>

                      {/* Arrow */}

                      <span
                        className={[
                          "absolute right-7 top-7",
                          "text-[18px]",
                          "text-[var(--ivory-vein)]/80",
                          "transition-transform duration-500",
                          "group-hover:translate-x-1",
                          "group-hover:-translate-y-1",
                        ].join(" ")}
                      >
                        ↗
                      </span>
                    </div>
                  </Link>

                  {/* ---------------------------------
                      TITLE / DETAILS
                  ---------------------------------- */}

                  <div
                    className={[
                      "relative z-10",
                      "-mt-[clamp(28px,4vw,65px)]",

                      reverse
                        ? "mr-auto max-w-[760px]"
                        : "ml-auto max-w-[760px]",
                    ].join(" ")}
                  >
                    <h3
                      className={[
                        "featured-project-title",
                        "font-heading",
                        "text-[clamp(52px,7vw,110px)]",
                        "leading-[0.9]",
                        "tracking-[-0.055em]",
                        "text-[var(--obsidian-slate)]",
                      ].join(" ")}
                    >
                      {project.title}
                    </h3>

                    <div
                      className={[
                        "featured-project-details",
                        "mt-8 grid gap-7",
                        "md:grid-cols-[1fr_auto]",
                        "md:items-end",
                      ].join(" ")}
                    >
                      <p
                        className={[
                          "max-w-[520px]",
                          "text-[15px]",
                          "leading-[1.85]",
                          "text-[var(--walnut-patina)]/65",
                          "md:text-[16px]",
                        ].join(" ")}
                      >
                        {project.description}
                      </p>

                      <Link
                        href={project.href}
                        className={[
                          "group flex w-fit",
                          "items-center gap-4",
                          "text-[10px]",
                          "uppercase",
                          "tracking-[0.2em]",
                          "text-[var(--walnut-patina)]/65",
                          "transition-colors duration-500",
                          "hover:text-[var(--obsidian-slate)]",
                        ].join(" ")}
                      >
                        <span>
                          View project
                        </span>

                        <span
                          className={[
                            "text-[var(--brand-gold)]",
                            "transition-transform duration-500",
                            "group-hover:translate-x-1",
                            "group-hover:-translate-y-1",
                          ].join(" ")}
                        >
                          ↗
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>

      {/* =====================================
          DECORATIVE PROJECT INDEX
      ====================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute right-[-5vw] top-[18%]",
          "select-none",
          "font-heading",
          "text-[clamp(220px,28vw,520px)]",
          "leading-none",
          "text-[var(--walnut-patina)]/[0.025]",
        ].join(" ")}
      >
        01
      </div>
    </section>
  );
}