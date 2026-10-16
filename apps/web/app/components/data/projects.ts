export type ProjectApproach = {
  number: string;
  title: string;
  description: string;
};

export type ProjectOverview = {
  context: string;
  challenge: string;
  objective: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;

  description: string;
  shortDescription: string;

  role: string[];
  services: string[];

  image: string;
  liveUrl?: string;

  featured?: boolean;

  overview: ProjectOverview;

  approach: ProjectApproach[];

  results: string[];

  gallery: string[];
};

export const projects: Project[] = [
  /* =========================================================
     PLUMAGE
  ========================================================= */

  {
    slug: "plumage",

    title: "Plumage",

    category: "Brand Identity",

    year: "2026",

    description:
      "Une identité visuelle et une expérience digitale pensées pour construire une marque distinctive, cohérente et mémorable.",

    shortDescription:
      "Une identité visuelle et une expérience digitale pensées pour construire une marque distinctive et mémorable.",

    role: [
      "Brand Designer",
      "UI/UX Designer",
    ],

    services: [
      "Brand Identity",
      "UI/UX Design",
      "Web Design",
    ],

    image: "/images/projects/plumage/cover.png",

    liveUrl: "",

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

  /* =========================================================
     SAFARA
  ========================================================= */

  {
    slug: "safara",

    title: "Safara",

    category: "Brand & Digital",

    year: "2026",

    description:
      "Une expérience digitale moderne pensée pour connecter identité de marque, tourisme et expérience utilisateur.",

    shortDescription:
      "Une expérience digitale moderne pensée pour connecter identité de marque, tourisme et expérience utilisateur.",

    role: [
      "Brand Designer",
      "UI/UX Designer",
    ],

    services: [
      "Brand Identity",
      "UI/UX Design",
      "Web Design",
    ],

    image: "/images/projects/safara/cover.jpg",

    liveUrl: "",

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

  /* =========================================================
     GESTRO
  ========================================================= */

  {
    slug: "gestro",

    title: "Gestro",

    category: "Product Design",

    year: "2026",

    description:
      "Une expérience mobile dédiée à la gestion financière, pensée pour rendre les données complexes plus simples à comprendre.",

    shortDescription:
      "Une expérience mobile dédiée à la gestion financière, pensée pour rendre les données complexes plus simples à comprendre.",

    role: [
      "Product Designer",
      "UI/UX Designer",
    ],

    services: [
      "UX Design",
      "UI Design",
      "Product Design",
    ],

    image: "/images/projects/gestro/cover.jpg",

    liveUrl: "",

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

  /* =========================================================
     NEXMA
  ========================================================= */

  {
    slug: "nexma",

    title: "Nexma",

    category: "Product Design",

    year: "2026",

    description:
      "Une plateforme digitale pensée pour simplifier la gestion des organisations, des collaborateurs et des opérations quotidiennes.",

    shortDescription:
      "Une expérience digitale conçue pour centraliser les opérations et rendre la gestion quotidienne plus claire et efficace.",

    role: [
      "Product Designer",
      "UI/UX Designer",
    ],

    services: [
      "UX Design",
      "UI Design",
      "Product Design",
    ],

    image: "/images/projects/nexma/cover.jpg",

    liveUrl: "",

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