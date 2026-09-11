
import BrandFaceSection from "@/src/components/team/BrandFaceSection";
import FounderNote from "@/src/components/team/FounderNote";
import TeamHero from "@/src/components/team/TeamHero";
import TeamPhotoSection from "@/src/components/team/TeamPhotoSection";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Mercure Homes, a Bengaluru luxury interior atelier combining Italian design sensibility, Indian craftsmanship and deeply personal interiors.",
};

export default function AboutPage() {
  return (
    <main>
      <TeamHero/>
      <FounderNote/>
      <TeamPhotoSection/>
      <BrandFaceSection/>
    </main>
  );
}