export const AUTH_COOKIE_NAME = "elib_role";

export type AppRole =
  | "super_admin"
  | "school_admin"
  | "librarian"
  | "lecturer"
  | "student"
  | "guest";

export const roleToHomePath: Record<AppRole, string> = {
  super_admin: "/super-admin",
  school_admin: "/admin",
  librarian: "/librarian",
  lecturer: "/lecturer",
  student: "/student",
  guest: "/guest",
};

const protectedRouteRules: ReadonlyArray<{
  prefix: string;
  allowedRoles: readonly AppRole[];
}> = [
  { prefix: "/super-admin", allowedRoles: ["super_admin"] },
  { prefix: "/admin", allowedRoles: ["school_admin"] },
  { prefix: "/librarian", allowedRoles: ["librarian"] },
  { prefix: "/lecturer", allowedRoles: ["lecturer"] },
  { prefix: "/student", allowedRoles: ["student"] },
  { prefix: "/guest", allowedRoles: ["guest"] },
  {
    prefix: "/search",
    allowedRoles: ["super_admin", "school_admin", "librarian", "lecturer", "student", "guest"],
  },
];

export function getAllowedRolesForPath(pathname: string): readonly AppRole[] | null {
  const match = protectedRouteRules.find((rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`));
  return match?.allowedRoles ?? null;
}
