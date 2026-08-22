export function downloadBlob(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function generatePaymentCsv(): string {
  const header = 'order_id,platform,transaction_date,gross_amount,commission_rate,commission_fee,gateway_fee,net_payout,currency';
  const platforms = ['Trendyol', 'Hepsiburada', 'Amazon TR'];
  const rows: string[] = [header];

  const samples: Array<{ id: string; platform: string; date: string; gross: number; rate: number }> = [
    { id: 'TYO-48213', platform: 'Trendyol', date: '2026-07-14', gross: 549.00, rate: 0.18 },
    { id: 'HB-99201', platform: 'Hepsiburada', date: '2026-07-14', gross: 325.00, rate: 0.12 },
    { id: 'AMZ-33817', platform: 'Amazon TR', date: '2026-07-13', gross: 1200.00, rate: 0.15 },
    { id: 'TYO-48190', platform: 'Trendyol', date: '2026-07-13', gross: 450.00, rate: 0.18 },
    { id: 'HB-99155', platform: 'Hepsiburada', date: '2026-07-12', gross: 782.00, rate: 0.12 },
    { id: 'TYO-48102', platform: 'Trendyol', date: '2026-07-12', gross: 380.00, rate: 0.18 },
    { id: 'AMZ-33788', platform: 'Amazon TR', date: '2026-07-11', gross: 2100.00, rate: 0.15 },
    { id: 'HB-99041', platform: 'Hepsiburada', date: '2026-07-11', gross: 613.00, rate: 0.12 },
    { id: 'TYO-48077', platform: 'Trendyol', date: '2026-07-10', gross: 499.00, rate: 0.18 },
    { id: 'AMZ-33740', platform: 'Amazon TR', date: '2026-07-10', gross: 950.00, rate: 0.15 },
    { id: 'HB-99003', platform: 'Hepsiburada', date: '2026-07-09', gross: 275.00, rate: 0.12 },
    { id: 'TYO-48001', platform: 'Trendyol', date: '2026-07-09', gross: 880.00, rate: 0.18 },
  ];

  for (const s of samples) {
    const commissionFee = +(s.gross * s.rate).toFixed(2);
    const gatewayFee = +(s.gross * 0.0099).toFixed(2);
    const hiddenFee = +(s.gross * 0.005).toFixed(2);
    const netPayout = +(s.gross - commissionFee - gatewayFee - hiddenFee).toFixed(2);
    rows.push(`${s.id},${s.platform},${s.date},${s.gross.toFixed(2)},${(s.rate * 100).toFixed(1)}%,${commissionFee.toFixed(2)},${gatewayFee.toFixed(2)},${netPayout.toFixed(2)},USD`);
  }

  return rows.join('\n');
}

export function generateCargoCsv(): string {
  const header = 'order_id,cargo_firm,shipment_date,declared_desi,charged_desi,unit_price,charged_amount,tracking_no';
  const rows: string[] = [header];

  const samples: Array<{ id: string; firm: string; date: string; declared: number; charged: number; unit: number }> = [
    { id: 'TYO-48213', firm: 'Yurtiçi', date: '2026-07-14', declared: 3, charged: 6, unit: 14.90 },
    { id: 'HB-99201', firm: 'Aras', date: '2026-07-14', declared: 2, charged: 2.5, unit: 16.00 },
    { id: 'AMZ-33817', firm: 'MNG', date: '2026-07-13', declared: 5, charged: 7, unit: 18.50 },
    { id: 'TYO-48190', firm: 'Yurtiçi', date: '2026-07-13', declared: 3, charged: 4.5, unit: 14.90 },
    { id: 'HB-99155', firm: 'Aras', date: '2026-07-12', declared: 4, charged: 5, unit: 16.00 },
    { id: 'TYO-48102', firm: 'MNG', date: '2026-07-12', declared: 2, charged: 3.5, unit: 18.50 },
    { id: 'AMZ-33788', firm: 'Yurtiçi', date: '2026-07-11', declared: 8, charged: 9.5, unit: 14.90 },
    { id: 'HB-99041', firm: 'Aras', date: '2026-07-11', declared: 3, charged: 4, unit: 16.00 },
    { id: 'TYO-48077', firm: 'Yurtiçi', date: '2026-07-10', declared: 3, charged: 4, unit: 14.90 },
    { id: 'AMZ-33740', firm: 'MNG', date: '2026-07-10', declared: 4, charged: 5.5, unit: 18.50 },
    { id: 'HB-99003', firm: 'Aras', date: '2026-07-09', declared: 1, charged: 2, unit: 16.00 },
    { id: 'TYO-48001', firm: 'MNG', date: '2026-07-09', declared: 5, charged: 6, unit: 18.50 },
  ];

  for (const s of samples) {
    const chargedAmount = +(s.charged * s.unit).toFixed(2);
    const tracking = `TR${Math.floor(1000000 + Math.random() * 9000000)}`;
    rows.push(`${s.id},${s.firm},${s.date},${s.declared},${s.charged},${s.unit.toFixed(2)},${chargedAmount.toFixed(2)},${tracking}`);
  }

  return rows.join('\n');
}
