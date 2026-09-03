// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// import { homeCollections } from "../../data/collections";
// import { getGSAP } from "../../lib/gsap";

// export default function CollectionsPreview() {
//   const sectionRef = useRef<HTMLElement>(null);

//   const [activeIndex, setActiveIndex] = useState(0);

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
//         ".collections-heading",
//         {
//           opacity: 0,
//           y: 50,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: section,
//             start: "top 75%",
//             once: true,
//           },
//         }
//       );

//       gsap.fromTo(
//         ".collection-row",
//         {
//           opacity: 0,
//           y: 25,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.9,
//           stagger: 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".collections-list",
//             start: "top 85%",
//             once: true,
//           },
//         }
//       );

//       gsap.fromTo(
//         ".collections-visual",
//         {
//           opacity: 0,
//           scale: 1.04,
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           duration: 1.4,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: ".collections-visual",
//             start: "top 80%",
//             once: true,
//           },
//         }
//       );
//     }, section);

//     return () => ctx.revert();
//   }, []);

//   const activeCollection = homeCollections[activeIndex];

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-[#171715] py-[clamp(110px,12vw,190px)] text-white"
//     >
//       <div className="site-container">
//         {/* Heading */}
//         <div className="collections-heading mb-20 grid gap-8 lg:grid-cols-[0.8fr_2.2fr]">
//           <div>
//             <p className="eyebrow text-white/45">
//               Our Collections
//             </p>
//           </div>

//           <div className="max-w-[950px]">
//             <h2 className="font-heading text-[clamp(46px,6vw,92px)] font-normal leading-[0.96] tracking-[-0.05em]">
//               Designed for the way
//               <br />
//               you choose to live.
//             </h2>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
//           {/* Collection list */}
//           <div className="collections-list self-center">
//             {homeCollections.map((collection, index) => {
//               const isActive = index === activeIndex;

//               return (
//                 <Link
//                   key={collection.title}
//                   href={collection.href}
//                   onMouseEnter={() => setActiveIndex(index)}
//                   onFocus={() => setActiveIndex(index)}
//                   className="collection-row group block border-t border-white/15"
//                 >
//                   <div
//                     className={[
//                       "grid grid-cols-[55px_1fr_auto] items-center gap-4 py-7 transition-opacity duration-500 md:grid-cols-[70px_1fr_auto]",
//                       isActive
//                         ? "opacity-100"
//                         : "opacity-45 hover:opacity-85",
//                     ].join(" ")}
//                   >
//                     <span className="text-[10px] tracking-[0.2em] text-white/35">
//                       {collection.id}
//                     </span>

//                     <div>
//                       <h3 className="font-heading text-[clamp(26px,3vw,43px)] leading-none tracking-[-0.035em]">
//                         {collection.title}
//                       </h3>

//                       <p
//                         className={[
//                           "mt-2 text-[11px] tracking-[0.08em] text-white/45 transition-all duration-500",
//                           isActive
//                             ? "translate-y-0 opacity-100"
//                             : "-translate-y-1 opacity-0",
//                         ].join(" ")}
//                       >
//                         {collection.subtitle}
//                       </p>
//                     </div>

//                     <div
//                       className={[
//                         "flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500",
//                         isActive
//                           ? "border-white bg-white text-black"
//                           : "border-white/25 text-white",
//                       ].join(" ")}
//                     >
//                       <span className="text-lg leading-none">
//                         ↗
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}

//             <div className="border-t border-white/15" />

//             <p className="mt-10 max-w-[480px] text-[14px] leading-[1.8] text-white/55 md:text-[15px]">
//               {activeCollection.description}
//             </p>
//           </div>

//           {/* Visual */}
//           <div className="collections-visual relative min-h-[580px] overflow-hidden lg:min-h-[720px]">
//             {homeCollections.map((collection, index) => {
//               const isActive = index === activeIndex;

//               return (
//                 <div
//                   key={collection.image}
//                   className={[
//                     "absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
//                     isActive
//                       ? "scale-100 opacity-100"
//                       : "pointer-events-none scale-[1.04] opacity-0",
//                   ].join(" ")}
//                 >
//                   <Image
//                     src={collection.image}
//                     alt={collection.title}
//                     fill
//                     sizes="(max-width: 1024px) 100vw, 50vw"
//                     className="object-cover"
//                     priority={index === 0}
//                   />
//                 </div>
//               );
//             })}

//             <div className="absolute inset-0 bg-black/10" />

//             {/* Image label */}
//             <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white md:bottom-9 md:left-9 md:right-9">
//               <div>
//                 <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/55">
//                   Collection
//                 </p>

//                 <p className="font-heading text-[22px] tracking-[-0.025em]">
//                   {activeCollection.title}
//                 </p>
//               </div>

//               <span className="text-[10px] tracking-[0.18em] text-white/55">
//                 {activeCollection.id} / 04
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { homeCollections } from "../../data/collections";
import { getGSAP } from "../../lib/gsap";

export default function CollectionsPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;

    if (!section || !sticky) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    if (reduceMotion || !desktop) return;

    const { gsap, ScrollTrigger } = getGSAP();

    let currentIndex = -1;

    const ctx = gsap.context(() => {
      const updateActiveCollection = (progress: number) => {
        const total = homeCollections.length;

        const nextIndex = Math.min(
          total - 1,
          Math.floor(progress * total)
        );

        if (nextIndex !== currentIndex) {
          currentIndex = nextIndex;
          setActiveIndex(nextIndex);
        }
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          updateActiveCollection(self.progress);

          gsap.set(progressRef.current, {
            scaleX: self.progress,
          });
        },
      });

      gsap.fromTo(
        ".collections-sticky-heading",
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
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeCollection = homeCollections[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative bg-[#171715] text-white lg:h-[400vh]"
    >
      {/* DESKTOP PINNED EXPERIENCE */}

      <div
        ref={stickyRef}
        className="hidden h-screen overflow-hidden lg:sticky lg:top-0 lg:block"
      >
        <div className="site-container flex h-full flex-col py-10 xl:py-12">
          {/* Top */}
          <div className="collections-sticky-heading flex items-center justify-between">
            <p className="eyebrow text-white/45">
              Our Collections
            </p>

            <div className="flex items-center gap-5">
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
                Scroll to explore
              </span>

              <span className="block h-px w-12 bg-white/20" />
            </div>
          </div>

          {/* Main */}
          <div className="grid min-h-0 flex-1 grid-cols-[0.86fr_1.14fr] gap-16 py-10 xl:gap-24">
            {/* LEFT */}
            <div className="flex min-h-0 flex-col justify-between">
              <div>
                <h2 className="font-heading max-w-[650px] text-[clamp(48px,5vw,82px)] font-normal leading-[0.94] tracking-[-0.055em]">
                  Designed for
                  <br />
                  the way you live.
                </h2>
              </div>

              <div>
                <div className="mb-8 flex items-end gap-3">
                  <span className="font-heading text-[56px] leading-none tracking-[-0.06em]">
                    0{activeIndex + 1}
                  </span>

                  <span className="mb-1 text-[11px] tracking-[0.18em] text-white/30">
                    / 04
                  </span>
                </div>

                <div className="border-t border-white/15">
                  {homeCollections.map((collection, index) => {
                    const isActive = activeIndex === index;

                    return (
                      <Link
                        key={collection.slug}
                        href={collection.href}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={[
                          "group grid grid-cols-[45px_1fr_auto] items-center",
                          "border-b border-white/15 py-4",
                          "transition-opacity duration-500",
                          isActive
                            ? "opacity-100"
                            : "opacity-35 hover:opacity-70",
                        ].join(" ")}
                      >
                        <span className="text-[9px] tracking-[0.18em]">
                          0{index + 1}
                        </span>

                        <span className="font-heading text-[clamp(22px,2vw,32px)] tracking-[-0.035em]">
                          {collection.title}
                        </span>

                        <span
                          className={[
                            "text-[15px] transition-all duration-500",
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-2 opacity-0",
                          ].join(" ")}
                        >
                          ↗
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-7 min-h-[100px]">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/35">
                    {activeCollection.subtitle}
                  </p>

                  <p className="max-w-[500px] text-[13px] leading-[1.75] text-white/55">
                    {activeCollection.description}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <Link
              href={activeCollection.href}
              data-cursor="Explore"
              className="relative min-h-0 overflow-hidden"
            >
              {homeCollections.map((collection, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={collection.slug}
                    className={[
                      "absolute inset-0",
                      "transition-[opacity,transform] duration-[1000ms]",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive
                        ? "z-10 scale-100 opacity-100"
                        : "z-0 scale-[1.055] opacity-0",
                    ].join(" ")}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      sizes="58vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 z-20 bg-black/[0.08]" />

              <div className="absolute inset-x-8 bottom-8 z-30 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-[9px] uppercase tracking-[0.24em] text-white/55">
                    Collection
                  </p>

                  <p className="font-heading text-[32px] tracking-[-0.04em]">
                    {activeCollection.title}
                  </p>
                </div>

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/55">
                  Discover
                </p>
              </div>
            </Link>
          </div>

          {/* Progress */}
          <div className="relative h-px w-full bg-white/15">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white/75"
            />
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET */}

      <div className="site-container py-[110px] lg:hidden">
        <div className="mb-16">
          <p className="eyebrow text-white/45">
            Our Collections
          </p>

          <h2 className="font-heading mt-8 text-[clamp(46px,13vw,72px)] leading-[0.94] tracking-[-0.055em]">
            Designed for
            <br />
            the way you live.
          </h2>
        </div>

        <div className="space-y-16">
          {homeCollections.map((collection, index) => (
            <article key={collection.slug}>
              <Link
                href={collection.href}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-black/[0.08]" />

                  <span className="absolute left-5 top-5 text-[9px] tracking-[0.2em] text-white/70">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/35">
                      {collection.subtitle}
                    </p>

                    <h3 className="font-heading text-[34px] tracking-[-0.04em]">
                      {collection.title}
                    </h3>

                    <p className="mt-4 max-w-[500px] text-[13px] leading-[1.75] text-white/50">
                      {collection.description}
                    </p>
                  </div>

                  <span className="mt-2 text-lg">
                    ↗
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}