export type ProjectDetail = {
  slug: string;
  title: string;
  location: string;
  sqft: string;
  scope: string;
  heroImage: string;
  description: string;
  gallery: string[];
  materials?: string[];
  quote?: {
    text: string;
    author?: string;
  };
};

export const projectDetails: ProjectDetail[] = [
  {
    slug: "shriyaamvita",

    title: "Shriyaamvita",

    location: "Kanakapura",

    sqft: "50,000 sq ft",

    scope:
      "Modular · Loose Furniture · Lighting",

    heroImage:
      "/images/projects/shriyaamvita/hero.jpg",

    description:
      "A quiet dialogue between Kerala’s timeless sensibility and contemporary Bangalore, this residence is shaped by warmth, restraint, and an affinity with nature. Conceived as a turnkey home, every layer — from furniture and lighting to finishes and textiles — was considered as part of a singular design language. Earthy hues and softened pastels echo the surrounding greenery, while linen blends, tactile materials, and expressive prints bring depth and intimacy to the spaces.",

    gallery: [
      "/images/projects/shriyaamvita/01.jpg",
      "/images/projects/shriyaamvita/02.jpg",
      "/images/projects/shriyaamvita/03.jpg",
      "/images/projects/shriyaamvita/04.jpg",
      "/images/projects/shriyaamvita/05.jpg",
      "/images/projects/shriyaamvita/06.jpg",
      "/images/projects/shriyaamvita/07.jpg",
      "/images/projects/shriyaamvita/08.jpg",
    ],
  },

  {
    slug: "grand-pavilion",

    title: "The Grand Pavilion",

    location: "Chandapura",

    sqft: "40,000 sq ft",

    scope: "Turnkey",

    heroImage:
      "/images/projects/grand-pavilion/hero.jpg",

    description:
      "This villa is a study in warm contemporary living, where every room is treated as its own considered chapter rather than a repeated formula. The palette stays quietly consistent — travertine and marble surfaces, walnut-toned wood panelling, and soft leathers. Furniture leans sculptural and organic, allowing the interior to feel tactile rather than rigid.",

    materials: [
      "Travertine",
      "Marble",
      "Walnut-toned wood",
      "Soft leather",
    ],

    gallery: [
      "/images/projects/grand-pavilion/01.jpg",
      "/images/projects/grand-pavilion/02.jpg",
      "/images/projects/grand-pavilion/03.jpg",
      "/images/projects/grand-pavilion/04.jpg",
      "/images/projects/grand-pavilion/05.jpg",
      "/images/projects/grand-pavilion/06.jpg",
      "/images/projects/grand-pavilion/07.jpg",
      "/images/projects/grand-pavilion/08.jpg",
    ],
  },

  {
    slug:
      "model-flat-marketing-offices",

    title:
      "Model Flat & Marketing Offices",

    location: "Bengaluru",

    sqft: "Varies by unit",

    scope:
      "Turnkey · Furniture · Styling",

    heroImage:
      "/images/projects/model-flat/hero.jpg",

    description:
      "Show spaces crafted for builders, modular apartment units and corporate marketing offices, styled to sell a lifestyle to prospective buyers.",

    gallery: [
      "/images/projects/model-flat/01.jpg",
      "/images/projects/model-flat/02.jpg",
      "/images/projects/model-flat/03.jpg",
      "/images/projects/model-flat/04.jpg",
      "/images/projects/model-flat/05.jpg",
      "/images/projects/model-flat/06.jpg",
      "/images/projects/model-flat/07.jpg",
      "/images/projects/model-flat/08.jpg",
    ],
  },

  {
    slug: "mercure-studio",

    title: "The Mercure Studio",

    location: "Bengaluru",

    sqft: "18,000 sq ft",

    scope: "Experience Centre",

    heroImage:
      "/images/projects/mercure-studio/hero.jpg",

    description:
      "Our own Bengaluru atelier and Experience Centre — the one project we are never finished refining.",

    gallery: [
      "/images/projects/mercure-studio/01.jpg",
      "/images/projects/mercure-studio/02.jpg",
      "/images/projects/mercure-studio/03.jpg",
      "/images/projects/mercure-studio/04.jpg",
      "/images/projects/mercure-studio/05.jpg",
      "/images/projects/mercure-studio/06.jpg",
      "/images/projects/mercure-studio/07.jpg",
      "/images/projects/mercure-studio/08.jpg",
    ],
  },
];

export function getProjectBySlug(
  slug: string
) {
  return projectDetails.find(
    (project) =>
      project.slug === slug
  );
}