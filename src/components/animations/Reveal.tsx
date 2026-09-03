"use client";

import {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { getGSAP } from "../../lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: ElementType;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  as: Component = "div",
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const { gsap } = getGSAP();

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    return () => context.revert();
  }, [delay, y]);

  return (
    <Component ref={elementRef} className={className}>
      {children}
    </Component>
  );
}