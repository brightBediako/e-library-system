import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CatchAllPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const first = params.slug?.[0];
  if (!first || first === "login") redirect("/");

  const route =
    first === "super-admin" || first === "super_admin"
      ? "/super-admin"
      : first === "admin" || first === "school_admin"
        ? "/admin"
        : first === "librarian"
          ? "/librarian"
          : first === "lecturer"
            ? "/lecturer"
            : first === "student"
              ? "/student"
              : first === "guest"
                ? "/guest"
                : first === "search"
                  ? "/search"
                  : "/search";

  redirect(route);
}

