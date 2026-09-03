"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { CollectionItem } from "../../../data/collections";
import { getGSAP } from "../../../lib/gsap";

interface CollectionGalleryProps {
  collection: CollectionItem;
}

export default function CollectionGallery({
  collection,
}: CollectionGalleryProps) {
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
      gsap.utils
        .toArray<HTMLElement>(".collection-gallery-image")
        .forEach((item) => {
          gsap.fromTo(
            item,
            {
              clipPath: "inset(10% 0% 10% 0%)",
              scale: 1.06,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--surface-light)] py-[clamp(100px,12vw,180px)]"
    >
      <div className="site-container">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              Gallery
            </p>

            <h2 className="heading-md mt-7">
              Details in context.
            </h2>
          </div>

          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] md:block">
            04 Images
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="collection-gallery-image relative aspect-[16/11] overflow-hidden md:col-span-8">
            <Image
              src={collection.gallery[0]}
              alt={`${collection.title} 1`}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />
          </div>

          <div className="collection-gallery-image relative aspect-[4/5] overflow-hidden md:col-span-4">
            <Image
              src={collection.gallery[1]}
              alt={`${collection.title} 2`}
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover"
            />
          </div>

          <div className="collection-gallery-image relative aspect-[4/5] overflow-hidden md:col-span-4">
            <Image
              src={collection.gallery[2]}
              alt={`${collection.title} 3`}
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover"
            />
          </div>

          <div className="collection-gallery-image relative aspect-[16/11] overflow-hidden md:col-span-8">
            <Image
              src={collection.gallery[3]}
              alt={`${collection.title} 4`}
              fill
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}