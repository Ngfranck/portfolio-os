"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Briefcase01Icon,
  Delete02Icon,
  Edit02Icon,
  Search01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import {
  deleteService,
  getAdminServices,
  type AdminService,
} from "./actions";

type ServiceFilter = "all" | "featured" | "linked" | "unlinked";

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function ServicesPage(): ReactNode {
  const [services, setServices] = useState<AdminService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ServiceFilter>("all");

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAdminServices();

      if (!result.success) {
        setServices([]);
        setError(result.error);
        return;
      }

      setServices(result.services);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des services :",
        err,
      );

      setError(
        "Impossible de charger les services. Réessaie.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadServices();
  }, [loadServices]);

  const stats = useMemo(() => {
    const total = services.length;

    const featured = services.filter(
      (service) => service.featured,
    ).length;

    const linked = services.filter(
      (service) => service._count.projects > 0,
    ).length;

    const available = services.filter(
      (service) => service._count.projects === 0,
    ).length;

    return {
      total,
      featured,
      linked,
      available,
    };
  }, [services]);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services
      .filter((service) => {
        const matchesSearch =
          query.length === 0 ||
          service.title.toLowerCase().includes(query) ||
          service.slug.toLowerCase().includes(query) ||
          service.shortDescription
            .toLowerCase()
            .includes(query);

        const matchesFilter =
          filter === "all" ||
          (filter === "featured" && service.featured) ||
          (filter === "linked" &&
            service._count.projects > 0) ||
          (filter === "unlinked" &&
            service._count.projects === 0);

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) {
          return a.sortOrder - b.sortOrder;
        }

        return (
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
        );
      });
  }, [services, search, filter]);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
  };

  const handleDelete = async (service: AdminService) => {
    if (service._count.projects > 0) {
      setError(
        `Impossible de supprimer « ${service.title} » : ce service est encore associé à ${service._count.projects} projet${
          service._count.projects > 1 ? "s" : ""
        }.`,
      );
      return;
    }

    const confirmed = window.confirm(
      `Supprimer « ${service.title} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(service.id);
    setError(null);
    setNotice(null);

    try {
      const result = await deleteService(service.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setServices((current) =>
        current.filter((item) => item.id !== service.id),
      );

      setNotice(
        `Le service « ${service.title} » a été supprimé.`,
      );
    } catch (err) {
      console.error(
        "Erreur lors de la suppression :",
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
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8">
          {/* Header */}
          <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                <span>Contenu</span>
                <span>/</span>
                <span className="text-neutral-700">
                  Services
                </span>
              </div>

              <h1 className="text-[36px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[42px]">
                Services
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                Gère les prestations de ton portfolio, leur
                visibilité et leur utilisation dans tes projets.
              </p>
            </div>

            <Link
              href="/services/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
            >
              <HugeiconsIcon
                icon={Add01Icon}
                size={18}
                strokeWidth={1.8}
              />
              Nouveau service
            </Link>
          </header>

          {/* Messages */}
          {error && (
            <div
              role="alert"
              className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              <p className="leading-6">{error}</p>

              <button
                type="button"
                onClick={() => setError(null)}
                className="shrink-0 text-xs font-medium underline underline-offset-4"
              >
                Fermer
              </button>
            </div>
          )}

          {notice && (
            <div
              role="status"
              className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700"
            >
              <p className="leading-6">{notice}</p>

              <button
                type="button"
                onClick={() => setNotice(null)}
                className="shrink-0 text-xs font-medium underline underline-offset-4"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Stats */}
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              label="Total"
              value={stats.total}
              description="Services configurés"
              icon={Briefcase01Icon}
            />

            <StatCard
              label="Mis en avant"
              value={stats.featured}
              description="Services prioritaires"
              icon={StarIcon}
              accent
            />

            <StatCard
              label="Associés"
              value={stats.linked}
              description="Utilisés par un projet"
              icon={Briefcase01Icon}
            />

            <StatCard
              label="Disponibles"
              value={stats.available}
              description="Sans projet associé"
              icon={Add01Icon}
            />
          </section>

          {/* Liste */}
          <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {/* Toolbar */}
            <div className="border-b border-neutral-200 px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Catalogue des services
                  </h2>

                  <p className="mt-1 text-xs text-neutral-400">
                    {filteredServices.length} service
                    {filteredServices.length !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <div className="relative w-full lg:max-w-[320px]">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <label
                    htmlFor="service-search"
                    className="sr-only"
                  >
                    Rechercher un service
                  </label>

                  <input
                    id="service-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Rechercher un service..."
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                  />
                </div>
              </div>

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
                  active={filter === "linked"}
                  onClick={() => setFilter("linked")}
                >
                  Associés
                </FilterButton>

                <FilterButton
                  active={filter === "unlinked"}
                  onClick={() => setFilter("unlinked")}
                >
                  Disponibles
                </FilterButton>

                {(search || filter !== "all") && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="ml-1 px-2 text-xs font-medium text-neutral-400 underline underline-offset-4 hover:text-neutral-700"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>

            {/* Loading */}
            {isLoading && <LoadingState />}

            {/* Empty */}
            {!isLoading &&
              filteredServices.length === 0 && (
                <EmptyState
                  hasServices={services.length > 0}
                  onReset={resetFilters}
                />
              )}

            {/* Desktop */}
            {!isLoading &&
              filteredServices.length > 0 && (
                <div className="hidden md:block">
                  <div className="grid grid-cols-[minmax(280px,1.7fr)_0.8fr_0.8fr_0.5fr_auto] gap-4 border-b border-neutral-100 bg-neutral-50 px-5 py-3">
                    <HeaderCell>Service</HeaderCell>
                    <HeaderCell>Visibilité</HeaderCell>
                    <HeaderCell>Projets</HeaderCell>
                    <HeaderCell>Ordre</HeaderCell>
                    <HeaderCell align="right">
                      Actions
                    </HeaderCell>
                  </div>

                  <div className="divide-y divide-neutral-100">
                    {filteredServices.map((service) => (
                      <ServiceRow
                        key={service.id}
                        service={service}
                        deletingId={deletingId}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}

            {/* Mobile */}
            {!isLoading &&
              filteredServices.length > 0 && (
                <div className="divide-y divide-neutral-100 md:hidden">
                  {filteredServices.map((service) => (
                    <ServiceMobileCard
                      key={service.id}
                      service={service}
                      deletingId={deletingId}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  description,
  icon,
  accent = false,
}: {
  label: string;
  value: number;
  description: string;
  icon: unknown;
  accent?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
      {accent && (
        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#E30613]" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-neutral-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-[28px]">
            {value.toLocaleString("fr-FR")}
          </p>
        </div>

        <div
          className={
            accent
              ? "flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDE8EA]"
              : "flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100"
          }
        >
          <HugeiconsIcon
            icon={icon as never}
            size={17}
            strokeWidth={1.8}
            className={
              accent
                ? "text-[#E30613]"
                : "text-neutral-500"
            }
          />
        </div>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        {description}
      </p>
    </div>
  );
}

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

function HeaderCell({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={
        align === "right"
          ? "text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400"
          : "text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400"
      }
    >
      {children}
    </div>
  );
}

function ServiceRow({
  service,
  deletingId,
  onDelete,
}: {
  service: AdminService;
  deletingId: string | null;
  onDelete: (service: AdminService) => void;
}) {
  const hasProjects = service._count.projects > 0;

  return (
    <div className="grid grid-cols-[minmax(280px,1.7fr)_0.8fr_0.8fr_0.5fr_auto] items-center gap-4 px-5 py-4 transition hover:bg-neutral-50">
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
            <HugeiconsIcon
              icon={Briefcase01Icon}
              size={16}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <Link
              href={`/services/${service.id}`}
              className="block truncate text-sm font-semibold text-neutral-950 hover:underline hover:underline-offset-4"
            >
              {service.title}
            </Link>

            <p className="mt-0.5 truncate font-mono text-[11px] text-neutral-400">
              /{service.slug}
            </p>

            <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <div>
        {service.featured ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDE8EA] px-2.5 py-1 text-[11px] font-medium text-[#B30A16]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
            Mis en avant
          </span>
        ) : (
          <span className="text-xs text-neutral-400">
            Standard
          </span>
        )}
      </div>

      <div>
        <span className="text-sm font-medium text-neutral-700">
          {service._count.projects}
        </span>

        <span className="ml-1 text-xs text-neutral-400">
          projet
          {service._count.projects !== 1 ? "s" : ""}
        </span>
      </div>

      <div>
        <span className="inline-flex min-w-7 items-center justify-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
          {service.sortOrder}
        </span>
      </div>

      <div className="flex items-center justify-end gap-1">
        <Link
          href={`/services/${service.id}`}
          title="Modifier"
          aria-label={`Modifier ${service.title}`}
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
          onClick={() => void onDelete(service)}
          disabled={
            deletingId === service.id || hasProjects
          }
          title={
            hasProjects
              ? "Service associé à des projets"
              : "Supprimer"
          }
          aria-label={`Supprimer ${service.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-25"
        >
          {deletingId === service.id ? (
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

function ServiceMobileCard({
  service,
  deletingId,
  onDelete,
}: {
  service: AdminService;
  deletingId: string | null;
  onDelete: (service: AdminService) => void;
}) {
  const hasProjects = service._count.projects > 0;

  return (
    <article className="space-y-4 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-500">
            <HugeiconsIcon
              icon={Briefcase01Icon}
              size={16}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <Link
              href={`/services/${service.id}`}
              className="block truncate text-sm font-semibold text-neutral-950"
            >
              {service.title}
            </Link>

            <p className="mt-0.5 truncate font-mono text-[11px] text-neutral-400">
              /{service.slug}
            </p>
          </div>
        </div>

        {service.featured && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FDE8EA] px-2 py-1 text-[10px] font-medium text-[#B30A16]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
            En avant
          </span>
        )}
      </div>

      <p className="text-sm leading-6 text-neutral-500">
        {service.shortDescription}
      </p>

      <div className="grid grid-cols-3 gap-2">
        <MiniMeta
          label="Projets"
          value={String(service._count.projects)}
        />

        <MiniMeta
          label="Ordre"
          value={String(service.sortOrder)}
        />

        <MiniMeta
          label="Modifié"
          value={formatDate(service.updatedAt)}
        />
      </div>

      <div className="flex gap-2 border-t border-neutral-100 pt-3">
        <Link
          href={`/services/${service.id}`}
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
          onClick={() => void onDelete(service)}
          disabled={
            deletingId === service.id || hasProjects
          }
          title={
            hasProjects
              ? "Service associé à des projets"
              : "Supprimer"
          }
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-25"
        >
          {deletingId === service.id ? (
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

function LoadingState() {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-3"
      role="status"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />

      <p className="text-sm text-neutral-400">
        Chargement des services...
      </p>
    </div>
  );
}

function EmptyState({
  hasServices,
  onReset,
}: {
  hasServices: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <HugeiconsIcon
          icon={Briefcase01Icon}
          size={22}
          strokeWidth={1.7}
        />
      </div>

      <h3 className="mt-5 text-sm font-semibold text-neutral-950">
        {hasServices
          ? "Aucun service ne correspond"
          : "Aucun service pour le moment"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        {hasServices
          ? "Modifie ta recherche ou tes filtres pour retrouver un service."
          : "Commence par créer la première prestation de ton catalogue."}
      </p>

      {hasServices ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-xs font-medium text-neutral-800 underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      ) : (
        <Link
          href="/services/new"
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-950 px-4 text-xs font-medium text-white transition hover:bg-neutral-800"
        >
          <HugeiconsIcon
            icon={Add01Icon}
            size={16}
            strokeWidth={1.8}
          />
          Créer un service
        </Link>
      )}
    </div>
  );
}