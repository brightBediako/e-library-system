"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "@/services/auth.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

export default function Home() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim() || `${selectedRole}@institution.edu`;
      const response = await login({ email: normalizedEmail, password });
      setAuth(response);
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed. Please try again.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6 sm:p-12">
        <div className="bg-primary/5 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-secondary-container/20 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="z-10 w-full max-w-md">
          <div className="mb-10 text-center">
            <div className="subtle-shadow bg-surface-container-lowest mb-4 inline-flex items-center justify-center rounded-xl p-4">
              <span className="material-symbols-outlined text-primary text-4xl">menu_book</span>
            </div>
            <h1 className="font-headline text-primary mb-2 text-3xl font-extrabold tracking-tighter">
              NMTC
            </h1>
            <p className="font-body text-on-surface-variant text-sm font-semibold tracking-tight uppercase">
              Academic Library Portal
            </p>
          </div>

          <div className="subtle-shadow bg-surface-container-lowest border-outline-variant/10 rounded-xl border p-8 sm:p-10">
            <div className="mb-6">
              <p className="text-on-surface-variant mb-2 ml-1 text-[11px] font-bold tracking-widest uppercase">
                Role Switcher
              </p>
              <div className="flex flex-wrap gap-2">
                {(["admin", "librarian", "student"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    className={`rounded-lg px-3 py-2 text-xs font-bold tracking-wider uppercase transition-colors ${
                      selectedRole === role
                        ? "bg-primary text-white"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                    type="button"
                    onClick={() => {
                      setSelectedRole(role);
                      setEmail(`${role}@institution.edu`);
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label
                  className="text-on-surface-variant ml-1 block text-sm font-bold"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined text-outline absolute top-1/2 left-4 -translate-y-1/2 text-xl">
                    alternate_email
                  </span>
                  <input
                    className="bg-surface-container-low placeholder:text-outline/60 focus:bg-surface-bright focus:ring-primary w-full rounded-xl border-none py-3.5 pr-4 pl-12 transition-all focus:ring-2"
                    id="email"
                    name="email"
                    placeholder="name@institution.edu"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="ml-1 flex items-center justify-between">
                  <label className="text-on-surface-variant block text-sm font-bold" htmlFor="password">
                    Password
                  </label>
                  <a className="text-primary text-xs font-semibold transition-all hover:underline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined text-outline absolute top-1/2 left-4 -translate-y-1/2 text-xl">
                    lock
                  </span>
                  <input
                    className="bg-surface-container-low placeholder:text-outline/60 focus:bg-surface-bright focus:ring-primary w-full rounded-xl border-none py-3.5 pr-4 pl-12 transition-all focus:ring-2"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              {errorMessage ? (
                <p className="text-sm font-semibold text-red-700" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                className="editorial-gradient w-full rounded-xl py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-primary/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="border-outline-variant/30 w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-container-lowest text-outline px-4 font-bold tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              className="bg-surface-container-high text-primary w-full rounded-xl py-3.5 text-sm font-bold transition-all hover:bg-surface-variant"
              type="button"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-xl">account_balance</span>
                Institutional Login
              </span>
            </button>
          </div>

          <footer className="mt-8 space-y-4 text-center">
            <div className="bg-surface-container-low rounded-xl p-3">
              <p className="text-on-surface-variant mb-2 text-[11px] font-bold tracking-widest uppercase">
                Quick Access
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
                <Link className="text-primary hover:underline focus-visible:ring-primary/30 rounded-sm focus-visible:ring-2 focus-visible:outline-none" href="/dashboard">
                  Dashboard
                </Link>
                <span className="bg-outline-variant h-1 w-1 rounded-full" />
                <Link className="text-primary hover:underline focus-visible:ring-primary/30 rounded-sm focus-visible:ring-2 focus-visible:outline-none" href="/books">
                  Books
                </Link>
                <span className="bg-outline-variant h-1 w-1 rounded-full" />
                <Link className="text-primary hover:underline focus-visible:ring-primary/30 rounded-sm focus-visible:ring-2 focus-visible:outline-none" href="/resources">
                  Resources
                </Link>
                <span className="bg-outline-variant h-1 w-1 rounded-full" />
                <Link className="text-primary hover:underline focus-visible:ring-primary/30 rounded-sm focus-visible:ring-2 focus-visible:outline-none" href="/borrowed">
                  Borrowed
                </Link>
              </div>
            </div>

            <p className="text-on-surface-variant text-sm">
              Need help accessing the catalog?{" "}
              <a className="text-primary font-bold hover:underline" href="#">
                Contact Librarian
              </a>
            </p>
            <div className="text-outline flex items-center justify-center gap-6 text-xs font-medium">
              <a className="hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <span className="bg-outline-variant h-1 w-1 rounded-full" />
              <a className="hover:text-primary transition-colors" href="#">
                Terms of Service
              </a>
              <span className="bg-outline-variant h-1 w-1 rounded-full" />
              <a className="hover:text-primary transition-colors" href="#">
                Digital Archive Rights
              </a>
            </div>
          </footer>
        </div>

        <div className="fixed top-0 right-0 hidden h-screen w-1/3 overflow-hidden lg:block">
          <div className="bg-primary-container/20 absolute inset-0 z-10 mix-blend-multiply" />
          <Image
            alt="Interior of a modern academic library with high ceilings and rows of books in soft lighting"
            className="h-full w-full object-cover object-center opacity-90 grayscale-[20%]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpM-QFAvTrUnnjLQ7QDwOJ7uC07uVql4dVflhVvKxNXc2Yf0Yvv29vrF-qqVZlw1tiBwBDQx7wnfqN7PljdhWdvtov7lq3w51-kKraObnOE-_ZQhs9jZvjbFaJiKL5opj73swcPdsULvndaVdywuw6uvHpViWmZMWqREJMF0_0loaVSNX_Egh3JF1qLIw0EIv-XgyEe7bR_s7XNnPJYqAN6AOVxIH6CQqIIi04m-3I9OyGEp0wsHGLtSaIdXIw6b_8bo8cZgOTAg"
            fill
            sizes="33vw"
          />
          <div className="from-primary/80 absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t to-transparent p-12">
            <h2 className="font-headline mb-4 text-4xl leading-tight font-extrabold tracking-tighter text-white">
              Preserving Knowledge,
              <br />
              Curating the Future.
            </h2>
            <div className="bg-on-tertiary-container mb-4 h-1 w-12 rounded-full" />
            <p className="font-body max-w-sm text-lg leading-relaxed text-white/80">
              Access over 2.4 million digital volumes and rare manuscripts from the global
              scholarly network.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
