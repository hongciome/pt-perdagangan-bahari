import React, { useState } from 'react';
import { DollarSign, ArrowLeft, ArrowUpRight, ArrowDownRight, Clock, ShieldCheck, RefreshCcw, FileText, CheckCircle2 } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function CashFlowPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('cashflow');

  // Simulasi Arus Kas & Aging
  const cashFlowSummary = {
    cashInToday: 8500000,
    cashOutToday: 4200000,
    netCashToday: 4300000,
    bankBalance: 42500000
  };

  const agingReceivables = [
    { client: 'Hotel Tentrem', current: 0, days1_30: 5750000, days31_60: 0, overdue: 0, total: 5750000 },
    { client: 'Gumaya Tower Hotel', current: 2550000, days1_30: 0, days31_60: 0, overdue: 0, total: 2550000 },
    { client: 'Awann Sewu Boutique', current: 0, days1_30: 0, days31_60: 1900000, overdue: 3500000, total: 5400000 }
  ];

  const recentTransactions = [
    { id: 'TRX-901', desc: 'Pelunasan Invoice Hotel Tentrem (BCA)', type: 'IN', amount: 5750000, time: 'Hari ini, 10:30' },
    { id: 'TRX-902', desc: 'Bayar PO Nelayan Jepara (Cash/Transfer)', type: 'OUT', amount: 3200000, time: 'Hari ini, 09:15' },
    { id: 'TRX-903', desc: 'Biaya Es & Transportasi Cold Storage', type: 'OUT', amount: 1000000, time: 'Kemarin' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <DollarSign size={24} className="text-[#2457A6]" /> CASH FLOW & FINANCIAL CONTROL
          </h1>
          <p className="text-xs text-slate-500 mt-1">Pantau uang kas aktual, umur piutang (aging), dan rekonsiliasi bank harian.</p>
        </div>
        <div className="flex bg-[#F5F7FA] p-1 rounded-xl border border-[#E5EAF0]">
          <button 
            onClick={() => setActiveTab('cashflow')} 
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'cashflow' ? 'bg-[#2457A6] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Arus Kas & Bank
          </button>
          <button 
            onClick={() => setActiveTab('aging')} 
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'aging' ? 'bg-[#2457A6] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Umur Piutang (Aging AR)
          </button>
        </div>
      </div>

      {activeTab === 'cashflow' ? (
        <div className="space-y-6">
          {/* KARTU KAS UTAMA */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Saldo Rekening Bank</p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">{formatRupiah(cashFlowSummary.bankBalance)}</p>
              <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">KlikBCA / Token Aktif</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Kas Masuk Hari Ini</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">+{formatRupiah(cashFlowSummary.cashInToday)}</p>
              <span className="text-[10px] text-slate-500 mt-2 block">Pelunasan Invoice B2B</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Kas Keluar Hari Ini</p>
              <p className="text-xl font-extrabold text-rose-600 mt-1">-{formatRupiah(cashFlowSummary.cashOutToday)}</p>
              <span className="text-[10px] text-slate-500 mt-2 block">Bayar Supplier & Operasional</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-2xs border-l-4 border-l-[#168C85]">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Arus Kas Bersih Hari Ini</p>
              <p className="text-xl font-extrabold text-[#168C85] mt-1">{formatRupiah(cashFlowSummary.netCashToday)}</p>
              <span className="text-[10px] text-[#168C85] font-bold mt-2 block">Likuiditas Aman</span>
            </div>
          </div>

          {/* TABEL REKONSILIASI KAS / TRANSAKSI TERAKHIR */}
          <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                <FileText size={16} className="text-[#2457A6]" /> Rekonsiliasi & Jurnal Arus Kas Harian
              </h3>
              <span className="text-[10px] bg-blue-50 text-[#2457A6] font-bold px-2.5 py-1 rounded">Sinkronisasi Otomatis</span>
            </div>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
                  <th className="p-3 font-bold">ID Transaksi & Keterangan</th>
                  <th className="p-3 font-bold">Waktu</th>
                  <th className="p-3 font-bold text-right">Nominal Arus Kas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-[#2457A6]">{trx.id}</p>
                      <p className="font-semibold text-slate-900">{trx.desc}</p>
                    </td>
                    <td className="p-3 text-slate-600">{trx.time}</td>
                    <td className={`p-3 text-right font-extrabold ${trx.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {trx.type === 'IN' ? `+${formatRupiah(trx.amount)}` : `-${formatRupiah(trx.amount)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* TABEL AGING PIUTANG (ACCOUNTS RECEIVABLE AGING) */
        <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
              <Clock size={16} className="text-amber-600" /> Analisis Umur Piutang (Accounts Receivable Aging)
            </h3>
            <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded">Kontrol Jatuh Tempo</span>
          </div>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
                <th className="p-3 font-bold">Nama Pelanggan (Hotel/Resto)</th>
                <th className="p-3 font-bold text-right">Belum Jatu Tempo (Current)</th>
                <th className="p-3 font-bold text-right">1 - 30 Hari</th>
                <th className="p-3 font-bold text-right">31 - 60 Hari</th>
                <th className="p-3 font-bold text-right text-rose-600">Terlambat (&gt;60 Hari)</th>
                <th className="p-3 font-bold text-right">Total Piutang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agingReceivables.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{item.client}</td>
                  <td className="p-3 text-right font-semibold text-slate-700">{formatRupiah(item.current)}</td>
                  <td className="p-3 text-right font-semibold text-slate-700">{formatRupiah(item.days1_30)}</td>
                  <td className="p-3 text-right font-semibold text-amber-600">{formatRupiah(item.days31_60)}</td>
                  <td className="p-3 text-right font-extrabold text-rose-600">{formatRupiah(item.overdue)}</td>
                  <td className="p-3 text-right font-black text-slate-900">{formatRupiah(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
