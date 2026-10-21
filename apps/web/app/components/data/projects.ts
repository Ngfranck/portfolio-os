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
      "A distinctive visual identity and digital experience designed to make Plumage recognizable, coherent and memorable.",

    shortDescription:
      "A distinctive visual identity and cohesive digital experience for Plumage.",

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
        "Plumage needed an identity that could express its personality clearly while adapting naturally across digital and physical touchpoints.",

      challenge:
        "The challenge was to build a distinctive visual presence without compromising a simple, consistent and recognizable digital experience.",

      objective:
        "Create a cohesive visual language and digital experience that strengthens brand recognition at every touchpoint.",
    },

    approach: [
      {
        number: "01",
        title: "Discover",
        description:
          "Explore the brand, its positioning, its audience and the needs the identity must address.",
      },

      {
        number: "02",
        title: "Define",
        description:
          "Set a clear art direction and define the principles behind the brand identity and digital experience.",
      },

      {
        number: "03",
        title: "Design",
        description:
          "Translate the strategy into a consistent visual system across the identity, interface and brand materials.",
      },

      {
        number: "04",
        title: "Refine",
        description:
          "Refine the visual details, interactions and components to deliver a polished, cohesive experience.",
      },
    ],

    results: [
      "A distinctive visual identity that reflects the brand's personality.",
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

  /* =========================================================
     SAFARA
  ========================================================= */

  {
    slug: "safara",

    title: "Safara",

    category: "Brand & Digital",

    year: "2026",

    description:
      "Brand identity and UX/UI design for a travel platform, bringing destination discovery and trip planning into a clear digital experience.",

    shortDescription:
      "A travel platform connecting a distinctive brand identity with intuitive destination discovery and booking.",

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
        "Safara is a travel platform designed to make discovering destinations and planning trips more intuitive.",

      challenge:
        "The challenge was to simplify destination discovery while building a distinctive, recognizable visual identity.",

      objective:
        "Create a cohesive digital experience that connects the brand identity, destination discovery and key booking actions.",
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
      "Clearer content hierarchy across destination pages.",
      "A smoother journey from browsing destinations to taking action.",
      "A more recognizable and consistent digital brand experience.",
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
      "Mobile app UX/UI design for personal finance, making complex financial information easier to understand through clear hierarchy and intuitive interactions.",

    shortDescription:
      "A personal finance app that makes financial data clearer and easier to navigate.",

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
          "Understand users' habits, needs and pain points when managing day-to-day finances.",
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
          "Design a mobile interface around the most important financial insights and actions.",
      },

      {
        number: "04",
        title: "Refine",
        description:
          "Refine interaction patterns, interface states and visual hierarchy for a smoother experience.",
      },
    ],

    results: [
      "Financial information presented with greater clarity.",
      "A stronger visual hierarchy for key insights.",
      "A more intuitive mobile personal finance experience.",
      "Core interface flows shaped around everyday user needs.",
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
      "B2B SaaS product design for an operations platform, bringing employee management, contracts, attendance and daily tasks into a clear, consistent experience.",

    shortDescription:
      "A unified operations platform designed to make everyday business management clearer and more efficient.",

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
        "Nexma is a business operations platform that brings employee records, contracts, attendance, tasks and internal workflows into one product.",

      challenge:
        "The challenge was to organize a broad set of information and features without making the experience difficult to navigate.",

      objective:
        "Create a clear, consistent product experience that helps teams find essential information and complete routine tasks with less friction.",
    },

    approach: [
      {
        number: "01",
        title: "Understand",
        description:
          "Map user needs and understand the platform's modules, roles and essential business workflows.",
      },

      {
        number: "02",
        title: "Structure",
        description:
          "Organize information, modules and user flows into a clear, navigable product architecture.",
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
          "Refine interactions, states, data tables and interface details to improve usability and efficiency.",
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