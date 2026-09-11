"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getGSAP } from "../../lib/gsap";

/* =========================================================
   PRIMARY SWITCH
========================================================= */

type ViewMode =
  | "products"
  | "services";

/* =========================================================
   PRODUCT FILTERS
========================================================= */

const productFilters = [
  "All",
  "Modular",
  "Lighting",
  "Terrain",
  "Sculpt",
  "Soft Furnishings",
] as const;

type ProductFilter =
  (typeof productFilters)[number];

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    title: "Marmo Island Kitchen",
    category: "Modular",
    subcategory: "Kitchen",
    image:
      "/images/collections/marmo-island-kitchen.jpg",
    description:
      "An island kitchen built around a single slab of stone, engineered for the way a home actually gathers around food.",
  },
  {
    title:
      "Vetro Handleless Kitchen",
    category: "Modular",
    subcategory: "Kitchen",
    image:
      "/images/collections/vetro-handleless-kitchen.jpg",
    description:
      "Clean, handle-free cabinetry in soft-close precision — designed to disappear into the architecture around it.",
  },
  {
    title:
      "Custodia Walk-In Wardrobe",
    category: "Modular",
    subcategory: "Wardrobe",
    image:
      "/images/collections/custodia-walk-in-wardrobe.jpg",
    description:
      "A walk-in wardrobe planned around what you actually own, not a standard module stretched to fit.",
  },
  {
    title:
      "Linea Sliding Wardrobe",
    category: "Modular",
    subcategory: "Wardrobe",
    image:
      "/images/collections/linea-sliding-wardrobe.jpg",
    description:
      "Slim-profile sliding wardrobes for rooms where every centimetre of floor space matters.",
  },

  {
    title:
      "Alba Mirae Chandelier",
    category: "Lighting",
    subcategory: "Alba Mirae",
    image:
      "/images/collections/alba-mirae-chandelier.jpg",
    description:
      "A sculptural chandelier designed as the room's first sentence — the piece a space is planned around.",
  },
  {
    title:
      "Alba Mirae Pendant",
    category: "Lighting",
    subcategory: "Alba Mirae",
    image:
      "/images/collections/alba-mirae-pendant.jpg",
    description:
      "A single-drop pendant for entryways and dining tables, cast in warm, textured metal.",
  },
  {
    title:
      "Mirae Wall Sconce",
    category: "Lighting",
    subcategory: "Mirae",
    image:
      "/images/collections/mirae-wall-sconce.jpg",
    description:
      "A quiet wall light for corridors and bedside walls, built for daily ambient use.",
  },
  {
    title:
      "Mirae Table Lamp",
    category: "Lighting",
    subcategory: "Mirae",
    image:
      "/images/collections/mirae-table-lamp.jpg",
    description:
      "A considered bedside and console lamp, finished to complement Mercure's furniture metals.",
  },

  {
    title:
      "Terrain Lounge Chair",
    category: "Terrain",
    subcategory: "Outdoor",
    image:
      "/images/collections/terrain-lounge-chair.jpg",
    description:
      "A weather-rated lounge chair in teak and woven rope, built for balconies and poolside decks.",
  },
  {
    title: "Terrain Daybed",
    category: "Terrain",
    subcategory: "Outdoor",
    image:
      "/images/collections/terrain-daybed.jpg",
    description:
      "An outdoor daybed sized for long afternoons, finished to withstand Indian coastal climates.",
  },
  {
    title:
      "Terrain Dining Set",
    category: "Terrain",
    subcategory: "Outdoor",
    image:
      "/images/collections/terrain-dining-set.jpg",
    description:
      "A full outdoor dining set for terraces and courtyards, made to the proportions of your space.",
  },

  {
    title: "Sculpt Sofa",
    category: "Sculpt",
    subcategory: "Indoor",
    image:
      "/images/collections/sculpt-sofa.jpg",
    description:
      "A sofa built to the proportion of your living room, upholstered in fabrics and leathers chosen with you.",
  },
  {
    title: "Sculpt Armchair",
    category: "Sculpt",
    subcategory: "Indoor",
    image:
      "/images/collections/sculpt-armchair.jpg",
    description:
      "A single accent chair, sculpted for reading corners and quiet rooms.",
  },
  {
    title:
      "Sculpt Coffee Table",
    category: "Sculpt",
    subcategory: "Indoor",
    image:
      "/images/collections/sculpt-coffee-table.jpg",
    description:
      "A coffee table in stone or wood, sized to sit at the centre of a considered living space.",
  },
  {
    title: "Sculpt Console",
    category: "Sculpt",
    subcategory: "Indoor",
    image:
      "/images/collections/sculpt-console.jpg",
    description:
      "An entryway or media console, finished to complement the metals and stones used elsewhere in the home.",
  },
  {
    title: "Bespoke Bed",
    category: "Sculpt",
    subcategory:
      "Loose Furniture",
    image:
      "/images/collections/bespoke-bed.jpg",
    description:
      "A custom bed frame and headboard, upholstered or in solid wood, sized to your room.",
  },
  {
    title:
      "Custom Dining Table",
    category: "Sculpt",
    subcategory:
      "Loose Furniture",
    image:
      "/images/collections/custom-dining-table.jpg",
    description:
      "A dining table in stone or wood, seated to the number your family actually gathers.",
  },
  {
    title:
      "Occasional Console",
    category: "Sculpt",
    subcategory:
      "Loose Furniture",
    image:
      "/images/collections/occasional-console.jpg",
    description:
      "A standalone console for entryways, landings or media walls.",
  },
  {
    title: "Accent Bench",
    category: "Sculpt",
    subcategory:
      "Loose Furniture",
    image:
      "/images/collections/accent-bench.jpg",
    description:
      "A single upholstered bench, made to sit at the foot of a bed or along a hallway.",
  },

  {
    title:
      "Hand-Knotted Silk Rug",
    category:
      "Soft Furnishings",
    subcategory: "Carpet",
    image:
      "/images/collections/hand-knotted-silk-rug.jpg",
    description:
      "A fine hand-knotted silk rug, woven to your room's exact dimensions and palette.",
  },
  {
    title:
      "Hand-Tufted Wool Rug",
    category:
      "Soft Furnishings",
    subcategory: "Carpet",
    image:
      "/images/collections/hand-tufted-wool-rug.jpg",
    description:
      "A hand-tufted wool rug in custom pattern and scale, built for daily, family-home use.",
  },
  {
    title:
      "Custom Dhurrie",
    category:
      "Soft Furnishings",
    subcategory: "Carpet",
    image:
      "/images/collections/custom-dhurrie.jpg",
    description:
      "A flat-weave dhurrie for casual and outdoor-adjacent spaces, made to measure.",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function CollectionsMoodboard() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [viewMode, setViewMode] =
    useState<ViewMode>("products");

  const [
    activeFilter,
    setActiveFilter,
  ] =
    useState<ProductFilter>(
      "All"
    );

  const filteredProducts =
    useMemo(() => {
      if (
        activeFilter === "All"
      ) {
        return products;
      }

      return products.filter(
        (product) =>
          product.category ===
          activeFilter
      );
    }, [activeFilter]);

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
        gsap.fromTo(
          ".collections-intro",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease:
              "power3.out",
            scrollTrigger: {
              trigger:
                section,
              start:
                "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".collection-tile",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.75,
            ease:
              "power3.out",
            scrollTrigger: {
              trigger:
                ".collections-grid",
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
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={[
        "relative overflow-hidden",
        "bg-[var(--alabaster-mist)]",
        "py-[clamp(100px,11vw,165px)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* subtle brand atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-[8%] top-[10%] h-[340px] w-[340px] rounded-full bg-[var(--gilded-ochre)]/[0.02] blur-[140px]" />

        <div className="absolute bottom-[8%] right-[-6%] h-[380px] w-[380px] rounded-full bg-[var(--caramel-bronze)]/[0.02] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =================================================
            MAIN INTRO
        ================================================== */}

        <div className="collections-intro grid gap-10 lg:grid-cols-[0.72fr_2.28fr]">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="eyebrow !text-[var(--brand-gold)]">
                Collections
              </p>
            </div>
          </div>

          <div>
            <h2
              className={[
                "max-w-[920px]",
                "text-[clamp(44px,5.3vw,78px)]",
                "leading-[0.98]",
                "tracking-[-0.045em]",
              ].join(" ")}
            >
              <span className="font-heading">
                Made in-house.
              </span>{" "}

              <span className="font-editorial">
                Designed around the
                way you live.
              </span>
            </h2>

            <p className="mt-7 max-w-[760px] text-[15px] leading-[1.85] text-[var(--walnut-patina)]/62">
              Explore the products
              and services that make
              up a Mercure home.
              From kitchens,
              wardrobes and lighting
              to furniture, carpets
              and bespoke pieces,
              our products are
              designed and made
              in-house. Our turnkey
              service brings these
              elements together,
              taking a project from
              the first idea through
              to the final detail.
            </p>
          </div>
        </div>

        {/* =================================================
            PRIMARY PRODUCTS / SERVICES SWITCH
        ================================================== */}

        <div className="mt-[clamp(70px,7vw,105px)]">
          <div
            className={[
              "flex",
              "border-b",
              "border-[var(--walnut-patina)]/14",
            ].join(" ")}
          >
            {[
              {
                id: "products" as const,
                label:
                  "Products",
              },
              {
                id: "services" as const,
                label:
                  "Services",
              },
            ].map((item) => {
              const active =
                viewMode ===
                item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setViewMode(
                      item.id
                    )
                  }
                  className={[
                    "group relative",
                    "min-w-[150px]",
                    "pb-5",
                    "text-left",
                    "font-heading",
                    "text-[clamp(24px,2.4vw,36px)]",
                    "tracking-[-0.035em]",
                    "transition-colors",
                    "duration-500",

                    active
                      ? "text-[var(--obsidian-slate)]"
                      : "text-[var(--walnut-patina)]/32",
                  ].join(" ")}
                >
                  {item.label}

                  <span
                    className={[
                      "absolute",
                      "bottom-[-1px]",
                      "left-0",
                      "h-px",
                      "bg-[var(--brand-gold)]",
                      "transition-all",
                      "duration-500",

                      active
                        ? "w-full"
                        : "w-0 group-hover:w-10",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* =================================================
            PRODUCTS VIEW
        ================================================== */}

        {viewMode ===
          "products" && (
          <div className="animate-[collectionFade_500ms_ease-out]">
            {/* PRODUCT INTRO */}

            <div className="mt-[clamp(50px,5vw,75px)] grid gap-10 lg:grid-cols-[0.72fr_2.28fr]">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-[var(--brand-gold)]" />

                  <p className="eyebrow !text-[var(--brand-gold)]">
                    Products
                  </p>
                </div>
              </div>

              <div>
                <h2
                  className={[
                    "max-w-[900px]",
                    "text-[clamp(42px,5vw,74px)]",
                    "leading-[0.98]",
                    "tracking-[-0.045em]",
                  ].join(" ")}
                >
                  <span className="font-heading">
                    Made in-house.
                  </span>{" "}

                  <span className="font-editorial">
                    Designed around
                    the way you live.
                  </span>
                </h2>
              </div>
            </div>

            {/* =============================================
                PRODUCT FILTERS
            ============================================== */}

            <div
              className={[
                "mt-[clamp(45px,5vw,65px)]",
                "flex",
                "gap-x-7",
                "gap-y-4",
                "overflow-x-auto",
                "border-y",
                "border-[var(--walnut-patina)]/12",
                "py-5",
              ].join(" ")}
            >
              {productFilters.map(
                (filter) => {
                  const active =
                    activeFilter ===
                    filter;

                  return (
                    <button
                      key={
                        filter
                      }
                      type="button"
                      onClick={() =>
                        setActiveFilter(
                          filter
                        )
                      }
                      className={[
                        "relative",
                        "shrink-0",
                        "pb-2",
                        "text-[9px]",
                        "uppercase",
                        "tracking-[0.22em]",
                        "transition-colors",
                        "duration-300",

                        active
                          ? "text-[var(--obsidian-slate)]"
                          : "text-[var(--walnut-patina)]/42",
                      ].join(
                        " "
                      )}
                    >
                      {
                        filter
                      }

                      <span
                        className={[
                          "absolute",
                          "bottom-0",
                          "left-0",
                          "h-px",
                          "bg-[var(--brand-gold)]",
                          "transition-all",
                          "duration-500",

                          active
                            ? "w-full"
                            : "w-0",
                        ].join(
                          " "
                        )}
                      />
                    </button>
                  );
                }
              )}
            </div>

            {/* =============================================
                PRODUCT GRID
            ============================================== */}

            <div
              className={[
                "collections-grid",
                "mt-[clamp(55px,6vw,85px)]",
                "grid",
                "gap-x-5",
                "gap-y-10",
                "sm:grid-cols-2",
                "lg:grid-cols-3",
              ].join(" ")}
            >
              {filteredProducts.map(
                (
                  product,
                  index
                ) => {
                  const tall =
                    index %
                      5 ===
                      0 ||
                    index %
                      7 ===
                      3;

                  return (
                    <article
                      key={
                        product.title
                      }
                      className="collection-tile group"
                    >
                      <div
                        data-cursor="Explore"
                        className={[
                          "relative",
                          "overflow-hidden",
                          "bg-[var(--ivory-vein)]",

                          tall
                            ? "aspect-[4/5]"
                            : "aspect-[4/4.3]",
                        ].join(
                          " "
                        )}
                      >
                        <Image
                          src={
                            product.image
                          }
                          alt={
                            product.title
                          }
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={[
                            "object-cover",
                            "transition-transform",
                            "duration-[380ms]",
                            "ease-out",
                            "group-hover:scale-[1.045]",
                          ].join(
                            " "
                          )}
                        />

                        <div className="absolute inset-0 bg-[var(--walnut-patina)]/[0.03]" />

                        <div
                          className={[
                            "absolute inset-0",
                            "bg-gradient-to-t",
                            "from-[var(--obsidian-slate)]/65",
                            "via-transparent",
                            "to-transparent",
                            "opacity-70",
                            "transition-opacity",
                            "duration-[380ms]",
                            "group-hover:opacity-100",
                          ].join(
                            " "
                          )}
                        />

                        {/* category */}

                        <div className="absolute left-5 top-5">
                          <span className="text-[8px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                            {
                              product.category
                            }
                          </span>
                        </div>

                        {/* product name */}

                        <div
                          className={[
                            "absolute",
                            "bottom-5",
                            "left-5",
                            "right-5",
                            "translate-y-3",
                            "opacity-0",
                            "transition-all",
                            "duration-[380ms]",
                            "ease-out",
                            "group-hover:translate-y-0",
                            "group-hover:opacity-100",
                            "max-lg:translate-y-0",
                            "max-lg:opacity-100",
                          ].join(
                            " "
                          )}
                        >
                          <p className="text-[8px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/65">
                            {
                              product.subcategory
                            }
                          </p>

                          <h3 className="font-heading mt-2 text-[clamp(22px,2.2vw,32px)] leading-[1] tracking-[-0.035em] text-[var(--ivory-vein)]">
                            {
                              product.title
                            }
                          </h3>
                        </div>
                      </div>

                      <p className="mt-5 max-w-[430px] text-[12px] leading-[1.75] text-[var(--walnut-patina)]/56">
                        {
                          product.description
                        }
                      </p>
                    </article>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* =================================================
            SERVICES VIEW
        ================================================== */}

        {viewMode ===
          "services" && (
          <div className="animate-[collectionFade_500ms_ease-out]">
            {/* SERVICE INTRO */}

{/* <div className="mt-[clamp(50px,5vw,75px)] grid gap-10 lg:grid-cols-[0.72fr_2.28fr]">
  <div>
    <div className="flex items-center gap-4">
      <span className="h-px w-8 bg-[var(--brand-gold)]" />

      <p className="eyebrow !text-[var(--brand-gold)]">
        Services
      </p>
    </div>
  </div>

  <div>
    <h2
      className={[
        "max-w-[900px]",
        "font-editorial",
        "text-[clamp(46px,5.5vw,82px)]",
        "leading-[1]",
        "tracking-[-0.04em]",
      ].join(" ")}
    >
      Turnkey
    </h2>
  </div>
</div> */}

            {/* =============================================
                TURNKEY SERVICE
            ============================================== */}

            <div
              className={[
                "mt-[clamp(45px,5vw,70px)]",
                "grid",
                "gap-12",
                "lg:grid-cols-[1.15fr_0.85fr]",
                "lg:items-stretch",
                "lg:gap-[clamp(60px,7vw,110px)]",
              ].join(" ")}
            >
              {/* VISUAL */}

              <div
                className={[
                  "group relative",
                  "min-h-[520px]",
                  "overflow-hidden",
                ].join(" ")}
              >
                <Image
                  src="/images/collections/turnkey.jpg"
                  alt="Mercure Homes turnkey interiors"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className={[
                    "object-cover",
                    "transition-transform",
                    "duration-[1200ms]",
                    "ease-out",
                    "group-hover:scale-[1.035]",
                  ].join(" ")}
                />

                <div
                  className={[
                    "absolute inset-0",
                    "bg-gradient-to-t",
                    "from-[var(--obsidian-slate)]/55",
                    "via-transparent",
                    "to-transparent",
                  ].join(" ")}
                />

                <div className="absolute bottom-7 left-7">
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    Turnkey
                  </p>
                </div>
              </div>

              {/* CONTENT */}

              <div
                className={[
                  "flex",
                  "flex-col",
                  "justify-between",
                  "border-y",
                  "border-[var(--walnut-patina)]/12",
                  "py-9",
                ].join(" ")}
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--brand-gold)]">
                    From concept
                    to completion
                  </p>

                  <h3
                    className={[
                      "font-heading",
                      "mt-6",
                      "text-[clamp(36px,4vw,58px)]",
                      "leading-[1]",
                      "tracking-[-0.04em]",
                    ].join(" ")}
                  >
                    Turnkey
                    Interiors
                  </h3>

                  <p className="mt-7 max-w-[600px] text-[15px] leading-[1.9] text-[var(--walnut-patina)]/65">
                    From the first
                    conversation to
                    the final styled
                    detail, we manage
                    it all — design
                    consultation,
                    execution and
                    styling — as one
                    continuous process,
                    under one roof.
                  </p>

                  <p className="mt-5 max-w-[600px] text-[14px] leading-[1.85] text-[var(--walnut-patina)]/55">
                    No fragmented
                    vendors. No
                    dilution between
                    stages. Just a
                    single, considered
                    journey from
                    concept to
                    completion.
                  </p>
                </div>

                <a
                  href="/contact"
                  className={[
                    "group mt-10",
                    "flex w-fit",
                    "items-center",
                    "gap-5",
                    "text-[9px]",
                    "uppercase",
                    "tracking-[0.22em]",
                    "text-[var(--walnut-patina)]/65",
                  ].join(" ")}
                >
                  <span>
                    Schedule
                    consultation
                  </span>

                  <span className="relative h-px w-12 overflow-hidden bg-[var(--walnut-patina)]/18">
                    <span
                      className={[
                        "absolute inset-0",
                        "-translate-x-full",
                        "bg-[var(--brand-gold)]",
                        "transition-transform",
                        "duration-700",
                        "group-hover:translate-x-0",
                      ].join(
                        " "
                      )}
                    />
                  </span>

                  <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          VIEW TRANSITION ANIMATION
      ================================================== */}

      <style jsx global>{`
        @keyframes collectionFade {
          from {
            opacity: 0;
            transform: translateY(
              12px
            );
          }

          to {
            opacity: 1;
            transform: translateY(
              0
            );
          }
        }
      `}</style>
    </section>
  );
}