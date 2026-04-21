"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import Link from "next/link";
import { BaseLayout } from "@/components/layout/base-layout";
import {
  type DigitalResource,
  type ResourceCategory,
} from "@/features/resources/mock-resources";
import { fetchResources } from "@/services/resources.service";
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
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>("All Resources");
  const [sortBy, setSortBy] = useState<SortOption>("Sort by: Newest First");
  const { data: apiResources = [], isLoading, isError } = useQuery({
    queryKey: ["resources-list"],
    queryFn: fetchResources,
  });

  const resources = useMemo<DigitalResource[]>(() => {
    const mappedResources = apiResources.map((resource) => {
      const displayName = resource.originalName || resource.filename;
      const visualType = resolveVisualType(resource.mimetype, displayName);

      return {
        id: resource.id,
        title: displayName,
        course: `Uploaded ${new Date(resource.uploadedAt).toLocaleDateString("en-US")}`,
        label: visualType.label,
        category: resolveCategory(displayName),
        icon: visualType.icon,
        iconWrapperClass: visualType.iconWrapperClass,
      };
    });

    let filtered: DigitalResource[] =
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

  return (
    <BaseLayout
      pageTitle="Digital Resources"
      pageDescription="Access curated scholarly materials, research papers, and lecture archives."
      role={activeRole}
    >
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
            <div className="mb-2 flex items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                {resource.label}
              </span>
              <div className="border-outline-variant/40 flex-1 border-t border-dashed" />
            </div>
            <h3 className="text-on-surface group-hover:text-primary mb-2 text-xl leading-tight font-bold transition-colors">
              {resource.title}
            </h3>
            <p className="text-secondary mb-8 text-sm font-medium">{resource.course}</p>
            <div className="mt-auto flex items-center gap-3">
              <Link
                className="from-primary to-primary-container flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r py-2.5 text-sm font-bold text-white opacity-90 shadow-md transition-all hover:opacity-100"
                href="/reader"
              >
                <span className="material-symbols-outlined text-lg">visibility</span>
                View
              </Link>
              <button
                className="bg-surface-container-high text-primary hover:bg-primary/5 rounded-lg p-2.5 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
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
                Save to Library
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
