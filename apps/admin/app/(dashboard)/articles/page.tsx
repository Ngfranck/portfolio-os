"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  Add01Icon,
  Archive01Icon,
  Calendar03Icon,
  Delete02Icon,
  Edit02Icon,
} from "@hugeicons/core-free-icons";

import {
  archiveArticle,
  deleteArticle,
  getAdminArticles,
} from "./actions";

type ArticlesResult = Awaited<ReturnType<typeof getAdminArticles>>;
type Article = ArticlesResult["articles"][number];

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Douala",
  })
    .format(date)
    .replace(/\.$/, "");
}

function statusPresentation(status: string) {
  if (status === "PUBLISHED") {
    return {
      label: "Publié",
      accent: "bg-[#FDE8EA] text-[#E30613]",
    };
  }

  if (status === "ARCHIVED") {
    return {
      label: "Archivé",
      accent: "bg-[#f0f0ed] text-[#777]",
    };
  }

  return {
    label: "Brouillon",
    accent: "bg-[#f7f7f5] text-[#666]",
  };
}

function ActionButton({
  label,
  onClick,
  disabled,
  icon,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon: typeof Edit02Icon;
  variant?: "default" | "archive" | "delete";
}) {
  const styles = {
    default:
      "text-[#777] hover:bg-[#f0f0ed] hover:text-[#111]",
    archive:
      "text-[#777] hover:bg-[#f0f0ed] hover:text-[#111]",
    delete:
      "text-[#999] hover:bg-[#FDE8EA] hover:text-[#E30613]",
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
        "transition-colors duration-150",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-1",
        styles[variant],
      ].join(" ")}
    >
      <HugeiconsIcon icon={icon} size={17} strokeWidth={1.7} />
    </button>
  );
}

function ArticleActions({
  article,
  disabled,
  onArchive,
  onDelete,
}: {
  article: Article;
  disabled: boolean;
  onArchive: (article: Article) => void;
  onDelete: (article: Article) => void;
}) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1">
      <Link
        href={`/articles/${article.id}`}
        aria-label={`Modifier l’article ${article.title}`}
        title={`Modifier ${article.title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#777] transition-colors duration-150 hover:bg-[#f0f0ed] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-1"
      >
        <HugeiconsIcon
          icon={Edit02Icon}
          size={17}
          strokeWidth={1.7}
        />
      </Link>

      {article.status !== "ARCHIVED" && (
        <ActionButton
          label={`Archiver l’article ${article.title}`}
          icon={Archive01Icon}
          variant="archive"
          disabled={disabled}
          onClick={() => onArchive(article)}
        />
      )}

      <ActionButton
        label={`Supprimer l’article ${article.title}`}
        icon={Delete02Icon}
        variant="delete"
        disabled={disabled}
        onClick={() => onDelete(article)}
      />
    </div>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pendingArticleId, setPendingArticleId] = useState<string | null>(
    null,
  );

  const refreshArticles = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setIsLoading(true);
    }

    setLoadError(null);

    try {
      const result = await getAdminArticles();

      if (!result.success) {
        setLoadError(result.error);
        return;
      }

      setArticles(result.articles);
    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);

      setLoadError(
        "Une erreur est survenue pendant le chargement des articles.",
      );
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refreshArticles();
  }, [refreshArticles]);

  const handleArchive = async (article: Article) => {
    if (pendingArticleId) return;

    const confirmed = window.confirm(
      `Archiver « ${article.title} » ?\n\nL’article sera conservé dans les archives et ne sera plus considéré comme un contenu actif.`,
    );

    if (!confirmed) return;

    setPendingArticleId(article.id);
    setActionError(null);

    try {
      const result = await archiveArticle(article.id);

      if (!result.success) {
        setActionError(result.error);
        return;
      }

      await refreshArticles(false);
    } catch (error) {
      console.error("Erreur lors de l’archivage :", error);

      setActionError(
        "Impossible d’archiver cet article. Veuillez réessayer.",
      );
    } finally {
      setPendingArticleId(null);
    }
  };

  const handleDelete = async (article: Article) => {
    if (pendingArticleId) return;

    const confirmed = window.confirm(
      `Supprimer définitivement « ${article.title} » ?\n\nCette opération est irréversible.`,
    );

    if (!confirmed) return;

    setPendingArticleId(article.id);
    setActionError(null);

    try {
      const result = await deleteArticle(article.id);

      if (!result.success) {
        setActionError(result.error);
        return;
      }

      setArticles((current) =>
        current.filter((item) => item.id !== article.id),
      );
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);

      setActionError(
        "Impossible de supprimer cet article. Veuillez réessayer.",
      );
    } finally {
      setPendingArticleId(null);
    }
  };

  const publishedCount = articles.filter(
    (article) => article.status === "PUBLISHED",
  ).length;

  const draftCount = articles.filter(
    (article) => article.status === "DRAFT",
  ).length;

  const archivedCount = articles.filter(
    (article) => article.status === "ARCHIVED",
  ).length;

  const stats = [
    {
      label: "Total",
      value: articles.length,
      detail: "Articles enregistrés",
    },
    {
      label: "Publiés",
      value: publishedCount,
      detail: "Visibles sur le portfolio",
    },
    {
      label: "Brouillons",
      value: draftCount,
      detail: "En cours de rédaction",
    },
    {
      label: "Archivés",
      value: archivedCount,
      detail: "Conservés hors publication",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-5 pb-28 sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-10">
        {/* HEADER */}

        <header className="mb-8 sm:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-7 bg-[#E30613]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E30613]">
                  Contenu éditorial
                </p>
              </div>

              <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#111]">
                Articles
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#666] sm:text-[15px]">
                Gérez les articles qui alimentent la partie éditoriale de
                votre portfolio.
              </p>
            </div>

            <Link
              href="/articles/new"
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl bg-[#111] px-4 py-2.5 text-xs font-semibold text-white transition-colors duration-150 hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
            >
              <HugeiconsIcon
                icon={Add01Icon}
                size={16}
                strokeWidth={1.8}
              />

              <span>Nouvel article</span>
            </Link>
          </div>
        </header>

        {/* ERREURS */}

        {loadError && (
          <div
            role="alert"
            className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#f1c5c9] bg-[#FDE8EA] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-[#111]">
                Impossible de charger les articles
              </p>

              <p className="mt-1 text-xs leading-5 text-[#666]">
                {loadError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void refreshArticles()}
              className="inline-flex min-h-9 w-fit items-center justify-center rounded-lg border border-[#e9b5bb] px-3 text-xs font-semibold text-[#111] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
            >
              Réessayer
            </button>
          </div>
        )}

        {actionError && (
          <div
            role="alert"
            className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-[#f1c5c9] bg-[#FDE8EA] p-4"
          >
            <div>
              <p className="text-sm font-medium text-[#111]">
                L’opération n’a pas abouti
              </p>

              <p className="mt-1 text-xs leading-5 text-[#666]">
                {actionError}
              </p>
            </div>

            <button
              type="button"
              aria-label="Fermer le message d’erreur"
              title="Fermer"
              onClick={() => setActionError(null)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#666] transition-colors hover:bg-white hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
            >
              ×
            </button>
          </div>
        )}

        {/* STATISTIQUES */}

        <section
          className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4"
          aria-label="Statistiques des articles"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-[#e5e5e2] bg-white p-4 sm:p-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                {stat.label}
              </p>

              <p className="mt-3 text-3xl font-semibold leading-none tracking-[-0.05em] text-[#111]">
                {isLoading ? "—" : String(stat.value).padStart(2, "0")}
              </p>

              <p className="mt-2 text-[11px] text-[#999]">{stat.detail}</p>
            </article>
          ))}
        </section>

        {/* LISTE DES ARTICLES */}

        <section
          className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white"
          aria-labelledby="articles-list-heading"
        >
          <div className="border-b border-[#e5e5e2] px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f7f5]">
                  <HugeiconsIcon
                    icon={Archive01Icon}
                    size={17}
                    strokeWidth={1.7}
                    className="text-[#666]"
                  />
                </div>

                <div>
                  <h2
                    id="articles-list-heading"
                    className="text-lg font-semibold tracking-[-0.025em] text-[#111]"
                  >
                    Tous les articles
                  </h2>

                  <p className="mt-0.5 text-xs text-[#999]">
                    {isLoading
                      ? "Chargement des articles..."
                      : `${articles.length} article${
                          articles.length > 1 ? "s" : ""
                        } enregistré${articles.length > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div
              className="flex min-h-[280px] flex-col items-center justify-center gap-3 px-5 py-10 text-center"
              role="status"
            >
              <span className="h-7 w-7 animate-spin rounded-full border-2 border-[#e5e5e2] border-t-[#111]" />

              <p className="text-xs text-[#999]">
                Chargement des articles...
              </p>
            </div>
          ) : loadError ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#111]">
                Les articles ne sont pas disponibles.
              </p>

              <p className="mt-1 text-xs text-[#999]">
                Vérifiez votre connexion, puis réessayez.
              </p>

              <button
                type="button"
                onClick={() => void refreshArticles()}
                className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#111] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
              >
                Réessayer
              </button>
            </div>
          ) : articles.length > 0 ? (
            <>
              {/* DESKTOP */}

              <div className="hidden lg:block">
                <div className="grid grid-cols-[42px_minmax(220px,1.8fr)_minmax(130px,1fr)_104px_108px_128px] items-center border-b border-[#e5e5e2] bg-[#fafaf8] px-7 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#999]">
                    #
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Article
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Catégorie
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Statut
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Mise à jour
                  </span>

                  <span className="text-right text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Actions
                  </span>
                </div>

                <div className="divide-y divide-[#e5e5e2]">
                  {articles.map((article, index) => {
                    const presentation = statusPresentation(
                      article.status,
                    );

                    return (
                      <div
                        key={article.id}
                        className="group grid min-h-[92px] grid-cols-[42px_minmax(220px,1.8fr)_minmax(130px,1fr)_104px_108px_128px] items-center px-7 transition-colors duration-150 hover:bg-[#fafaf8]"
                      >
                        <span className="text-[11px] font-semibold tracking-[0.08em] text-[#b5b5b1]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 pr-5">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#111]">
                              {article.title}
                            </p>

                            {article.featured && (
                              <span className="shrink-0 rounded-full bg-[#111] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white">
                                À la une
                              </span>
                            )}
                          </div>

                          <p className="mt-1 truncate text-[10px] text-[#999]">
                            {article.readTime || "Durée non définie"} ·{" "}
                            {article.publishedAt
                              ? `Publié le ${formatDate(article.publishedAt)}`
                              : `Modifié le ${formatDate(article.updatedAt)}`}
                          </p>
                        </div>

                        <p className="truncate pr-4 text-xs font-medium text-[#666]">
                          {article.category?.name ?? "Sans catégorie"}
                        </p>

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] ${presentation.accent}`}
                        >
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-current"
                          />

                          {presentation.label}
                        </span>

                        <p className="text-[11px] text-[#999]">
                          {formatDate(article.updatedAt)}
                        </p>

                        <ArticleActions
                          article={article}
                          disabled={pendingArticleId !== null}
                          onArchive={handleArchive}
                          onDelete={handleDelete}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TABLETTE ET MOBILE */}

              <div className="divide-y divide-[#e5e5e2] lg:hidden">
                {articles.map((article, index) => {
                  const presentation = statusPresentation(article.status);

                  return (
                    <div
                      key={article.id}
                      className="px-4 py-4 transition-colors duration-150 hover:bg-[#fafaf8] sm:px-5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.08em] text-[#b5b5b1]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <Link
                          href={`/articles/${article.id}`}
                          aria-label={`Modifier l’article ${article.title}`}
                          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-[10px] font-semibold text-white"
                          >
                            {article.title.charAt(0).toUpperCase() || "A"}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="flex min-w-0 items-center gap-2">
                              <span className="truncate text-[14px] font-semibold tracking-[-0.02em] text-[#111]">
                                {article.title}
                              </span>

                              {article.featured && (
                                <span className="shrink-0 rounded-full bg-[#111] px-1.5 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-white">
                                  Une
                                </span>
                              )}
                            </span>

                            <span className="mt-1 block truncate text-[11px] text-[#999]">
                              {article.category?.name ?? "Sans catégorie"}
                            </span>

                            <span className="mt-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${presentation.accent}`}
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-1 w-1 rounded-full bg-current"
                                />
                                {presentation.label}
                              </span>

                              <span className="text-[9px] text-[#999]">
                                {formatDate(article.updatedAt)}
                              </span>
                            </span>
                          </span>
                        </Link>
                      </div>

                      <div className="mt-3 flex justify-end border-t border-[#e5e5e2] pt-2">
                        <ArticleActions
                          article={article}
                          disabled={pendingArticleId !== null}
                          onArchive={handleArchive}
                          onDelete={handleDelete}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f7f5]">
                <HugeiconsIcon
                  icon={Archive01Icon}
                  size={20}
                  strokeWidth={1.7}
                  className="text-[#999]"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#111]">
                Aucun article
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-[#999]">
                Créez votre premier article pour commencer à alimenter la
                section éditoriale de votre portfolio.
              </p>

              <Link
                href="/articles/new"
                className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#111] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
              >
                <HugeiconsIcon
                  icon={Add01Icon}
                  size={15}
                  strokeWidth={1.8}
                />
                Créer un article
              </Link>
            </div>
          )}

          {/* FOOTER */}

          <div className="flex flex-col gap-3 border-t border-[#e5e5e2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-[10px] text-[#999]">
              Les articles sont triés par dernière modification.
            </p>

            <div className="flex items-center gap-3 text-[10px] text-[#999]">
              <span className="inline-flex items-center gap-1.5">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  size={13}
                  strokeWidth={1.6}
                />

                {articles.length} article
                {articles.length > 1 ? "s" : ""}
              </span>

              <span className="h-3 w-px bg-[#e5e5e2]" />

              <span>{publishedCount} publié(s)</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}