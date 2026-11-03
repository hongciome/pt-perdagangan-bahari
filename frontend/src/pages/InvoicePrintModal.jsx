import React from 'react';
import { Printer, X, Anchor, CheckCircle2 } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function InvoicePrintModal({ invoice, onClose }) {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Modal (Tidak ikut tercetak) */}
        <div className="bg-[#14263D] p-4 flex justify-between items-center text-white print:hidden">
          <div className="flex items-center gap-2">
            <Anchor size={20} className="text-[#2457A6]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wide">Pratinjau Dokumen Resmi</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="bg-[#168C85] hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <Printer size={14} /> Cetak / Print PDF
            </button>
            <button onClick={onClose} className="p-1.5 bg-slate-800 hover:bg-rose-600 rounded-lg transition-colors cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* KERTAS FAKTUR / SURAT JALAN (Area yang akan dicetak) */}
        <div className="p-8 overflow-y-auto bg-white space-y-6 text-slate-800 font-sans">
          
          {/* Kop Surat */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-wide">PT PERDAGANGAN BAHARI KOH AHONG</h1>
              <p className="text-xs text-slate-500 font-medium">Pusat Grosir & Supplier Komoditas Seafood Segar B2B</p>
              <p className="text-[10px] text-slate-400 mt-1">Semarang, Jawa Tengah • Hotline: 0812-3456-7890</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-slate-100 text-slate-900 rounded font-bold text-xs border border-slate-300 uppercase">
                FAKTUR / INVOICE
              </span>
              <p className="text-xs font-extrabold text-[#2457A6] mt-2">{invoice.id}</p>
              <p className="text-[10px] text-slate-500">Tanggal: {invoice.date}</p>
            </div>
          </div>

          {/* Info Pelanggan */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Kepada Yth:</p>
              <p className="font-extrabold text-slate-900 text-sm mt-0.5">{invoice.customer}</p>
              <p className="text-slate-600">Bagian Purchasing & Dapur Utama</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Jatuh Tempo:</p>
              <p className="font-bold text-rose-600 mt-0.5">{invoice.dueDate || '14 Hari dari terbit'}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">Status: {invoice.status}</p>
            </div>
          </div>

          {/* Tabel Rincian Pesanan */}
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                <th className="p-2.5 font-bold">Deskripsi / Jenis Seafood</th>
                <th className="p-2.5 font-bold text-center">Kuantitas</th>
                <th className="p-2.5 font-bold text-right">Harga Satuan</th>
                <th className="p-2.5 font-bold text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Ikan Kerapu Macan Segar (Grade A)</td>
                <td className="p-2.5 text-center">50 Kg</td>
                <td className="p-2.5 text-right">{formatRupiah(115000)}</td>
                <td className="p-2.5 text-right font-bold">{formatRupiah(invoice.totalAmount)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total Pembayaran */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-t border-slate-200">
                <span className="font-bold text-slate-600">Total Tagihan:</span>
                <span className="font-black text-slate-900 text-sm">{formatRupiah(invoice.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Tanda Tangan */}
          <div className="grid grid-cols-2 pt-12 text-center text-xs">
            <div>
              <p className="text-slate-500 mb-16">Penerima / Purchasing Hotel</p>
              <p className="font-bold border-b border-slate-400 pb-1 inline-block px-8">(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)</p>
            </div>
            <div>
              <p className="text-slate-500 mb-16">Hormat Kami,</p>
              <p className="font-bold text-[#2457A6]">PT Perdagangan Bahari Koh Ahong</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
