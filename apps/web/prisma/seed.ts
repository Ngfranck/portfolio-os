
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const projects = [
  {
    slug: "plumage",
    title: "Plumage",
    category: "Brand Identity",
    year: 2026,
    description:
      "Brand identity and website design for Plumage, built around a distinctive visual system and a consistent digital experience.",
    shortDescription:
      "A distinctive brand identity and cohesive website design for Plumage.",
    role: ["Brand Designer", "UI/UX Designer"],
    services: ["Brand Identity", "UI/UX Design", "Web Design"],
    image: "/images/projects/plumage/cover.png",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Plumage needed a brand identity that expressed its personality clearly and could scale across digital and physical touchpoints.",
      challenge:
        "The challenge was to create a distinctive visual presence while keeping the digital experience simple, consistent, and easy to recognize.",
      objective:
        "Build a cohesive visual language and digital experience that strengthens brand recognition at every touchpoint.",
    },
    approach: [
      {
        number: "01",
        title: "Discover",
        description:
          "Explore the brand, its positioning, audience, and the needs the identity must address.",
      },
      {
        number: "02",
        title: "Define",
        description:
          "Set a clear art direction and establish principles for the brand identity and digital experience.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Translate the strategy into a consistent visual system across the identity, interface, and brand materials.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Refine the visual details, interactions, and components to deliver a polished, cohesive experience.",
      },
    ],
    results: [
      "A distinctive visual identity built around the brand's personality.",
      "A consistent visual language across digital and physical touchpoints.",
      "A clearer, more intuitive digital brand experience.",
      "A flexible identity system designed to grow with the brand.",
    ],
    gallery: [
      "/images/projects/plumage/01.png",
      "/images/projects/plumage/02.png",
      "/images/projects/plumage/03.png",
      "/images/projects/plumage/04.png",
    ],
  },

  {
    slug: "safara",
    title: "Safara",
    category: "Brand & Digital",
    year: 2026,
    description:
      "Brand identity and UX/UI design for a travel platform, creating a clear digital experience for discovering destinations and booking trips.",
    shortDescription:
      "A modern travel platform connecting brand identity with intuitive destination discovery and booking.",
    role: ["Brand Designer", "UI/UX Designer"],
    services: ["Brand Identity", "UI/UX Design", "Web Design"],
    image: "/images/projects/safara/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Safara is a travel platform designed to make discovering destinations and planning trips feel more intuitive.",
      challenge:
        "The challenge was to simplify destination discovery and trip planning while building a distinctive, recognizable visual identity.",
      objective:
        "Create a cohesive digital experience connecting the brand identity with destination discovery and key booking actions.",
    },
    approach: [
      {
        number: "01",
        title: "Research",
        description:
          "Identify traveler needs and map the most important moments in the trip-planning journey.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Organize content and user flows to make navigation clear and destination discovery effortless.",
      },
      {
        number: "03",
        title: "Visual Design",
        description:
          "Develop a modern, functional visual direction that captures the spirit of travel.",
      },
      {
        number: "04",
        title: "Experience",
        description:
          "Bring the brand and user flows together in a consistent, user-centered digital experience.",
      },
    ],
    results: [
      "A distinctive visual identity tailored to the travel experience.",
      "Clearer content hierarchy across the destination pages.",
      "A smoother path from browsing destinations to taking action.",
      "A consistent digital brand experience across the platform.",
    ],
    gallery: [
      "/images/projects/safara/01.jpg",
      "/images/projects/safara/02.jpg",
      "/images/projects/safara/03.jpg",
      "/images/projects/safara/04.jpg",
    ],
  },

  {
    slug: "gestro",
    title: "Gestro",
    category: "Product Design",
    year: 2026,
    description:
      "Mobile app UX/UI design for personal finance, making complex financial data easier to understand through clear information architecture and intuitive interactions.",
    shortDescription:
      "A personal finance app designed to make financial data clearer and easier to navigate.",
    role: ["Product Designer", "UI/UX Designer"],
    services: ["UX Design", "UI Design", "Product Design"],
    image: "/images/projects/gestro/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Gestro is a personal finance app that helps people understand and manage their financial data on mobile.",
      challenge:
        "Financial information can feel complex and overwhelming, so the interface needed to make key figures easier to understand and act on.",
      objective:
        "Design a mobile experience that helps people understand their financial position and make informed everyday decisions.",
    },
    approach: [
      {
        number: "01",
        title: "Understand",
        description:
          "Understand users' habits, needs, and pain points when managing day-to-day finances.",
      },
      {
        number: "02",
        title: "Simplify",
        description:
          "Turn complex financial data into clear, prioritized information that is easy to scan.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Design a mobile interface focused on the most important financial insights and actions.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Refine interaction patterns, interface states, and visual hierarchy for a smoother experience.",
      },
    ],
    results: [
      "Financial information presented with greater clarity.",
      "A stronger visual hierarchy for key insights.",
      "A more intuitive mobile personal finance experience.",
      "Core interface flows shaped around users' everyday needs.",
    ],
    gallery: [
      "/images/projects/gestro/01.jpg",
      "/images/projects/gestro/02.jpg",
      "/images/projects/gestro/03.jpg",
      "/images/projects/gestro/04.jpg",
    ],
  },

  {
    slug: "nexma",
    title: "Nexma",
    category: "Product Design",
    year: 2026,
    description:
      "B2B SaaS product design for an operations platform, bringing employee management, contracts, attendance, and daily tasks into a clear, consistent experience.",
    shortDescription:
      "A unified operations platform designed to make everyday business management clearer and more efficient.",
    role: ["Product Designer", "UI/UX Designer"],
    services: ["UX Design", "UI Design", "Product Design"],
    image: "/images/projects/nexma/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Nexma is a business operations platform bringing together employee records, contracts, attendance, tasks, and internal workflows.",
      challenge:
        "The challenge was to organize a broad set of tools and information without making everyday workflows feel complicated.",
      objective:
        "Create a clear, consistent product experience that helps teams find essential information and complete routine tasks with less friction.",
    },
    approach: [
      {
        number: "01",
        title: "Understand",
        description:
          "Map user needs and understand the platform's modules, roles, and essential business workflows.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Organize information, modules, and user flows into a clear and navigable product architecture.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Create a cohesive interface across product modules with reusable components and interaction patterns.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Refine interactions, states, data tables, and interface details to improve usability and efficiency.",
      },
    ],
    results: [
      "A clearer structure for a multi-module operations platform.",
      "More intuitive navigation between everyday business workflows.",
      "A consistent interface across the product experience.",
      "A scalable design system ready to support future product growth.",
    ],
    gallery: [
      "/images/projects/nexma/01.jpg",
      "/images/projects/nexma/02.jpg",
      "/images/projects/nexma/03.jpg",
      "/images/projects/nexma/04.jpg",
    ],
  },
];

const articles: Array<{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  cover: string;
  featured?: boolean;
  content: Prisma.InputJsonValue;
}> = [
  {
    slug: "building-design-systems-that-scale",
    title: "Building design systems that actually scale",
    excerpt:
      "A design system is more than a collection of components. It's a shared language that helps products evolve consistently over time.",
    category: "Design Systems",
    publishedAt: "2026-08-01",
    readTime: "8 min read",
    cover: "/images/articles/design-system.jpg",
    featured: true,
    content: [
      {
        type: "paragraph",
        text:
          "A design system should not simply be a collection of buttons, inputs and components. Its real purpose is to create a common language between designers, developers and product teams.",
      },
      {
        type: "heading",
        text: "Start with principles",
      },
      {
        type: "paragraph",
        text:
          "Before creating hundreds of components, establish a small set of principles that define how the product should look, feel and behave. These principles become the foundation for every future decision.",
      },
      {
        type: "paragraph",
        text:
          "When the system grows, these principles help teams make decisions without constantly having to reinvent the interface.",
      },
      {
        type: "heading",
        text: "Components are only one layer",
      },
      {
        type: "paragraph",
        text:
          "A scalable design system combines foundations, components, patterns and guidelines. Typography, spacing, colors and motion should work together as a coherent visual language.",
      },
      {
        type: "paragraph",
        text:
          "The goal is not to remove creativity from the design process. Instead, the system should remove unnecessary repetition so designers can spend more time solving meaningful problems.",
      },
      {
        type: "heading",
        text: "Design for collaboration",
      },
      {
        type: "paragraph",
        text:
          "A design system becomes significantly more valuable when the entire team can understand and contribute to it. Naming conventions, documentation and clear ownership are therefore just as important as the visual components themselves.",
      },
      {
        type: "heading",
        text: "Keep the system evolving",
      },
      {
        type: "paragraph",
        text:
          "A good design system is never really finished. Products evolve, user needs change and new patterns emerge. The system should therefore be treated as a living product rather than a static library.",
      },
      {
        type: "paragraph",
        text:
          "The best systems create enough structure to maintain consistency while remaining flexible enough to support new ideas.",
      },
    ],
  },

  {
    slug: "designing-better-digital-products",
    title:
      "Designing better digital products starts with better questions",
    excerpt:
      "Before designing interfaces, understanding the real problem can completely change the direction of a product.",
    category: "Product Design",
    publishedAt: "2026-07-01",
    readTime: "6 min read",
    cover: "/images/articles/product-design.jpg",
    content: [
      {
        type: "paragraph",
        text:
          "Good product design starts long before the first wireframe. The quality of the questions we ask often determines the quality of the solution we eventually create.",
      },
      {
        type: "heading",
        text: "Understand the real problem",
      },
      {
        type: "paragraph",
        text:
          "A request such as 'we need a dashboard' is not necessarily the problem. It is a proposed solution. The designer's responsibility is to understand what users actually need to accomplish.",
      },
      {
        type: "heading",
        text: "Design around outcomes",
      },
      {
        type: "paragraph",
        text:
          "Interfaces become more useful when they are designed around user outcomes instead of isolated screens. Every interaction should have a clear purpose.",
      },
    ],
  },

  {
    slug: "brand-identity-digital-products",
    title: "Why brand identity matters beyond the logo",
    excerpt:
      "A strong brand identity creates consistency across every interaction, from the first visual impression to the product experience.",
    category: "Branding",
    publishedAt: "2026-06-01",
    readTime: "7 min read",
    cover: "/images/articles/brand-identity.jpg",
    content: [
      {
        type: "paragraph",
        text:
          "A logo is only one element of a brand identity. A strong identity should influence the entire experience people have with a company.",
      },
      {
        type: "heading",
        text: "Identity becomes experience",
      },
      {
        type: "paragraph",
        text:
          "Typography, color, imagery, tone of voice and interaction design all contribute to the way a brand is perceived.",
      },
      {
        type: "heading",
        text: "Consistency builds recognition",
      },
      {
        type: "paragraph",
        text:
          "When these elements work together consistently, users begin to recognize the brand without necessarily seeing its logo.",
      },
    ],
  },

  {
    slug: "balancing-design-and-technology",
    title: "Finding the balance between design and technology",
    excerpt:
      "Understanding both design and technical constraints helps create more realistic and meaningful digital experiences.",
    category: "Design & Technology",
    publishedAt: "2026-05-01",
    readTime: "5 min read",
    cover: "/images/articles/design-technology.jpg",
    content: [
      {
        type: "paragraph",
        text:
          "Design and technology are often treated as separate disciplines, but the strongest digital products are created when both work together.",
      },
      {
        type: "heading",
        text: "Design with constraints in mind",
      },
      {
        type: "paragraph",
        text:
          "Technical constraints are not necessarily limitations. They can help designers discover simpler and more effective solutions.",
      },
      {
        type: "heading",
        text: "Collaboration improves the result",
      },
      {
        type: "paragraph",
        text:
          "When designers and developers collaborate early, problems can be identified before they become expensive to solve.",
      },
    ],
  },
];

// Compétences disponibles dans l'éditeur de projets.
const skills = [
  // DESIGN
  {
    name: "UX Research",
    slug: "ux-research",
    type: "DESIGN",
    description:
      "Recherche utilisateur et analyse des besoins.",
    featured: true,
    sortOrder: 0,
  },
  {
    name: "User Journey Mapping",
    slug: "user-journey-mapping",
    type: "DESIGN",
    description:
      "Cartographie des parcours utilisateurs.",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Architecture de l'information",
    slug: "architecture-information",
    type: "DESIGN",
    description:
      "Organisation et structuration des contenus.",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Wireframing",
    slug: "wireframing",
    type: "DESIGN",
    description:
      "Conception de structures d'interfaces.",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Prototypage",
    slug: "prototypage",
    type: "DESIGN",
    description:
      "Création de prototypes interactifs.",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "UI Design",
    slug: "ui-design",
    type: "DESIGN",
    description:
      "Conception d'interfaces utilisateur.",
    featured: true,
    sortOrder: 5,
  },
  {
    name: "Interaction Design",
    slug: "interaction-design",
    type: "DESIGN",
    description:
      "Conception des interactions et des comportements.",
    featured: true,
    sortOrder: 6,
  },
  {
    name: "Design System",
    slug: "design-system",
    type: "DESIGN",
    description:
      "Création et maintenance de systèmes de design.",
    featured: true,
    sortOrder: 7,
  },
  {
    name: "Responsive Design",
    slug: "responsive-design",
    type: "DESIGN",
    description:
      "Conception d'interfaces adaptatives.",
    featured: true,
    sortOrder: 8,
  },
  {
    name: "Accessibilité numérique",
    slug: "accessibilite-numerique",
    type: "DESIGN",
    description:
      "Conception d'interfaces accessibles.",
    featured: true,
    sortOrder: 9,
  },
  {
    name: "Identité visuelle",
    slug: "identite-visuelle",
    type: "DESIGN",
    description:
      "Création d'identités visuelles cohérentes.",
    featured: true,
    sortOrder: 10,
  },
  {
    name: "Product Design",
    slug: "product-design",
    type: "DESIGN",
    description:
      "Conception globale de produits numériques.",
    featured: true,
    sortOrder: 11,
  },

  // DEVELOPMENT
  {
    name: "HTML & CSS",
    slug: "html-css",
    type: "DEVELOPMENT",
    description:
      "Structure et mise en forme des interfaces web.",
    featured: true,
    sortOrder: 12,
  },
  {
    name: "JavaScript",
    slug: "javascript",
    type: "DEVELOPMENT",
    description:
      "Développement des interactions web.",
    featured: false,
    sortOrder: 13,
  },
  {
    name: "TypeScript",
    slug: "typescript",
    type: "DEVELOPMENT",
    description:
      "Développement JavaScript avec typage statique.",
    featured: false,
    sortOrder: 14,
  },
  {
    name: "Next.js",
    slug: "nextjs",
    type: "DEVELOPMENT",
    description:
      "Développement d'applications web avec Next.js.",
    featured: true,
    sortOrder: 15,
  },

  // TOOLS
  {
    name: "Figma",
    slug: "figma",
    type: "TOOL",
    description:
      "Conception d'interfaces et prototypage.",
    featured: true,
    sortOrder: 16,
  },
  {
    name: "FigJam",
    slug: "figjam",
    type: "TOOL",
    description:
      "Collaboration, ateliers et idéation.",
    featured: true,
    sortOrder: 17,
  },
  {
    name: "Adobe Illustrator",
    slug: "adobe-illustrator",
    type: "TOOL",
    description:
      "Création graphique et illustration vectorielle.",
    featured: true,
    sortOrder: 18,
  },
  {
    name: "Adobe Photoshop",
    slug: "adobe-photoshop",
    type: "TOOL",
    description:
      "Retouche et composition d'images.",
    featured: false,
    sortOrder: 19,
  },
  {
    name: "Framer",
    slug: "framer",
    type: "TOOL",
    description:
      "Conception et publication de sites web.",
    featured: true,
    sortOrder: 20,
  },
] satisfies Prisma.SkillCreateInput[];

async function seed() {
  console.log("🌱 Starting database seed...");

  for (const projectData of projects) {
    console.log(`\n→ Seeding project: ${projectData.title}`);

    const categorySlug = projectData.category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");

    const category = await prisma.category.upsert({
      where: {
        slug: categorySlug,
      },
      update: {
        name: projectData.category,
      },
      create: {
        name: projectData.category,
        slug: categorySlug,
      },
    });

    const serviceRecords = [];

    for (const serviceName of projectData.services) {
      const serviceSlug = serviceName
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\//g, "-")
        .replace(/\s+/g, "-");

      const service = await prisma.service.upsert({
        where: {
          slug: serviceSlug,
        },
        update: {
          title: serviceName,
        },
        create: {
          title: serviceName,
          slug: serviceSlug,
          shortDescription: serviceName,
          featured: true,
        },
      });

      serviceRecords.push(service);
    }

    const project = await prisma.project.upsert({
      where: {
        slug: projectData.slug,
      },

      update: {
        title: projectData.title,
        shortDescription: projectData.shortDescription,
        description: projectData.description,
        client: null,
        year: projectData.year,
        duration: null,
        status: "PUBLISHED",
        featured: projectData.featured,
        coverImage: projectData.image,
        liveUrl: projectData.liveUrl,
        caseStudyUrl: null,
        categoryId: category.id,

        overview: {
          upsert: {
            create: {
              context: projectData.overview.context,
              challenge: projectData.overview.challenge,
              objective: projectData.overview.objective,
            },
            update: {
              context: projectData.overview.context,
              challenge: projectData.overview.challenge,
              objective: projectData.overview.objective,
            },
          },
        },

        roles: {
          deleteMany: {},
          create: projectData.role.map((role, index) => ({
            title: role,
            sortOrder: index,
          })),
        },

        services: {
          deleteMany: {},
          create: serviceRecords.map((service, index) => ({
            serviceId: service.id,
            sortOrder: index,
          })),
        },

        approach: {
          deleteMany: {},
          create: projectData.approach.map((item, index) => ({
            number: item.number,
            title: item.title,
            description: item.description,
            sortOrder: index,
          })),
        },

        results: {
          deleteMany: {},
          create: projectData.results.map((result, index) => ({
            content: result,
            sortOrder: index,
          })),
        },

        images: {
          deleteMany: {},
          create: projectData.gallery.map((url, index) => ({
            url,
            alt: `${projectData.title} — image ${index + 1}`,
            title: projectData.title,
            sortOrder: index,
          })),
        },
      },

      create: {
        title: projectData.title,
        slug: projectData.slug,
        shortDescription: projectData.shortDescription,
        description: projectData.description,
        client: null,
        year: projectData.year,
        duration: null,
        status: "PUBLISHED",
        featured: projectData.featured,
        coverImage: projectData.image,
        liveUrl: projectData.liveUrl,
        caseStudyUrl: null,
        categoryId: category.id,

        overview: {
          create: {
            context: projectData.overview.context,
            challenge: projectData.overview.challenge,
            objective: projectData.overview.objective,
          },
        },

        roles: {
          create: projectData.role.map((role, index) => ({
            title: role,
            sortOrder: index,
          })),
        },

        services: {
          create: serviceRecords.map((service, index) => ({
            serviceId: service.id,
            sortOrder: index,
          })),
        },

        approach: {
          create: projectData.approach.map((item, index) => ({
            number: item.number,
            title: item.title,
            description: item.description,
            sortOrder: index,
          })),
        },

        results: {
          create: projectData.results.map((result, index) => ({
            content: result,
            sortOrder: index,
          })),
        },

        images: {
          create: projectData.gallery.map((url, index) => ({
            url,
            alt: `${projectData.title} — image ${index + 1}`,
            title: projectData.title,
            sortOrder: index,
          })),
        },
      },
    });

    console.log(`  ✓ ${project.title} seeded successfully`);
  }

  for (const articleData of articles) {
    console.log(`\n→ Seeding article: ${articleData.title}`);

    const categorySlug = articleData.category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, "-");

    const category = await prisma.category.upsert({
      where: {
        slug: categorySlug,
      },
      update: {
        name: articleData.category,
      },
      create: {
        name: articleData.category,
        slug: categorySlug,
      },
    });

    const article = await prisma.article.upsert({
      where: {
        slug: articleData.slug,
      },

      update: {
        title: articleData.title,
        excerpt: articleData.excerpt,
        content: articleData.content,
        coverImage: articleData.cover,
        readTime: articleData.readTime,
        status: "PUBLISHED",
        featured: articleData.featured ?? false,
        publishedAt: new Date(articleData.publishedAt),
        categoryId: category.id,
      },

      create: {
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        coverImage: articleData.cover,
        readTime: articleData.readTime,
        status: "PUBLISHED",
        featured: articleData.featured ?? false,
        publishedAt: new Date(articleData.publishedAt),
        categoryId: category.id,
      },
    });

    console.log(`  ✓ ${article.title} seeded successfully`);
  }

  // Initialisation des compétences
  console.log("\n→ Seeding skills...");

  for (const skillData of skills) {
    const skill = await prisma.skill.upsert({
      where: {
        slug: skillData.slug,
      },
      update: {
        name: skillData.name,
        type: skillData.type,
        description: skillData.description,
        featured: skillData.featured,
        sortOrder: skillData.sortOrder,
      },
      create: {
        name: skillData.name,
        slug: skillData.slug,
        type: skillData.type,
        description: skillData.description,
        featured: skillData.featured,
        sortOrder: skillData.sortOrder,
      },
    });

    console.log(`  ✓ ${skill.name} seeded successfully`);
  }

  console.log("\n✅ Database seed completed successfully.");
}

seed()
  .catch((error) => {
    console.error("\n❌ Database seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });