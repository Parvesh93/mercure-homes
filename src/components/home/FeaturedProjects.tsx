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
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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

          const content =
            project.querySelector<HTMLElement>(
              ".featured-project-content"
            );

          if (!imageWrap || !image || !content) return;

          gsap.fromTo(
            imageWrap,
            {
              clipPath: "inset(8% 0% 8% 0%)",
              opacity: 0,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.25,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            image,
            {
              scale: 1.1,
              yPercent: -3,
            },
            {
              scale: 1,
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: "top 74%",
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
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "py-[clamp(110px,12vw,180px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =====================================
          ATMOSPHERE
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[4%] top-[16%] h-[320px] w-[320px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[130px]" />

        <div className="absolute bottom-[10%] right-[4%] h-[340px] w-[340px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[140px]" />
      </div>

      {/* =====================================
          INTRO
      ====================================== */}

      <div className="site-container relative z-10">
        <div className="projects-intro grid gap-10 lg:grid-cols-[0.72fr_2.28fr]">
          {/* LABEL */}

          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Featured Projects
              </p>
            </div>
          </div>

          {/* HEADING */}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              className={[
                "max-w-[850px]",
                "text-[clamp(46px,5.8vw,86px)]",
                "leading-[0.96]",
                "tracking-[-0.05em]",
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
                "group",
                "flex w-fit items-center gap-5",
                "pb-1",
                "text-[10px]",
                "uppercase",
                "tracking-[0.22em]",
                "text-[var(--walnut-patina)]/65",
                "transition-colors duration-500",
                "hover:text-[var(--obsidian-slate)]",
              ].join(" ")}
            >
              <span>
                View all projects
              </span>

              <span className="relative block h-px w-14 overflow-hidden bg-[var(--walnut-patina)]/18">
                <span className="absolute inset-0 -translate-x-full bg-[var(--brand-gold)] transition-transform duration-700 group-hover:translate-x-0" />
              </span>

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================
          PROJECTS
      ====================================== */}

      <div className="relative z-10 mt-[clamp(85px,10vw,140px)]">
        {featuredProjects.map((project, index) => {
          const reverse = index % 2 !== 0;

          return (
            <article
              key={project.id}
              className={[
                "featured-project",
                "relative",
                index > 0
                  ? "mt-[clamp(110px,12vw,170px)]"
                  : "",
              ].join(" ")}
            >
              <div className="site-container">
                <div
                  className={[
                    "grid items-center gap-10",
                    "lg:grid-cols-12",
                    "lg:gap-[clamp(32px,4vw,64px)]",
                  ].join(" ")}
                >
                  {/* =================================
                      IMAGE
                  ================================== */}

                  <div
                    className={[
                      "lg:col-span-7",
                      reverse
                        ? "lg:col-start-6 lg:row-start-1"
                        : "lg:col-start-1",
                    ].join(" ")}
                  >
                    <Link
                      href={project.href}
                      data-cursor="View"
                      className={[
                        "featured-project-image-wrap",
                        "group relative block overflow-hidden",
                      ].join(" ")}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <div className="featured-project-image absolute inset-[-5%]">
                          <Image
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover"
                          />
                        </div>

                        {/* overlay */}

                        <div
                          className={[
                            "absolute inset-0",
                            "bg-[var(--walnut-patina)]/[0.045]",
                            "transition-colors duration-700",
                            "group-hover:bg-[var(--walnut-patina)]/[0.10]",
                          ].join(" ")}
                        />

                        <div
                          className={[
                            "absolute inset-0",
                            "bg-gradient-to-t",
                            "from-[var(--obsidian-slate)]/28",
                            "via-transparent",
                            "to-transparent",
                          ].join(" ")}
                        />

                        {/* META */}

                        <div className="absolute left-6 top-6 flex items-center gap-4 md:left-7 md:top-7">
                          <span className="text-[8px] uppercase tracking-[0.23em] text-[var(--ivory-vein)]/85 md:text-[9px]">
                            {project.category}
                          </span>

                          <span className="h-px w-7 bg-[var(--brand-gold)]/70" />

                          <span className="text-[8px] uppercase tracking-[0.23em] text-[var(--ivory-vein)]/65 md:text-[9px]">
                            {project.location}
                          </span>
                        </div>

                        {/* ARROW */}

                        <span
                          className={[
                            "absolute",
                            "right-6",
                            "bottom-6",
                            "flex h-10 w-10",
                            "items-center justify-center",
                            "rounded-full",
                            "border border-white/25",
                            "text-[var(--ivory-vein)]",
                            "transition-all duration-500",
                            "group-hover:border-[var(--brand-gold)]",
                            "group-hover:bg-[var(--brand-gold)]",
                            "group-hover:text-[var(--obsidian-slate)]",
                            "group-hover:translate-x-1",
                            "group-hover:-translate-y-1",
                            "md:right-7 md:bottom-7",
                          ].join(" ")}
                        >
                          ↗
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* =================================
                      CONTENT
                  ================================== */}

                  <div
                    className={[
                      "featured-project-content",
                      "relative",
                      "lg:col-span-5",
                      reverse
                        ? "lg:col-start-1 lg:row-start-1"
                        : "lg:col-start-8",
                    ].join(" ")}
                  >
                    {/* NUMBER */}

                    <div className="mb-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-[var(--brand-gold)]/65" />

                      <span className="text-[9px] tracking-[0.24em] text-[var(--brand-gold)]">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    {/* TITLE */}

                    <h3
                      className={[
                        "font-heading",
                        "max-w-[620px]",
                        "text-[clamp(44px,5vw,76px)]",
                        "leading-[0.94]",
                        "tracking-[-0.05em]",
                        "text-[var(--obsidian-slate)]",
                      ].join(" ")}
                    >
                      {project.title}
                    </h3>

                    {/* DIVIDER */}

                    <div className="my-7 h-px w-full max-w-[420px] bg-[var(--walnut-patina)]/12" />

                    {/* DESCRIPTION */}

                    <p
                      className={[
                        "max-w-[500px]",
                        "text-[14px]",
                        "leading-[1.85]",
                        "text-[var(--walnut-patina)]/65",
                        "md:text-[15px]",
                      ].join(" ")}
                    >
                      {project.description}
                    </p>

                    {/* CTA */}

                    <Link
                      href={project.href}
                      className={[
                        "group",
                        "mt-8",
                        "flex w-fit",
                        "items-center gap-4",
                        "text-[9px]",
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

                      <span className="relative h-px w-10 overflow-hidden bg-[var(--walnut-patina)]/18">
                        <span className="absolute inset-0 -translate-x-full bg-[var(--brand-gold)] transition-transform duration-700 group-hover:translate-x-0" />
                      </span>

                      <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* =====================================
          BACKGROUND PROJECT MARK
      ====================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute",
          "right-[-4vw]",
          "top-[14%]",
          "select-none",
          "font-heading",
          "text-[clamp(180px,24vw,420px)]",
          "leading-none",
          "text-[var(--walnut-patina)]/[0.02]",
        ].join(" ")}
      >
        01
      </div>
    </section>
  );
}