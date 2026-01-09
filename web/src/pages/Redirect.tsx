import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import { mockResolveAndIncrement } from "../lib/mockLinks";

export function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      navigate("*", { replace: true });
      return;
    }

    async function run() {
      try {
        const link = await mockResolveAndIncrement(shortCode);
        window.location.replace(link.originalUrl);
      } catch {
        setError(true);
      }
    }

    run();
  }, [shortCode, navigate]);

  useEffect(() => {
    if (error) {
      navigate("*", { replace: true });
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <header className="mb-10">
          <Logo />
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-card text-center">
          <div className="mx-auto mb-4 animate-pulse text-2xl">⏳</div>
          <h1 className="text-lg font-bold text-gray-950">Redirecionando…</h1>
          <p className="mt-2 text-sm text-gray-900/70">
            Você será direcionado automaticamente.
          </p>
        </section>
      </div>
    </div>
  );
}