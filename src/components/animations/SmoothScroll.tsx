"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

import { getGSAP } from "../../lib/gsap";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    const { gsap, ScrollTrigger } = getGSAP();

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}