import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, TrendingUp, DollarSign, CheckCircle, Calculator, PieChart, Activity, X, FileText, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function SalesOrder({ onBack }) {
  const [selectedSO, setSelectedSO] = useState(null);

  // Simulasi Data Sales Orders
  const salesOrders = [
    { id: 'SO-202611-045', customer: 'Hotel Tentrem', date: '2026-11-04', items: 'Kerapu Macan (50kg)', totalRevenue: 5750000, status: 'DELIVERED' },
    { id: 'SO-202611-046', customer: 'Gumaya Tower Hotel', date: '2026-11-04', items: 'Kakap Merah (30kg)', totalRevenue: 2550000, status: 'PROCESSING' },
    { id: 'SO-202611-047', customer: 'Awann Sewu Boutique', date: '2026-11-03', items: 'Udang Vaname (20kg)', totalRevenue: 1900000, status: 'COMPLETED' },
  ];

  // Simulasi Database Profitability Engine (Backend Response)
  const profitabilityData = {
    'SO-202611-045': {
      revenue: 5750000,
      hppDasar: 4250000, // Harga beli bahan baku dari Nelayan (FIFO)
      costs: {
        transport: 150000,
        iceStorage: 50000,
        packaging: 45000,
        shrinkage: 105000 // Susut timbangan 1.5kg
      }
    },
    'SO-202611-046': {
      revenue: 2550000,
      hppDasar: 1800000,
      costs: {
        transport: 100000,
        iceStorage: 30000,
        packaging: 25000,
        shrinkage: 0
      }
    },
    'SO-202611-047': {
      revenue: 1900000,
      hppDasar: 1400000,
      costs: {
        transport: 75000,
        iceStorage: 20000,
        packaging: 25000,
        shrinkage: 40000
      }
    }
  };

  const handleCalculateProfit = (so) => {
    setSelectedSO({ 
      info: so, 
      metrics: profitabilityData[so.id] 
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShoppingCart size={24} className="text-[#2457A6]" /> SALES ORDERS (SO)
          </h1>
          <p className="text-xs text-slate-500 mt-1">Kelola pesanan pelanggan dan analisis margin keuntungan per transaksi.</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
            <FileText size={16} className="text-[#168C85]" /> Daftar Pesanan Aktif
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
                <th className="p-3 font-bold">No. SO & Pelanggan</th>
                <th className="p-3 font-bold">Tanggal</th>
                <th className="p-3 font-bold">Rincian Item</th>
                <th className="p-3 font-bold text-right">Nilai Pesanan (Omzet)</th>
                <th className="p-3 font-bold text-center">Status</th>
                <th className="p-3 font-bold text-center">Profitability Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {salesOrders.map((so) => (
                <tr key={so.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-[#2457A6]">{so.id}</p>
                    <p className="font-semibold text-slate-900">{so.customer}</p>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">{so.date}</td>
                  <td className="p-3 text-slate-600">{so.items}</td>
                  <td className="p-3 text-right font-extrabold text-slate-900">{formatRupiah(so.totalRevenue)}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      <CheckCircle size={12} /> {so.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleCalculateProfit(so)}
                      className="bg-slate-800 hover:bg-[#2457A6] text-white px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Calculator size={14} /> Hitung Margin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OVERLAY: ORDER PROFITABILITY ENGINE */}
      {selectedSO && (() => {
        const { metrics, info } = selectedSO;
        const totalOpsCost = metrics.costs.transport + metrics.costs.iceStorage + metrics.costs.packaging + metrics.costs.shrinkage;
        const grossProfit = metrics.revenue - metrics.hppDasar;
        const netProfit = grossProfit - totalOpsCost;
        const marginPercent = ((netProfit / metrics.revenue) * 100).toFixed(1);

        return (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
              
              {/* Header Modal */}
              <div className="bg-[#14263D] p-5 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-[#2457A6] p-2 rounded-lg">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-wide uppercase">Order Profitability Engine</h3>
                    <p className="text-[11px] text-slate-400">Analisis Margin Khusus untuk {info.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedSO(null)} className="p-1.5 bg-slate-800 hover:bg-rose-600 rounded-lg transition-colors cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              {/* Body Modal */}
              <div className="p-6 overflow-y-auto bg-[#F5F7FA] space-y-6">
                
                {/* Info Klien */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Klien</p>
                    <p className="text-lg font-extrabold text-slate-900">{info.customer}</p>
                    <p className="text-xs font-semibold text-slate-600">{info.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Nilai Faktur (Revenue)</p>
                    <p className="text-2xl font-black text-[#2457A6]">{formatRupiah(metrics.revenue)}</p>
                  </div>
                </div>

                {/* Breakdown Costs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* HPP Dasar */}
                  <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                    <p className="text-[10px] font-bold text-rose-500 uppercase flex items-center gap-1 mb-2">
                      <ArrowDownRight size={14}/> HPP Pokok (Biaya Ikan)
                    </p>
                    <p className="text-lg font-extrabold text-rose-700">-{formatRupiah(metrics.hppDasar)}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Sistem ditarik otomatis via FIFO</p>
                  </div>

                  {/* Operasional */}
                  <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm">
                    <p className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1 mb-2">
                      <ArrowDownRight size={14}/> Total Biaya Operasional & Susut
                    </p>
                    <p className="text-lg font-extrabold text-amber-700">-{formatRupiah(totalOpsCost)}</p>
                    <div className="mt-2 space-y-1 text-[10px] font-medium text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex justify-between"><span>Ongkos Kirim/Transport</span><span>{formatRupiah(metrics.costs.transport)}</span></div>
                      <div className="flex justify-between"><span>Es & Cold Storage Allocation</span><span>{formatRupiah(metrics.costs.iceStorage)}</span></div>
                      <div className="flex justify-between"><span>Packaging / Styrofoam</span><span>{formatRupiah(metrics.costs.packaging)}</span></div>
                      <div className="flex justify-between text-rose-600 font-bold"><span>Susut Timbangan (Shrinkage)</span><span>{formatRupiah(metrics.costs.shrinkage)}</span></div>
                    </div>
                  </div>
                </div>

                {/* Final Profit Calculation */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10">
                    <TrendingUp size={100} className="text-emerald-500" />
                  </div>
                  <div className="relative z-10 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-extrabold text-emerald-800 uppercase flex items-center gap-2 mb-1">
                        <CheckCircle size={16} /> Keuntungan Bersih (Net Margin)
                      </p>
                      <p className="text-3xl font-black text-emerald-600">{formatRupiah(netProfit)}</p>
                      <p className="text-xs font-semibold text-emerald-700/80 mt-1">Setelah dipotong seluruh HPP dan biaya operasional</p>
                    </div>
                    <div className="text-center bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Margin %</p>
                      <p className="text-2xl font-black text-emerald-600">{marginPercent}%</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="bg-white p-4 border-t border-[#E5EAF0] text-right">
                <button onClick={() => setSelectedSO(null)} className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg text-xs font-bold cursor-pointer">
                  Tutup Analisis
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
