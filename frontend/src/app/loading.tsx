export default function RootLoading() {
  return (
    <main className="bg-surface flex min-h-screen items-center justify-center px-6 py-12">
      <section className="bg-surface-container-lowest subtle-shadow w-full max-w-md rounded-3xl p-10 text-center">
        <div className="bg-primary-fixed mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl">
          <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
        </div>
        <p className="text-outline mb-2 text-xs font-bold tracking-widest uppercase">Please Wait</p>
        <h1 className="text-primary text-2xl font-extrabold tracking-tight">Loading NMTC Portal</h1>
        <p className="text-on-surface-variant mt-3 text-sm">
          Preparing your library workspace and fetching the latest data.
        </p>
      </section>
    </main>
  );
}
