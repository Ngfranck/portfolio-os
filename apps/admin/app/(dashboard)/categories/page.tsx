
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  Edit02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

import {
  deleteCategory,
  getAdminCategories,
  type AdminCategory,
} from "./actions";

type CategoryFilter = "all" | "projects" | "articles" | "unused";
type SortMode = "name" | "updated";

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("name");

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAdminCategories();

      if (!result.success) {
        setCategories([]);
        setError(result.error);
        return;
      }

      setCategories(result.categories);
    } catch (err) {
      console.error("Erreur lors du chargement des catégories :", err);
      setError("Impossible de charger les catégories. Réessaie.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const stats = useMemo(() => {
    const total = categories.length;

    const projectLinked = categories.filter(
      (category) => category._count.projects > 0,
    ).length;

    const articleLinked = categories.filter(
      (category) => category._count.articles > 0,
    ).length;

    const unused = categories.filter(
      (category) =>
        category._count.projects === 0 &&
        category._count.articles === 0,
    ).length;

    return {
      total,
      projectLinked,
      articleLinked,
      unused,
    };
  }, [categories]);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = categories.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query) ||
        (category.description ?? "").toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "projects" && category._count.projects > 0) ||
        (filter === "articles" && category._count.articles > 0) ||
        (filter === "unused" &&
          category._count.projects === 0 &&
          category._count.articles === 0);

      return matchesSearch && matchesFilter;
    });

    return [...result].sort((a, b) => {
      if (sortMode === "updated") {
        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );
      }

      return a.name.localeCompare(b.name, "fr", {
        sensitivity: "base",
      });
    });
  }, [categories, search, filter, sortMode]);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setSortMode("name");
  };

  const handleDelete = async (category: AdminCategory) => {
    const hasUsage =
      category._count.projects > 0 ||
      category._count.articles > 0;

    if (hasUsage) {
      setError(
        `Impossible de supprimer « ${category.name} » : cette catégorie est encore utilisée par ${
          [
            category._count.projects > 0
              ? `${category._count.projects} projet${
                  category._count.projects > 1 ? "s" : ""
                }`
              : "",
            category._count.articles > 0
              ? `${category._count.articles} article${
                  category._count.articles > 1 ? "s" : ""
                }`
              : "",
          ]
            .filter(Boolean)
            .join(" et ")
        }.`,
      );
      return;
    }

    const confirmed = window.confirm(
      `Supprimer la catégorie « ${category.name} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setDeletingId(category.id);
    setError(null);
    setNotice(null);

    try {
      const result = await deleteCategory(category.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setCategories((current) =>
        current.filter((item) => item.id !== category.id),
      );

      setNotice(`La catégorie « ${category.name} » a été supprimée.`);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      setError("Une erreur est survenue lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* EN-TÊTE */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              <span>Contenu</span>
              <span>/</span>
              <span className="text-neutral-700">Catégories</span>
            </div>

            <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
              Catégories
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
              Organise les projets et les articles de ton portfolio
              pour faciliter leur classement et leur gestion.
            </p>
          </div>

          <Link
            href="/categories/new"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} strokeWidth={1.8} />
            Nouvelle catégorie
          </Link>
        </header>

        {/* NOTIFICATIONS */}
        {error && (
          <MessageBanner
            tone="error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {notice && (
          <MessageBanner
            tone="success"
            message={notice}
            onClose={() => setNotice(null)}
          />
        )}

        {/* STATISTIQUES */}
        <section
          aria-label="Statistiques des catégories"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <StatCard
            label="Total"
            value={stats.total}
            description="Catégories enregistrées"
            symbol="C"
          />

          <StatCard
            label="Projets classés"
            value={stats.projectLinked}
            description="Catégories liées aux projets"
            symbol="P"
          />

          <StatCard
            label="Articles classés"
            value={stats.articleLinked}
            description="Catégories liées aux articles"
            symbol="A"
          />

          <StatCard
            label="Inutilisées"
            value={stats.unused}
            description="Sans projet ni article"
            symbol="—"
          />
        </section>

        {/* CATALOGUE */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* BARRE D'OUTILS */}
          <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-950">
                  Catalogue des catégories
                </h2>

                <p className="mt-1 text-xs text-neutral-400">
                  {filteredCategories.length} résultat
                  {filteredCategories.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                <div className="relative min-w-0 sm:min-w-[280px]">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <label htmlFor="category-search" className="sr-only">
                    Rechercher une catégorie
                  </label>

                  <input
                    id="category-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher une catégorie..."
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSortMode((current) =>
                      current === "name" ? "updated" : "name",
                    )
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
                >
                  {sortMode === "name"
                    ? "Ordre alphabétique"
                    : "Modification récente"}
                </button>
              </div>
            </div>

            {/* FILTRES */}
            <div className="mt-4 flex flex-wrap gap-2">
              <FilterButton
                active={filter === "all"}
                onClick={() => setFilter("all")}
              >
                Toutes
              </FilterButton>

              <FilterButton
                active={filter === "projects"}
                onClick={() => setFilter("projects")}
              >
                Avec projets
              </FilterButton>

              <FilterButton
                active={filter === "articles"}
                onClick={() => setFilter("articles")}
              >
                Avec articles
              </FilterButton>

              <FilterButton
                active={filter === "unused"}
                onClick={() => setFilter("unused")}
              >
                Inutilisées
              </FilterButton>

              {(search || filter !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-1 px-2 text-xs font-medium text-neutral-400 underline underline-offset-4 transition hover:text-neutral-700"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* CHARGEMENT */}
          {isLoading && <LoadingState />}

          {/* ÉTAT VIDE */}
          {!isLoading && filteredCategories.length === 0 && (
            <EmptyState
              hasCategories={categories.length > 0}
              onReset={resetFilters}
            />
          )}

          {/* TABLEAU DESKTOP */}
          {!isLoading && filteredCategories.length > 0 && (
            <div className="hidden md:block">
              <div className="grid grid-cols-[minmax(260px,1.5fr)_minmax(200px,1.2fr)_100px_100px_auto] items-center gap-4 border-b border-neutral-100 bg-neutral-50/70 px-5 py-3">
                <HeaderCell>Catégorie</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Projets</HeaderCell>
                <HeaderCell>Articles</HeaderCell>
                <HeaderCell align="right">Actions</HeaderCell>
              </div>

              <div className="divide-y divide-neutral-100">
                {filteredCategories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CARTES MOBILE */}
          {!isLoading && filteredCategories.length > 0 && (
            <div className="divide-y divide-neutral-100 md:hidden">
              {filteredCategories.map((category) => (
                <CategoryMobileCard
                  key={category.id}
                  category={category}
                  deletingId={deletingId}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ============================================================ */
/* STATISTIQUES */
/* ============================================================ */

function StatCard({
  label,
  value,
  description,
  symbol,
}: {
  label: string;
  value: number;
  description: string;
  symbol: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-[28px]">
            {value.toLocaleString("fr-FR")}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xs font-semibold text-neutral-500">
          {symbol}
        </div>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        {description}
      </p>
    </div>
  );
}

/* ============================================================ */
/* FILTRES */
/* ============================================================ */

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-lg bg-neutral-950 px-3 py-2 text-xs font-medium text-white"
          : "rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-700"
      }
    >
      {children}
    </button>
  );
}

/* ============================================================ */
/* CELLULES D'EN-TÊTE */
/* ============================================================ */

function HeaderCell({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* ============================================================ */
/* LIGNE DESKTOP */
/* ============================================================ */

function CategoryRow({
  category,
  deletingId,
  onDelete,
}: {
  category: AdminCategory;
  deletingId: string | null;
  onDelete: (category: AdminCategory) => void;
}) {
  const hasUsage =
    category._count.projects > 0 ||
    category._count.articles > 0;

  return (
    <div className="grid grid-cols-[minmax(260px,1.5fr)_minmax(200px,1.2fr)_100px_100px_auto] items-center gap-4 px-5 py-4 transition hover:bg-neutral-50/60">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
          <span className="text-sm font-semibold">
            {category.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0">
          <Link
            href={`/categories/${category.id}`}
            className="block truncate text-sm font-semibold text-neutral-950 hover:underline hover:underline-offset-4"
          >
            {category.name}
          </Link>

          <p className="mt-0.5 truncate font-mono text-[11px] text-neutral-400">
            /{category.slug}
          </p>
        </div>
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 text-xs leading-5 text-neutral-500">
          {category.description || "Aucune description"}
        </p>
      </div>

      <div>
        <span className="text-sm font-medium tabular-nums text-neutral-700">
          {category._count.projects}
        </span>
      </div>

      <div>
        <span className="text-sm font-medium tabular-nums text-neutral-700">
          {category._count.articles}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1">
        <Link
          href={`/categories/${category.id}`}
          title="Modifier"
          aria-label={`Modifier ${category.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <HugeiconsIcon
            icon={Edit02Icon}
            size={17}
            strokeWidth={1.8}
          />
        </Link>

        <button
          type="button"
          onClick={() => void onDelete(category)}
          disabled={deletingId === category.id || hasUsage}
          title={
            hasUsage
              ? "Cette catégorie est encore utilisée"
              : "Supprimer"
          }
          aria-label={`Supprimer ${category.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-neutral-400"
        >
          {deletingId === category.id ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          ) : (
            <HugeiconsIcon
              icon={Delete02Icon}
              size={17}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* CARTE MOBILE */
/* ============================================================ */

function CategoryMobileCard({
  category,
  deletingId,
  onDelete,
}: {
  category: AdminCategory;
  deletingId: string | null;
  onDelete: (category: AdminCategory) => void;
}) {
  const hasUsage =
    category._count.projects > 0 ||
    category._count.articles > 0;

  return (
    <article className="space-y-4 p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
          <span className="text-sm font-semibold">
            {category.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/categories/${category.id}`}
            className="block truncate text-sm font-semibold text-neutral-950"
          >
            {category.name}
          </Link>

          <p className="mt-0.5 truncate font-mono text-[11px] text-neutral-400">
            /{category.slug}
          </p>
        </div>
      </div>

      <p className="text-sm leading-6 text-neutral-500">
        {category.description || "Aucune description renseignée."}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <MiniMeta
          label="Projets"
          value={String(category._count.projects)}
        />
        <MiniMeta
          label="Articles"
          value={String(category._count.articles)}
        />
      </div>

      <div className="flex gap-2 border-t border-neutral-100 pt-3">
        <Link
          href={`/categories/${category.id}`}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          <HugeiconsIcon
            icon={Edit02Icon}
            size={16}
            strokeWidth={1.8}
          />
          Modifier
        </Link>

        <button
          type="button"
          onClick={() => void onDelete(category)}
          disabled={deletingId === category.id || hasUsage}
          title={
            hasUsage
              ? "Catégorie encore utilisée"
              : "Supprimer"
          }
          aria-label={`Supprimer ${category.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-25"
        >
          {deletingId === category.id ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          ) : (
            <HugeiconsIcon
              icon={Delete02Icon}
              size={17}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>

      <p className="text-[10px] text-neutral-400">
        Modifiée le {formatDate(category.updatedAt)}
      </p>
    </article>
  );
}

/* ============================================================ */
/* MÉTADONNÉES MOBILE */
/* ============================================================ */

function MiniMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-neutral-50 px-3 py-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-medium text-neutral-700">
        {value}
      </p>
    </div>
  );
}

/* ============================================================ */
/* CHARGEMENT */
/* ============================================================ */

function LoadingState() {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-3"
      role="status"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      <p className="text-sm text-neutral-400">
        Chargement des catégories...
      </p>
    </div>
  );
}

/* ============================================================ */
/* ÉTAT VIDE */
/* ============================================================ */

function EmptyState({
  hasCategories,
  onReset,
}: {
  hasCategories: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <span className="text-2xl font-semibold">C</span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-neutral-950">
        {hasCategories
          ? "Aucune catégorie ne correspond"
          : "Aucune catégorie pour le moment"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        {hasCategories
          ? "Modifie ta recherche ou tes filtres pour retrouver une catégorie."
          : "Commence par créer une catégorie pour organiser tes contenus."}
      </p>

      {hasCategories ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-xs font-medium text-neutral-800 underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      ) : (
        <Link
          href="/categories/new"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-950 px-4 text-xs font-medium text-white transition hover:bg-neutral-800"
        >
          <HugeiconsIcon
            icon={Add01Icon}
            size={16}
            strokeWidth={1.8}
          />
          Créer une catégorie
        </Link>
      )}
    </div>
  );
}

/* ============================================================ */
/* NOTIFICATIONS */
/* ============================================================ */

function MessageBanner({
  tone,
  message,
  onClose,
}: {
  tone: "error" | "success";
  message: string;
  onClose: () => void;
}) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-neutral-200 bg-white text-neutral-700"
      }`}
    >
      <p className="leading-6">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className={`shrink-0 text-xs font-medium underline underline-offset-4 ${
          isError ? "text-red-700" : "text-neutral-500"
        }`}
      >
        Fermer
      </button>
    </div>
  );
}