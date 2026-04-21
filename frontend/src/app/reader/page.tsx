"use client";

import Link from "next/link";
import { useState } from "react";

export default function ReaderPage() {
  const [isPdfLoading, setIsPdfLoading] = useState(true);

  return (
    <main className="bg-surface text-on-surface flex h-screen flex-col overflow-hidden">
      <header className="bg-surface-container-lowest/90 border-outline-variant/30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl md:px-6">
        <div className="flex items-center gap-4">
          <Link className="text-primary inline-flex items-center gap-2 text-sm font-semibold" href="/resources">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Resources
          </Link>
          <div className="bg-outline-variant/40 h-6 w-px" />
          <div>
            <h1 className="text-primary text-sm font-bold">Sample PDF Reader</h1>
            <p className="text-on-surface-variant text-[10px] tracking-widest uppercase">Page 1 of 1</p>
          </div>
        </div>

        <div className="bg-surface-container-low flex items-center gap-2 rounded-full px-3 py-1.5">
          <button className="text-on-surface-variant rounded-md p-1 hover:bg-surface-bright" type="button">
            <span className="material-symbols-outlined text-base">remove</span>
          </button>
          <span className="text-secondary min-w-10 text-center text-xs font-semibold">100%</span>
          <button className="text-on-surface-variant rounded-md p-1 hover:bg-surface-bright" type="button">
            <span className="material-symbols-outlined text-base">add</span>
          </button>
        </div>
      </header>

      <section className="bg-surface-container flex-1 overflow-hidden p-4 md:p-8">
        <div className="mx-auto relative h-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-[0px_12px_32px_rgba(25,28,29,0.08)]">
          {isPdfLoading ? (
            <div className="bg-surface-container-lowest/90 absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
              <p className="text-on-surface-variant text-sm font-medium">Loading document...</p>
            </div>
          ) : null}
          <iframe
            className="h-full w-full"
            src="/sample.pdf#view=FitH"
            title="PDF Viewer"
            onLoad={() => setIsPdfLoading(false)}
          />
        </div>
      </section>
    </main>
  );
}
