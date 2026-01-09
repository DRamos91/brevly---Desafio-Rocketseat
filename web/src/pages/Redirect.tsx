import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/Logo";
import { resolveLink, incrementAccess } from "../lib/linksApi";

export function Redirect() {
  const params = useParams();
  const shortCode = params.shortCode; // string | undefined
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortCode) {
      navigate("/", { replace: true });
      return;
    }

    (async () => {
      try {
        const link = await resolveLink(shortCode);
        await incrementAccess(link.id);

        window.location.replace(link.originalUrl);
      } catch {
        // manda pro NotFound (o Route path="*" vai pegar)
        navigate("/404", { replace: true });
      }
    })();
  }, [shortCode, navigate]);

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