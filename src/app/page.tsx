import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import BrandStatement from "../components/home/BrandStatement";
import CollectionsPreview from "../components/home/CollectionsPreview";
import FeaturedProjects from "../components/home/FeaturedProjects";

import CraftSection from "../components/home/CraftSection";
import LegacySection from "../components/home/LegacySection";

import HomeCTA from "../components/home/HomeCTA";

import BrandIdentityMotion from "../components/home/BrandIdentityMotion";

import MaterialSculpture from "../components/home/MaterialSculpture";
import BrandStrip from "../components/home/BrandStrip";
import HeroVirtual from "../components/home/HeroVirtual";

export default function Home() {
  return (
    <main>
      {/* <Header /> */}

      <Hero />

      <HeroVirtual/>

      {/* <BrandIdentityMotion /> */}

      <BrandStrip/>

      {/* <BrandStatement /> */}

      {/* <MaterialSculpture /> */}

       <CollectionsPreview />

        <FeaturedProjects />

        <CraftSection />

      <LegacySection />

      <HomeCTA />
    </main>
  );
}