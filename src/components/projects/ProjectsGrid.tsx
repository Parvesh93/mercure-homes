"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  projects,
  type ProjectCategory,
} from "../../data/projects";

import { getGSAP } from "../../lib/gsap";

type Filter =
  | "All"
  | ProjectCategory;

const filters: Filter[] = [
  "All",
  "Residential",
  "Hospitality",
  "Turnkey",
];

export default function ProjectsGrid() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] =
    useState<Filter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.category === activeFilter
    );
  }, [activeFilter]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".project-two-card")
        .forEach((card) => {
          const imageWrap =
            card.querySelector<HTMLElement>(
              ".project-two-image-wrap"
            );

          const image =
            card.querySelector<HTMLElement>(
              ".project-two-image"
            );

          const content =
            card.querySelector<HTMLElement>(
              ".project-two-content"
            );

          if (imageWrap) {
            gsap.fromTo(
              imageWrap,
              {
                clipPath:
                  "inset(7% 0% 7% 0%)",
              },
              {
                clipPath:
                  "inset(0% 0% 0% 0%)",
                duration: 1.25,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 82%",
                  once: true,
                },
              }
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              {
                scale: 1.08,
                yPercent: -3,
              },
              {
                scale: 1,
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              {
                opacity: 0,
                y: 24,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 74%",
                  once: true,
                },
              }
            );
          }
        });
    }, section);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--surface-light)] pb-[clamp(140px,16vw,240px)]"
    >
      {/* FILTERS */}
      <div className="site-container">
        <div className="border-y border-black/10">
          <div className="flex gap-9 overflow-x-auto py-5 md:gap-14">
            {filters.map((filter) => {
              const active =
                activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={[
                    "relative shrink-0",
                    "text-[10px] uppercase",
                    "tracking-[0.22em]",
                    "transition-colors duration-500",
                    active
                      ? "text-black"
                      : "text-black/30 hover:text-black/60",
                  ].join(" ")}
                >
                  {filter}

                  <span
                    className={[
                      "absolute left-0",
                      "-bottom-[21px]",
                      "h-px w-full",
                      "origin-left bg-black",
                      "transition-transform duration-500",
                      active
                        ? "scale-x-100"
                        : "scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="site-container mt-[clamp(80px,9vw,130px)]">
        <div className="grid gap-x-[clamp(28px,3vw,52px)] gap-y-[clamp(100px,11vw,170px)] lg:grid-cols-2">
          {filteredProjects.map(
            (project, index) => {
              const stagger =
                index % 2 === 1;

              return (
                <article
                  key={project.slug}
                  className={[
                    "project-two-card",
                    stagger
                      ? "lg:mt-[110px]"
                      : "",
                  ].join(" ")}
                >
                  {/* META */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.22em] text-[var(--text-muted)]">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-4">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {project.category}
                      </span>

                      <span className="h-px w-7 bg-black/15" />

                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <Link
                    href={project.href}
                    data-cursor="View"
                    className="project-two-image-wrap group relative block overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="project-two-image absolute inset-[-5%]">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="absolute inset-0 bg-black/[0.035] transition-colors duration-700 group-hover:bg-black/[0.12]" />

                      <span className="absolute right-6 top-6 text-[16px] text-white/75 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </div>
                  </Link>

                  {/* TEXT */}
                  <div className="project-two-content mt-6">
                    <Link
                      href={project.href}
                      className="group block"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div>
                          <h2 className="font-heading text-[clamp(34px,3.6vw,56px)] leading-[0.98] tracking-[-0.045em]">
                            {project.title}
                          </h2>

                          <p className="mt-3 text-[10px] uppercase tracking-[0.19em] text-[var(--text-muted)]">
                            {project.scope ??
                              "Interior Design"}
                          </p>
                        </div>

                        <span className="mt-2 hidden text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] transition-transform duration-500 group-hover:translate-x-1 md:block">
                          View Project
                        </span>
                      </div>
                    </Link>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}