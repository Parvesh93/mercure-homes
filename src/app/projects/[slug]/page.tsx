import { notFound } from "next/navigation";

import ProjectDetailPage from "../../../components/projects/ProjectDetail";

import {
  getProjectBySlug,
  projectDetails,
} from "../../../data/projectDetails";

export function generateStaticParams() {
  return projectDetails.map(
    (project) => ({
      slug: project.slug,
    })
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const project =
    getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetailPage
      project={project}
    />
  );
}