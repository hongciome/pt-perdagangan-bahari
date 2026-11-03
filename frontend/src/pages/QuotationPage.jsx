import React, { useState, useEffect } from 'react';
import { FileText, Plus, ArrowLeft, Printer, CheckCircle } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function QuotationPage({ onBack }) {
  const [quotations, setQuotations] = useState([
    { id: '1', quoteNumber: 'QT-202611-001', customerName: 'Hotel Tentrem Semarang', date: '2026-11-01', totalEstimate: 4500000, status: 'APPROVED' },
    { id: '2', quoteNumber: 'QT-202611-002', customerName: 'PO Semarang Resto', date: '2026-11-03', totalEstimate: 2800000, status: 'SENT' }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">QUOTATION (PENAWARAN HARGA)</h1>
          <p className="text-xs text-slate-500">Kelola draf penawaran harga komoditas ikan segar untuk klien VIP hotel dan restoran</p>
        </div>
        <button 
          onClick={() => alert('Fitur buat draf penawaran baru aktif.')}
          className="bg-[#2457A6] text-white px-4 py-2 rounded-[10px] text-xs font-semibold flex items-center gap-2 shadow-2xs hover:bg-[#1d4484]"
        >
          <Plus size={16} /> Buat Quotation Baru
        </button>
      </div>

      <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] font-bold text-slate-700 text-xs uppercase flex items-center gap-2">
          <FileText size={16} className="text-[#2457A6]" /> Daftar Dokumen Quotation B2B
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-600 font-bold border-b border-[#E5EAF0]">
              <th className="p-3">No. Quotation</th>
              <th className="p-3">Nama Klien (Hotel / Restoran)</th>
              <th className="p-3">Tanggal Dibuat</th>
              <th className="p-3">Estimasi Nilai</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Aksi Dokumen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotations.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-[#2457A6]">{q.quoteNumber}</td>
                <td className="p-3 font-bold text-slate-900">{q.customerName}</td>
                <td className="p-3 text-slate-600">{q.date}</td>
                <td className="p-3 font-semibold text-[#168C85]">{formatRupiah(q.totalEstimate)}</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px] flex items-center gap-1 w-fit">
                    <CheckCircle size={12} /> {q.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => alert(`Mencetak dokumen quotation ${q.quoteNumber}`)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold inline-flex items-center gap-1"
                  >
                    <Printer size={13} /> Cetak PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
