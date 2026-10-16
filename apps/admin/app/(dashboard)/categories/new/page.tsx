
"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons";

import {
  createCategory,
  type CategoryInput,
} from "../actions";

type FormState = {
  name: string;
  slug: string;
  description: string;
};

const initialFormState: FormState = {
  name: "",
  slug: "",
  description: "",
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

export default function NewCategoryPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleNameChange = (value: string) => {
    setForm((current) => {
      const shouldUpdateSlug =
        current.slug === "" ||
        current.slug === slugify(current.name);

      return {
        ...current,
        name: value,
        slug: shouldUpdateSlug
          ? slugify(value)
          : current.slug,
      };
    });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSaving) return;

    setError(null);

    const name = form.name.trim();
    const slug = form.slug.trim();
    const description = form.description.trim();

    if (!name) {
      setError("Le nom de la catégorie est obligatoire.");
      return;
    }

    if (name.length > 120) {
      setError(
        "Le nom ne peut pas dépasser 120 caractères.",
      );
      return;
    }

    if (!slug) {
      setError("Le slug de la catégorie est obligatoire.");
      return;
    }

    if (slug.length > 180) {
      setError(
        "Le slug ne peut pas dépasser 180 caractères.",
      );
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError(
        "Le slug doit contenir uniquement des lettres minuscules, des chiffres et des tirets.",
      );
      return;
    }

    if (description.length > 5000) {
      setError(
        "La description ne peut pas dépasser 5 000 caractères.",
      );
      return;
    }

    const input: CategoryInput = {
      name,
      slug,
      description: description || null,
    };

    setIsSaving(true);

    try {
      const result = await createCategory(input);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/categories");
      router.refresh();
    } catch (err) {
      console.error(
        "Erreur lors de la création de la catégorie :",
        err,
      );

      setError(
        "Une erreur est survenue lors de la création de la catégorie.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8">
          {/* HEADER */}
          <header>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.8}
              />
              Retour aux catégories
            </Link>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                <span>Contenu</span>
                <span>/</span>
                <span>Catégories</span>
                <span>/</span>
                <span className="text-neutral-700">
                  Création
                </span>
              </div>

              <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
                Nouvelle catégorie
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                Crée une catégorie pour organiser les projets et
                les articles de ton portfolio.
              </p>
            </div>
          </header>

          {/* ERREUR */}
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

          {/* FORMULAIRE */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            {/* COLONNE PRINCIPALE */}
            <div className="space-y-6">
              {/* INFORMATIONS PRINCIPALES */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Informations principales
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Définis l'identité et le contenu de la catégorie.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  {/* NOM */}
                  <Field
                    label="Nom de la catégorie"
                    htmlFor="category-name"
                    required
                  >
                    <input
                      id="category-name"
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        handleNameChange(event.target.value)
                      }
                      placeholder="Ex. Design d'interface"
                      maxLength={120}
                      autoFocus
                      className={inputClass}
                    />
                    <FieldHint>
                      120 caractères maximum.
                    </FieldHint>
                  </Field>

                  {/* SLUG */}
                  <Field
                    label="Slug"
                    htmlFor="category-slug"
                    required
                  >
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                        /
                      </span>

                      <input
                        id="category-slug"
                        type="text"
                        value={form.slug}
                        onChange={(event) =>
                          updateField(
                            "slug",
                            slugify(event.target.value),
                          )
                        }
                        placeholder="design-interface"
                        maxLength={180}
                        className={`${inputClass} pl-7 font-mono`}
                      />
                    </div>

                    <FieldHint>
                      Identifiant utilisé dans les URLs.
                    </FieldHint>
                  </Field>

                  {/* DESCRIPTION */}
                  <Field
                    label="Description"
                    htmlFor="category-description"
                  >
                    <textarea
                      id="category-description"
                      value={form.description}
                      onChange={(event) =>
                        updateField(
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Décris brièvement cette catégorie..."
                      maxLength={5000}
                      rows={8}
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

              {/* ACTIONS DESKTOP */}
              <div className="hidden items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 sm:flex">
                <Link
                  href="/categories"
                  className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-medium text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Annuler
                </Link>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-xs font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

                  {isSaving
                    ? "Création..."
                    : "Créer la catégorie"}
                </button>
              </div>
            </div>

            {/* COLONNE LATÉRALE */}
            <aside className="space-y-6">
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* APERÇU */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-200 px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Aperçu
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-neutral-950">
                      Carte de catégorie
                    </h2>
                  </div>

                  <div className="p-5">
                    <div className="rounded-2xl border border-neutral-200 bg-[#f7f7f5] p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-neutral-500 shadow-sm">
                        <span className="text-sm font-semibold">
                          {form.name.trim().charAt(0).toUpperCase() ||
                            "C"}
                        </span>
                      </div>

                      <div className="mt-6">
                        <h3 className="break-words text-lg font-semibold tracking-tight text-neutral-950">
                          {form.name || "Nom de la catégorie"}
                        </h3>

                        <p className="mt-2 break-words text-sm leading-6 text-neutral-500">
                          {form.description ||
                            "La description de la catégorie apparaîtra ici."}
                        </p>
                      </div>

                      <div className="mt-5 border-t border-neutral-200 pt-4">
                        <p className="break-all font-mono text-[10px] text-neutral-400">
                          /{form.slug || "slug-categorie"}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* RÉSUMÉ */}
                <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Résumé
                  </p>

                  <div className="mt-4 space-y-4">
                    <MetaRow
                      label="Nom"
                      value={
                        form.name.trim()
                          ? "Renseigné"
                          : "Manquant"
                      }
                    />

                    <MetaRow
                      label="Slug"
                      value={
                        form.slug.trim()
                          ? "Renseigné"
                          : "Manquant"
                      }
                    />

                    <MetaRow
                      label="Description"
                      value={
                        form.description.trim()
                          ? "Renseignée"
                          : "Facultative"
                      }
                    />
                  </div>
                </section>

                {/* ACTIONS MOBILE */}
                <div className="flex flex-col gap-2 sm:hidden">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <HugeiconsIcon
                        icon={FloppyDiskIcon}
                        size={18}
                        strokeWidth={1.8}
                      />
                    )}

                    {isSaving
                      ? "Création..."
                      : "Créer la catégorie"}
                  </button>

                  <Link
                    href="/categories"
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
        {required && (
          <span className="ml-1 text-[#E30613]">*</span>
        )}
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
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-400">
        {label}
      </span>
      <span className="text-xs font-medium text-neutral-700">
        {value}
      </span>
    </div>
  );
}