"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { AUTH_COOKIE_NAME, roleToHomePath, type AppRole } from "@/lib/auth/session";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<AppRole | "">("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [fromPath, setFromPath] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  const canSubmit = useMemo(() => Boolean(role), [role]);
  const redirectMessage = useMemo(() => {
    if (reason === "auth-required") {
      return "Please sign in to continue.";
    }
    if (reason === "role-mismatch") {
      return "Your current role cannot access that page. Sign in with another role to continue.";
    }
    return null;
  }, [reason]);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    const params = new URLSearchParams(globalThis.window.location.search);
    setReason(params.get("reason"));
    setFromPath(params.get("from"));
    setCurrentRole(params.get("role"));
  }, []);

  useEffect(() => {
    if (reason) return;
    if (typeof document === "undefined") return;

    const roleCookieValue = document.cookie
      .split("; ")
      .find((item) => item.startsWith(`${AUTH_COOKIE_NAME}=`))
      ?.split("=")[1] as AppRole | undefined;

    if (roleCookieValue && roleCookieValue in roleToHomePath) {
      router.replace(roleToHomePath[roleCookieValue]);
    }
  }, [reason, router]);

  function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!role) return;
    document.cookie = `${AUTH_COOKIE_NAME}=${role}; path=/; max-age=86400; samesite=lax`;
    router.push(roleToHomePath[role] ?? "/search");
  }

  const fieldClass =
    "w-full rounded-lg border-0 bg-[#f0f2f5] py-3 pl-11 pr-3 text-sm font-medium text-on-surface shadow-none outline-none transition-shadow placeholder:text-[#6b7280] focus:ring-2 focus:ring-primary/25 focus:ring-offset-0 sm:pl-12 sm:pr-4";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f4f7f9] px-4 py-12 sm:px-6 sm:py-16">
      {/* Background: soft circle + tilted texture panel (match login.png) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[10%] h-56 w-56 rounded-full bg-[#e8ecf1]/90 blur-[1px] sm:h-64 sm:w-64 lg:h-72 lg:w-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-[-8%] h-[220px] w-[min(92vw,420px)] rotate-[11deg] overflow-hidden rounded-[28px] bg-[#e4e9ef]/75 sm:h-[280px] sm:w-[480px] lg:bottom-[-5%] lg:h-[320px] lg:w-[560px]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            125deg,
            rgba(0, 32, 69, 0.07) 0px,
            rgba(0, 32, 69, 0.07) 1px,
            transparent 1px,
            transparent 11px
          )`,
        }}
      />

      <div className="relative z-10 w-full max-w-[420px]">
        <header className="mb-9 text-center sm:mb-10">
          <div className="mx-auto mb-5 inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl bg-primary shadow-[0_18px_36px_-20px_rgba(0,32,69,0.45)]">
            <MaterialIcon icon="menu_book" className="text-[2.25rem] text-white" />
          </div>
          <h1 className="text-[1.35rem] font-black uppercase leading-tight tracking-[-0.03em] text-primary sm:text-[1.5rem]">
            NMTC <span className="whitespace-nowrap">LIBRARY</span>
          </h1>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b7280] sm:text-[11px]">
            MANAGEMENT SYSTEM
          </p>
        </header>

        <main>
          <div className="rounded-[28px] bg-white p-8 shadow-[0_28px_64px_-32px_rgba(17,45,78,0.22)] sm:p-10 sm:px-11">
            {redirectMessage ? (
              <div
                className="mb-6 rounded-xl bg-error-container/55 px-4 py-3 text-xs font-semibold text-on-error-container"
                role="status"
                aria-live="polite"
              >
                {redirectMessage}
                {fromPath ? <span className="block pt-1 text-[11px] opacity-80">Requested: {fromPath}</span> : null}
                {currentRole ? <span className="block text-[11px] opacity-80">Current role: {currentRole}</span> : null}
              </div>
            ) : null}
            <div className="mb-8 flex items-stretch gap-3 sm:mb-9">
              <span className="w-1 shrink-0 rounded-full bg-primary" aria-hidden />
              <h2 className="flex items-center text-lg font-bold leading-snug tracking-tight text-primary sm:text-xl">
                Sign In to Dashboard
              </h2>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]"
                  htmlFor="role"
                >
                  Access Role
                </label>

                <div className="relative">
                  <MaterialIcon
                    icon="manage_accounts"
                    className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 text-[1.125rem] text-[#6b7280] sm:left-4"
                  />
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as AppRole | "")}
                    className={`${fieldClass} cursor-pointer appearance-none pr-10 font-medium text-on-surface`}
                    aria-describedby="role-help-text"
                  >
                    <option value="" disabled>
                      Select your identity
                    </option>
                    <option value="super_admin">Super Admin</option>
                    <option value="school_admin">School Admin</option>
                    <option value="librarian">Librarian</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="student">Student</option>
                    <option value="guest">Guest</option>
                  </select>
                  <MaterialIcon
                    icon="expand_more"
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[1.25rem] text-[#6b7280]"
                  />
                </div>
                <p id="role-help-text" className="text-[11px] leading-relaxed text-[#9ca3af]">
                  Select your role to continue to the right dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]" htmlFor="username">
                  Username / ID
                </label>
                <div className="relative">
                  <MaterialIcon
                    icon="badge"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[1.125rem] text-[#6b7280] sm:left-4"
                  />
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={fieldClass}
                    placeholder="e.g. STU-2024-001"
                    type="text"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7280]" htmlFor="password">
                    Security Key
                  </label>
                  <button
                    className="shrink-0 text-xs font-bold text-primary underline decoration-primary/35 underline-offset-2 transition-colors hover:text-primary-container"
                    onClick={(e) => e.preventDefault()}
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <MaterialIcon
                    icon="lock"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[1.125rem] text-[#6b7280] sm:left-4"
                  />

                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${fieldClass} pr-11 sm:pr-12`}
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                  />

                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#6b7280] transition-colors hover:bg-black/[0.04] hover:text-primary"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <MaterialIcon icon={showPassword ? "visibility_off" : "visibility"} className="text-[1.25rem]" />
                  </button>
                </div>
              </div>

              <button
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_14px_28px_-16px_rgba(0,32,69,0.55)] transition-all hover:bg-[#001a38] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-primary/45 disabled:opacity-90 sm:py-4"
                type="submit"
                disabled={!canSubmit}
              >
                Sign In
                <MaterialIcon icon="arrow_forward" className="text-[1.125rem] text-white" />
              </button>
            </form>
          </div>

          <div className="mt-9 flex flex-col items-center gap-5 sm:mt-10">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-[#6b7280]">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-[#eceff3] px-4 py-2.5 text-[#43474e] transition-colors hover:bg-[#e2e6ec] hover:text-primary"
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                <MaterialIcon icon="help" className="text-[1.125rem]" />
                Technical Support
              </button>
              <span className="hidden h-1 w-1 rounded-full bg-[#c4c6cf] sm:inline" aria-hidden />
              <Link
                className="inline-flex items-center gap-2 font-bold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary-container"
                href="/guest"
              >
                <MaterialIcon icon="explore" className="text-[1.125rem]" />
                Browse Public Catalog
              </Link>
            </div>
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9ca3af]">
              Powered by The Scholarly Curator v2.4
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

