import React, { useState } from 'react';
import { Package, ArrowLeft, Thermometer, Clock, AlertTriangle, CheckCircle, ArrowDownToLine, Database, Info, FileText } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function Inventory({ onBack }) {
  const [batches, setBatches] = useState([
    { id: 'BATCH-261101-01', item: 'Ikan Kerapu Macan', supplier: 'Nelayan Jepara', entryDate: '2026-11-01', ageDays: 3, initialQty: 100, currentQty: 40, temp: '-2.5°C' },
    { id: 'BATCH-261103-02', item: 'Ikan Kerapu Macan', supplier: 'Nelayan Jepara', entryDate: '2026-11-03', ageDays: 1, initialQty: 150, currentQty: 150, temp: '-2.0°C' },
    { id: 'BATCH-261104-01', item: 'Ikan Kakap Merah', supplier: 'TPI Tambak Lorok', entryDate: '2026-11-04', ageDays: 0, initialQty: 200, currentQty: 200, temp: '-2.2°C' },
    { id: 'BATCH-261028-03', item: 'Udang Vaname', supplier: 'Tambak Kendal', entryDate: '2026-10-28', ageDays: 7, initialQty: 80, currentQty: 15, temp: '-18°C' },
  ]);

  const [allocateFish, setAllocateFish] = useState('Ikan Kerapu Macan');
  const [allocateQty, setAllocateQty] = useState('');
  
  // State baru untuk mengontrol Pop-up Modal modern
  const [allocationResult, setAllocationResult] = useState(null);

  const handleFIFOAllocation = (e) => {
    e.preventDefault();
    let qtyToTake = parseFloat(allocateQty);
    if (isNaN(qtyToTake) || qtyToTake <= 0) return alert('Masukkan jumlah kilogram yang valid.');

    const totalAvailable = batches.filter(b => b.item === allocateFish).reduce((sum, b) => sum + b.currentQty, 0);
    if (qtyToTake > totalAvailable) {
      return alert(`Gagal! Total stok ${allocateFish} yang tersedia hanya ${totalAvailable} kg.`);
    }

    let remainingToTake = qtyToTake;
    let allocationLog = [];
    let updatedBatches = [...batches];
    
    let targetBatches = updatedBatches
      .filter(b => b.item === allocateFish && b.currentQty > 0)
      .sort((a, b) => new Date(a.entryDate) - new Date(b.entryDate));

    for (let batch of targetBatches) {
      if (remainingToTake <= 0) break;
      
      let takeFromThis = Math.min(batch.currentQty, remainingToTake);
      batch.currentQty -= takeFromThis; 
      remainingToTake -= takeFromThis;  
      
      allocationLog.push(`Diambil ${takeFromThis} kg dari ${batch.id} (Tiba: ${batch.entryDate}) - Sisa di rak: ${batch.currentQty} kg`);
    }

    setBatches(updatedBatches);
    setAllocateQty('');
    
    // Memicu Modal Modern, bukan window.alert() bawaan browser
    setAllocationResult({
      fish: allocateFish,
      qty: qtyToTake,
      logs: allocationLog
    });
  };

  const totalStokKeseluruhan = batches.reduce((sum, b) => sum + b.currentQty, 0);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-end border-b border-[#E5EAF0] pb-4">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-[#2457A6] hover:underline mb-1 flex items-center gap-1 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Database size={24} className="text-[#2457A6]" /> COLD STORAGE & FIFO ENGINE
          </h1>
          <p className="text-xs text-slate-500 mt-1">Lacak batch, suhu, dan alokasikan stok otomatis menggunakan metode First-In First-Out.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-[#E5EAF0] shadow-sm text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Muatan Aktif</p>
          <p className="text-xl font-extrabold text-[#168C85]">{totalStokKeseluruhan} <span className="text-sm">kg</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-5 rounded-[10px] border border-[#E5EAF0] shadow-2xs sticky top-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ArrowDownToLine size={18} className="text-[#2457A6]" /> Simulasi Tarik Stok (FIFO)
            </h3>
            <div className="bg-blue-50 text-blue-800 text-[11px] p-3 rounded-lg mb-4 flex gap-2 items-start">
              <Info size={14} className="mt-0.5 shrink-0" />
              <p>Sistem akan otomatis mengambil stok dari <b>Batch Paling Tua</b> terlebih dahulu untuk mencegah ikan rusak.</p>
            </div>
            
            <form onSubmit={handleFIFOAllocation} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pilih Jenis Ikan</label>
                <select 
                  value={allocateFish} 
                  onChange={(e) => setAllocateFish(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E5EAF0] focus:outline-none focus:border-[#2457A6] bg-[#F5F7FA]"
                >
                  <option value="Ikan Kerapu Macan">Ikan Kerapu Macan</option>
                  <option value="Ikan Kakap Merah">Ikan Kakap Merah</option>
                  <option value="Udang Vaname">Udang Vaname</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Jumlah Tarik (Kg)</label>
                <input 
                  type="number" 
                  placeholder="Ketik jumlah..." 
                  value={allocateQty}
                  onChange={(e) => setAllocateQty(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E5EAF0] focus:outline-none focus:border-[#2457A6] bg-[#F5F7FA]"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-[#2457A6] hover:bg-[#1d4484] text-white rounded-lg text-xs font-bold shadow-md transition-colors cursor-pointer"
              >
                Tarik Stok (Auto-FIFO)
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[10px] border border-[#E5EAF0] shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-[#E5EAF0] flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2">
                <Package size={16} className="text-[#168C85]" /> Daftar Rak & Batch Tersedia
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-600 border-b border-[#E5EAF0]">
                    <th className="p-3 font-bold">No. Batch & Item</th>
                    <th className="p-3 font-bold">Tiba (Umur)</th>
                    <th className="p-3 font-bold text-center">Suhu QC</th>
                    <th className="p-3 font-bold text-right">Sisa Stok</th>
                    <th className="p-3 font-bold text-center">Status Rak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batches.map((b) => (
                    <tr key={b.id} className={`hover:bg-slate-50 transition-colors ${b.currentQty === 0 ? 'opacity-50 bg-slate-50' : ''}`}>
                      <td className="p-3">
                        <p className="font-bold text-[#2457A6]">{b.id}</p>
                        <p className="font-semibold text-slate-800">{b.item}</p>
                        <p className="text-[10px] text-slate-500">{b.supplier}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-slate-700">{b.entryDate}</p>
                        <p className={`text-[10px] font-bold mt-1 flex items-center gap-1 ${b.ageDays >= 4 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          <Clock size={12} /> Umur: {b.ageDays} Hari
                        </p>
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded font-semibold text-[10px]">
                          <Thermometer size={12} className="text-[#168C85]"/> {b.temp}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {b.currentQty === 0 ? (
                          <span className="text-slate-400 font-bold">KOSONG</span>
                        ) : (
                          <div>
                            <span className="text-sm font-extrabold text-slate-900">{b.currentQty}</span> <span className="text-slate-500 font-medium text-[10px]">/ {b.initialQty} kg</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {b.currentQty === 0 ? (
                          <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded-full font-bold text-[10px]">
                            HABIS
                          </span>
                        ) : b.ageDays >= 7 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]">
                            <AlertTriangle size={12} /> RAWAN (TUA)
                          </span>
                        ) : b.ageDays >= 4 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-[10px]">
                            <AlertTriangle size={12} /> PRIORITAS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-[10px]">
                            <CheckCircle size={12} /> FRESH
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM MODAL POP-UP (MENGGANTIKAN ALERT BAWAAN BROWSER) */}
      {allocationResult && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-50 p-6 flex flex-col items-center border-b border-emerald-100 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">Alokasi FIFO Berhasil!</h3>
              <p className="text-sm text-slate-600 mt-1">
                Total ditarik: <strong className="text-slate-900">{allocationResult.qty} kg {allocationResult.fish}</strong>
              </p>
            </div>
            <div className="p-6 bg-white">
              <p className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <FileText size={14} /> Rincian Pengambilan Sistem
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {allocationResult.logs.map((log, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200/60 rounded-lg text-xs text-slate-700 font-medium">
                    <span className="text-[#2457A6] mr-1">•</span> {log}
                  </div>
                ))}
              </div>
              <button
                onClick={() => setAllocationResult(null)}
                className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md transition-colors cursor-pointer uppercase tracking-wider"
              >
                Tutup & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
