"use client";

import Image from "next/image";
import Link from "next/link";
import { BaseLayout } from "@/components/layout/base-layout";
import { getMockBookById } from "@/features/library/mock-books";
import { useAuthStore, type UserRole } from "@/store/auth-store";

interface BookDetailsPageProps {
  params: { id: string };
}

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const { id } = params;
  const book = getMockBookById(id);

  if (!book) {
    return (
      <BaseLayout
        pageTitle="Book Not Found"
        pageDescription="The selected volume does not exist in the current mock catalog."
        role={activeRole}
      >
        <section className="bg-surface-container-lowest subtle-shadow max-w-2xl rounded-2xl p-8">
          <p className="text-on-surface-variant mb-6 text-sm">
            Verify the URL or return to the library catalog to select another volume.
          </p>
          <Link className="text-primary text-sm font-bold hover:underline" href="/books">
            Back to Catalog
          </Link>
        </section>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout
      pageTitle={book.title}
      pageDescription="Book details view powered by mock catalog data."
      role={activeRole}
    >
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
        <article className="bg-surface-container-lowest subtle-shadow rounded-2xl p-6">
          <div className="bg-surface-container-high relative mx-auto h-[420px] w-[280px] overflow-hidden rounded-xl">
            <Image alt={`${book.title} cover`} className="h-full w-full object-cover" fill src={book.coverUrl} />
          </div>
        </article>

        <article className="bg-surface-container-lowest subtle-shadow rounded-2xl p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-on-surface-variant text-sm font-semibold">{book.author}</p>
              <p className="text-outline text-xs">{book.department}</p>
            </div>
            <span className="bg-surface-container text-on-surface-variant rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
              {book.classification}
            </span>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">ISBN</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">{book.isbn}</dd>
            </div>
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Availability</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">{book.availability}</dd>
            </div>
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Location</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">Central Library - Aisle 4</dd>
            </div>
            <div>
              <dt className="text-outline text-[10px] font-bold tracking-widest uppercase">Shelf Code</dt>
              <dd className="mt-1 text-sm font-semibold text-on-surface">ARC-{book.id.toUpperCase()}</dd>
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
