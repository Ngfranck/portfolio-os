
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
      "Une identité visuelle et une expérience digitale pensées pour construire une marque distinctive, cohérente et mémorable.",
    shortDescription:
      "Une identité visuelle et une expérience digitale pensées pour construire une marque distinctive et mémorable.",
    role: ["Brand Designer", "UI/UX Designer"],
    services: ["Brand Identity", "UI/UX Design", "Web Design"],
    image: "/images/projects/plumage/cover.png",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Plumage avait besoin d'une identité capable d'exprimer clairement sa personnalité tout en restant suffisamment flexible pour fonctionner sur différents supports.",
      challenge:
        "Le principal défi était de créer une présence visuelle distinctive tout en maintenant une expérience digitale simple, cohérente et facilement reconnaissable.",
      objective:
        "Construire un langage visuel cohérent et une expérience digitale capable de renforcer la perception de la marque à chaque point de contact.",
    },
    approach: [
      {
        number: "01",
        title: "Discover",
        description:
          "Comprendre la marque, son positionnement, son audience et les enjeux auxquels elle doit répondre.",
      },
      {
        number: "02",
        title: "Define",
        description:
          "Définir une direction visuelle claire et établir les principes qui guideront l'identité et l'expérience digitale.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Transformer la stratégie en un système visuel cohérent à travers l'identité, l'interface et les différents supports.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Affiner les détails, les interactions et les composants afin de créer une expérience finale plus précise et cohérente.",
      },
    ],
    results: [
      "Une identité visuelle plus distinctive.",
      "Un langage visuel cohérent sur les différents supports.",
      "Une expérience digitale plus claire et intuitive.",
      "Un système suffisamment flexible pour accompagner l'évolution de la marque.",
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
      "Une expérience digitale moderne pensée pour connecter identité de marque, tourisme et expérience utilisateur.",
    shortDescription:
      "Une expérience digitale moderne pensée pour connecter identité de marque, tourisme et expérience utilisateur.",
    role: ["Brand Designer", "UI/UX Designer"],
    services: ["Brand Identity", "UI/UX Design", "Web Design"],
    image: "/images/projects/safara/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Safara est une plateforme orientée tourisme qui cherche à créer une expérience digitale plus moderne autour de la découverte et de la réservation.",
      challenge:
        "Le défi consistait à rendre l'expérience suffisamment intuitive pour faciliter la découverte tout en construisant une identité visuelle forte et reconnaissable.",
      objective:
        "Créer une expérience digitale cohérente reliant l'identité de la marque, la découverte des destinations et les actions principales de l'utilisateur.",
    },
    approach: [
      {
        number: "01",
        title: "Research",
        description:
          "Identifier les besoins des utilisateurs et comprendre les principaux moments de l'expérience touristique.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Organiser les contenus et les parcours afin de rendre la navigation plus claire et naturelle.",
      },
      {
        number: "03",
        title: "Visual Design",
        description:
          "Développer une direction visuelle capable de traduire l'univers du voyage tout en restant moderne et fonctionnelle.",
      },
      {
        number: "04",
        title: "Experience",
        description:
          "Assembler les différents éléments dans une expérience digitale cohérente et orientée utilisateur.",
      },
    ],
    results: [
      "Une direction visuelle plus cohérente.",
      "Une hiérarchie de contenu plus claire.",
      "Une expérience de découverte plus fluide.",
      "Une identité digitale plus reconnaissable.",
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
      "Une expérience mobile dédiée à la gestion financière, pensée pour rendre les données complexes plus simples à comprendre.",
    shortDescription:
      "Une expérience mobile dédiée à la gestion financière, pensée pour rendre les données complexes plus simples à comprendre.",
    role: ["Product Designer", "UI/UX Designer"],
    services: ["UX Design", "UI Design", "Product Design"],
    image: "/images/projects/gestro/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Gestro est une expérience mobile dédiée à la gestion financière et à la compréhension des données personnelles.",
      challenge:
        "Les informations financières peuvent rapidement devenir complexes. L'enjeu était donc de présenter ces données de manière plus claire et accessible.",
      objective:
        "Concevoir une expérience mobile permettant de comprendre rapidement sa situation financière et de prendre de meilleures décisions.",
    },
    approach: [
      {
        number: "01",
        title: "Understand",
        description:
          "Comprendre les habitudes, les besoins et les difficultés rencontrées dans la gestion financière quotidienne.",
      },
      {
        number: "02",
        title: "Simplify",
        description:
          "Transformer des informations complexes en contenus simples, hiérarchisés et facilement compréhensibles.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Construire une interface claire autour des informations et actions les plus importantes.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Améliorer les interactions, les états et la hiérarchie visuelle afin de rendre l'expérience plus fluide.",
      },
    ],
    results: [
      "Une lecture plus claire des informations financières.",
      "Une hiérarchie visuelle mieux structurée.",
      "Une expérience mobile plus simple à comprendre.",
      "Une interface conçue autour des besoins prioritaires de l'utilisateur.",
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
      "Une plateforme digitale pensée pour simplifier la gestion des organisations, des collaborateurs et des opérations quotidiennes.",
    shortDescription:
      "Une expérience digitale conçue pour centraliser les opérations et rendre la gestion quotidienne plus claire et efficace.",
    role: ["Product Designer", "UI/UX Designer"],
    services: ["UX Design", "UI Design", "Product Design"],
    image: "/images/projects/nexma/cover.jpg",
    liveUrl: null,
    featured: true,
    overview: {
      context:
        "Nexma est une plateforme destinée à centraliser différents aspects de la gestion d'une organisation, notamment les collaborateurs, les contrats, le pointage, les tâches et certaines opérations internes.",
      challenge:
        "Le principal défi était de structurer un ensemble important d'informations et de fonctionnalités sans rendre l'expérience complexe pour les utilisateurs.",
      objective:
        "Créer une expérience produit claire et cohérente permettant aux utilisateurs de retrouver rapidement les informations importantes et d'effectuer leurs tâches quotidiennes avec moins de friction.",
    },
    approach: [
      {
        number: "01",
        title: "Understand",
        description:
          "Analyser les besoins des utilisateurs et comprendre les différents modules, rôles et flux nécessaires au fonctionnement de la plateforme.",
      },
      {
        number: "02",
        title: "Structure",
        description:
          "Organiser les informations, les modules et les parcours afin de créer une architecture claire et facilement navigable.",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Concevoir une interface cohérente à travers les différents modules en utilisant des composants et des patterns réutilisables.",
      },
      {
        number: "04",
        title: "Refine",
        description:
          "Affiner les interactions, les états, les tableaux et les détails d'interface afin d'améliorer la compréhension et l'efficacité du produit.",
      },
    ],
    results: [
      "Une structure produit plus claire.",
      "Une navigation mieux organisée entre les différents modules.",
      "Une interface cohérente à travers l'expérience.",
      "Un système conçu pour accompagner l'évolution du produit.",
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