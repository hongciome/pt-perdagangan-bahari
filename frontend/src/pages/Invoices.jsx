import React, { useEffect, useState } from 'react';
import { CreditCard, ArrowLeft, CheckCircle, MessageSquare, AlertCircle, Clock, FileText } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function Invoices({ onBack }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Mencoba mengambil data dari backend, jika gagal atau kosong, gunakan data simulasi
    fetch('/api/invoices')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setInvoices(data);
        } else {
          throw new Error("Gunakan data simulasi");
        }
      })
      .catch(() => {
        // DATA SIMULASI PIUTANG YANG BENAR
        setInvoices([
          { id: 'INV-202611-045', customer: 'Hotel Tentrem', date: '2026-11-04', dueDate: '2026-11-18', totalAmount: 5750000, status: 'UNPAID' },
          { id: 'INV-202611-046', customer: 'Gumaya Tower Hotel', date: '2026-11-04', dueDate: '2026-11-18', totalAmount: 2550000, status: 'PAID' },
          { id: 'INV-202611-047', customer: 'Awann Sewu Boutique', date: '2026-11-03', dueDate: '2026-11-17', totalAmount: 1900000, status: 'UNPAID' },
        ]);
      });
  }, []);

  const handleSendWhatsApp = (inv) => {
    const phone = prompt(`Masukkan nomor WhatsApp PIC / Keuangan ${inv.customer} (contoh: 08123456789):`, "08");
    if (!phone) return;

    const message = `Halo Tim Keuangan ${inv.customer},\n\nBerikut adalah pengingat tagihan (Invoice) dari PT Bahari Koh Ahong (SEAFOOD OS):\n\nNo. Invoice: ${inv.id}\nTanggal Terbit: ${inv.date}\nTotal Tagihan: ${formatRupiah(inv.totalAmount)}\nStatus: ${inv.status}\nJatuh Tempo: ${inv.dueDate}\n\nMohon bantuan untuk memproses pelunasan sebelum tanggal jatuh tempo. Terima kasih atas kerja sama yang baik.`;
    
    // Membuka WhatsApp Web / API langsung secara instan
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone.replace(/^0/, '62')}?text=${encodedMessage}`, '_blank');
  };

  const totalPiutang = invoices.filter(i => i.status === 'UNPAID').reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <CreditCard size={24} className="text-[#2457A6]" /> KEUANGAN & PIUTANG (AR)
          </h1>
          <p className="text-xs text-slate-500 mt-1">Kelola penagihan hotel dan pantau status pembayaran invoice Anda.</p>
        </div>
        <div className="bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 shadow-sm text-right">
          <p className="text-[10px] font-bold text-rose-500 uppercase">Total Piutang Belum Lunas</p>
          <p className="text-xl font-extrabold text-rose-700">{formatRupiah(totalPiutang)}</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
            <FileText size={16} className="text-[#168C85]" /> Daftar Tagihan Invoice B2B
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
                <th className="p-3 font-bold">No. Invoice & Klien</th>
                <th className="p-3 font-bold">Tanggal & Jatuh Tempo</th>
                <th className="p-3 font-bold text-right">Total Tagihan</th>
                <th className="p-3 font-bold text-center">Status</th>
                <th className="p-3 font-bold text-center">Aksi Penagihan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <p className="font-bold text-[#2457A6]">{inv.id}</p>
                    <p className="font-semibold text-slate-900">{inv.customer}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-slate-700">{inv.date}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5 flex items-center gap-1">
                      <Clock size={12}/> Tempo: {inv.dueDate}
                    </p>
                  </td>
                  <td className="p-3 text-right font-extrabold text-slate-900">
                    {formatRupiah(inv.totalAmount)}
                  </td>
                  <td className="p-3 text-center">
                    {inv.status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                        <CheckCircle size={12} /> LUNAS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px] animate-pulse">
                        <AlertCircle size={12} /> BELUM LUNAS
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleSendWhatsApp(inv)}
                      className="bg-[#168C85] hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <MessageSquare size={14} /> Tagih via WA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
