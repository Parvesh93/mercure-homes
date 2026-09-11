import type { Metadata } from "next";

import AboutHero from "../../components/about/AboutHero";
import AboutStory from "../../components/about/AboutStory";
import AtelierSection from "../../components/about/AtelierSection";
import ValuesSection from "../../components/about/ValuesSection";
import AboutProcess from "../../components/about/AboutProcess";

import LegacySection from "../../components/home/LegacySection";
import HomeCTA from "../../components/home/HomeCTA";

import ExperienceCentre from "../../components/about/ExperienceCentre";
import SDPGroupSection from "@/src/components/about/SDPGroupSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Mercure Homes, a Bengaluru luxury interior atelier combining Italian design sensibility, Indian craftsmanship and deeply personal interiors.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <AboutStory />

      <ExperienceCentre />

      <SDPGroupSection/>

      {/* <AtelierSection />

      <ValuesSection />

      <AboutProcess />

      <LegacySection /> */}

      <HomeCTA />
    </main>
  );
}