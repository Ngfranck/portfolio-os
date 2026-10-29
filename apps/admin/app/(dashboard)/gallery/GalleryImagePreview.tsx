"use client";

import { useEffect, useRef, useState } from "react";

export function GalleryImagePreview({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`Prévisualiser ${alt}`}
        onClick={() => setIsOpen(true)}
        className={`group relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] ${className ?? ""}`}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100 group-focus-visible:bg-black/20 group-focus-visible:opacity-100">
          <span className="rounded-full bg-black/60 px-3 py-2 text-xs font-medium">
            Agrandir l’image
          </span>
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label={`Prévisualisation : ${alt}`}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
        className="fixed inset-0 m-auto max-h-[92vh] max-w-[94vw] overflow-visible bg-transparent p-0 text-white backdrop:bg-black/85"
      >
        <div className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center">
          <button
            type="button"
            autoFocus
            aria-label="Fermer la prévisualisation"
            onClick={() => setIsOpen(false)}
            className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#111] shadow-lg"
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[82vh] max-w-[94vw] rounded-xl object-contain"
          />
          <p className="mt-3 text-center text-sm text-white/90">{alt}</p>
        </div>
      </dialog>
    </>
  );
}