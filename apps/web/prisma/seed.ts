
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
    readTime: "5 min read",
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
      {
        type: "heading",
        text: "Build around real product work",
      },
      {
        type: "paragraph",
        text:
          "Start with the screens, tasks and patterns a product team uses every day. Look for repeated decisions: form fields, navigation, data tables, empty states and feedback messages. These patterns are strong candidates for shared components because they solve a recurring problem rather than adding abstraction for its own sake.",
      },
      {
        type: "paragraph",
        text:
          "Prioritize by frequency, impact and consistency. A component used across several critical journeys is usually more valuable than a rarely used visual detail. This keeps the system focused on work that improves both product quality and team efficiency.",
      },
      {
        type: "heading",
        text: "Document decisions, not just components",
      },
      {
        type: "paragraph",
        text:
          "Useful documentation explains when to use a pattern, what problem it solves, how it behaves and which accessibility considerations matter. Include examples of correct usage and edge cases. Clear guidance helps teams make consistent choices without turning the system into a set of rigid rules.",
      },
      {
        type: "heading",
        text: "Create a sustainable contribution model",
      },
      {
        type: "paragraph",
        text:
          "A design system stays relevant when product teams can propose improvements and understand how decisions are made. Define who reviews contributions, how changes are tested and how updates are communicated. Treat feedback as part of maintenance, not as an exception to the process.",
      },
      {
        type: "paragraph",
        text:
          "A scalable design system is ultimately a product in its own right. When its principles, components and governance respond to real team needs, it supports faster delivery without sacrificing accessibility, craft or a coherent brand experience.",
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
    readTime: "4 min read",
    cover: "/images/articles/product-design.jpg",
    content: [
      {
        type: "paragraph",
        text:
          "Good product design starts long before the first wireframe. The quality of the questions we ask often determines the quality of the solution we eventually create.",
      },
      {
        type: "heading",
        text: "Separate the problem from the proposed solution",
      },
      {
        type: "paragraph",
        text:
          "A request such as 'we need a dashboard' is a starting point, not a complete problem statement. Ask what decision the dashboard should support, who needs that information and what currently makes the task difficult. The answers may reveal that a dashboard is useful—or that a simpler workflow would solve the problem better.",
      },
      {
        type: "heading",
        text: "Understand the context and constraints",
      },
      {
        type: "paragraph",
        text:
          "Good discovery considers user goals alongside product, business and technical realities. Review existing journeys, customer feedback, support requests and available analytics. Speak with people who use or operate the product whenever possible. This evidence helps separate recurring needs from assumptions based on a single opinion.",
      },
      {
        type: "paragraph",
        text:
          "Constraints are part of the design brief. A project may have a fixed launch date, an existing design system, regulatory requirements or limited engineering capacity. Naming those conditions early makes it easier to prioritize the essential experience and choose a solution the team can realistically deliver.",
      },
      {
        type: "heading",
        text: "Frame the opportunity clearly",
      },
      {
        type: "paragraph",
        text:
          "Turn what you learn into a concise problem statement. Describe who is experiencing the issue, what they are trying to achieve, what gets in their way and why addressing it matters. A strong statement gives the team a shared focus without prescribing the interface too early.",
      },
      {
        type: "paragraph",
        text:
          "Then define what a useful outcome would look like. Depending on the project, that could mean a task is easier to complete, information is easier to find or a user understands the next step with less uncertainty. Keep the intended outcome specific enough to guide design and evaluation.",
      },
      {
        type: "heading",
        text: "Explore and validate before polishing",
      },
      {
        type: "paragraph",
        text:
          "Use sketches, flows or low-fidelity wireframes to compare possible approaches before investing in detailed visuals. Share those concepts with stakeholders and, when practical, test them with representative users. Early feedback is less costly to act on and can expose missing assumptions while the design is still flexible.",
      },
      {
        type: "paragraph",
        text:
          "Better questions do not slow down product design. They help teams spend their effort on the right problem, make clearer trade-offs and build digital products around outcomes that matter to both users and the business.",
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
    readTime: "4 min read",
    cover: "/images/articles/brand-identity.jpg",
    content: [
      {
        type: "paragraph",
        text:
          "A logo is one recognizable part of a brand identity, but it cannot carry the whole experience on its own. People encounter a brand through its website, product interface, social content, sales materials and customer communications. A coherent identity connects those moments and makes the organization easier to recognize and understand.",
      },
      {
        type: "heading",
        text: "Build a system, not a collection of assets",
      },
      {
        type: "paragraph",
        text:
          "A practical visual identity brings together typography, color, imagery, graphic elements and art direction. These components need clear relationships and rules so the brand can adapt to different formats without losing its character. A flexible system gives a team enough consistency to build recognition and enough room to respond to context.",
      },
      {
        type: "heading",
        text: "Connect visual identity to the digital product",
      },
      {
        type: "paragraph",
        text:
          "The interface is a major brand touchpoint. Type scales, spacing, buttons, iconography, illustration and interaction states should feel related to the broader identity. When brand direction and UX/UI design are considered together, the product feels intentional rather than like a generic interface carrying a logo.",
      },
      {
        type: "paragraph",
        text:
          "That connection should support usability. Brand expression cannot come at the expense of readable text, clear hierarchy, accessible contrast or familiar interaction patterns. The strongest digital identities make the experience distinctive while helping people understand where they are and what they can do.",
      },
      {
        type: "heading",
        text: "Make consistency easy to maintain",
      },
      {
        type: "paragraph",
        text:
          "Brand guidelines should answer practical questions: which logo version fits a format, how colors are paired, how imagery is selected and how layouts behave at different sizes. Shared design tokens and reusable components can carry those decisions into websites and digital products, reducing visual drift as the experience grows.",
      },
      {
        type: "paragraph",
        text:
          "Consistency is not about making every touchpoint identical. It is about creating enough shared signals that each interaction feels like part of the same brand. A well-designed visual identity system helps teams communicate with clarity, earn recognition over time and deliver a more cohesive customer experience.",
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
    readTime: "4 min read",
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
          "Technical constraints are not necessarily barriers to good design. Understanding a product's platform, integrations, performance requirements and implementation effort helps a designer explore solutions that are both useful and achievable. A constraint can even reveal an opportunity to simplify a workflow or remove an unnecessary step.",
      },
      {
        type: "heading",
        text: "Bring design and engineering together early",
      },
      {
        type: "paragraph",
        text:
          "When designers and developers work together during discovery and exploration, they can identify dependencies before they become expensive to resolve. Engineers can explain how existing systems behave; designers can clarify user goals and interaction intent. Those perspectives improve decisions before the interface is fully polished.",
      },
      {
        type: "paragraph",
        text:
          "Shared artifacts make the collaboration concrete. User flows explain how screens connect, prototypes communicate timing and behavior, and component libraries show which patterns already exist. Short design reviews help the team surface edge cases such as loading, empty, error and responsive states.",
      },
      {
        type: "heading",
        text: "Treat implementation as part of the experience",
      },
      {
        type: "paragraph",
        text:
          "A design is not finished when a mockup is approved. During implementation, review the interface in its real environment, compare it with the intended behavior and discuss necessary trade-offs. This feedback loop helps preserve the visual hierarchy, accessibility and usability that informed the original concept.",
      },
      {
        type: "paragraph",
        text:
          "The best digital experiences come from a shared understanding of the problem and a respectful partnership between disciplines. When design and technology inform each other throughout the process, teams can deliver work that is thoughtful, feasible and valuable to the people who use it.",
      },
    ],
  },
];

// Skills available in the project editor.
const skills = [
  // DESIGN
  {
    name: "UX Research",
    slug: "ux-research",
    type: "DESIGN",
    description:
      "Researching user needs, behaviors and pain points to inform product decisions.",
    featured: true,
    sortOrder: 0,
  },
  {
    name: "User Journey Mapping",
    slug: "user-journey-mapping",
    type: "DESIGN",
    description:
      "Mapping end-to-end user journeys to reveal friction and design opportunities.",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Information Architecture",
    slug: "architecture-information",
    type: "DESIGN",
    description:
      "Organizing content and product information so people can find what they need.",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Wireframing",
    slug: "wireframing",
    type: "DESIGN",
    description:
      "Structuring screen layouts and interface wireframes around user needs.",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Prototyping",
    slug: "prototypage",
    type: "DESIGN",
    description:
      "Building interactive prototypes to communicate and validate design concepts.",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "UI Design",
    slug: "ui-design",
    type: "DESIGN",
    description:
      "Designing clear, accessible and consistent user interfaces.",
    featured: true,
    sortOrder: 5,
  },
  {
    name: "Interaction Design",
    slug: "interaction-design",
    type: "DESIGN",
    description:
      "Designing meaningful interactions, feedback and interface behavior.",
    featured: true,
    sortOrder: 6,
  },
  {
    name: "Design System",
    slug: "design-system",
    type: "DESIGN",
    description:
      "Creating and maintaining reusable design systems for product teams.",
    featured: true,
    sortOrder: 7,
  },
  {
    name: "Responsive Design",
    slug: "responsive-design",
    type: "DESIGN",
    description:
      "Designing interfaces that adapt clearly and consistently across screen sizes and devices.",
    featured: true,
    sortOrder: 8,
  },
  {
    name: "Digital Accessibility",
    slug: "accessibilite-numerique",
    type: "DESIGN",
    description:
      "Applying accessibility principles to make digital experiences usable by more people.",
    featured: true,
    sortOrder: 9,
  },
  {
    name: "Visual Identity",
    slug: "identite-visuelle",
    type: "DESIGN",
    description:
      "Building distinctive, cohesive visual identities across brand touchpoints.",
    featured: true,
    sortOrder: 10,
  },
  {
    name: "Product Design",
    slug: "product-design",
    type: "DESIGN",
    description:
      "Connecting strategy, UX and UI to shape coherent digital products.",
    featured: true,
    sortOrder: 11,
  },

  // DEVELOPMENT
  {
    name: "HTML & CSS",
    slug: "html-css",
    type: "DEVELOPMENT",
    description:
      "Structuring web content and styling responsive user interfaces.",
    featured: true,
    sortOrder: 12,
  },
  {
    name: "JavaScript",
    slug: "javascript",
    type: "DEVELOPMENT",
    description:
      "Building interactive behavior and dynamic experiences for the web.",
    featured: false,
    sortOrder: 13,
  },
  {
    name: "TypeScript",
    slug: "typescript",
    type: "DEVELOPMENT",
    description:
      "Writing maintainable JavaScript with static type checking.",
    featured: false,
    sortOrder: 14,
  },
  {
    name: "Next.js",
    slug: "nextjs",
    type: "DEVELOPMENT",
    description:
      "Building modern web applications with the Next.js framework.",
    featured: true,
    sortOrder: 15,
  },

  // TOOLS
  {
    name: "Figma",
    slug: "figma",
    type: "TOOL",
    description:
      "Designing user interfaces and creating interactive prototypes.",
    featured: true,
    sortOrder: 16,
  },
  {
    name: "FigJam",
    slug: "figjam",
    type: "TOOL",
    description:
      "Facilitating collaboration, workshops and early-stage ideation.",
    featured: true,
    sortOrder: 17,
  },
  {
    name: "Adobe Illustrator",
    slug: "adobe-illustrator",
    type: "TOOL",
    description:
      "Creating visual assets, brand graphics and vector illustrations.",
    featured: true,
    sortOrder: 18,
  },
  {
    name: "Adobe Photoshop",
    slug: "adobe-photoshop",
    type: "TOOL",
    description:
      "Editing and compositing images for polished visual communication.",
    featured: false,
    sortOrder: 19,
  },
  {
    name: "Framer",
    slug: "framer",
    type: "TOOL",
    description:
      "Designing and publishing responsive websites.",
    featured: true,
    sortOrder: 20,
  },
] satisfies Prisma.SkillCreateInput[];

const serviceDescriptions: Record<
  string,
  { shortDescription: string; description: string }
> = {
  "Brand Identity": {
    shortDescription:
      "Distinctive visual identity systems that make your brand recognizable and consistent.",
    description:
      "Brand strategy, art direction, logo design and visual guidelines shaped into a flexible identity system for digital and physical touchpoints.",
  },
  "UI/UX Design": {
    shortDescription:
      "User-centered digital experiences that make complex tasks clear and intuitive.",
    description:
      "Research, information architecture, user flows, wireframes and interface design that connect user needs with clear product goals.",
  },
  "Web Design": {
    shortDescription:
      "Responsive websites with clear structure, strong visual direction and purposeful calls to action.",
    description:
      "Strategy-led website design that brings brand identity, responsive layouts, accessible interactions and content hierarchy together.",
  },
  "UX Design": {
    shortDescription:
      "Research-backed user journeys and product flows designed around real needs.",
    description:
      "User research, journey mapping, information architecture and usability-focused flows that reduce friction across digital products.",
  },
  "UI Design": {
    shortDescription:
      "Polished, accessible interfaces that make digital products easier to use.",
    description:
      "High-fidelity interface design, interaction states, responsive layouts and reusable components for consistent product experiences.",
  },
  "Product Design": {
    shortDescription:
      "End-to-end digital product design connecting strategy, user experience and interface craft.",
    description:
      "Product discovery, UX architecture, interface design and scalable design systems focused on meaningful user and business outcomes.",
  },
};

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
      const serviceCopy = serviceDescriptions[serviceName] ?? {
        shortDescription: `${serviceName} designed with clarity, consistency and your audience in mind.`,
        description: `${serviceName} shaped around your brand, user needs and project goals, with considered visual direction and a clear, practical outcome.`,
      };

      const service = await prisma.service.upsert({
        where: {
          slug: serviceSlug,
        },
        update: {
          title: serviceName,
          shortDescription: serviceCopy.shortDescription,
          description: serviceCopy.description,
        },
        create: {
          title: serviceName,
          slug: serviceSlug,
          shortDescription: serviceCopy.shortDescription,
          description: serviceCopy.description,
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
            alt: `${projectData.title} design case study image ${index + 1}`,
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
            alt: `${projectData.title} design case study image ${index + 1}`,
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

  // Seed skills.
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