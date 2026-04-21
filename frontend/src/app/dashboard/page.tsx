"use client";

import { FormEvent, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { BaseLayout } from "@/components/layout/base-layout";
import { createBook, type BookType } from "@/services/books.service";
import { createLibrarian } from "@/services/librarian.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

interface LibrarianRecord {
  id: string;
  fullName: string;
  email: string;
}

interface AddedBookRecord {
  id: string;
  title: string;
  author: string;
  isbn: string;
  bookType: BookType;
  storage: string;
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const [librarianName, setLibrarianName] = useState("");
  const [librarianEmail, setLibrarianEmail] = useState("");
  const [librarianPassword, setLibrarianPassword] = useState("");
  const [librarianFeedback, setLibrarianFeedback] = useState<string | null>(null);
  const [isCreatingLibrarian, setIsCreatingLibrarian] = useState(false);
  const [createdLibrarians, setCreatedLibrarians] = useState<LibrarianRecord[]>([]);

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookType, setBookType] = useState<BookType>("physical");
  const [storageInput, setStorageInput] = useState("");
  const [bookFeedback, setBookFeedback] = useState<string | null>(null);
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [addedBooks, setAddedBooks] = useState<AddedBookRecord[]>([]);

  const getApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
    if (error instanceof AxiosError) {
      const payloadMessage = (error.response?.data as { message?: string } | undefined)?.message;
      return payloadMessage ?? fallbackMessage;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return fallbackMessage;
  };

  const handleCreateLibrarian = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLibrarianFeedback(null);

    if (!librarianName.trim() || !librarianEmail.trim() || !librarianPassword.trim()) {
      setLibrarianFeedback("Please fill in all librarian fields.");
      return;
    }

    setIsCreatingLibrarian(true);

    try {
      const payload = await createLibrarian({
        fullName: librarianName.trim(),
        email: librarianEmail.trim().toLowerCase(),
        password: librarianPassword,
      });

      setCreatedLibrarians((previous) => [
        {
          id: payload.id,
          fullName: payload.fullName,
          email: payload.email,
        },
        ...previous,
      ]);

      setLibrarianFeedback("Librarian created successfully.");
      setLibrarianName("");
      setLibrarianEmail("");
      setLibrarianPassword("");
    } catch (error) {
      setLibrarianFeedback(
        getApiErrorMessage(error, "Unable to create librarian. Ensure backend endpoint is running."),
      );
    } finally {
      setIsCreatingLibrarian(false);
    }
  };

  const handleAddBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookFeedback(null);

    if (!bookTitle.trim() || !bookAuthor.trim() || !bookIsbn.trim() || !storageInput.trim()) {
      setBookFeedback("Please complete all book fields.");
      return;
    }

    setIsCreatingBook(true);

    try {
      const payload = await createBook({
        title: bookTitle.trim(),
        author: bookAuthor.trim(),
        isbn: bookIsbn.trim(),
        bookType,
        storage: storageInput.trim(),
      });

      setAddedBooks((previous) => [
        {
          id: payload.id,
          title: payload.title,
          author: payload.author,
          isbn: payload.isbn,
          bookType: payload.bookType,
          storage: payload.storage,
        },
        ...previous,
      ]);

      setBookFeedback("Book added successfully.");
      setBookTitle("");
      setBookAuthor("");
      setBookIsbn("");
      setBookType("physical");
      setStorageInput("");
    } catch (error) {
      setBookFeedback(
        getApiErrorMessage(error, "Unable to add book. Ensure backend endpoint is running."),
      );
    } finally {
      setIsCreatingBook(false);
    }
  };

  return (
    <BaseLayout
      pageTitle="System Overview"
      pageDescription="Real-time health monitoring, user distribution, and academic resource engagement across the institution."
      role={activeRole}
    >
      {activeRole === "admin" ? (
        <section className="bg-surface-container-lowest subtle-shadow rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="font-headline text-primary text-2xl font-extrabold">
              Create New Librarian
            </h3>
            <p className="text-on-surface-variant text-sm">
              Register librarian credentials for catalog and circulation management.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-3" onSubmit={handleCreateLibrarian}>
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="Full name"
              type="text"
              value={librarianName}
              onChange={(event) => setLibrarianName(event.target.value)}
            />
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="Email address"
              type="email"
              value={librarianEmail}
              onChange={(event) => setLibrarianEmail(event.target.value)}
            />
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="Temporary password"
              type="password"
              value={librarianPassword}
              onChange={(event) => setLibrarianPassword(event.target.value)}
            />
            <div className="md:col-span-3 flex flex-wrap items-center gap-3">
              <button
                className="from-primary to-primary-container rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isCreatingLibrarian}
              >
                {isCreatingLibrarian ? "Creating..." : "Create Librarian"}
              </button>
              {librarianFeedback ? (
                <p
                  className={`text-sm font-semibold ${
                    librarianFeedback.toLowerCase().includes("success") ? "text-primary" : "text-error"
                  }`}
                >
                  {librarianFeedback}
                </p>
              ) : null}
            </div>
          </form>

          {createdLibrarians.length > 0 ? (
            <div className="mt-6 space-y-2">
              <p className="text-on-surface-variant text-xs font-bold tracking-wider uppercase">
                Recently Added Librarians
              </p>
              {createdLibrarians.slice(0, 3).map((librarian) => (
                <div
                  key={librarian.id}
                  className="bg-surface-container-low flex items-center justify-between rounded-xl px-4 py-3"
                >
                  <p className="text-sm font-semibold">{librarian.fullName}</p>
                  <p className="text-on-surface-variant text-xs">{librarian.email}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {activeRole === "librarian" ? (
        <section className="bg-surface-container-lowest subtle-shadow rounded-2xl p-6">
          <div className="mb-5">
            <h3 className="font-headline text-primary text-2xl font-extrabold">Add New Book</h3>
            <p className="text-on-surface-variant text-sm">
              Add either a physical shelf copy or a digital resource file.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleAddBook}>
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="Book title"
              type="text"
              value={bookTitle}
              onChange={(event) => setBookTitle(event.target.value)}
            />
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="Author"
              type="text"
              value={bookAuthor}
              onChange={(event) => setBookAuthor(event.target.value)}
            />
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              placeholder="ISBN"
              type="text"
              value={bookIsbn}
              onChange={(event) => setBookIsbn(event.target.value)}
            />
            <select
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm"
              value={bookType}
              onChange={(event) => setBookType(event.target.value as BookType)}
            >
              <option value="physical">Physical Book</option>
              <option value="digital">Digital Book</option>
            </select>
            <input
              className="bg-surface-container-low rounded-xl border-none px-4 py-3 text-sm md:col-span-2"
              placeholder={
                bookType === "physical"
                  ? "Shelf location (e.g. Aisle 4 - Row B)"
                  : "Digital file URL or path"
              }
              type="text"
              value={storageInput}
              onChange={(event) => setStorageInput(event.target.value)}
            />

            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
              <button
                className="from-primary to-primary-container rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isCreatingBook}
              >
                {isCreatingBook ? "Adding..." : "Add Book"}
              </button>
              {bookFeedback ? (
                <p
                  className={`text-sm font-semibold ${
                    bookFeedback.toLowerCase().includes("success") ? "text-primary" : "text-error"
                  }`}
                >
                  {bookFeedback}
                </p>
              ) : null}
            </div>
          </form>

          {addedBooks.length > 0 ? (
            <div className="mt-6 space-y-2">
              <p className="text-on-surface-variant text-xs font-bold tracking-wider uppercase">
                Recently Added Books
              </p>
              {addedBooks.slice(0, 3).map((book) => (
                <div
                  key={book.id}
                  className="bg-surface-container-low flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-3"
                >
                  <p className="text-sm font-semibold">{book.title}</p>
                  <p className="text-on-surface-variant text-xs uppercase">{book.bookType}</p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <article className="bg-surface-container-lowest hover:bg-surface-bright col-span-1 flex flex-col justify-between rounded-xl p-8 transition-all lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-on-surface-variant mb-1 text-sm font-semibold tracking-wider uppercase">
                Total Users
              </p>
              <h3 className="font-headline text-primary text-5xl font-extrabold">12,842</h3>
            </div>
            <div className="bg-primary-fixed rounded-full p-3">
              <span className="material-symbols-outlined text-primary">group</span>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium">
                <span className="bg-primary h-2 w-2 rounded-full" />
                Students
              </span>
              <span className="font-bold">11,200</span>
            </div>
            <div className="bg-surface-container h-1.5 w-full overflow-hidden rounded-full">
              <div className="bg-primary h-full w-[87%]" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium">
                <span className="bg-on-primary-container h-2 w-2 rounded-full" />
                Faculty
              </span>
              <span className="font-bold">1,642</span>
            </div>
          </div>
        </article>

        <article className="bg-surface-container-low col-span-1 flex flex-col justify-between rounded-xl p-8">
          <div>
            <p className="text-on-surface-variant mb-1 text-sm font-semibold tracking-wider uppercase">
              Active Downloads
            </p>
            <h3 className="font-headline text-primary text-4xl font-extrabold">4,209</h3>
            <p className="mt-2 flex items-center gap-1 text-xs font-bold text-green-600">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12.5% this week
            </p>
          </div>
          <div className="mt-6 flex h-12 items-end gap-1">
            <div className="bg-primary-container/40 h-1/2 w-full rounded-sm" />
            <div className="bg-primary-container/40 h-3/4 w-full rounded-sm" />
            <div className="bg-primary-container/40 h-1/2 w-full rounded-sm" />
            <div className="bg-primary-container h-full w-full rounded-sm" />
          </div>
        </article>

        <article className="bg-primary text-on-primary col-span-1 flex flex-col justify-between rounded-xl p-8">
          <div className="flex justify-between">
            <p className="text-on-primary/70 text-sm font-semibold tracking-wider uppercase">Archive Size</p>
            <span className="material-symbols-outlined opacity-50">cloud_done</span>
          </div>
          <div>
            <h3 className="font-headline text-4xl font-extrabold">8.2 TB</h3>
            <p className="mt-1 text-xs opacity-70">92% of provisioned capacity</p>
          </div>
          <div className="border-on-primary/20 mt-4 border-t pt-4">
            <Link className="flex items-center gap-2 text-xs font-bold hover:underline" href="/resources">
              MANAGE STORAGE <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-primary text-xl font-extrabold">
              Library Visitation Trends
            </h4>
            <div className="flex gap-2">
              <button className="bg-surface-container-high text-primary rounded-lg px-3 py-1 text-xs font-bold">
                Daily
              </button>
              <button className="text-on-surface-variant hover:bg-surface-container rounded-lg px-3 py-1 text-xs font-bold">
                Weekly
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest relative h-[400px] overflow-hidden rounded-2xl p-8">
            <div className="absolute inset-0 flex flex-col justify-between p-8">
              <div className="border-outline-variant/30 text-outline flex justify-between border-b pb-2 text-[10px] font-bold tracking-widest uppercase">
                <span>Session Volume</span>
                <span>Oct 01 - Oct 31</span>
              </div>
              <div className="flex flex-1 items-end justify-between gap-4 pt-8 pb-4">
                <div className="bg-surface-container-low h-[60%] w-full rounded-t-lg" />
                <div className="bg-surface-container-low h-[45%] w-full rounded-t-lg" />
                <div className="bg-surface-container-low h-[75%] w-full rounded-t-lg" />
                <div className="bg-primary-container/20 h-[55%] w-full rounded-t-lg" />
                <div className="bg-primary-container/40 h-[85%] w-full rounded-t-lg" />
                <div className="bg-primary-container/60 h-[40%] w-full rounded-t-lg" />
                <div className="bg-primary h-[95%] w-full rounded-t-lg" />
              </div>
              <div className="text-on-surface-variant flex justify-between px-2 text-[10px] font-medium">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
            <div className="from-surface-container-lowest absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              className="bg-surface-container-low hover:bg-primary group rounded-xl p-6 text-left transition-all"
              href="/dashboard"
            >
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary mb-3 block">
                manage_accounts
              </span>
              <span className="text-primary group-hover:text-on-primary text-sm font-bold">User Roles</span>
            </Link>
            <Link
              className="bg-surface-container-low hover:bg-primary group rounded-xl p-6 text-left transition-all"
              href="/dashboard"
            >
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary mb-3 block">
                tune
              </span>
              <span className="text-primary group-hover:text-on-primary text-sm font-bold">
                System Settings
              </span>
            </Link>
            <Link
              className="bg-surface-container-low hover:bg-primary group rounded-xl p-6 text-left transition-all"
              href="/dashboard"
            >
              <span className="material-symbols-outlined text-primary group-hover:text-on-primary mb-3 block">
                rule_folder
              </span>
              <span className="text-primary group-hover:text-on-primary text-sm font-bold">Audit Trails</span>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-primary text-xl font-extrabold">Activity Logs</h4>
            <button className="text-primary-container text-xs font-bold hover:underline" type="button">
              View All
            </button>
          </div>

          <div className="bg-outline-variant/10 space-y-px overflow-hidden rounded-xl shadow-sm">
            <article className="bg-surface-container-lowest hover:bg-surface-bright flex gap-4 p-5 transition-colors">
              <div className="bg-secondary-container flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">lock_open</span>
              </div>
              <div>
                <p className="text-sm leading-tight font-medium">
                  <span className="font-bold">Faculty Login:</span> Dr. Julian Thorne accessed the
                  Special Collections.
                </p>
                <p className="text-on-surface-variant mt-1 text-[10px] font-medium tracking-tighter uppercase">
                  02:14 PM - IP 192.168.1.45
                </p>
              </div>
            </article>

            <article className="bg-surface-container-lowest hover:bg-surface-bright flex gap-4 p-5 transition-colors">
              <div className="error-container flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-error text-sm">report</span>
              </div>
              <div>
                <p className="text-sm leading-tight font-medium">
                  <span className="font-bold">API Warning:</span> Multiple failed authentication attempts
                  on Portal v2.
                </p>
                <p className="text-on-surface-variant mt-1 text-[10px] font-medium tracking-tighter uppercase">
                  01:58 PM - Critical Alert
                </p>
              </div>
            </article>

            <article className="bg-surface-container-lowest hover:bg-surface-bright flex gap-4 p-5 transition-colors">
              <div className="bg-primary-fixed flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-primary text-sm">upload_file</span>
              </div>
              <div>
                <p className="text-sm leading-tight font-medium">
                  <span className="font-bold">Catalog Update:</span> 124 new digital manuscripts
                  ingested by <span className="underline">Admin_Sarah</span>.
                </p>
                <p className="text-on-surface-variant mt-1 text-[10px] font-medium tracking-tighter uppercase">
                  12:45 PM - System Action
                </p>
              </div>
            </article>

            <article className="bg-surface-container-lowest hover:bg-surface-bright flex gap-4 p-5 transition-colors">
              <div className="bg-secondary-container flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">security</span>
              </div>
              <div>
                <p className="text-sm leading-tight font-medium">
                  <span className="font-bold">Permission Change:</span> Role &apos;Librarian&apos; updated
                  for the Science Dept.
                </p>
                <p className="text-on-surface-variant mt-1 text-[10px] font-medium tracking-tighter uppercase">
                  10:30 AM - Security Event
                </p>
              </div>
            </article>
          </div>

          <article className="from-primary to-primary-container text-on-primary rounded-2xl bg-gradient-to-br p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-green-400" />
              <span className="text-xs font-bold tracking-widest uppercase">System Online</span>
            </div>
            <p className="text-2xl font-bold">99.98% Uptime</p>
            <p className="mt-2 text-sm opacity-70">Next scheduled maintenance in 14 days.</p>
            <button
              className="mt-6 w-full rounded-lg bg-white/10 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20"
              type="button"
            >
              VIEW STATUS REPORT
            </button>
          </article>
        </div>
      </section>
    </BaseLayout>
  );
}
