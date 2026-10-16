import Image from "next/image";
import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  ArrowUpRight01Icon,
  BookOpen01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";

import { getPublishedArticles } from "../../services/articles/article.service";

import { ArticlesPageAnimations } from "./ArticlesPageAnimations";

function formatArticleDate(date: Date | null) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  const featuredArticle =
    articles.find((article) => article.featured) ?? null;

  const latestArticles = articles.filter(
    (article) => article.id !== featuredArticle?.id
  );

  return (
    <ArticlesPageAnimations>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        data-articles-hero
        className="
          pt-36
          sm:pt-44
          lg:pt-52
        "
      >
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
            data-articles-hero-label
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[var(--portfolio-border)]
              bg-[var(--portfolio-surface)]
              px-3
              py-2
              font-body
              text-xs
              font-medium
              text-[var(--portfolio-text-secondary)]
            "
          >
            <HugeiconsIcon
              icon={BookOpen01Icon}
              size={14}
              strokeWidth={1.6}
            />

            <span>Articles</span>
          </div>

          <div
            className="
              flex
              flex-col
              gap-8
              border-b
              border-[var(--portfolio-border)]
              pb-12
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <h1
              data-articles-hero-title
              className="
                max-w-[760px]
                font-display
                text-[clamp(3rem,7vw,6.5rem)]
                font-bold
                leading-[0.92]
                tracking-[-0.06em]
              "
            >
              Thoughts,
              <br />
              experiments{" "}
              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-secondary)]
                "
              >
                & things I've learned.
              </span>
            </h1>

            <p
              data-articles-hero-description
              className="
                max-w-[360px]
                font-body
                text-sm
                leading-6
                text-[var(--portfolio-text-secondary)]
                sm:text-base
                sm:leading-7
              "
            >
              Une sélection de réflexions autour du design,
              des produits digitaux, du branding et de la
              technologie.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}

      {featuredArticle && (
        <section
          data-articles-featured-section
          className="
            py-16
            sm:py-20
            lg:py-24
          "
        >
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
              data-articles-featured-label
              className="
                mb-7
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--portfolio-text-muted)]
                "
              >
                Featured article
              </span>

              <span
                aria-hidden="true"
                className="
                  ml-5
                  h-px
                  flex-1
                  bg-[var(--portfolio-border)]
                "
              />
            </div>

            <Link
              href={`/articles/${featuredArticle.slug}`}
              data-articles-featured-card
              data-cursor="view"
              className="
                group
                grid
                overflow-hidden
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                transition-all
                duration-[var(--portfolio-motion-normal)]
                hover:-translate-y-[3px]
                hover:shadow-[0_25px_70px_rgba(0,0,0,0.07)]
                lg:grid-cols-[1.05fr_0.95fr]
              "
            >
              <div
                data-articles-featured-image
                className="
                  relative
                  min-h-[300px]
                  overflow-hidden
                  sm:min-h-[420px]
                  lg:min-h-full
                "
              >
                {featuredArticle.coverImage ? (
                  <>
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 590px"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.04]
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/15
                        to-transparent
                      "
                    />
                  </>
                ) : (
                  <div
                    className="
                      absolute
                      inset-0
                      bg-[var(--portfolio-background)]
                    "
                    aria-hidden="true"
                  />
                )}
              </div>

              <div
                data-articles-featured-content
                className="
                  flex
                  flex-col
                  p-7
                  sm:p-10
                  lg:p-12
                "
              >
                <div
                  data-articles-featured-meta
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      rounded-full
                      bg-[var(--portfolio-background)]
                      px-3
                      py-1.5
                      font-body
                      text-[11px]
                      font-medium
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    {featuredArticle.category?.name ?? "Journal"}
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      font-body
                      text-xs
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      size={14}
                      strokeWidth={1.6}
                    />

                    {featuredArticle.readTime ?? "—"}
                  </span>
                </div>

                <h2
                  data-articles-featured-title
                  className="
                    mt-10
                    max-w-[560px]
                    font-display
                    text-3xl
                    font-semibold
                    leading-[1]
                    tracking-[-0.045em]
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {featuredArticle.title}
                </h2>

                <p
                  data-articles-featured-description
                  className="
                    mt-6
                    max-w-[520px]
                    font-body
                    text-sm
                    leading-6
                    text-[var(--portfolio-text-secondary)]
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {featuredArticle.excerpt}
                </p>

                <div
                  data-articles-featured-footer
                  className="
                    mt-auto
                    flex
                    items-center
                    justify-between
                    gap-5
                    pt-12
                  "
                >
                  <span
                    className="
                      font-body
                      text-xs
                      text-[var(--portfolio-text-muted)]
                    "
                  >
                    {formatArticleDate(featuredArticle.publishedAt)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[var(--portfolio-border)]
                      bg-[var(--portfolio-background)]
                      transition-all
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      group-hover:border-[var(--portfolio-accent)]
                    "
                  >
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={16}
                      strokeWidth={1.7}
                      className="
                        text-[var(--portfolio-text-secondary)]
                      "
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* =====================================================
          LATEST ARTICLES
      ===================================================== */}

      <section
        data-articles-latest-section
        className="
          pb-20
          sm:pb-28
          lg:pb-36
        "
      >
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
            data-articles-latest-header
            className="
              mb-10
              flex
              items-end
              justify-between
              border-b
              border-[var(--portfolio-border)]
              pb-6
            "
          >
            <div>
              <span
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--portfolio-text-muted)]
                "
              >
                Latest
              </span>

              <h2
                data-articles-latest-title
                className="
                  mt-3
                  font-display
                  text-3xl
                  font-semibold
                  tracking-[-0.045em]
                  sm:text-4xl
                "
              >
                Latest articles.
              </h2>
            </div>

            <span
              data-articles-latest-count
              className="
                font-body
                text-xs
                text-[var(--portfolio-text-muted)]
              "
            >
              {latestArticles.length} articles
            </span>
          </div>

          <div
            data-articles-latest-grid
            className="
              grid
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                data-articles-latest-card
                data-cursor="view"
                className="
                  group
                  flex
                  flex-col
                  overflow-hidden
                  rounded-[var(--portfolio-radius-lg)]
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  transition-all
                  duration-[var(--portfolio-motion-normal)]
                  hover:-translate-y-[3px]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]
                "
              >
                <div
                  className="
                    relative
                    aspect-[16/10]
                    overflow-hidden
                  "
                >
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.05]
                      "
                    />
                  ) : (
                    <div
                      className="
                        absolute
                        inset-0
                        bg-[var(--portfolio-background)]
                      "
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div
                  className="
                    flex
                    flex-1
                    flex-col
                    p-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <span
                      className="
                        font-body
                        text-[11px]
                        font-medium
                        text-[var(--portfolio-text-secondary)]
                      "
                    >
                      {article.category?.name ?? "Journal"}
                    </span>

                    <span
                      className="
                        flex
                        items-center
                        gap-1.5
                        font-body
                        text-[11px]
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        size={13}
                        strokeWidth={1.6}
                      />

                      {article.readTime ?? "—"}
                    </span>
                  </div>

                  <h3
                    className="
                      mt-5
                      font-display
                      text-xl
                      font-semibold
                      leading-[1.05]
                      tracking-[-0.03em]
                      text-[var(--portfolio-text-primary)]
                      sm:text-2xl
                    "
                  >
                    {article.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      line-clamp-3
                      font-body
                      text-sm
                      leading-6
                      text-[var(--portfolio-text-secondary)]
                    "
                  >
                    {article.excerpt}
                  </p>

                  <div
                    className="
                      mt-8
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[var(--portfolio-border)]
                      pt-5
                    "
                  >
                    <span
                      className="
                        font-body
                        text-xs
                        text-[var(--portfolio-text-muted)]
                      "
                    >
                      {formatArticleDate(article.publishedAt)}
                    </span>

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={16}
                      strokeWidth={1.7}
                      className="
                        text-[var(--portfolio-text-secondary)]
                        transition-transform
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:-translate-y-[2px]
                        group-hover:translate-x-[2px]
                      "
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ArticlesPageAnimations>
  );
}