import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo } from "../components/Logo";

export function Redirect() {
  const navigate = useNavigate();
  const { shortCode } = useParams();

  useEffect(() => {
    if (!shortCode) {
      navigate("*", { replace: true });
    }
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
            O link será aberto automaticamente.
          </p>
        </section>
      </div>
    </div>
  );
}
