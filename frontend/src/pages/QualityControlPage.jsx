import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle, Thermometer, FileText, Package } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function QualityControlPage({ onBack }) {
  const [qcList, setQcList] = useState([
    { id: 'QC-001', supplier: 'Nelayan Jepara', item: 'Kerapu Macan', declaredQty: '150 kg', temp: '-2.5°C', status: 'PENDING', date: 'Hari ini, 06:30' },
    { id: 'QC-002', supplier: 'TPI Tambak Lorok', item: 'Kakap Merah', declaredQty: '100 kg', temp: '-1.8°C', status: 'APPROVED', date: 'Kemarin' },
    { id: 'QC-003', supplier: 'Tambak Kendal', item: 'Udang Vaname', declaredQty: '80 kg', temp: '-15°C', status: 'APPROVED', date: '2 Nov 2026' },
  ]);

  const handleApproveQC = (id) => {
    setQcList(qcList.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
    alert(`QC Berhasil Diverifikasi! Muatan ${id} disetujui masuk ke Cold Storage.`);
  };

  const handleRejectQC = (id) => {
    const reason = prompt("Masukkan alasan penolakan/catatan penurunan grade:");
    if (!reason) return;
    setQcList(qcList.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item));
    alert(`Muatan ${id} ditolak/diretur ke supplier dengan alasan: ${reason}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#168C85]" /> QUALITY CONTROL (QC) & COLD CHAIN
          </h1>
          <p className="text-xs text-slate-500 mt-1">Verifikasi suhu muatan, kelayakan fisik, dan validasi timbangan kedatangan dari supplier/nelayan.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex justify-between items-center">
          <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
            <Package size={16} className="text-[#168C85]" /> Antrean Verifikasi Muatan Masuk
          </h3>
          <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded">Standar Suhu: &lt; -2°C</span>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
              <th className="p-3 font-bold">ID QC & Supplier</th>
              <th className="p-3 font-bold">Jenis Ikan & Berat</th>
              <th className="p-3 font-bold text-center">Suhu Muatan (Cold Chain)</th>
              <th className="p-3 font-bold text-center">Status Verifikasi</th>
              <th className="p-3 font-bold text-center">Aksi QC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {qcList.map((qc) => (
              <tr key={qc.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-3">
                  <p className="font-bold text-[#2457A6]">{qc.id}</p>
                  <p className="font-semibold text-slate-900">{qc.supplier}</p>
                  <span className="text-[9px] text-slate-400">{qc.date}</span>
                </td>
                <td className="p-3">
                  <p className="font-bold text-slate-800">{qc.item}</p>
                  <p className="text-[11px] text-slate-500">Deklarasi: {qc.declaredQty}</p>
                </td>
                <td className="p-3 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-bold text-xs">
                    <Thermometer size={14} className="text-[#168C85]" /> {qc.temp}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {qc.status === 'APPROVED' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      <CheckCircle2 size={12} /> LOLOS QC
                    </span>
                  ) : qc.status === 'REJECTED' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-100 text-rose-800 rounded-full font-bold text-[10px]">
                      <AlertTriangle size={12} /> DITOLAK / RETUR
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
                      MENUNGGU CEK
                    </span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {qc.status === 'PENDING' ? (
                    <div className="flex justify-center gap-1.5">
                      <button 
                        onClick={() => handleApproveQC(qc.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer"
                      >
                        Setujui
                      </button>
                      <button 
                        onClick={() => handleRejectQC(qc.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer"
                      >
                        Tolak
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Selesai</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
