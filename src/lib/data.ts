export type DropZoneId = 'payment' | 'cargo';

export type FileState = 'empty' | 'dragging' | 'parsing' | 'ready';

export interface UploadedFile {
  name: string;
  size: number;
  rows: number;
}

export interface DiscrepancyRow {
  id: string;
  orderId: string;
  platform: string;
  platformDate: string;
  expectedCost: number;
  chargedCost: number;
  type: 'commission' | 'desi' | 'hidden_fee';
  cargoFirm: string;
  status: 'pending' | 'inquired';
}

export interface SummaryMetrics {
  totalOvercharged: number;
  discrepancies: number;
  desiMismatches: number;
  hiddenFees: number;
}

export const SIM_ROWS: DiscrepancyRow[] = [
  { id: 'r1', orderId: 'TYO-48213', platform: 'Trendyol', platformDate: '2026-07-14', expectedCost: 54.90, chargedCost: 89.90, type: 'desi', cargoFirm: 'Yurtiçi', status: 'pending' },
  { id: 'r2', orderId: 'HB-99201', platform: 'Hepsiburada', platformDate: '2026-07-14', expectedCost: 32.50, chargedCost: 41.00, type: 'commission', cargoFirm: 'Aras', status: 'pending' },
  { id: 'r3', orderId: 'AMZ-33817', platform: 'Amazon TR', platformDate: '2026-07-13', expectedCost: 120.00, chargedCost: 148.50, type: 'desi', cargoFirm: 'MNG', status: 'pending' },
  { id: 'r4', orderId: 'TYO-48190', platform: 'Trendyol', platformDate: '2026-07-13', expectedCost: 45.00, chargedCost: 67.50, type: 'hidden_fee', cargoFirm: 'Yurtiçi', status: 'pending' },
  { id: 'r5', orderId: 'HB-99155', platform: 'Hepsiburada', platformDate: '2026-07-12', expectedCost: 78.20, chargedCost: 96.80, type: 'commission', cargoFirm: 'Aras', status: 'pending' },
  { id: 'r6', orderId: 'TYO-48102', platform: 'Trendyol', platformDate: '2026-07-12', expectedCost: 38.00, chargedCost: 52.00, type: 'desi', cargoFirm: 'MNG', status: 'pending' },
  { id: 'r7', orderId: 'AMZ-33788', platform: 'Amazon TR', platformDate: '2026-07-11', expectedCost: 210.00, chargedCost: 245.90, type: 'hidden_fee', cargoFirm: 'Yurtiçi', status: 'pending' },
  { id: 'r8', orderId: 'HB-99041', platform: 'Hepsiburada', platformDate: '2026-07-11', expectedCost: 61.30, chargedCost: 74.10, type: 'commission', cargoFirm: 'Aras', status: 'pending' },
  { id: 'r9', orderId: 'TYO-48077', platform: 'Trendyol', platformDate: '2026-07-10', expectedCost: 49.90, chargedCost: 63.40, type: 'desi', cargoFirm: 'Yurtiçi', status: 'pending' },
  { id: 'r10', orderId: 'AMZ-33740', platform: 'Amazon TR', platformDate: '2026-07-10', expectedCost: 95.00, chargedCost: 112.00, type: 'hidden_fee', cargoFirm: 'MNG', status: 'pending' },
  { id: 'r11', orderId: 'HB-99003', platform: 'Hepsiburada', platformDate: '2026-07-09', expectedCost: 27.50, chargedCost: 38.50, type: 'commission', cargoFirm: 'Aras', status: 'pending' },
  { id: 'r12', orderId: 'TYO-48001', platform: 'Trendyol', platformDate: '2026-07-09', expectedCost: 88.00, chargedCost: 104.90, type: 'desi', cargoFirm: 'MNG', status: 'pending' },
];

export const SUMMARY: SummaryMetrics = {
  totalOvercharged: 4820,
  discrepancies: 34,
  desiMismatches: 18,
  hiddenFees: 940,
};

export function formatUSD(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
