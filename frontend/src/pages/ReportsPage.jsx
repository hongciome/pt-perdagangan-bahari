import React, { useState } from 'react';
import { PieChart, ArrowLeft, Download, TrendingUp, DollarSign, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function ReportsPage({ onBack }) {
  const [selectedMonth, setSelectedMonth] = useState('November 2026');

  // Simulasi Laporan Keuangan Bulanan
  const financialReport = {
    month: 'November 2026',
    totalRevenue: 85500000,
    totalHpp: 59850000, // Harga pokok pembelian ikan (FIFO)
    grossProfit: 25650000,
    operationalExpenses: {
      transport: 3500000,
      iceStorage: 1200000,
      packaging: 950000,
      shrinkageLoss: 800000,
      salaries: 8500000
    },
    taxAndOther: 500000
  };

  const totalOpsCost = Object.values(financialReport.operationalExpenses).reduce((a, b) => a + b, 0);
  const netProfit = financialReport.grossProfit - totalOpsCost - financialReport.taxAndOther;
  const netMarginPercent = ((netProfit / financialReport.totalRevenue) * 100).toFixed(1);

  const handleExportPDF = () => {
    alert(`Laporan Keuangan periode ${selectedMonth} berhasil diexport ke format PDF (Siap cetak/arsip).`);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <PieChart size={24} className="text-[#2457A6]" /> LAPORAN KEUANGAN & LABA RUGI
          </h1>
          <p className="text-xs text-slate-500 mt-1">Ringkasan performa finansial bulanan PT Bahari Koh Ahong (SEAFOOD OS).</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 text-xs rounded-xl border border-[#E5EAF0] bg-white font-bold text-slate-700 shadow-sm"
          >
            <option value="November 2026">November 2026</option>
            <option value="Oktober 2026">Oktober 2026 (Arsip)</option>
            <option value="September 2026">September 2026 (Arsip)</option>
          </select>
          <button 
            onClick={handleExportPDF}
            className="bg-[#2457A6] hover:bg-[#1d4484] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download size={14} /> Export Laporan PDF
          </button>
        </div>
      </div>

      {/* RINGKASAN KARTU KINERJA */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Omzet (Revenue)</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatRupiah(financialReport.totalRevenue)}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">● Periode Aktif {selectedMonth}</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Laba Kotor (Gross Profit)</p>
          <p className="text-2xl font-black text-[#168C85] mt-1">{formatRupiah(financialReport.grossProfit)}</p>
          <span className="text-[10px] text-slate-500 mt-2 block">Setelah dikurangi HPP bahan baku</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs border-l-4 border-l-[#2457A6]">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Laba Bersih (Net Profit)</p>
          <p className="text-2xl font-black text-[#2457A6] mt-1">{formatRupiah(netProfit)}</p>
          <span className="text-[10px] text-[#2457A6] font-bold mt-2 block">Net Margin: {netMarginPercent}%</span>
        </div>
      </div>

      {/* DETAIL LAPORAN LABA RUGI (INCOME STATEMENT) */}
      <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
            <FileText size={16} className="text-[#2457A6]" /> Laporan Laba Rugi Komprehensif — {selectedMonth}
          </h3>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Audited by SEAFOOD OS Engine</span>
        </div>
        
        <div className="p-6 space-y-6 text-xs">
          {/* Pendapatan */}
          <div>
            <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2 mb-2">
              <span>1. PENDAPATAN USAHA (REVENUE)</span>
              <span className="text-sm">{formatRupiah(financialReport.totalRevenue)}</span>
            </div>
            <div className="pl-4 space-y-1 text-slate-600">
              <div className="flex justify-between"><span>Penjualan Hotel & Restoran B2B</span><span>{formatRupiah(financialReport.totalRevenue * 0.75)}</span></div>
              <div className="flex justify-between"><span>Penjualan Grosir / Lainnya</span><span>{formatRupiah(financialReport.totalRevenue * 0.25)}</span></div>
            </div>
          </div>

          {/* HPP */}
          <div>
            <div className="flex justify-between font-bold text-rose-700 border-b border-slate-200 pb-2 mb-2">
              <span>2. HARGA POKOK PENJUALAN (HPP / COGS)</span>
              <span className="text-sm">-{formatRupiah(financialReport.totalHpp)}</span>
            </div>
            <div className="pl-4 space-y-1 text-slate-600">
              <div className="flex justify-between"><span>Pembelian Ikan dari Nelayan & Supplier (Metode FIFO)</span><span>-{formatRupiah(financialReport.totalHpp)}</span></div>
            </div>
          </div>

          {/* Laba Kotor */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 flex justify-between font-black text-teal-900 text-sm">
            <span>LABA KOTOR (GROSS PROFIT)</span>
            <span>{formatRupiah(financialReport.grossProfit)}</span>
          </div>

          {/* Biaya Operasional */}
          <div>
            <div className="flex justify-between font-bold text-amber-700 border-b border-slate-200 pb-2 mb-2">
              <span>3. BIAYA OPERASIONAL & PENYUSUTAN</span>
              <span className="text-sm">-{formatRupiah(totalOpsCost)}</span>
            </div>
            <div className="pl-4 space-y-2 text-slate-600">
              <div className="flex justify-between"><span>Biaya Transportasi & Distribusi</span><span>-{formatRupiah(financialReport.operationalExpenses.transport)}</span></div>
              <div className="flex justify-between"><span>Biaya Es & Operasional Cold Storage</span><span>-{formatRupiah(financialReport.operationalExpenses.iceStorage)}</span></div>
              <div className="flex justify-between"><span>Kemasan (Styrofoam / Plastik Vakum)</span><span>-{formatRupiah(financialReport.operationalExpenses.packaging)}</span></div>
              <div className="flex justify-between"><span>Kerugian Susut Timbangan (Shrinkage Loss)</span><span>-{formatRupiah(financialReport.operationalExpenses.shrinkageLoss)}</span></div>
              <div className="flex justify-between"><span>Gaji Staf & Operasional Gudang</span><span>-{formatRupiah(financialReport.operationalExpenses.salaries)}</span></div>
            </div>
          </div>

          {/* Pajak / Lainnya */}
          <div>
            <div className="flex justify-between font-bold text-slate-700 border-b border-slate-200 pb-2 mb-2">
              <span>4. BEBAN LAIN-LAIN & PAJAK</span>
              <span className="text-sm">-{formatRupiah(financialReport.taxAndOther)}</span>
            </div>
          </div>

          {/* LABA BERSIH FINAL */}
          <div className="bg-[#14263D] text-white p-5 rounded-xl shadow-md flex justify-between items-center">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Hasil Akhir Laba Bersih (Net Income)</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">{formatRupiah(netProfit)}</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-bold text-xs border border-emerald-500/30">
                SEHAT & PROFITABLE
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
