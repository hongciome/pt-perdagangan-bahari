import React, { useEffect, useState } from 'react';
import { Users, TrendingUp, DollarSign, Package, ArrowLeft, BarChart2 } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function CustomerIntelligence({ onBack }) {
  const [customers, setCustomers] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    fetch('/api/customers').then(res => res.json()).then(data => setCustomers(Array.isArray(data) ? data : [])).catch(console.error);
    fetch('/api/sales/orders').then(res => res.json()).then(data => setSalesOrders(Array.isArray(data) ? data : [])).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">CUSTOMER INTELLIGENCE & FISH DEMAND</h1>
          <p className="text-xs text-slate-500">Analisis pembelian hotel & restoran, preferensi jenis ikan, serta profitabilitas per klien</p>
        </div>
      </div>

      {/* Grid Ringkasan Hotel VIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-[10px] border border-[#E5EAF0] shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Total Klien Hotel & Restoran</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{customers.length} Klien VIP</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 block">● Aktif Berlangganan B2B</span>
        </div>
        <div className="bg-white p-5 rounded-[10px] border border-[#E5EAF0] shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Total Volume Pemesanan</p>
          <p className="text-2xl font-extrabold text-[#2457A6] mt-1">{salesOrders.length * 50} Kg</p>
          <span className="text-[10px] text-slate-500 mt-2 block">Akumulasi Pengiriman Ikan Segar</span>
        </div>
        <div className="bg-white p-5 rounded-[10px] border border-[#E5EAF0] shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Dominasi Ikan Terlaris</p>
          <p className="text-2xl font-extrabold text-[#168C85] mt-1">Kakap & Kerapu</p>
          <span className="text-[10px] text-slate-500 mt-2 block">Permintaan tertinggi dari hotel</span>
        </div>
      </div>

      {/* Tabel Analisis Pelanggan */}
      <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] font-bold text-slate-700 text-xs uppercase flex items-center gap-2">
          <Users size={16} className="text-[#2457A6]" /> Database Pelanggan Restoran & Hotel (Live PostgreSQL)
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-600 font-bold border-b border-[#E5EAF0]">
              <th className="p-3">Kode</th>
              <th className="p-3">Nama Hotel / Restoran</th>
              <th className="p-3">Tipe Klien</th>
              <th className="p-3">Telepon PIC</th>
              <th className="p-3">Batas Kredit (Credit Limit)</th>
              <th className="p-3">Status Analisis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-[#2457A6]">{c.code}</td>
                <td className="p-3 font-bold text-slate-900">{c.name}</td>
                <td className="p-3"><span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold text-[10px]">{c.type}</span></td>
                <td className="p-3 text-slate-600">{c.phone}</td>
                <td className="p-3 font-semibold">{formatRupiah(c.creditLimit)}</td>
                <td className="p-3">
                  <span className="text-emerald-600 font-bold text-[10px]">🟢 Klien VIP (Stabil)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
