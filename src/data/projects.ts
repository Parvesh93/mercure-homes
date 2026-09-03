export type ProjectCategory =
  | "Residential"
  | "Hospitality"
  | "Turnkey";

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year?: string;
  scope?: string;
  description: string;
  coverImage: string;
  href: string;
  layout: "wide" | "portrait" | "standard";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "the-quiet-residence",
    title: "The Quiet Residence",
    location: "Bengaluru",
    category: "Residential",
    year: "2026",
    scope: "Interior Design & Execution",
    description:
      "A warm contemporary residence shaped through layered materials, quiet tones and custom detailing.",
    coverImage: "/images/projects/project-01.jpg",
    href: "/projects/the-quiet-residence",
    layout: "wide",
    featured: true,
  },

  {
    id: "02",
    slug: "house-of-stone",
    title: "House of Stone",
    location: "Bengaluru",
    category: "Turnkey",
    year: "2026",
    scope: "Turnkey Interiors",
    description:
      "Natural stone, custom furniture and measured proportions come together as one continuous composition.",
    coverImage: "/images/projects/project-02.jpg",
    href: "/projects/house-of-stone",
    layout: "portrait",
    featured: true,
  },

  {
    id: "03",
    slug: "the-courtyard-home",
    title: "The Courtyard Home",
    location: "Bengaluru",
    category: "Residential",
    year: "2026",
    scope: "Interior Architecture",
    description:
      "An understated home balancing natural light, crafted surfaces and a calm material palette.",
    coverImage: "/images/projects/project-03.jpg",
    href: "/projects/the-courtyard-home",
    layout: "standard",
  },

  {
    id: "04",
    slug: "atelier-suite",
    title: "Atelier Suite",
    location: "Goa",
    category: "Hospitality",
    year: "2026",
    scope: "Hospitality Interiors",
    description:
      "A hospitality space defined by tactile surfaces, warm lighting and composed luxury.",
    coverImage: "/images/projects/project-04.jpg",
    href: "/projects/atelier-suite",
    layout: "portrait",
  },

  {
    id: "05",
    slug: "residence-no-27",
    title: "Residence No. 27",
    location: "Hyderabad",
    category: "Turnkey",
    year: "2026",
    scope: "Turnkey Design & Build",
    description:
      "A complete interior environment developed around material continuity and personalised furniture.",
    coverImage: "/images/projects/project-05.jpg",
    href: "/projects/residence-no-27",
    layout: "wide",
  },

  {
    id: "06",
    slug: "the-soft-house",
    title: "The Soft House",
    location: "Bengaluru",
    category: "Residential",
    year: "2026",
    scope: "Interior Design",
    description:
      "Soft textures and precise detailing create a home that feels refined without becoming formal.",
    coverImage: "/images/projects/project-06.jpg",
    href: "/projects/the-soft-house",
    layout: "standard",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured
);

export function getProjectBySlug(slug: string) {
  return projects.find(
    (project) => project.slug === slug
  );
}