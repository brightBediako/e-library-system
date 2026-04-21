"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BaseLayout } from "@/components/layout/base-layout";
import { fetchBooks } from "@/services/books.service";
import { fetchBorrows } from "@/services/borrow.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

const fallbackCovers = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAF1y9NSB7GqSfuZdWet-090JejCJc-GM9kGDRrHfeYbbctV9tnmWluSz6tU42yS3ZIm7K1QAQsw-1YslWP1_Xvx4GM3sNR4C5dR2nv8Qx-8LI51gPdoI7iIKmOyAEopNOCD-8t-toUEKtDbip34Vf-6r6LxTFckSvIPswQlqL3sG-lB1ytztXCVcMZOT_HvXpBwXZRgGiE9U75aQSmc6LGH7No6FJrDxvZ5o2PFcj32YViWbQGgnxgSh9DBbEtsajLLu8icgrcMA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBD7SqMwsfPhdNRyXEYTuHy7g3WOE--0g2ZcdZGgfaXNVt-g28KH6nEMgmaEQsQoginUT0QTKLQJ-ossx3feFwvpk58X5Vct8VcKbE1c8tDr75y-GN0JoprBgHtSvmOy40Xk9HMHCmnziRUIEQfTD2qxi7X_WNbJi5KfLYoELn8ie09ENhvvVvYB4ymzxcI3q5orOGx1KFF8ePTgv6PFHm4aprW5nZ2ilm14Jr5wjIOj4jNVskUXW15f_02adEpEoBbVSPWYCw8uA",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDQyJdFrw1vWXulPyk8V0-8pSWmNIV65Tl68vC4L9rcOJTPXL_QxPfknM7dikeNUfqBJmjIho-L_bIluuoJutgSVPop_CaLow1Aq2hfjLj7T3-lFnbiBhdMjOQRoc86EBOOZX9FOZlVrJVmKArerupNcrny2oOIrrYkvioM4dfpxmWwnPpdi6u_6hSH149ME7vggLmnKwJOGVAThwOMdZKLqJMzzRBgwvMmp7voGPoZ1ELJDMYGefDlw03XqkCiIZszyW2-7KwkKg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuACIeEqVCCdgi4DFaa819dlpNYpGaQl8ttv2wY-0SLdQGZjYLbdpNk_dVviMvXtSgOrS87QgZAP0GBR4MuOOS1_RU0KxQxsGjeEoprnm5-11lUJS1Zt61GKT4SOwJXYovNSk0zfFQ5WbQqgXAffFjnaHwawwzaUwA3YySWRzokLl1UhCzjtrJfhA_C4KZKpMI6jBWnDA7w-oGZmFOfIMsfMQ-IQ9EzzXqp5HHQMG7b3gdv88IhVo2jNFeu9WP6DsSPfW45kEyKIsw",
];

const formatDateLabel = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export default function BorrowedPage() {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const todayAtMidnight = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }, []);
  const { data: borrows = [], isLoading: isBorrowLoading, isError: isBorrowError } = useQuery({
    queryKey: ["borrows-list"],
    queryFn: fetchBorrows,
  });
  const { data: books = [] } = useQuery({
    queryKey: ["books-list-for-borrows"],
    queryFn: fetchBooks,
  });

  const borrowedWithStatus = useMemo(() => {
    const bookMap = new Map(books.map((book) => [book.id, book]));

    return borrows.map((borrow, index) => {
      const book = bookMap.get(borrow.bookId);
      const dueDateValue = new Date(borrow.dueDate);
      const isOverdue = borrow.status !== "returned" && dueDateValue < todayAtMidnight;
      const resolvedStatus =
        borrow.status === "returned" ? "Returned" : isOverdue ? "Overdue" : "Active";

      return {
        id: borrow.id,
        title: book?.title ?? "Unknown Title",
        author: book?.author ?? "Unknown Author",
        borrowedOn: formatDateLabel(borrow.borrowedAt),
        dueDate: formatDateLabel(borrow.dueDate),
        dueDateValue,
        coverUrl: fallbackCovers[index % fallbackCovers.length],
        isOverdue,
        status: resolvedStatus,
      };
    });
  }, [books, borrows, todayAtMidnight]);

  const activeLoans = borrowedWithStatus.filter((book) => book.status === "Active").length;
  const overdueLoans = borrowedWithStatus.filter((book) => book.isOverdue).length;
  const nextActiveLoan = borrowedWithStatus
    .filter((book) => book.status === "Active")
    .sort((a, b) => a.dueDateValue.getTime() - b.dueDateValue.getTime())[0];

  return (
    <BaseLayout
      pageTitle="Borrowed Books"
      pageDescription="Maintain your academic momentum with active loans and borrowing history."
      role={activeRole}
    >
      <section className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="text-primary mb-2 text-5xl font-extrabold tracking-tighter">Borrowed Books</h2>
          <p className="text-secondary max-w-lg text-lg leading-relaxed">
            Maintain your academic momentum. Below is a curated list of your active loans and
            historical borrowing activity.
          </p>
        </div>
        <button
          className="from-primary to-primary-container flex items-center gap-2 rounded-xl bg-gradient-to-br px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined">assignment_return</span>
          Return Instructions
        </button>
      </section>

      <section className="mb-12 grid grid-cols-12 gap-6">
        <article className="bg-surface-container-low col-span-12 flex items-center justify-between rounded-2xl p-8 lg:col-span-8">
          <div className="flex gap-12">
            <div>
              <p className="text-on-surface-variant mb-1 text-xs font-bold tracking-widest uppercase">
                Active Loans
              </p>
              <p className="text-primary text-4xl font-extrabold">{activeLoans}</p>
            </div>
            <div>
              <p className="text-on-surface-variant mb-1 text-xs font-bold tracking-widest uppercase">
                Overdue
              </p>
              <p className="text-error text-4xl font-extrabold">{overdueLoans}</p>
            </div>
            <div>
              <p className="text-on-surface-variant mb-1 text-xs font-bold tracking-widest uppercase">
                Credits Used
              </p>
              <p className="text-primary-container text-4xl font-extrabold">84%</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-outline-variant fill-none" cx="18" cy="18" r="16" strokeWidth="2.5" />
                <circle
                  className="stroke-primary fill-none"
                  cx="18"
                  cy="18"
                  r="16"
                  strokeDasharray="84, 100"
                  strokeWidth="2.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-3xl">
                  auto_stories
                </span>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-primary-container text-white col-span-12 flex flex-col justify-between rounded-2xl p-8 lg:col-span-4">
          <p className="text-on-primary-container text-xs font-bold tracking-widest uppercase">
            Next Deadline
          </p>
          <div>
            <p className="mb-1 text-2xl font-bold">{nextActiveLoan?.dueDate ?? "No Active Loan"}</p>
            <p className="text-on-primary-container text-sm">
              {nextActiveLoan?.title ?? "All borrowed books are currently overdue."}
            </p>
          </div>
        </article>
      </section>

      <section className="bg-surface-container-lowest mb-16 rounded-3xl p-2 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-on-surface-variant px-6 py-6 text-left text-xs font-bold tracking-widest uppercase">
                  Book Title &amp; Author
                </th>
                <th className="text-on-surface-variant px-6 py-6 text-left text-xs font-bold tracking-widest uppercase">
                  Borrowed On
                </th>
                <th className="text-on-surface-variant px-6 py-6 text-left text-xs font-bold tracking-widest uppercase">
                  Due Date
                </th>
                <th className="text-on-surface-variant px-6 py-6 text-left text-xs font-bold tracking-widest uppercase">
                  Status
                </th>
                <th className="text-on-surface-variant px-8 py-6 text-right text-xs font-bold tracking-widest uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isBorrowLoading ? (
                <tr>
                  <td className="px-6 py-8 text-sm text-on-surface-variant" colSpan={5}>
                    Loading borrowed books...
                  </td>
                </tr>
              ) : null}
              {isBorrowError ? (
                <tr>
                  <td className="px-6 py-8 text-sm font-semibold text-error" colSpan={5}>
                    Unable to load borrowed records from API. Verify backend is running and database
                    is connected.
                  </td>
                </tr>
              ) : null}
              {!isBorrowLoading && !isBorrowError && borrowedWithStatus.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-sm text-on-surface-variant" colSpan={5}>
                    No borrowed records found yet.
                  </td>
                </tr>
              ) : null}
              {borrowedWithStatus.map((book) => (
                <tr key={book.id} className="group hover:bg-surface-bright transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-surface-container h-16 w-12 shrink-0 overflow-hidden rounded-md">
                        <Image
                          alt={`${book.title} cover`}
                          className="h-full w-full object-cover"
                          height={64}
                          src={book.coverUrl}
                          width={48}
                        />
                      </div>
                      <div>
                        <p className="text-on-surface font-bold">{book.title}</p>
                        <p className="text-secondary text-xs italic">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-on-surface-variant px-6 py-6 text-sm">{book.borrowedOn}</td>
                  <td
                    className={`px-6 py-6 text-sm ${
                      book.isOverdue ? "text-error font-semibold" : "text-on-surface"
                    }`}
                  >
                    {book.dueDate}
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${
                        book.status === "Overdue"
                          ? "bg-error-container text-on-error-container"
                          : book.status === "Returned"
                            ? "bg-surface-container-high text-on-surface"
                            : "bg-secondary-container text-on-secondary-container"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      className="text-primary hover:bg-surface-variant rounded-full p-2 transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-surface-container flex items-center justify-between border-t px-8 py-6">
          <p className="text-on-surface-variant text-sm">
            Showing <span className="text-on-surface">{borrowedWithStatus.length}</span> borrowed
            entr{borrowedWithStatus.length === 1 ? "y" : "ies"}
          </p>
          <div className="flex gap-2">
            <button
              className="bg-surface-container-low text-primary hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white shadow-sm"
              type="button"
            >
              1
            </button>
            <button
              className="bg-surface-container-low text-primary hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-all"
              type="button"
            >
              2
            </button>
            <button
              className="bg-surface-container-low text-primary hover:bg-surface-container flex h-10 w-10 items-center justify-center rounded-lg shadow-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <article className="bg-surface-container-low rounded-3xl p-8">
          <h3 className="text-primary mb-6 text-2xl font-bold">Recent History</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-outline-variant h-2 w-2 rounded-full" />
                <div>
                  <p className="text-on-surface text-sm font-bold">The Wealth of Nations</p>
                  <p className="text-on-surface-variant text-xs italic">Returned Oct 02, 2023</p>
                </div>
              </div>
              <span className="text-on-secondary-container bg-secondary-fixed rounded-full px-3 py-1 text-xs font-bold uppercase">
                Good Condition
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-outline-variant h-2 w-2 rounded-full" />
                <div>
                  <p className="text-on-surface text-sm font-bold">Critique of Pure Reason</p>
                  <p className="text-on-surface-variant text-xs italic">Returned Sept 25, 2023</p>
                </div>
              </div>
              <span className="text-on-secondary-container bg-secondary-fixed rounded-full px-3 py-1 text-xs font-bold uppercase">
                Good Condition
              </span>
            </div>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-3xl">
          <Image
            alt="Library background"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            fill
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN1iFQid88y1QkWqyJebeT5MVwtaisHTxtsR4MR8UHM24UEaNtycL3QV1RfyKFVU5JCw5R3aGWZH2_pO_pyayEq4LfnQMK4YjjaXix18iDgVAP0t4fncpEcMpwIfsmqrCv2Js6JJxYG36VdsnOdlNL9G6QCP688YlOFm7AaZEQFXFckvDRrRpmhliCaI8ClDOAiFqKtEWL-FiK0M28KGpJTqOY1lg_WkldupzigN_AziohhsRxVkG1N76LvB8XZ8jSmN7Rk6x4PQ"
          />
          <div className="bg-primary/40 absolute inset-0 backdrop-blur-[2px]" />
          <div className="relative z-10 flex h-full flex-col justify-end p-10">
            <h3 className="mb-2 text-3xl leading-tight font-extrabold text-white">
              Need a study break?
            </h3>
            <p className="mb-6 max-w-xs text-white/80">
              Explore our latest Digital Archive additions from the Humanities department.
            </p>
            <button className="group inline-flex items-center gap-2 font-bold text-white" type="button">
              Explore Archive
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">
                arrow_right_alt
              </span>
            </button>
          </div>
        </article>
      </section>
    </BaseLayout>
  );
}
