import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Archive01Icon,
  ArrowRight01Icon,
  Briefcase01Icon,
} from "@hugeicons/core-free-icons";
import { prisma } from "@/lib/prisma";

function count(value: number) {
  return String(value).padStart(2, "0");
}

function dateLabel(value: Date | null) {
  if (!value) return "Date non définie";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Douala",
  }).format(value).replace(/\.$/, "");
}

function dateTimeLabel(value: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Douala",
  }).format(value).replace(/\.$/, "");
}

function statusPresentation(status: string) {
  if (status === "PUBLISHED") {
    return { label: "Publié", accent: "bg-[#FDE8EA] text-[#E30613]" };
  }
  if (status === "ARCHIVED") {
    return { label: "Archivé", accent: "bg-[#f0f0ed] text-[#777]" };
  }
  return { label: "Brouillon", accent: "bg-[#f7f7f5] text-[#666]" };
}

async function getDashboardData() {
  try {
    const [
      projectsTotal,
      publishedProjects,
      draftProjects,
      archivedProjects,
      articlesTotal,
      publishedArticles,
      draftArticles,
      servicesTotal,
      categoriesTotal,
      projects,
      articles,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { status: "DRAFT" } }),
      prisma.project.count({ where: { status: "ARCHIVED" } }),
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.service.count(),
      prisma.category.count(),
      prisma.project.findMany({
        orderBy: { updatedAt: "desc" },
        take: 4,
        select: {
          id: true,
          title: true,
          status: true,
          year: true,
          updatedAt: true,
          category: { select: { name: true } },
        },
      }),
      prisma.article.findMany({
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          status: true,
          publishedAt: true,
          readTime: true,
          updatedAt: true,
          category: { select: { name: true } },
        },
      }),
    ]);

    const activity = [
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        type: "Projet" as const,
        title: project.title,
        detail: `${statusPresentation(project.status).label} · ${
          project.category?.name ?? "Sans catégorie"
        }`,
        date: project.updatedAt,
      })),
      ...articles.map((article) => ({
        id: `article-${article.id}`,
        type: "Article" as const,
        title: article.title,
        detail: `${statusPresentation(article.status).label} · ${
          article.category?.name ?? "Sans catégorie"
        }`,
        date: article.updatedAt,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 4);

    return {
      hasError: false as const,
      projectsTotal,
      publishedProjects,
      draftProjects,
      archivedProjects,
      articlesTotal,
      publishedArticles,
      draftArticles,
      servicesTotal,
      categoriesTotal,
      projects,
      articles,
      activity,
    };
  } catch (error) {
    console.error("Erreur lors du chargement du tableau de bord :", error);
    return {
      hasError: true as const,
      projectsTotal: 0,
      publishedProjects: 0,
      draftProjects: 0,
      archivedProjects: 0,
      articlesTotal: 0,
      publishedArticles: 0,
      draftArticles: 0,
      servicesTotal: 0,
      categoriesTotal: 0,
      projects: [],
      articles: [],
      activity: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();
  const today = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Douala",
  }).format(new Date());

  const stats = [
    {
      label: "Projets",
      value: count(data.projectsTotal),
      detail: `${data.publishedProjects} publiés · ${data.draftProjects} brouillons${
        data.archivedProjects ? ` · ${data.archivedProjects} archivés` : ""
      }`,
      icon: Briefcase01Icon,
    },
    {
      label: "Articles",
      value: count(data.articlesTotal),
      detail: `${data.publishedArticles} publiés · ${data.draftArticles} brouillons`,
      icon: Archive01Icon,
    },
    {
      label: "Services",
      value: count(data.servicesTotal),
      detail: "Services enregistrés",
      icon: Briefcase01Icon,
    },
    {
      label: "Catégories",
      value: count(data.categoriesTotal),
      detail: "Catégories disponibles",
      icon: Archive01Icon,
    },
  ];

  const totalContent = data.projectsTotal + data.articlesTotal;
  const publishedContent = data.publishedProjects + data.publishedArticles;
  const publishedPercentage =
    totalContent > 0 ? Math.round((publishedContent / totalContent) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#111]">
      <div className="mx-auto w-full max-w-[1480px] px-4 py-5 pb-28 sm:px-6 sm:py-7 lg:px-8 lg:py-8 lg:pb-10">
        <header className="mb-7 sm:mb-9 lg:mb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E30613]">
                Administration · Gonar.ui
              </p>
              <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#111]">
                Bonjour, Gonar.ui
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#666] sm:text-[15px]">
                Voici un aperçu de l&apos;activité de ton portfolio et de tes contenus.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 lg:justify-end">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#999]">
                  Aujourd&apos;hui
                </p>
                <p className="mt-1 text-sm font-medium text-[#111]">{today}</p>
              </div>
              <div aria-hidden="true" className="h-8 w-px bg-[#e5e5e2]" />
              <span
                aria-label={data.hasError ? "Données indisponibles" : "Données connectées"}
                className="flex items-center gap-2 rounded-full border border-[#e5e5e2] bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#666]"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    data.hasError ? "bg-[#E30613]" : "bg-[#48A868]"
                  }`}
                />
                {data.hasError ? "Connexion indisponible" : "Données connectées"}
              </span>
            </div>
          </div>
        </header>

        {data.hasError && (
          <div role="alert" className="mb-6 rounded-2xl border border-[#f1c5c9] bg-[#FDE8EA] p-4">
            <p className="text-sm font-medium text-[#111]">
              Les données du tableau de bord ne sont pas disponibles.
            </p>
            <p className="mt-1 text-xs leading-5 text-[#666]">
              Vérifie la connexion à la base de données, puis recharge cette page.
              Les compteurs affichés ne représentent pas les données réelles tant
              que la connexion n&apos;est pas rétablie.
            </p>
          </div>
        )}

        {/* Statistiques */}
        <section aria-labelledby="stats-heading">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">
                Vue globale
              </p>
              <h2 id="stats-heading" className="text-xl font-semibold tracking-[-0.035em] text-[#111] sm:text-2xl">
                Statistiques
              </h2>
            </div>
            <span className="text-[10px] font-semibold text-[#c2c2bf]">01</span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-[#e5e5e2] bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f7f7f5]">
                    <HugeiconsIcon icon={stat.icon} size={16} strokeWidth={1.7} className="text-[#666]" />
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E30613]" />
                </div>
                <p className="mt-6 text-[13px] font-medium text-[#666]">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold leading-none tracking-[-0.05em] text-[#111] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-[11px] leading-4 text-[#999]">{stat.detail}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Espace de travail */}
        <section className="mt-8 lg:mt-10">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">
            <article className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white" aria-labelledby="projects-heading">
              <div className="border-b border-[#e5e5e2] px-5 py-6 sm:px-7 sm:py-7">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="h-px w-7 bg-[#E30613]" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E30613]">
                        Portfolio
                      </p>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <h2 id="projects-heading" className="text-[28px] font-semibold leading-none tracking-[-0.045em] text-[#111] sm:text-[34px]">
                        Projets récents
                      </h2>
                      <span className="text-[11px] font-semibold tracking-[0.08em] text-[#999]">
                        {count(data.projects.length)}
                      </span>
                    </div>
                    <p className="mt-3 max-w-lg text-xs leading-5 text-[#666] sm:text-sm">
                      Les derniers projets ajoutés ou modifiés dans ton portfolio.
                    </p>
                  </div>
                  <Link
                    href="/projects"
                    className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-xl border border-[#e5e5e2] bg-white px-4 py-2.5 text-xs font-semibold text-[#111] transition-colors duration-150 hover:bg-[#f7f7f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
                  >
                    <HugeiconsIcon icon={Briefcase01Icon} size={16} strokeWidth={1.7} />
                    <span>Voir tous les projets</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.7} />
                  </Link>
                </div>
              </div>

              <div className="hidden border-b border-[#e5e5e2] bg-[#fafaf8] md:grid md:grid-cols-[56px_minmax(180px,1.5fr)_minmax(150px,1.1fr)_110px_70px_42px] md:items-center md:px-7 md:py-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#999]">#</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">Projet</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">Catégorie</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">Statut</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111]">Année</span>
                <span className="sr-only">Action</span>
              </div>

              <div className="hidden md:block">
                {data.projects.length ? (
                  <div className="divide-y divide-[#e5e5e2]">
                    {data.projects.map((project, index) => {
                      const presentation = statusPresentation(project.status);
                      return (
                        <div key={project.id} className="group grid min-h-[88px] grid-cols-[56px_minmax(180px,1.5fr)_minmax(150px,1.1fr)_110px_70px_42px] items-center px-7 transition-colors duration-150 hover:bg-[#fafaf8]">
                          <span className="text-[11px] font-semibold tracking-[0.08em] text-[#b5b5b1]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="flex min-w-0 items-center gap-3">
                            <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-[11px] font-semibold text-white">
                              {project.title.charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-[16px] font-semibold tracking-[-0.025em] text-[#111]">{project.title}</p>
                              <p className="mt-1 text-[10px] text-[#999]">Modifié le {dateLabel(project.updatedAt)}</p>
                            </div>
                          </div>
                          <p className="truncate pr-4 text-xs font-medium text-[#666]">
                            {project.category?.name ?? "Sans catégorie"}
                          </p>
                          <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] ${presentation.accent}`}>
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                            {presentation.label}
                          </span>
                          <p className="text-xs font-medium text-[#999]">{project.year ?? "—"}</p>
                          <Link href={`/projects/${project.id}`} aria-label={`Modifier le projet ${project.title}`} title={`Modifier ${project.title}`} className="flex h-10 w-10 items-center justify-center rounded-xl text-[#999] transition-colors duration-150 hover:bg-[#FDE8EA] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]">
                            <HugeiconsIcon icon={ArrowRight01Icon} size={17} strokeWidth={1.7} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-7 py-10 text-center">
                    <p className="text-sm font-medium text-[#111]">Aucun projet pour le moment</p>
                    <p className="mt-1 text-xs text-[#999]">Les projets créés apparaîtront ici.</p>
                    <Link href="/projects/new" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#111] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2">
                      Créer un projet
                    </Link>
                  </div>
                )}
              </div>

              <div className="divide-y divide-[#e5e5e2] md:hidden">
                {data.projects.length ? data.projects.map((project, index) => {
                  const presentation = statusPresentation(project.status);
                  return (
                    <Link key={project.id} href={`/projects/${project.id}`} aria-label={`Modifier le projet ${project.title}`} className="group flex min-h-[92px] items-center gap-3 px-5 py-4 transition-colors duration-150 hover:bg-[#fafaf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E30613]">
                      <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.08em] text-[#b5b5b1]">{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111] text-[10px] font-semibold text-white">{project.title.charAt(0).toUpperCase()}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#111]">{project.title}</p>
                        <p className="mt-1 truncate text-[11px] text-[#999]">{project.category?.name ?? "Sans catégorie"}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${presentation.accent}`}>
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
                            {presentation.label}
                          </span>
                          <span className="text-[9px] text-[#999]">{project.year ?? "—"}</span>
                        </div>
                      </div>
                      <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#999] transition-colors duration-150 group-hover:bg-[#FDE8EA] group-hover:text-[#E30613]">
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.7} />
                      </span>
                    </Link>
                  );
                }) : (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm font-medium text-[#111]">Aucun projet pour le moment</p>
                    <Link href="/projects/new" className="mt-3 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#111] px-4 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2">
                      Créer un projet
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-[#e5e5e2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <p className="text-[10px] text-[#999]">
                  {data.projects.length} projet{data.projects.length > 1 ? "s" : ""} affiché{data.projects.length > 1 ? "s" : ""} parmi les plus récemment modifiés.
                </p>
                <Link href="/projects" className="inline-flex min-h-11 w-fit items-center gap-2 text-xs font-semibold text-[#111] transition-colors duration-150 hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2">
                  <HugeiconsIcon icon={Briefcase01Icon} size={16} strokeWidth={1.7} />
                  <span>Gérer les projets</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.7} />
                </Link>
              </div>
            </article>

            <aside className="flex flex-col gap-5">
              <article className="rounded-2xl border border-[#e5e5e2] bg-white" aria-labelledby="activity-heading">
                <div className="border-b border-[#e5e5e2] px-5 py-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999]">Journal</p>
                  <div className="flex items-center justify-between gap-3">
                    <h2 id="activity-heading" className="text-lg font-semibold tracking-[-0.025em] text-[#111]">Modifications récentes</h2>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#999]">{count(data.activity.length)}</span>
                  </div>
                </div>
                <div className="divide-y divide-[#e5e5e2]">
                  {data.activity.length ? data.activity.map((item) => (
                    <div key={item.id} className="flex gap-3 px-5 py-4">
                      <span aria-hidden="true" className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.type === "Article" ? "bg-[#E30613]" : "bg-[#cfcfcb]"}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium leading-5 text-[#111]">{item.title}</p>
                        <p className="mt-1 text-[10px] text-[#999]">{item.type} · {item.detail}</p>
                        <time dateTime={item.date.toISOString()} className="mt-1 block text-[10px] text-[#999]">{dateTimeLabel(item.date)}</time>
                      </div>
                    </div>
                  )) : (
                    <p className="px-5 py-8 text-center text-xs leading-5 text-[#999]">Aucune modification récente à afficher.</p>
                  )}
                </div>
                <div className="border-t border-[#e5e5e2] px-5 py-4">
                  <Link href="/analytics" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#111] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.7} />
                    Voir les statistiques
                  </Link>
                </div>
              </article>

              <article className="rounded-2xl bg-[#111] p-5 text-[#f7f7f5]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999]">État du portfolio</p>
                    <h2 className="mt-3 text-xl font-semibold tracking-[-0.035em]">Contenus publiés</h2>
                  </div>
                  <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#48A868]" />
                </div>
                <p className="mt-4 text-xs leading-5 text-[#999]">Suivi des projets et des articles enregistrés comme publiés.</p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#999]">Projets et articles</span>
                    <span className="text-xs font-semibold">{publishedContent} / {totalContent}</span>
                  </div>
                  <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#E30613] transition-[width] duration-300" style={{ width: `${publishedPercentage}%` }} />
                  </div>
                  <p className="mt-2 text-right text-[10px] text-[#999]">{publishedPercentage}% publiés</p>
                </div>
              </article>
            </aside>
          </div>
        </section>

        {/* Articles récents */}
        <section className="mt-10" aria-labelledby="articles-heading">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#999]">Contenu éditorial</p>
              <h2 id="articles-heading" className="text-xl font-semibold tracking-[-0.035em] text-[#111] sm:text-2xl">Articles récents</h2>
            </div>
            <Link href="/articles" className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#111] hover:text-[#E30613] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613]">
              <HugeiconsIcon icon={Archive01Icon} size={16} strokeWidth={1.7} />
              Voir les articles
              <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.7} />
            </Link>
          </div>

          {data.articles.length ? (
            <div className="grid gap-3 md:grid-cols-3">
              {data.articles.map((article, index) => {
                const presentation = statusPresentation(article.status);
                const articleDate = article.publishedAt ?? article.updatedAt;
                return (
                  <article key={article.id} className="group rounded-2xl border border-[#e5e5e2] bg-white p-5 transition-transform duration-150 motion-safe:hover:-translate-y-0.5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] text-[#999]">{article.readTime || "Durée non définie"}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] ${presentation.accent}`}>{presentation.label}</span>
                      <span className="truncate text-[10px] text-[#999]">{article.category?.name ?? "Sans catégorie"}</span>
                    </div>
                    <h3 className="mt-4 line-clamp-3 text-base font-semibold leading-6 tracking-[-0.02em] text-[#111]">{article.title}</h3>
                    <div className="mt-7 flex items-center justify-between border-t border-[#e5e5e2] pt-4">
                      <time dateTime={articleDate.toISOString()} className="text-[10px] text-[#999]">
                        {article.publishedAt ? `Publié le ${dateLabel(article.publishedAt)}` : `Modifié le ${dateLabel(article.updatedAt)}`}
                      </time>
                      <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] transition-colors duration-150 group-hover:bg-[#FDE8EA] group-hover:text-[#E30613]">
                        <HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={1.7} />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e5e5e2] bg-white px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#111]">Aucun article pour le moment</p>
              <p className="mt-1 text-xs text-[#999]">Les articles enregistrés apparaîtront ici.</p>
              <Link href="/articles" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#111] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2">
                Gérer les articles
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
