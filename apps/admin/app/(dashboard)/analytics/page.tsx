
import { getAnalyticsOverview } from "./actions";

const contentItems = [
  {
    key: "projects",
    label: "Projets",
    color: "#ff4d00",
    soft: "#FDE8EA",
    number: "01",
  },
  {
    key: "articles",
    label: "Articles",
    color: "#3a4efb",
    soft: "#EFEEFA",
    number: "02",
  },
  {
    key: "services",
    label: "Services",
    color: "#ff005d",
    soft: "#E8F3EE",
    number: "03",
  },
  {
    key: "testimonials",
    label: "Témoignages",
    color: "#710094",
    soft: "#FAF2E3",
    number: "04",
  },
] as const;

const formatNumber = (value: number) =>
  value.toLocaleString("fr-FR");

export default async function AnalyticsPage() {
  const stats = await getAnalyticsOverview();

  const totalContent = contentItems.reduce(
    (total, item) => total + stats[item.key],
    0
  );

  const messages = stats.messages;

  const sortedItems = contentItems
    .map((item) => ({
      ...item,
      value: stats[item.key],
      percentage:
        totalContent > 0
          ? (stats[item.key] / totalContent) * 100
          : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const dominantItem = sortedItems.find((item) => item.value > 0);

  let cursor = 0;

  const gradientStops = contentItems
    .filter((item) => stats[item.key] > 0)
    .map((item) => {
      const start = cursor;
      cursor += (stats[item.key] / totalContent) * 100;
      return `${item.color} ${start.toFixed(3)}% ${cursor.toFixed(3)}%`;
    });

  const donutBackground =
    totalContent > 0
      ? `conic-gradient(${gradientStops.join(", ")})`
      : "conic-gradient(#e8e8e5 0% 100%)";

  return (
    <main className="min-h-full space-y-7 bg-[#f7f7f5] p-4 sm:p-6 lg:p-8">
      {/* En-tête */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wide text-[#999999]">
            <span>Workspace</span>
            <span className="text-[#d0d0cd]">/</span>
            <span className="text-[#111111]">Analytics</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-4xl">
            Analytics<span className="text-[#E30613]">.</span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#777773]">
            Une vision synthétique de l’ensemble de vos contenus et
            des messages reçus.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-[#e5e5e2] bg-white px-3.5 py-2 text-xs font-medium text-[#666660]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Données actuelles
        </div>
      </header>

      {/* KPI Bento */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {/* Total des contenus */}
        <article className="relative col-span-2 flex min-h-[148px] flex-col justify-between overflow-hidden rounded-2xl bg-[#111111] p-5 text-[#f7f7f5] shadow-sm sm:col-span-1">
          <div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border border-white/[0.07]" />
          <div className="absolute -right-2 -top-6 h-24 w-24 rounded-full border border-white/[0.07]" />

          <div className="relative flex items-center justify-between">
            <span className="text-xs font-medium text-white/65">
              Contenus
            </span>
            <span className="h-2 w-2 rounded-full bg-[#E30613]" />
          </div>

          <div className="relative">
            <p className="text-4xl font-semibold tracking-[-0.05em]">
              {formatNumber(totalContent)}
            </p>
            <p className="mt-1 text-xs text-white/45">
              Total enregistré
            </p>
          </div>
        </article>

        {/* Indicateurs par catégorie */}
        {contentItems.map((item) => (
          <article
            key={item.key}
            className="relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e9e9e6] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-medium text-[#777773]">
                {item.label}
              </span>
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>

            <div>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-[#111111]">
                {formatNumber(stats[item.key])}
              </p>
              <p className="mt-1 text-[11px] text-[#aaa9a4]">
                {totalContent > 0
                  ? `${((stats[item.key] / totalContent) * 100)
                      .toFixed(1)
                      .replace(".", ",")} % du contenu`
                  : "Aucun contenu"}
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 h-[3px] w-full opacity-70"
              style={{ backgroundColor: item.color }}
            />
          </article>
        ))}
      </section>

      {/* Bento analytique */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        {/* Donut chart */}
        <article className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7 xl:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111111]">
                Composition du contenu
              </h2>
              <p className="mt-1 text-xs text-[#999993]">
                Répartition des éléments par catégorie.
              </p>
            </div>

            <span className="rounded-lg bg-[#f7f7f5] px-3 py-1.5 text-[11px] font-medium text-[#777773]">
              {formatNumber(totalContent)} éléments
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-around md:gap-5">
            {/* Graphique circulaire */}
            <div
              className="relative flex h-[230px] w-[230px] shrink-0 items-center justify-center"
              role="img"
              aria-label={`Répartition des contenus : ${contentItems
                .map((item) => `${item.label} ${stats[item.key]}`)
                .join(", ")}`}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: donutBackground }}
              />

              {/* Séparation visuelle */}
              <div className="absolute inset-[3px] rounded-full border border-white/80" />

              {/* Centre du donut */}
              <div className="absolute inset-[22%] flex flex-col items-center justify-center rounded-full border border-[#eeeeeb] bg-white shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#aaa9a4]">
                  Total
                </span>
                <span className="mt-1 text-4xl font-semibold tracking-[-0.06em] text-[#111111]">
                  {formatNumber(totalContent)}
                </span>
                <span className="mt-1 text-[10px] text-[#999993]">
                  éléments
                </span>
              </div>
            </div>

            {/* Légende */}
            <div className="w-full max-w-sm space-y-5">
              {contentItems.map((item) => {
                const value = stats[item.key];
                const percentage =
                  totalContent > 0
                    ? (value / totalContent) * 100
                    : 0;

                return (
                  <div key={item.key} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate text-xs font-medium text-[#555550]">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm font-semibold tabular-nums text-[#111111]">
                          {formatNumber(value)}
                        </span>
                        <span className="w-12 text-right text-[11px] tabular-nums text-[#a3a29d]">
                          {percentage.toFixed(1).replace(".", ",")}%
                        </span>
                      </div>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-[#f0f0ed]">
                      <div
                        className="h-full rounded-full transition-[width] duration-500"
                        style={{
                          backgroundColor: item.color,
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {totalContent === 0 && (
            <p className="mt-6 rounded-xl bg-[#f7f7f5] px-4 py-3 text-center text-xs text-[#777773]">
              Le graphique se remplira automatiquement dès que des
              contenus seront enregistrés.
            </p>
          )}
        </article>

        {/* Panneau latéral */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1">
          {/* Insight dynamique */}
          <article className="relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#777773]">
                Analyse du contenu
              </span>
              <span className="rounded-lg bg-[#f7f7f5] px-2.5 py-1 text-[10px] font-medium text-[#888882]">
                Aperçu
              </span>
            </div>

            {dominantItem ? (
              <div className="mt-6">
                <p className="text-[11px] uppercase tracking-[0.13em] text-[#aaa9a4]">
                  Catégorie la plus représentée
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="text-2xl font-semibold tracking-[-0.04em]"
                    style={{ color: dominantItem.color }}
                  >
                    {dominantItem.label}
                  </span>
                  <span className="text-sm font-medium text-[#999993]">
                    {dominantItem.percentage.toFixed(1).replace(".", ",")}%
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#777773]">
                  {formatNumber(dominantItem.value)} éléments sur{" "}
                  {formatNumber(totalContent)} contenus enregistrés.
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-xl font-semibold tracking-tight text-[#111111]">
                  En attente de données
                </p>
                <p className="mt-2 text-xs leading-5 text-[#888882]">
                  Les indicateurs apparaîtront dès l’ajout de contenus.
                </p>
              </div>
            )}

            <div className="absolute -bottom-14 -right-10 h-28 w-28 rounded-full border border-[#E30613]/10" />
          </article>

          {/* Messages */}
          <article className="flex min-h-[190px] flex-col justify-between rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#777773]">
                Messages reçus
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FDE8EA] text-[#E30613]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
            </div>

            <div className="mt-5">
              <p className="text-4xl font-semibold tracking-[-0.05em] text-[#111111]">
                {formatNumber(messages)}
              </p>
              <p className="mt-1 text-xs text-[#999993]">
                Messages enregistrés
              </p>
            </div>

            <a
              href="/messages"
              className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-medium text-[#666660] transition-colors hover:text-[#E30613]"
            >
              Consulter les messages
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      {/* Répartition détaillée */}
      <section className="rounded-2xl border border-[#e9e9e6] bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111111]">
              Volume par catégorie
            </h2>
            <p className="mt-1 text-xs text-[#999993]">
              Comparaison des volumes actuellement enregistrés.
            </p>
          </div>
          <span className="text-[11px] text-[#aaa9a4]">
            {contentItems.length} catégories
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {sortedItems.map((item) => (
            <div
              key={item.key}
              className="rounded-xl border border-[#efefec] bg-[#fafaf9] p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#777773]">
                  {item.label}
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold tracking-[-0.04em] text-[#111111]">
                  {formatNumber(item.value)}
                </p>
                <span className="text-[11px] text-[#999993]">
                  {item.percentage.toFixed(1).replace(".", ",")} %
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaeae7]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note de méthodologie */}
      <footer className="flex items-start gap-2 px-1 pb-2">
        <span className="mt-0.5 text-[#999993]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
        </span>
        <p className="text-[11px] leading-5 text-[#999993]">
          Les graphiques représentent les volumes présents dans la
          base de données. Les visites, les conversions et l’évolution
          dans le temps ne sont pas encore mesurées.
        </p>
      </footer>
    </main>
  );
}