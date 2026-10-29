"use server";

import { requireAdmin } from "@/lib/admin-auth";

import { prisma } from "@/lib/prisma";
import type { Prisma } from "../../../../../web/app/generated/prisma/client";
import { z } from "zod";

function getImageUrl(value: unknown): string | null {
  let current = value;
  const seen = new Set<object>();

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    current = (current as Record<string, unknown>).url;
  }

  return typeof current === "string" && current.trim()
    ? current.trim()
    : null;
}

export async function getProjectReferenceData() {
  await requireAdmin();
  const [categories, services, skills] =
    await Promise.all([
      prisma.category.findMany({
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),

      prisma.service.findMany({
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            title: "asc",
          },
        ],
        select: {
          id: true,
          title: true,
          slug: true,
          shortDescription: true,
          icon: true,
        },
      }),

      prisma.skill.findMany({
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            name: "asc",
          },
        ],
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          icon: true,
        },
      }),
    ]);

  return {
    categories,
    services,
    skills,
  };
}

const roleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Le rôle est requis."),

  sortOrder: z
    .number()
    .int()
    .nonnegative(),
});

const serviceSchema = z.object({
  serviceId: z
    .string()
    .trim()
    .min(1, "Le service est requis."),

  sortOrder: z
    .number()
    .int()
    .nonnegative(),
});

const approachSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1),

  title: z
    .string()
    .trim()
    .min(1),

  description: z
    .string()
    .trim()
    .min(1),

  sortOrder: z
    .number()
    .int()
    .nonnegative(),
});

const resultSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1),

  sortOrder: z
    .number()
    .int()
    .nonnegative(),
});

const gallerySchema = z.object({
  url: z
    .string()
    .trim()
    .min(1),

  alt: z
    .string()
    .trim()
    .optional(),

  title: z
    .string()
    .trim()
    .optional(),

  width: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),

  height: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional(),

  sortOrder: z
    .number()
    .int()
    .nonnegative(),
});

const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      1,
      "Le nom du projet est requis.",
    ),

  slug: z
    .string()
    .trim()
    .min(
      1,
      "Le slug est requis.",
    )
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit contenir uniquement des minuscules, chiffres et tirets.",
    ),

  categoryId: z
    .string()
    .trim()
    .nullable()
    .optional(),

  year: z
    .string()
    .trim()
    .regex(
      /^\d{4}$/,
      "L'année doit être au format YYYY.",
    )
    .optional()
    .nullable(),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),

  shortDescription: z
    .string()
    .trim()
    .min(
      1,
      "La description courte est requise.",
    ),

  description: z
    .string()
    .trim()
    .optional()
    .default(""),

  client: z
    .string()
    .trim()
    .optional()
    .default(""),

  duration: z
    .string()
    .trim()
    .optional()
    .default(""),

  liveUrl: z
    .string()
    .trim()
    .optional()
    .default(""),

  caseStudyUrl: z
    .string()
    .trim()
    .optional()
    .default(""),

  featured: z
    .boolean()
    .default(false),

  coverImage: z
    .object({
      url: z
        .string()
        .trim()
        .min(1),

      name: z
        .string()
        .trim(),
    })
    .nullable()
    .optional(),

  overview: z.object({
    context: z
      .string()
      .trim()
      .default(""),

    challenge: z
      .string()
      .trim()
      .default(""),

    objective: z
      .string()
      .trim()
      .default(""),
  }),

  roles: z
    .array(roleSchema)
    .default([]),

  services: z
    .array(serviceSchema)
    .default([]),

  approach: z
    .array(approachSchema)
    .default([]),

  results: z
    .array(resultSchema)
    .default([]),

  selectedSkills: z
    .array(
      z
        .string()
        .trim()
        .min(1),
    )
    .default([]),

  gallery: z
    .array(gallerySchema)
    .default([]),
});

export type CreateProjectInput = z.input<
  typeof projectFormSchema
>;

export type UpdateProjectInput =
  CreateProjectInput;

function normalizeProjectData(
  data: z.output<typeof projectFormSchema>,
) {
  const serviceIds = [
    ...new Set(
      data.services
        .map(
          (service) =>
            service.serviceId,
        )
        .filter(Boolean),
    ),
  ];

  const skillIds = [
    ...new Set(
      data.selectedSkills.filter(
        Boolean,
      ),
    ),
  ];

  const validRoles = data.roles.filter(
    (role) =>
      role.title.trim(),
  );

  const validServices =
    data.services.filter(
      (service) =>
        service.serviceId,
    );

  const validApproach =
    data.approach.filter(
      (step) =>
        step.title.trim() &&
        step.description.trim(),
    );

  const validResults =
    data.results.filter(
      (result) =>
        result.content.trim(),
    );

  const hasOverview =
    data.overview.context.trim() ||
    data.overview.challenge.trim() ||
    data.overview.objective.trim();

  const persistedCoverImage =
    data.coverImage?.url &&
    !data.coverImage.url.startsWith(
      "blob:",
    )
      ? data.coverImage.url
      : null;

  const persistedGallery =
    data.gallery.filter(
      (image) =>
        image.url &&
        !image.url.startsWith("blob:"),
    );

  return {
    serviceIds,
    skillIds,
    validRoles,
    validServices,
    validApproach,
    validResults,
    hasOverview,
    persistedCoverImage,
    persistedGallery,
  };
}

async function validateProjectReferences(
  data: z.output<typeof projectFormSchema>,
) {
  if (data.categoryId) {
    const category =
      await prisma.category.findUnique({
        where: {
          id: data.categoryId,
        },
        select: {
          id: true,
        },
      });

    if (!category) {
      return "La catégorie sélectionnée est introuvable.";
    }
  }

  const {
    serviceIds,
    skillIds,
  } = normalizeProjectData(data);

  if (serviceIds.length > 0) {
    const services =
      await prisma.service.findMany({
        where: {
          id: {
            in: serviceIds,
          },
        },
        select: {
          id: true,
        },
      });

    if (
      services.length !==
      serviceIds.length
    ) {
      return "Un ou plusieurs services sélectionnés sont introuvables.";
    }
  }

  if (skillIds.length > 0) {
    const skills =
      await prisma.skill.findMany({
        where: {
          id: {
            in: skillIds,
          },
        },
        select: {
          id: true,
        },
      });

    if (
      skills.length !==
      skillIds.length
    ) {
      return "Une ou plusieurs compétences sélectionnées sont introuvables.";
    }
  }

  return null;
}

/* =========================================================
   READ — Projet existant
   ========================================================= */

export async function getProjectById(
  projectId: string,
) {
  await requireAdmin();
  if (
    !projectId ||
    projectId === "new"
  ) {
    return {
      success: false as const,
      error:
        "Identifiant de projet invalide.",
    };
  }

  try {
    const project =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },

        include: {
          overview: true,

          roles: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          services: {
            orderBy: {
              sortOrder: "asc",
            },

            include: {
              service: {
                select: {
                  id: true,
                  title: true,
                  slug: true,
                },
              },
            },
          },

          skills: {
            include: {
              skill: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  type: true,
                  icon: true,
                },
              },
            },
          },

          approach: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          results: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          images: {
            orderBy: {
              sortOrder: "asc",
            },
          },

          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      });

    if (!project) {
      return {
        success: false as const,
        error: "Projet introuvable.",
      };
    }

    const coverImageUrl = getImageUrl(project.coverImage);

    return {
      success: true as const,

      project: {
        id: project.id,

        title: project.title,

        slug: project.slug,

        shortDescription:
          project.shortDescription,

        description:
          project.description ?? "",

        client:
          project.client ?? "",

        year: project.year
          ? String(project.year)
          : "",

        duration:
          project.duration ?? "",

        status: project.status,

        featured:
          project.featured,

        coverImage:
          coverImageUrl
            ? {
                url: coverImageUrl,

                name:
                  coverImageUrl
                    .split("/")
                    .pop() ??
                  "Image de couverture",
              }
            : null,

        liveUrl:
          project.liveUrl ?? "",

        caseStudyUrl:
          project.caseStudyUrl ?? "",

        categoryId:
          project.categoryId ?? "",

        overview: {
          context:
            project.overview
              ?.context ?? "",

          challenge:
            project.overview
              ?.challenge ?? "",

          objective:
            project.overview
              ?.objective ?? "",
        },

        roles:
          project.roles.map(
            (role) => ({
              id: role.id,

              title:
                role.title,

              sortOrder:
                role.sortOrder,
            }),
          ),

        services:
          project.services.map(
            (item) => ({
              id: item.id,

              serviceId:
                item.serviceId,

              sortOrder:
                item.sortOrder,
            }),
          ),

        selectedSkills:
          project.skills.map(
            (item) =>
              item.skillId,
          ),

        approach:
          project.approach.map(
            (step) => ({
              id: step.id,

              number:
                step.number,

              title:
                step.title,

              description:
                step.description,

              sortOrder:
                step.sortOrder,
            }),
          ),

        results:
          project.results.map(
            (result) => ({
              id: result.id,

              content:
                result.content,

              sortOrder:
                result.sortOrder,
            }),
          ),

        gallery:
          project.images.map(
            (image) => ({
              id: image.id,

              name:
                image.title ||
                image.url
                  .split("/")
                  .pop() ||
                "Image",

              url: image.url,

              alt:
                image.alt ?? "",

              title:
                image.title ?? "",

              width:
                image.width,

              height:
                image.height,

              sortOrder:
                image.sortOrder,
            }),
          ),
      },
    };
  } catch (error) {
    console.error(
      "Erreur lors du chargement du projet :",
      error,
    );

    return {
      success: false as const,
      error:
        "Impossible de charger le projet.",
    };
  }
}

/* =========================================================
   CREATE — Nouveau projet
   ========================================================= */

export async function createProject(
  input: CreateProjectInput,
) {
  await requireAdmin();
  const parsed =
    projectFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,

      error:
        parsed.error.issues[0]?.message ??
        "Les données du projet sont invalides.",
    };
  }

  const data = parsed.data;

  try {
    const existingProject =
      await prisma.project.findUnique({
        where: {
          slug: data.slug,
        },

        select: {
          id: true,
        },
      });

    if (existingProject) {
      return {
        success: false as const,

        error:
          "Un projet utilisant déjà ce slug existe.",
      };
    }

    const referenceError =
      await validateProjectReferences(
        data,
      );

    if (referenceError) {
      return {
        success: false as const,
        error: referenceError,
      };
    }

    const normalized =
      normalizeProjectData(data);

    const project =
      await prisma.project.create({
        data: {
          title: data.title,

          slug: data.slug,

          shortDescription:
            data.shortDescription,

          description:
            data.description || null,

          client:
            data.client || null,

          year: data.year
            ? Number(data.year)
            : null,

          duration:
            data.duration || null,

          status: data.status,

          featured:
            data.featured,

          coverImage:
            normalized.persistedCoverImage,

          liveUrl:
            data.liveUrl || null,

          caseStudyUrl:
            data.caseStudyUrl || null,

          categoryId:
            data.categoryId || null,

          overview:
            normalized.hasOverview
              ? {
                  create: {
                    context:
                      data.overview
                        .context,

                    challenge:
                      data.overview
                        .challenge,

                    objective:
                      data.overview
                        .objective,
                  },
                }
              : undefined,

          roles:
            normalized.validRoles
              .length > 0
              ? {
                  create:
                    normalized.validRoles.map(
                      (
                        role,
                        index,
                      ) => ({
                        title:
                          role.title.trim(),

                        sortOrder:
                          index,
                      }),
                    ),
                }
              : undefined,

          services:
            normalized.validServices
              .length > 0
              ? {
                  create:
                    normalized.validServices.map(
                      (
                        service,
                        index,
                      ) => ({
                        serviceId:
                          service.serviceId,

                        sortOrder:
                          index,
                      }),
                    ),
                }
              : undefined,

          skills:
            normalized.skillIds
              .length > 0
              ? {
                  create:
                    normalized.skillIds.map(
                      (skillId) => ({
                        skillId,
                      }),
                    ),
                }
              : undefined,

          approach:
            normalized.validApproach
              .length > 0
              ? {
                  create:
                    normalized.validApproach.map(
                      (
                        step,
                        index,
                      ) => ({
                        number:
                          String(
                            index + 1,
                          ).padStart(
                            2,
                            "0",
                          ),

                        title:
                          step.title.trim(),

                        description:
                          step.description.trim(),

                        sortOrder:
                          index,
                      }),
                    ),
                }
              : undefined,

          results:
            normalized.validResults
              .length > 0
              ? {
                  create:
                    normalized.validResults.map(
                      (
                        result,
                        index,
                      ) => ({
                        content:
                          result.content.trim(),

                        sortOrder:
                          index,
                      }),
                    ),
                }
              : undefined,

          images:
            normalized.persistedGallery
              .length > 0
              ? {
                  create:
                    normalized.persistedGallery.map(
                      (
                        image,
                        index,
                      ) => ({
                        url: image.url,

                        alt:
                          image.alt?.trim() ||
                          null,

                        title:
                          image.title?.trim() ||
                          null,

                        width:
                          image.width ??
                          null,

                        height:
                          image.height ??
                          null,

                        sortOrder:
                          index,
                      }),
                    ),
                }
              : undefined,
        },

        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
        },
      });

    return {
      success: true as const,
      project,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la création du projet :",
      error,
    );

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false as const,

        error:
          "Un projet utilisant déjà ce slug existe.",
      };
    }

    if (error instanceof Error) {
      return {
        success: false as const,
        error: error.message,
      };
    }

    return {
      success: false as const,

      error:
        "Impossible de créer le projet.",
    };
  }
}

/* =========================================================
   UPDATE — Projet existant
   ========================================================= */

export async function updateProject(
  projectId: string,
  input: UpdateProjectInput,
) {
  await requireAdmin();
  if (
    !projectId ||
    projectId === "new"
  ) {
    return {
      success: false as const,

      error:
        "Identifiant de projet invalide.",
    };
  }

  const parsed =
    projectFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,

      error:
        parsed.error.issues[0]?.message ??
        "Les données du projet sont invalides.",
    };
  }

  const data = parsed.data;

  try {
    const existingProject =
      await prisma.project.findUnique({
        where: {
          id: projectId,
        },

        select: {
          id: true,
        },
      });

    if (!existingProject) {
      return {
        success: false as const,
        error: "Projet introuvable.",
      };
    }

    const slugConflict =
      await prisma.project.findFirst({
        where: {
          slug: data.slug,

          NOT: {
            id: projectId,
          },
        },

        select: {
          id: true,
        },
      });

    if (slugConflict) {
      return {
        success: false as const,

        error:
          "Un autre projet utilise déjà ce slug.",
      };
    }

    const referenceError =
      await validateProjectReferences(
        data,
      );

    if (referenceError) {
      return {
        success: false as const,
        error: referenceError,
      };
    }

    const normalized =
      normalizeProjectData(data);

    /*
     * Toutes les opérations sont regroupées
     * dans une transaction Prisma array.
     *
     * On évite ici la transaction interactive
     * qui provoquait auparavant P2028.
     */

    const operations:
      Prisma.PrismaPromise<any>[] = [
      prisma.project.update({
        where: {
          id: projectId,
        },

        data: {
          title: data.title,

          slug: data.slug,

          shortDescription:
            data.shortDescription,

          description:
            data.description || null,

          client:
            data.client || null,

          year: data.year
            ? Number(data.year)
            : null,

          duration:
            data.duration || null,

          status: data.status,

          featured:
            data.featured,

          coverImage:
            normalized.persistedCoverImage,

          liveUrl:
            data.liveUrl || null,

          caseStudyUrl:
            data.caseStudyUrl || null,

          categoryId:
            data.categoryId || null,
        },

        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
        },
      }),

      prisma.projectOverview.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectRole.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectService.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectSkill.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectApproach.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectResult.deleteMany({
        where: {
          projectId,
        },
      }),

      prisma.projectImage.deleteMany({
        where: {
          projectId,
        },
      }),
    ];

    if (
      normalized.hasOverview
    ) {
      operations.push(
        prisma.projectOverview.create({
          data: {
            projectId,

            context:
              data.overview.context,

            challenge:
              data.overview.challenge,

            objective:
              data.overview.objective,
          },
        }),
      );
    }

    if (
      normalized.validRoles.length >
      0
    ) {
      operations.push(
        prisma.projectRole.createMany({
          data:
            normalized.validRoles.map(
              (role, index) => ({
                projectId,

                title:
                  role.title.trim(),

                sortOrder:
                  index,
              }),
            ),
        }),
      );
    }

    if (
      normalized.validServices.length >
      0
    ) {
      operations.push(
        prisma.projectService.createMany({
          data:
            normalized.validServices.map(
              (
                service,
                index,
              ) => ({
                projectId,

                serviceId:
                  service.serviceId,

                sortOrder:
                  index,
              }),
            ),
        }),
      );
    }

    if (
      normalized.skillIds.length >
      0
    ) {
      operations.push(
        prisma.projectSkill.createMany({
          data:
            normalized.skillIds.map(
              (skillId) => ({
                projectId,
                skillId,
              }),
            ),
        }),
      );
    }

    if (
      normalized.validApproach.length >
      0
    ) {
      operations.push(
        prisma.projectApproach.createMany({
          data:
            normalized.validApproach.map(
              (step, index) => ({
                projectId,

                number:
                  String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  ),

                title:
                  step.title.trim(),

                description:
                  step.description.trim(),

                sortOrder:
                  index,
              }),
            ),
        }),
      );
    }

    if (
      normalized.validResults.length >
      0
    ) {
      operations.push(
        prisma.projectResult.createMany({
          data:
            normalized.validResults.map(
              (result, index) => ({
                projectId,

                content:
                  result.content.trim(),

                sortOrder:
                  index,
              }),
            ),
        }),
      );
    }

    if (
      normalized.persistedGallery
        .length > 0
    ) {
      operations.push(
        prisma.projectImage.createMany({
          data:
            normalized.persistedGallery.map(
              (image, index) => ({
                projectId,

                url: image.url,

                alt:
                  image.alt?.trim() ||
                  null,

                title:
                  image.title?.trim() ||
                  null,

                width:
                  image.width ?? null,

                height:
                  image.height ?? null,

                sortOrder:
                  index,
              }),
            ),
        }),
      );
    }

    const transactionResult =
      await prisma.$transaction(
        operations,
      );

    const project =
      transactionResult[0];

    return {
      success: true as const,
      project,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du projet :",
      error,
    );

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false as const,

        error:
          "Un autre projet utilise déjà ce slug.",
      };
    }

    if (error instanceof Error) {
      return {
        success: false as const,
        error: error.message,
      };
    }

    return {
      success: false as const,

      error:
        "Impossible de mettre à jour le projet.",
    };
  }
}