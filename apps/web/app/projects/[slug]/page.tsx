
import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { JsonLd } from "../../components/seo/JsonLd";
import { getPublishedProjectBySlug } from "../../../services/projects/project.service";

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

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

export const dynamic = "force-dynamic";

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
      title: "Project not found",
    };
  }

  const fullDescription =
    project.shortDescription?.trim() ||
    project.description?.trim() ||
    `Explore ${project.title}, a design case study by Gonar.ui.`;
  const description =
    fullDescription.length > 160
      ? `${fullDescription.slice(0, 157).trimEnd()}...`
      : fullDescription;
  const image = project.coverImage ?? undefined;
  const canonical = `/projects/${project.slug}`;
  const projectDiscipline = project.services
    .slice(0, 2)
    .map(({ service }) => service.title)
    .join(" & ");
  const seoTitle = `${project.title} — ${projectDiscipline || project.category?.name || "Digital Design"} Case Study`;
  const keywords = [
    project.category?.name,
    ...project.services.map(({ service }) => service.title),
    ...(project.year ? [String(project.year)] : []),
    "design case study",
    "digital design portfolio",
  ].filter((keyword): keyword is string => Boolean(keyword));

  return {
    title: seoTitle,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${seoTitle} | Gonar.ui`,
      description,
      locale: "en_US",
      images: image
        ? [{ url: image, alt: `${project.title} project case study` }]
        : undefined,
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoTitle} | Gonar.ui`,
      description,
      images: image ? [image] : undefined,
    },
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

    website: project.liveUrl ?? undefined,
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
  const projectKeywords = [
    projectData.category,
    ...projectData.services,
    "brand identity",
    "UI/UX design",
    "digital product design",
  ];

  return (
    <main
      lang="en"
      className="
        min-h-screen
        overflow-x-clip
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${projectData.title} — ${projectData.category} Case Study`,
          description: projectData.description,
          url: new URL(`/projects/${projectData.slug}`, siteUrl).toString(),
          image: projectData.image
            ? new URL(projectData.image, siteUrl).toString()
            : undefined,
          dateCreated: project.year?.toString(),
          creator: {
            "@type": "Person",
            name: "Gonar.ui",
          },
          keywords: projectKeywords.join(", "),
          inLanguage: "en",
        }}
      />

      <ProjectHero project={projectData} />
      {Object.values(projectData.overview).every((value) => value.trim()) && (
        <ProjectOverview overview={projectData.overview} />
      )}
      {projectData.approach.length > 0 && (
        <ProjectApproach approach={projectData.approach} />
      )}
      {projectData.results.length > 0 && (
        <ProjectResults results={projectData.results} />
      )}

      <ProjectGallery
        images={projectData.gallery}
        title={projectData.title}
      />
      <ProjectCTA />
      <ProjectLiveButton url={projectData.liveUrl} />
    </main>
  );
}
