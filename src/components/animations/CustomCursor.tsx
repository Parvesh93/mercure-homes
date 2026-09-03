"use client";

import { useEffect, useRef, useState } from "react";

import { getGSAP } from "../../lib/gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [label, setLabel] = useState("");

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const cursor = cursorRef.current;

    if (!cursor) return;

    const { gsap } = getGSAP();

    const moveX = gsap.quickTo(cursor, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(cursor, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const interactive =
        target.closest<HTMLElement>(
          "[data-cursor]"
        );

      if (interactive) {
        const cursorLabel =
          interactive.dataset.cursor || "";

        setLabel(cursorLabel);

        gsap.to(cursor, {
          width: cursorLabel ? 74 : 46,
          height: cursorLabel ? 74 : 46,
          duration: 0.45,
          ease: "power3.out",
        });

        return;
      }

      const link = target.closest(
        "a, button"
      );

      if (link) {
        setLabel("");

        gsap.to(cursor, {
          width: 42,
          height: 42,
          duration: 0.4,
          ease: "power3.out",
        });

        return;
      }

      setLabel("");

      gsap.to(cursor, {
        width: 14,
        height: 14,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener(
      "mousemove",
      handleMove
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={[
  "mercure-cursor pointer-events-none fixed left-0 top-0 z-[9999]",
  "hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex",
  label ? "mercure-cursor-label" : "",
].join(" ")}
    >
      {label && (
        <span className="text-center text-[8px] uppercase tracking-[0.15em] text-black">
          {label}
        </span>
      )}
    </div>
  );
}