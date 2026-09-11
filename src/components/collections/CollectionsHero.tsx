"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { getGSAP } from "../../lib/gsap";

export default function CollectionsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collections-hero-line",
        {
          yPercent: 110,
        },
        {
          yPercent: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".collections-hero-meta",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );

      gsap.to(image, {
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative min-h-[100svh] overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* =====================================
          BACKGROUND IMAGE
      ====================================== */}

      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
      >
        <Image
          src="/images/home/hero-2.jpg"
          alt="Mercure Homes made-to-order collections"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* =====================================
          BRAND OVERLAYS
      ====================================== */}

      <div className="absolute inset-0 bg-[var(--walnut-patina)]/20" />

      <div
        className={[
          "absolute inset-0",
          "bg-gradient-to-t",
          "from-[var(--obsidian-slate)]/78",
          "via-[var(--obsidian-slate)]/12",
          "to-[var(--obsidian-slate)]/28",
        ].join(" ")}
      />

      {/* subtle warmth */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[18%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.03] blur-[140px]" />
      </div>

      {/* =====================================
          CONTENT
      ====================================== */}

      <div className="site-container relative z-10 flex min-h-[100svh] items-end pb-[10vh] pt-36">
        <div className="w-full">
          {/* META */}

          <div className="collections-hero-meta mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Collections
              </p>
            </div>

            <span className="hidden text-[9px] uppercase tracking-[0.24em] text-[var(--alabaster-mist)]/48 md:block">
              Made to order
            </span>
          </div>

          {/* =================================
              TITLE
          ================================== */}

          <div
            className={[
              "max-w-[1200px]",
              "text-[clamp(54px,8vw,128px)]",
              "leading-[0.9]",
              "tracking-[-0.055em]",
            ].join(" ")}
          >
            <div className="overflow-hidden pb-[0.08em]">
              <div className="collections-hero-line font-heading">
                A mood board of
              </div>
            </div>

            <div className="overflow-hidden pb-[0.1em]">
              <div className="collections-hero-line font-editorial">
                forms, materials
              </div>
            </div>

            <div className="overflow-hidden pb-[0.08em]">
              <div className="collections-hero-line font-heading">
                and details.
              </div>
            </div>
          </div>

          {/* =================================
              SOURCE COPY
          ================================== */}

          <div className="collections-hero-meta mt-10 flex flex-col gap-5 md:max-w-[680px]">
            <p className="text-[15px] font-light leading-[1.85] text-[var(--alabaster-mist)]/70 md:text-[17px]">
              Each piece is made to order, allowing the design
              to evolve around your space.
            </p>

            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[var(--brand-gold)]/65" />

              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/48">
                Take a closer look. If something catches your eye,
                let&apos;s make it yours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import { useEffect, useRef } from "react";

// import { getGSAP } from "../../lib/gsap";

// export default function CollectionsHero() {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;

//     if (!section) return;

//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (reduceMotion) return;

//     const { gsap } = getGSAP();

//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".collections-hero-line",
//         {
//           yPercent: 110,
//         },
//         {
//           yPercent: 0,
//           duration: 1.2,
//           stagger: 0.1,
//           ease: "power4.out",
//         }
//       );

//       gsap.fromTo(
//         ".collections-hero-meta",
//         {
//           opacity: 0,
//           y: 20,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.85,
//           delay: 0.4,
//           ease: "power3.out",
//         }
//       );
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       data-header-theme="light"
//       className={[
//         "relative overflow-hidden",
//         "bg-[var(--ivory-vein)]",
//         "pt-[clamp(175px,16vw,240px)]",
//         "pb-[clamp(95px,10vw,145px)]",
//         "text-[var(--obsidian-slate)]",
//       ].join(" ")}
//     >
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0"
//       >
//         <div className="absolute -left-[8%] top-[12%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[140px]" />
//       </div>

//       <div className="site-container relative z-10">
//         <div className="collections-hero-meta flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <span className="h-px w-8 bg-[var(--brand-gold)]" />

//             <p className="eyebrow !text-[var(--brand-gold)]">
//               Collections
//             </p>
//           </div>

//           <span className="hidden text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/40 md:block">
//             Made in-house · Bengaluru
//           </span>
//         </div>

//         <div className="mt-[clamp(55px,7vw,90px)] max-w-[1150px]">
//           <div className="overflow-hidden pb-[0.08em]">
//             <div
//               className={[
//                 "collections-hero-line",
//                 "font-heading",
//                 "text-[clamp(54px,7vw,108px)]",
//                 "leading-[0.94]",
//                 "tracking-[-0.05em]",
//               ].join(" ")}
//             >
//               A mood board of forms,
//             </div>
//           </div>

//           <div className="overflow-hidden pb-[0.1em]">
//             <div
//               className={[
//                 "collections-hero-line",
//                 "font-editorial",
//                 "text-[clamp(54px,7vw,108px)]",
//                 "leading-[0.94]",
//                 "tracking-[-0.04em]",
//               ].join(" ")}
//             >
//               materials and details.
//             </div>
//           </div>
//         </div>

//         <div className="collections-hero-meta mt-[clamp(40px,5vw,65px)] grid gap-8 lg:grid-cols-[0.72fr_2.28fr]">
//           <div />

//           <div className="max-w-[760px]">
//             <p className="text-[16px] leading-[1.9] text-[var(--walnut-patina)]/68">
//               Each piece is made to order, allowing the design
//               to evolve around your space.
//             </p>

//             <p className="mt-5 text-[15px] leading-[1.9] text-[var(--walnut-patina)]/56">
//               Take a closer look. If something catches your eye,
//               let&apos;s make it yours.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }