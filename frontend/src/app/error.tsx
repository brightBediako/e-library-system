"use client";

import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <main className="bg-surface flex min-h-screen items-center justify-center px-6 py-12">
      <section className="bg-surface-container-lowest subtle-shadow w-full max-w-2xl rounded-3xl p-10">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-error-container">
          <span className="material-symbols-outlined text-error">error</span>
        </div>

        <p className="text-outline mb-3 text-xs font-bold tracking-widest uppercase">System Notice</p>
        <h1 className="text-primary mb-3 text-3xl font-extrabold tracking-tight">Something went wrong</h1>
        <p className="text-on-surface-variant mb-8 max-w-xl text-sm leading-relaxed">
          An unexpected error occurred while loading this page. You can retry now or return to the
          dashboard.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            className="from-primary to-primary-container inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-bold text-white"
            type="button"
            onClick={reset}
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Try again
          </button>
          <Link
            className="text-primary border-primary inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold"
            href="/dashboard"
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            Go to dashboard
          </Link>
        </div>

        {error.digest ? (
          <p className="text-outline mt-8 text-xs">
            Error reference: <span className="font-semibold">{error.digest}</span>
          </p>
        ) : null}
      </section>
    </main>
  );
}
