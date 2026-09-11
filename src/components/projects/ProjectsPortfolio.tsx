"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   HELLO BALI
========================================================= */

const helloBali = {
  id: "hello-bali",
  title: "Hello Bali",
  location: "Tamil Nadu",
  sqft: "20,000 sq ft",
  scope: "Turnkey",
  image: "/images/projects/hello-bali.jpg",
  description:
    "A Bali-inspired sanctuary built around openness, warm natural textures and contemporary European sensibilities. Private pools, outdoor kitchens, landscaped gardens and social spaces bring nature and luxury together at scale.",
};

/* =========================================================
   OTHER PROJECTS
========================================================= */

const projects = [
  {
    id: "shriyaamvita",
    title: "Shriyaamvita",
    location: "Kanakapura",
    sqft: "50,000 sq ft",
    scope: "Modular · Loose Furniture · Lighting",
    image: "/images/projects/shriyaamvita.jpg",
    href: "/projects/shriyaamvita",
    description:
      "A quiet dialogue between Kerala’s timeless sensibility and contemporary Bangalore, this residence is shaped by warmth, restraint, and an affinity with nature. Every layer — from furniture and lighting to finishes and textiles — was considered as part of a singular design language.",
  },
  {
    id: "grand-pavilion",
    title: "The Grand Pavilion",
    location: "Chandapura",
    sqft: "40,000 sq ft",
    scope: "Turnkey",
    image: "/images/projects/grand-pavilion.jpg",
    href: "/projects/grand-pavilion",
    description:
      "A study in warm contemporary living, where every room is treated as its own considered chapter rather than a repeated formula. Travertine, marble, walnut-toned wood and soft leathers create a tactile interior built on restraint rather than ornament.",
  },
  {
    id: "model-flat-marketing",
    title: "Model Flat & Marketing Offices",
    location: "Bengaluru",
    sqft: "Varies by unit",
    scope: "Turnkey · Furniture · Styling",
    image: "/images/projects/model-flat.jpg",
    href: "/projects/model-flat-marketing-offices",
    description:
      "Show spaces crafted for builders, modular apartment units and corporate marketing offices, styled to sell a lifestyle to prospective buyers.",
  },
  {
    id: "mercure-studio",
    title: "The Mercure Studio",
    location: "Bengaluru",
    sqft: "18,000 sq ft",
    scope: "Experience Centre",
    image: "/images/projects/mercure-studio.jpg",
    href: "/projects/mercure-studio",
    description:
      "Our own Bengaluru atelier and Experience Centre — the one project we are never finished refining.",
  },
];

/* =========================================================
   HELLO BALI INTERACTIVE VIEWER
========================================================= */

function HelloBaliExplorer({
  onEnquire,
}: {
  onEnquire: () => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  const draggingRef = useRef(false);

  const pointerStartRef = useRef({
    x: 0,
    y: 0,
  });

  const panStartRef = useRef({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] =
    useState(false);

  const [zoom, setZoom] =
    useState(1);

  const [pan, setPan] =
    useState({
      x: 0,
      y: 0,
    });

  const [tilt, setTilt] =
    useState({
      x: 0,
      y: 0,
    });

  /* =======================================================
     RESET
  ======================================================= */

  const resetViewer = () => {
    draggingRef.current = false;

    setIsDragging(false);

    setZoom(1);

    setPan({
      x: 0,
      y: 0,
    });

    setTilt({
      x: 0,
      y: 0,
    });
  };

  /* =======================================================
     POINTER MOVE
  ======================================================= */

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const stage =
      stageRef.current;

    if (!stage) return;

    /* ---------------------------------------
       DRAG / PAN
    --------------------------------------- */

    if (
      draggingRef.current &&
      zoom > 1
    ) {
      const dx =
        event.clientX -
        pointerStartRef.current.x;

      const dy =
        event.clientY -
        pointerStartRef.current.y;

      const limit =
        110 * (zoom - 1);

      setPan({
        x: Math.max(
          -limit,
          Math.min(
            limit,
            panStartRef.current.x +
              dx
          )
        ),

        y: Math.max(
          -limit,
          Math.min(
            limit,
            panStartRef.current.y +
              dy
          )
        ),
      });

      return;
    }

    /* ---------------------------------------
       DESKTOP 3D TILT
    --------------------------------------- */

    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {
      return;
    }

    const rect =
      stage.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left) /
      rect.width;

    const y =
      (event.clientY -
        rect.top) /
      rect.height;

    setTilt({
      x:
        (0.5 - y) *
        4.5,

      y:
        (x - 0.5) *
        5.5,
    });
  };

  /* =======================================================
     POINTER DOWN
  ======================================================= */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (zoom <= 1) return;

    draggingRef.current =
      true;

    setIsDragging(true);

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    panStartRef.current =
      pan;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  /* =======================================================
     POINTER UP
  ======================================================= */

  const handlePointerUp = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    draggingRef.current =
      false;

    setIsDragging(false);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  /* =======================================================
     POINTER LEAVE
  ======================================================= */

  const handlePointerLeave = () => {
    if (
      !draggingRef.current
    ) {
      setTilt({
        x: 0,
        y: 0,
      });
    }
  };

  /* =======================================================
     ZOOM
  ======================================================= */

  const increaseZoom = () => {
    setZoom((current) =>
      Math.min(
        2.2,
        current + 0.25
      )
    );
  };

  const decreaseZoom = () => {
    setZoom((current) => {
      const next =
        Math.max(
          1,
          current - 0.25
        );

      if (next === 1) {
        setPan({
          x: 0,
          y: 0,
        });
      }

      return next;
    });
  };

  return (
    <article className="hello-bali-feature">
      {/* =====================================
          TOP INFO
      ====================================== */}

      <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              01 · Featured Project
            </p>
          </div>

          <h2
            className={[
              "font-heading",
              "mt-5",
              "text-[clamp(44px,6vw,88px)]",
              "leading-[0.92]",
              "tracking-[-0.055em]",
            ].join(" ")}
          >
            Hello Bali
          </h2>
        </div>

        <div className="flex items-end gap-8">
          <div>
            <p className="font-heading text-[clamp(26px,3vw,42px)] leading-none tracking-[-0.04em]">
              20,000 sq ft
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              Project Scale
            </p>
          </div>

          <div className="hidden md:block">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
              Tamil Nadu
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
              Turnkey
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          INTERACTIVE VIEWER
      ====================================== */}

      <div
        ref={stageRef}
        data-cursor={
          zoom > 1
            ? "Drag"
            : "Explore"
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerDown={
          handlePointerDown
        }
        onPointerUp={
          handlePointerUp
        }
        onPointerCancel={
          handlePointerUp
        }
        onPointerLeave={
          handlePointerLeave
        }
        className={[
          "relative",
          "overflow-hidden",
          "bg-[var(--obsidian-slate)]",
          "aspect-[16/9]",
          "min-h-[420px]",
          "select-none",

          zoom > 1
            ? "cursor-grab active:cursor-grabbing"
            : "",
        ].join(" ")}
        style={{
          perspective:
            "1400px",

          touchAction:
            zoom > 1
              ? "none"
              : "pan-y",
        }}
      >
        {/* =================================
            RENDER
        ================================== */}

        <div
          className={[
            "absolute inset-[-3%]",
            "will-change-transform",
            "transition-transform",

            isDragging
              ? "duration-0"
              : "duration-500",

            "ease-[cubic-bezier(0.22,1,0.36,1)]",
          ].join(" ")}
          style={{
            transform: `
              translate3d(
                ${pan.x}px,
                ${pan.y}px,
                0
              )
              rotateX(${tilt.x}deg)
              rotateY(${tilt.y}deg)
              scale(${zoom})
            `,
          }}
        >
          <Image
            src={
              helloBali.image
            }
            alt="Hello Bali interactive architectural render"
            fill
            priority
            draggable={false}
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
        </div>

        {/* overlays */}

        <div className="pointer-events-none absolute inset-0 bg-[var(--walnut-patina)]/[0.025]" />

        <div
          className={[
            "pointer-events-none",
            "absolute inset-0",
            "bg-gradient-to-t",
            "from-[var(--obsidian-slate)]/40",
            "via-transparent",
            "to-[var(--obsidian-slate)]/10",
          ].join(" ")}
        />

        {/* =================================
            VIEWER LABEL
        ================================== */}

        <div className="pointer-events-none absolute left-6 top-6 md:left-8 md:top-8">
          <p className="text-[8px] uppercase tracking-[0.22em] text-[var(--ivory-vein)]/70">
            Interactive Render
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

            <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--ivory-vein)]/50">
              Move · Zoom · Explore
            </span>
          </div>
        </div>

        {/* =================================
            CONTROLS
        ================================== */}

        <div
          className={[
            "absolute",
            "right-5 top-5",
            "flex",
            "overflow-hidden",
            "border",
            "border-white/20",
            "bg-[var(--obsidian-slate)]/55",
            "backdrop-blur-md",
            "md:right-7",
            "md:top-7",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={
              decreaseZoom
            }
            disabled={zoom <= 1}
            className={[
              "flex h-11 w-11",
              "items-center justify-center",
              "border-r border-white/15",
              "text-[18px]",
              "text-white",
              "transition-colors",
              "hover:bg-white/10",
              "disabled:opacity-30",
            ].join(" ")}
            aria-label="Zoom out"
          >
            −
          </button>

          <div className="flex h-11 min-w-[58px] items-center justify-center text-[8px] tracking-[0.15em] text-white/70">
            {Math.round(
              zoom * 100
            )}
            %
          </div>

          <button
            type="button"
            onClick={
              increaseZoom
            }
            disabled={
              zoom >= 2.2
            }
            className={[
              "flex h-11 w-11",
              "items-center justify-center",
              "border-l border-white/15",
              "text-[18px]",
              "text-white",
              "transition-colors",
              "hover:bg-white/10",
              "disabled:opacity-30",
            ].join(" ")}
            aria-label="Zoom in"
          >
            +
          </button>

          <button
            type="button"
            onClick={resetViewer}
            className={[
              "flex h-11",
              "items-center",
              "border-l border-white/15",
              "px-4",
              "text-[8px]",
              "uppercase",
              "tracking-[0.18em]",
              "text-white/65",
              "transition-colors",
              "hover:bg-white/10",
              "hover:text-white",
            ].join(" ")}
          >
            Reset
          </button>
        </div>

        {/* =================================
            HELP
        ================================== */}

        <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
          <p className="max-w-[340px] text-[9px] uppercase leading-[1.7] tracking-[0.18em] text-white/60">
            {zoom > 1
              ? "Drag to inspect the render"
              : "Move your cursor across the render"}
          </p>

          <span className="hidden text-[8px] uppercase tracking-[0.2em] text-white/40 md:block">
            Hello Bali · 01
          </span>
        </div>
      </div>

      {/* =====================================
          DESCRIPTION
      ====================================== */}

      <div
        className={[
          "mt-8",
          "grid gap-8",
          "lg:grid-cols-[0.72fr_1.28fr]",
          "lg:gap-[clamp(60px,7vw,110px)]",
        ].join(" ")}
      >
        <div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
            Hello Bali
          </p>

          <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/42">
            Tamil Nadu · Turnkey
          </p>
        </div>

        <div>
          <p className="max-w-[760px] text-[15px] leading-[1.9] text-[var(--walnut-patina)]/65">
            {
              helloBali.description
            }
          </p>

          <button
            type="button"
            onClick={onEnquire}
            className={[
              "group mt-8",
              "flex items-center gap-5",
              "text-[9px]",
              "uppercase",
              "tracking-[0.22em]",
              "text-[var(--walnut-patina)]/65",
            ].join(" ")}
          >
            <span>
              Enquire about Hello Bali
            </span>

            <span className="relative block h-px w-12 overflow-hidden bg-[var(--walnut-patina)]/18">
              <span className="absolute inset-0 -translate-x-full bg-[var(--brand-gold)] transition-transform duration-700 group-hover:translate-x-0" />
            </span>

            <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   REGULAR PROJECT CARD
========================================================= */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link
      href={project.href}
      className="project-card group block"
    >
      <div
        data-cursor="View"
        className={[
          "relative",
          "aspect-[16/11]",
          "overflow-hidden",
          "bg-[var(--alabaster-mist)]",
        ].join(" ")}
      >
        <Image
          src={project.image}
          alt={`${project.title}, ${project.location}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={[
            "object-cover",
            "transition-transform",
            "duration-[1100ms]",
            "ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:scale-[1.035]",
          ].join(" ")}
        />

        <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.035]" />

        <div
          className={[
            "absolute inset-0",
            "bg-gradient-to-t",
            "from-[var(--obsidian-slate)]/55",
            "via-transparent",
            "to-[var(--obsidian-slate)]/5",
          ].join(" ")}
        />

        <span className="absolute left-6 top-6 text-[9px] tracking-[0.22em] text-[var(--brand-gold)]">
          {String(
            index + 2
          ).padStart(
            2,
            "0"
          )}
        </span>

        <span className="absolute right-6 top-6 text-[8px] uppercase tracking-[0.22em] text-white/65">
          {project.location}
        </span>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
            {project.scope}
          </p>

          <h3
            className={[
              "font-heading",
              "mt-3",
              "text-[clamp(27px,3vw,42px)]",
              "leading-none",
              "tracking-[-0.04em]",
              "text-[var(--ivory-vein)]",
            ].join(" ")}
          >
            {project.title}
          </h3>

          <span className="mt-5 block h-px w-8 bg-[var(--brand-gold)] transition-all duration-700 group-hover:w-16" />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="font-heading text-[clamp(24px,2.2vw,34px)] leading-none tracking-[-0.04em]">
              {project.sqft}
            </p>

            <p className="mt-2 text-[8px] uppercase tracking-[0.2em] text-[var(--brand-gold)]">
              Project Scale
            </p>
          </div>

          <span className="mt-1 text-[13px] text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>

        <p className="mt-5 max-w-[620px] text-[13px] leading-[1.8] text-[var(--walnut-patina)]/60">
          {project.description}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   HELLO BALI MODAL
========================================================= */

function HelloBaliModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        onClose();
      }
    };

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[100]",
        "flex items-center justify-center",
        "bg-[var(--obsidian-slate)]/80",
        "px-5 py-8",
        "backdrop-blur-md",
      ].join(" ")}
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className={[
          "relative",
          "w-full",
          "max-w-[760px]",
          "bg-[var(--ivory-vein)]",
          "p-7 md:p-10",
          "text-[var(--obsidian-slate)]",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          className={[
            "absolute",
            "right-5 top-5",
            "flex h-10 w-10",
            "items-center justify-center",
            "border",
            "border-[var(--walnut-patina)]/18",
            "text-[20px]",
            "text-[var(--walnut-patina)]/55",
          ].join(" ")}
          aria-label="Close enquiry"
        >
          ×
        </button>

        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            Hello Bali
          </p>
        </div>

        <h2
          className={[
            "font-editorial",
            "mt-8",
            "max-w-[620px]",
            "text-[clamp(38px,5vw,62px)]",
            "leading-none",
            "tracking-[-0.035em]",
          ].join(" ")}
        >
          Enquire about Hello Bali
        </h2>

        <form
          className="mt-10 grid gap-7 md:grid-cols-2"
          onSubmit={(
            event
          ) => {
            event.preventDefault();
          }}
        >
          <div>
            <label
              htmlFor="helloBaliName"
              className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
            >
              Full Name
            </label>

            <input
              id="helloBaliName"
              type="text"
              required
              className="mt-3 w-full border-0 border-b border-[var(--walnut-patina)]/18 bg-transparent px-0 py-3 outline-none focus:border-[var(--brand-gold)]"
            />
          </div>

          <div>
            <label
              htmlFor="helloBaliPhone"
              className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
            >
              Phone
            </label>

            <input
              id="helloBaliPhone"
              type="tel"
              required
              className="mt-3 w-full border-0 border-b border-[var(--walnut-patina)]/18 bg-transparent px-0 py-3 outline-none focus:border-[var(--brand-gold)]"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="helloBaliEmail"
              className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
            >
              Email
            </label>

            <input
              id="helloBaliEmail"
              type="email"
              className="mt-3 w-full border-0 border-b border-[var(--walnut-patina)]/18 bg-transparent px-0 py-3 outline-none focus:border-[var(--brand-gold)]"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="helloBaliMessage"
              className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/48"
            >
              Message
            </label>

            <textarea
              id="helloBaliMessage"
              rows={3}
              className="mt-3 w-full resize-none border-0 border-b border-[var(--walnut-patina)]/18 bg-transparent px-0 py-3 outline-none focus:border-[var(--brand-gold)]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="group flex items-center gap-5 text-[9px] uppercase tracking-[0.22em]"
            >
              <span>
                Submit enquiry
              </span>

              <span className="relative h-px w-12 overflow-hidden bg-[var(--walnut-patina)]/18">
                <span className="absolute inset-0 -translate-x-full bg-[var(--brand-gold)] transition-transform duration-700 group-hover:translate-x-0" />
              </span>

              <span className="text-[var(--brand-gold)]">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   PROJECTS PORTFOLIO
========================================================= */

export default function ProjectsPortfolio() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [
    helloBaliOpen,
    setHelloBaliOpen,
  ] = useState(false);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reduceMotion) return;

    const { gsap } =
      getGSAP();

    const ctx =
      gsap.context(() => {
        /* intro */

        gsap.fromTo(
          ".projects-grid-intro",
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
              trigger:
                section,
              start:
                "top 82%",
              once: true,
            },
          }
        );

        /* hello bali */

        gsap.fromTo(
          ".hello-bali-feature",
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
              trigger:
                ".hello-bali-feature",
              start:
                "top 86%",
              once: true,
            },
          }
        );

        /* regular cards */

        gsap.fromTo(
          ".project-card",
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.85,
            ease: "power3.out",

            scrollTrigger: {
              trigger:
                ".projects-grid",
              start:
                "top 88%",
              once: true,
            },
          }
        );
      }, section);

    return () =>
      ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        data-header-theme="light"
        className={[
          "relative",
          "overflow-hidden",
          "bg-[var(--ivory-vein)]",
          "py-[clamp(110px,12vw,180px)]",
          "text-[var(--obsidian-slate)]",
        ].join(" ")}
      >
        <div className="site-container">
          {/* =================================
              INTRO
          ================================== */}

          <div className="projects-grid-intro flex items-end justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Selected Projects
              </p>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40 md:block">
              Portfolio · Bengaluru & Beyond
            </span>
          </div>

          {/* =================================
              HELLO BALI
          ================================== */}

          <div className="mt-[clamp(55px,6vw,85px)]">
            <HelloBaliExplorer
              onEnquire={() =>
                setHelloBaliOpen(
                  true
                )
              }
            />
          </div>

          {/* =================================
              OTHER PROJECTS
          ================================== */}

          <div className="mt-[clamp(110px,12vw,180px)]">
            <div className="mb-[clamp(45px,5vw,70px)] flex items-center justify-between border-b border-[var(--walnut-patina)]/12 pb-5">
              <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                More Projects
              </p>

              <span className="text-[8px] uppercase tracking-[0.2em] text-[var(--walnut-patina)]/38">
                02 — 05
              </span>
            </div>

            <div
              className={[
                "projects-grid",
                "grid",
                "gap-x-7",
                "gap-y-[clamp(75px,8vw,115px)]",
                "lg:grid-cols-2",
              ].join(" ")}
            >
              {projects.map(
                (
                  project,
                  index
                ) => (
                  <ProjectCard
                    key={
                      project.id
                    }
                    project={
                      project
                    }
                    index={
                      index
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <HelloBaliModal
        open={
          helloBaliOpen
        }
        onClose={() =>
          setHelloBaliOpen(
            false
          )
        }
      />
    </>
  );
}