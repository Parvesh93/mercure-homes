// "use client";

// import { useEffect, useRef } from "react";
// import { getGSAP } from "../../lib/gsap";

// export default function BrandIdentityMotion() {
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
//       const tl = gsap.timeline({
//         repeat: -1,
//         repeatDelay: 0.4,
//       });

//       /*
//        * Initial state
//        */
//       gsap.set(".identity-letter", {
//         yPercent: 115,
//         opacity: 0,
//       });

//       gsap.set(".identity-panel", {
//         scaleY: 0,
//         transformOrigin: "bottom",
//       });

//       gsap.set(".identity-line", {
//         scaleY: 0,
//         transformOrigin: "top",
//       });

//       /*
//        * 1. Architectural lines appear
//        */
//       tl.to(".identity-line", {
//         scaleY: 1,
//         duration: 1.2,
//         stagger: 0.08,
//         ease: "power3.inOut",
//       });

//       /*
//        * 2. Letters rise individually
//        */
//       tl.to(
//         ".identity-letter",
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 1.15,
//           stagger: 0.055,
//           ease: "power4.out",
//         },
//         "-=0.65"
//       );

//       /*
//        * Hold completed name
//        */
//       tl.to({}, { duration: 1.7 });

//       /*
//        * 3. Panels rise across typography
//        */
//       tl.to(".identity-panel", {
//         scaleY: 1,
//         duration: 1.15,
//         stagger: {
//           each: 0.08,
//           from: "random",
//         },
//         ease: "power3.inOut",
//       });

//       /*
//        * Hide letters while panels cover them
//        */
//       tl.to(
//         ".identity-letter",
//         {
//           opacity: 0,
//           duration: 0.35,
//         },
//         "-=0.65"
//       );

//       /*
//        * 4. Panels slide upward and disappear
//        */
//       tl.to(".identity-panel", {
//         yPercent: -110,
//         duration: 1.2,
//         stagger: 0.07,
//         ease: "power3.inOut",
//       });

//       /*
//        * Lines disappear
//        */
//       tl.to(
//         ".identity-line",
//         {
//           scaleY: 0,
//           transformOrigin: "bottom",
//           duration: 0.8,
//           stagger: 0.04,
//           ease: "power3.inOut",
//         },
//         "-=0.7"
//       );

//       /*
//        * Reset panels invisibly
//        */
//       tl.set(".identity-panel", {
//         scaleY: 0,
//         yPercent: 0,
//       });

//       tl.set(".identity-letter", {
//         yPercent: 115,
//         opacity: 0,
//       });

//       tl.to({}, { duration: 0.8 });
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   const text = "MERCURE HOMES";

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-[#171715] text-white"
//     >
//       <div className="site-container flex min-h-[72vh] items-center py-[100px]">
//         <div className="relative w-full">
//           {/* Small label */}
//           <div className="mb-14 flex items-center justify-between">
//             <p className="eyebrow text-white/35">
//               Mercure Homes
//             </p>

//             <p className="hidden text-[9px] uppercase tracking-[0.25em] text-white/25 md:block">
//               Bengaluru · India
//             </p>
//           </div>

//           {/* Main typography */}
//           <div className="relative">
//             <div className="relative z-10 flex items-center justify-center overflow-hidden">
//               <h2
//                 aria-label="Mercure Homes"
//                 className="flex whitespace-nowrap font-heading text-[clamp(52px,9vw,160px)] font-normal leading-none tracking-[-0.065em]"
//               >
//                 {text.split("").map((letter, index) => (
//                   <span
//                     key={`${letter}-${index}`}
//                     className="identity-letter inline-block"
//                   >
//                     {letter === " " ? "\u00A0" : letter}
//                   </span>
//                 ))}
//               </h2>
//             </div>

//             {/* Architectural lines */}
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-0 grid grid-cols-8"
//             >
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="relative"
//                 >
//                   <span className="identity-line absolute right-0 top-0 h-full w-px bg-white/10" />
//                 </div>
//               ))}
//             </div>

//             {/* Moving panels */}
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-20 grid grid-cols-8"
//             >
//               {Array.from({ length: 8 }).map((_, index) => (
//                 <div
//                   key={index}
//                   className="identity-panel bg-[#e9e4da]"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Bottom line */}
//           <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6">
//             <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
//               Italian sensibility
//             </p>

//             <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
//               Indian craftsmanship
//             </p>

//             <p className="hidden text-[9px] uppercase tracking-[0.25em] text-white/30 md:block">
//               Made personal
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef } from "react";
import { getGSAP } from "../../lib/gsap";

export default function BrandIdentityMotion() {
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
      gsap.set(".identity-letter", {
        yPercent: 120,
        opacity: 0,
      });

      gsap.set(".identity-panel", {
        scaleY: 0,
        yPercent: 0,
        transformOrigin: "bottom",
      });

      gsap.set(".identity-line", {
        scaleY: 0.15,
        opacity: 0.2,
        transformOrigin: "center",
      });

      gsap.set(".identity-monogram", {
        opacity: 0.045,
        scale: 0.92,
      });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      });

      tl.to(".identity-line", {
        scaleY: 1,
        opacity: 1,
        duration: 1.25,

        stagger: {
          each: 0.07,
          from: "center",
        },

        ease: "power3.inOut",
      });

      tl.to(
        ".identity-monogram",
        {
          opacity: 0.08,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1"
      );

      tl.to(
        ".identity-letter",
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,

          stagger: {
            each: 0.055,
            from: "center",
          },

          ease: "power4.out",
        },
        "-=0.7"
      );

      tl.to({}, { duration: 1.8 });

      tl.to(".identity-panel", {
        scaleY: 1,
        duration: 1.1,

        stagger: {
          each: 0.065,
          from: "edges",
        },

        ease: "power3.inOut",
      });

      tl.to(
        ".identity-letter",
        {
          opacity: 0,
          yPercent: -25,
          duration: 0.5,
          stagger: 0.018,
          ease: "power2.in",
        },
        "-=0.7"
      );

      tl.to(
        ".identity-monogram",
        {
          opacity: 0.12,
          scale: 1.035,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.6"
      );

      tl.to(".identity-panel", {
        yPercent: -110,
        duration: 1.25,

        stagger: {
          each: 0.06,
          from: "start",
        },

        ease: "power3.inOut",
      });

      tl.to({}, { duration: 1.4 });

      tl.to(".identity-line", {
        scaleY: 0.28,
        opacity: 0.25,
        duration: 1,

        stagger: {
          each: 0.04,
          from: "center",
        },

        ease: "power3.inOut",
      });

      tl.to(
        ".identity-monogram",
        {
          opacity: 0.045,
          scale: 0.92,
          duration: 1,
          ease: "power3.inOut",
        },
        "<"
      );

      tl.set(".identity-panel", {
        scaleY: 0,
        yPercent: 0,
      });

      tl.set(".identity-letter", {
        yPercent: 120,
        opacity: 0,
      });

      tl.to({}, { duration: 0.35 });

      gsap.to(".identity-glow", {
        xPercent: 35,
        yPercent: -15,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const text = "MERCURE HOMES";

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="identity-glow pointer-events-none absolute left-[10%] top-[25%] h-[500px] w-[500px] rounded-full bg-[var(--caramel-bronze)]/[0.06] blur-[130px]"
      />

      <div className="site-container relative z-10 flex min-h-[72vh] items-center py-[90px] lg:py-[105px]">
        <div className="w-full">
          {/* TOP */}

          <div className="mb-[clamp(45px,5vw,75px)] flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

              <p className="text-[9px] uppercase tracking-[0.28em] text-[var(--alabaster-mist)]/48">
                Mercure Homes
              </p>
            </div>

            <div className="hidden items-center gap-5 md:flex">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/32">
                Bengaluru · India
              </p>

              <span className="h-px w-12 bg-[var(--brand-gold)]/35" />
            </div>
          </div>

          {/* IDENTITY STAGE */}

          <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-y border-[var(--alabaster-mist)]/10 lg:min-h-[330px]">
            {/* Giant M */}

            <div
              aria-hidden="true"
              className="identity-monogram pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
            >
              <span className="font-heading text-[clamp(240px,32vw,580px)] font-normal leading-none tracking-[-0.1em] text-[var(--ivory-vein)]">
                M
              </span>
            </div>

            {/* Architectural grid */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] grid grid-cols-10"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="relative"
                >
                  <span className="identity-line absolute right-0 top-0 h-full w-px bg-[var(--alabaster-mist)]/10" />
                </div>
              ))}
            </div>

            {/* Main Wordmark */}

            <div className="relative z-10 overflow-hidden px-4 py-8">
              <h2
                aria-label="Mercure Homes"
                className="flex whitespace-nowrap font-heading text-[clamp(54px,9vw,158px)] font-normal leading-[0.88] tracking-[-0.055em] text-[var(--ivory-vein)]"
              >
                {text.split("").map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className="identity-letter inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h2>
            </div>

            {/* Architectural panels */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 grid grid-cols-10"
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className={[
                    "identity-panel",
                    index % 2 === 0
                      ? "bg-[var(--alabaster-mist)]"
                      : "bg-[var(--ivory-vein)]",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Coordinates */}

            <span className="absolute bottom-5 left-0 z-30 text-[8px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/26">
              12.9716° N
            </span>

            <span className="absolute bottom-5 right-0 z-30 text-[8px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/26">
              77.5946° E
            </span>
          </div>

          {/* BOTTOM */}

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3">
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]/35" />

              <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/48">
                Italian Sensibility
              </p>
            </div>

            <div className="flex items-center justify-end gap-4 md:justify-center">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/48">
                Indian Craftsmanship
              </p>
            </div>

            <div className="hidden items-center justify-end gap-4 md:flex">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--alabaster-mist)]/48">
                Made Personal
              </p>

              <span className="h-px w-8 bg-[var(--brand-gold)]/35" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}