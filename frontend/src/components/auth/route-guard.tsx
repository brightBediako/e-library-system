"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuthStore, type UserRole } from "@/store/auth-store";

interface RouteGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function RouteGuard({ children, allowedRoles }: RouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <main className="bg-surface flex min-h-screen items-center justify-center px-6 py-12">
        <section className="bg-surface-container-lowest subtle-shadow w-full max-w-lg rounded-3xl p-10 text-center">
          <div className="bg-primary-fixed mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
            <span className="material-symbols-outlined text-primary">lock</span>
          </div>
          <h1 className="text-primary text-2xl font-extrabold tracking-tight">Authentication Required</h1>
          <p className="text-on-surface-variant mt-3 text-sm">
            You must sign in before accessing this route.
          </p>
          <Link
            className="from-primary to-primary-container mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-bold text-white"
            href="/"
          >
            <span className="material-symbols-outlined text-base">login</span>
            Go to Login
          </Link>
        </section>
      </main>
    );
  }

  const hasRoleAccess = !allowedRoles || allowedRoles.includes(user.role);
  if (!hasRoleAccess) {
    return (
      <main className="bg-surface flex min-h-screen items-center justify-center px-6 py-12">
        <section className="bg-surface-container-lowest subtle-shadow w-full max-w-lg rounded-3xl p-10 text-center">
          <div className="bg-error-container mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
            <span className="material-symbols-outlined text-error">gpp_bad</span>
          </div>
          <h1 className="text-primary text-2xl font-extrabold tracking-tight">Access Restricted</h1>
          <p className="text-on-surface-variant mt-3 text-sm">
            Your current role cannot access <span className="font-semibold">{pathname}</span>.
          </p>
          <Link
            className="from-primary to-primary-container mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-sm font-bold text-white"
            href="/dashboard"
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            Back to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  return <>{children}</>;
}
