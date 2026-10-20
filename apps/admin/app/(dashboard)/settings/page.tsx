"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import {
  getSiteSettings,
  updateSiteSettings,
  type SiteSettingsInput,
} from "./actions";

const initialSettings: SiteSettingsInput = {
  siteName: "Gonar.ui",
  siteTagline: null,
  siteDescription: null,
  ownerName: null,
  contactEmail: null,
  contactPhone: null,
  whatsappUrl: null,
  location: null,
  isAvailableForProjects: true,
  linkedinUrl: null,
  behanceUrl: null,
  dribbbleUrl: null,
  githubUrl: null,
  instagramUrl: null,
  seoTitle: null,
  seoDescription: null,
  ogImageUrl: null,
};

const inputClass =
  "w-full rounded-xl border border-[#e8e8e5] bg-[#fafaf9] px-3.5 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#b0b0aa] focus:border-[#8f8f89] focus:bg-white focus:ring-2 focus:ring-black/[0.035]";

const locationOptions = [
  "Douala, Cameroun",
  "Yaoundé, Cameroun",
  "Bafoussam, Cameroun",
  "Bamenda, Cameroun",
  "Bertoua, Cameroun",
  "Garoua, Cameroun",
  "Maroua, Cameroun",
  "Kribi, Cameroun",
  "Limbe, Cameroun",
  "Buéa, Cameroun",
  "Autre ville au Cameroun",
  "Remote / International",
];

type FeedbackType = "success" | "error";

type Feedback = {
  type: FeedbackType;
  message: string;
} | null;

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <label className="block text-xs font-medium text-[#555550]">
          {label}
        </label>

        {required && (
          <span
            className="text-[#E30613]"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </div>

      {children}

      {hint && (
        <p className="text-[11px] leading-5 text-[#999993]">
          {hint}
        </p>
      )}
    </div>
  );
}

function SectionHeader({
  number,
  title,
  description,
  onInfo,
}: {
  number: string;
  title: string;
  description: string;
  onInfo?: () => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f7f7f5] text-[11px] font-semibold text-[#888882]">
        {number}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111111]">
            {title}
          </h2>

          {onInfo && (
            <button
              type="button"
              onClick={onInfo}
              aria-label={`En savoir plus sur ${title}`}
              className="flex h-5 w-5 items-center justify-center rounded-full border border-[#e4e4e1] bg-white text-[10px] font-semibold text-[#8f8f89] transition hover:border-[#c9c9c4] hover:text-[#111111]"
            >
              ?
            </button>
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-[#999993]">
          {description}
        </p>
      </div>
    </div>
  );
}

function SocialField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
}) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2 rounded-xl border border-[#e8e8e5] bg-[#fafaf9] px-3.5 transition focus-within:border-[#8f8f89] focus-within:bg-white">
        <span className="text-xs font-medium text-[#aaa9a4]">
          https://
        </span>

        <input
          type="url"
          value={value ?? ""}
          onChange={(event) =>
            onChange(event.target.value || null)
          }
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#111111] outline-none placeholder:text-[#b0b0aa]"
        />
      </div>
    </Field>
  );
}

function Toast({
  feedback,
  onClose,
}: {
  feedback: Feedback;
  onClose: () => void;
}) {
  if (!feedback) {
    return null;
  }

  const isSuccess = feedback.type === "success";

  return (
    <div
      className="fixed right-4 top-4 z-[100] w-[calc(100vw-2rem)] max-w-sm sm:right-6 sm:top-6"
      role="alert"
      aria-live="assertive"
    >
      <div className="overflow-hidden rounded-2xl border border-[#e7e7e3] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
        <div className="flex items-start gap-3 p-4">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isSuccess
                ? "bg-[#eaf6ef] text-[#2c7a52]"
                : "bg-[#FDE8EA] text-[#E30613]"
            }`}
          >
            {isSuccess ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16h.01" />
              </svg>
            )}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#111111]">
              {isSuccess
                ? "Modifications enregistrées"
                : "Vérifiez les informations"}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#777773]">
              {feedback.message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la notification"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#a1a19b] transition hover:bg-[#f7f7f5] hover:text-[#111111]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m7 7 10 10M17 7 7 17" />
            </svg>
          </button>
        </div>

        <div
          className={`h-0.5 ${
            isSuccess ? "bg-[#2c7a52]" : "bg-[#E30613]"
          }`}
        />
      </div>
    </div>
  );
}

function InfoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/25 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-help-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#e7e7e3] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#efefec] px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#aaa9a4]">
              Administration
            </p>

            <h2
              id="settings-help-title"
              className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[#111111]"
            >
              Comprendre les paramètres
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f7f5] text-[#777773] transition hover:bg-[#ededeb] hover:text-[#111111]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m7 7 10 10M17 7 7 17" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 px-5 py-5 sm:px-6">
          <div className="rounded-2xl bg-[#fafaf9] p-4">
            <p className="text-sm font-semibold text-[#222222]">
              Identité du site
            </p>
            <p className="mt-1 text-xs leading-5 text-[#777773]">
              Ces informations définissent le nom, la signature et
              la présentation générale de ton portfolio.
            </p>
          </div>

          <div className="rounded-2xl bg-[#fafaf9] p-4">
            <p className="text-sm font-semibold text-[#222222]">
              Profil et coordonnées
            </p>
            <p className="mt-1 text-xs leading-5 text-[#777773]">
              Elles servent notamment aux points de contact visibles
              sur les futures sections publiques du portfolio.
            </p>
          </div>

          <div className="rounded-2xl bg-[#fafaf9] p-4">
            <p className="text-sm font-semibold text-[#222222]">
              Réseaux sociaux
            </p>
            <p className="mt-1 text-xs leading-5 text-[#777773]">
              Les URL renseignées pourront être réutilisées dans la
              navigation, le footer ou les cartes de contact.
            </p>
          </div>

          <div className="rounded-2xl bg-[#fafaf9] p-4">
            <p className="text-sm font-semibold text-[#222222]">
              Référencement SEO
            </p>
            <p className="mt-1 text-xs leading-5 text-[#777773]">
              Ces champs prépareront les métadonnées utilisées par
              les moteurs de recherche et les aperçus de partage.
            </p>
          </div>
        </div>

        <div className="border-t border-[#efefec] bg-[#fafaf9] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#111111] px-4 py-3 text-xs font-medium text-white transition hover:bg-[#292929]"
          >
            Compris
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    value || "Sélectionner une localisation";

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!target.closest("[data-location-select]")) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  function handleSelect(location: string) {
    onChange(location || null);
    setOpen(false);
  }

  return (
    <div
      className="relative"
      data-location-select
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((previous) => !previous)}
        className={`${inputClass} flex items-center justify-between gap-3 text-left ${
          open
            ? "border-[#8f8f89] bg-white ring-2 ring-black/[0.035]"
            : ""
        }`}
      >
        <span
          className={
            value
              ? "truncate text-[#111111]"
              : "truncate text-[#b0b0aa]"
          }
        >
          {selectedLabel}
        </span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-4 w-4 shrink-0 text-[#8f8f89] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Sélectionner une localisation"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-[#e7e7e3] bg-white p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
        >
          <div className="max-h-64 overflow-y-auto overscroll-contain">
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => handleSelect("")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                !value
                  ? "bg-[#f7f7f5] text-[#111111]"
                  : "text-[#777773] hover:bg-[#fafaf9] hover:text-[#111111]"
              }`}
            >
              <span>Sélectionner une localisation</span>

              {!value && (
                <span className="text-[#E30613]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
              )}
            </button>

            <div className="my-1.5 h-px bg-[#efefec]" />

            {locationOptions.map((location) => {
              const selected = value === location;

              return (
                <button
                  key={location}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(location)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    selected
                      ? "bg-[#111111] text-white"
                      : "text-[#444440] hover:bg-[#f7f7f5] hover:text-[#111111]"
                  }`}
                >
                  <span className="truncate">
                    {location}
                  </span>

                  {selected && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="ml-3 h-4 w-4 shrink-0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function validateSettings(
  settings: SiteSettingsInput
): string | null {
  if (!settings.siteName.trim()) {
    return "Le nom du site est obligatoire.";
  }

  if (settings.siteName.trim().length > 80) {
    return "Le nom du site ne doit pas dépasser 80 caractères.";
  }

  if (
    settings.siteTagline &&
    settings.siteTagline.length > 160
  ) {
    return "La signature ne doit pas dépasser 160 caractères.";
  }

  if (
    settings.siteDescription &&
    settings.siteDescription.length > 500
  ) {
    return "La description du site ne doit pas dépasser 500 caractères.";
  }

  if (
    settings.contactEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      settings.contactEmail.trim()
    )
  ) {
    return "L'adresse e-mail renseignée n'est pas valide.";
  }

  const urlFields = [
    {
      value: settings.linkedinUrl,
      label: "LinkedIn",
    },
    {
      value: settings.behanceUrl,
      label: "Behance",
    },
    {
      value: settings.dribbbleUrl,
      label: "Dribbble",
    },
    {
      value: settings.githubUrl,
      label: "GitHub",
    },
    {
      value: settings.instagramUrl,
      label: "Instagram",
    },
    {
      value: settings.ogImageUrl,
      label: "Image Open Graph",
    },
  ];

  for (const field of urlFields) {
    if (!field.value) {
      continue;
    }

    try {
      const url = new URL(field.value);

      if (!["http:", "https:"].includes(url.protocol)) {
        return `${field.label} doit utiliser une URL HTTP ou HTTPS.`;
      }
    } catch {
      return `L'URL ${field.label} n'est pas valide.`;
    }
  }

  if (
    settings.seoTitle &&
    settings.seoTitle.length > 70
  ) {
    return "Le titre SEO ne doit pas dépasser 70 caractères.";
  }

  if (
    settings.seoDescription &&
    settings.seoDescription.length > 180
  ) {
    return "La description SEO ne doit pas dépasser 180 caractères.";
  }

  return null;
}

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SiteSettingsInput>(initialSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    let active = true;

    getSiteSettings()
      .then((data) => {
        if (active) {
          setSettings(data);
        }
      })
      .catch(() => {
        if (active) {
          setFeedback({
            type: "error",
            message:
              "Impossible de charger les paramètres du site.",
          });
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [feedback]);

  function update<K extends keyof SiteSettingsInput>(
    key: K,
    value: SiteSettingsInput[K]
  ) {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    if (feedback) {
      setFeedback(null);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validationMessage = validateSettings(settings);

    if (validationMessage) {
      setFeedback({
        type: "error",
        message: validationMessage,
      });

      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const result = await updateSiteSettings(settings);

      setFeedback({
        type: result.success ? "success" : "error",
        message: result.message,
      });
    } catch {
      setFeedback({
        type: "error",
        message:
          "Une erreur inattendue est survenue pendant l'enregistrement.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-full bg-[#f7f7f5] p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="h-8 w-56 animate-pulse rounded-lg bg-[#eaeae7]" />
          <div className="h-32 animate-pulse rounded-2xl bg-white" />
          <div className="h-80 animate-pulse rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <>
      <Toast
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />

      <InfoModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      />

      <main className="min-h-full space-y-7 bg-[#f7f7f5] p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wide text-[#999993]">
              <span>Workspace</span>
              <span className="text-[#d0d0cd]">/</span>
              <span className="text-[#111111]">
                Settings
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-4xl">
                Paramètres
                <span className="text-[#E30613]">.</span>
              </h1>

              <button
                type="button"
                onClick={() => setHelpOpen(true)}
                aria-label="À propos des paramètres"
                className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#e3e3df] bg-white text-xs font-semibold text-[#777773] shadow-sm transition hover:border-[#cacac5] hover:text-[#111111]"
              >
                ?
              </button>
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#777773]">
              Gérez l’identité, les coordonnées et les
              informations de présentation de votre portfolio.
            </p>
          </div>

          <button
            type="submit"
            form="settings-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Enregistrement...
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                  <path d="M17 21v-8H7v8M7 3v5h8" />
                </svg>
                Enregistrer
              </>
            )}
          </button>
        </header>

        <form
          id="settings-form"
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >
          {/* Identité */}
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <article className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7 xl:col-span-8">
              <SectionHeader
                number="01"
                title="Identité du site"
                description="Les informations principales de votre portfolio."
                onInfo={() => setHelpOpen(true)}
              />

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Nom du site"
                  required
                >
                  <input
                    maxLength={80}
                    value={settings.siteName}
                    onChange={(event) =>
                      update(
                        "siteName",
                        event.target.value
                      )
                    }
                    placeholder="Gonar.ui"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Signature / slogan"
                  hint="La typographie signature sera appliquée automatiquement dans l’interface."
                >
                  <input
                    maxLength={160}
                    value={settings.siteTagline ?? ""}
                    onChange={(event) =>
                      update(
                        "siteTagline",
                        event.target.value || null
                      )
                    }
                    placeholder="Web & Brand Designer"
                    className={inputClass}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Description du site"
                    hint="Une courte présentation de ton activité."
                  >
                    <textarea
                      rows={4}
                      maxLength={500}
                      value={settings.siteDescription ?? ""}
                      onChange={(event) =>
                        update(
                          "siteDescription",
                          event.target.value || null
                        )
                      }
                      placeholder="Présentez votre activité et votre approche..."
                      className={`${inputClass} resize-y`}
                    />

                    <div className="text-right text-[10px] text-[#aaa9a4]">
                      {
                        (settings.siteDescription ?? "")
                          .length
                      }
                      /500
                    </div>
                  </Field>
                </div>
              </div>

              <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-[#efefec] bg-[#fafaf9] p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-[#222222]">
                    Available for selected projects
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#888882]">
                    Cette information pourra être réutilisée
                    sur les futures interfaces publiques.
                  </p>
                </div>

                <label className="flex cursor-pointer items-center gap-3">
                  <span className="text-xs font-medium text-[#666660]">
                    {settings.isAvailableForProjects
                      ? "Disponible"
                      : "Indisponible"}
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      settings.isAvailableForProjects
                    }
                    onChange={(event) =>
                      update(
                        "isAvailableForProjects",
                        event.target.checked
                      )
                    }
                    className="peer sr-only"
                  />

                  <span
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      settings.isAvailableForProjects
                        ? "bg-[#111111]"
                        : "bg-[#d7d7d2]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        settings.isAvailableForProjects
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </span>
                </label>
              </div>
            </article>

            {/* Preview */}
            <aside className="flex flex-col rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-6 xl:col-span-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-[#111111]">
                  Aperçu de l’identité
                </h2>

                <span className="rounded-md bg-[#f7f7f5] px-2 py-1 text-[10px] text-[#888882]">
                  Live
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col justify-center rounded-xl border border-[#efefec] bg-[#fafaf9] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-xs font-semibold text-white">
                    {(
                      settings.siteName.trim()[0] ||
                      "G"
                    ).toUpperCase()}
                  </span>

                  <span className="text-sm font-semibold tracking-tight text-[#111111]">
                    {settings.siteName || "Nom du site"}
                    <span className="text-[#E30613]">
                      .
                    </span>
                  </span>
                </div>

                <p className="mt-7 text-2xl leading-tight tracking-tight text-[#111111] [font-family:var(--font-signature),cursive]">
                  {settings.siteTagline ||
                    "Votre signature"}
                </p>

                <p className="mt-4 line-clamp-4 text-xs leading-6 text-[#777773]">
                  {settings.siteDescription ||
                    "Votre description apparaîtra ici."}
                </p>

                <div className="mt-6 border-t border-[#eaeae7] pt-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        settings.isAvailableForProjects
                          ? "bg-emerald-500"
                          : "bg-gray-400"
                      }`}
                    />

                    <span className="text-[11px] text-[#777773]">
                      {settings.isAvailableForProjects
                        ? "Ouvert aux projets"
                        : "Non disponible"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[10px] leading-5 text-[#aaa9a4]">
                La signature utilise le style typographique
                signature défini dans ton design system.
              </p>
            </aside>
          </section>

          {/* Profil */}
          <section className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader
              number="02"
              title="Profil et coordonnées"
              description="Les informations permettant aux visiteurs de vous contacter."
              onInfo={() => setHelpOpen(true)}
            />

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Nom du propriétaire">
                <input
                  maxLength={100}
                  value={settings.ownerName ?? ""}
                  onChange={(event) =>
                    update(
                      "ownerName",
                      event.target.value || null
                    )
                  }
                  placeholder="Nom complet"
                  className={inputClass}
                />
              </Field>

              <Field label="Adresse e-mail">
                <input
                  type="email"
                  maxLength={254}
                  value={settings.contactEmail ?? ""}
                  onChange={(event) =>
                    update(
                      "contactEmail",
                      event.target.value || null
                    )
                  }
                  placeholder="contact@exemple.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Téléphone">
                <input
                  type="tel"
                  maxLength={40}
                  value={settings.contactPhone ?? ""}
                  onChange={(event) =>
                    update(
                      "contactPhone",
                      event.target.value || null
                    )
                  }
                  placeholder="+237 6XX XXX XXX"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Localisation"
                hint="Choisissez la localisation affichée sur votre profil."
              >
                <SelectField
                  value={settings.location}
                  onChange={(value) =>
                    update("location", value)
                  }
                />
              </Field>
            </div>
          </section>

          {/* Réseaux sociaux */}
          <section className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader
              number="03"
              title="Réseaux sociaux"
              description="Ajoutez les liens de vos profils professionnels."
              onInfo={() => setHelpOpen(true)}
            />

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <SocialField
                label="LinkedIn"
                value={settings.linkedinUrl}
                onChange={(value) =>
                  update("linkedinUrl", value)
                }
                placeholder="linkedin.com/in/votre-profil"
              />

              <SocialField
                label="Behance"
                value={settings.behanceUrl}
                onChange={(value) =>
                  update("behanceUrl", value)
                }
                placeholder="behance.net/votre-profil"
              />

              <SocialField
                label="Dribbble"
                value={settings.dribbbleUrl}
                onChange={(value) =>
                  update("dribbbleUrl", value)
                }
                placeholder="dribbble.com/votre-profil"
              />

              <SocialField
                label="GitHub"
                value={settings.githubUrl}
                onChange={(value) =>
                  update("githubUrl", value)
                }
                placeholder="github.com/votre-profil"
              />

              <SocialField
                label="Instagram"
                value={settings.instagramUrl}
                onChange={(value) =>
                  update("instagramUrl", value)
                }
                placeholder="instagram.com/votre-profil"
              />
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7">
            <SectionHeader
              number="04"
              title="Référencement SEO"
              description="Définissez les informations utilisées pour présenter le site dans les résultats de recherche."
              onInfo={() => setHelpOpen(true)}
            />

            <div className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-2">
              <div className="space-y-5">
                <Field
                  label="Titre SEO"
                  hint="Un titre concis et descriptif."
                >
                  <input
                    maxLength={70}
                    value={settings.seoTitle ?? ""}
                    onChange={(event) =>
                      update(
                        "seoTitle",
                        event.target.value || null
                      )
                    }
                    placeholder="Gonar.ui — UX/UI & Brand Designer"
                    className={inputClass}
                  />

                  <div className="text-right text-[10px] text-[#aaa9a4]">
                    {(settings.seoTitle ?? "").length}/70
                  </div>
                </Field>

                <Field
                  label="Description SEO"
                  hint="Une description destinée aux moteurs de recherche."
                >
                  <textarea
                    rows={4}
                    maxLength={180}
                    value={settings.seoDescription ?? ""}
                    onChange={(event) =>
                      update(
                        "seoDescription",
                        event.target.value || null
                      )
                    }
                    placeholder="Découvrez mon portfolio UX/UI et Brand Design..."
                    className={`${inputClass} resize-y`}
                  />

                  <div className="text-right text-[10px] text-[#aaa9a4]">
                    {
                      (settings.seoDescription ?? "")
                        .length
                    }
                    /180
                  </div>
                </Field>
              </div>

              <div className="flex flex-col gap-4">
                <Field
                  label="Image de partage — Open Graph"
                  hint="URL de l’image utilisée lors du partage de votre site."
                >
                  <input
                    type="url"
                    maxLength={2048}
                    value={settings.ogImageUrl ?? ""}
                    onChange={(event) =>
                      update(
                        "ogImageUrl",
                        event.target.value || null
                      )
                    }
                    placeholder="https://exemple.com/og-image.jpg"
                    className={inputClass}
                  />
                </Field>

                <div className="flex flex-1 flex-col rounded-xl border border-[#efefec] bg-[#fafaf9] p-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#aaa9a4]">
                    Aperçu du résultat
                  </span>

                  <div className="mt-4 rounded-lg border border-[#eaeae7] bg-white p-4">
                    <p className="truncate text-xs font-medium text-[#39866d]">
                      {settings.siteName ||
                        "Votre site"}
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-[#1a0dab]">
                      {settings.seoTitle ||
                        settings.siteName ||
                        "Titre du site"}
                    </p>

                    <p className="mt-1 line-clamp-3 text-xs leading-5 text-[#666660]">
                      {settings.seoDescription ||
                        settings.siteDescription ||
                        "Votre description SEO apparaîtra ici."}
                    </p>
                  </div>

                  <p className="mt-auto pt-4 text-[10px] leading-5 text-[#999993]">
                    Aperçu indicatif. Le rendu réel dépendra du
                    moteur de recherche.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer save */}
          <div className="flex flex-col gap-4 rounded-2xl border border-[#e9e9e6] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-sm font-medium text-[#222222]">
                Paramètres du portfolio
              </p>

              <p className="mt-1 text-xs text-[#999993]">
                Les modifications sont enregistrées dans la
                configuration principale du site.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 py-3 text-xs font-medium text-white transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les paramètres"
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}