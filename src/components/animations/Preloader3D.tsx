"use client";

import { useEffect, useRef, useState } from "react";
import { getGSAP } from "../../lib/gsap";

export default function Preloader3D() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const aperture = apertureRef.current;
    const frame = frameRef.current;

    if (!wrapper || !aperture || !frame) return;

    const { gsap } = getGSAP();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        const timer = window.setTimeout(() => {
          document.body.style.overflow = "";

          window.requestAnimationFrame(() => {
            setVisible(false);
          });
        }, 500);

        return () => {
          window.clearTimeout(timer);
        };
      }

      gsap.set(aperture, {
        width: "10vw",
        height: "7vh",
      });

      gsap.set(".loader-edge-top", {
        yPercent: 0,
      });

      gsap.set(".loader-edge-bottom", {
        yPercent: 0,
      });

      gsap.set(".loader-meta", {
        opacity: 0,
        y: 10,
      });

      gsap.set(frame, {
        opacity: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";

          window.requestAnimationFrame(() => {
            setVisible(false);
          });
        },
      });

      // Frame appears
      tl.to(frame, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Metadata
      tl.to(
        ".loader-meta",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.35"
      );

      // Aperture widens
      tl.to(
        aperture,
        {
          width: "55vw",
          duration: 1.1,
          ease: "power4.inOut",
        },
        "+=0.15"
      );

      // Then grows vertically
      tl.to(
        aperture,
        {
          height: "62vh",
          duration: 1.05,
          ease: "power4.inOut",
        },
        "-=0.4"
      );

      // Architectural edges separate
      tl.to(
        ".loader-edge-top",
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.45"
      );

      tl.to(
        ".loader-edge-bottom",
        {
          yPercent: 100,
          duration: 0.9,
          ease: "power4.inOut",
        },
        "<"
      );

      // Opening becomes full viewport
      tl.to(
        aperture,
        {
          width: "100vw",
          height: "100vh",
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.45"
      );

      // Loader disappears
      tl.to(
        wrapper,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }, wrapper);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[100000] overflow-hidden bg-[#171715]"
    >
      {/* top metadata */}
      <div className="loader-meta absolute left-[var(--page-padding)] right-[var(--page-padding)] top-8 z-40 flex items-center justify-between text-white md:top-10">
        <span className="text-[8px] uppercase tracking-[0.28em] text-white/35">
          Mercure Homes
        </span>

        <span className="hidden text-[8px] uppercase tracking-[0.24em] text-white/25 md:block">
          Bengaluru · India
        </span>
      </div>

      {/* aperture */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={apertureRef}
          className="relative overflow-hidden"
        >
          {/* subtle frame */}
          <div
            ref={frameRef}
            className="absolute inset-0 z-20 border border-white/20"
          />

          {/* live hero underneath */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/home/hero.jpg"
          >
            <source
              src="/videos/home/hero.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-black/15" />

          {/* architectural top plane */}
          <div className="loader-edge-top absolute inset-x-0 top-0 z-30 h-1/2 bg-[#d8d1c6]" />

          {/* architectural bottom plane */}
          <div className="loader-edge-bottom absolute inset-x-0 bottom-0 z-30 h-1/2 bg-[#c7beb1]" />
        </div>
      </div>

      {/* bottom metadata */}
      <div className="loader-meta absolute bottom-8 left-[var(--page-padding)] right-[var(--page-padding)] z-40 flex items-center justify-between text-white md:bottom-10">
        <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">
          Italian Sensibility
        </span>

        <span className="text-[8px] uppercase tracking-[0.25em] text-white/30">
          Made Personal
        </span>
      </div>
    </div>
  );
}