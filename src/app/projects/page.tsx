import type { Metadata } from "next";

import ProjectsHero from "../../components/projects/ProjectsHero";
import ProjectsGrid from "../../components/projects/ProjectsGrid";
import HomeCTA from "../../components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected residential, hospitality and turnkey interior projects by Mercure Homes.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />

      <ProjectsGrid />

      <HomeCTA />
    </main>
  );
}