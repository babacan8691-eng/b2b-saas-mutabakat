import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#analiz' },
    { label: 'Reconciliation', href: '#discrepancies' },
    { label: 'Pricing', href: '#cta' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-brand">
            <ShieldCheck className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-tight text-white">Reconify</span>
            <span className="text-[10px] font-medium text-brand-300/70">Reconciliation Platform</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
            Sign In
          </button>
          <a
            href="#cta"
            className="rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20"
          >
            Start Demo
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-300 hover:bg-white/5 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-white/10"
            >
              Start Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
