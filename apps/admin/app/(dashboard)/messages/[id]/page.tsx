
"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";

import {
  deleteContactMessage,
  getContactMessageById,
  updateContactMessageStatus,
  type AdminContactMessage,
  type ContactMessageStatus,
} from "../actions";

const statusConfig: Record<
  ContactMessageStatus,
  { label: string; className: string }
> = {
  UNREAD: {
    label: "Non lu",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  READ: {
    label: "Lu",
    className: "border-neutral-200 bg-neutral-100 text-neutral-600",
  },
  REPLIED: {
    label: "Répondu",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
};

function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export default function MessageDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const messageId = params.id;

  const [message, setMessage] =
    useState<AdminContactMessage | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [pageError, setPageError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadMessage = useCallback(async () => {
    setIsLoading(true);
    setPageError(null);

    try {
      const result = await getContactMessageById(messageId);

      if (!result.success) {
        setPageError(result.error);
        return;
      }

      setMessage(result.message);
    } catch (err) {
      console.error("Erreur lors du chargement du message :", err);
      setPageError("Impossible de charger ce message. Réessaie.");
    } finally {
      setIsLoading(false);
    }
  }, [messageId]);

  useEffect(() => {
    void loadMessage();
  }, [loadMessage]);

  const handleStatusChange = async (
    status: ContactMessageStatus,
  ) => {
    if (!message || isUpdating || isDeleting) return;
    if (message.status === status) return;

    const previousStatus = message.status;

    setIsUpdating(true);
    setError(null);
    setNotice(null);

    // Mise à jour immédiate de l'interface.
    setMessage((current) =>
      current ? { ...current, status } : current,
    );

    try {
      const result = await updateContactMessageStatus(
        message.id,
        status,
      );

      if (!result.success) {
        setMessage((current) =>
          current ? { ...current, status: previousStatus } : current,
        );
        setError(result.error);
        return;
      }

      setMessage(result.message);
      setNotice(
        `Le statut du message est maintenant « ${statusConfig[status].label} ».`,
      );

      router.refresh();
    } catch (err) {
      console.error(
        "Erreur lors de la modification du statut :",
        err,
      );

      setMessage((current) =>
        current ? { ...current, status: previousStatus } : current,
      );
      setError("Impossible de modifier le statut du message.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!message || isDeleting || isUpdating) return;

    const confirmed = window.confirm(
      `Supprimer le message de « ${message.name} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setError(null);
    setNotice(null);
    setIsDeleting(true);

    try {
      const result = await deleteContactMessage(message.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/messages");
      router.refresh();
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du message :",
        err,
      );
      setError("Une erreur est survenue lors de la suppression.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-full bg-[#f7f7f5]">
        <div className="mx-auto flex min-h-[600px] max-w-[1200px] items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3" role="status">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
            <p className="text-sm text-neutral-400">
              Chargement du message...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!message) {
    return (
      <main className="min-h-full bg-[#f7f7f5]">
        <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            Retour aux messages
          </Link>

          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-800"
          >
            {pageError ?? "Ce message est introuvable."}
          </div>
        </div>
      </main>
    );
  }

  const mailSubject = `Re: ${message.subject || "Votre message"}`;
  const mailBody = `Bonjour ${message.name},\n\n\n\nCordialement,`;
  const mailtoHref =
    `mailto:${message.email}?subject=${encodeURIComponent(mailSubject)}` +
    `&body=${encodeURIComponent(mailBody)}`;

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-8">
          {/* EN-TÊTE */}
          <header>
            <Link
              href="/messages"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-950"
            >
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={18}
                strokeWidth={1.8}
              />
              Retour à la boîte de réception
            </Link>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                  <span>Communication</span>
                  <span>/</span>
                  <span>Messages</span>
                  <span>/</span>
                  <span className="text-neutral-700">Détail</span>
                </div>

                <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
                  Message reçu
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
                  Consulte la demande et mets à jour son état de traitement.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={isDeleting || isUpdating}
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 lg:self-auto"
              >
                {isDeleting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
                ) : (
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={17}
                    strokeWidth={1.8}
                  />
                )}
                Supprimer
              </button>
            </div>
          </header>

          {/* NOTIFICATIONS */}
          {error && (
            <MessageBanner
              tone="error"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          {notice && (
            <MessageBanner
              tone="success"
              message={notice}
              onClose={() => setNotice(null)}
            />
          )}

          {/* CONTENU */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* MESSAGE */}
            <div className="min-w-0 space-y-6">
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                        Objet
                      </p>
                      <h2 className="mt-2 break-words text-xl font-semibold tracking-tight text-neutral-950">
                        {message.subject || "Sans objet"}
                      </h2>
                    </div>

                    <StatusBadge status={message.status} />
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex min-w-0 items-center gap-3 border-b border-neutral-100 pb-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600">
                      {getInitials(message.name) || (
                        <HugeiconsIcon icon={UserIcon} size={18} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-950">
                        {message.name}
                      </p>
                      <a
                        href={`mailto:${message.email}`}
                        className="mt-0.5 block break-all text-xs text-neutral-500 underline-offset-4 transition hover:text-neutral-900 hover:underline"
                      >
                        {message.email}
                      </a>
                    </div>

                    <span className="hidden shrink-0 text-[10px] text-neutral-400 sm:block">
                      {formatDateTime(message.createdAt)}
                    </span>
                  </div>

                  <div className="pt-6">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                      Contenu du message
                    </p>
                    <div className="whitespace-pre-wrap break-words text-sm leading-8 text-neutral-700">
                      {message.message}
                    </div>
                  </div>
                </div>
              </section>

              {/* RÉPONSE */}
              <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-200 px-5 py-5 sm:px-6">
                  <h2 className="text-sm font-semibold text-neutral-950">
                    Répondre au contact
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-400">
                    Prépare une réponse dans ton application de messagerie.
                  </p>
                </div>

                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-800">
                      {message.email}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      Objet : {mailSubject}
                    </p>
                  </div>

                  <a
                    href={mailtoHref}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-xs font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
                  >
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={16}
                      strokeWidth={1.8}
                    />
                    Répondre par e-mail
                  </a>
                </div>
              </section>
            </div>

            {/* PANNEAU LATÉRAL */}
            <aside className="space-y-6">
              <div className="space-y-6 lg:sticky lg:top-6">
                {/* STATUT */}
                <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Traitement
                  </p>

                  <h2 className="mt-1 text-sm font-semibold text-neutral-950">
                    Statut du message
                  </h2>

                  <label
                    htmlFor="message-status"
                    className="mb-2 mt-5 block text-xs font-medium text-neutral-600"
                  >
                    État actuel
                  </label>

                  <select
                    id="message-status"
                    value={message.status}
                    disabled={isUpdating || isDeleting}
                    onChange={(event) =>
                      void handleStatusChange(
                        event.target.value as ContactMessageStatus,
                      )
                    }
                    className={`h-10 w-full rounded-xl border px-3 text-xs font-medium outline-none transition focus:ring-2 focus:ring-neutral-200 disabled:cursor-wait disabled:opacity-50 ${statusConfig[message.status].className}`}
                  >
                    <option value="UNREAD">Non lu</option>
                    <option value="READ">Lu</option>
                    <option value="REPLIED">Répondu</option>
                    <option value="ARCHIVED">Archivé</option>
                  </select>

                  <p className="mt-3 text-[11px] leading-5 text-neutral-400">
                    Le changement est enregistré immédiatement.
                  </p>
                </section>

                {/* INFORMATIONS */}
                <section className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
                    Informations
                  </p>

                  <div className="mt-4 space-y-4">
                    <MetaRow
                      label="Expéditeur"
                      value={message.name}
                    />

                    <MetaRow
                      label="E-mail"
                      value={message.email}
                    />

                    <MetaRow
                      label="Réception"
                      value={formatDateTime(message.createdAt)}
                    />

                    <MetaRow
                      label="Dernière mise à jour"
                      value={formatDateTime(message.updatedAt)}
                    />
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============================================================ */
/* STATUT */
/* ============================================================ */

function StatusBadge({
  status,
}: {
  status: ContactMessageStatus;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusConfig[status].className}`}
    >
      {status === "UNREAD" && (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      )}
      {statusConfig[status].label}
    </span>
  );
}

/* ============================================================ */
/* INFORMATIONS */
/* ============================================================ */

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-neutral-400">
        {label}
      </span>
      <span className="break-words text-xs font-medium leading-5 text-neutral-700">
        {value}
      </span>
    </div>
  );
}

/* ============================================================ */
/* NOTIFICATIONS */
/* ============================================================ */

function MessageBanner({
  tone,
  message,
  onClose,
}: {
  tone: "error" | "success";
  message: string;
  onClose: () => void;
}) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-neutral-200 bg-white text-neutral-700"
      }`}
    >
      <div className="flex min-w-0 items-start gap-2">
        {!isError && (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            size={18}
            className="mt-0.5 shrink-0 text-neutral-500"
          />
        )}
        <p className="min-w-0 leading-6">{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className={`shrink-0 text-xs font-medium underline underline-offset-4 ${
          isError ? "text-red-700" : "text-neutral-500"
        }`}
      >
        Fermer
      </button>
    </div>
  );
}