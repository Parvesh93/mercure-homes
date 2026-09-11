"use client";

import Link from "next/link";
import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

const scenes = [
  {
    id: "entrance",
    number: "01",
    name: "Entrance",
    video: "/videos/home/walkthrough/scene-01.mp4",
    poster: "/images/home/hero.jpg",
    hotspot: {
      x: 68,
      y: 48,
    },
  },
  {
    id: "living",
    number: "02",
    name: "Living",
    video: "/videos/home/walkthrough/scene-02.mp4",
    poster: "/images/home/hero-2.jpg",
    hotspot: {
      x: 63,
      y: 53,
    },
  },
  {
    id: "detail",
    number: "03",
    name: "Details",
    video: "/videos/home/walkthrough/scene-03.mp4",
    poster: "/images/home/hero-2.jpg",
    hotspot: {
      x: 58,
      y: 44,
    },
  },
];

export default function HeroVirtual() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const [activeScene, setActiveScene] = useState(0);
  const [exploreMode, setExploreMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const currentScene = scenes[activeScene];

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;

    if (!section || !media) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, {
        opacity: 1,
        visibility: "visible",
      });

      if (reduceMotion) return;

      gsap.fromTo(
        media,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-v-eyebrow",
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-v-title",
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay: 0.45,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".hero-v-copy",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.7,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-v-actions",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.85,
          ease: "power3.out",
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const changeScene = (direction: number) => {
    if (transitioning) return;

    const media = mediaRef.current;
    const overlay = transitionRef.current;

    if (!media || !overlay) return;

    const nextIndex =
      (activeScene + direction + scenes.length) %
      scenes.length;

    const { gsap } = getGSAP();

    setTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setTransitioning(false);
      },
    });

    tl.to(media, {
      scale: 1.12,
      duration: 0.45,
      ease: "power3.in",
    });

    tl.to(
      overlay,
      {
        opacity: 1,
        duration: 0.35,
        ease: "power2.inOut",
      },
      0.15
    );

    tl.add(() => {
      setActiveScene(nextIndex);
    });

    tl.set(media, {
      scale: 1.06,
    });

    tl.to(overlay, {
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
    });

    tl.to(
      media,
      {
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );
  };

  const enterExplore = () => {
    const { gsap } = getGSAP();

    setExploreMode(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 15,
      pointerEvents: "none",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const exitExplore = () => {
    const { gsap } = getGSAP();

    setExploreMode(false);

    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      duration: 0.55,
      ease: "power3.out",
    });
  };

  const handleMouseMove = (
    event: ReactMouseEvent<HTMLElement>
  ) => {
    if (
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const media = mediaRef.current;
    const section = sectionRef.current;

    if (!media || !section) return;

    const rect = section.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    const { gsap } = getGSAP();

    gsap.to(media, {
      xPercent: x * -0.8,
      yPercent: y * -0.45,
      duration: 1.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] overflow-hidden bg-[var(--obsidian-slate)] text-[var(--ivory-vein)]"
    >
      {/* MEDIA */}

      <div
        ref={mediaRef}
        className="absolute inset-[-3%] will-change-transform"
      >
        <video
          key={currentScene.id}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={currentScene.poster}
          className="h-full w-full object-cover"
        >
          <source
            src={currentScene.video}
            type="video/mp4"
          />
        </video>
      </div>

      {/* OVERLAYS */}

      <div className="pointer-events-none absolute inset-0 bg-[var(--walnut-patina)]/12" />

      <div
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-r",
          "from-[var(--obsidian-slate)]/78",
          "via-[var(--obsidian-slate)]/28",
          "to-transparent",
          "transition-opacity duration-500",
          exploreMode
            ? "opacity-30"
            : "opacity-100",
        ].join(" ")}
      />

      <div
        className={[
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/68",
          "via-transparent",
          "to-[var(--obsidian-slate)]/20",
        ].join(" ")}
      />

      {/* SCENE TRANSITION */}

      <div
        ref={transitionRef}
        className="pointer-events-none absolute inset-0 z-40 bg-[var(--obsidian-slate)] opacity-0"
      />

      {/* DEFAULT HERO CONTENT */}

      <div
        ref={contentRef}
        className={[
          "site-container relative z-20",
          "flex min-h-[100svh] items-end",
          "pb-[10vh] pt-32",
        ].join(" ")}
      >
        <div className="max-w-[1080px]">
          <p className="hero-v-eyebrow mb-7 text-[10px] uppercase tracking-[0.3em] text-[var(--brand-gold)] md:text-[11px]">
            Luxury Interior Atelier · Bengaluru
          </p>

          <h1
            className={[
              "hero-v-title",
              "max-w-[1000px]",
              "text-[clamp(50px,6.7vw,108px)]",
              "leading-[0.93]",
              "tracking-[-0.05em]",
            ].join(" ")}
          >
            <span className="font-heading">
              Crafting Your Story,
            </span>

            <br />

            <span className="font-editorial">
              One Statement at a Time.
            </span>
          </h1>

          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="hero-v-copy max-w-[650px] text-[14px] font-light leading-[1.85] text-white/72 md:text-[16px]">
              A luxury interior atelier in Bengaluru, where
              Italian design sensibility meets Indian
              craftsmanship, carried forward by the SDP
              Group&apos;s fifty-year legacy in stone and
              precision manufacturing.
            </p>

            <div className="hero-v-actions flex flex-wrap items-center gap-7">
              <button
                type="button"
                onClick={enterExplore}
                className={[
                  "group",
                  "flex items-center gap-4",
                  "text-[9px] uppercase tracking-[0.22em]",
                ].join(" ")}
              >
                <span>
                  Explore Space
                </span>

                <span
                  className={[
                    "flex h-11 w-11 items-center justify-center",
                    "rounded-full",
                    "border border-[var(--brand-gold)]/60",
                    "text-[var(--brand-gold)]",
                    "transition-all duration-400",
                    "group-hover:bg-[var(--brand-gold)]",
                    "group-hover:text-[var(--obsidian-slate)]",
                  ].join(" ")}
                >
                  ↗
                </span>
              </button>

              <Link
                href="/collections"
                className="text-[9px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
              >
                Explore Our World
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MODE */}

      <div
        className={[
          "absolute inset-0 z-30",
          "transition-opacity duration-500",
          exploreMode
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* scene label */}

        <div className="absolute left-[var(--page-padding)] top-[130px]">
          <p className="text-[8px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
            {currentScene.number}
          </p>

          <h2 className="font-heading mt-2 text-[clamp(24px,3vw,38px)] tracking-[-0.035em] text-white">
            {currentScene.name}
          </h2>
        </div>

        {/* hotspot */}

        <button
          type="button"
          onClick={() =>
            changeScene(1)
          }
          className={[
            "group absolute",
            "-translate-x-1/2",
            "-translate-y-1/2",
          ].join(" ")}
          style={{
            left: `${currentScene.hotspot.x}%`,
            top: `${currentScene.hotspot.y}%`,
          }}
          aria-label="Explore next space"
        >
          <span
            className={[
              "relative flex",
              "h-[56px] w-[56px]",
              "items-center justify-center",
              "rounded-full",
              "border border-white/40",
              "bg-black/15",
              "backdrop-blur-sm",
              "transition-all duration-400",
              "group-hover:scale-110",
              "group-hover:border-[var(--brand-gold)]",
            ].join(" ")}
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--brand-gold)]" />

            <span className="absolute inset-[-8px] rounded-full border border-white/15 animate-[ping_2.5s_ease-in-out_infinite]" />
          </span>
        </button>

        {/* bottom navigation */}

        <div
          className={[
            "absolute bottom-7",
            "left-[var(--page-padding)]",
            "right-[var(--page-padding)]",
            "flex items-center justify-between",
          ].join(" ")}
        >
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() =>
                changeScene(-1)
              }
              className={[
                "flex h-10 w-10",
                "items-center justify-center",
                "rounded-full",
                "border border-white/20",
                "text-white/65",
                "transition-colors",
                "hover:border-[var(--brand-gold)]",
                "hover:text-white",
              ].join(" ")}
            >
              ←
            </button>

            <div className="min-w-[90px] text-center">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">
                {currentScene.number} / {String(scenes.length).padStart(2, "0")}
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                changeScene(1)
              }
              className={[
                "flex h-10 w-10",
                "items-center justify-center",
                "rounded-full",
                "border border-white/20",
                "text-white/65",
                "transition-colors",
                "hover:border-[var(--brand-gold)]",
                "hover:text-white",
              ].join(" ")}
            >
              →
            </button>
          </div>

          <button
            type="button"
            onClick={exitExplore}
            className="text-[8px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white"
          >
            Exit
          </button>
        </div>
      </div>
    </section>
  );
}