import { Rocket, ArrowRight, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { initPaddle, openPaddleCheckout } from '@/lib/paddle';



export default function CtaBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { initPaddle(); }, []);

  if (dismissed) return null;

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-30 transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850/90 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          {/* Gradient glow */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-emerald2-500/15 blur-3xl" />

          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-start gap-3 text-center sm:text-left">
              <div className="hidden shrink-0 sm:block">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-brand">
                  <Rocket className="h-5 w-5 text-ink-950" />
                </div>
              </div>
              <div>
                <p className="max-w-xl text-pretty text-sm font-semibold leading-relaxed text-white sm:text-base">
                  Want to automatically send all erroneous invoices to the shipping company as dispute letters?
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Automatic letter generation · Bulk disputes · Refund tracking
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={openPaddleCheckout}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 via-brand-500 to-emerald2-500 px-5 py-3 text-sm font-bold text-ink-950 shadow-glow-brand transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_14px_50px_-8px_rgba(34,211,238,0.6)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
Join Early Access Now & Catch the Discount
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
