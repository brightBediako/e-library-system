import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const first = resolvedParams.slug?.[0];
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

