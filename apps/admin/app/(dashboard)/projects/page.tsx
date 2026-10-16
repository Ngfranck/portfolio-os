"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  Archive01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Briefcase01Icon,
  Delete02Icon,
  FilterIcon,
  PencilEdit01Icon,
  Search01Icon,
  Sorting01Icon,
} from "@hugeicons/core-free-icons";

import {
  archiveProject,
  deleteProject,
  getAdminProjects,
} from "./actions";

type ProjectStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

type AdminProject = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
  year: string;
  updatedAt: string;
  category: string;
};

type StatusFilter =
  | "Tous"
  | "Publié"
  | "Brouillon"
  | "Archivé";

type ActionState =
  | {
      projectId: string;
      action: "archive" | "delete";
    }
  | null;

const statusLabels: Record<
  ProjectStatus,
  string
> = {
  DRAFT: "Brouillon",
  PUBLISHED: "Publié",
  ARCHIVED: "Archivé",
};

const statuses: StatusFilter[] = [
  "Tous",
  "Publié",
  "Brouillon",
  "Archivé",
];

const sortOptions = [
  "Plus récents",
  "Plus anciens",
  "Nom A → Z",
  "Nom Z → A",
];

function formatProjectDate(
  dateString: string,
) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }

  const now = new Date();

  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isToday) {
    return "Aujourd’hui";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<
    AdminProject[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<StatusFilter>("Tous");

  const [category, setCategory] =
    useState("Toutes");

  const [sort, setSort] =
    useState("Plus récents");

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [sortOpen, setSortOpen] =
    useState(false);

  const [actionState, setActionState] =
    useState<ActionState>(null);

  const [actionMessage, setActionMessage] =
    useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const result =
        await getAdminProjects();

      if (!result.success) {
        setLoadError(result.error);
        setProjects([]);
        return;
      }

      setProjects(result.projects);
    } catch (error) {
      console.error(
        "Erreur lors du chargement des projets :",
        error,
      );

      setLoadError(
        "Impossible de charger les projets.",
      );

      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  useEffect(() => {
    if (!actionMessage) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setActionMessage(null);
      }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [actionMessage]);

  const categories = useMemo(() => {
    const uniqueCategories =
      Array.from(
        new Set(
          projects
            .map(
              (project) =>
                project.category,
            )
            .filter(Boolean),
        ),
      ).sort((a, b) =>
        a.localeCompare(b, "fr"),
      );

    return [
      "Toutes",
      ...uniqueCategories,
    ];
  }, [projects]);

  const totalProjects = projects.length;

  const publishedProjects =
    projects.filter(
      (project) =>
        project.status === "PUBLISHED",
    ).length;

  const draftProjects =
    projects.filter(
      (project) =>
        project.status === "DRAFT",
    ).length;

  const latestProject = useMemo(() => {
    if (projects.length === 0) {
      return null;
    }

    return [...projects].sort(
      (a, b) =>
        new Date(
          b.updatedAt,
        ).getTime() -
        new Date(
          a.updatedAt,
        ).getTime(),
    )[0];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return [...projects]
      .filter((project) => {
        const matchesSearch =
          normalizedSearch === "" ||
          project.name
            .toLowerCase()
            .includes(
              normalizedSearch,
            ) ||
          project.category
            .toLowerCase()
            .includes(
              normalizedSearch,
            );

        const matchesStatus =
          status === "Tous" ||
          statusLabels[
            project.status
          ] === status;

        const matchesCategory =
          category === "Toutes" ||
          project.category ===
            category;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        if (
          sort === "Nom A → Z"
        ) {
          return a.name.localeCompare(
            b.name,
            "fr",
          );
        }

        if (
          sort === "Nom Z → A"
        ) {
          return b.name.localeCompare(
            a.name,
            "fr",
          );
        }

        if (
          sort === "Plus anciens"
        ) {
          return (
            new Date(
              a.updatedAt,
            ).getTime() -
            new Date(
              b.updatedAt,
            ).getTime()
          );
        }

        return (
          new Date(
            b.updatedAt,
          ).getTime() -
          new Date(
            a.updatedAt,
          ).getTime()
        );
      });
  }, [
    projects,
    search,
    status,
    category,
    sort,
  ]);

  const activeFilters =
    Number(status !== "Tous") +
    Number(category !== "Toutes");

  const handleArchiveProject = async (
    project: AdminProject,
  ) => {
    if (actionState) {
      return;
    }

    const confirmed =
      window.confirm(
        `Archiver le projet « ${project.name} » ?\n\nIl restera enregistré dans votre base de données, mais ne sera plus considéré comme publié.`,
      );

    if (!confirmed) {
      return;
    }

    setActionState({
      projectId: project.id,
      action: "archive",
    });

    setActionMessage(null);

    try {
      const result =
        await archiveProject(
          project.id,
        );

      if (!result.success) {
        setActionMessage(
          result.error,
        );
        return;
      }

      setProjects((current) =>
        current.map((item) =>
          item.id === project.id
            ? {
                ...item,
                status: "ARCHIVED",
                updatedAt:
                  new Date().toISOString(),
              }
            : item,
        ),
      );

      setActionMessage(
        `Le projet « ${project.name} » a été archivé.`,
      );
    } catch (error) {
      console.error(
        "Erreur lors de l’archivage du projet :",
        error,
      );

      setActionMessage(
        "Impossible d’archiver ce projet.",
      );
    } finally {
      setActionState(null);
    }
  };

  const handleDeleteProject = async (
    project: AdminProject,
  ) => {
    if (actionState) {
      return;
    }

    const confirmed =
      window.confirm(
        `Supprimer définitivement le projet « ${project.name} » ?\n\nCette action supprimera également ses données associées et ne peut pas être annulée.`,
      );

    if (!confirmed) {
      return;
    }

    setActionState({
      projectId: project.id,
      action: "delete",
    });

    setActionMessage(null);

    try {
      const result =
        await deleteProject(
          project.id,
        );

      if (!result.success) {
        setActionMessage(
          result.error,
        );
        return;
      }

      setProjects((current) =>
        current.filter(
          (item) =>
            item.id !== project.id,
        ),
      );

      setActionMessage(
        `Le projet « ${project.name} » a été supprimé.`,
      );
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du projet :",
        error,
      );

      setActionMessage(
        "Impossible de supprimer ce projet.",
      );
    } finally {
      setActionState(null);
    }
  };

  const isProjectActionRunning = (
    projectId: string,
    action:
      | "archive"
      | "delete",
  ) =>
    actionState?.projectId ===
      projectId &&
    actionState.action === action;

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:px-8 lg:py-10 lg:pb-12">
        {/* ============================================================
            HEADER
            ============================================================ */}

        <header className="mb-9 sm:mb-11 lg:mb-14">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-[#E30613]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E30613]">
                  Portfolio · Gestion
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-[#111]">
                  Projets
                </h1>

                <span className="text-[11px] font-semibold tracking-[0.08em] text-[#999]">
                  {String(
                    totalProjects,
                  ).padStart(
                    2,
                    "0",
                  )}
                </span>
              </div>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#666] sm:text-[15px]">
                Organise, publie et maintiens
                les projets présentés sur ton
                portfolio Gonar.ui.
              </p>
            </div>

            <Link
              href="/projects/new"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#111] px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2 sm:w-fit"
            >
              <HugeiconsIcon
                icon={Briefcase01Icon}
                size={17}
                strokeWidth={1.8}
              />

              <span>
                Nouveau projet
              </span>
            </Link>
          </div>
        </header>

        {actionMessage && (
          <div className="mb-5 rounded-2xl border border-[#e5e5e2] bg-[#fafaf8] p-4">
            <div className="flex items-start gap-3">
              <span
                className={[
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  actionMessage.includes(
                    "Impossible",
                  ) ||
                  actionMessage.includes(
                    "introuvable",
                  )
                    ? "bg-[#E30613]"
                    : "bg-[#48A868]",
                ].join(" ")}
              />

              <p className="text-xs leading-5 text-[#666]">
                {actionMessage}
              </p>
            </div>
          </div>
        )}

        {/* ============================================================
            APERÇU
            ============================================================ */}

        <section
          aria-labelledby="projects-overview-heading"
          className="mb-11 lg:mb-14"
        >
          <div className="mb-5 flex items-end justify-between border-b border-[#e5e5e2] pb-4">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">
                Aperçu
              </p>

              <h2
                id="projects-overview-heading"
                className="text-2xl font-semibold tracking-[-0.04em] text-[#111] sm:text-[28px]"
              >
                Vue des projets
              </h2>
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
              01
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#e5e5e2] bg-[#e5e5e2] lg:grid-cols-4">
            <article className="bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-[#666]">
                  Total
                </p>

                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#111]"
                />
              </div>

              <p className="mt-6 text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">
                {String(
                  totalProjects,
                ).padStart(
                  2,
                  "0",
                )}
              </p>

              <p className="mt-3 text-[11px] leading-4 text-[#999]">
                Projets enregistrés
              </p>
            </article>

            <article className="bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-[#666]">
                  Publiés
                </p>

                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#48A868]"
                />
              </div>

              <p className="mt-6 text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">
                {String(
                  publishedProjects,
                ).padStart(
                  2,
                  "0",
                )}
              </p>

              <p className="mt-3 text-[11px] leading-4 text-[#999]">
                Visibles sur le portfolio
              </p>
            </article>

            <article className="bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-[#666]">
                  Brouillons
                </p>

                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#999]"
                />
              </div>

              <p className="mt-6 text-3xl font-semibold leading-none tracking-[-0.05em] sm:text-4xl">
                {String(
                  draftProjects,
                ).padStart(
                  2,
                  "0",
                )}
              </p>

              <p className="mt-3 text-[11px] leading-4 text-[#999]">
                En cours de préparation
              </p>
            </article>

            <article className="bg-white p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-[#666]">
                  Dernière mise à jour
                </p>

                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#E30613]"
                />
              </div>

              <p className="mt-6 truncate text-xl font-semibold leading-none tracking-[-0.04em] sm:text-2xl">
                {latestProject
                  ? formatProjectDate(
                      latestProject.updatedAt,
                    )
                  : "—"}
              </p>

              <p className="mt-3 truncate text-[11px] leading-4 text-[#999]">
                {latestProject?.name ??
                  "Aucun projet"}
              </p>
            </article>
          </div>
        </section>

        {/* ============================================================
            BIBLIOTHÈQUE DES PROJETS
            ============================================================ */}

        <section aria-labelledby="projects-list-heading">
          <div className="mb-6 flex flex-col gap-4 border-b border-[#e5e5e2] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-[#E30613]"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E30613]">
                  Bibliothèque
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <h2
                  id="projects-list-heading"
                  className="text-2xl font-semibold tracking-[-0.04em] text-[#111] sm:text-[30px]"
                >
                  Tous les projets
                </h2>

                <span className="text-[11px] font-semibold text-[#999]">
                  {filteredProjects.length
                    .toString()
                    .padStart(
                      2,
                      "0",
                    )}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#999]">
              {filteredProjects.length}{" "}
              projet
              {filteredProjects.length >
              1
                ? "s"
                : ""}{" "}
              affiché
              {filteredProjects.length >
              1
                ? "s"
                : ""}
            </p>
          </div>

          {/* ============================================================
              OUTILS DE RECHERCHE ET DE FILTRE
              ============================================================ */}

          <div className="mb-5 rounded-2xl border border-[#e5e5e2] bg-white p-3 sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <label className="relative flex min-h-11 min-w-0 flex-1 items-center">
                <span className="sr-only">
                  Rechercher un projet
                </span>

                <HugeiconsIcon
                  icon={Search01Icon}
                  size={17}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 text-[#999]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Rechercher un projet..."
                  className="h-11 w-full rounded-xl border border-[#e5e5e2] bg-[#fafaf8] pl-11 pr-4 text-sm font-medium text-[#111] outline-none transition-colors duration-150 placeholder:text-[#999] focus:border-[#111] focus:ring-2 focus:ring-[#E30613]/10"
                />
              </label>

              <div className="grid grid-cols-2 gap-2 sm:flex">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setFilterOpen(
                        (current) =>
                          !current,
                      );
                      setSortOpen(false);
                    }}
                    aria-expanded={
                      filterOpen
                    }
                    aria-controls="projects-filter-panel"
                    className={[
                      "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2 sm:w-auto",
                      activeFilters >
                      0
                        ? "border-[#111] bg-[#111] text-white"
                        : "border-[#e5e5e2] bg-white text-[#111] hover:bg-[#f7f7f5]",
                    ].join(" ")}
                  >
                    <HugeiconsIcon
                      icon={FilterIcon}
                      size={16}
                      strokeWidth={1.7}
                    />

                    <span>
                      Filtrer
                    </span>

                    {activeFilters >
                      0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-[#111]">
                        {
                          activeFilters
                        }
                      </span>
                    )}
                  </button>

                  {filterOpen && (
                    <div
                      id="projects-filter-panel"
                      className="absolute right-0 top-[calc(100%+8px)] z-30 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white shadow-[0_16px_50px_rgba(17,17,17,0.12)]"
                    >
                      <div className="border-b border-[#e5e5e2] px-5 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#999]">
                              Affichage
                            </p>

                            <h3 className="mt-1 text-sm font-semibold tracking-[-0.02em] text-[#111]">
                              Filtrer les
                              projets
                            </h3>
                          </div>

                          <span className="text-[9px] font-semibold text-[#999]">
                            {
                              activeFilters
                            }{" "}
                            actif
                            {activeFilters >
                            1
                              ? "s"
                              : ""}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-5 p-5">
                        <fieldset>
                          <legend className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#666]">
                            Statut
                          </legend>

                          <div className="space-y-1">
                            {statuses.map(
                              (
                                item,
                              ) => {
                                const active =
                                  status ===
                                  item;

                                return (
                                  <button
                                    key={
                                      item
                                    }
                                    type="button"
                                    onClick={() =>
                                      setStatus(
                                        item,
                                      )
                                    }
                                    className={[
                                      "flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]",
                                      active
                                        ? "bg-[#FDE8EA] text-[#111]"
                                        : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                                    ].join(
                                      " ",
                                    )}
                                  >
                                    <span>
                                      {
                                        item
                                      }
                                    </span>

                                    {active && (
                                      <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
                                    )}
                                  </button>
                                );
                              },
                            )}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#666]">
                            Catégorie
                          </legend>

                          <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
                            {categories.map(
                              (
                                item,
                              ) => {
                                const active =
                                  category ===
                                  item;

                                return (
                                  <button
                                    key={
                                      item
                                    }
                                    type="button"
                                    onClick={() =>
                                      setCategory(
                                        item,
                                      )
                                    }
                                    className={[
                                      "flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-left text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]",
                                      active
                                        ? "bg-[#FDE8EA] text-[#111]"
                                        : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                                    ].join(
                                      " ",
                                    )}
                                  >
                                    <span className="truncate">
                                      {
                                        item
                                      }
                                    </span>

                                    {active && (
                                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E30613]" />
                                    )}
                                  </button>
                                );
                              },
                            )}
                          </div>
                        </fieldset>
                      </div>

                      <div className="border-t border-[#e5e5e2] bg-[#fafaf8] p-4">
                        <button
                          type="button"
                          onClick={() => {
                            setStatus(
                              "Tous",
                            );
                            setCategory(
                              "Toutes",
                            );
                          }}
                          className="min-h-10 w-full rounded-xl border border-[#e5e5e2] bg-white px-4 text-xs font-semibold text-[#111] transition-colors duration-150 hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                        >
                          Réinitialiser
                          les filtres
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setSortOpen(
                        (current) =>
                          !current,
                      );
                      setFilterOpen(false);
                    }}
                    aria-expanded={
                      sortOpen
                    }
                    aria-controls="projects-sort-panel"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-4 text-xs font-semibold text-[#111] transition-colors duration-150 hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2 sm:w-auto"
                  >
                    <HugeiconsIcon
                      icon={Sorting01Icon}
                      size={16}
                      strokeWidth={1.7}
                    />

                    <span>
                      Trier
                    </span>

                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={14}
                      strokeWidth={1.7}
                    />
                  </button>

                  {sortOpen && (
                    <div
                      id="projects-sort-panel"
                      className="absolute right-0 top-[calc(100%+8px)] z-30 w-[240px] overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white p-2 shadow-[0_16px_50px_rgba(17,17,17,0.12)]"
                    >
                      <div className="px-3 py-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#999]">
                          Trier par
                        </p>
                      </div>

                      <div className="space-y-1">
                        {sortOptions.map(
                          (
                            item,
                          ) => {
                            const active =
                              sort ===
                              item;

                            return (
                              <button
                                key={
                                  item
                                }
                                type="button"
                                onClick={() => {
                                  setSort(
                                    item,
                                  );
                                  setSortOpen(
                                    false,
                                  );
                                }}
                                className={[
                                  "flex min-h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]",
                                  active
                                    ? "bg-[#111] text-white"
                                    : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                                ].join(
                                  " ",
                                )}
                              >
                                <span>
                                  {
                                    item
                                  }
                                </span>

                                {active && (
                                  <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 rounded-full bg-[#E30613]"
                                  />
                                )}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(activeFilters >
              0 ||
              search) && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#e5e5e2] pt-3">
                <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                  Filtres actifs
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#f7f7f5] px-3 text-[10px] font-semibold text-[#666] transition-colors hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                  >
                    Recherche :{" "}
                    {search}

                    <span
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </button>
                )}

                {status !==
                  "Tous" && (
                  <button
                    type="button"
                    onClick={() =>
                      setStatus(
                        "Tous",
                      )
                    }
                    className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#FDE8EA] px-3 text-[10px] font-semibold text-[#E30613] transition-colors hover:bg-[#f7d9dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                  >
                    {status}

                    <span
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </button>
                )}

                {category !==
                  "Toutes" && (
                  <button
                    type="button"
                    onClick={() =>
                      setCategory(
                        "Toutes",
                      )
                    }
                    className="inline-flex min-h-8 items-center gap-2 rounded-full bg-[#FDE8EA] px-3 text-[10px] font-semibold text-[#E30613] transition-colors hover:bg-[#f7d9dd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                  >
                    {category}

                    <span
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ============================================================
              TABLEAU
              ============================================================ */}

          <div className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white">
            {loading ? (
              <>
                <div className="hidden border-b border-[#e5e5e2] bg-[#fafaf8] px-6 py-4 lg:grid lg:grid-cols-[54px_minmax(180px,1.5fr)_minmax(160px,1.2fr)_120px_80px_130px_124px] lg:items-center lg:gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#999]">
                    #
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Projet
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Catégorie
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Statut
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Année
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Mise à jour
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Actions
                  </span>
                </div>

                <div className="divide-y divide-[#e5e5e2]">
                  {Array.from({
                    length: 4,
                  }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="min-h-[92px] animate-pulse bg-white px-5 py-5 sm:px-6 lg:px-6"
                      >
                        <div className="hidden h-[52px] lg:grid lg:grid-cols-[54px_minmax(180px,1.5fr)_minmax(160px,1.2fr)_120px_80px_130px_124px] lg:items-center lg:gap-4">
                          <div className="h-3 w-5 rounded bg-[#efefec]" />

                          <div className="h-10 w-48 rounded-xl bg-[#efefec]" />

                          <div className="h-3 w-32 rounded bg-[#efefec]" />

                          <div className="h-6 w-20 rounded-full bg-[#efefec]" />

                          <div className="h-3 w-10 rounded bg-[#efefec]" />

                          <div className="h-3 w-24 rounded bg-[#efefec]" />

                          <div className="h-9 w-28 rounded-xl bg-[#efefec]" />
                        </div>

                        <div className="flex items-center gap-3 lg:hidden">
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-[#efefec]" />

                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-32 rounded bg-[#efefec]" />

                            <div className="h-3 w-24 rounded bg-[#efefec]" />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </>
            ) : loadError ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDE8EA]">
                  <HugeiconsIcon
                    icon={Briefcase01Icon}
                    size={20}
                    strokeWidth={1.7}
                    className="text-[#E30613]"
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-[#111]">
                  Impossible de charger
                  les projets
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-[#999]">
                  {loadError}
                </p>

                <button
                  type="button"
                  onClick={
                    loadProjects
                  }
                  className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white px-4 text-xs font-semibold text-[#111] transition-colors hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <>
                <div className="hidden border-b border-[#e5e5e2] bg-[#fafaf8] px-6 py-4 lg:grid lg:grid-cols-[54px_minmax(180px,1.5fr)_minmax(160px,1.2fr)_120px_80px_130px_124px] lg:items-center lg:gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#999]">
                    #
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Projet
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Catégorie
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Statut
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Année
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Mise à jour
                  </span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">
                    Actions
                  </span>
                </div>

                {filteredProjects.length >
                0 ? (
                  <div className="divide-y divide-[#e5e5e2]">
                    {filteredProjects.map(
                      (
                        project,
                        index,
                      ) => {
                        const statusLabel =
                          statusLabels[
                            project.status
                          ];

                        const archiveRunning =
                          isProjectActionRunning(
                            project.id,
                            "archive",
                          );

                        const deleteRunning =
                          isProjectActionRunning(
                            project.id,
                            "delete",
                          );

                        const projectActionRunning =
                          Boolean(
                            actionState?.projectId ===
                              project.id,
                          );

                        return (
                          <article
                            key={
                              project.id
                            }
                            className="group transition-colors duration-150 hover:bg-[#fafaf8]"
                          >
                            {/* Desktop */}

                            <div className="hidden min-h-[92px] grid-cols-[54px_minmax(180px,1.5fr)_minmax(160px,1.2fr)_120px_80px_130px_124px] items-center gap-4 px-6 lg:grid">
                              <span className="text-[10px] font-semibold tracking-[0.08em] text-[#b5b5b1]">
                                {String(
                                  index +
                                    1,
                                ).padStart(
                                  2,
                                  "0",
                                )}
                              </span>

                              <Link
                                href={`/projects/${project.id}`}
                                className="min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    aria-hidden="true"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-[11px] font-semibold text-white"
                                  >
                                    {project.name
                                      .charAt(
                                        0,
                                      )
                                      .toUpperCase()}
                                  </span>

                                  <div className="min-w-0">
                                    <p className="truncate text-[15px] font-semibold tracking-[-0.025em] text-[#111]">
                                      {
                                        project.name
                                      }
                                    </p>

                                    <p className="mt-1 truncate text-[10px] text-[#999]">
                                      Projet
                                      portfolio
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              <p className="truncate text-xs font-medium text-[#666]">
                                {
                                  project.category
                                }
                              </p>

                              <span
                                className={[
                                  "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em]",
                                  project.status ===
                                  "PUBLISHED"
                                    ? "bg-[#FDE8EA] text-[#E30613]"
                                    : project.status ===
                                        "ARCHIVED"
                                      ? "bg-[#f1f1ee] text-[#777]"
                                      : "bg-[#f7f7f5] text-[#666]",
                                ].join(
                                  " ",
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 rounded-full bg-current"
                                />

                                {
                                  statusLabel
                                }
                              </span>

                              <span className="text-xs font-medium text-[#999]">
                                {project.year ||
                                  "—"}
                              </span>

                              <span className="text-[10px] text-[#999]">
                                {formatProjectDate(
                                  project.updatedAt,
                                )}
                              </span>

                              <div
                                className="flex items-center gap-1"
                                aria-label={`Actions pour ${project.name}`}
                              >
                                <Link
                                  href={`/projects/${project.id}`}
                                  aria-label={`Modifier le projet ${project.name}`}
                                  title="Modifier le projet"
                                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666] transition-colors duration-150 hover:bg-[#f7f7f5] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                                >
                                  <HugeiconsIcon
                                    icon={
                                      PencilEdit01Icon
                                    }
                                    size={
                                      16
                                    }
                                    strokeWidth={
                                      1.7
                                    }
                                  />
                                </Link>

                                <button
                                  type="button"
                                  aria-label={
                                    project.status ===
                                    "ARCHIVED"
                                      ? "Projet déjà archivé"
                                      : `Archiver le projet ${project.name}`
                                  }
                                  title={
                                    project.status ===
                                    "ARCHIVED"
                                      ? "Projet déjà archivé"
                                      : "Archiver le projet"
                                  }
                                  disabled={
                                    projectActionRunning ||
                                    project.status ===
                                      "ARCHIVED"
                                  }
                                  onClick={() =>
                                    void handleArchiveProject(
                                      project,
                                    )
                                  }
                                  className={[
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-[#666] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]",
                                    project.status ===
                                      "ARCHIVED"
                                      ? "cursor-not-allowed opacity-30"
                                      : "hover:bg-[#f7f7f5] hover:text-[#111]",
                                    archiveRunning
                                      ? "animate-pulse"
                                      : "",
                                  ].join(
                                    " ",
                                  )}
                                >
                                  <HugeiconsIcon
                                    icon={
                                      Archive01Icon
                                    }
                                    size={
                                      16
                                    }
                                    strokeWidth={
                                      1.7
                                    }
                                  />
                                </button>

                                <button
                                  type="button"
                                  aria-label={`Supprimer le projet ${project.name}`}
                                  title="Supprimer définitivement le projet"
                                  disabled={
                                    projectActionRunning
                                  }
                                  onClick={() =>
                                    void handleDeleteProject(
                                      project,
                                    )
                                  }
                                  className={[
                                    "flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors duration-150 hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] disabled:pointer-events-none disabled:opacity-40",
                                    deleteRunning
                                      ? "animate-pulse"
                                      : "",
                                  ].join(
                                    " ",
                                  )}
                                >
                                  <HugeiconsIcon
                                    icon={
                                      Delete02Icon
                                    }
                                    size={
                                      16
                                    }
                                    strokeWidth={
                                      1.7
                                    }
                                  />
                                </button>
                              </div>
                            </div>

                            {/* Mobile / tablette */}

                            <div className="px-5 py-5 lg:hidden sm:px-6">
                              <div className="flex items-start gap-3">
                                <span
                                  aria-hidden="true"
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-[10px] font-semibold text-white"
                                >
                                  {project.name
                                    .charAt(
                                      0,
                                    )
                                    .toUpperCase()}
                                </span>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <Link
                                        href={`/projects/${project.id}`}
                                        className="block truncate text-[16px] font-semibold tracking-[-0.025em] text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                                      >
                                        {
                                          project.name
                                        }
                                      </Link>

                                      <p className="mt-1 truncate text-[11px] text-[#666]">
                                        {
                                          project.category
                                        }
                                      </p>
                                    </div>

                                    <Link
                                      href={`/projects/${project.id}`}
                                      aria-label={`Ouvrir le projet ${project.name}`}
                                      title="Ouvrir le projet"
                                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#999] transition-colors duration-150 hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                                    >
                                      <HugeiconsIcon
                                        icon={
                                          ArrowRight01Icon
                                        }
                                        size={
                                          17
                                        }
                                        strokeWidth={
                                          1.7
                                        }
                                      />
                                    </Link>
                                  </div>

                                  <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <span
                                      className={[
                                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em]",
                                        project.status ===
                                        "PUBLISHED"
                                          ? "bg-[#FDE8EA] text-[#E30613]"
                                          : project.status ===
                                              "ARCHIVED"
                                            ? "bg-[#f1f1ee] text-[#777]"
                                            : "bg-[#f7f7f5] text-[#666]",
                                      ].join(
                                        " ",
                                      )}
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="h-1.5 w-1.5 rounded-full bg-current"
                                      />

                                      {
                                        statusLabel
                                      }
                                    </span>

                                    <span className="text-[10px] text-[#999]">
                                      {project.year ||
                                        "—"}
                                    </span>

                                    <span
                                      aria-hidden="true"
                                      className="h-1 w-1 rounded-full bg-[#d2d2ce]"
                                    />

                                    <span className="text-[10px] text-[#999]">
                                      Mis à jour{" "}
                                      {formatProjectDate(
                                        project.updatedAt,
                                      ).toLowerCase()}
                                    </span>
                                  </div>

                                  <div className="mt-4 flex items-center gap-1 border-t border-[#e5e5e2] pt-3">
                                    <Link
                                      href={`/projects/${project.id}`}
                                      aria-label={`Modifier le projet ${project.name}`}
                                      title="Modifier le projet"
                                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white text-xs font-medium text-[#111] transition-colors duration-150 hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                                    >
                                      <HugeiconsIcon
                                        icon={
                                          PencilEdit01Icon
                                        }
                                        size={
                                          15
                                        }
                                        strokeWidth={
                                          1.7
                                        }
                                      />

                                      <span>
                                        Modifier
                                      </span>
                                    </Link>

                                    <button
                                      type="button"
                                      disabled={
                                        projectActionRunning ||
                                        project.status ===
                                          "ARCHIVED"
                                      }
                                      onClick={() =>
                                        void handleArchiveProject(
                                          project,
                                        )
                                      }
                                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white text-[#666] transition-colors duration-150 hover:bg-[#f7f7f5] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] disabled:pointer-events-none disabled:opacity-30"
                                      aria-label={
                                        project.status ===
                                        "ARCHIVED"
                                          ? "Projet déjà archivé"
                                          : `Archiver le projet ${project.name}`
                                      }
                                      title={
                                        project.status ===
                                        "ARCHIVED"
                                          ? "Projet déjà archivé"
                                          : "Archiver le projet"
                                      }
                                    >
                                      <HugeiconsIcon
                                        icon={
                                          Archive01Icon
                                        }
                                        size={
                                          16
                                        }
                                        strokeWidth={
                                          1.7
                                        }
                                      />
                                    </button>

                                    <button
                                      type="button"
                                      disabled={
                                        projectActionRunning
                                      }
                                      onClick={() =>
                                        void handleDeleteProject(
                                          project,
                                        )
                                      }
                                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white text-[#999] transition-colors duration-150 hover:border-[#f1c5c9] hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] disabled:pointer-events-none disabled:opacity-40"
                                      aria-label={`Supprimer le projet ${project.name}`}
                                      title="Supprimer définitivement le projet"
                                    >
                                      <HugeiconsIcon
                                        icon={
                                          Delete02Icon
                                        }
                                        size={
                                          16
                                        }
                                        strokeWidth={
                                          1.7
                                        }
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-[300px] flex-col items-center justify-center px-6 py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7f7f5]">
                      <HugeiconsIcon
                        icon={
                          Briefcase01Icon
                        }
                        size={20}
                        strokeWidth={1.7}
                        className="text-[#999]"
                      />
                    </div>

                    <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-[#111]">
                      Aucun projet
                      trouvé
                    </h3>

                    <p className="mt-2 max-w-sm text-xs leading-5 text-[#999]">
                      Aucun projet ne
                      correspond aux
                      critères de
                      recherche ou de
                      filtrage
                      sélectionnés.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setStatus(
                          "Tous",
                        );
                        setCategory(
                          "Toutes",
                        );
                      }}
                      className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white px-4 text-xs font-semibold text-[#111] transition-colors hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                    >
                      Réinitialiser
                    </button>
                  </div>
                )}
              </>
            )}

            {!loading &&
              !loadError && (
                <div className="flex flex-col gap-3 border-t border-[#e5e5e2] bg-[#fafaf8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-[10px] text-[#999]">
                    {
                      filteredProjects.length
                    }{" "}
                    sur{" "}
                    {
                      projects.length
                    }{" "}
                    projets
                    affichés
                  </p>

                  <Link
                    href="/projects/new"
                    className="inline-flex min-h-10 w-fit items-center gap-2 text-xs font-semibold text-[#111] transition-colors hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                  >
                    <HugeiconsIcon
                      icon={
                        Briefcase01Icon
                      }
                      size={15}
                      strokeWidth={
                        1.7
                      }
                    />

                    Nouveau projet

                    <HugeiconsIcon
                      icon={
                        ArrowRight01Icon
                      }
                      size={14}
                      strokeWidth={
                        1.7
                      }
                    />
                  </Link>
                </div>
              )}
          </div>
        </section>

        <footer className="mt-5 pb-24">
          <p className="text-center text-[10px] leading-5 text-[#999]">
            Les projets affichés sont
            chargés directement depuis
            PostgreSQL via Prisma.
          </p>
        </footer>
      </div>
    </main>
  );
}