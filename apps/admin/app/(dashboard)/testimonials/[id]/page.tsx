
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  FloppyDiskIcon,
  StarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import {
  deleteTestimonial,
  getTestimonialById,
  updateTestimonial,
  type TestimonialInput,
} from "../actions";

type FormState = {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: string;
  featured: boolean;
  sortOrder: string;
};

const initialFormState: FormState = {
  name: "",
  role: "",
  company: "",
  content: "",
  avatar: "",
  rating: "",
  featured: false,
  sortOrder: "0",
};

const inputClass =
  "h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

const textareaClass =
  "w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function TestimonialEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const testimonialId = params.id;

  const [form, setForm] = useState<FormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadTestimonial = useCallback(async () => {
    setIsLoading(true);
    setPageError(null);

    try {
      const result = await getTestimonialById(testimonialId);

      if (!result.success) {
        setPageError(result.error);
        return;
      }

      const testimonial = result.testimonial;

      setForm({
        name: testimonial.name,
        role: testimonial.role ?? "",
        company: testimonial.company ?? "",
        content: testimonial.content,
        avatar: testimonial.avatar ?? "",
        rating:
          testimonial.rating === null
            ? ""
            : String(testimonial.rating),
        featured: testimonial.featured,
        sortOrder: String(testimonial.sortOrder),
      });
    } catch (err) {
      console.error(
        "Erreur lors du chargement du témoignage :",
        err,
      );
      setPageError(
        "Impossible de charger ce témoignage. Réessaie.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [testimonialId]);

  useEffect(() => {
    void loadTestimonial();
  }, [loadTestimonial]);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSaving || isDeleting) return;

    setError(null);
    setNotice(null);

    const name = form.name.trim();
    const role = form.role.trim();
    const company = form.company.trim();
    const content = form.content.trim();
    const avatar = form.avatar.trim();

    if (!name) {
      setError("Le nom du client est obligatoire.");
      return;
    }

    if (!content) {
      setError("Le contenu du témoignage est obligatoire.");
      return;
    }

    if (name.length > 120) {
      setError("Le nom ne peut pas dépasser 120 caractères.");
      return;
    }

    if (role.length > 120) {
      setError("Le rôle ne peut pas dépasser 120 caractères.");
      return;
    }

    if (company.length > 120) {
      setError(
        "Le nom de l'entreprise ne peut pas dépasser 120 caractères.",
      );
      return;
    }

    if (content.length > 5000) {
      setError(
        "Le témoignage ne peut pas dépasser 5 000 caractères.",
      );
      return;
    }

    if (avatar.length > 2000) {
      setError(
        "L'adresse de l'avatar ne peut pas dépasser 2 000 caractères.",
      );
      return;
    }

    let rating: number | null = null;

    if (form.rating.trim() !== "") {
      rating = Number(form.rating);

      if (
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5
      ) {
        setError(
          "La note doit être un entier compris entre 1 et 5.",
        );
        return;
      }
    }

    const sortOrder = Number(form.sortOrder);

    if (
      form.sortOrder.trim() === "" ||
      !Number.isInteger(sortOrder) ||
      sortOrder < 0
    ) {
      setError(
        "L'ordre d'affichage doit être un entier positif ou égal à zéro.",
      );
      return;
    }

    if (
      avatar &&
      !/^(https?:\/\/|\/)/i.test(avatar)
    ) {
      setError(
        "L'avatar doit être une URL HTTP(S) ou un chemin commençant par /.",
      );
      return;
    }

    const input: TestimonialInput = {
      name,
      role: role || null,
      company: company || null,
      content,
      avatar: avatar || null,
      rating,
      featured: form.featured,
      sortOrder,
    };

    setIsSaving(true);

    try {
      const result = await updateTestimonial(
        testimonialId,
        input,
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      const testimonial = result.testimonial;

      setForm({
        name: testimonial.name,
        role: testimonial.role ?? "",
        company: testimonial.company ?? "",
        content: testimonial.content,
        avatar: testimonial.avatar ?? "",
        rating:
          testimonial.rating === null
            ? ""
            : String(testimonial.rating),
        featured: testimonial.featured,
        sortOrder: String(testimonial.sortOrder),
      });

      setNotice("Les modifications ont été enregistrées.");
      router.refresh();
    } catch (err) {
      console.error(
        "Erreur lors de la modification du témoignage :",
        err,
      );
      setError(
        "Une erreur est survenue lors de l'enregistrement.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting || isSaving) return;

    const confirmed = window.confirm(
      `Supprimer le témoignage de « ${form.name} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setError(null);
    setNotice(null);
    setIsDeleting(true);

    try {
      const result = await deleteTestimonial(testimonialId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/testimonials");
      router.refresh();
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du témoignage :",
        err,
      );
      setError(
        "Une erreur est survenue lors de la suppression.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-full bg-[#f7f7f5]">
        <div className="mx-auto flex min-h-[600px] max-w-[1200px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col items-center gap-3"
            role="status"
          >
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            <p className="text-sm text-neutral-400">
              Chargement du témoignage...
            </p>
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
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            Retour aux témoignages
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

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8">
          {/* EN-TÊTE */}
          <header>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.8}
              />
              Retour aux témoignages
            </Link>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  <span>Contenu</span>
                  <span>/</span>
                  <span>Témoignages</span>
                  <span>/</span>
                  <span className="text-neutral-700">Édition</span>
                </div>

                <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
                  Modifier le témoignage
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                  Modifie le retour du client, sa présentation
                  et les paramètres d'affichage.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={isDeleting || isSaving}
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

          {/* FORMULAIRE */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
          >
            <div className="space-y-6">
              {/* INFORMATIONS CLIENT */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Informations du client
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Identité et informations de présentation du témoin.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <Field
                    label="Nom du client"
                    htmlFor="testimonial-name"
                    required
                  >
                    <input
                      id="testimonial-name"
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Ex. Marie Dupont"
                      maxLength={120}
                      className={inputClass}
                    />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Rôle ou fonction"
                      htmlFor="testimonial-role"
                    >
                      <input
                        id="testimonial-role"
                        type="text"
                        value={form.role}
                        onChange={(event) =>
                          updateField("role", event.target.value)
                        }
                        placeholder="Ex. Directrice marketing"
                        maxLength={120}
                        className={inputClass}
                      />
                    </Field>

                    <Field
                      label="Entreprise"
                      htmlFor="testimonial-company"
                    >
                      <input
                        id="testimonial-company"
                        type="text"
                        value={form.company}
                        onChange={(event) =>
                          updateField("company", event.target.value)
                        }
                        placeholder="Ex. Acme Studio"
                        maxLength={120}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Avatar"
                    htmlFor="testimonial-avatar"
                  >
                    <input
                      id="testimonial-avatar"
                      type="text"
                      value={form.avatar}
                      onChange={(event) =>
                        updateField("avatar", event.target.value)
                      }
                      placeholder="https://exemple.com/avatar.jpg"
                      maxLength={2000}
                      className={inputClass}
                    />
                    <FieldHint>
                      URL HTTP(S) ou chemin local. Ce champ est facultatif.
                    </FieldHint>
                  </Field>
                </div>
              </section>

              {/* TÉMOIGNAGE */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Contenu du témoignage
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Le retour exprimé par le client.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <Field
                    label="Témoignage"
                    htmlFor="testimonial-content"
                    required
                  >
                    <textarea
                      id="testimonial-content"
                      value={form.content}
                      onChange={(event) =>
                        updateField("content", event.target.value)
                      }
                      placeholder="Saisis ici le témoignage du client..."
                      maxLength={5000}
                      rows={9}
                      className={textareaClass}
                    />
                    <div className="mt-2 flex justify-between gap-4">
                      <FieldHint>
                        Reste fidèle aux propos du client.
                      </FieldHint>
                      <span className="shrink-0 text-[11px] tabular-nums text-neutral-400">
                        {form.content.length}/5000
                      </span>
                    </div>
                  </Field>

                  <Field
                    label="Note attribuée"
                    htmlFor="testimonial-rating"
                  >
                    <select
                      id="testimonial-rating"
                      value={form.rating}
                      onChange={(event) =>
                        updateField("rating", event.target.value)
                      }
                      className={`${inputClass} sm:max-w-[240px]`}
                    >
                      <option value="">Aucune note</option>
                      <option value="1">1 sur 5</option>
                      <option value="2">2 sur 5</option>
                      <option value="3">3 sur 5</option>
                      <option value="4">4 sur 5</option>
                      <option value="5">5 sur 5</option>
                    </select>
                    <FieldHint>
                      La note est facultative.
                    </FieldHint>
                  </Field>
                </div>
              </section>

              {/* CONFIGURATION */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Configuration
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Ordre et mise en avant du témoignage.
                  </p>
                </div>

                <div className="space-y-6 p-5 sm:p-6">
                  <Field
                    label="Ordre d'affichage"
                    htmlFor="testimonial-sort-order"
                  >
                    <input
                      id="testimonial-sort-order"
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
                      Plus la valeur est faible, plus le témoignage apparaît tôt
                      parmi les éléments de même priorité.
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
                        Identifie ce témoignage comme prioritaire dans les
                        emplacements qui prennent en charge cette option.
                      </span>
                    </span>
                  </label>
                </div>
              </section>

              {/* ACTIONS DESKTOP */}
              <div className="hidden items-center justify-between rounded-2xl border border-neutral-200 bg-white p-3 sm:flex">
                <Link
                  href="/testimonials"
                  className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-medium text-neutral-500 transition hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Annuler
                </Link>

                <button
                  type="submit"
                  disabled={isSaving || isDeleting}
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
                  {isSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </div>

            {/* APERÇU LATÉRAL */}
            <aside className="space-y-6">
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* APERÇU */}
                <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                  <div className="border-b border-neutral-200 px-5 py-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Aperçu
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-neutral-950">
                      Carte du témoignage
                    </h2>
                  </div>

                  <div className="p-5">
                    <div className="rounded-2xl border border-neutral-200 bg-[#f7f7f5] p-5">
                      <div className="text-4xl leading-none text-neutral-300">
                        “
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-neutral-700">
                        {form.content ||
                          "Le contenu du témoignage apparaîtra ici."}
                      </p>

                      {form.rating && (
                        <div
                          className="mt-4 flex gap-1 text-sm text-[#C58D28]"
                          aria-label={`${form.rating} sur 5`}
                        >
                          {Array.from({ length: 5 }, (_, index) => (
                            <span
                              key={index}
                              className={
                                index < Number(form.rating)
                                  ? "opacity-100"
                                  : "opacity-25"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-5 flex items-center gap-3 border-t border-neutral-200 pt-4">
                        {form.avatar.trim() ? (
                          <img
                            src={form.avatar.trim()}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-full border border-neutral-200 bg-white object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-600">
                            {getInitials(form.name) || (
                              <HugeiconsIcon icon={UserIcon} size={17} />
                            )}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-neutral-950">
                            {form.name || "Nom du client"}
                          </p>
                          <p className="mt-0.5 truncate text-[10px] text-neutral-500">
                            {[form.role, form.company]
                              .filter((value) => value.trim())
                              .join(" · ") || "Rôle et entreprise"}
                          </p>
                        </div>
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
                      label="Visibilité"
                      value={form.featured ? "Mis en avant" : "Standard"}
                      accent={form.featured}
                    />
                    <MetaRow
                      label="Note"
                      value={
                        form.rating
                          ? `${form.rating}/5`
                          : "Non noté"
                      }
                    />
                    <MetaRow
                      label="Avatar"
                      value={form.avatar.trim() ? "Renseigné" : "Absent"}
                    />
                    <MetaRow
                      label="Ordre"
                      value={form.sortOrder || "0"}
                    />
                  </div>
                </section>

                {/* ACTIONS MOBILE */}
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
                    href="/testimonials"
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