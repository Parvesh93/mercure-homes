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
      gsap.fromTo(
        ".projects-heading",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".project-item").forEach((item) => {
        const image = item.querySelector(".project-image");
        const content = item.querySelector(".project-content");

        gsap.fromTo(
          image,
          {
            clipPath: "inset(12% 0% 12% 0%)",
            scale: 1.08,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              once: true,
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
              trigger: item,
              start: "top 78%",
              once: true,
            },
          }
        );

        gsap.to(image, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--surface-light)] py-[clamp(110px,13vw,210px)]"
    >
      <div className="site-container">
        {/* Heading */}
        <div className="projects-heading mb-20 grid gap-8 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              Selected Projects
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="heading-md max-w-[820px]">
              Spaces shaped
              <br />
              with intention.
            </h2>

            <Link
              href="/projects"
              className="group flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em] text-[var(--text-primary)]"
            >
              <span>View all projects</span>

              <span className="relative block h-px w-12 overflow-hidden bg-black/20">
                <span className="absolute inset-0 -translate-x-full bg-black transition-transform duration-700 group-hover:translate-x-0" />
              </span>
            </Link>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-[clamp(100px,13vw,190px)]">
          {featuredProjects.map((project, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <article
                key={project.id}
                className="project-item"
              >
                <div
                  className={[
                    "grid gap-10 lg:grid-cols-12 lg:gap-12",
                    isReverse ? "lg:[direction:rtl]" : "",
                  ].join(" ")}
                >
                  {/* Image */}
                  <Link
  href={project.href}
  data-cursor="View"
  className={[
    "relative block overflow-hidden",
    "aspect-[4/5] md:aspect-[16/10]",
    "lg:col-span-8",
  ].join(" ")}
>
                    <div className="project-image absolute inset-[-5%]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.025]"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/[0.06]" />

                    <div className="absolute left-6 top-6 md:left-8 md:top-8">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/75">
                        {project.category}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div
                    className={[
                      "project-content flex lg:col-span-4",
                      "lg:[direction:ltr]",
                      isReverse
                        ? "lg:items-end"
                        : "lg:items-end",
                    ].join(" ")}
                  >
                    <div className="w-full lg:pb-8">
                      <div className="mb-7 flex items-center justify-between border-b border-black/15 pb-4">
                        <span className="text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                          {project.id}
                        </span>

                        <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          {project.location}
                        </span>
                      </div>

                      <h3 className="font-heading text-[clamp(34px,4vw,60px)] leading-[0.98] tracking-[-0.045em] text-[var(--text-primary)]">
                        {project.title}
                      </h3>

                      <p className="mt-7 max-w-[430px] text-[14px] leading-[1.8] text-[var(--text-secondary)] md:text-[15px]">
                        {project.description}
                      </p>

                      <Link
                        href={project.href}
                        className="group mt-9 flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em]"
                      >
                        <span>View project</span>

                        <span className="transition-transform duration-500 group-hover:translate-x-1">
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
      </div>
    </section>
  );
}