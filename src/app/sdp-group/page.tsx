
import GroupCompanies from "@/src/components/sdp-group/GroupCompanies";
import LegacyTimeline from "@/src/components/sdp-group/LegacyTimeline";
import MaterialBridge from "@/src/components/sdp-group/MaterialBridge";
import SDPGroupHero from "@/src/components/sdp-group/SDPGroupHero";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About",
  description:
    "Discover Mercure Homes, a Bengaluru luxury interior atelier combining Italian design sensibility, Indian craftsmanship and deeply personal interiors.",
};

export default function AboutPage() {
  return (
    <main>
      <SDPGroupHero/>
      <LegacyTimeline/>
      <GroupCompanies/>
      <MaterialBridge/>
    </main>
  );
}