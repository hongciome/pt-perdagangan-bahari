import React, { useEffect, useState } from 'react';
import { Truck, ShieldCheck, ArrowLeft, Plus } from 'lucide-react';

export default function SuppliersPage({ onBack }) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch('/api/suppliers')
      .then(res => res.json())
      .then(data => setSuppliers(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900">SUPPLIER & NELAYAN MITRA</h1>
          <p className="text-xs text-slate-500">Kelola jaringan pasokan komoditas ikan segar dari berbagai daerah asal</p>
        </div>
      </div>

      <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] font-bold text-slate-700 text-xs uppercase flex items-center gap-2">
          <Truck size={16} className="text-[#168C85]" /> Daftar Supplier & Daerah Asal Muatan
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-600 font-bold border-b border-[#E5EAF0]">
              <th className="p-3">Kode</th>
              <th className="p-3">Nama Supplier</th>
              <th className="p-3">Kontak PIC</th>
              <th className="p-3">Telepon</th>
              <th className="p-3">Daerah Asal</th>
              <th className="p-3">Rekening Bank</th>
              <th className="p-3">Status Mitra</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-[#2457A6]">{s.code}</td>
                <td className="p-3 font-bold text-slate-900">{s.name}</td>
                <td className="p-3 text-slate-600">{s.contactPerson}</td>
                <td className="p-3">{s.phone}</td>
                <td className="p-3 font-semibold text-[#168C85]">{s.originRegion}</td>
                <td className="p-3 text-slate-500">{s.bankAccount}</td>
                <td className="p-3">
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1 w-fit">
                    <ShieldCheck size={12} /> Mitra Utama
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
