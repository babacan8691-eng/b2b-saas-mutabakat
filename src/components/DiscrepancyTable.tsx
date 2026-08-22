import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Send, CheckCircle2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DiscrepancyRow } from '@/lib/data';
import { formatUSD } from '@/lib/data';

interface DiscrepancyTableProps {
  rows: DiscrepancyRow[];
  visible: boolean;
}

const typeMeta: Record<DiscrepancyRow['type'], { label: string; cls: string }> = {
  commission: { label: 'Commission', cls: 'bg-amber-500/10 text-amber-300 ring-amber-500/20' },
  desi: { label: 'Desi Error', cls: 'bg-brand-500/10 text-brand-300 ring-brand-500/20' },
  hidden_fee: { label: 'Hidden Fee', cls: 'bg-fuchsia-500/10 text-fuchsia-300 ring-fuchsia-500/20' },
};

export default function DiscrepancyTable({ rows, visible }: DiscrepancyTableProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | DiscrepancyRow['type']>('all');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const [inquired, setInquired] = useState<Set<string>>(new Set());
  const pageSize = 8;

  const filtered = useMemo(() => {
    let r = rows.filter((row) =>
      row.orderId.toLowerCase().includes(search.toLowerCase()) ||
      row.platform.toLowerCase().includes(search.toLowerCase()) ||
      row.cargoFirm.toLowerCase().includes(search.toLowerCase()),
    );
    if (typeFilter !== 'all') r = r.filter((row) => row.type === typeFilter);
    r = [...r].sort((a, b) => {
      const da = a.chargedCost - a.expectedCost;
      const db = b.chargedCost - b.expectedCost;
      return sortDir === 'desc' ? db - da : da - db;
    });
    return r;
  }, [rows, search, typeFilter, sortDir]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice(page * pageSize, page * pageSize + pageSize);

  const toggleInquire = (id: string) => {
    setInquired((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!visible) return null;

  return (
    <section id="discrepancies" className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-ink-850/80 shadow-card animate-fade-up">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-white">Detected Discrepancies</h2>
            <p className="mt-0.5 text-xs text-slate-400">
              Showing {filtered.length} records — differences highlighted in red
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                placeholder="Order no, platform, carrier…"
                className="w-full rounded-lg border border-white/10 bg-ink-900/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30 sm:w-56"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as 'all' | DiscrepancyRow['type']);
                  setPage(0);
                }}
                className="w-full appearance-none rounded-lg border border-white/10 bg-ink-900/60 py-2 pl-9 pr-8 text-sm text-white focus:border-brand-400/50 focus:outline-none focus:ring-1 focus:ring-brand-400/30 sm:w-40"
              >
                <option value="all">All</option>
                <option value="commission">Commission</option>
                <option value="desi">Desi Error</option>
                <option value="hidden_fee">Hidden Fee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3 font-semibold">Order No</th>
                <th className="px-5 py-3 font-semibold">Platform</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 text-right font-semibold">Expected Cost</th>
                <th className="px-5 py-3 text-right font-semibold">Charged Cost</th>
                <th className="px-5 py-3 text-right font-semibold">
                  <button
                    onClick={() => setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))}
                    className="inline-flex items-center gap-1 hover:text-white"
                  >
                    Difference
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-5 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row, i) => {
                const diff = row.chargedCost - row.expectedCost;
                const isInquired = inquired.has(row.id);
                return (
                  <tr
                    key={row.id}
                    className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.025]"
                    style={{ animation: `fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s both` }}
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-semibold text-white">{row.orderId}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-slate-300">{row.platform}</span>
                      <span className="block text-[10px] text-slate-500">{row.cargoFirm}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 tnum">{row.platformDate}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${typeMeta[row.type].cls}`}>
                        {typeMeta[row.type].label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right tnum text-slate-300">${formatUSD(row.expectedCost)}</td>
                    <td className="px-5 py-3.5 text-right tnum text-slate-200">${formatUSD(row.chargedCost)}</td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="tnum font-bold text-red-400">
                        +${formatUSD(diff)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => toggleInquire(row.id)}
                        className={[
                          'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                          isInquired
                            ? 'bg-emerald2-500/10 text-emerald2-400 ring-1 ring-emerald2-500/20'
                            : 'bg-brand-500/10 text-brand-300 ring-1 ring-brand-500/20 hover:bg-brand-500/20',
                        ].join(' ')}
                      >
                        {isInquired ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Disputed
                          </>
                        ) : (
                          <>
                            <Send className="h-3.5 w-3.5" />
                            Dispute
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-white/5 px-5 py-4">
          <p className="text-xs text-slate-500">
            Page {page + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
              className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
