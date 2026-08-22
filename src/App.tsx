import { useState, useCallback } from 'react';
import { ShieldCheck, FileText, FileSpreadsheet, ArrowRight, TrendingDown, AlertTriangle, PackageX, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricCards from '@/components/MetricCards';
import DiscrepancyTable from '@/components/DiscrepancyTable';
import CtaBanner from '@/components/CtaBanner';
import { SIM_ROWS, SUMMARY, formatUSD, type UploadedFile, type DiscrepancyRow } from '@/lib/data';
import { openPaddleCheckout } from '@/lib/paddle';

type Phase = 'idle' | 'analyzing' | 'done';

function App() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [rows, setRows] = useState<DiscrepancyRow[]>([]);

  const handleAnalyze = useCallback((_payment: UploadedFile | null, _cargo: UploadedFile | null) => {
    setPhase('analyzing');
    setRows([]);
    setTimeout(() => {
      setRows(SIM_ROWS);
      setPhase('done');
      setTimeout(() => {
        document.getElementById('discrepancies')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }, 2200);
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-slate-200">
      <Navbar />

      <main>
        <Hero onAnalyze={handleAnalyze} analyzing={phase === 'analyzing'} />

        {/* Analysis results */}
        {phase !== 'idle' && (
          <div className="space-y-8 pb-28 pt-4">
            {phase === 'analyzing' && (
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                  <div className="relative">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-500/10 ring-1 ring-brand-500/20">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-400/30 border-t-brand-400" />
                    </div>
                    <span className="absolute inset-0 animate-pulse-ring rounded-2xl ring-1 ring-brand-400/40" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Running reconciliation analysis</p>
                    <p className="mt-1 text-sm text-slate-400">Matching payment rows with cargo invoices…</p>
                  </div>
                  {/* Skeleton rows */}
                  <div className="mt-6 w-full max-w-3xl space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 rounded-lg shimmer" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {phase === 'done' && (
              <>
                {/* Section title */}
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                  <div className="flex items-center gap-2 animate-fade-up">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald2-500/20 bg-emerald2-500/10 px-4 py-1.5 text-xs font-semibold text-emerald2-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Analysis Complete
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>

                <MetricCards metrics={SUMMARY} visible={phase === 'done'} />

                <DiscrepancyTable rows={rows} visible={phase === 'done'} />

                {phase === 'done' && (
                  <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-emerald2-500/20 bg-gradient-to-br from-emerald2-500/10 to-brand-500/10 p-6 text-center sm:p-8">
                    <p className="text-sm font-semibold text-white sm:text-base">
                      Join Early Access Now & Catch the Discount
                    </p>
                    <p className="text-xs text-slate-400">
                      Automatically send dispute letters to shipping companies and track refunds.
                    </p>
                    <button
                      onClick={openPaddleCheckout}
                      className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-400 via-brand-500 to-emerald2-500 px-6 py-3.5 text-sm font-bold text-ink-950 shadow-glow-brand transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_14px_50px_-8px_rgba(34,211,238,0.6)]"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                      Join Early Access Now & Catch the Discount
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Idle state info section */}
        {phase === 'idle' && (
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  icon: FileText,
                  title: 'Payment Report',
                  desc: 'Upload your Stripe or iyzico CSV file. Commissions and fees deducted for each order are read automatically.',
                  accent: 'text-brand-300',
                  bg: 'bg-brand-500/10 ring-brand-500/20',
                },
                {
                  icon: FileSpreadsheet,
                  title: 'Cargo Invoice',
                  desc: 'Upload your Yurtiçi, Aras, or MNG Excel invoices. Shipping costs are extracted on a desi basis.',
                  accent: 'text-emerald2-400',
                  bg: 'bg-emerald2-500/10 ring-emerald2-500/20',
                },
                {
                  icon: ShieldCheck,
                  title: 'Automatic Reconciliation',
                  desc: 'Both reports are matched in seconds. Erroneous deductions, desi mismatches, and hidden fees are listed.',
                  accent: 'text-brand-300',
                  bg: 'bg-brand-500/10 ring-brand-500/20',
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-white/5 bg-ink-850/60 p-6 transition-all hover:border-white/10 hover:bg-ink-800/60 animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ${f.bg}`}>
                    <f.icon className={`h-6 w-6 ${f.accent}`} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* Mini stat preview */}
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-ink-850/80 to-ink-900/80 p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: TrendingDown, label: 'Overcharged', value: `${formatUSD(SUMMARY.totalOvercharged)}`, color: 'text-red-400' },
                  { icon: AlertTriangle, label: 'Discrepancies', value: `${SUMMARY.discrepancies} Orders`, color: 'text-amber-300' },
                  { icon: PackageX, label: 'Desi Errors', value: `${SUMMARY.desiMismatches} Shipments`, color: 'text-brand-300' },
                  { icon: EyeOff, label: 'Hidden Fees', value: `${formatUSD(SUMMARY.hiddenFees)}`, color: 'text-fuchsia-300' },
                ].map((s) => (
                  <div key={s.label} className="text-center sm:text-left">
                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <s.icon className={`h-4 w-4 ${s.color}`} />
                      <span className="text-xs font-medium text-slate-400">{s.label}</span>
                    </div>
                    <p className={`tnum mt-2 text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-xs text-slate-500">The values above are from a sample analysis. Upload your own reports to see real results.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer id="cta" className="border-t border-white/5 bg-ink-950">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600">
                <ShieldCheck className="h-4 w-4 text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-white">Reconify</span>
              <span className="text-xs text-slate-500">© 2026</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-400">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <CtaBanner />
    </div>
  );
}

export default App;
