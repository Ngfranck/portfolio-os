
"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Edit02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

import {
  deleteContactMessage,
  getAdminMessages,
  updateContactMessageStatus,
  type AdminContactMessage,
  type ContactMessageStatus,
} from "./actions";

type MessageFilter =
  | "all"
  | "UNREAD"
  | "READ"
  | "REPLIED"
  | "ARCHIVED";

type SortMode = "newest" | "oldest";

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

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
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

export default function MessagesPage() {
  const [messages, setMessages] = useState<
    AdminContactMessage[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );
  const [updatingId, setUpdatingId] = useState<string | null>(
    null,
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MessageFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAdminMessages();

      if (!result.success) {
        setMessages([]);
        setError(result.error);
        return;
      }

      setMessages(result.messages);
    } catch (err) {
      console.error(
        "Erreur lors du chargement des messages :",
        err,
      );

      setError(
        "Impossible de charger les messages. Réessaie.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const stats = useMemo(() => {
    return {
      total: messages.length,
      unread: messages.filter((m) => m.status === "UNREAD").length,
      replied: messages.filter((m) => m.status === "REPLIED").length,
      archived: messages.filter((m) => m.status === "ARCHIVED").length,
    };
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = messages.filter((message) => {
      const matchesSearch =
        !query ||
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        (message.subject ?? "").toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" || message.status === filter;

      return matchesSearch && matchesFilter;
    });

    return [...result].sort((a, b) => {
      const difference =
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime();

      return sortMode === "newest"
        ? difference
        : -difference;
    });
  }, [messages, search, filter, sortMode]);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setSortMode("newest");
  };

  const handleStatusChange = async (
    messageId: string,
    status: ContactMessageStatus,
  ) => {
    if (updatingId || deletingId) return;

    setUpdatingId(messageId);
    setError(null);
    setNotice(null);

    try {
      const result = await updateContactMessageStatus(
        messageId,
        status,
      );

      if (!result.success) {
        setError(result.error);
        return;
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === messageId ? result.message : item,
        ),
      );

      setNotice(
        `Statut du message mis à jour : ${statusConfig[status].label}.`,
      );
    } catch (err) {
      console.error(
        "Erreur lors de la modification du statut :",
        err,
      );

      setError(
        "Impossible de modifier le statut du message.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (
    message: AdminContactMessage,
  ) => {
    const confirmed = window.confirm(
      `Supprimer le message de « ${message.name} » ?\n\nCette action est irréversible.`,
    );

    if (!confirmed) return;

    setDeletingId(message.id);
    setError(null);
    setNotice(null);

    try {
      const result = await deleteContactMessage(message.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setMessages((current) =>
        current.filter((item) => item.id !== message.id),
      );

      setNotice(`Le message de ${message.name} a été supprimé.`);
    } catch (err) {
      console.error(
        "Erreur lors de la suppression du message :",
        err,
      );

      setError(
        "Une erreur est survenue lors de la suppression.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-full bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* EN-TÊTE */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              <span>Communication</span>
              <span>/</span>
              <span className="text-neutral-700">Messages</span>
            </div>

            <h1 className="text-[34px] font-semibold tracking-[-0.035em] text-neutral-950 sm:text-[40px]">
              Messages
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-500 sm:text-[15px]">
              Consulte les demandes reçues, suis leur traitement
              et organise ta boîte de réception.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-neutral-200 bg-white px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-neutral-600">
              {stats.unread} non lu{stats.unread !== 1 ? "s" : ""}
            </span>
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

        {/* STATISTIQUES */}
        <section
          aria-label="Statistiques des messages"
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          <StatCard
            label="Total"
            value={stats.total}
            description="Messages reçus"
            symbol="M"
          />

          <StatCard
            label="Non lus"
            value={stats.unread}
            description="À consulter"
            symbol="!"
            accent
          />

          <StatCard
            label="Répondus"
            value={stats.replied}
            description="Marqués comme répondus"
            symbol="R"
          />

          <StatCard
            label="Archivés"
            value={stats.archived}
            description="Messages archivés"
            symbol="A"
          />
        </section>

        {/* BOÎTE DE RÉCEPTION */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* BARRE D'OUTILS */}
          <div className="border-b border-neutral-200/80 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-neutral-950">
                  Boîte de réception
                </h2>

                <p className="mt-1 text-xs text-neutral-400">
                  {filteredMessages.length} message
                  {filteredMessages.length !== 1 ? "s" : ""}
                  {" "}affiché
                  {filteredMessages.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                <div className="relative min-w-0 sm:min-w-[300px]">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={17}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <label
                    htmlFor="message-search"
                    className="sr-only"
                  >
                    Rechercher un message
                  </label>

                  <input
                    id="message-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Nom, e-mail, sujet..."
                    className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 pl-9 pr-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSortMode((current) =>
                      current === "newest" ? "oldest" : "newest",
                    )
                  }
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
                >
                  {sortMode === "newest"
                    ? "Plus récents"
                    : "Plus anciens"}
                </button>
              </div>
            </div>

            {/* FILTRES */}
            <div className="mt-4 flex flex-wrap gap-2">
              <FilterButton
                active={filter === "all"}
                onClick={() => setFilter("all")}
              >
                Tous
              </FilterButton>

              <FilterButton
                active={filter === "UNREAD"}
                onClick={() => setFilter("UNREAD")}
              >
                Non lus
                {stats.unread > 0 && (
                  <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                    {stats.unread}
                  </span>
                )}
              </FilterButton>

              <FilterButton
                active={filter === "READ"}
                onClick={() => setFilter("READ")}
              >
                Lus
              </FilterButton>

              <FilterButton
                active={filter === "REPLIED"}
                onClick={() => setFilter("REPLIED")}
              >
                Répondus
              </FilterButton>

              <FilterButton
                active={filter === "ARCHIVED"}
                onClick={() => setFilter("ARCHIVED")}
              >
                Archivés
              </FilterButton>

              {(search || filter !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-1 px-2 text-xs font-medium text-neutral-400 underline underline-offset-4 transition hover:text-neutral-700"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* CHARGEMENT */}
          {isLoading && <LoadingState />}

          {/* ÉTAT VIDE */}
          {!isLoading && filteredMessages.length === 0 && (
            <EmptyState
              hasMessages={messages.length > 0}
              onReset={resetFilters}
            />
          )}

          {/* TABLEAU DESKTOP */}
          {!isLoading && filteredMessages.length > 0 && (
            <div className="hidden md:block">
              <div className="grid grid-cols-[minmax(190px,1fr)_minmax(220px,1.2fr)_130px_155px_auto] items-center gap-4 border-b border-neutral-100 bg-neutral-50/70 px-5 py-3">
                <HeaderCell>Expéditeur</HeaderCell>
                <HeaderCell>Message</HeaderCell>
                <HeaderCell>Réception</HeaderCell>
                <HeaderCell>Statut</HeaderCell>
                <HeaderCell align="right">Actions</HeaderCell>
              </div>

              <div className="divide-y divide-neutral-100">
                {filteredMessages.map((message) => (
                  <MessageRow
                    key={message.id}
                    message={message}
                    updating={updatingId === message.id}
                    deleting={deletingId === message.id}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CARTES MOBILE */}
          {!isLoading && filteredMessages.length > 0 && (
            <div className="divide-y divide-neutral-100 md:hidden">
              {filteredMessages.map((message) => (
                <MessageMobileCard
                  key={message.id}
                  message={message}
                  updating={updatingId === message.id}
                  deleting={deletingId === message.id}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ============================================================ */
/* STATISTIQUE */
/* ============================================================ */

function StatCard({
  label,
  value,
  description,
  symbol,
  accent = false,
}: {
  label: string;
  value: number;
  description: string;
  symbol: string;
  accent?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 sm:p-5">
      {accent && (
        <span className="absolute left-0 top-0 h-full w-[2px] bg-[#E30613]" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-neutral-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-[28px]">
            {value.toLocaleString("fr-FR")}
          </p>
        </div>

        <div
          className={
            accent
              ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDE8EA] text-xs font-semibold text-[#E30613]"
              : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xs font-semibold text-neutral-500"
          }
        >
          {symbol}
        </div>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        {description}
      </p>
    </div>
  );
}

/* ============================================================ */
/* FILTRE */
/* ============================================================ */

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-lg bg-neutral-950 px-3 py-2 text-xs font-medium text-white"
          : "rounded-lg bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-500 transition hover:bg-neutral-200 hover:text-neutral-700"
      }
    >
      {children}
    </button>
  );
}

/* ============================================================ */
/* EN-TÊTE DE COLONNE */
/* ============================================================ */

function HeaderCell({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <div
      className={`text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {children}
    </div>
  );
}

/* ============================================================ */
/* BADGE DE STATUT */
/* ============================================================ */

function StatusBadge({
  status,
}: {
  status: ContactMessageStatus;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${statusConfig[status].className}`}
    >
      {status === "UNREAD" && (
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      )}
      {statusConfig[status].label}
    </span>
  );
}

/* ============================================================ */
/* SÉLECTEUR DE STATUT */
/* ============================================================ */

function StatusSelect({
  message,
  disabled,
  onChange,
}: {
  message: AdminContactMessage;
  disabled: boolean;
  onChange: (
    messageId: string,
    status: ContactMessageStatus,
  ) => void;
}) {
  return (
    <select
      aria-label={`Statut du message de ${message.name}`}
      value={message.status}
      disabled={disabled}
      onChange={(event) =>
        onChange(
          message.id,
          event.target.value as ContactMessageStatus,
        )
      }
      className={`h-9 max-w-full rounded-lg border px-2 text-[11px] font-medium outline-none transition focus:ring-2 focus:ring-neutral-200 disabled:cursor-wait disabled:opacity-50 ${statusConfig[message.status].className}`}
    >
      <option value="UNREAD">Non lu</option>
      <option value="READ">Lu</option>
      <option value="REPLIED">Répondu</option>
      <option value="ARCHIVED">Archivé</option>
    </select>
  );
}

/* ============================================================ */
/* LIGNE DESKTOP */
/* ============================================================ */

function MessageRow({
  message,
  updating,
  deleting,
  onStatusChange,
  onDelete,
}: {
  message: AdminContactMessage;
  updating: boolean;
  deleting: boolean;
  onStatusChange: (
    messageId: string,
    status: ContactMessageStatus,
  ) => void;
  onDelete: (message: AdminContactMessage) => void;
}) {
  const unread = message.status === "UNREAD";

  return (
    <div
      className={`grid grid-cols-[minmax(190px,1fr)_minmax(220px,1.2fr)_130px_155px_auto] items-center gap-4 px-5 py-4 transition hover:bg-neutral-50/60 ${
        unread ? "bg-blue-50/20" : ""
      }`}
    >
      {/* EXPÉDITEUR */}
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
            unread
              ? "bg-blue-100 text-blue-700"
              : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {getInitials(message.name) || "?"}
        </div>

        <div className="min-w-0">
          <Link
            href={`/messages/${message.id}`}
            className={`block truncate text-sm hover:underline hover:underline-offset-4 ${
              unread
                ? "font-bold text-neutral-950"
                : "font-semibold text-neutral-800"
            }`}
          >
            {message.name}
          </Link>

          <p className="mt-0.5 truncate text-[11px] text-neutral-400">
            {message.email}
          </p>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="min-w-0">
        <p
          className={`truncate text-xs ${
            unread
              ? "font-semibold text-neutral-800"
              : "font-medium text-neutral-600"
          }`}
        >
          {message.subject || "Sans objet"}
        </p>

        <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-neutral-400">
          {message.message}
        </p>
      </div>

      {/* DATE */}
      <div>
        <p className="text-xs text-neutral-600">
          {formatDate(message.createdAt)}
        </p>
        <p className="mt-1 text-[10px] text-neutral-400">
          {new Intl.DateTimeFormat("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(message.createdAt))}
        </p>
      </div>

      {/* STATUT */}
      <div>
        <StatusSelect
          message={message}
          disabled={updating || deleting}
          onChange={onStatusChange}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-1">
        <Link
          href={`/messages/${message.id}`}
          title="Consulter"
          aria-label={`Consulter le message de ${message.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-950"
        >
          <HugeiconsIcon
            icon={Edit02Icon}
            size={17}
            strokeWidth={1.8}
          />
        </Link>

        <button
          type="button"
          onClick={() => void onDelete(message)}
          disabled={deleting || updating}
          title="Supprimer"
          aria-label={`Supprimer le message de ${message.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {deleting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          ) : (
            <HugeiconsIcon
              icon={Delete02Icon}
              size={17}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>
    </div>
  );
}

/* ============================================================ */
/* CARTE MOBILE */
/* ============================================================ */

function MessageMobileCard({
  message,
  updating,
  deleting,
  onStatusChange,
  onDelete,
}: {
  message: AdminContactMessage;
  updating: boolean;
  deleting: boolean;
  onStatusChange: (
    messageId: string,
    status: ContactMessageStatus,
  ) => void;
  onDelete: (message: AdminContactMessage) => void;
}) {
  const unread = message.status === "UNREAD";

  return (
    <article
      className={`space-y-4 p-4 ${
        unread ? "bg-blue-50/20" : ""
      }`}
    >
      {/* IDENTITÉ */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              unread
                ? "bg-blue-100 text-blue-700"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {getInitials(message.name) || "?"}
          </div>

          <div className="min-w-0">
            <Link
              href={`/messages/${message.id}`}
              className={`block truncate text-sm text-neutral-950 ${
                unread ? "font-bold" : "font-semibold"
              }`}
            >
              {message.name}
            </Link>
            <p className="mt-0.5 break-all text-[11px] text-neutral-400">
              {message.email}
            </p>
          </div>
        </div>

        {unread && (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
        )}
      </div>

      {/* CONTENU */}
      <div className="rounded-xl bg-neutral-50 p-3">
        <p className="text-xs font-semibold text-neutral-800">
          {message.subject || "Sans objet"}
        </p>
        <p className="mt-2 line-clamp-3 text-xs leading-6 text-neutral-500">
          {message.message}
        </p>
      </div>

      {/* MÉTADONNÉES */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusBadge status={message.status} />
        <span className="text-[10px] text-neutral-400">
          {formatDateTime(message.createdAt)}
        </span>
      </div>

      {/* STATUT */}
      <div>
        <label
          htmlFor={`message-status-${message.id}`}
          className="mb-2 block text-[10px] font-medium text-neutral-500"
        >
          Modifier le statut
        </label>
        <select
          id={`message-status-${message.id}`}
          value={message.status}
          disabled={updating || deleting}
          onChange={(event) =>
            onStatusChange(
              message.id,
              event.target.value as ContactMessageStatus,
            )
          }
          className={`h-10 w-full rounded-lg border px-3 text-xs font-medium outline-none focus:ring-2 focus:ring-neutral-200 disabled:cursor-wait disabled:opacity-50 ${statusConfig[message.status].className}`}
        >
          <option value="UNREAD">Non lu</option>
          <option value="READ">Lu</option>
          <option value="REPLIED">Répondu</option>
          <option value="ARCHIVED">Archivé</option>
        </select>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 border-t border-neutral-100 pt-3">
        <Link
          href={`/messages/${message.id}`}
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          <HugeiconsIcon
            icon={Edit02Icon}
            size={16}
            strokeWidth={1.8}
          />
          Consulter
        </Link>

        <button
          type="button"
          onClick={() => void onDelete(message)}
          disabled={deleting || updating}
          aria-label={`Supprimer le message de ${message.name}`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {deleting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          ) : (
            <HugeiconsIcon
              icon={Delete02Icon}
              size={17}
              strokeWidth={1.8}
            />
          )}
        </button>
      </div>
    </article>
  );
}

/* ============================================================ */
/* ÉTAT VIDE */
/* ============================================================ */

function EmptyState({
  hasMessages,
  onReset,
}: {
  hasMessages: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <span className="text-2xl font-semibold">M</span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-neutral-950">
        {hasMessages
          ? "Aucun message ne correspond"
          : "Ta boîte de réception est vide"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
        {hasMessages
          ? "Modifie ta recherche ou tes filtres pour retrouver un message."
          : "Les messages envoyés depuis le formulaire de contact apparaîtront ici."}
      </p>

      {hasMessages && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 text-xs font-medium text-neutral-800 underline underline-offset-4"
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}

/* ============================================================ */
/* CHARGEMENT */
/* ============================================================ */

function LoadingState() {
  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-3"
      role="status"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
      <p className="text-sm text-neutral-400">
        Chargement des messages...
      </p>
    </div>
  );
}

/* ============================================================ */
/* MESSAGE BANNER */
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
      <p className="leading-6">{message}</p>
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