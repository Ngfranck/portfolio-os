import type { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { getGalleryImageUrl } from "@/lib/gallery-image-url";

import { deleteGalleryItem } from "./actions";
import { GalleryImagePreview } from "./GalleryImagePreview";

export const metadata: Metadata = {
  title: "Galerie",
};

type GalleryPageProps = {
  searchParams: Promise<{
    success?: string;
  }>;
};

const successMessages: Record<string, string> = {
  created: "L’œuvre a été ajoutée à la galerie.",
  updated: "L’œuvre a été mise à jour.",
  deleted: "L’œuvre a été supprimée.",
};

export default async function AdminGalleryPage({
  searchParams,
}: GalleryPageProps) {
  const [{ success }, items] = await Promise.all([
    searchParams,
    prisma.galleryItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        imageUrl: true,
        imageAlt: true,
        published: true,
        sortOrder: true,
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-[1320px] px-5 pb-28 pt-8 sm:px-8 lg:px-10 lg:pb-12">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E30613]">
            Portfolio public
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.045em] text-[#111] sm:text-4xl">
            Galerie créative
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
            Gérez les œuvres et projets secondaires affichés sur la page
            publique de la galerie.
          </p>
        </div>
        <Link
          href="/gallery/new"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111] px-4 text-sm font-medium text-white transition hover:bg-[#292929]"
        >
          Ajouter une œuvre
        </Link>
      </header>

      {success && successMessages[success] && (
        <p
          role="status"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {successMessages[success]}
        </p>
      )}

      {items.length === 0 ? (
        <section className="mt-10 rounded-2xl border border-dashed border-[#d8d8d4] bg-white px-6 py-16 text-center">
          <h2 className="font-display text-xl font-medium text-[#111]">
            La galerie est encore vide
          </h2>
          <p className="mt-2 text-sm text-[#777]">
            Ajoutez une œuvre pour commencer à composer votre toile créative.
          </p>
        </section>
      ) : (
        <section
          aria-label="Œuvres de la galerie"
          className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white"
            >
              <div className="aspect-[16/10] bg-[#f0f0ed]">
                <GalleryImagePreview
                  src={getGalleryImageUrl(item.imageUrl)}
                  alt={item.imageAlt}
                  className="h-full"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg font-medium tracking-[-0.02em] text-[#111]">
                      {item.title}
                    </h2>
                    <p className="mt-1 truncate text-xs text-[#888]">
                      /{item.slug}
                      {item.category ? ` · ${item.category}` : ""}
                    </p>
                  </div>
                  <span
                    className={
                      item.published
                        ? "shrink-0 rounded-full bg-[#eaf7ed] px-2.5 py-1 text-[10px] font-medium text-[#23743a]"
                        : "shrink-0 rounded-full bg-[#f2f2ef] px-2.5 py-1 text-[10px] font-medium text-[#777]"
                    }
                  >
                    {item.published ? "Publié" : "Brouillon"}
                  </span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#eee] pt-4">
                  <span className="text-xs text-[#888]">
                    Ordre {item.sortOrder}
                  </span>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/gallery/${item.id}`}
                      className="text-xs font-medium text-[#111] underline decoration-[#ccc] underline-offset-4 hover:decoration-[#E30613]"
                    >
                      Modifier
                    </Link>
                    <form action={deleteGalleryItem.bind(null, item.id)}>
                      <button
                        type="submit"
                        className="text-xs font-medium text-[#b42318] underline decoration-[#e7b5b1] underline-offset-4 hover:decoration-[#b42318]"
                      >
                        Supprimer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
