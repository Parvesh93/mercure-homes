import ProcessFAQ from "@/src/components/process/ProcessFAQ";
import ProcessHero from "@/src/components/process/ProcessHero";
import ProcessJourney from "@/src/components/process/ProcessJourney";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Mercure Homes, a Bengaluru luxury interior atelier combining Italian design sensibility, Indian craftsmanship and deeply personal interiors.",
};

export default function AboutPage() {
  return (
    <main>
      <ProcessHero/>
      <ProcessJourney/>
      <ProcessFAQ/>
    </main>
  );
}