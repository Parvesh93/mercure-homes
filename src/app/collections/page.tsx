import type { Metadata } from "next";

import CollectionsHero from "../../components/collections/CollectionsHero";
import CategoryGrid from "../../components/collections/CategoryGrid";
import MaterialStories from "../../components/collections/MaterialStories";
import CustomisationStatement from "../../components/collections/CustomisationStatement";
import HomeCTA from "../../components/home/HomeCTA";
import CollectionsMoodboard from "@/src/components/collections/CollectionsMoodboard";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore bespoke modular solutions, custom furniture, soft furnishings and decorative lighting by Mercure Homes.",
};

export default function CollectionsPage() {
  return (
    <main>
      <CollectionsHero />

      <CollectionsMoodboard/>

      <CategoryGrid />

      <MaterialStories />

      <CustomisationStatement />

      <HomeCTA />
    </main>
  );
}