import ContactHero from "@/src/components/contact/ContactHero";
import ContactLocation from "@/src/components/contact/ContactLocation";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Mercure Homes, a Bengaluru luxury interior atelier combining Italian design sensibility, Indian craftsmanship and deeply personal interiors.",
};

export default function AboutPage() {
  return (
    <main>
      <ContactHero/>
      <ContactLocation/>
    </main>
  );
}