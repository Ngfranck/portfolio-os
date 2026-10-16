
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Delete02Icon,
  Edit02Icon,
  Search01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import {
  deleteTestimonial,
  getAdminTestimonials,
  type AdminTestimonial,
} from "./actions";

type TestimonialFilter =
  | "all"
  | "featured"
  | "rated"
  | "unrated";

type SortMode = "order" | "updated";

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<
    AdminTestimonial[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<TestimonialFilter>("all");
  const [sortMode, setSortMode] =
    useState<SortMode>("order");

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAdminTestimonials();

      if (!result.success) {
        setTestimonials([]);
        setError(result.error);
        return;
      }

      setTestimonials(result.testimonials);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des témoignages :",
        err,
      );
      setError(
        "Impossible de charger les témoignages. Réessaie.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTestimonials();
  }, [loadTestimonials]);

  const stats = useMemo(() => {
    const total = testimonials.length;

    const featured = testimonials.filter(
      (item) => item.featured,
    ).length;

    const rated = testimonials.filter(
      (item) => item.rating !== null,
    );

    const averageRating =
      rated.length > 0
        ? rated.reduce(
            (sum, item) => sum + (item.rating ?? 0),
            0,
          ) / rated.length
        : null;

    return {
      total,
      featured,
      rated: rated.length,
      averageRating,
    };
  }, [testimonials]);

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = testimonials.filter((item) => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.role ?? "").toLowerCase().includes(query) ||
        (item.company ?? "").toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "featured" && item.featured) ||
        (filter === "rated" && item.rating !== null) ||
        (filter === "unrated" && item.rating === null);

      return matchesSearch && matchesFilter;
    });

    return [...result].sort((a, b) => {
      if (sortMode === "updated") {
        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );
      }

      return (
        a.sortOrder - b.sortOrder ||
        new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
    });
  }, [testimonials, search, filter, sortMode]);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setSortMode("order");
  };

  const handleDelete = async (testimonial: AdminTestimonial) => {
    const confirmed = window.confirm(
      `Supprimer le témoignage de « ${testimonial.name} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setDeletingId(testimonial.id);
    setError(null);
    setNotice(null);

    try {
      const result = await deleteTestimonial(testimonial.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setTestimonials((current) =>
        current.filter((item) => item.id !== testimonial.id),
      );

      setNotice(
        `Le témoignage de ${testimonial.name} a été supprimé.`,
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du témoignage :",
        err,
      );

      setError(
        "Une erreur est survenue lors de la suppression.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* HEADER */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              <span>Contenu</span>
              <span>/</span>
              <span className="text-neutral-700">
                Témoignages
              </span>
            </div>

            <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
              Témoignages
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
              Gère les retours de tes clients, leurs notes et
              les témoignages mis en avant sur ton portfolio.
            </p>
          </div>

          <Link
            href="/testimonials/new"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
          >
            <HugeiconsIcon
              icon={Add01Icon}
              size={18}
              strokeWidth={1.8}
            />
            Nouveau témoignage
          </Link>
        </header>

        {/* MESSAGES */}
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
          aria-label="Statistiques des témoignages"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <StatCard
            label="Total"
            value={String(stats.total)}
            description="Témoignages enregistrés"
            icon="quotes"
          />

          <StatCard
            label="Mis en avant"
            value={String(stats.featured)}
            description="Témoignages prioritaires"
            icon="featured"
            accent
          />

          <StatCard
            label="Notés"
            value={String(stats.rated)}
            description="Avec une note attribuée"
            icon="rated"
          />

          <StatCard
            label="Note moyenne"
            value={
              stats.averageRating === null
                ? "—"
                : stats.averageRating.toFixed(1).replace(".", ",")
            }
            description="Sur 5, selon les notes renseignées"
            icon="average"
          />
        </section>

        {/* CATALOGUE */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* TOOLBAR */}
          <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-950">
                  Tous les témoignages
                </h2>

                <p className="mt-1 text-xs text-neutral-400">
                  {filteredTestimonials.length} résultat
                  {filteredTestimonials.length !== 1 ? "s" : ""}
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

                  <label
                    htmlFor="testimonial-search"
                    className="sr-only"
                  >
                    Rechercher un témoignage
                  </label>

                  <input
                    id="testimonial-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Nom, entreprise, contenu..."
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSortMode((current) =>
                      current === "order" ? "updated" : "order",
                    )
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
                >
                  {sortMode === "order"
                    ? "Ordre d'affichage"
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
                Tous
              </FilterButton>

              <FilterButton
                active={filter === "featured"}
                onClick={() => setFilter("featured")}
              >
                Mis en avant
              </FilterButton>

              <FilterButton
                active={filter === "rated"}
                onClick={() => setFilter("rated")}
              >
                Avec une note
              </FilterButton>

              <FilterButton
                active={filter === "unrated"}
                onClick={() => setFilter("unrated")}
              >
                Sans note
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

          {/* VIDE */}
          {!isLoading && filteredTestimonials.length === 0 && (
            <EmptyState
              hasTestimonials={testimonials.length > 0}
              onReset={resetFilters}
            />
          )}

          {/* DESKTOP */}
          {!isLoading && filteredTestimonials.length > 0 && (
            <div className="hidden md:block">
              <div className="grid grid-cols-[minmax(280px,1.5fr)_minmax(180px,1.2fr)_100px_110px_auto] items-center gap-4 border-b border-neutral-100 bg-neutral-50/70 px-5 py-3">
                <HeaderCell>Témoin</HeaderCell>
                <HeaderCell>Témoignage</HeaderCell>
                <HeaderCell>Note</HeaderCell>
                <HeaderCell>Visibilité</HeaderCell>
                <HeaderCell align="right">
                  Actions
                </HeaderCell>
              </div>

              <div className="divide-y divide-neutral-100">
                {filteredTestimonials.map((testimonial) => (
                  <TestimonialRow
                    key={testimonial.id}
                    testimonial={testimonial}
                    deletingId={deletingId}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* MOBILE */}
          {!isLoading && filteredTestimonials.length > 0 && (
            <div className="divide-y divide-neutral-100 md:hidden">
              {filteredTestimonials.map((testimonial) => (
                <TestimonialMobileCard
                  key={testimonial.id}
                  testimonial={testimonial}
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
/* STAT CARD */
/* ============================================================ */

function StatCard({
  label,
  value,
  description,
  icon,
  accent = false,
}: {
  label: string;
  value: string;
  description: string;
  icon: "quotes" | "featured" | "rated" | "average";
  accent?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
      {accent && (
        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#E30613]" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-[28px]">
            {value}
            {icon === "average" && value !== "—" && (
              <span className="ml-1 text-sm font-medium text-neutral-400">
                /5
              </span>
            )}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            accent ? "bg-[#FDE8EA]" : "bg-neutral-100"
          }`}
        >
          {icon === "average" || icon === "rated" ? (
            <HugeiconsIcon
              icon={StarIcon}
              size={17}
              strokeWidth={1.8}
              className={
                accent ? "text-[#E30613]" : "text-neutral-500"
              }
            />
          ) : icon === "featured" ? (
            <span className="text-sm font-semibold text-[#E30613]">
              ★
            </span>
          ) : (
            <span className="text-lg font-semibold text-neutral-500">
              “
            </span>
          )}
        </div>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        {description}
      </p>
    </div>
  );
}

/* ============================================================ */
/* FILTER BUTTON */
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
/* HEADER CELL */
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
/* STAR RATING */
/* ============================================================ */

function RatingDisplay({
  rating,
}: {
  rating: number | null;
}) {
  if (rating === null) {
    return (
      <span className="text-xs text-neutral-400">
        Non noté
      </span>
    );
  }

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${rating} sur 5`}
      title={`${rating}/5`}
    >
      <span className="flex gap-0.5 text-[13px] text-[#C58D28]">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={
              index < rating
                ? "opacity-100"
                : "opacity-25"
            }
          >
            ★
          </span>
        ))}
      </span>
      <span className="ml-1 text-[11px] font-medium tabular-nums text-neutral-600">
        {rating}/5
      </span>
    </div>
  );
}

/* ============================================================ */
/* DESKTOP ROW */
/* ============================================================ */

function TestimonialRow({
  testimonial,
  deletingId,
  onDelete,
}: {
  testimonial: AdminTestimonial;
  deletingId: string | null;
  onDelete: (testimonial: AdminTestimonial) => void;
}) {
  return (
    <div className="grid grid-cols-[minmax(280px,1.5fr)_minmax(180px,1.2fr)_100px_110px_auto] items-center gap-4 px-5 py-4 transition hover:bg-neutral-50/60">
      {/* Témoin */}
      <div className="flex min-w-0 items-center gap-3">
        {testimonial.avatar ? (
          // Les avatars distants restent des images ordinaires.
          <img
            src={testimonial.avatar}
            alt=""
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 bg-neutral-100 object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
            {getInitials(testimonial.name) || "?"}
          </div>
        )}

        <div className="min-w-0">
          <Link
            href={`/testimonials/${testimonial.id}`}
            className="block truncate text-sm font-semibold text-neutral-950 hover:underline hover:underline-offset-4"
          >
            {testimonial.name}
          </Link>

          <p className="mt-0.5 truncate text-[11px] text-neutral-400">
            {[testimonial.role, testimonial.company]
              .filter(Boolean)
              .join(" · ") || "Informations non renseignées"}
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="min-w-0">
        <p className="line-clamp-2 text-xs leading-5 text-neutral-500">
          {testimonial.content}
        </p>
      </div>

      {/* Note */}
      <div>
        <RatingDisplay rating={testimonial.rating} />
      </div>

      {/* Visibilité */}
      <div>
        {testimonial.featured ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDE8EA] px-2.5 py-1 text-[10px] font-medium text-[#B30A16]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
            En avant
          </span>
        ) : (
          <span className="text-xs text-neutral-400">
            Standard
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-1">
        <Link
          href={`/testimonials/${testimonial.id}`}
          title="Modifier"
          aria-label={`Modifier le témoignage de ${testimonial.name}`}
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
          onClick={() => void onDelete(testimonial)}
          disabled={deletingId === testimonial.id}
          title="Supprimer"
          aria-label={`Supprimer le témoignage de ${testimonial.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {deletingId === testimonial.id ? (
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
/* MOBILE CARD */
/* ============================================================ */

function TestimonialMobileCard({
  testimonial,
  deletingId,
  onDelete,
}: {
  testimonial: AdminTestimonial;
  deletingId: string | null;
  onDelete: (testimonial: AdminTestimonial) => void;
}) {
  return (
    <article className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt=""
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 bg-neutral-100 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
              {getInitials(testimonial.name) || "?"}
            </div>
          )}

          <div className="min-w-0">
            <Link
              href={`/testimonials/${testimonial.id}`}
              className="block truncate text-sm font-semibold text-neutral-950"
            >
              {testimonial.name}
            </Link>

            <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-400">
              {[testimonial.role, testimonial.company]
                .filter(Boolean)
                .join(" · ") || "Informations non renseignées"}
            </p>
          </div>
        </div>

        {testimonial.featured && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FDE8EA] px-2 py-1 text-[10px] font-medium text-[#B30A16]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
            En avant
          </span>
        )}
      </div>

      <div className="rounded-xl bg-neutral-50 p-3">
        <p className="line-clamp-4 text-xs leading-6 text-neutral-600">
          “{testimonial.content}”
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <RatingDisplay rating={testimonial.rating} />
        <span className="text-[10px] text-neutral-400">
          Modifié le {formatDate(testimonial.updatedAt)}
        </span>
      </div>

      <div className="flex gap-2 border-t border-neutral-100 pt-3">
        <Link
          href={`/testimonials/${testimonial.id}`}
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
          onClick={() => void onDelete(testimonial)}
          disabled={deletingId === testimonial.id}
          aria-label={`Supprimer le témoignage de ${testimonial.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {deletingId === testimonial.id ? (
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
    </article>
  );
}

/* ============================================================ */
/* LOADING */
/* ============================================================ */

function LoadingState() {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-3"
      role="status"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      <p className="text-sm text-neutral-400">
        Chargement des témoignages...
      </p>
    </div>
  );
}

/* ============================================================ */
/* EMPTY STATE */
/* ============================================================ */

function EmptyState({
  hasTestimonials,
  onReset,
}: {
  hasTestimonials: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <span className="text-3xl font-semibold leading-none">“</span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-neutral-950">
        {hasTestimonials
          ? "Aucun témoignage ne correspond"
          : "Aucun témoignage pour le moment"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        {hasTestimonials
          ? "Modifie ta recherche ou tes filtres pour retrouver un témoignage."
          : "Ajoute les retours de tes clients pour enrichir ton portfolio."}
      </p>

      {hasTestimonials ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-xs font-medium text-neutral-800 underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      ) : (
        <Link
          href="/testimonials/new"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-950 px-4 text-xs font-medium text-white transition hover:bg-neutral-800"
        >
          <HugeiconsIcon
            icon={Add01Icon}
            size={16}
            strokeWidth={1.8}
          />
          Créer un témoignage
        </Link>
      )}
    </div>
  );
}

/* ============================================================ */
/* MESSAGE BANNER */
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