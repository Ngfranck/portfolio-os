import Link from "next/link";

import { createGalleryItem } from "../actions";
import { GalleryItemFields } from "../GalleryItemFields";

type NewGalleryItemPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewGalleryItemPage({
  searchParams,
}: NewGalleryItemPageProps) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto max-w-[900px] px-5 pb-28 pt-8 sm:px-8 lg:px-10 lg:pb-12">
      <Link href="/gallery" className="text-sm text-[#666] hover:text-[#111]">
        ← Retour à la galerie
      </Link>
      <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[#111]">
        Ajouter une œuvre
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#666]">
        Créez une entrée indépendante pour vos essais visuels et projets
        secondaires.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error === "size"
            ? "L’image dépasse la taille maximale de 8 Mo."
            : error === "type"
              ? "Choisissez une image JPG, PNG, WebP, AVIF ou GIF valide."
              : error === "duplicate"
                ? "Cette œuvre n’a pas pu être publiée à cause d’un conflit de données. Réessayez."
                : error === "url"
                  ? "Saisissez un lien HTTPS valide vers une image."
                  : "Indiquez un titre et sélectionnez une image ou saisissez son lien HTTPS."}
        </p>
      )}

      <form
        action={createGalleryItem}
        className="mt-7 space-y-6 rounded-2xl border border-[#e5e5e2] bg-white p-5 sm:p-7"
      >
        <GalleryItemFields />
        <div className="flex flex-wrap justify-end gap-3 border-t border-[#eee] pt-5">
          <Link
            href="/gallery"
            className="inline-flex min-h-11 items-center rounded-xl border border-[#dededb] px-4 text-sm font-medium text-[#555]"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="min-h-11 rounded-xl bg-[#111] px-5 text-sm font-medium text-white hover:bg-[#292929]"
          >
            Publier l’œuvre
          </button>
        </div>
      </form>
    </main>
  );
}
