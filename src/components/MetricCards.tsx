import { TrendingDown, AlertTriangle, PackageX, EyeOff } from 'lucide-react';
import type { SummaryMetrics } from '@/lib/data';
import { formatUSD } from '@/lib/data';

interface MetricCardsProps {
  metrics: SummaryMetrics;
  visible: boolean;
}

export default function MetricCards({ metrics, visible }: MetricCardsProps) {
  const cards = [
    {
      label: 'Total Overcharged',
      sublabel: 'Amount Recoverable',
      value: `${formatUSD(metrics.totalOvercharged)}`,
      icon: TrendingDown,
      accent: 'red' as const,
      delay: '0s',
    },
    {
      label: 'Discrepancies Found',
      sublabel: 'Orders Flagged',
      value: `${metrics.discrepancies} Orders`,
      icon: AlertTriangle,
      accent: 'amber' as const,
      delay: '0.08s',
    },
    {
      label: 'Cargo Desi Mismatches',
      sublabel: 'Shipping Errors',
      value: `${metrics.desiMismatches} Shipments`,
      icon: PackageX,
      accent: 'brand' as const,
      delay: '0.16s',
    },
    {
      label: 'Hidden Payment Fees',
      sublabel: 'Undisclosed Commissions',
      value: `${formatUSD(metrics.hiddenFees)}`,
      icon: EyeOff,
      accent: 'violet' as const,
      delay: '0.24s',
    },
  ];

  const accentMap = {
    red: {
      ring: 'ring-red-500/20',
      glow: 'shadow-[0_0_40px_-12px_rgba(239,68,68,0.35)]',
      iconBg: 'bg-red-500/10 text-red-400 ring-red-500/20',
      value: 'text-red-400',
      bar: 'from-red-500 to-red-600',
    },
    amber: {
      ring: 'ring-amber-500/20',
      glow: 'shadow-[0_0_40px_-12px_rgba(245,158,11,0.3)]',
      iconBg: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
      value: 'text-amber-300',
      bar: 'from-amber-500 to-amber-600',
    },
    brand: {
      ring: 'ring-brand-500/20',
      glow: 'shadow-glow-brand',
      iconBg: 'bg-brand-500/10 text-brand-300 ring-brand-500/20',
      value: 'text-brand-300',
      bar: 'from-brand-400 to-brand-600',
    },
    violet: {
      ring: 'ring-fuchsia-500/20',
      glow: 'shadow-[0_0_40px_-12px_rgba(217,70,239,0.3)]',
      iconBg: 'bg-fuchsia-500/10 text-fuchsia-400 ring-fuchsia-500/20',
      value: 'text-fuchsia-300',
      bar: 'from-fuchsia-500 to-fuchsia-600',
    },
  };

  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const a = accentMap[c.accent];
          return (
            <div
              key={c.label}
              className={[
                'group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-850/80 p-5 ring-1 transition-all duration-300 hover:-translate-y-1',
                a.ring,
                visible ? 'animate-scale-in' : 'opacity-0',
              ].join(' ')}
              style={{ animationDelay: c.delay }}
            >
              {/* Top accent bar */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${a.bar} opacity-60`} />

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-400">{c.label}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-600">{c.sublabel}</p>
                </div>
                <div className={`grid h-10 w-10 place-items-center rounded-xl ring-1 ${a.iconBg}`}>
                  <c.icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4">
                <p className={`tnum text-3xl font-extrabold tracking-tight ${a.value}`}>
                  {c.value}
                </p>
              </div>

              {/* Hover glow */}
              <div className={`pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${a.glow}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
