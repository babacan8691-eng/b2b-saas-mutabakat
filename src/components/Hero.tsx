import { useState, useCallback, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Zap, Download, FileText, FileSpreadsheet } from 'lucide-react';
import DropZone from './DropZone';
import type { DropZoneId, UploadedFile } from '@/lib/data';
import { downloadBlob, generatePaymentCsv, generateCargoCsv } from '@/lib/sampleFiles';
import { initPaddle, openPaddleCheckout } from '@/lib/paddle';

interface HeroProps {
  onAnalyze: (paymentFile: UploadedFile | null, cargoFile: UploadedFile | null) => void;
  analyzing: boolean;
}

export default function Hero({ onAnalyze, analyzing }: HeroProps) {
  const [paymentFile, setPaymentFile] = useState<UploadedFile | null>(null);
  const [cargoFile, setCargoFile] = useState<UploadedFile | null>(null);
  const [parsingId, setParsingId] = useState<DropZoneId | null>(null);

  const handleFile = useCallback(
    (id: DropZoneId, file: UploadedFile) => {
      if (!file) {
        if (id === 'payment') setPaymentFile(null);
        else setCargoFile(null);
        return;
      }
      setParsingId(id);
      setTimeout(() => {
        const enriched: UploadedFile = {
          ...file,
          rows: id === 'payment' ? 1240 : 860,
        };
        if (id === 'payment') setPaymentFile(enriched);
        else setCargoFile(enriched);
        setParsingId(null);
      }, 1300);
    },
    [],
  );

  const bothReady = paymentFile && cargoFile;

  useEffect(() => { initPaddle(); }, []);

  const handleDownloadPayment = useCallback(() => {
    downloadBlob('sample-payment-report.csv', generatePaymentCsv(), 'text/csv;charset=utf-8');
  }, []);

  const handleDownloadCargo = useCallback(() => {
    downloadBlob('sample-cargo-invoice.csv', generateCargoCsv(), 'text/csv;charset=utf-8');
  }, []);

  return (
    <section id="analiz" className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24 sm:pb-16">
        {/* Badge */}
        <div className="flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald2-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald2-400" />
            </span>
            New: Automatic dispute letter generation
          </div>
        </div>

        {/* Headline */}
        <div className="mx-auto mt-6 max-w-3xl text-center animate-fade-up">
          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Catch Shipping & Commission{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-emerald2-400 bg-clip-text text-transparent">
              Errors
            </span>
            , Recover Your Revenue
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            Compare your payment provider and shipping firm invoices in seconds.
            Hidden commissions, incorrect desi charges, and overcharges are detected automatically.
          </p>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-400" /> Bank-grade encryption</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-400" /> Your data is never deleted or shared</span>
          <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-brand-400" /> Analysis in 60 seconds</span>
        </div>

        {/* Drop zones */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <DropZone
            id="payment"
            label="Upload Payment Report"
            hint="Stripe / iyzico CSV file"
            accept=".csv,text/csv"
            icon="payment"
            onFile={handleFile}
            file={paymentFile}
            parsing={parsingId === 'payment'}
          />
          <DropZone
            id="cargo"
            label="Upload Cargo Invoice"
            hint="Yurtiçi / Aras / MNG Excel"
            accept=".xlsx,.xls"
            icon="cargo"
            onFile={handleFile}
            file={cargoFile}
            parsing={parsingId === 'cargo'}
          />
        </div>

        {/* Sample file download buttons */}
        <div className="mt-5 flex flex-col items-center gap-2 animate-fade-up sm:flex-row sm:justify-center sm:gap-3" style={{ animationDelay: '0.25s' }}>
          <button
            onClick={handleDownloadPayment}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 transition-all hover:border-brand-400/30 hover:bg-brand-500/5 hover:text-brand-200"
          >
            <FileText className="h-3.5 w-3.5 text-brand-300" />
            Download Sample Payment CSV Report
            <Download className="h-3 w-3 opacity-60" />
          </button>
          <button
            onClick={handleDownloadCargo}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-slate-300 transition-all hover:border-emerald2-400/30 hover:bg-emerald2-500/5 hover:text-emerald2-400"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald2-400" />
            Download Sample Cargo Excel Invoice
            <Download className="h-3 w-3 opacity-60" />
          </button>
        </div>

        {/* Analyze button */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => {
              openPaddleCheckout();
              onAnalyze(paymentFile, cargoFile);
            }}
            disabled={!bothReady || analyzing}
            className={[
              'group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-300',
              bothReady && !analyzing
                ? 'bg-gradient-to-r from-brand-400 to-brand-600 text-ink-950 shadow-glow-brand hover:shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_12px_50px_-8px_rgba(34,211,238,0.5)] hover:-translate-y-0.5'
                : 'cursor-not-allowed bg-ink-700 text-slate-500',
            ].join(' ')}
          >
            {analyzing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                Analyzing…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Start Reconciliation Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
          {!bothReady && !analyzing && (
            <p className="text-xs text-slate-500">Upload both files to run the analysis</p>
          )}
        </div>
      </div>
    </section>
  );
}
