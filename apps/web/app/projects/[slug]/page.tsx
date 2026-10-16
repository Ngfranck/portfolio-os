
import type { Metadata } from "next";

import { notFound } from "next/navigation";

import {
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "../../../services/projects/project.service";

import { ProjectHero } from "./project-hero";
import { ProjectOverview } from "./project-overview";
import { ProjectApproach } from "./project-approach";
import { ProjectResults } from "./project-results";
import { ProjectGallery } from "./project-gallery";
import { ProjectLiveButton } from "./project-live-button";
import { ProjectCTA } from "./project-cta";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   STATIC PROJECT ROUTES
========================================================= */

export async function generateStaticParams() {
  const projects = await getPublishedProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

/* =========================================================
   SEO / METADATA
========================================================= */

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet introuvable",
    };
  }

  return {
    title: `${project.title} — Franck.ui`,
    description: project.description ?? project.shortDescription,
  };
}

/* =========================================================
   PROJECT PAGE
========================================================= */

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = await getPublishedProjectBySlug(slug);

  /* =======================================================
     PROJECT NOT FOUND
  ======================================================= */

  if (!project) {
    notFound();
  }

  /* =======================================================
     ADAPT DATABASE DATA TO COMPONENT DATA
  ======================================================= */

  const projectData = {
    slug: project.slug,
    title: project.title,
    category: project.category?.name ?? "Project",
    year: project.year?.toString() ?? "—",
    description: project.description ?? project.shortDescription,
    shortDescription: project.shortDescription,

    role: project.roles.map((role) => role.title),

    services: project.services.map(({ service }) => service.title),

    image: project.coverImage ?? "",

    liveUrl: project.liveUrl ?? undefined,

    featured: project.featured,

    overview: project.overview
      ? {
          context: project.overview.context,
          challenge: project.overview.challenge,
          objective: project.overview.objective,
        }
      : {
          context: "",
          challenge: "",
          objective: "",
        },

    approach: project.approach.map((item) => ({
      number: item.number,
      title: item.title,
      description: item.description,
    })),

    results: project.results.map((result) => result.content),

    gallery: project.images.map((image) => image.url),
  };

  return (
    <main
      className="
        min-h-screen
        overflow-x-clip
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      {/* ===================================================
          NAVIGATION
      =================================================== */}

      {/* <Navigation /> */}

      {/* ===================================================
          HERO
      =================================================== */}

      <ProjectHero project={projectData} />

      {/* ===================================================
          PROJECT OVERVIEW
      =================================================== */}

      <ProjectOverview overview={projectData.overview} />

      {/* ===================================================
          PROJECT APPROACH
      =================================================== */}

      <ProjectApproach approach={projectData.approach} />

      {/* ===================================================
          PROJECT RESULTS
      =================================================== */}

      <ProjectResults results={projectData.results} />

      {/* ===================================================
          PROJECT GALLERY
      =================================================== */}

      <ProjectGallery
        images={projectData.gallery}
        title={projectData.title}
      />

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <ProjectCTA projectTitle={projectData.title} />

      {/* ===================================================
          FLOATING LIVE PROJECT BUTTON
          The component itself decides whether it should
          appear depending on project.liveUrl.
      =================================================== */}

      <ProjectLiveButton url={projectData.liveUrl} />
    </main>
  );
}

