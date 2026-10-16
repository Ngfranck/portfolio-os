"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  Add01Icon,
  Archive01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowUp01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  FloppyDiskIcon,
  Heading01Icon,
  ParagraphIcon,
} from "@hugeicons/core-free-icons";

import {
  archiveArticle,
  createArticle,
  deleteArticle,
  getArticleById,
  getArticleReferenceData,
  updateArticle,
} from "../actions";

type ContentBlockType = "heading" | "paragraph";

type ContentBlock = {
  id: string;
  type: ContentBlockType;
  text: string;
};

type DropdownOption = {
  value: string;
  label: string;
};

type ArticleStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

type LoadedArticle = {
  id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  content?: unknown;
  coverImage?: string | null;
  readTime?: string | null;
  status?: ArticleStatus | string | null;
  featured?: boolean | null;
  publishedAt?: string | null;
  categoryId?: string | null;
};

type ReferenceData = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

type SaveState =
  | "idle"
  | "saving"
  | "success"
  | "error";

const inputClass =
  "min-h-12 w-full rounded-xl border border-[#e5e5e2] bg-[#fafaf9] px-4 text-sm text-[#111] outline-none transition-colors duration-150 placeholder:text-[#aaa] focus:border-[#111] focus:bg-white focus:ring-2 focus:ring-[#111]/5";

const textareaClass =
  "w-full resize-y rounded-xl border border-[#e5e5e2] bg-[#fafaf9] px-4 py-3 text-sm leading-6 text-[#111] outline-none transition-colors duration-150 placeholder:text-[#aaa] focus:border-[#111] focus:bg-white focus:ring-2 focus:ring-[#111]/5";

const statusOptions: DropdownOption[] = [
  {
    value: "DRAFT",
    label: "Brouillon",
  },
  {
    value: "PUBLISHED",
    label: "Publié",
  },
  {
    value: "ARCHIVED",
    label: "Archivé",
  },
];

function createBlock(
  type: ContentBlockType = "paragraph",
): ContentBlock {
  return {
    id: `${type}-${crypto.randomUUID()}`,
    type,
    text: "",
  };
}

function normalizeContent(
  content: unknown,
): ContentBlock[] {
  if (!Array.isArray(content)) {
    return [createBlock("paragraph")];
  }

  const blocks = content
    .map((block, index) => {
      if (
        typeof block !== "object" ||
        block === null
      ) {
        return null;
      }

      const value = block as {
        type?: unknown;
        text?: unknown;
      };

      const type =
        value.type === "heading"
          ? "heading"
          : value.type === "paragraph"
            ? "paragraph"
            : null;

      if (
        !type ||
        typeof value.text !== "string"
      ) {
        return null;
      }

      return {
        id: `${type}-${index}-${crypto.randomUUID()}`,
        type,
        text: value.text,
      };
    })
    .filter(
      (block): block is ContentBlock =>
        Boolean(block),
    );

  return blocks.length > 0
    ? blocks
    : [createBlock("paragraph")];
}

function formatPublishedAtForInput(
  value: string | null,
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() -
      offset * 60 * 1000,
  );

  return localDate
    .toISOString()
    .slice(0, 16);
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const presentation =
    status === "PUBLISHED"
      ? {
          label: "Publié",
          className:
            "bg-[#FDE8EA] text-[#E30613]",
        }
      : status === "ARCHIVED"
        ? {
            label: "Archivé",
            className:
              "bg-[#f0f0ed] text-[#777]",
          }
        : {
            label: "Brouillon",
            className:
              "bg-[#f7f7f5] text-[#666]",
          };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5",
        "text-[9px] font-bold uppercase tracking-[0.08em]",
        presentation.className,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />

      {presentation.label}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#999]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="text-lg font-semibold tracking-[-0.025em] text-[#111]">
          {title}
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-5 text-[#999]">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function CustomDropdown({
  label,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] =
    useState(false);

  const selectedOption =
    options.find(
      (option) =>
        option.value === value,
    );

  return (
    <div className="relative">
      <span className="mb-2 block text-sm font-medium text-[#111]">
        {label}
      </span>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() =>
          setOpen(
            (current) => !current,
          )
        }
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setOpen(false);
          }, 120);
        }}
        className={[
          "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 text-left text-sm outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#E30613]",
          open
            ? "border-[#111] bg-white shadow-[0_8px_24px_rgba(17,17,17,0.06)] ring-2 ring-[#111]/5"
            : "border-[#e5e5e2] bg-[#fafaf9] hover:border-[#d4d4d0] hover:bg-white",
        ].join(" ")}
      >
        <span
          className={
            selectedOption
              ? "truncate text-[#111]"
              : "truncate text-[#999]"
          }
        >
          {selectedOption?.label ??
            placeholder}
        </span>

        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={17}
          strokeWidth={1.7}
          className={[
            "shrink-0 text-[#666] transition-transform duration-150",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open && options.length > 0 ? (
        <div
          role="listbox"
          aria-label={
            label || "Sélection"
          }
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white p-1.5 shadow-[0_16px_40px_rgba(17,17,17,0.10)]"
        >
          {options.map((option) => {
            const selected =
              option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => {
                  onChange(
                    option.value,
                  );
                  setOpen(false);
                }}
                className={[
                  "flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3.5 text-left text-sm transition-colors duration-150",
                  selected
                    ? "bg-[#FDE8EA] text-[#111]"
                    : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                ].join(" ")}
              >
                <span className="truncate">
                  {option.label}
                </span>

                {selected ? (
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E30613] text-white"
                  >
                    <HugeiconsIcon
                      icon={
                        CheckmarkCircle02Icon
                      }
                      size={13}
                      strokeWidth={2}
                    />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function HeaderActionButton({
  label,
  icon,
  onClick,
  disabled = false,
  variant = "default",
}: {
  label: string;
  icon: typeof Archive01Icon;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "delete";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
        "transition-colors duration-150",
        "disabled:pointer-events-none disabled:opacity-40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2",
        variant === "delete"
          ? "text-[#999] hover:bg-[#FDE8EA] hover:text-[#E30613]"
          : "text-[#777] hover:bg-[#f0f0ed] hover:text-[#111]",
      ].join(" ")}
    >
      <HugeiconsIcon
        icon={icon}
        size={18}
        strokeWidth={1.7}
      />
    </button>
  );
}

export default function ArticleEditorPage() {
  const params =
    useParams<{ id: string }>();

  const router = useRouter();

  const articleId = params.id;

  const isCreateMode =
    articleId === "new";

  const [referenceData, setReferenceData] =
    useState<ReferenceData>({
      categories: [],
    });

  const [referenceLoading, setReferenceLoading] =
    useState(true);

  const [referenceError, setReferenceError] =
    useState<string | null>(null);

  const [articleLoading, setArticleLoading] =
    useState(!isCreateMode);

  const [articleLoadError, setArticleLoadError] =
    useState<string | null>(null);

  const [saveState, setSaveState] =
    useState<SaveState>("idle");

  const [saveMessage, setSaveMessage] =
    useState<string | null>(null);

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");

  const [readTime, setReadTime] =
    useState("5 min read");

  const [categoryId, setCategoryId] =
    useState("");

  const [status, setStatus] =
    useState<ArticleStatus>("DRAFT");

  const [featured, setFeatured] =
    useState(false);

  const [publishedAt, setPublishedAt] =
    useState("");

  const [content, setContent] =
    useState<ContentBlock[]>([
      createBlock("paragraph"),
    ]);

  /*
   * ============================================================
   * DONNÉES DE RÉFÉRENCE
   * ============================================================
   */

  useEffect(() => {
    let active = true;

    const loadReferenceData =
      async () => {
        setReferenceLoading(true);
        setReferenceError(null);

        try {
          const result =
            await getArticleReferenceData();

          if (!active) {
            return;
          }

          if (!result.success) {
            setReferenceError(
              result.error,
            );
            return;
          }

          setReferenceData({
            categories:
              result.categories,
          });
        } catch (error) {
          console.error(
            "Erreur lors du chargement des données de référence :",
            error,
          );

          if (active) {
            setReferenceError(
              "Impossible de charger les catégories.",
            );
          }
        } finally {
          if (active) {
            setReferenceLoading(false);
          }
        }
      };

    void loadReferenceData();

    return () => {
      active = false;
    };
  }, []);

  /*
   * ============================================================
   * CHARGEMENT ARTICLE
   * ============================================================
   */

  useEffect(() => {
    let active = true;

    if (isCreateMode) {
      setArticleLoading(false);
      setArticleLoadError(null);

      return () => {
        active = false;
      };
    }

    if (!articleId) {
      setArticleLoading(false);
      setArticleLoadError(
        "Identifiant de l’article introuvable.",
      );

      return () => {
        active = false;
      };
    }

    const loadArticle =
      async () => {
        setArticleLoading(true);
        setArticleLoadError(null);

        try {
          const result =
            await getArticleById(
              articleId,
            );

          if (!active) {
            return;
          }

          if (!result.success) {
            setArticleLoadError(
              result.error,
            );
            return;
          }

          const article =
            result.article as unknown as LoadedArticle;

          setTitle(
            article.title ?? "",
          );

          setSlug(
            article.slug ?? "",
          );

          setExcerpt(
            article.excerpt ?? "",
          );

          setCoverImage(
            article.coverImage ?? "",
          );

          setReadTime(
            article.readTime ??
              "5 min read",
          );

          setCategoryId(
            article.categoryId ?? "",
          );

          setStatus(
            article.status ===
              "PUBLISHED" ||
            article.status ===
              "ARCHIVED"
              ? article.status
              : "DRAFT",
          );

          setFeatured(
            Boolean(article.featured),
          );

          setPublishedAt(
            formatPublishedAtForInput(
              article.publishedAt ??
                null,
            ),
          );

          setContent(
            normalizeContent(
              article.content,
            ),
          );
        } catch (error) {
          console.error(
            "Erreur lors du chargement de l’article :",
            error,
          );

          if (active) {
            setArticleLoadError(
              "Impossible de charger cet article. Vérifiez l’identifiant ou réessayez.",
            );
          }
        } finally {
          if (active) {
            setArticleLoading(false);
          }
        }
      };

    void loadArticle();

    return () => {
      active = false;
    };
  }, [
    articleId,
    isCreateMode,
  ]);

  /*
   * ============================================================
   * FEEDBACK
   * ============================================================
   */

  useEffect(() => {
    if (
      saveState !== "success" &&
      saveState !== "error"
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        setSaveState("idle");
        setSaveMessage(null);
      }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [saveState]);

  /*
   * ============================================================
   * OPTIONS
   * ============================================================
   */

  const categoryOptions =
    useMemo<DropdownOption[]>(
      () =>
        referenceData.categories.map(
          (category) => ({
            value: category.id,
            label: category.name,
          }),
        ),
      [referenceData.categories],
    );

  const isSaving =
    saveState === "saving";

  const selectedCategory =
    referenceData.categories.find(
      (category) =>
        category.id ===
        categoryId,
    )?.name ?? "Non définie";

  /*
   * ============================================================
   * CONTENU
   * ============================================================
   */

  const updateContentBlock = (
    id: string,
    value: string,
  ) => {
    setContent((current) =>
      current.map((block) =>
        block.id === id
          ? {
              ...block,
              text: value,
            }
          : block,
      ),
    );
  };

  const changeBlockType = (
    id: string,
    type: ContentBlockType,
  ) => {
    setContent((current) =>
      current.map((block) =>
        block.id === id
          ? {
              ...block,
              type,
            }
          : block,
      ),
    );
  };

  const addContentBlock = (
    type: ContentBlockType,
  ) => {
    setContent((current) => [
      ...current,
      createBlock(type),
    ]);
  };

  const removeContentBlock = (
    id: string,
  ) => {
    setContent((current) => {
      if (current.length <= 1) {
        return [
          createBlock("paragraph"),
        ];
      }

      return current.filter(
        (block) =>
          block.id !== id,
      );
    });
  };

  const moveContentBlock = (
    index: number,
    direction: -1 | 1,
  ) => {
    setContent((current) => {
      const targetIndex =
        index + direction;

      if (
        targetIndex < 0 ||
        targetIndex >= current.length
      ) {
        return current;
      }

      const next = [...current];

      [next[index], next[targetIndex]] = [
        next[targetIndex],
        next[index],
      ];

      return next;
    });
  };

  /*
   * ============================================================
   * ARCHIVAGE
   * ============================================================
   */

  const handleArchiveArticle =
    async () => {
      if (
        isCreateMode ||
        !articleId ||
        isSaving ||
        status === "ARCHIVED"
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Archiver « ${
            title || "cet article"
          } » ?\n\nL’article sera conservé dans les archives et ne sera plus considéré comme un contenu actif.`,
        );

      if (!confirmed) {
        return;
      }

      setSaveState("saving");
      setSaveMessage(null);

      try {
        const result =
          await archiveArticle(
            articleId,
          );

        if (!result.success) {
          setSaveState("error");
          setSaveMessage(
            result.error,
          );
          return;
        }

        setStatus("ARCHIVED");
        setSaveState("success");
        setSaveMessage(
          "L’article a été archivé avec succès.",
        );
      } catch (error) {
        console.error(
          "Erreur lors de l’archivage de l’article :",
          error,
        );

        setSaveState("error");
        setSaveMessage(
          "Impossible d’archiver cet article. Veuillez réessayer.",
        );
      }
    };

  /*
   * ============================================================
   * SUPPRESSION
   * ============================================================
   */

  const handleDeleteArticle =
    async () => {
      if (
        isCreateMode ||
        !articleId ||
        isSaving
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          `Supprimer définitivement « ${
            title || "cet article"
          } » ?\n\nCette opération est irréversible.`,
        );

      if (!confirmed) {
        return;
      }

      setSaveState("saving");
      setSaveMessage(null);

      try {
        const result =
          await deleteArticle(
            articleId,
          );

        if (!result.success) {
          setSaveState("error");
          setSaveMessage(
            result.error,
          );
          return;
        }

        router.replace("/articles");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l’article :",
          error,
        );

        setSaveState("error");
        setSaveMessage(
          "Impossible de supprimer cet article. Veuillez réessayer.",
        );
      }
    };

  /*
   * ============================================================
   * ENREGISTREMENT
   * ============================================================
   */

  const handleSaveArticle = async (
    targetStatus: ArticleStatus,
  ) => {
    if (
      isSaving ||
      articleLoading ||
      Boolean(articleLoadError)
    ) {
      return;
    }

    if (
      !isCreateMode &&
      !articleId
    ) {
      setSaveState("error");
      setSaveMessage(
        "Identifiant de l’article introuvable.",
      );
      return;
    }

    setSaveState("saving");
    setSaveMessage(null);

    const cleanedContent =
      content
        .map((block) => ({
          type: block.type,
          text: block.text.trim(),
        }))
        .filter(
          (block) =>
            block.text.length > 0,
        );

    if (
      cleanedContent.length === 0
    ) {
      setSaveState("error");
      setSaveMessage(
        "Ajoute au moins un bloc de contenu.",
      );
      return;
    }

    const payload = {
      title,
      slug,
      excerpt,
      content: cleanedContent,
      coverImage:
        coverImage.trim() || null,
      readTime:
        readTime.trim() ||
        "5 min read",
      status: targetStatus,
      featured,
      categoryId:
        categoryId.trim() || null,
      publishedAt:
        publishedAt.trim() || null,
    };

    try {
      const result =
        isCreateMode
          ? await createArticle(
              payload,
            )
          : await updateArticle(
              articleId,
              payload,
            );

      if (!result.success) {
        setSaveState("error");
        setSaveMessage(
          result.error,
        );
        return;
      }

      setStatus(targetStatus);
      setSaveState("success");

      setSaveMessage(
        targetStatus ===
          "PUBLISHED"
          ? isCreateMode
            ? "L’article a été créé et publié avec succès."
            : "L’article a été mis à jour et publié avec succès."
          : targetStatus ===
                "ARCHIVED"
            ? "L’article a été archivé avec succès."
            : isCreateMode
              ? "Le brouillon a été créé avec succès."
              : "Le brouillon a été mis à jour avec succès.",
      );

      if (
        isCreateMode &&
        result.article?.id
      ) {
        router.replace(
          `/articles/${result.article.id}`,
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de l’enregistrement de l’article :",
        error,
      );

      setSaveState("error");

      setSaveMessage(
        "Une erreur inattendue est survenue pendant l’enregistrement. Réessayez.",
      );
    }
  };

  /*
   * ============================================================
   * ÉTATS DE CHARGEMENT
   * ============================================================
   */

  if (articleLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-[#e5e5e2] bg-white px-6 py-5 text-center shadow-sm"
        >
          <span className="mx-auto mb-3 block h-2 w-2 animate-pulse rounded-full bg-[#E30613]" />

          <p className="text-sm font-medium text-[#111]">
            Chargement de
            l’article...
          </p>

          <p className="mt-1 text-xs text-[#999]">
            Préparation des
            informations de
            l’éditeur.
          </p>
        </div>
      </main>
    );
  }

  if (articleLoadError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-8">
        <section className="w-full max-w-lg rounded-2xl border border-[#f1c5c9] bg-white p-6 sm:p-8">
          <span className="mb-3 block h-2 w-2 rounded-full bg-[#E30613]" />

          <h1 className="text-xl font-semibold tracking-[-0.03em] text-[#111]">
            Article indisponible
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#666]">
            {articleLoadError}
          </p>

          <Link
            href="/articles"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111] px-4 text-sm font-medium text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
          >
            Retour aux
            articles
          </Link>
        </section>
      </main>
    );
  }

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* HEADER */}

        <header className="mb-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Link
              href="/articles"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-medium text-[#666] transition-colors duration-150 hover:bg-white hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.7}
                className="transition-transform duration-150 group-hover:-translate-x-0.5"
              />

              Retour aux
              articles
            </Link>

            <StatusBadge
              status={status}
            />
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                  {isCreateMode
                    ? "Création d’article"
                    : "Édition d’article"}
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.045em] text-[#111] sm:text-4xl lg:text-[42px]">
                {title.trim() ||
                  "Nouvel article"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666] sm:text-[15px]">
                Rédigez et structurez
                un article pour le
                journal de Gonar.ui.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {!isCreateMode ? (
                <div className="flex items-center gap-1">
                  {status !==
                  "ARCHIVED" ? (
                    <HeaderActionButton
                      label={`Archiver ${
                        title ||
                        "cet article"
                      }`}
                      icon={
                        Archive01Icon
                      }
                      disabled={
                        isSaving
                      }
                      onClick={
                        handleArchiveArticle
                      }
                    />
                  ) : null}

                  <HeaderActionButton
                    label={`Supprimer définitivement ${
                      title ||
                      "cet article"
                    }`}
                    icon={
                      Delete02Icon
                    }
                    variant="delete"
                    disabled={
                      isSaving
                    }
                    onClick={
                      handleDeleteArticle
                    }
                  />
                </div>
              ) : null}

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() =>
                    handleSaveArticle(
                      "DRAFT",
                    )
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-4 text-sm font-medium text-[#111] transition-colors duration-150 hover:border-[#d8d8d4] hover:bg-[#fafaf9] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <HugeiconsIcon
                    icon={
                      FloppyDiskIcon
                    }
                    size={17}
                    strokeWidth={
                      1.7
                    }
                    className={
                      isSaving
                        ? "animate-pulse"
                        : ""
                    }
                  />

                  {isSaving
                    ? "Enregistrement..."
                    : "Enregistrer le brouillon"}
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() =>
                    handleSaveArticle(
                      "PUBLISHED",
                    )
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#111] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#222] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <HugeiconsIcon
                    icon={
                      CheckmarkCircle02Icon
                    }
                    size={17}
                    strokeWidth={
                      1.7
                    }
                  />

                  {isSaving
                    ? "Enregistrement..."
                    : "Publier l’article"}
                </button>
              </div>
            </div>
          </div>
        </header>

        {referenceError ? (
          <div className="mb-5 rounded-2xl border border-[#f1c5c9] bg-[#FDE8EA] p-4">
            <p className="text-sm font-medium text-[#111]">
              Données de
              référence
              indisponibles
            </p>

            <p className="mt-1 text-xs leading-5 text-[#666]">
              {referenceError}
            </p>
          </div>
        ) : null}

        {saveMessage ? (
          <div
            role="status"
            aria-live="polite"
            className={[
              "mb-5 rounded-2xl border p-4",
              saveState ===
                "success"
                ? "border-[#d8e7db] bg-[#f2f8f3]"
                : "border-[#f1c5c9] bg-[#FDE8EA]",
            ].join(" ")}
          >
            <p className="text-sm font-medium text-[#111]">
              {saveState ===
              "success"
                ? "Opération réussie"
                : "Impossible d’enregistrer"}
            </p>

            <p className="mt-1 text-xs leading-5 text-[#666]">
              {saveMessage}
            </p>
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px] xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* CONTENU PRINCIPAL */}

          <div className="space-y-5">
            {/* INFORMATIONS */}

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Informations générales"
                description="Les informations principales de l’article."
              />

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="article-title"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Titre
                  </label>

                  <input
                    id="article-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Ex. Construire un design system évolutif"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="article-slug"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Slug
                  </label>

                  <input
                    id="article-slug"
                    type="text"
                    value={slug}
                    onChange={(event) =>
                      setSlug(
                        event.target
                          .value,
                      )
                    }
                    placeholder="mon-article"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs leading-5 text-[#999]">
                    Utilisé dans
                    l’URL publique
                    de l’article.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="article-excerpt"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Extrait
                  </label>

                  <textarea
                    id="article-excerpt"
                    rows={4}
                    value={excerpt}
                    onChange={(event) =>
                      setExcerpt(
                        event.target
                          .value,
                      )
                    }
                    placeholder="Une présentation concise de l’article..."
                    className={
                      textareaClass
                    }
                  />

                  <p className="mt-2 text-xs text-[#999]">
                    {excerpt.length}{" "}
                    / 600 caractères
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <CustomDropdown
                    label="Catégorie"
                    value={categoryId}
                    placeholder={
                      referenceLoading
                        ? "Chargement..."
                        : "Sélectionner une catégorie"
                    }
                    options={
                      categoryOptions
                    }
                    onChange={
                      setCategoryId
                    }
                  />

                  <div>
                    <label
                      htmlFor="article-read-time"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      Temps de
                      lecture
                    </label>

                    <input
                      id="article-read-time"
                      type="text"
                      value={readTime}
                      onChange={(event) =>
                        setReadTime(
                          event.target
                            .value,
                        )
                      }
                      placeholder="Ex. 6 min read"
                      className={
                        inputClass
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="article-published-at"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      Date de
                      publication
                    </label>

                    <input
                      id="article-published-at"
                      type="datetime-local"
                      value={
                        publishedAt
                      }
                      onChange={(event) =>
                        setPublishedAt(
                          event.target
                            .value,
                        )
                      }
                      className={
                        inputClass
                      }
                    />

                    <p className="mt-2 text-xs leading-5 text-[#999]">
                      Si aucune date
                      n’est définie
                      à la
                      publication,
                      la date
                      actuelle sera
                      utilisée.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="article-status"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      Statut
                    </label>

                    <CustomDropdown
                      label=""
                      value={status}
                      placeholder="Sélectionner un statut"
                      options={
                        statusOptions
                      }
                      onChange={(
                        value,
                      ) =>
                        setStatus(
                          value as ArticleStatus,
                        )
                      }
                    />
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e5e5e2] bg-[#fafaf9] p-4 transition-colors hover:bg-white">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(event) =>
                      setFeatured(
                        event.target
                          .checked,
                      )
                    }
                    className="h-4 w-4 accent-[#111]"
                  />

                  <span>
                    <span className="block text-sm font-medium text-[#111]">
                      Mettre à la
                      une
                    </span>

                    <span className="mt-0.5 block text-xs leading-5 text-[#999]">
                      Mettre davantage
                      en avant cet
                      article dans
                      les espaces
                      éditoriaux
                      concernés.
                    </span>
                  </span>
                </label>
              </div>
            </section>

            {/* COUVERTURE */}

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Image de couverture"
                description="L’image principale utilisée pour représenter l’article."
              />

              <div>
                <label
                  htmlFor="article-cover"
                  className="mb-2 block text-sm font-medium text-[#111]"
                >
                  URL de l’image
                </label>

                <input
                  id="article-cover"
                  type="url"
                  value={coverImage}
                  onChange={(event) =>
                    setCoverImage(
                      event.target
                        .value,
                    )
                  }
                  placeholder="https://..."
                  className={
                    inputClass
                  }
                />

                <p className="mt-2 text-xs leading-5 text-[#999]">
                  Le téléversement de
                  fichiers sera
                  connecté dans
                  l’étape dédiée
                  aux médias.
                </p>

                {coverImage.trim() ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5e5e2] bg-[#fafaf9]">
                    <div className="relative aspect-[16/9] overflow-hidden bg-[#efefec]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          coverImage
                        }
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(
                          event,
                        ) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-[#111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                        Couverture
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            {/* CONTENU */}

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Contenu de l’article"
                description="Construisez l’article à partir de paragraphes et de titres."
                action={
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addContentBlock(
                          "heading",
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-3.5 text-xs font-medium text-[#111] transition-colors hover:bg-[#fafaf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                    >
                      <HugeiconsIcon
                        icon={
                          Heading01Icon
                        }
                        size={15}
                        strokeWidth={
                          1.7
                        }
                      />

                      Titre
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        addContentBlock(
                          "paragraph",
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-3.5 text-xs font-medium text-[#111] transition-colors hover:bg-[#fafaf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                    >
                      <HugeiconsIcon
                        icon={
                          ParagraphIcon
                        }
                        size={15}
                        strokeWidth={
                          1.7
                        }
                      />

                      Paragraphe
                    </button>
                  </div>
                }
              />

              <div className="space-y-4">
                {content.map(
                  (
                    block,
                    index,
                  ) => (
                    <article
                      key={block.id}
                      className="rounded-2xl border border-[#e5e5e2] bg-[#fafaf9] p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-semibold text-[#999]">
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <div>
                            <p className="text-xs font-semibold text-[#111]">
                              {block.type ===
                              "heading"
                                ? "Titre"
                                : "Paragraphe"}
                            </p>

                            <p className="text-[10px] text-[#999]">
                              Bloc de
                              contenu
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label="Déplacer vers le haut"
                            title="Déplacer vers le haut"
                            disabled={
                              index ===
                              0
                            }
                            onClick={() =>
                              moveContentBlock(
                                index,
                                -1,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-white hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                          >
                            <HugeiconsIcon
                              icon={
                                ArrowUp01Icon
                              }
                              size={
                                15
                              }
                              strokeWidth={
                                1.7
                              }
                            />
                          </button>

                          <button
                            type="button"
                            aria-label="Déplacer vers le bas"
                            title="Déplacer vers le bas"
                            disabled={
                              index ===
                              content.length -
                                1
                            }
                            onClick={() =>
                              moveContentBlock(
                                index,
                                1,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-white hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                          >
                            <HugeiconsIcon
                              icon={
                                ArrowDown01Icon
                              }
                              size={
                                15
                              }
                              strokeWidth={
                                1.7
                              }
                            />
                          </button>

                          <button
                            type="button"
                            aria-label="Supprimer ce bloc"
                            title="Supprimer ce bloc"
                            onClick={() =>
                              removeContentBlock(
                                block.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
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

                      <div className="mb-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            changeBlockType(
                              block.id,
                              "heading",
                            )
                          }
                          className={[
                            "inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[10px] font-semibold transition-colors",
                            block.type ===
                            "heading"
                              ? "bg-[#111] text-white"
                              : "bg-white text-[#666] hover:text-[#111]",
                          ].join(" ")}
                        >
                          <HugeiconsIcon
                            icon={
                              Heading01Icon
                            }
                            size={
                              14
                            }
                            strokeWidth={
                              1.7
                            }
                          />

                          Titre
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            changeBlockType(
                              block.id,
                              "paragraph",
                            )
                          }
                          className={[
                            "inline-flex min-h-9 items-center gap-2 rounded-lg px-3 text-[10px] font-semibold transition-colors",
                            block.type ===
                            "paragraph"
                              ? "bg-[#111] text-white"
                              : "bg-white text-[#666] hover:text-[#111]",
                          ].join(" ")}
                        >
                          <HugeiconsIcon
                            icon={
                              ParagraphIcon
                            }
                            size={
                              14
                            }
                            strokeWidth={
                              1.7
                            }
                          />

                          Paragraphe
                        </button>
                      </div>

                      {block.type ===
                      "heading" ? (
                        <input
                          type="text"
                          value={
                            block.text
                          }
                          onChange={(
                            event,
                          ) =>
                            updateContentBlock(
                              block.id,
                              event.target
                                .value,
                            )
                          }
                          placeholder="Ex. Commencer par les principes"
                          className={
                            inputClass
                          }
                        />
                      ) : (
                        <textarea
                          rows={6}
                          value={
                            block.text
                          }
                          onChange={(
                            event,
                          ) =>
                            updateContentBlock(
                              block.id,
                              event.target
                                .value,
                            )
                          }
                          placeholder="Rédigez le contenu de ce paragraphe..."
                          className={
                            textareaClass
                          }
                        />
                      )}
                    </article>
                  ),
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    addContentBlock(
                      "heading",
                    )
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-dashed border-[#d8d8d4] px-3.5 text-xs font-medium text-[#666] transition-colors hover:border-[#bbb] hover:bg-[#fafaf9] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={15}
                    strokeWidth={1.7}
                  />

                  Ajouter un
                  titre
                </button>

                <button
                  type="button"
                  onClick={() =>
                    addContentBlock(
                      "paragraph",
                    )
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-dashed border-[#d8d8d4] px-3.5 text-xs font-medium text-[#666] transition-colors hover:border-[#bbb] hover:bg-[#fafaf9] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={15}
                    strokeWidth={1.7}
                  />

                  Ajouter un
                  paragraphe
                </button>
              </div>
            </section>
          </div>

          {/* SIDEBAR  */}

          <aside className="flex flex-col gap-5">
            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6">
              <SectionHeader
                title="Résumé"
                description="Aperçu des informations principales."
              />

              <div className="grid gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Catégorie
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {
                      selectedCategory
                    }
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Statut
                  </p>

                  <div className="mt-2">
                    <StatusBadge
                      status={
                        status
                      }
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Temps de lecture
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {readTime ||
                      "Non défini"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Contenu
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {
                      content.filter(
                        (
                          block,
                        ) =>
                          block.text.trim(),
                      ).length
                    }{" "}
                    bloc
                    {content.filter(
                      (
                        block,
                      ) =>
                        block.text.trim(),
                    ).length >
                    1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Mise en avant
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {featured
                      ? "À la une"
                      : "Standard"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Couverture
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {coverImage.trim()
                      ? "Définie"
                      : "Non définie"}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-[#111] p-5 text-white sm:p-6">
              <div className="flex items-start gap-3">
                <HugeiconsIcon
                  icon={
                    CheckmarkCircle02Icon
                  }
                  size={20}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#E30613]"
                />

                <div>
                  <p className="text-sm font-medium">
                    Structure
                    connectée
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Les articles
                    utilisent la
                    structure déjà
                    consommée par
                    le portfolio
                    public :
                    titres et
                    paragraphes.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}