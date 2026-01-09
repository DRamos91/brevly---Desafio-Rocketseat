import { useEffect, useState } from "react";

import { Logo } from "../components/Logo";
import { CreateLinkForm } from "../components/CreateLinkForm";
import { LinksList } from "../components/LinksList";

import { exportLinksCsv, listLinks } from "../lib/linksApi";

export function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [isDownloading, setIsDownloading] = useState(false);
  const [hasLinks, setHasLinks] = useState(false);

  // Descobre se tem links para habilitar/desabilitar o botão CSV
  useEffect(() => {
    async function check() {
      try {
        const links = await listLinks();
        setHasLinks(links.length > 0);
      } catch {
        // se der erro (backend off), desabilita o botão por segurança
        setHasLinks(false);
      }
    }

    check();
  }, [refreshKey]);

  async function handleDownloadCsv() {
    setIsDownloading(true);
    try {
      const { url } = await exportLinksCsv();
      // abre o CSV público do R2/CDN em outra aba
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <header className="mb-10">
          <Logo />
        </header>

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card Novo link */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-gray-950">Novo link</h2>
            <p className="mt-2 text-sm text-gray-900/70">
              Cole aqui a URL que deseja encurtar
            </p>

            <CreateLinkForm onCreated={() => setRefreshKey((k) => k + 1)} />
          </section>

          {/* Card Meus links */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-950">Meus links</h2>

              <button
                type="button"
                onClick={handleDownloadCsv}
                disabled={!hasLinks || isDownloading}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-950 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDownloading ? "Baixando..." : "Baixar CSV"}
              </button>
            </div>

            <LinksList refreshKey={refreshKey} />
          </section>
        </main>
      </div>
    </div>
  );
}