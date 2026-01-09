import { useEffect, useState } from "react";
import { mockDeleteLink, mockListLinks, type MockLink } from "../lib/mockLinks";
import { EmptyState } from "./EmptyState";

function accessText(n: number) {
  return n === 1 ? "1 acesso" : `${n} acessos`;
}

export function LinksList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<MockLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function load() {
    setIsLoading(true);
    try {
      const data = await mockListLinks();
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  async function handleCopy(link: MockLink) {
    try {
      const url = `${window.location.origin}/${link.shortCode}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      // fallback simples
      window.prompt("Copie o link:", `${window.location.origin}/${link.shortCode}`);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await mockDeleteLink(id);
      await load();
    } finally {
      setDeletingId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="h-14 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-14 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-14 rounded-lg bg-gray-100 animate-pulse" />
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
            <div className="hidden sm:block text-xs text-gray-900/60">
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
