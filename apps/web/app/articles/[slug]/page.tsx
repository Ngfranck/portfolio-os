
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

import { JsonLd } from "../../../app/components/seo/JsonLd";
import {
  getPublishedArticleBySlug,
} from "../../../services/articles/article.service";

import { ArticlePageAnimations } from "./ArticlePageAnimations";

/**
 * URL du site :
 * - En développement : http://localhost:3000
 * - En production : définir NEXT_PUBLIC_SITE_URL avec le domaine réel.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

function getAbsoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, `${siteUrl}/`).toString();
}

type ArticleContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    };

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

/* =====================================================
   SEO / METADATA
===================================================== */

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  const articleUrl = getAbsoluteUrl(`/articles/${article.slug}`);
  const publishedAt = article.publishedAt?.toISOString();

  const coverImageUrl = article.coverImage
    ? getAbsoluteUrl(article.coverImage)
    : undefined;

  return {
    title: article.title,
    description: article.excerpt,

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      type: "article",
      publishedTime: publishedAt,
      authors: ["Gonar.ui"],
      section: article.category?.name ?? "Journal",

      images: coverImageUrl
        ? [
            {
              url: coverImageUrl,
              alt: article.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: coverImageUrl ? [coverImageUrl] : undefined,
    },
  };
}

/* =====================================================
   PAGE
===================================================== */

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = getAbsoluteUrl(`/articles/${article.slug}`);

  const coverImageUrl = article.coverImage
    ? getAbsoluteUrl(article.coverImage)
    : undefined;

  const formattedDate = article.publishedAt
    ? new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(article.publishedAt)
    : "";

  const content: ArticleContentBlock[] = Array.isArray(article.content)
    ? (article.content as ArticleContentBlock[])
    : [];

  return (
    <ArticlePageAnimations>
      {/* =====================================================
          JSON-LD
      ===================================================== */}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${articleUrl}#article`,

          headline: article.title,
          description: article.excerpt,

          image: coverImageUrl ? [coverImageUrl] : undefined,

          datePublished: article.publishedAt?.toISOString(),

          author: {
            "@type": "Person",
            name: "Gonar.ui",
            url: siteUrl,
          },

          publisher: {
            "@type": "Person",
            name: "Gonar.ui",
            url: siteUrl,
          },

          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },

          articleSection: article.category?.name ?? "Journal",

          isPartOf: {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
          },
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="pt-32 sm:pt-40 lg:pt-48">
        <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8">
          {/* BACK */}

          <Link
            href="/articles"
            data-article-back
            data-cursor="view"
            aria-label="Retour aux articles"
            className="
              group
              inline-flex
              items-center
              gap-2
              font-body
              text-sm
              text-[var(--portfolio-text-secondary)]
              transition-colors
              duration-[var(--portfolio-motion-fast)]
              hover:text-[var(--portfolio-text-primary)]
            "
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              strokeWidth={1.7}
              aria-hidden="true"
              className="
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-x-1
              "
            />

            <span>Back to articles</span>
          </Link>

          {/* CATEGORY */}

          <div className="mt-12" data-article-category>
            <span
              className="
                inline-flex
                rounded-full
                bg-[var(--portfolio-surface)]
                px-3
                py-1.5
                font-body
                text-xs
                font-medium
                text-[var(--portfolio-text-secondary)]
              "
            >
              {article.category?.name ?? "Journal"}
            </span>
          </div>

          {/* TITLE */}

          <h1
            data-article-title
            className="
              mt-6
              max-w-[850px]
              font-display
              text-[clamp(3rem,7vw,3.5rem)]
              font-bold
              leading-[0.92]
              tracking-[-0.06em]
            "
          >
            {article.title}
          </h1>

          {/* EXCERPT */}

          <p
            data-article-excerpt
            className="
              mt-8
              max-w-[680px]
              font-body
              text-lg
              leading-8
              text-[var(--portfolio-text-secondary)]
              sm:text-xl
              sm:leading-9
            "
          >
            {article.excerpt}
          </p>

          {/* META */}

          <div
            data-article-meta
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-3
              border-b
              border-[var(--portfolio-border)]
              pb-10
              font-body
              text-xs
              text-[var(--portfolio-text-muted)]
            "
          >
            {article.publishedAt && (
              <time dateTime={article.publishedAt.toISOString()}>
                {formattedDate}
              </time>
            )}

            <span
              aria-hidden="true"
              className="
                h-1
                w-1
                rounded-full
                bg-[var(--portfolio-text-muted)]
              "
            />

            <span className="flex items-center gap-2">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={14}
                strokeWidth={1.6}
                aria-hidden="true"
              />

              {article.readTime ?? "—"}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          COVER
      ===================================================== */}

      {article.coverImage && (
        <section className="py-10 sm:py-14">
          <div
            className="
              mx-auto
              w-full
              max-w-[1180px]
              px-5
              sm:px-8
              lg:px-10
            "
          >
            <div
              data-article-cover
              className="
                relative
                aspect-[16/9]
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
              "
            >
              <img
                src={article.coverImage}
                alt={article.title}
                data-article-cover-image
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              />
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ARTICLE CONTENT
      ===================================================== */}

      <article
        data-article-content
        className="
          mx-auto
          w-full
          max-w-[720px]
          px-5
          pb-24
          sm:px-8
          sm:pb-32
        "
      >
        {content.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={index}
                data-article-content-block
                data-article-content-heading
                className="
                  mt-14
                  font-display
                  text-2xl
                  font-semibold
                  leading-tight
                  tracking-[-0.035em]
                  sm:mt-16
                  sm:text-3xl
                "
              >
                {block.text}
              </h2>
            );
          }

          return (
            <p
              key={index}
              data-article-content-block
              data-article-content-paragraph
              className="
                mt-7
                font-body
                text-[17px]
                leading-[1.9]
                text-[var(--portfolio-text-secondary)]
                sm:text-[18px]
              "
            >
              {block.text}
            </p>
          );
        })}
      </article>

      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <section
        data-article-footer
        className="
          border-t
          border-[var(--portfolio-border)]
          py-16
          sm:py-20
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[900px]
            flex-col
            gap-6
            px-5
            sm:px-8
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p
              data-article-footer-label
              className="
                font-body
                text-xs
                uppercase
                tracking-[0.12em]
                text-[var(--portfolio-text-muted)]
              "
            >
              More from the journal
            </p>

            <h2
              data-article-footer-title
              className="
                mt-2
                font-display
                text-2xl
                font-semibold
                tracking-[-0.035em]
              "
            >
              Explore more articles.
            </h2>
          </div>

          <Link
            href="/articles"
            data-article-footer-button
            data-cursor="magnetic"
            aria-label="Voir tous les articles"
            className="
              group
              inline-flex
              h-11
              shrink-0
              items-center
              gap-2
              rounded-full
              bg-[var(--portfolio-dark)]
              px-5
              font-display
              text-sm
              font-medium
              text-[var(--portfolio-dark-text)]
              transition-all
              duration-[var(--portfolio-motion-fast)]
              hover:scale-[1.02]
            "
          >
            <span>View all articles</span>

            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={15}
              strokeWidth={1.8}
              color="var(--portfolio-accent)"
              aria-hidden="true"
              className="
                transition-transform
                duration-[var(--portfolio-motion-fast)]
                group-hover:-translate-y-[1px]
                group-hover:translate-x-[1px]
              "
            />
          </Link>
        </div>
      </section>
    </ArticlePageAnimations>
  );
}
