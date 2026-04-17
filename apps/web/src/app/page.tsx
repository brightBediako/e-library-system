"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

type Role =
  | "super_admin"
  | "school_admin"
  | "librarian"
  | "lecturer"
  | "student"
  | "guest";

const roleToPath: Record<Role, string> = {
  super_admin: "/super-admin",
  school_admin: "/admin",
  librarian: "/librarian",
  lecturer: "/lecturer",
  student: "/student",
  guest: "/guest",
};

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role | "">("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = useMemo(() => Boolean(role), [role]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) return;
    router.push(roleToPath[role] ?? "/search");
  }

  return (
    <div className="min-h-screen bg-background bg-academic flex flex-col items-center justify-start p-6 relative overflow-hidden pt-14 pb-10">
      {/* Background shapes (match login.png) */}
      <div className="absolute -left-24 top-8 w-80 h-80 rounded-full bg-surface-container-highest opacity-60 flex items-center justify-center">
        <div className="text-on-surface-variant/15 font-bold text-[12px] uppercase tracking-[0.3em]">
          ACADEMIC AMBIENT
        </div>
      </div>
      <div
        className="absolute -right-40 bottom-[-70px] w-[620px] h-[340px] rounded-3xl bg-surface-container-highest/60 rotate-12 overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(0,32,69,0.14) 0px, rgba(0,32,69,0.14) 1px, transparent 1px, transparent 14px)",
          backgroundSize: "auto",
        }}
        aria-hidden="true"
      />

      <div className="w-full max-w-md z-10">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg mb-5">
            <MaterialIcon icon="menu_book" className="text-white text-4xl" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-primary uppercase">
            NMTCLIBRARY
          </h1>
          <p className="text-[10px] font-bold tracking-[0.25em] text-on-surface-variant mt-1 uppercase">
            MANAGEMENT SYSTEM
          </p>
        </header>

        <main>
          <div className="bg-surface-container-lowest rounded-[22px] p-8 shadow-[0_24px_48px_-20px_rgba(0,32,69,0.12)]">
            <div className="flex items-center gap-3 mb-8">
              <span className="block h-8 w-1.5 bg-primary rounded-full" />
              <h2 className="text-lg font-extrabold tracking-tight text-primary">
                Sign In to Dashboard
              </h2>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  className="block text-[11px] font-black tracking-widest uppercase text-on-surface-variant"
                  htmlFor="role"
                >
                  Access Role
                </label>

                <div className="relative">
                  <MaterialIcon
                    icon="manage_accounts"
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg"
                  />
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role | "")}
                    className="w-full pl-12 pr-10 py-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-semibold appearance-none cursor-pointer"
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
                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 pointer-events-none text-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="block text-[11px] font-black tracking-widest uppercase text-on-surface-variant"
                  htmlFor="username"
                >
                  Username / ID
                </label>
                <div className="relative">
                  <MaterialIcon
                    icon="badge"
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg"
                  />
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-semibold placeholder:text-on-surface-variant/60 outline-none"
                    placeholder="e.g. STU-2024-001"
                    type="text"
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="block text-[11px] font-black tracking-widest uppercase text-on-surface-variant"
                    htmlFor="password"
                  >
                    Security Key
                  </label>
                  <a
                    className="text-xs font-bold text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary transition-all"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot Password?
                  </a>
                </div>

                <div className="relative">
                  <MaterialIcon
                    icon="lock"
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg"
                  />

                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-semibold placeholder:text-on-surface-variant/60 outline-none"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                  />

                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-primary transition-colors"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    <MaterialIcon
                      icon={showPassword ? "visibility_off" : "visibility"}
                      className="text-xl"
                    />
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-primary text-white py-4 rounded-xl font-extrabold tracking-wide shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                type="submit"
                disabled={!canSubmit}
              >
                Sign In
                <MaterialIcon icon="arrow_forward" className="text-xl" />
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-8 text-sm font-semibold text-on-surface-variant">
              <a
                className="hover:text-primary transition-colors flex items-center gap-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <MaterialIcon
                  icon="help"
                  className="text-lg text-on-surface-variant/80"
                />
                Technical Support
              </a>
              <div className="h-1.5 w-1.5 bg-outline-variant/80 rounded-full" />
              <a
                className="hover:text-primary transition-colors flex items-center gap-2"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <MaterialIcon
                  icon="explore"
                  className="text-lg text-on-surface-variant/80"
                />
                Browse Public Catalog
              </a>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-outline-variant/90">
              Powered by The Scholarly Curator v2.4
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

