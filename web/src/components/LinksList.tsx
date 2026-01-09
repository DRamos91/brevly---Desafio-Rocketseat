import { useEffect, useState } from "react";
import { EmptyState } from "./EmptyState";
import { deleteLink, listLinks } from "../lib/linksApi";

function accessText(n: number) {
  return n === 1 ? "1 acesso" : `${n} acessos`;
}

type LinkItem = {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
};

export function LinksList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    try {
      const data = await listLinks();
      setItems(
        data.map((l) => ({
          id: l.id,
          originalUrl: l.originalUrl,
          shortCode: l.shortCode,
          accessCount: l.accessCount ?? 0,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // Recarrega quando você volta do redirect (contador atualizado)
  useEffect(() => {
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCopy(link: LinkItem) {
    try {
      const url = `${window.location.origin}/${link.shortCode}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      window.prompt(
        "Copie o link:",
        `${window.location.origin}/${link.shortCode}`
      );
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteLink(id);
      await load();
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
        <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="mt-6 space-y-3">
      {items.map((link) => (
        <li
          key={link.id}
          className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
        >
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-blue">
              {window.location.origin}/{link.shortCode}
            </div>
            <div className="truncate text-xs text-gray-900/60">
              {link.originalUrl}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-900/60">
              {accessText(link.accessCount)}
            </div>

            {/* Copiar */}
            <button
              type="button"
              onClick={() => handleCopy(link)}
              className="h-9 w-9 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 disabled:opacity-50"
              aria-label="Copiar link"
              disabled={deletingId === link.id}
              title={copiedId === link.id ? "Copiado!" : "Copiar"}
            >
              {copiedId === link.id ? "✅" : "📋"}
            </button>

            {/* Deletar */}
            <button
              type="button"
              onClick={() => handleDelete(link.id)}
              className="h-9 w-9 rounded-lg bg-gray-100 text-sm hover:bg-gray-200 disabled:opacity-50"
              aria-label="Deletar link"
              disabled={deletingId === link.id}
              title="Deletar"
            >
              {deletingId === link.id ? "⏳" : "🗑️"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}