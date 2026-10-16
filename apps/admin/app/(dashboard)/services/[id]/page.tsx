
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowUp01Icon,
  Briefcase01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  FloppyDiskIcon,
  Search01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

import {
  deleteService,
  getServiceById,
  getServiceProjectData,
  updateService,
  updateServiceProjects,
  type ServiceInput,
  type ServiceProjectOption,
} from "../actions";

type FormState = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  featured: boolean;
  sortOrder: string;
};

const initialFormState: FormState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  icon: "",
  featured: false,
  sortOrder: "0",
};

const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

const textareaClass =
  "w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getProjectStatus(status: ServiceProjectOption["status"]) {
  switch (status) {
    case "PUBLISHED":
      return {
        label: "Publié",
        className: "bg-green-50 text-green-700 border-green-200",
      };
    case "ARCHIVED":
      return {
        label: "Archivé",
        className: "bg-neutral-100 text-neutral-500 border-neutral-200",
      };
    default:
      return {
        label: "Brouillon",
        className: "bg-amber-50 text-amber-700 border-amber-200",
      };
  }
}

export default function ServiceEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const serviceId = params.id;

  const [form, setForm] = useState<FormState>(initialFormState);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [pageError, setPageError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Gestion des projets associés
  const [projects, setProjects] = useState<ServiceProjectOption[]>([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [savedProjectIds, setSavedProjectIds] = useState<string[]>([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isSavingProjects, setIsSavingProjects] = useState(false);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projectsNotice, setProjectsNotice] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setIsLoadingProjects(true);
    setPageError(null);
    setProjectsError(null);

    try {
      const [serviceResult, projectsResult] = await Promise.all([
        getServiceById(serviceId),
        getServiceProjectData(serviceId),
      ]);

      if (!serviceResult.success) {
        setPageError(serviceResult.error);
        return;
      }

      const service = serviceResult.service;

      setForm({
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        description: service.description ?? "",
        icon: service.icon ?? "",
        featured: service.featured,
        sortOrder: String(service.sortOrder),
      });

      if (!projectsResult.success) {
        setProjectsError(projectsResult.error);
      } else {
        setProjects(projectsResult.projects);
        setSelectedProjectIds(projectsResult.selectedProjectIds);
        setSavedProjectIds(projectsResult.selectedProjectIds);
      }
    } catch (err) {
      console.error("Erreur lors du chargement du service :", err);
      setPageError("Impossible de charger ce service. Réessaie.");
    } finally {
      setIsLoading(false);
      setIsLoadingProjects(false);
    }
  }, [serviceId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => {
      const generatedSlug = slugify(current.title);
      const shouldUpdateSlug =
        current.slug === "" || current.slug === generatedSlug;

      return {
        ...current,
        title: value,
        slug: shouldUpdateSlug ? slugify(value) : current.slug,
      };
    });
  };

  const filteredProjects = useMemo(() => {
    const query = projectSearch.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.slug.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query),
    );
  }, [projects, projectSearch]);

  const associationHasChanges = useMemo(
    () =>
      selectedProjectIds.length !== savedProjectIds.length ||
      selectedProjectIds.some(
        (id, index) => id !== savedProjectIds[index],
      ),
    [selectedProjectIds, savedProjectIds],
  );

  const toggleProject = (projectId: string, checked: boolean) => {
    setProjectsError(null);
    setProjectsNotice(null);

    setSelectedProjectIds((current) => {
      if (checked) {
        return current.includes(projectId)
          ? current
          : [...current, projectId];
      }

      return current.filter((id) => id !== projectId);
    });
  };

  const moveProject = (
    projectId: string,
    direction: -1 | 1,
  ) => {
    setProjectsError(null);
    setProjectsNotice(null);

    setSelectedProjectIds((current) => {
      const from = current.indexOf(projectId);
      const to = from + direction;

      if (from < 0 || to < 0 || to >= current.length) {
        return current;
      }

      const next = [...current];
      const temporary = next[from];
      next[from] = next[to];
      next[to] = temporary;

      return next;
    });
  };

  const saveProjectAssociations = async () => {
    if (isSavingProjects || !associationHasChanges) return;

    setIsSavingProjects(true);
    setProjectsError(null);
    setProjectsNotice(null);

    try {
      const result = await updateServiceProjects(
        serviceId,
        selectedProjectIds,
      );

      if (!result.success) {
        setProjectsError(result.error);
        return;
      }

      setSelectedProjectIds(result.selectedProjectIds);
      setSavedProjectIds(result.selectedProjectIds);
      setProjectsNotice("Les associations ont été enregistrées.");
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement des associations :", err);
      setProjectsError(
        "Impossible d'enregistrer les associations. Réessaie.",
      );
    } finally {
      setIsSavingProjects(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving || isDeleting) return;

    setError(null);
    setNotice(null);

    const title = form.title.trim();
    const slug = form.slug.trim();
    const shortDescription = form.shortDescription.trim();
    const description = form.description.trim();
    const icon = form.icon.trim();

    if (!title) {
      setError("Le titre du service est obligatoire.");
      return;
    }

    if (!slug) {
      setError("Le slug du service est obligatoire.");
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError(
        "Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets.",
      );
      return;
    }

    if (!shortDescription) {
      setError("La description courte est obligatoire.");
      return;
    }

    if (shortDescription.length > 300) {
      setError("La description courte ne peut pas dépasser 300 caractères.");
      return;
    }

    if (description.length > 5000) {
      setError("La description détaillée ne peut pas dépasser 5 000 caractères.");
      return;
    }

    const sortOrder = Number(form.sortOrder);

    if (
      !Number.isInteger(sortOrder) ||
      sortOrder < 0 ||
      form.sortOrder.trim() === ""
    ) {
      setError(
        "L'ordre d'affichage doit être un entier positif ou égal à zéro.",
      );
      return;
    }

    const input: ServiceInput = {
      title,
      slug,
      shortDescription,
      description: description || null,
      icon: icon || null,
      featured: form.featured,
      sortOrder,
    };

    setIsSaving(true);

    try {
      const result = await updateService(serviceId, input);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setForm((current) => ({
        ...current,
        title: result.service.title,
        slug: result.service.slug,
        shortDescription: result.service.shortDescription,
        description: result.service.description ?? "",
        icon: result.service.icon ?? "",
        featured: result.service.featured,
        sortOrder: String(result.service.sortOrder),
      }));

      setNotice("Les modifications ont été enregistrées.");
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la modification du service :", err);
      setError("Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting || isSaving || isSavingProjects) return;

    const confirmed = window.confirm(
      `Supprimer « ${form.title} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setError(null);
    setNotice(null);
    setIsDeleting(true);

    try {
      const result = await deleteService(serviceId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/services");
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la suppression du service :", err);
      setError("Une erreur est survenue lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-full bg-[#f7f7f5]">
        <div className="mx-auto flex min-h-[600px] max-w-[1200px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3" role="status">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            <p className="text-sm text-neutral-400">Chargement du service...</p>
          </div>
        </div>
      </main>
    );
  }

  if (pageError) {
    return (
      <main className="min-h-full bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            Retour aux services
          </Link>
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-800"
          >
            {pageError}
          </div>
        </div>
      </main>
    );
  }

  const selectedProjects = selectedProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is ServiceProjectOption => Boolean(project));

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8">
          {/* En-tête */}
          <header>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.8}
              />
              Retour aux services
            </Link>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  <span>Contenu</span>
                  <span>/</span>
                  <span>Services</span>
                  <span>/</span>
                  <span className="text-neutral-700">Édition</span>
                </div>

                <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
                  Modifier le service
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                  Mets à jour le contenu, les paramètres et les projets associés
                  à cette prestation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={isDeleting || isSaving || isSavingProjects}
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 lg:self-auto"
              >
                {isDeleting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
                ) : (
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={17}
                    strokeWidth={1.8}
                  />
                )}
                Supprimer
              </button>
            </div>
          </header>

          {/* Erreurs générales */}
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

          {/* Formulaire général */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            <div className="space-y-6">
              {/* Contenu */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Contenu du service
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Les informations principales de la prestation.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <Field label="Nom du service" htmlFor="service-title" required>
                    <input
                      id="service-title"
                      type="text"
                      value={form.title}
                      onChange={(event) =>
                        handleTitleChange(event.target.value)
                      }
                      placeholder="Ex. UX/UI Design"
                      maxLength={160}
                      className={inputClass}
                    />
                    <FieldHint>160 caractères maximum.</FieldHint>
                  </Field>

                  <Field label="Slug" htmlFor="service-slug" required>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                        /
                      </span>
                      <input
                        id="service-slug"
                        type="text"
                        value={form.slug}
                        onChange={(event) =>
                          updateField("slug", slugify(event.target.value))
                        }
                        placeholder="ux-ui-design"
                        maxLength={180}
                        className={`${inputClass} pl-7 font-mono`}
                      />
                    </div>
                    <FieldHint>Utilisé comme identifiant du service.</FieldHint>
                  </Field>

                  <Field
                    label="Description courte"
                    htmlFor="service-short-description"
                    required
                  >
                    <textarea
                      id="service-short-description"
                      value={form.shortDescription}
                      onChange={(event) =>
                        updateField("shortDescription", event.target.value)
                      }
                      placeholder="Présente rapidement cette prestation..."
                      maxLength={300}
                      rows={4}
                      className={textareaClass}
                    />
                    <div className="mt-2 flex justify-between gap-4">
                      <FieldHint>
                        Une présentation concise de la prestation.
                      </FieldHint>
                      <span className="shrink-0 text-[11px] tabular-nums text-neutral-400">
                        {form.shortDescription.length}/300
                      </span>
                    </div>
                  </Field>

                  <Field
                    label="Description détaillée"
                    htmlFor="service-description"
                  >
                    <textarea
                      id="service-description"
                      value={form.description}
                      onChange={(event) =>
                        updateField("description", event.target.value)
                      }
                      placeholder="Décris plus précisément ce que comprend cette prestation..."
                      maxLength={5000}
                      rows={9}
                      className={textareaClass}
                    />
                    <div className="mt-2 flex justify-between gap-4">
                      <FieldHint>
                        Facultatif. 5 000 caractères maximum.
                      </FieldHint>
                      <span className="shrink-0 text-[11px] tabular-nums text-neutral-400">
                        {form.description.length}/5000
                      </span>
                    </div>
                  </Field>
                </div>
              </section>

              {/* Configuration */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Configuration
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Paramètres de présentation du service.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <Field label="Icône" htmlFor="service-icon">
                    <input
                      id="service-icon"
                      type="text"
                      value={form.icon}
                      onChange={(event) =>
                        updateField("icon", event.target.value)
                      }
                      placeholder="Ex. pen-tool"
                      maxLength={100}
                      className={inputClass}
                    />
                    <FieldHint>
                      Nom ou identifiant utilisé par le frontend.
                    </FieldHint>
                  </Field>

                  <Field
                    label="Ordre d'affichage"
                    htmlFor="service-sort-order"
                  >
                    <input
                      id="service-sort-order"
                      type="number"
                      min={0}
                      step={1}
                      value={form.sortOrder}
                      onChange={(event) =>
                        updateField("sortOrder", event.target.value)
                      }
                      className={`${inputClass} sm:max-w-[180px]`}
                    />
                    <FieldHint>
                      Plus la valeur est faible, plus le service apparaît tôt.
                    </FieldHint>
                  </Field>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-4 transition hover:bg-neutral-50">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(event) =>
                        updateField("featured", event.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 rounded border-neutral-300 accent-[#E30613]"
                    />
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 text-sm font-medium text-neutral-900">
                        <HugeiconsIcon
                          icon={StarIcon}
                          size={15}
                          strokeWidth={1.8}
                          className="text-neutral-400"
                        />
                        Mettre en avant
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-neutral-500">
                        Distingue cette prestation comme service important.
                      </span>
                    </span>
                  </label>
                </div>
              </section>

              {/* Associations projets */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-950">
                      Projets associés
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-neutral-400">
                      Sélectionne les projets qui utilisent ce service.
                    </p>
                  </div>

                  <span className="inline-flex h-8 w-fit items-center rounded-lg bg-neutral-100 px-3 text-xs font-semibold tabular-nums text-neutral-700">
                    {selectedProjectIds.length} sélectionné
                    {selectedProjectIds.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  {projectsError && (
                    <MessageBanner
                      tone="error"
                      message={projectsError}
                      onClose={() => setProjectsError(null)}
                    />
                  )}

                  {projectsNotice && (
                    <MessageBanner
                      tone="success"
                      message={projectsNotice}
                      onClose={() => setProjectsNotice(null)}
                    />
                  )}

                  {/* Recherche */}
                  <div className="relative">
                    <HugeiconsIcon
                      icon={Search01Icon}
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <label htmlFor="project-search" className="sr-only">
                      Rechercher un projet
                    </label>
                    <input
                      id="project-search"
                      type="search"
                      value={projectSearch}
                      onChange={(event) =>
                        setProjectSearch(event.target.value)
                      }
                      placeholder="Rechercher un projet..."
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  {/* Ordre des associations */}
                  {selectedProjects.length > 0 && (
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-neutral-500">
                          Ordre des projets associés
                        </p>
                        <span className="text-[10px] text-neutral-400">
                          Modifiable
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedProjects.map((project, index) => (
                          <div
                            key={project.id}
                            className="flex min-w-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2.5"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[10px] font-semibold tabular-nums text-neutral-500">
                              {index + 1}
                            </span>

                            <span className="min-w-0 flex-1 truncate text-xs font-medium text-neutral-800">
                              {project.title}
                            </span>

                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveProject(project.id, -1)}
                                disabled={index === 0 || isSavingProjects}
                                aria-label={`Monter ${project.title}`}
                                title="Monter"
                                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-25"
                              >
                                <HugeiconsIcon
                                  icon={ArrowUp01Icon}
                                  size={16}
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() => moveProject(project.id, 1)}
                                disabled={
                                  index === selectedProjects.length - 1 ||
                                  isSavingProjects
                                }
                                aria-label={`Descendre ${project.title}`}
                                title="Descendre"
                                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-25"
                              >
                                <HugeiconsIcon
                                  icon={ArrowDown01Icon}
                                  size={16}
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Liste des projets */}
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-neutral-700">
                        Tous les projets
                      </p>
                      <span className="text-[11px] text-neutral-400">
                        {filteredProjects.length} résultat
                        {filteredProjects.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {isLoadingProjects ? (
                      <div
                        className="flex min-h-28 items-center justify-center gap-3 rounded-xl border border-neutral-200"
                        role="status"
                      >
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800" />
                        <span className="text-xs text-neutral-500">
                          Chargement des projets...
                        </span>
                      </div>
                    ) : projectsError ? (
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500">
                        Impossible d'afficher la liste des projets.
                      </div>
                    ) : filteredProjects.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-neutral-200 px-4 py-8 text-center">
                        <p className="text-xs text-neutral-500">
                          {projects.length === 0
                            ? "Aucun projet disponible."
                            : "Aucun projet ne correspond à ta recherche."}
                        </p>
                      </div>
                    ) : (
                      <div className="max-h-[440px] space-y-2 overflow-y-auto pr-1">
                        {filteredProjects.map((project) => {
                          const selected = selectedProjectIds.includes(
                            project.id,
                          );
                          const status = getProjectStatus(project.status);

                          return (
                            <label
                              key={project.id}
                              htmlFor={`project-${project.id}`}
                              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                                selected
                                  ? "border-neutral-400 bg-neutral-50"
                                  : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/60"
                              } ${isSavingProjects ? "pointer-events-none opacity-60" : ""}`}
                            >
                              <input
                                id={`project-${project.id}`}
                                type="checkbox"
                                checked={selected}
                                disabled={isSavingProjects}
                                onChange={(event) =>
                                  toggleProject(
                                    project.id,
                                    event.target.checked,
                                  )
                                }
                                className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 accent-[#E30613]"
                              />

                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-2">
                                  <span className="break-words text-xs font-semibold text-neutral-800">
                                    {project.title}
                                  </span>
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${status.className}`}
                                  >
                                    {status.label}
                                  </span>
                                </span>
                                <span className="mt-1 block truncate font-mono text-[10px] text-neutral-400">
                                  /{project.slug}
                                </span>
                                <span className="mt-1 line-clamp-2 block text-[11px] leading-5 text-neutral-500">
                                  {project.shortDescription}
                                </span>
                              </span>

                              {selected && (
                                <span className="mt-0.5 shrink-0 text-[10px] font-medium text-neutral-500">
                                  Associé
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-[11px] leading-5 text-neutral-400">
                      {associationHasChanges
                        ? "Des modifications restent à enregistrer."
                        : "Les associations sont à jour."}
                    </div>

                    <button
                      type="button"
                      onClick={() => void saveProjectAssociations()}
                      disabled={
                        isSavingProjects ||
                        isSaving ||
                        isDeleting ||
                        isLoadingProjects ||
                        !associationHasChanges
                      }
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-xs font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSavingProjects ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <HugeiconsIcon
                          icon={FloppyDiskIcon}
                          size={16}
                          strokeWidth={1.8}
                        />
                      )}
                      {isSavingProjects
                        ? "Enregistrement..."
                        : "Enregistrer les associations"}
                    </button>
                  </div>
                </div>
              </section>

              {/* Actions desktop */}
              <div className="hidden items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 sm:flex">
                <Link
                  href="/services"
                  className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-medium text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Annuler
                </Link>

                <button
                  type="submit"
                  disabled={isSaving || isDeleting}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-xs font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <HugeiconsIcon
                      icon={FloppyDiskIcon}
                      size={17}
                      strokeWidth={1.8}
                    />
                  )}
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </div>

            {/* Aperçu et résumé */}
            <aside className="space-y-6">
              <div className="space-y-6 lg:sticky lg:top-6">
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-200 px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Aperçu
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-neutral-950">
                      Carte du service
                    </h2>
                  </div>

                  <div className="p-5">
                    <div className="rounded-2xl border border-neutral-200 bg-[#f7f7f5] p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-neutral-500 shadow-sm">
                        <HugeiconsIcon
                          icon={Briefcase01Icon}
                          size={20}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div className="mt-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold tracking-tight text-neutral-950">
                            {form.title || "Nom du service"}
                          </h3>

                          {form.featured && (
                            <span className="rounded-full bg-[#FDE8EA] px-2 py-0.5 text-[10px] font-medium text-[#B30A16]">
                              En avant
                            </span>
                          )}
                        </div>

                        <p className="mt-2 break-words text-sm leading-6 text-neutral-500">
                          {form.shortDescription ||
                            "La description courte du service apparaîtra ici."}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-neutral-200 pt-4">
                        <p className="break-all font-mono text-[10px] text-neutral-400">
                          /{form.slug || "service-slug"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Résumé
                  </p>

                  <div className="mt-4 space-y-4">
                    <MetaRow
                      label="Visibilité"
                      value={form.featured ? "Mis en avant" : "Standard"}
                      accent={form.featured}
                    />
                    <MetaRow
                      label="Ordre"
                      value={form.sortOrder || "0"}
                    />
                    <MetaRow
                      label="Description"
                      value={
                        form.description.trim()
                          ? "Renseignée"
                          : "Non renseignée"
                      }
                    />
                    <MetaRow
                      label="Projets associés"
                      value={String(selectedProjectIds.length)}
                    />
                  </div>
                </section>

                {/* Actions mobile */}
                <div className="flex flex-col gap-2 sm:hidden">
                  <button
                    type="submit"
                    disabled={isSaving || isDeleting}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <HugeiconsIcon icon={FloppyDiskIcon} size={18} />
                    )}
                    {isSaving ? "Enregistrement..." : "Enregistrer"}
                  </button>

                  <Link
                    href="/services"
                    className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-medium text-neutral-500"
                  >
                    Annuler
                  </Link>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </main>
  );
}

/* ============================================================ */
/* COMPOSANTS LOCAUX */
/* ============================================================ */

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-semibold text-neutral-800"
      >
        {label}
        {required && <span className="ml-1 text-[#E30613]">*</span>}
      </label>
      {children}
    </div>
  );
}

function FieldHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 text-[11px] leading-5 text-neutral-400">
      {children}
    </p>
  );
}

function MetaRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-400">{label}</span>
      <span
        className={
          accent
            ? "text-xs font-medium text-[#B30A16]"
            : "text-xs font-medium text-neutral-700"
        }
      >
        {value}
      </span>
    </div>
  );
}

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
      <div className="flex min-w-0 items-start gap-2">
        {!isError && (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            size={18}
            className="mt-0.5 shrink-0 text-neutral-500"
          />
        )}
        <p className="min-w-0 leading-6">{message}</p>
      </div>

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