"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { getGalleryImageUrl } from "@/lib/gallery-image-url";
import { GalleryImagePreview } from "./GalleryImagePreview";

type GalleryItemValues = {
  title: string;
  imageUrl: string;
  imageType: string | null;
};

const inputClass =
  "min-h-12 w-full rounded-xl border border-[#dededb] bg-white px-4 text-sm text-[#111] outline-none transition focus:border-[#111] focus:ring-2 focus:ring-[#E30613]/20";

function Field({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-[#222]"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-5 text-[#888]">{hint}</p>}
    </div>
  );
}

export function GalleryItemFields({
  item,
}: {
  item?: GalleryItemValues;
}) {
  const [selectedImage, setSelectedImage] = useState<{
    file: File;
    url: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(selectedImage.url);
    };
  }, [selectedImage]);

  return (
    <div className="space-y-5">
      <Field label="Titre" htmlFor="title">
        <input
          id="title"
          name="title"
          required
          maxLength={120}
          defaultValue={item?.title}
          placeholder="Nom de l’œuvre"
          className={inputClass}
        />
      </Field>

      <Field
        label="Image"
        htmlFor="image"
        hint="Formats JPG, PNG, WebP, AVIF ou GIF · 8 Mo maximum. Vous pouvez aussi coller un lien ci-dessous."
      >
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            setSelectedImage(
              file ? { file, url: URL.createObjectURL(file) } : null,
            );
          }}
          className={inputClass}
        />
      </Field>

      <Field
        label="Ou lien de l’image"
        htmlFor="imageUrl"
        hint="Utilisez un lien HTTPS direct vers une image. Si un fichier est sélectionné, il sera prioritaire."
      >
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          maxLength={2048}
          defaultValue={
            item?.imageType ? "" : item?.imageUrl
          }
          placeholder="https://ik.imagekit.io/..."
          className={inputClass}
        />
      </Field>

      {(selectedImage || item) && (
        <div className="overflow-hidden rounded-xl border border-[#e5e5e2] bg-[#f7f7f5]">
          <GalleryImagePreview
            src={
              selectedImage?.url ??
              getGalleryImageUrl(item?.imageUrl ?? "")
            }
            alt={selectedImage ? selectedImage.file.name : item?.title ?? "Image"}
            className="h-72 max-h-72"
          />
          <p className="border-t border-[#e5e5e2] px-4 py-2 text-xs text-[#777]">
            {selectedImage
              ? "Aperçu du fichier sélectionné. Cliquez sur l’image pour l’agrandir."
              : "L’image actuelle sera conservée si aucun nouveau fichier n’est sélectionné. Cliquez sur l’image pour l’agrandir."}
          </p>
        </div>
      )}
    </div>
  );
}
