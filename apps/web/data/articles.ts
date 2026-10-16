export type ArticleContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  cover: string;
  featured?: boolean;
  content: ArticleContentBlock[];
};

export const articles: Article[] = [
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