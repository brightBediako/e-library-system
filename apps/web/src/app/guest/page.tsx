import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { TopBarNavTabs } from "@/components/app-shell/TopBarNavTabs";
import { selectGuestLandingData } from "@/lib/mock/guestLanding";

export const dynamic = "force-dynamic";

export default function Page() {
  const { catalogItems, topTabs, hero } = selectGuestLandingData();

  return (
    <div className="bg-background bg-academic text-on-surface antialiased">
      <header className="fixed top-0 z-50 flex h-16 w-full max-w-full items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tighter text-blue-900">NMTC Library</span>
          <TopBarNavTabs tabs={topTabs} className="hidden gap-6 text-sm tracking-tight md:flex" />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input className="w-64 rounded-full border-none bg-surface-container-highest px-10 py-2 text-sm focus:ring-2 focus:ring-primary/40" placeholder="Search catalog..." type="text" />
            <MaterialIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant" />
          </div>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-50" type="button"><MaterialIcon icon="notifications" /></button>
            <Link className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-semibold text-on-primary transition-all active:scale-95" href="/">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-8 pb-12 pt-24">
        <section className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-center lg:col-span-8">
            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tighter text-primary md:text-6xl">
              Curating the <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Digital Frontier</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Access the National Management and Technical Center&apos;s vast repository of physical archives and digital scholarly resources. Knowledge, curated for excellence.
            </p>
            <div className="flex gap-4">
              <div className="relative max-w-md flex-1">
                <input className="h-14 w-full rounded-xl border-none bg-surface-container-lowest px-6 text-primary shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)] placeholder:text-outline focus:ring-2 focus:ring-primary/20" placeholder="ISBN, Author, or Keyword" type="text" />
              </div>
              <button className="flex h-14 items-center gap-2 rounded-xl bg-primary px-8 font-bold text-on-primary transition-transform active:scale-95" type="button">
                Find Books <MaterialIcon icon="arrow_forward" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-lowest p-8 text-center shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)]">
              <span className="mb-1 text-4xl font-black tracking-tighter text-primary">42k+</span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Volumes</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-primary-container p-8 text-center shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)]">
              <span className="mb-1 text-4xl font-black tracking-tighter text-on-primary-container">12</span>
              <span className="text-xs font-bold uppercase tracking-widest text-on-primary-container/70">Archives</span>
            </div>
            <div className="relative col-span-2 min-h-[160px] overflow-hidden rounded-2xl bg-surface-container-low">
              <img
                alt="Library hall overview"
                className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
                src={hero.hallImageUrl}
              />
              <div className="relative flex h-full flex-col justify-end p-6">
                <h3 className="font-bold text-primary">Member Privileges</h3>
                <p className="text-sm text-on-surface-variant">24/7 Digital Access</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-black uppercase tracking-widest text-primary">Public Catalog Preview</h2>
              <p className="text-on-surface-variant">Recently updated physical and digital acquisitions.</p>
            </div>
            <Link className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2" href="/search">
              View Full Catalog <MaterialIcon icon="east" className="text-base" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {catalogItems.map((item) => (
              <div key={item.title} className={`group rounded-2xl bg-surface-container-lowest p-5 shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)] transition-transform hover:-translate-y-2 ${item.digital ? "bg-primary-container/20" : ""}`}>
                <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-xl bg-surface-container-highest">
                  <img alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" src={item.cover} />
                  <div className="absolute left-3 top-3">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-tighter ${item.tagClass}`}>
                      {item.digital ? <MaterialIcon icon="cloud_done" className="mr-1 text-[12px]" /> : null}
                      {item.tag}
                    </span>
                  </div>
                </div>
                <h4 className="mb-1 text-lg font-bold leading-tight text-primary">{item.title}</h4>
                <p className="mb-4 text-sm italic text-on-surface-variant">{item.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{item.callout}</span>
                  <MaterialIcon icon="bookmark" className="text-primary-fixed-dim transition-colors group-hover:text-primary" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)] lg:p-10">
              <div className="absolute -mr-16 -mt-16 h-32 w-32 rounded-full bg-primary/5" />
              <h3 className="mb-4 text-3xl font-black tracking-tighter text-primary">Request Access</h3>
              <p className="mb-8 text-on-surface-variant">Guests may apply for temporary credentials to access our premium digital repository and reading rooms.</p>
              <form className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="fullName">Full Name</label>
                  <input id="fullName" className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40" type="text" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="email">Institutional Email</label>
                  <input id="email" className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40" type="email" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant" htmlFor="purpose">Research Purpose</label>
                  <textarea id="purpose" className="w-full rounded-lg border-none bg-surface-container-highest px-4 py-3 text-sm focus:ring-2 focus:ring-primary/40" rows={3} />
                </div>
                <button className="w-full rounded-xl bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-on-primary transition-all hover:shadow-lg active:scale-95" type="button">
                  Submit Access Request
                </button>
              </form>
              <p className="mt-6 text-center text-[11px] uppercase leading-relaxed tracking-tighter text-outline">
                Approval typically processed within 24-48 business hours.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative min-h-[500px] overflow-hidden rounded-2xl bg-surface-container-low p-4 lg:p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <MaterialIcon icon="description" className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Technical Analysis: Quantum Librarianship</h4>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">Premium Resource • PDF (12.4 MB)</p>
                </div>
              </div>
              <div className="select-none space-y-4 opacity-30">
                {[ "w-3/4", "w-full", "w-5/6", "w-2/3", "w-1/2", "w-full", "w-3/4", "w-5/6" ].map((w, i) => (
                  <div key={`${w}-${i}`} className={`h-4 rounded bg-on-surface-variant/20 ${w} ${i === 4 ? "pt-4" : ""}`} />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-surface-container-low via-surface-container-low/90 to-transparent p-8 text-center">
                <div className="max-w-sm rounded-2xl bg-white/60 p-8 shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)] backdrop-blur-md">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error-container text-on-error-container">
                    <MaterialIcon icon="lock" filled className="text-3xl" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-primary">Register to Read More</h3>
                  <p className="mb-6 text-sm text-on-surface-variant">This document is restricted to authenticated members and registered guest scholars.</p>
                  <div className="flex flex-col gap-3">
                    <Link className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-on-primary" href="/">Create Free Guest Account</Link>
                    <Link className="text-sm font-bold text-primary" href="/">Sign In to Continue</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)]">
                <MaterialIcon icon="auto_stories" className="text-secondary" filled />
                <div>
                  <h5 className="text-sm font-bold text-primary">Abstracts Only</h5>
                  <p className="text-xs text-on-surface-variant">Public users can view abstracts for all digital materials.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-[0_24px_48px_-12px_rgba(0,32,69,0.06)]">
                <MaterialIcon icon="physical_therapy" className="text-secondary" filled />
                <div>
                  <h5 className="text-sm font-bold text-primary">In-Person Reading</h5>
                  <p className="text-xs text-on-surface-variant">Physical books can be reserved for use in our facilities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 bg-primary px-8 py-16 text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <span className="mb-6 block text-2xl font-bold tracking-tighter">NMTC Library</span>
            <p className="mb-8 max-w-sm leading-relaxed text-on-primary-container">
              The Scholarly Curator at the National Management and Technical Center. Preserving history, facilitating the future of knowledge.
            </p>
            <div className="flex gap-4">
              <button className="transition-colors hover:text-secondary-container" type="button"><MaterialIcon icon="public" /></button>
              <button className="transition-colors hover:text-secondary-container" type="button"><MaterialIcon icon="alternate_email" /></button>
              <button className="transition-colors hover:text-secondary-container" type="button"><MaterialIcon icon="share" /></button>
            </div>
          </div>
          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-on-primary-container">The Catalog</h5>
            <ul className="space-y-4 text-sm text-on-primary-container/80">
              <li><Link className="transition-colors hover:text-white" href="/search">Advanced Search</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/search">New Acquisitions</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/search">Digital Collections</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/guest">Rare Books Room</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 text-sm font-bold uppercase tracking-widest text-on-primary-container">Services</h5>
            <ul className="space-y-4 text-sm text-on-primary-container/80">
              <li><Link className="transition-colors hover:text-white" href="/guest">Guest Access</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/guest">Inter-Library Loan</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/guest">Research Support</Link></li>
              <li><Link className="transition-colors hover:text-white" href="/guest">Room Booking</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center justify-between gap-6 pt-16 md:flex-row">
          <p className="text-xs uppercase tracking-widest text-on-primary-container/60">
            © 2024 NMTC Scholarly Curator System. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-on-primary-container/60">
            <Link className="transition-colors hover:text-white" href="/guest">Privacy Policy</Link>
            <Link className="transition-colors hover:text-white" href="/guest">Terms of Service</Link>
            <Link className="transition-colors hover:text-white" href="/guest">Accessibility</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}