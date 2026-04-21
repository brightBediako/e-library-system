"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import { BaseLayout } from "@/components/layout/base-layout";
import {
  type DigitalResource,
  type ResourceCategory,
} from "@/features/resources/mock-resources";
import {
  type ResourceAccessTag,
  fetchResourceBlob,
  fetchResources,
  uploadResource,
} from "@/services/resources.service";
import { useAuthStore, type UserRole } from "@/store/auth-store";

const categoryTabs: ResourceCategory[] = [
  "All Resources",
  "Lecture Notes",
  "Research Papers",
  "Past Exams",
];

type SortOption = "Sort by: Newest First" | "Most Downloaded" | "A - Z";

const resolveCategory = (name: string): ResourceCategory => {
  const normalized = name.toLowerCase();

  if (normalized.includes("exam") || normalized.includes("past")) {
    return "Past Exams";
  }
  if (normalized.includes("research") || normalized.includes("paper")) {
    return "Research Papers";
  }
  return "Lecture Notes";
};

const resolveVisualType = (mimetype: string, title: string) => {
  const normalizedType = mimetype.toLowerCase();
  const normalizedTitle = title.toLowerCase();
  if (normalizedType.includes("pdf")) {
    return {
      icon: "picture_as_pdf",
      iconWrapperClass: "bg-error-container/20 text-error",
      label: "PDF Document",
    };
  }
  if (normalizedTitle.includes("exam") || normalizedTitle.includes("past")) {
    return {
      icon: "quiz",
      iconWrapperClass: "bg-tertiary-fixed/30 text-tertiary",
      label: "Exam Archive",
    };
  }

  return {
    icon: "description",
    iconWrapperClass: "bg-primary/10 text-primary",
    label: "Document",
  };
};

export default function ResourcesPage() {
  const user = useAuthStore((state) => state.user);
  const activeRole: UserRole = user?.role ?? "admin";
  const queryClient = useQueryClient();
  const canManageResources = activeRole === "admin" || activeRole === "librarian";
  const [uploadAccessTag, setUploadAccessTag] = useState<ResourceAccessTag>("standard");
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>("All Resources");
  const [sortBy, setSortBy] = useState<SortOption>("Sort by: Newest First");
  const { data: apiResources = [], isLoading, isError } = useQuery({
    queryKey: ["resources-list"],
    queryFn: fetchResources,
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, accessTag }: { file: File; accessTag: ResourceAccessTag }) =>
      uploadResource(file, accessTag),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["resources-list"] });
    },
  });

  const resources = useMemo<(DigitalResource & { apiPath: string; accessTag: ResourceAccessTag })[]>(() => {
    const mappedResources = apiResources.map((resource) => {
      const displayName = resource.originalName || resource.filename;
      const visualType = resolveVisualType(resource.mimetype, displayName);
      const accessTag: ResourceAccessTag = resource.accessTag ?? "standard";

      return {
        id: resource.id,
        title: displayName,
        course: `Uploaded ${new Date(resource.uploadedAt).toLocaleDateString("en-US")}`,
        label: visualType.label,
        category: resolveCategory(displayName),
        icon: visualType.icon,
        iconWrapperClass: visualType.iconWrapperClass,
        apiPath: resource.path,
        accessTag,
      };
    });

    let filtered: (DigitalResource & { apiPath: string; accessTag: ResourceAccessTag })[] =
      activeCategory === "All Resources"
        ? [...mappedResources]
        : mappedResources.filter((resource) => resource.category === activeCategory);

    if (sortBy === "A - Z") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "Most Downloaded") {
      filtered = filtered.reverse();
    }

    return filtered;
  }, [activeCategory, apiResources, sortBy]);

  const [blobActionId, setBlobActionId] = useState<string | null>(null);

  const openResourceWithAuth = useCallback(
    async (apiPath: string, resourceId: string, mode: "view" | "download") => {
      setBlobActionId(resourceId);
      try {
        const blob = await fetchResourceBlob(apiPath, mode);
        const objectUrl = URL.createObjectURL(blob);
        if (mode === "view") {
          globalThis.open(objectUrl, "_blank", "noopener,noreferrer");
          globalThis.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
        } else {
          const link = document.createElement("a");
          link.href = objectUrl;
          const fileSegment = decodeURIComponent(apiPath.split("/").pop()?.split("?")[0] ?? "download");
          link.download = fileSegment;
          link.rel = "noopener noreferrer";
          link.click();
          URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        const axiosError = error instanceof AxiosError ? error : undefined;
        if (axiosError?.response?.status === 403) {
          globalThis.alert(
            "This document is restricted: downloading is not permitted. Use View to open it in the browser.",
          );
        } else {
          globalThis.alert("Could not open the file. Check that you are signed in and try again.");
        }
      } finally {
        setBlobActionId(null);
      }
    },
    [],
  );

  return (
    <BaseLayout
      pageTitle="Digital Resources"
      pageDescription="Access curated scholarly materials, research papers, and lecture archives."
      role={activeRole}
    >
      {canManageResources ? (
        <section className="bg-surface-container-lowest border-outline-variant/30 mb-8 rounded-xl border p-5">
          <h2 className="text-on-surface mb-3 text-lg font-bold">Add digital resource</h2>
          <p className="text-secondary mb-4 text-sm">
            Choose access: <strong>Standard</strong> allows download; <strong>Restricted</strong> allows in-app viewing
            only (API blocks download requests). Browser copy/paste cannot be fully prevented.
          </p>
          <form
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const fileInput = form.elements.namedItem("resource-file") as HTMLInputElement;
              const file = fileInput?.files?.[0];
              if (!file) {
                globalThis.alert("Choose a file to upload.");
                return;
              }
              uploadMutation.mutate({ file, accessTag: uploadAccessTag });
              fileInput.value = "";
            }}
          >
            <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm font-medium">
              <span className="mb-0.5">File</span>
              <input
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.webp,.zip"
                className="border-outline-variant/40 text-on-surface bg-surface-container-low rounded-lg border px-3 py-2 text-sm file:mr-3"
                name="resource-file"
                type="file"
              />
            </label>
            <label className="flex min-w-[220px] flex-col gap-1 text-sm font-medium">
              <span className="mb-0.5">Access tag</span>
              <select
                className="border-outline-variant/40 text-on-surface bg-surface-container-low rounded-lg border px-3 py-2 text-sm"
                value={uploadAccessTag}
                onChange={(event) => setUploadAccessTag(event.target.value as ResourceAccessTag)}
              >
                <option value="standard">Standard — download allowed</option>
                <option value="restricted">Restricted — view only</option>
              </select>
            </label>
            <button
              className="bg-primary text-on-primary hover:opacity-90 cursor-pointer rounded-lg px-6 py-2.5 text-sm font-bold shadow disabled:cursor-not-allowed disabled:opacity-60"
              disabled={uploadMutation.isPending}
              type="submit"
            >
              {uploadMutation.isPending ? "Uploading…" : "Upload"}
            </button>
          </form>
          {uploadMutation.isError ? (
            <p className="text-error mt-3 text-sm font-medium">
              Upload failed. Ensure you have librarian or admin access and the API is reachable.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="mb-10 flex flex-wrap items-center gap-4">
        <div className="bg-surface-container-low flex items-center gap-2 rounded-xl p-1">
          {categoryTabs.map((category) => (
            <button
              key={category}
              className={`rounded-lg px-6 py-2 text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : "text-secondary hover:bg-surface-bright"
              }`}
              type="button"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-outline-variant/30 h-8 w-px" />

        <div className="relative inline-block">
          <select
            className="bg-surface-container-low text-secondary appearance-none rounded-xl border-none py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <option>Sort by: Newest First</option>
            <option>Most Downloaded</option>
            <option>A - Z</option>
          </select>
          <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg">
            keyboard_arrow_down
          </span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <article className="bg-surface-container-lowest rounded-xl p-6 md:col-span-2">
            <p className="text-secondary text-sm font-medium">Loading resources...</p>
          </article>
        ) : null}
        {isError ? (
          <article className="bg-surface-container-lowest rounded-xl p-6 md:col-span-2">
            <p className="text-error text-sm font-semibold">
              Unable to load resources from API. Verify backend is running.
            </p>
          </article>
        ) : null}
        {!isLoading && !isError && resources.length === 0 ? (
          <article className="bg-surface-container-lowest rounded-xl p-6 md:col-span-2">
            <p className="text-secondary text-sm font-medium">No resources found.</p>
          </article>
        ) : null}
        {resources.map((resource) => (
          <article
            key={resource.id}
            className="bg-surface-container-lowest hover:bg-surface-bright group flex flex-col rounded-xl p-6 transition-all duration-300"
          >
            <div
              className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${resource.iconWrapperClass}`}
            >
              <span className="material-symbols-outlined text-3xl">{resource.icon}</span>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                {resource.label}
              </span>
              {resource.accessTag === "restricted" ? (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-900 uppercase dark:bg-amber-900/40 dark:text-amber-100">
                  Restricted
                </span>
              ) : null}
              <div className="border-outline-variant/40 min-w-[40px] flex-1 border-t border-dashed" />
            </div>
            <h3 className="text-on-surface group-hover:text-primary mb-2 text-xl leading-tight font-bold transition-colors">
              {resource.title}
            </h3>
            <p className="text-secondary mb-8 text-sm font-medium">{resource.course}</p>
            <div className="mt-auto flex items-center gap-3">
              <button
                className="from-primary to-primary-container flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-2.5 text-sm font-bold text-white opacity-90 shadow-md transition-all hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={blobActionId === resource.id}
                type="button"
                onClick={() => void openResourceWithAuth(resource.apiPath, resource.id, "view")}
              >
                <span className="material-symbols-outlined text-lg">visibility</span>
                {blobActionId === resource.id ? "Opening…" : "View"}
              </button>
              {resource.accessTag === "restricted" ? (
                <button
                  className="bg-surface-container-high text-outline inline-flex cursor-not-allowed rounded-lg p-2.5 opacity-60"
                  disabled
                  title="Download is disabled for restricted documents"
                  type="button"
                  aria-label="Download not available for restricted resources"
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              ) : (
                <button
                  className="bg-surface-container-high text-primary hover:bg-primary/5 inline-flex cursor-pointer rounded-lg p-2.5 transition-all disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={blobActionId === resource.id}
                  type="button"
                  aria-label="Download"
                  onClick={() => void openResourceWithAuth(resource.apiPath, resource.id, "download")}
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              )}
            </div>
          </article>
        ))}

        <article className="from-primary to-primary-container relative overflow-hidden rounded-xl bg-gradient-to-br p-8 md:col-span-2">
          <div className="relative z-10 flex h-full flex-col">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md">
                Faculty Pick
              </span>
              <span className="text-xs font-medium text-white/60">New Release - Today</span>
            </div>
            <h2 className="mb-4 text-3xl leading-tight font-extrabold text-white">
              Comprehensive Guide to Academic Publishing 2024 Edition
            </h2>
            <p className="mb-10 max-w-md leading-relaxed text-white/80">
              The definitive guide for emerging scholars looking to navigate high-impact journal
              submissions and editorial processes.
            </p>
            <div className="mt-auto flex items-center gap-4">
              <button
                className="text-primary bg-white hover:bg-surface-bright rounded-lg px-8 py-3 font-bold shadow-xl transition-all"
                type="button"
              >
                Start Reading
              </button>
              <button
                className="flex items-center gap-2 font-medium text-white/80 transition-all hover:text-white"
                type="button"
              >
                <span className="material-symbols-outlined">bookmark</span>
                <span>Save to Library</span>
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute top-10 right-10 opacity-20">
            <span className="material-symbols-outlined text-[140px] text-white">auto_awesome</span>
          </div>
        </article>
      </section>

      <section className="border-outline-variant/20 mt-16 flex flex-col items-center justify-center border-t py-20">
        <div className="text-surface-container-highest mb-8 select-none text-[120px] leading-none font-black tracking-tighter">
          END OF FEED
        </div>
        <button
          className="border-primary text-primary hover:bg-primary hover:text-white rounded-full border-2 px-10 py-4 font-bold transition-all"
          type="button"
        >
          Load More Resources
        </button>
      </section>
    </BaseLayout>
  );
}
