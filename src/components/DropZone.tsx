import { useRef, useState, useCallback } from 'react';
import { UploadCloud, FileSpreadsheet, FileText, CheckCircle2, Loader2, X } from 'lucide-react';
import type { DropZoneId, UploadedFile } from '@/lib/data';

interface DropZoneProps {
  id: DropZoneId;
  label: string;
  hint: string;
  accept: string;
  icon: 'payment' | 'cargo';
  onFile: (id: DropZoneId, file: UploadedFile) => void;
  file: UploadedFile | null;
  parsing: boolean;
}

function DropZone({ id, label, hint, accept, icon, onFile, file, parsing }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (f: File) => {
      onFile(id, { name: f.name, size: f.size, rows: 0 });
    },
    [id, onFile],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handleFile(f);
      }}
      onClick={() => !parsing && !file && inputRef.current?.click()}
      className={[
        'group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-10',
        dragging
          ? 'border-brand-400 bg-brand-500/10 scale-[1.01] shadow-glow-brand'
          : 'border-white/10 bg-ink-850/60 hover:border-white/20 hover:bg-ink-800/60',
        file ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {/* Icon */}
      <div
        className={[
          'relative grid h-16 w-16 place-items-center rounded-2xl transition-all duration-300',
          icon === 'payment'
            ? 'bg-gradient-to-br from-brand-400/20 to-brand-600/10 ring-1 ring-brand-400/30'
            : 'bg-gradient-to-br from-emerald2-400/20 to-emerald2-600/10 ring-1 ring-emerald2-400/30',
          dragging && 'scale-110',
        ].join(' ')}
      >
        {parsing ? (
          <Loader2 className="h-7 w-7 animate-spin text-brand-300" />
        ) : file ? (
          <CheckCircle2 className="h-7 w-7 text-emerald2-400" />
        ) : icon === 'payment' ? (
          <FileText className="h-7 w-7 text-brand-300" />
        ) : (
          <FileSpreadsheet className="h-7 w-7 text-emerald2-400" />
        )}
      </div>

      {/* Content */}
      {parsing ? (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Parsing file…</p>
          <p className="text-xs text-slate-400">Matching rows</p>
        </div>
      ) : file ? (
        <div className="w-full space-y-2">
          <div className="flex items-center justify-center gap-2">
            <p className="max-w-[200px] truncate text-sm font-semibold text-white">{file.name}</p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald2-500/10 px-3 py-1 text-xs font-medium text-emerald2-400 ring-1 ring-emerald2-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Uploaded
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFile(id, null as never);
            }}
            className="mx-auto flex items-center gap-1 text-xs text-slate-400 hover:text-red-400"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-base font-bold text-white">{label}</p>
          <p className="text-xs text-slate-400">{hint}</p>
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-brand-300 opacity-0 transition-opacity group-hover:opacity-100">
            <UploadCloud className="h-3.5 w-3.5" />
            Drag & drop or click
          </div>
        </div>
      )}
    </div>
  );
}

export default DropZone;
