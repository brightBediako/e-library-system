"use client";

import { useQuery } from "@tanstack/react-query";

interface PingPayload {
  message: string;
}

const fetchPing = async (): Promise<PingPayload> => {
  const response = await fetch("/api/ping-client-test");

  if (!response.ok) {
    throw new Error("Failed to fetch ping payload.");
  }

  return response.json();
};

export default function QueryTestPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ping-test"],
    queryFn: fetchPing,
  });

  return (
    <main className="bg-surface text-on-surface flex min-h-screen items-center justify-center p-8">
      <section className="bg-surface-container-lowest subtle-shadow w-full max-w-xl rounded-2xl p-8">
        <h1 className="font-headline text-primary mb-3 text-2xl font-extrabold">React Query Test</h1>
        {isLoading ? <p className="text-on-surface-variant text-sm">Loading ping response...</p> : null}
        {isError ? (
          <p className="text-error text-sm font-semibold">
            {(error as Error).message ?? "Failed to load query."}
          </p>
        ) : null}
        {data ? (
          <p className="text-on-surface text-sm">
            Query success response: <span className="font-bold">{data.message}</span>
          </p>
        ) : null}
      </section>
    </main>
  );
}
