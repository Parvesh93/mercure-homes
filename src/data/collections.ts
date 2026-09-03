export type CollectionItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  image: string;
  href: string;
  intro: string;
  statement: string;
  gallery: string[];
  materials: {
    name: string;
    description: string;
  }[];
};

export const collections: CollectionItem[] = [
  {
    id: "01",
    slug: "modular",
    title: "Modular",
    subtitle: "Kitchens & Wardrobes",
    description:
      "Precision-engineered modular solutions shaped around your space, lifestyle and material preferences.",
    heroImage: "/images/collections/modular/hero.jpg",
    image: "/images/collections/modular.jpg",
    href: "/collections/modular",

    intro:
      "Our modular environments are developed around the architecture of the home and the rhythms of everyday life. From kitchens to wardrobes, every configuration is considered as part of the wider interior rather than as a standalone system.",

    statement:
      "Precision where it matters. Freedom where it counts.",

    gallery: [
      "/images/collections/modular/gallery-01.jpg",
      "/images/collections/modular/gallery-02.jpg",
      "/images/collections/modular/gallery-03.jpg",
      "/images/collections/modular/gallery-04.jpg",
    ],

    materials: [
      {
        name: "Natural Stone",
        description:
          "Statement surfaces selected for character, movement and durability.",
      },
      {
        name: "Wood Finishes",
        description:
          "Warm veneers and timber finishes chosen to complement the architecture.",
      },
      {
        name: "Metal",
        description:
          "Refined metal details used across profiles, hardware and accents.",
      },
      {
        name: "Lacquer",
        description:
          "Custom finishes developed around the colour and material palette of the space.",
      },
    ],
  },

  {
    id: "02",
    slug: "custom-furniture",
    title: "Custom Furniture",
    subtitle: "Furniture made for one home",
    description:
      "Bespoke seating, tables, beds and statement pieces crafted to belong naturally within your interior.",
    heroImage: "/images/collections/custom-furniture/hero.jpg",
    image: "/images/collections/furniture.jpg",
    href: "/collections/custom-furniture",

    intro:
      "Every piece begins with proportion, purpose and the room it belongs to. From statement seating to dining tables and beds, our furniture is developed as part of the architecture and character of the home.",

    statement:
      "Designed for one room. Made for one life.",

    gallery: [
      "/images/collections/custom-furniture/gallery-01.jpg",
      "/images/collections/custom-furniture/gallery-02.jpg",
      "/images/collections/custom-furniture/gallery-03.jpg",
      "/images/collections/custom-furniture/gallery-04.jpg",
    ],

    materials: [
      {
        name: "Italian Leather",
        description:
          "Premium leather selected for tactility, character and graceful ageing.",
      },
      {
        name: "Textiles",
        description:
          "Upholstery selected around comfort, tone and the wider interior palette.",
      },
      {
        name: "Wood",
        description:
          "Timber chosen for grain, proportion and precise craftsmanship.",
      },
      {
        name: "Stone",
        description:
          "Natural stone used selectively across surfaces and statement details.",
      },
    ],
  },

  {
    id: "03",
    slug: "soft-furnishings",
    title: "Soft Furnishings",
    subtitle: "Texture, comfort & detail",
    description:
      "Custom carpets and made-to-measure furnishings that bring softness, warmth and individuality to a space.",
    heroImage: "/images/collections/soft-furnishings/hero.jpg",
    image: "/images/collections/soft-furnishings.jpg",
    href: "/collections/soft-furnishings",

    intro:
      "Texture changes how a room feels. Our soft furnishings are developed to bring warmth, acoustic comfort and individuality through made-to-measure curtains, custom carpets and carefully considered textiles.",

    statement:
      "The details you feel before you notice.",

    gallery: [
      "/images/collections/soft-furnishings/gallery-01.jpg",
      "/images/collections/soft-furnishings/gallery-02.jpg",
      "/images/collections/soft-furnishings/gallery-03.jpg",
      "/images/collections/soft-furnishings/gallery-04.jpg",
    ],

    materials: [
      {
        name: "Imported Linens",
        description:
          "Natural textiles chosen for softness, movement and understated character.",
      },
      {
        name: "Hand-Tufted Carpets",
        description:
          "Custom designs developed around scale, colour and the architecture of the room.",
      },
      {
        name: "Hand-Knotted Carpets",
        description:
          "Artisanal pieces created for texture, longevity and individuality.",
      },
      {
        name: "Custom Drapery",
        description:
          "Made-to-measure curtains developed around light, privacy and proportion.",
      },
    ],
  },

  {
    id: "04",
    slug: "lighting",
    title: "Lighting",
    subtitle: "Decorative illumination",
    description:
      "Custom-designed decorative lighting created to complement the architecture, material palette and mood of your home.",
    heroImage: "/images/collections/lighting/hero.jpg",
    image: "/images/collections/lighting.jpg",
    href: "/collections/lighting",

    intro:
      "Decorative lighting becomes part of the architecture when proportion, finish and ambience are considered together. Each fixture is developed around the spatial and material language of the project.",

    statement:
      "Light designed as part of the room.",

    gallery: [
      "/images/collections/lighting/gallery-01.jpg",
      "/images/collections/lighting/gallery-02.jpg",
      "/images/collections/lighting/gallery-03.jpg",
      "/images/collections/lighting/gallery-04.jpg",
    ],

    materials: [
      {
        name: "Metal Finishes",
        description:
          "Brass, bronze and refined metallic surfaces developed around the interior palette.",
      },
      {
        name: "Glass",
        description:
          "Clear, textured and sculptural glass used to shape atmosphere and diffusion.",
      },
      {
        name: "Stone",
        description:
          "Natural stone incorporated as a material and visual anchor.",
      },
      {
        name: "Custom Finishes",
        description:
          "Surface treatments selected specifically for the surrounding architecture.",
      },
    ],
  },
];

export const homeCollections = collections;

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}