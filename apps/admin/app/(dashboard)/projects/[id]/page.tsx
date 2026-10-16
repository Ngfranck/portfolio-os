"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
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
  ArrowLeft02Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  FloppyDiskIcon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";

import {
  createProject,
  getProjectById,
  getProjectReferenceData,
  updateProject,
} from "./actions";

import {
  archiveProject,
  deleteProject,
} from "../actions";

type DropdownOption = {
  value: string;
  label: string;
};

type RoleItem = {
  id: string;
  title: string;
  sortOrder: number;
};

type ServiceItem = {
  id: string;
  serviceId: string;
  sortOrder: number;
};

type ApproachItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  sortOrder: number;
};

type ResultItem = {
  id: string;
  content: string;
  sortOrder: number;
};

type GalleryItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
  title: string;
  width: number | null;
  height: number | null;
  sortOrder: number;
};

type OverviewData = {
  context: string;
  challenge: string;
  objective: string;
};

type LoadedProject = {
  id: string;
  title?: string | null;
  slug?: string | null;
  categoryId?: string | null;
  year?: string | number | null;
  status?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  client?: string | null;
  duration?: string | null;
  liveUrl?: string | null;
  caseStudyUrl?: string | null;
  featured?: boolean | null;
  coverImage?: string | null;
  overview?: Partial<OverviewData> | null;
  roles?: Array<{
    id?: string;
    title?: string | null;
    sortOrder?: number | null;
  }>;
  services?: Array<
    | string
    | {
        id?: string;
        serviceId?: string | null;
        sortOrder?: number | null;
        service?: { id?: string | null } | null;
      }
  >;
  skills?: Array<
    | string
    | {
        id?: string | null;
        skillId?: string | null;
        skill?: { id?: string | null } | null;
      }
  >;
  selectedSkills?: string[];
  approach?: Array<{
    id?: string;
    number?: string | null;
    title?: string | null;
    description?: string | null;
    sortOrder?: number | null;
  }>;
  results?: Array<{
    id?: string;
    content?: string | null;
    sortOrder?: number | null;
  }>;
  images?: Array<{
    id?: string;
    url?: string | null;
    alt?: string | null;
    title?: string | null;
    width?: number | null;
    height?: number | null;
    sortOrder?: number | null;
  }>;
  gallery?: Array<{
    id?: string;
    url?: string | null;
    alt?: string | null;
    title?: string | null;
    width?: number | null;
    height?: number | null;
    sortOrder?: number | null;
  }>;
};

type ReferenceData = {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    icon: string | null;
  }>;
  skills: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
    icon: string | null;
  }>;
};

type SaveState =
  | "idle"
  | "saving"
  | "success"
  | "error";

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

const yearOptions: DropdownOption[] = Array.from(
  { length: 11 },
  (_, index) => {
    const year = 2026 - index;

    return {
      value: String(year),
      label: String(year),
    };
  },
);

const inputClass =
  "min-h-12 w-full rounded-xl border border-[#e5e5e2] bg-[#fafaf9] px-4 text-sm text-[#111] outline-none transition-colors duration-150 placeholder:text-[#aaa] focus:border-[#111] focus:bg-white focus:ring-2 focus:ring-[#111]/5";

const textareaClass =
  "w-full resize-y rounded-xl border border-[#e5e5e2] bg-[#fafaf9] px-4 py-3 text-sm leading-6 text-[#111] outline-none transition-colors duration-150 placeholder:text-[#aaa] focus:border-[#111] focus:bg-white focus:ring-2 focus:ring-[#111]/5";

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
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  return (
    <div className="relative">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#111]">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
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
          {selectedOption?.label ?? placeholder}
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

      {open && options.length > 0 && (
        <div
          role="listbox"
          aria-label={label || "Sélection"}
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white p-1.5 shadow-[0_16px_40px_rgba(17,17,17,0.10)]"
        >
          {options.map((option) => {
            const selected = option.value === value;

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
                  onChange(option.value);
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

                {selected && (
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E30613] text-white"
                  >
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={13}
                      strokeWidth={2}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function YearDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <CustomDropdown
      label="Année"
      value={value}
      placeholder="Sélectionner une année"
      options={yearOptions}
      onChange={onChange}
    />
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
        {eyebrow && (
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#999]">
            {eyebrow}
          </p>
        )}

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

function AddButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-3.5 text-sm font-medium text-[#111] transition-colors duration-150 hover:border-[#d4d4d0] hover:bg-[#fafaf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
    >
      <HugeiconsIcon
        icon={Add01Icon}
        size={16}
        strokeWidth={1.8}
      />
      {children}
    </button>
  );
}

function RemoveButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#999] transition-colors duration-150 hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
    >
      <HugeiconsIcon
        icon={Delete02Icon}
        size={17}
        strokeWidth={1.7}
      />
    </button>
  );
}

function ReorderControls({
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
}: {
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        aria-label="Déplacer vers le haut"
        disabled={!canMoveUp}
        onClick={onMoveUp}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors duration-150 hover:bg-[#f7f7f5] hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
      >
        <HugeiconsIcon
          icon={ArrowUp01Icon}
          size={16}
          strokeWidth={1.7}
        />
      </button>

      <button
        type="button"
        aria-label="Déplacer vers le bas"
        disabled={!canMoveDown}
        onClick={onMoveDown}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#999] transition-colors duration-150 hover:bg-[#f7f7f5] hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
      >
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          strokeWidth={1.7}
        />
      </button>
    </div>
  );
}

export default function ProjectEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = params.id;
  const isCreateMode = projectId === "new";

  const [referenceData, setReferenceData] =
    useState<ReferenceData>({
      categories: [],
      services: [],
      skills: [],
    });

  const [referenceLoading, setReferenceLoading] =
    useState(true);

  const [referenceError, setReferenceError] =
    useState<string | null>(null);

  const [projectLoading, setProjectLoading] =
    useState(projectId !== "new");

  const [projectLoadError, setProjectLoadError] =
    useState<string | null>(null);

  const [saveState, setSaveState] =
    useState<SaveState>("idle");

  const [saveMessage, setSaveMessage] =
    useState<string | null>(null);

  const [projectActionState, setProjectActionState] =
    useState<"idle" | "archiving" | "deleting">("idle");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] =
    useState("");
  const [year, setYear] = useState("2026");
  const [status, setStatus] = useState("DRAFT");

  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [client, setClient] = useState("");

  const [duration, setDuration] = useState("");

  const [liveUrl, setLiveUrl] = useState("");

  const [caseStudyUrl, setCaseStudyUrl] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [coverImage, setCoverImage] =
    useState<{
      url: string;
      name: string;
    } | null>(null);

  // Permet de conserver l’image déjà enregistrée tant que le téléversement
  // des nouveaux fichiers n’est pas connecté au stockage.
  const [persistedCoverImageUrl, setPersistedCoverImageUrl] =
    useState<string | null>(null);

  const [overview, setOverview] =
    useState<OverviewData>({
      context: "",
      challenge: "",
      objective: "",
    });

  const [roles, setRoles] =
    useState<RoleItem[]>([
      {
        id: "role-1",
        title: "",
        sortOrder: 0,
      },
    ]);

  const [services, setServices] =
    useState<ServiceItem[]>([
      {
        id: "service-1",
        serviceId: "",
        sortOrder: 0,
      },
    ]);

  const [approach, setApproach] =
    useState<ApproachItem[]>([
      {
        id: "approach-1",
        number: "01",
        title: "",
        description: "",
        sortOrder: 0,
      },
    ]);

  const [results, setResults] =
    useState<ResultItem[]>([
      {
        id: "result-1",
        content: "",
        sortOrder: 0,
      },
    ]);

  const [selectedSkills, setSelectedSkills] =
    useState<string[]>([]);

  const [gallery, setGallery] =
    useState<GalleryItem[]>([]);

  const coverInputRef =
    useRef<HTMLInputElement | null>(null);

  const galleryInputRef =
    useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let active = true;

    const loadReferenceData = async () => {
      setReferenceLoading(true);
      setReferenceError(null);

      try {
        const data =
          await getProjectReferenceData();

        if (!active) {
          return;
        }

        setReferenceData({
          categories: data.categories,
          services: data.services,
          skills: data.skills,
        });
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de référence du projet :",
          error,
        );

        if (!active) {
          return;
        }

        setReferenceError(
          "Impossible de charger les catégories, services et compétences.",
        );
      } finally {
        if (active) {
          setReferenceLoading(false);
        }
      }
    };

    loadReferenceData();

    return () => {
      active = false;
    };
  }, []);


  useEffect(() => {
    let active = true;

    if (isCreateMode) {
      setProjectLoading(false);
      setProjectLoadError(null);
      return () => {
        active = false;
      };
    }

    if (!projectId) {
      setProjectLoading(false);
      setProjectLoadError("Identifiant du projet introuvable.");
      return () => {
        active = false;
      };
    }

    const loadProject = async () => {
      setProjectLoading(true);
      setProjectLoadError(null);

      try {
        const result = await getProjectById(projectId);

        if (!active) {
          return;
        }

        if (!result.success) {
          setProjectLoadError(result.error);
          return;
        }

        const project = result.project as unknown as LoadedProject;

        setTitle(project.title ?? "");
        setSlug(project.slug ?? "");
        setCategoryId(project.categoryId ?? "");
        setYear(
          project.year === null || project.year === undefined
            ? ""
            : String(project.year),
        );
        setStatus(project.status ?? "DRAFT");
        setShortDescription(project.shortDescription ?? "");
        setDescription(project.description ?? "");
        setClient(project.client ?? "");
        setDuration(project.duration ?? "");
        setLiveUrl(project.liveUrl ?? "");
        setCaseStudyUrl(project.caseStudyUrl ?? "");
        setFeatured(Boolean(project.featured));

        const savedCoverUrl = project.coverImage ?? null;
        setPersistedCoverImageUrl(savedCoverUrl);
        setCoverImage(
          savedCoverUrl
            ? {
                url: savedCoverUrl,
                name:
                  savedCoverUrl.split("/").pop()?.split("?")[0] ||
                  "Image de couverture",
              }
            : null,
        );

        setOverview({
          context: project.overview?.context ?? "",
          challenge: project.overview?.challenge ?? "",
          objective: project.overview?.objective ?? "",
        });

        setRoles(
          project.roles?.length
            ? project.roles.map((role, index) => ({
                id: role.id ?? `role-${index}-${crypto.randomUUID()}`,
                title: role.title ?? "",
                sortOrder: role.sortOrder ?? index,
              }))
            : [
                {
                  id: `role-${crypto.randomUUID()}`,
                  title: "",
                  sortOrder: 0,
                },
              ],
        );

        setServices(
          project.services?.length
            ? project.services
                .map((service, index) => {
                  if (typeof service === "string") {
                    return {
                      id: `service-${index}-${crypto.randomUUID()}`,
                      serviceId: service,
                      sortOrder: index,
                    };
                  }

                  return {
                    id: service.id ?? `service-${index}-${crypto.randomUUID()}`,
                    serviceId:
                      service.serviceId ?? service.service?.id ?? "",
                    sortOrder: service.sortOrder ?? index,
                  };
                })
                .filter((service) => service.serviceId)
            : [
                {
                  id: `service-${crypto.randomUUID()}`,
                  serviceId: "",
                  sortOrder: 0,
                },
              ],
        );

        const loadedSkills =
          project.selectedSkills ??
          project.skills?.map((skill) =>
            typeof skill === "string"
              ? skill
              : skill.skillId ?? skill.skill?.id ?? skill.id ?? "",
          ) ?? [];
        setSelectedSkills(loadedSkills.filter(Boolean));

        setApproach(
          project.approach?.length
            ? project.approach.map((step, index) => ({
                id: step.id ?? `approach-${index}-${crypto.randomUUID()}`,
                number:
                  step.number ?? String(index + 1).padStart(2, "0"),
                title: step.title ?? "",
                description: step.description ?? "",
                sortOrder: step.sortOrder ?? index,
              }))
            : [
                {
                  id: `approach-${crypto.randomUUID()}`,
                  number: "01",
                  title: "",
                  description: "",
                  sortOrder: 0,
                },
              ],
        );

        setResults(
          project.results?.length
            ? project.results.map((result, index) => ({
                id: result.id ?? `result-${index}-${crypto.randomUUID()}`,
                content: result.content ?? "",
                sortOrder: result.sortOrder ?? index,
              }))
            : [
                {
                  id: `result-${crypto.randomUUID()}`,
                  content: "",
                  sortOrder: 0,
                },
              ],
        );

        const loadedImages = project.images ?? project.gallery ?? [];
        setGallery(
          loadedImages
            .filter((image) => Boolean(image.url))
            .map((image, index) => {
              const url = image.url ?? "";
              return {
                id: image.id ?? `gallery-${index}-${crypto.randomUUID()}`,
                name:
                  image.title?.trim() ||
                  url.split("/").pop()?.split("?")[0] ||
                  `Visuel ${index + 1}`,
                url,
                alt: image.alt ?? "",
                title: image.title ?? "",
                width: image.width ?? null,
                height: image.height ?? null,
                sortOrder: image.sortOrder ?? index,
              };
            }),
        );
      } catch (error) {
        console.error(
          "Erreur lors du chargement du projet :",
          error,
        );

        if (active) {
          setProjectLoadError(
            "Impossible de charger ce projet. Vérifiez l’identifiant ou réessayez.",
          );
        }
      } finally {
        if (active) {
          setProjectLoading(false);
        }
      }
    };

    void loadProject();

    return () => {
      active = false;
    };
  }, [projectId, isCreateMode]);

  useEffect(() => {
    return () => {
      if (coverImage?.url.startsWith("blob:")) {
        URL.revokeObjectURL(
          coverImage.url,
        );
      }

      gallery.forEach((image) => {
        if (image.url.startsWith("blob:")) {
          URL.revokeObjectURL(
            image.url,
          );
        }
      });
    };
  }, [coverImage, gallery]);

  useEffect(() => {
    if (
      saveState !== "success" &&
      saveState !== "error"
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSaveState("idle");
      setSaveMessage(null);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [saveState]);

  const categoryOptions = useMemo<DropdownOption[]>(
    () =>
      referenceData.categories.map(
        (category) => ({
          value: category.id,
          label: category.name,
        }),
      ),
    [referenceData.categories],
  );

  const serviceOptions = useMemo<DropdownOption[]>(
    () =>
      referenceData.services.map(
        (service) => ({
          value: service.id,
          label: service.title,
        }),
      ),
    [referenceData.services],
  );

  const skillOptions = useMemo(
    () =>
      referenceData.skills.map(
        (skill) => ({
          id: skill.id,
          label: skill.name,
        }),
      ),
    [referenceData.skills],
  );

  const updateOverview = (
    field: keyof OverviewData,
    value: string,
  ) => {
    setOverview((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addRole = () => {
    setRoles((current) => [
      ...current,
      {
        id: `role-${crypto.randomUUID()}`,
        title: "",
        sortOrder: current.length,
      },
    ]);
  };

  const updateRole = (
    id: string,
    value: string,
  ) => {
    setRoles((current) =>
      current.map((role) =>
        role.id === id
          ? {
              ...role,
              title: value,
            }
          : role,
      ),
    );
  };

  const removeRole = (id: string) => {
    setRoles((current) =>
      current
        .filter((role) => role.id !== id)
        .map((role, index) => ({
          ...role,
          sortOrder: index,
        })),
    );
  };

  const addService = () => {
    setServices((current) => [
      ...current,
      {
        id: `service-${crypto.randomUUID()}`,
        serviceId: "",
        sortOrder: current.length,
      },
    ]);
  };

  const updateService = (
    id: string,
    serviceId: string,
  ) => {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? {
              ...service,
              serviceId,
            }
          : service,
      ),
    );
  };

  const removeService = (id: string) => {
    setServices((current) =>
      current
        .filter(
          (service) => service.id !== id,
        )
        .map((service, index) => ({
          ...service,
          sortOrder: index,
        })),
    );
  };

  const addApproachStep = () => {
    setApproach((current) => [
      ...current,
      {
        id: `approach-${crypto.randomUUID()}`,
        number: String(
          current.length + 1,
        ).padStart(2, "0"),
        title: "",
        description: "",
        sortOrder: current.length,
      },
    ]);
  };

  const updateApproach = (
    id: string,
    field: keyof Omit<ApproachItem, "id">,
    value: string,
  ) => {
    setApproach((current) =>
      current.map((step) =>
        step.id === id
          ? {
              ...step,
              [field]: value,
            }
          : step,
      ),
    );
  };

  const removeApproach = (id: string) => {
    setApproach((current) =>
      current
        .filter(
          (step) => step.id !== id,
        )
        .map((step, index) => ({
          ...step,
          number: String(
            index + 1,
          ).padStart(2, "0"),
          sortOrder: index,
        })),
    );
  };

  const moveApproach = (
    index: number,
    direction: -1 | 1,
  ) => {
    setApproach((current) => {
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

      return next.map(
        (step, itemIndex) => ({
          ...step,
          number: String(
            itemIndex + 1,
          ).padStart(2, "0"),
          sortOrder: itemIndex,
        }),
      );
    });
  };

  const addResult = () => {
    setResults((current) => [
      ...current,
      {
        id: `result-${crypto.randomUUID()}`,
        content: "",
        sortOrder: current.length,
      },
    ]);
  };

  const updateResult = (
    id: string,
    content: string,
  ) => {
    setResults((current) =>
      current.map((result) =>
        result.id === id
          ? {
              ...result,
              content,
            }
          : result,
      ),
    );
  };

  const removeResult = (id: string) => {
    setResults((current) =>
      current
        .filter(
          (result) => result.id !== id,
        )
        .map((result, index) => ({
          ...result,
          sortOrder: index,
        })),
    );
  };

  const toggleSkill = (
    skillId: string,
  ) => {
    setSelectedSkills((current) =>
      current.includes(skillId)
        ? current.filter(
            (id) => id !== skillId,
          )
        : [...current, skillId],
    );
  };

  const handleCoverFile = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      coverImage?.url.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        coverImage.url,
      );
    }

    const objectUrl =
      URL.createObjectURL(file);

    setCoverImage({
      url: objectUrl,
      name: file.name,
    });

    event.target.value = "";
  };

  const removeCoverImage = () => {
    if (
      coverImage?.url.startsWith("blob:")
    ) {
      URL.revokeObjectURL(
        coverImage.url,
      );
    }

    setCoverImage(null);
  };

  const handleGalleryFiles = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    files.forEach((file) => {
      const objectUrl =
        URL.createObjectURL(file);

      const image = new Image();

      image.onload = () => {
        setGallery((current) => [
          ...current,
          {
            id: `gallery-${crypto.randomUUID()}`,
            name: file.name,
            url: objectUrl,
            alt: "",
            title: "",
            width:
              image.naturalWidth || null,
            height:
              image.naturalHeight || null,
            sortOrder: current.length,
          },
        ]);
      };

      image.src = objectUrl;
    });

    event.target.value = "";
  };

  const updateGalleryItem = (
    id: string,
    field: keyof Omit<GalleryItem, "id">,
    value: string,
  ) => {
    setGallery((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              [field]: value,
            }
          : image,
      ),
    );
  };

  const removeGalleryItem = (
    id: string,
  ) => {
    setGallery((current) => {
      const item = current.find(
        (image) => image.id === id,
      );

      if (
        item?.url.startsWith("blob:")
      ) {
        URL.revokeObjectURL(item.url);
      }

      return current
        .filter(
          (image) => image.id !== id,
        )
        .map((image, index) => ({
          ...image,
          sortOrder: index,
        }));
    });
  };

  const moveGallery = (
    index: number,
    direction: -1 | 1,
  ) => {
    setGallery((current) => {
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

      return next.map(
        (image, itemIndex) => ({
          ...image,
          sortOrder: itemIndex,
        }),
      );
    });
  };

  const handleSaveProject = async (
    targetStatus: "DRAFT" | "PUBLISHED",
  ) => {
    if (
      saveState === "saving" ||
      projectActionState !== "idle" ||
      projectLoading ||
      Boolean(projectLoadError)
    ) {
      return;
    }

    if (!isCreateMode && !projectId) {
      setSaveState("error");
      setSaveMessage("Identifiant du projet introuvable.");
      return;
    }

    setSaveState("saving");
    setSaveMessage(null);

    const hasPendingMedia = Boolean(
      coverImage?.url.startsWith("blob:") ||
        gallery.some((image) => image.url.startsWith("blob:")),
    );

    const coverImageToSave = coverImage?.url.startsWith("blob:")
      ? persistedCoverImageUrl
        ? {
            url: persistedCoverImageUrl,
            name: coverImage.name,
          }
        : null
      : coverImage;

    const payload = {
      title,
      slug,
      categoryId: categoryId || null,
      year: year.trim() || null,
      status: targetStatus,
      shortDescription,
      description,
      client,
      duration,
      liveUrl,
      caseStudyUrl,
      featured,
      coverImage: coverImageToSave,
      overview,
      roles: roles
        .filter((role) => role.title.trim())
        .map((role, index) => ({
          title: role.title.trim(),
          sortOrder: index,
        })),
      services: services
        .filter((service) => service.serviceId)
        .map((service, index) => ({
          serviceId: service.serviceId,
          sortOrder: index,
        })),
      approach: approach
        .filter(
          (step) =>
            step.title.trim() &&
            step.description.trim(),
        )
        .map((step, index) => ({
          number: String(index + 1).padStart(2, "0"),
          title: step.title.trim(),
          description: step.description.trim(),
          sortOrder: index,
        })),
      results: results
        .filter((result) => result.content.trim())
        .map((result, index) => ({
          content: result.content.trim(),
          sortOrder: index,
        })),
      selectedSkills,
      // Les URL blob sont des aperçus locaux : seules les images déjà hébergées
      // peuvent être transmises aux actions Prisma.
      gallery: gallery
        .filter((image) => !image.url.startsWith("blob:"))
        .map((image, index) => ({
          url: image.url,
          alt: image.alt.trim(),
          title: image.title.trim(),
          width: image.width,
          height: image.height,
          sortOrder: index,
        })),
    };

    try {
      const result = isCreateMode
        ? await createProject(payload)
        : await updateProject(projectId, payload);

      if (!result.success) {
        setSaveState("error");
        setSaveMessage(result.error);
        return;
      }

      setStatus(targetStatus);
      setSaveState("success");
      setSaveMessage(
        `${
          targetStatus === "PUBLISHED"
            ? isCreateMode
              ? "Le projet a été créé et publié avec succès."
              : "Le projet a été mis à jour et publié avec succès."
            : isCreateMode
              ? "Le brouillon a été créé avec succès."
              : "Le brouillon a été mis à jour avec succès."
        }${
          hasPendingMedia
            ? " Les nouveaux fichiers restent des aperçus locaux et n’ont pas été téléversés. La couverture déjà enregistrée est conservée, le cas échéant."
            : ""
        }`,
      );

      if (isCreateMode && result.project?.id) {
        router.replace(`/projects/${result.project.id}`);
      }
    } catch (error) {
      console.error(
        "Erreur lors de l’enregistrement du projet :",
        error,
      );
      setSaveState("error");
      setSaveMessage(
        "Une erreur inattendue est survenue pendant l’enregistrement. Réessayez.",
      );
    }
  };

  const handleArchiveProject = async () => {
    if (
      isCreateMode ||
      !projectId ||
      projectActionState !== "idle" ||
      saveState === "saving" ||
      status === "ARCHIVED"
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Archiver le projet « ${title.trim() || "Sans titre"} » ? Il restera
      accessible dans la liste des projets archivés.`,
    );

    if (!confirmed) {
      return;
    }

    setProjectActionState("archiving");
    setSaveState("idle");
    setSaveMessage(null);

    try {
      const result = await archiveProject(projectId);

      if (!result.success) {
        setSaveState("error");
        setSaveMessage(result.error);
        return;
      }

      setStatus("ARCHIVED");
      setSaveState("success");
      setSaveMessage("Le projet a été archivé avec succès.");
    } catch (error) {
      console.error("Erreur lors de l’archivage du projet :", error);
      setSaveState("error");
      setSaveMessage(
        "Une erreur inattendue est survenue pendant l’archivage. Réessayez.",
      );
    } finally {
      setProjectActionState("idle");
    }
  };

  const handleDeleteProject = async () => {
    if (
      isCreateMode ||
      !projectId ||
      projectActionState !== "idle" ||
      saveState === "saving"
    ) {
      return;
    }

    const confirmed = window.confirm(
      `Supprimer définitivement le projet « ${title.trim() || "Sans titre"} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) {
      return;
    }

    setProjectActionState("deleting");
    setSaveState("idle");
    setSaveMessage(null);

    try {
      const result = await deleteProject(projectId);

      if (!result.success) {
        setSaveState("error");
        setSaveMessage(result.error);
        return;
      }

      router.replace("/projects");
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
      setSaveState("error");
      setSaveMessage(
        "Une erreur inattendue est survenue pendant la suppression. Réessayez.",
      );
    } finally {
      setProjectActionState("idle");
    }
  };

  const selectedCategory =
    referenceData.categories.find(
      (category) =>
        category.id === categoryId,
    )?.name ?? "Non définie";

  const selectedStatus =
    statusOptions.find(
      (option) =>
        option.value === status,
    )?.label ?? "Brouillon";

  const isSaving =
    saveState === "saving";

  if (projectLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
        <div
          className="rounded-2xl border border-[#e5e5e2] bg-white px-6 py-5 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <span className="mx-auto mb-3 block h-2 w-2 animate-pulse rounded-full bg-[#E30613]" />
          <p className="text-sm font-medium text-[#111]">
            Chargement du projet...
          </p>
          <p className="mt-1 text-xs text-[#999]">
            Préparation des informations de l’éditeur.
          </p>
        </div>
      </main>
    );
  }

  if (projectLoadError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4 py-8">
        <section className="w-full max-w-lg rounded-2xl border border-[#f1c5c9] bg-white p-6 sm:p-8">
          <span className="mb-3 block h-2 w-2 rounded-full bg-[#E30613]" />
          <h1 className="text-xl font-semibold tracking-[-0.03em] text-[#111]">
            Projet indisponible
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#666]">
            {projectLoadError}
          </p>
          <Link
            href="/projects"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111] px-4 text-sm font-medium text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
          >
            Retour aux projets
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-medium text-[#666] transition-colors duration-150 hover:bg-white hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.7}
                className="transition-transform duration-150 group-hover:-translate-x-0.5"
              />

              <span>
                Retour aux projets
              </span>
            </Link>

            {!isCreateMode && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={
                    status === "ARCHIVED"
                      ? "Projet déjà archivé"
                      : "Archiver le projet"
                  }
                  title={
                    status === "ARCHIVED"
                      ? "Projet déjà archivé"
                      : "Archiver le projet"
                  }
                  disabled={
                    isSaving ||
                    projectActionState !== "idle" ||
                    status === "ARCHIVED"
                  }
                  onClick={handleArchiveProject}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white text-[#666] transition-colors duration-150 hover:border-[#d8d8d4] hover:bg-[#fafaf9] hover:text-[#111] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <HugeiconsIcon
                    icon={Archive01Icon}
                    size={19}
                    strokeWidth={1.7}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Supprimer le projet"
                  title="Supprimer le projet"
                  disabled={
                    isSaving || projectActionState !== "idle"
                  }
                  onClick={handleDeleteProject}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e5e5e2] bg-white text-[#666] transition-colors duration-150 hover:border-[#f1c5c9] hover:bg-[#FDE8EA] hover:text-[#E30613] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={19}
                    strokeWidth={1.7}
                  />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                  {isCreateMode ? "Création de projet" : "Édition de projet"}
                </span>
              </div>

              <h1 className="text-3xl font-semibold tracking-[-0.045em] text-[#111] sm:text-4xl lg:text-[42px]">
                {title.trim() ||
                  "Nouveau projet"}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666] sm:text-[15px]">
                Construisez une étude de cas
                claire, structurée et cohérente
                avec votre portfolio.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={isSaving || projectLoading}
                onClick={() =>
                  handleSaveProject("DRAFT")
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-4 text-sm font-medium text-[#111] transition-colors duration-150 hover:border-[#d8d8d4] hover:bg-[#fafaf9] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
              >
                <HugeiconsIcon
                  icon={FloppyDiskIcon}
                  size={17}
                  strokeWidth={1.7}
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
                disabled={isSaving || projectLoading}
                onClick={() =>
                  handleSaveProject("PUBLISHED")
                }
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#111] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#222] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
              >
                <HugeiconsIcon
                  icon={
                    CheckmarkCircle02Icon
                  }
                  size={17}
                  strokeWidth={1.7}
                />

                {isSaving
                  ? "Enregistrement..."
                  : "Publier le projet"}
              </button>
            </div>
          </div>
        </header>

        {referenceError && (
          <div className="mb-5 rounded-2xl border border-[#f1c5c9] bg-[#FDE8EA] p-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E30613]" />

              <div>
                <p className="text-sm font-medium text-[#111]">
                  Données de référence
                  indisponibles
                </p>

                <p className="mt-1 text-xs leading-5 text-[#666]">
                  {referenceError}
                </p>
              </div>
            </div>
          </div>
        )}

        {saveMessage && (
          <div
            className={[
              "mb-5 rounded-2xl border p-4",
              saveState === "success"
                ? "border-[#d8e7db] bg-[#f2f8f3]"
                : "border-[#f1c5c9] bg-[#FDE8EA]",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <span
                className={[
                  "mt-1 h-2 w-2 shrink-0 rounded-full",
                  saveState === "success"
                    ? "bg-[#2f7d4a]"
                    : "bg-[#E30613]",
                ].join(" ")}
              />

              <div>
                <p className="text-sm font-medium text-[#111]">
                  {saveState === "success"
                    ? "Opération réussie"
                    : "Impossible d’enregistrer"}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#666]">
                  {saveMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Informations générales"
                description="Les informations principales affichées sur votre projet."
              />

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="project-title"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Nom du projet
                  </label>

                  <input
                    id="project-title"
                    type="text"
                    value={title}
                    onChange={(event) =>
                      setTitle(
                        event.target.value,
                      )
                    }
                    placeholder="Ex. FarmBridge"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-slug"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Slug
                  </label>

                  <input
                    id="project-slug"
                    type="text"
                    value={slug}
                    onChange={(event) =>
                      setSlug(
                        event.target.value,
                      )
                    }
                    placeholder="farmbridge"
                    className={inputClass}
                  />

                  <p className="mt-2 text-xs leading-5 text-[#999]">
                    Utilisé dans l’URL publique du
                    projet.
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
                    options={categoryOptions}
                    onChange={setCategoryId}
                  />

                  <YearDropdown
                    value={year}
                    onChange={setYear}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="project-client"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      Client
                    </label>

                    <input
                      id="project-client"
                      type="text"
                      value={client}
                      onChange={(event) =>
                        setClient(
                          event.target.value,
                        )
                      }
                      placeholder="Nom du client"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-duration"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      Durée du projet
                    </label>

                    <input
                      id="project-duration"
                      type="text"
                      value={duration}
                      onChange={(event) =>
                        setDuration(
                          event.target.value,
                        )
                      }
                      placeholder="Ex. 3 mois"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="project-short-description"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Description courte
                  </label>

                  <textarea
                    id="project-short-description"
                    rows={3}
                    value={shortDescription}
                    onChange={(event) =>
                      setShortDescription(
                        event.target.value,
                      )
                    }
                    placeholder="Une présentation concise du projet..."
                    className={textareaClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-description"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Description détaillée
                  </label>

                  <textarea
                    id="project-description"
                    rows={5}
                    value={description}
                    onChange={(event) =>
                      setDescription(
                        event.target.value,
                      )
                    }
                    placeholder="Présentez le projet, son contexte et la problématique traitée..."
                    className={textareaClass}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="project-live-url"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      URL du projet
                    </label>

                    <input
                      id="project-live-url"
                      type="url"
                      value={liveUrl}
                      onChange={(event) =>
                        setLiveUrl(
                          event.target.value,
                        )
                      }
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project-case-study-url"
                      className="mb-2 block text-sm font-medium text-[#111]"
                    >
                      URL de l’étude de cas
                    </label>

                    <input
                      id="project-case-study-url"
                      type="url"
                      value={caseStudyUrl}
                      onChange={(event) =>
                        setCaseStudyUrl(
                          event.target.value,
                        )
                      }
                      placeholder="https://..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Image de couverture"
                description="L’image principale du projet utilisée par le portfolio."
              />

              <input
                ref={coverInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleCoverFile}
              />

              {coverImage ? (
                <div className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-[#fafaf9]">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#efefec]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage.url}
                      alt={coverImage.name}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-[#111] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                      Couverture
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#111]">
                        {coverImage.name}
                      </p>

                      <p className="mt-1 text-xs text-[#999]">
                        La destination finale sera
                        enregistrée dans
                        <span className="ml-1 font-medium text-[#666]">
                          Project.coverImage
                        </span>
                        .
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          coverInputRef.current?.click()
                        }
                        className="min-h-10 rounded-xl border border-[#e5e5e2] bg-white px-3.5 text-sm font-medium text-[#111] transition-colors hover:bg-[#fafaf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                      >
                        Remplacer
                      </button>

                      <RemoveButton
                        label="Supprimer l’image de couverture"
                        onClick={
                          removeCoverImage
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    coverInputRef.current?.click()
                  }
                  className="flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8d8d4] bg-[#fafaf9] px-6 text-center transition-colors duration-150 hover:border-[#bbb] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#666] shadow-[0_2px_8px_rgba(17,17,17,0.04)]">
                    <HugeiconsIcon
                      icon={Upload01Icon}
                      size={21}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="text-sm font-medium text-[#111]">
                    Ajouter une image de couverture
                  </span>

                  <span className="mt-1 text-xs leading-5 text-[#999]">
                    PNG, JPG ou WebP
                  </span>
                </button>
              )}
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Vue d’ensemble"
                description="Présentez le contexte, le problème et les objectifs du projet."
              />

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="overview-context"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Contexte
                  </label>

                  <textarea
                    id="overview-context"
                    rows={4}
                    value={overview.context}
                    onChange={(event) =>
                      updateOverview(
                        "context",
                        event.target.value,
                      )
                    }
                    placeholder="Présentez le contexte général du projet..."
                    className={textareaClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="overview-challenge"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Problématique
                  </label>

                  <textarea
                    id="overview-challenge"
                    rows={4}
                    value={overview.challenge}
                    onChange={(event) =>
                      updateOverview(
                        "challenge",
                        event.target.value,
                      )
                    }
                    placeholder="Quel problème fallait-il résoudre ?"
                    className={textareaClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="overview-objective"
                    className="mb-2 block text-sm font-medium text-[#111]"
                  >
                    Objectifs
                  </label>

                  <textarea
                    id="overview-objective"
                    rows={4}
                    value={overview.objective}
                    onChange={(event) =>
                      updateOverview(
                        "objective",
                        event.target.value,
                      )
                    }
                    placeholder="Quels étaient les objectifs poursuivis ?"
                    className={textareaClass}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Mon rôle"
                description="Décomposez votre contribution au projet en plusieurs responsabilités."
                action={
                  <AddButton onClick={addRole}>
                    Ajouter un rôle
                  </AddButton>
                }
              />

              <div className="space-y-3">
                {roles.map(
                  (role, index) => (
                    <div
                      key={role.id}
                      className="rounded-2xl border border-[#e5e5e2] bg-[#fafaf9] p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[11px] font-semibold text-[#666] shadow-[0_2px_8px_rgba(17,17,17,0.04)]">
                            {String(
                              index + 1,
                            ).padStart(
                              2,
                              "0",
                            )}
                          </span>

                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999]">
                            Responsabilité
                          </span>
                        </div>

                        <RemoveButton
                          label={`Supprimer le rôle ${
                            index + 1
                          }`}
                          onClick={() =>
                            removeRole(
                              role.id,
                            )
                          }
                        />
                      </div>

                      <label
                        htmlFor={`role-title-${role.id}`}
                        className="mb-2 block text-sm font-medium text-[#111]"
                      >
                        Intitulé
                      </label>

                      <input
                        id={`role-title-${role.id}`}
                        type="text"
                        value={role.title}
                        onChange={(event) =>
                          updateRole(
                            role.id,
                            event.target.value,
                          )
                        }
                        placeholder="Ex. UX/UI Designer"
                        className={inputClass}
                      />
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Services"
                description="Sélectionnez les services réellement associés au projet."
                action={
                  <AddButton
                    onClick={addService}
                  >
                    Ajouter un service
                  </AddButton>
                }
              />

              <div className="space-y-3">
                {services.map(
                  (service, index) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-3 rounded-xl border border-[#e5e5e2] bg-[#fafaf9] p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-semibold text-[#999]">
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <CustomDropdown
                          label=""
                          value={
                            service.serviceId
                          }
                          placeholder={
                            referenceLoading
                              ? "Chargement..."
                              : "Sélectionner un service"
                          }
                          options={
                            serviceOptions
                          }
                          onChange={(
                            value,
                          ) =>
                            updateService(
                              service.id,
                              value,
                            )
                          }
                        />
                      </div>

                      <RemoveButton
                        label={`Supprimer le service ${
                          index + 1
                        }`}
                        onClick={() =>
                          removeService(
                            service.id,
                          )
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Approche"
                description="Structurez votre processus en étapes pour raconter clairement votre démarche."
                action={
                  <AddButton
                    onClick={
                      addApproachStep
                    }
                  >
                    Ajouter une étape
                  </AddButton>
                }
              />

              <div className="space-y-3">
                {approach.map(
                  (
                    step,
                    index,
                  ) => (
                    <div
                      key={step.id}
                      className="rounded-2xl border border-[#e5e5e2] bg-[#fafaf9] p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111] text-xs font-semibold text-white">
                            {step.number}
                          </span>

                          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999]">
                            Étape {index + 1}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <ReorderControls
                            canMoveUp={
                              index > 0
                            }
                            canMoveDown={
                              index <
                              approach.length - 1
                            }
                            onMoveUp={() =>
                              moveApproach(
                                index,
                                -1,
                              )
                            }
                            onMoveDown={() =>
                              moveApproach(
                                index,
                                1,
                              )
                            }
                          />

                          <RemoveButton
                            label={`Supprimer l’étape ${
                              index + 1
                            }`}
                            onClick={() =>
                              removeApproach(
                                step.id,
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor={`approach-title-${step.id}`}
                            className="mb-2 block text-sm font-medium text-[#111]"
                          >
                            Titre de l’étape
                          </label>

                          <input
                            id={`approach-title-${step.id}`}
                            type="text"
                            value={
                              step.title
                            }
                            onChange={(
                              event,
                            ) =>
                              updateApproach(
                                step.id,
                                "title",
                                event.target
                                  .value,
                              )
                            }
                            placeholder="Ex. Recherche & découverte"
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`approach-description-${step.id}`}
                            className="mb-2 block text-sm font-medium text-[#111]"
                          >
                            Description
                          </label>

                          <textarea
                            id={`approach-description-${step.id}`}
                            rows={4}
                            value={
                              step.description
                            }
                            onChange={(
                              event,
                            ) =>
                              updateApproach(
                                step.id,
                                "description",
                                event.target
                                  .value,
                              )
                            }
                            placeholder="Décrivez ce qui a été réalisé pendant cette étape..."
                            className={textareaClass}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Résultats"
                description="Mettez en avant les résultats, impacts ou enseignements importants du projet."
                action={
                  <AddButton
                    onClick={addResult}
                  >
                    Ajouter un résultat
                  </AddButton>
                }
              />

              <div className="space-y-3">
                {results.map(
                  (
                    result,
                    index,
                  ) => (
                    <div
                      key={result.id}
                      className="rounded-2xl border border-[#e5e5e2] bg-[#fafaf9] p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999]">
                          Résultat{" "}
                          {String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <RemoveButton
                          label={`Supprimer le résultat ${
                            index + 1
                          }`}
                          onClick={() =>
                            removeResult(
                              result.id,
                            )
                          }
                        />
                      </div>

                      <label
                        htmlFor={`result-content-${result.id}`}
                        className="mb-2 block text-sm font-medium text-[#111]"
                      >
                        Description du résultat
                      </label>

                      <textarea
                        id={`result-content-${result.id}`}
                        rows={3}
                        value={
                          result.content
                        }
                        onChange={(event) =>
                          updateResult(
                            result.id,
                            event.target.value,
                          )
                        }
                        placeholder="Ex. Amélioration de l’expérience utilisateur grâce à une navigation simplifiée..."
                        className={textareaClass}
                      />
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Compétences & outils"
                description="Sélectionnez les compétences et outils associés au projet."
              />

              {referenceLoading ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({
                    length: 6,
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="min-h-14 animate-pulse rounded-xl border border-[#e5e5e2] bg-[#fafaf9]"
                    />
                  ))}
                </div>
              ) : skillOptions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#d8d8d4] bg-[#fafaf9] p-5">
                  <p className="text-sm font-medium text-[#111]">
                    Aucune compétence
                    disponible
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#999]">
                    Ajoutez d’abord des compétences
                    dans la base de données.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {skillOptions.map(
                    (skill) => {
                      const selected =
                        selectedSkills.includes(
                          skill.id,
                        );

                      return (
                        <label
                          key={skill.id}
                          className={[
                            "group relative flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3.5 text-left text-sm transition-all duration-150",
                            "focus-within:ring-2 focus-within:ring-[#E30613] focus-within:ring-offset-1",
                            selected
                              ? "border-[#111] bg-[#111] text-white"
                              : "border-[#e5e5e2] bg-[#fafaf9] text-[#666] hover:border-[#d4d4d0] hover:bg-white hover:text-[#111]",
                          ].join(
                            " ",
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={[
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-150",
                                selected
                                  ? "border-[#E30613] bg-[#E30613]"
                                  : "border-[#d5d5d1] bg-white group-hover:border-[#aaa]",
                              ].join(
                                " ",
                              )}
                            >
                              {selected && (
                                <HugeiconsIcon
                                  icon={
                                    CheckmarkCircle02Icon
                                  }
                                  size={14}
                                  strokeWidth={2}
                                  className="text-white"
                                  aria-hidden="true"
                                />
                              )}
                            </span>

                            <span className="truncate font-medium">
                              {skill.label}
                            </span>
                          </div>

                          <input
                            type="checkbox"
                            value={skill.id}
                            checked={selected}
                            onChange={(event) => {
                              const checked =
                                event.target
                                  .checked;

                              setSelectedSkills(
                                (current) => {
                                  if (checked) {
                                    return current.includes(
                                      skill.id,
                                    )
                                      ? current
                                      : [
                                          ...current,
                                          skill.id,
                                        ];
                                  }

                                  return current.filter(
                                    (id) =>
                                      id !==
                                      skill.id,
                                  );
                                },
                              );
                            }}
                            className="sr-only"
                          />
                        </label>
                      );
                    },
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs leading-5 text-[#999]">
                  {selectedSkills.length} compétence
                  {selectedSkills.length > 1
                    ? "s"
                    : ""}{" "}
                  sélectionnée
                  {selectedSkills.length > 1
                    ? "s"
                    : ""}.
                </p>

                {selectedSkills.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSkills([])
                    }
                    className="text-xs font-medium text-[#666] underline decoration-[#d8d8d4] underline-offset-4 transition-colors hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                  >
                    Tout désélectionner
                  </button>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-6 lg:p-7">
              <SectionHeader
                title="Galerie"
                description="Ajoutez les visuels complémentaires de votre étude de cas."
                action={
                  <>
                    <input
                      ref={galleryInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      className="hidden"
                      onChange={
                        handleGalleryFiles
                      }
                    />

                    <AddButton
                      onClick={() =>
                        galleryInputRef.current?.click()
                      }
                    >
                      Ajouter des images
                    </AddButton>
                  </>
                }
              />

              {gallery.length === 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    galleryInputRef.current?.click()
                  }
                  className="flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8d8d4] bg-[#fafaf9] px-6 text-center transition-colors duration-150 hover:border-[#bbb] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#666] shadow-[0_2px_8px_rgba(17,17,17,0.04)]">
                    <HugeiconsIcon
                      icon={Upload01Icon}
                      size={20}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="text-sm font-medium text-[#111]">
                    Ajouter des images
                  </span>

                  <span className="mt-1 text-xs leading-5 text-[#999]">
                    PNG, JPG ou WebP · plusieurs
                    fichiers acceptés
                  </span>
                </button>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {gallery.map(
                    (
                      image,
                      index,
                    ) => (
                      <div
                        key={image.id}
                        className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-[#fafaf9]"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#efefec]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image.url}
                            alt={
                              image.alt ||
                              image.name
                            }
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="space-y-3 p-3">
                          <div>
                            <p className="truncate text-xs font-medium text-[#111]">
                              {image.name}
                            </p>

                            {image.width &&
                              image.height && (
                                <p className="mt-1 text-[10px] text-[#999]">
                                  {
                                    image.width
                                  }{" "}
                                  ×{" "}
                                  {
                                    image.height
                                  }{" "}
                                  px
                                </p>
                              )}
                          </div>

                          <div>
                            <label
                              htmlFor={`gallery-alt-${image.id}`}
                              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#999]"
                            >
                              Texte alternatif
                            </label>

                            <input
                              id={`gallery-alt-${image.id}`}
                              type="text"
                              value={image.alt}
                              onChange={(event) =>
                                updateGalleryItem(
                                  image.id,
                                  "alt",
                                  event.target.value,
                                )
                              }
                              placeholder="Décrire l’image"
                              className="min-h-10 w-full rounded-lg border border-[#e5e5e2] bg-white px-3 text-xs text-[#111] outline-none focus:border-[#111]"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`gallery-title-${image.id}`}
                              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#999]"
                            >
                              Titre
                            </label>

                            <input
                              id={`gallery-title-${image.id}`}
                              type="text"
                              value={image.title}
                              onChange={(event) =>
                                updateGalleryItem(
                                  image.id,
                                  "title",
                                  event.target.value,
                                )
                              }
                              placeholder="Titre du visuel"
                              className="min-h-10 w-full rounded-lg border border-[#e5e5e2] bg-white px-3 text-xs text-[#111] outline-none focus:border-[#111]"
                            />
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                aria-label="Déplacer l’image vers la gauche"
                                disabled={
                                  index === 0
                                }
                                onClick={() =>
                                  moveGallery(
                                    index,
                                    -1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-white hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                              >
                                <HugeiconsIcon
                                  icon={
                                    ArrowLeft02Icon
                                  }
                                  size={15}
                                  strokeWidth={
                                    1.7
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                aria-label="Déplacer l’image vers la droite"
                                disabled={
                                  index ===
                                  gallery.length -
                                    1
                                }
                                onClick={() =>
                                  moveGallery(
                                    index,
                                    1,
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] transition-colors hover:bg-white hover:text-[#111] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                              >
                                <HugeiconsIcon
                                  icon={
                                    ArrowRight02Icon
                                  }
                                  size={15}
                                  strokeWidth={
                                    1.7
                                  }
                                />
                              </button>
                            </div>

                            <RemoveButton
                              label={`Supprimer ${image.name}`}
                              onClick={() =>
                                removeGalleryItem(
                                  image.id,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5">
              <div className="mb-5">
                <p className="text-sm font-semibold tracking-[-0.02em] text-[#111]">
                  Publication
                </p>

                <p className="mt-1 text-xs leading-5 text-[#999]">
                  Contrôlez la visibilité du projet.
                </p>
              </div>

              <div className="space-y-4">
                <CustomDropdown
                  label="Statut"
                  value={status}
                  placeholder="Sélectionner un statut"
                  options={statusOptions}
                  onChange={setStatus}
                />

                <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#fafaf9] px-3">
                  <span className="text-sm font-medium text-[#111]">
                    Projet mis en avant
                  </span>

                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(event) =>
                      setFeatured(
                        event.target.checked,
                      )
                    }
                    className="h-4 w-4 accent-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]"
                  />
                </label>

                <div className="rounded-xl bg-[#fafaf9] p-3">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E30613]" />

                    <div>
                      <p className="text-xs font-medium text-[#111]">
                        {selectedStatus}
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-[#999]">
                        {status ===
                        "PUBLISHED"
                          ? "Ce projet sera visible sur votre portfolio public."
                          : status ===
                              "ARCHIVED"
                            ? "Ce projet sera conservé mais retiré du portfolio public."
                            : "Ce projet n’est pas encore visible sur votre portfolio public."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-white p-5">
              <div className="mb-5">
                <p className="text-sm font-semibold tracking-[-0.02em] text-[#111]">
                  Aperçu
                </p>

                <p className="mt-1 text-xs leading-5 text-[#999]">
                  Vérifiez les informations essentielles.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Projet
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#111]">
                    {title.trim() ||
                      "Nouveau projet"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Catégorie
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {selectedCategory}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Année
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {year || "Non renseignée"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Client
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {client.trim() ||
                      "Non renseigné"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Image de couverture
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {coverImage
                      ? "Définie"
                      : "Non définie"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Services
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {
                      services.filter(
                        (service) =>
                          service.serviceId,
                      ).length
                    }
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Étapes
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {
                      approach.filter(
                        (step) =>
                          step.title.trim(),
                      ).length
                    }
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Galerie
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {gallery.length} image
                    {gallery.length > 1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">
                    Compétences
                  </p>

                  <p className="mt-1 text-sm text-[#666]">
                    {selectedSkills.length}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-[#e5e5e2] bg-[#111] p-5 text-white">
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
                    Données connectées
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Les catégories, services et
                    compétences affichés proviennent
                    maintenant de PostgreSQL via
                    Prisma.
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