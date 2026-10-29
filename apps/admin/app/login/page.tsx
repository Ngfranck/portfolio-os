import type { Metadata } from "next";

import { authenticateAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Connexion",
  robots: {
    index: false,
    follow: false,
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-5 py-12">
      <section className="w-full max-w-[420px] rounded-3xl border border-[#e5e5e2] bg-white p-7 shadow-[0_24px_80px_rgba(17,17,17,0.07)] sm:p-9">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111] text-sm font-semibold text-white">
          G
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#E30613]">
          Espace sécurisé
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[#111]">
          Connexion à l’administration
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#666]">
          Connectez-vous pour gérer le portfolio et la galerie.
        </p>

        <form action={authenticateAdmin} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-[#222]"
            >
              Adresse e-mail
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              maxLength={254}
              className="min-h-12 w-full rounded-xl border border-[#dededb] bg-white px-4 text-sm outline-none transition focus:border-[#111] focus:ring-2 focus:ring-[#E30613]/20"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-[#222]"
            >
              Mot de passe
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={1024}
              className="min-h-12 w-full rounded-xl border border-[#dededb] bg-white px-4 text-sm outline-none transition focus:border-[#111] focus:ring-2 focus:ring-[#E30613]/20"
            />
          </div>

          {error === "invalid" && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              Identifiants incorrects. Vérifiez votre adresse e-mail et votre
              mot de passe.
            </p>
          )}

          <button
            type="submit"
            className="min-h-12 w-full rounded-xl bg-[#111] px-5 text-sm font-medium text-white transition hover:bg-[#292929] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#999]">
          Gonar.ui · Administration
        </p>
      </section>
    </main>
  );
}
