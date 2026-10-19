import { Hero } from "./components/home/hero";

import { About } from "./components/home/about";

import { ProjectsSection } from "./components/projects-section";

import { ProcessSection } from "./components/home/process-section";

import { ServicesSection } from "./components/home/services";

import { WhyChooseMeSection } from "./components/home/why-choose-me-section";

import { ToolboxSection } from "./components/home/toolbox-section";

import { TestimonialsSection } from "./components/home/testimonials";

import { ContactSection } from "./components/home/contact-section";

import { Footer } from "./components/home/FooterSection";

import { getFeaturedProjects } from "../services/projects/project.service";

import { getFeaturedServices } from "../services/services/service.service";

import { getFeaturedTestimonials } from "../services/testimonials/testimonial.service";

import { getSiteSettings } from "../services/site-settings/site-settings.service";

export default async function HomePage() {
  const [
    projects,
    services,
    testimonials,
    settings,
  ] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedServices(),
    getFeaturedTestimonials(),
    getSiteSettings(),
  ]);

  const featuredProjects = projects.map((project) => ({
    slug: project.slug,

    title: project.title,

    category: project.category?.name ?? "Project",

    year: project.year?.toString() ?? "—",

    description:
      project.description ?? project.shortDescription,

    shortDescription: project.shortDescription,

    image: project.coverImage ?? "",

    services: project.services.map(
      ({ service }) => service.title,
    ),

    featured: project.featured,
  }));

  return (
    <main>
      <Hero
        siteName={settings.siteName}
        ownerName={settings.ownerName}
        siteTagline={settings.siteTagline}
        siteDescription={settings.siteDescription}
        isAvailableForProjects={
          settings.isAvailableForProjects
        }
      />

      <About
  settings={{
    linkedinUrl: settings.linkedinUrl,
    behanceUrl: settings.behanceUrl,
    instagramUrl: settings.instagramUrl,
  }}
/>

      <ProjectsSection projects={featuredProjects} />

      <ProcessSection />

      <ServicesSection services={services} />

      <WhyChooseMeSection />

      <ToolboxSection />

      <TestimonialsSection testimonials={testimonials} />

      <ContactSection settings={settings} />

      <Footer
  settings={{
    linkedinUrl: settings.linkedinUrl,
    behanceUrl: settings.behanceUrl,
    githubUrl: settings.githubUrl,
  }}
/>
    </main>
  );
}