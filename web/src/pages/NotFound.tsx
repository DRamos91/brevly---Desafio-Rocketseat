import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

export function NotFound() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto w-full max-w-xl px-4 py-10">
        <header className="mb-10">
          <Logo />
        </header>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-card text-center">
          <div className="mx-auto mb-4 text-4xl">🔎</div>
          <h1 className="text-lg font-bold text-gray-950">Link não encontrado</h1>
          <p className="mt-2 text-sm text-gray-900/70">
            O link que você tentou acessar não existe ou foi removido.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue px-4 py-3 text-sm font-semibold text-white hover:bg-blue-dark"
          >
            Voltar para o início
          </Link>
        </section>
      </div>
    </div>
  );
}
