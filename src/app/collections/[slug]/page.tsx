import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  collections,
  getCollectionBySlug,
} from "../../../data/collections";

import CollectionHero from "../../../components/collections/detail/CollectionHero";
import CollectionIntro from "../../../components/collections/detail/CollectionIntro";
import CollectionGallery from "../../../components/collections/detail/CollectionGallery";
import CollectionMaterials from "../../../components/collections/detail/CollectionMaterials";
import CollectionCTA from "../../../components/collections/detail/CollectionCTA";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;

  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {};
  }

  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;

  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <main>
      <CollectionHero collection={collection} />

      <CollectionIntro collection={collection} />

      <CollectionGallery collection={collection} />

      <CollectionMaterials collection={collection} />

      <CollectionCTA collection={collection} />
    </main>
  );
}