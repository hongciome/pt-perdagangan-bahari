import React, { useState } from 'react';
import { Anchor, Send, Clock, CheckCircle, LogOut, Fish, UploadCloud } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function SupplierPortal({ currentUser, onLogout }) {
  const [fishType, setFishType] = useState('Kerapu Macan');
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('A');
  const [notes, setNotes] = useState('');

  const pendingPOs = [
    { id: 'PO-202611-042', item: 'Kerapu Macan & Kakap', qty: '200 kg', status: 'Menunggu Pengiriman', date: 'Hari ini' },
    { id: 'PO-202611-039', item: 'Udang Vaname', qty: '50 kg', status: 'Sedang Diperjalanan', date: 'Kemarin' }
  ];

  const handleSubmitCatch = (e) => {
    e.preventDefault();
    if (!weight) return alert('Masukkan estimasi berat (kg) tangkapan Anda.');
    alert(`Laporan Tangkapan Berhasil Dikirim!\n\nJenis: ${fishType}\nBerat: ${weight} kg\nGrade: ${grade}\n\nAdmin Gudang PT Perdagangan Bahari Koh Ahong akan segera meninjau laporan ini.`);
    setWeight('');
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-slate-800">
      {/* HEADER PORTAL SUPPLIER DIPERBAIKI NAMA PT-NYA */}
      <header className="bg-[#168C85] text-white py-4 px-4 sm:px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg text-[#168C85] shadow-sm hidden sm:block">
            <Fish size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-lg tracking-wide">SEAFOOD OS <span className="font-light text-teal-100">| Mitra Nelayan</span></h1>
            <p className="text-[10px] sm:text-[11px] text-teal-100 font-medium">Suplai Resmi: PT Perdagangan Bahari Koh Ahong</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">{currentUser.name}</p>
            <p className="text-[10px] text-teal-100">Supplier / Pengepul Mitra</p>
          </div>
          <button onClick={onLogout} className="p-2 bg-teal-800 hover:bg-rose-600 rounded-lg transition-colors cursor-pointer" title="Keluar">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 mt-2 space-y-6">
        {/* SELAMAT DATANG MENYESUAIKAN NAMA INPUT LOGIN */}
        <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Halo, {currentUser.name}!</h2>
          <p className="text-xs text-slate-500 mt-1">Gunakan form di bawah ini untuk melaporkan hasil tangkapan harian agar Admin Gudang PT Perdagangan Bahari Koh Ahong dapat menyiapkan PO.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORM INPUT TANGKAPAN */}
          <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 shadow-sm">
            <h3 className="text-sm font-extrabold text-teal-900 uppercase flex items-center gap-2 mb-4">
              <UploadCloud size={18} className="text-teal-600" /> Lapor Hasil Tangkapan
            </h3>
            <form onSubmit={handleSubmitCatch} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Jenis Ikan / Seafood</label>
                <select value={fishType} onChange={(e) => setFishType(e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-teal-200 focus:outline-none focus:border-teal-500 bg-white">
                  <option value="Kerapu Macan">Kerapu Macan</option>
                  <option value="Kakap Merah">Kakap Merah</option>
                  <option value="Udang Vaname">Udang Vaname</option>
                  <option value="Cumi-Cumi">Cumi-Cumi</option>
                  <option value="Lainnya">Lainnya...</option>
                </select>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Estimasi Berat (Kg)</label>
                  <input type="number" placeholder="Contoh: 150" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-teal-200 focus:outline-none focus:border-teal-500" required />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Kualitas (Grade)</label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-teal-200 focus:outline-none focus:border-teal-500 bg-white">
                    <option value="A">Grade A (Super)</option>
                    <option value="B">Grade B (Standar)</option>
                    <option value="C">Grade C (Pasar)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Catatan Tambahan (Opsional)</label>
                <input type="text" placeholder="Contoh: Tangkapan pagi, butuh dijemput..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2.5 text-sm rounded-lg border border-teal-200 focus:outline-none focus:border-teal-500" />
              </div>
              <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2">
                <Send size={16} /> Kirim Laporan ke Gudang
              </button>
            </form>
          </div>

          {/* DAFTAR PURCHASE ORDER */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2">
              <Clock size={18} className="text-[#2457A6]" /> Purchase Order (PO) Aktif
            </h3>
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-sm space-y-4">
              <p className="text-xs text-slate-500 mb-2">Daftar pesanan dari PT Perdagangan Bahari Koh Ahong yang harus Anda penuhi:</p>
              {pendingPOs.map((po, idx) => (
                <div key={idx} className="border-l-4 border-l-[#2457A6] pl-3 py-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[10px] text-slate-400 font-bold">{po.id} • {po.date}</p>
                    <span className="text-[9px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">{po.qty}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{po.item}</p>
                  <p className="text-[11px] font-semibold text-blue-600 mt-1 flex items-center gap-1">
                    <Clock size={12}/> {po.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
