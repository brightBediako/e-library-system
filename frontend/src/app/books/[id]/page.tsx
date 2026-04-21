"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BaseLayout } from "@/components/layout/base-layout";
import { fetchBookById } from "@/services/books.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

const fallbackCovers = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPlbb7rCF8tkJ_2RUV_zFZJJeSV9BSX373-MXyPzGWrKbKTK4a8K_FvcrpCpL-78xatxOF8J6Im1g16fYZV4wwZUn8Qzw8seYmb3HN-aXUMh3_PMfh4DdfjR_9cEetUw0AjrRWcP7tF-n2amCPrqTcnGfSMRsZ3ZcNXVtMt7h3pZllLEEbMMXKqiVGB-Sdiq7fRXdnIkg_-ka23ZA7kKFbLK8EHnYA0lix5jleFa6tvFTbZQaxxWVLntTCOQBC7KlvNt7E4DWE5g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC26QdB5kBQyEDR4WVop8FvJcMV6zfrIb8Ti1tYzxXb5UTyD_CSQ5bXQ0ejJawBvcUuKF_GHSYt7A7CYQcaWWnWSo3oipgT2HHvFcpg0VoZx3dN59vChNyF5tFUz8AS2-O35ljoSqOihStYQmusCGzxpcXW8n9JIJj9mUAy2uJjeFwX_jlO9v_x5PjAvyYb0TuXLvKqRa6BfyOuNRa1Lhxfwrsk5Wlc5A08gqH2zAumui9xKks_1mvjWpg550HpGPO67OxFxLRXjg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxZvusRqcN1RErFGAX1w3URSdiACkQYPOw5Fjnowc6ed3NAFalGL6SIK2LDLPbWLnB3llMlAe4hwKT4aAtr9ZkVRE8eq-w7Bd1ffonZg-yjpJfBVmpsr4-EpwuK8PD-pRCSWB8BSIizyM1Qg12JrLIM4UeS0Pr3xvUwVgA3ZMc60H7C1xCO4-u-cMlsDqghFGcPfbS1Zh0zox18dEQ4NY-a5Tqbe_3BKgxFp7Sf-6a0mFkWsI17lc_3ScTm2aHpxaRgWK7peOf0w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOfzZ2tbnyl3m1xgxcowL2I_92DtwWKmVTOthvtzv_Irklhlz-eJdv0nBYxULrWmTUdoWAnVjmjX71572EEZ2NrCWZ5viFdYC8z1sxVRb-7b9HmpYVtMJgXhVsC2C7nxQqmJs9_lnEELU5WMQCh0-RUKj0nWWQYdXuL-OBpqviBm4cCPgZnioh0UlfTI2QkxU5t2U-hihUDNOrNaHZNJB2pQ5iNSc62VgFxyB3-RY_1ecLZVjg6leIYbk3UtMIKSu9EF63uommSA",
];

const coverIndexForId = (id: string) =>
  id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % fallbackCovers.length;

interface BookDetailsPageProps {
  params: { id: string };
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const { id } = params;

  const { data: book, isLoading, isError, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
  });

  if (isLoading) {
    return (
      <BaseLayout
        pageTitle="Loading…"
        pageDescription="Fetching volume details from the catalog."
        role={activeRole}
      >
        <p className="text-on-surface-variant text-sm">Loading book details…</p>
      </BaseLayout>
    );
  }

  if (isError || !book) {
    return (
      <BaseLayout
        pageTitle="Book Not Found"
        pageDescription="The selected volume is not in the catalog or could not be loaded."
        role={activeRole}
      >
        <section className="bg-surface-container-lowest subtle-shadow max-w-2xl rounded-2xl p-8">
          <p className="text-on-surface-variant mb-6 text-sm">
            {error instanceof Error ? error.message : "Verify the URL or return to the library catalog."}
          </p>
          <Link className="text-primary text-sm font-bold hover:underline" href="/books">
            Back to Catalog
          </Link>
        </section>
      </BaseLayout>
    );
  }

  const classificationLabel = book.bookType === "digital" ? "Digital" : "Physical";
  const coverUrl = fallbackCovers[coverIndexForId(book.id)];

  return (
    <BaseLayout
      pageTitle={book.title}
      pageDescription="Catalog record from the library API."
      role={activeRole}
    >
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <article className="bg-surface-container-lowest subtle-shadow rounded-2xl p-6">
          <div className="bg-surface-container-high relative mx-auto h-[420px] w-[280px] overflow-hidden rounded-xl">
            <Image alt={`${book.title} cover`} className="h-full w-full object-cover" fill src={coverUrl} />
          </div>
        </article>

        <article className="bg-surface-container-lowest subtle-shadow rounded-2xl p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-on-surface-variant text-sm font-semibold">{book.author}</p>
              <p className="text-outline text-xs">ISBN {book.isbn}</p>
            </div>
            <span className="bg-surface-container text-on-surface-variant rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
              {classificationLabel}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">ISBN</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">{book.isbn}</dd>
            </div>
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Type</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">{classificationLabel}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Storage / location</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">{book.storage}</dd>
            </div>
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Record ID</dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-on-surface">{book.id}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="from-primary to-primary-container rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white"
              type="button"
            >
              Borrow Request
            </button>
            <Link
              className="border-surface-container text-on-surface rounded-xl border px-5 py-3 text-sm font-bold"
              href="/books"
            >
              Back to Catalog
            </Link>
          </div>
        </article>
      </section>
    </BaseLayout>
  );
}
