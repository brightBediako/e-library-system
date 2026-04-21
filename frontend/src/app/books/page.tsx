"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { BaseLayout } from "@/components/layout/base-layout";
import { fetchBooks } from "@/services/books.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

type BookAvailability = "Available" | "On Loan" | "Reserved";

interface CatalogBookView {
  id: string;
  title: string;
  isbn: string;
  author: string;
  department: string;
  classification: string;
  availability: BookAvailability;
  coverUrl: string;
}

const availabilityStyles: Record<BookAvailability, { dot: string; text: string }> = {
  Available: { dot: "bg-emerald-500", text: "text-emerald-700" },
  "On Loan": { dot: "bg-amber-400", text: "text-amber-700" },
  Reserved: { dot: "bg-amber-400", text: "text-amber-700" },
};

const fallbackCovers = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPlbb7rCF8tkJ_2RUV_zFZJJeSV9BSX373-MXyPzGWrKbKTK4a8K_FvcrpCpL-78xatxOF8J6Im1g16fYZV4wwZUn8Qzw8seYmb3HN-aXUMh3_PMfh4DdfjR_9cEetUw0AjrRWcP7tF-n2amCPrqTcnGfSMRsZ3ZcNXVtMt7h3pZllLEEbMMXKqiVGB-Sdiq7fRXdnIkg_-ka23ZA7kKFbLK8EHnYA0lix5jleFa6tvFTbZQaxxWVLntTCOQBC7KlvNt7E4DWE5g",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC26QdB5kBQyEDR4WVop8FvJcMV6zfrIb8Ti1tYzxXb5UTyD_CSQ5bXQ0ejJawBvcUuKF_GHSYt7A7CYQcaWWnWSo3oipgT2HHvFcpg0VoZx3dN59vChNyF5tFUz8AS2-O35ljoSqOihStYQmusCGzxpcXW8n9JIJj9mUAy2uJjeFwX_jlO9v_x5PjAvyYb0TuXLvKqRa6BfyOuNRa1Lhxfwrsk5Wlc5A08gqH2zAumui9xKks_1mvjWpg550HpGPO67OxFxLRXjg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxZvusRqcN1RErFGAX1w3URSdiACkQYPOw5Fjnowc6ed3NAFalGL6SIK2LDLPbWLnB3llMlAe4hwKT4aAtr9ZkVRE8eq-w7Bd1ffonZg-yjpJfBVmpsr4-EpwuK8PD-pRCSWB8BSIizyM1Qg12JrLIM4UeS0Pr3xvUwVgA3ZMc60H7C1xCO4-u-cMlsDqghFGcPfbS1Zh0zox18dEQ4NY-a5Tqbe_3BKgxFp7Sf-6a0mFkWsI17lc_3ScTm2aHpxaRgWK7peOf0w",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCOfzZ2tbnyl3m1xgxcowL2I_92DtwWKmVTOthvtzv_Irklhlz-eJdv0nBYxULrWmTUdoWAnVjmjX71572EEZ2NrCWZ5viFdYC8z1sxVRb-7b9HmpYVtMJgXhVsC2C7nxQqmJs9_lnEELU5WMQCh0-RUKj0nWWQYdXuL-OBpqviBm4cCPgZnioh0UlfTI2QkxU5t2U-hihUDNOrNaHZNJB2pQ5iNSc62VgFxyB3-RY_1ecLZVjg6leIYbk3UtMIKSu9EF63uommSA",
];

export default function BooksPage() {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Disciplines");
  const [authorFilter, setAuthorFilter] = useState("Select Author");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const { data: apiBooks = [], isLoading, isError } = useQuery({
    queryKey: ["books-list"],
    queryFn: fetchBooks,
  });

  const books = useMemo<CatalogBookView[]>(
    () =>
      apiBooks.map((book, index) => ({
        id: book.id,
        title: book.title,
        isbn: book.isbn,
        author: book.author,
        department: "General Collection",
        classification: book.bookType === "digital" ? "Digital" : "Physical",
        availability: "Available",
        coverUrl: fallbackCovers[index % fallbackCovers.length],
      })),
    [apiBooks],
  );

  const filteredBooks = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        normalizedTerm.length === 0 ||
        book.title.toLowerCase().includes(normalizedTerm) ||
        book.author.toLowerCase().includes(normalizedTerm) ||
        book.isbn.toLowerCase().includes(normalizedTerm);

      const matchesCourse =
        courseFilter === "All Disciplines" || book.department === courseFilter;

      const matchesAuthor = authorFilter === "Select Author" || book.author === authorFilter;

      const matchesCategory =
        categoryFilter === "All Categories" || book.classification === categoryFilter;

      return matchesSearch && matchesCourse && matchesAuthor && matchesCategory;
    });
  }, [authorFilter, books, categoryFilter, courseFilter, searchTerm]);

  return (
    <BaseLayout
      pageTitle="Main Library Volumes"
      pageDescription="Central collections catalog presented as an editorial table view with mock entries."
      role={activeRole}
    >
      <section className="mb-6 max-w-lg">
        <div className="relative">
          <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            search
          </span>
          <input
            className="bg-surface-container-low focus:bg-surface-bright focus:ring-primary w-full rounded-full border-none py-3 pr-4 pl-12 text-sm transition-all focus:ring-2"
            placeholder="Search by title, author, or ISBN..."
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </section>

      <section className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="text-primary mb-2 block text-xs font-bold tracking-widest uppercase">
            Central Collections
          </span>
          <h1 className="text-primary max-w-2xl text-4xl leading-tight font-extrabold tracking-tight md:text-5xl">
            Main Library <span className="text-outline-variant font-light italic">Volumes</span>
          </h1>
        </div>
        <button
          className="from-primary to-primary-container inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
          type="button"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Request New Acquisition</span>
        </button>
      </section>

      <section className="bg-surface-container-low mb-8 flex flex-wrap items-center gap-4 rounded-2xl p-6">
        <div className="flex min-w-[180px] flex-1 flex-wrap gap-4">
          <div className="relative min-w-[180px]">
            <label className="text-outline mb-1.5 ml-1 block text-[10px] font-bold tracking-widest uppercase">
              Academic Course
            </label>
            <select
              className="w-full appearance-none rounded-xl border-none bg-white px-4 py-2 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/10"
              value={courseFilter}
              onChange={(event) => setCourseFilter(event.target.value)}
            >
              <option>All Disciplines</option>
              {Array.from(new Set(books.map((book) => book.department))).map((department) => (
                <option key={department}>{department}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute right-3 bottom-2.5 text-lg">
              expand_more
            </span>
          </div>

          <div className="relative min-w-[180px]">
            <label className="text-outline mb-1.5 ml-1 block text-[10px] font-bold tracking-widest uppercase">
              Lead Author
            </label>
            <select
              className="w-full appearance-none rounded-xl border-none bg-white px-4 py-2 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/10"
              value={authorFilter}
              onChange={(event) => setAuthorFilter(event.target.value)}
            >
              <option>Select Author</option>
              {Array.from(new Set(books.map((book) => book.author))).map((author) => (
                <option key={author}>{author}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute right-3 bottom-2.5 text-lg">
              expand_more
            </span>
          </div>

          <div className="relative min-w-[180px]">
            <label className="text-outline mb-1.5 ml-1 block text-[10px] font-bold tracking-widest uppercase">
              Genre Category
            </label>
            <select
              className="w-full appearance-none rounded-xl border-none bg-white px-4 py-2 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary/10"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option>All Categories</option>
              {Array.from(new Set(books.map((book) => book.classification))).map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute right-3 bottom-2.5 text-lg">
              expand_more
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <button className="rounded-xl bg-white p-2.5 text-primary transition-colors hover:bg-primary/5" type="button">
            <span className="material-symbols-outlined">tune</span>
          </button>
          <button className="rounded-xl bg-white p-2.5 text-primary transition-colors hover:bg-primary/5" type="button">
            <span className="material-symbols-outlined">view_list</span>
          </button>
          <button
            className="rounded-xl bg-primary/5 p-2.5 text-primary transition-colors hover:bg-primary/10"
            type="button"
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </section>

      <section className="bg-surface-container-lowest overflow-hidden rounded-3xl shadow-[0px_12px_32px_rgba(25,28,29,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="text-outline px-8 py-5 text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Volume Title
                </th>
                <th className="text-outline px-6 py-5 text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Author / Editor
                </th>
                <th className="text-outline px-6 py-5 text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Classification
                </th>
                <th className="text-outline px-6 py-5 text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Availability
                </th>
                <th className="text-outline px-8 py-5 text-right text-[10px] font-extrabold tracking-[0.2em] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="px-8 py-10 text-sm text-on-surface-variant" colSpan={5}>
                    Loading books...
                  </td>
                </tr>
              ) : null}
              {isError ? (
                <tr>
                  <td className="px-8 py-10 text-sm font-semibold text-error" colSpan={5}>
                    Unable to load books from API. Verify backend is running and database is connected.
                  </td>
                </tr>
              ) : null}
              {!isLoading && !isError && filteredBooks.length === 0 ? (
                <tr>
                  <td className="px-8 py-10 text-sm text-on-surface-variant" colSpan={5}>
                    No books matched your filters.
                  </td>
                </tr>
              ) : null}
              {filteredBooks.map((book) => {
                const availabilityStyle = availabilityStyles[book.availability];

                return (
                  <tr key={book.id} className="group hover:bg-surface-bright transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="bg-surface-container-high relative h-14 w-10 shrink-0 overflow-hidden rounded-md">
                          <div className="from-primary/10 to-transparent absolute inset-0 bg-gradient-to-tr" />
                          <Image
                            alt={`${book.title} cover`}
                            className="h-full w-full object-cover"
                            src={book.coverUrl}
                            width={40}
                            height={56}
                          />
                        </div>
                        <div>
                          <p className="font-headline text-primary group-hover:text-primary-container text-base font-bold transition-colors">
                            {book.title}
                          </p>
                          <p className="text-on-surface-variant text-xs font-medium">ISBN: {book.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-semibold text-on-surface">{book.author}</p>
                      <p className="text-outline text-[11px] font-medium">{book.department}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="bg-surface-container text-on-surface-variant rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
                        {book.classification}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`${availabilityStyle.dot} h-2 w-2 rounded-full`} />
                        <span className={`${availabilityStyle.text} text-sm font-semibold`}>
                          {book.availability}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link
                        className="text-primary text-sm font-bold transition-all hover:underline"
                        href={`/books/${book.id}`}
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-surface-container-low flex items-center justify-between border-t p-8">
          <p className="text-outline text-xs font-medium">
            Showing <span className="text-on-surface">{filteredBooks.length}</span> of{" "}
            <span className="text-on-surface">1,248</span> volumes
          </p>
          <div className="flex items-center gap-2">
            <button
              className="bg-surface-container text-on-surface hover:bg-surface-container-high flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              type="button"
            >
              1
            </button>
            <button
              className="border-surface-container text-on-surface hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-sm font-medium transition-colors"
              type="button"
            >
              2
            </button>
            <button
              className="border-surface-container text-on-surface hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-sm font-medium transition-colors"
              type="button"
            >
              3
            </button>
            <button
              className="bg-surface-container text-on-surface hover:bg-surface-container-high flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
