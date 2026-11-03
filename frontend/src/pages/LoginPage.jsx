import React, { useState } from 'react';
import { Anchor, Lock, User, ShieldCheck, Building2, Store, Users, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  // Pilihan portal: 'CHOICE', 'INTERNAL', 'HOTEL', 'SUPPLIER'
  const [portalType, setPortalType] = useState('CHOICE');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [internalRole, setInternalRole] = useState('OWNER');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return alert('Silakan masukkan nama pengguna.');

    let role = internalRole;
    if (portalType === 'HOTEL') role = 'HOTEL_CLIENT';
    if (portalType === 'SUPPLIER') role = 'SUPPLIER';

    onLoginSuccess({ name: username, role });
  };

  // TAMPILAN 1: GERBANG UTAMA PILIH PORTAL
  if (portalType === 'CHOICE') {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#14263D] font-sans px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-2xl w-full p-8 space-y-8 animate-in fade-in zoom-in duration-200">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#2457A6] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Anchor size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-wide">SEAFOOD OS</h1>
            <p className="text-xs text-slate-500 font-medium">PT Perdagangan Bahari Koh Ahong • Pilih Gerbang Akses Anda</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Opsi 1: Internal Kantor */}
            <button 
              onClick={() => { setPortalType('INTERNAL'); setInternalRole('OWNer'); }}
              className="p-5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#2457A6] rounded-xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-[#2457A6] text-white rounded-lg flex items-center justify-center mb-3 shadow-xs">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#2457A6]">Kantor & Internal</h3>
                <p className="text-[11px] text-slate-500 mt-1">Owner, Admin Gudang, Keuangan & Sales.</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#2457A6]">
                <span>Masuk Sistem</span> <ArrowRight size={14} />
              </div>
            </button>

            {/* Opsi 2: Hotel B2B */}
            <button 
              onClick={() => setPortalType('HOTEL')}
              className="p-5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-[#168C85] rounded-xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-[#168C85] text-white rounded-lg flex items-center justify-center mb-3 shadow-xs">
                  <Building2 size={20} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#168C85]">Klien Hotel & Resto</h3>
                <p className="text-[11px] text-slate-500 mt-1">Tim Purchasing belanja & ajukan retur barang.</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-[#168C85]">
                <span>B2B Portal</span> <ArrowRight size={14} />
              </div>
            </button>

            {/* Opsi 3: Supplier / Nelayan */}
            <button 
              onClick={() => setPortalType('SUPPLIER')}
              className="p-5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-600 rounded-xl text-left transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center mb-3 shadow-xs">
                  <Store size={20} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-700">Mitra Nelayan</h3>
                <p className="text-[11px] text-slate-500 mt-1">Pengepul & nelayan lapor hasil tangkapan.</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600">
                <span>Supplier Portal</span> <ArrowRight size={14} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN 2: FORM LOGIN SPESIFIK SESUAI PILIHAN
  const themeColor = portalType === 'INTERNAL' ? 'bg-[#2457A6]' : portalType === 'HOTEL' ? 'bg-[#168C85]' : 'bg-amber-600';
  const portalTitle = portalType === 'INTERNAL' ? 'Login Kantor & Manajemen' : portalType === 'HOTEL' ? 'Portal Klien Hotel & Restoran' : 'Portal Mitra Nelayan & Supplier';

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#14263D] font-sans px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-md w-full p-8 space-y-6 animate-in fade-in duration-200">
        <div className="text-center space-y-2">
          <div className={`w-14 h-14 ${themeColor} text-white rounded-xl flex items-center justify-center mx-auto shadow-md`}>
            <Anchor size={28} />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-wide">SEAFOOD OS</h1>
          <p className="text-xs text-slate-600 font-bold">{portalTitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Pengguna / Instansi</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={portalType === 'INTERNAL' ? "Contoh: Sigit Prakoso" : portalType === 'HOTEL' ? "Contoh: Hotel Tentrem" : "Contoh: Nelayan Jepara"} 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="w-full pl-9 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#2457A6] text-slate-800" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-9 pr-4 py-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#2457A6] text-slate-800" 
                required 
              />
            </div>
          </div>

          {portalType === 'INTERNAL' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Posisi / Peran Internal</label>
              <select 
                value={internalRole} 
                onChange={(e) => setInternalRole(e.target.value)} 
                className="w-full px-3 py-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#2457A6] text-slate-800"
              >
                <option value="OWNER">Owner / Pimpinan</option>
                <option value="ADMIN_GUDANG">Admin Gudang & QC</option>
                <option value="SALES">Bagian Penjualan (Sales)</option>
              </select>
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button 
              type="button" 
              onClick={() => setPortalType('CHOICE')}
              className="w-1/3 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Kembali
            </button>
            <button 
              type="submit" 
              className={`w-2/3 py-3 ${themeColor} text-white rounded-xl text-xs font-bold shadow-md transition-all uppercase tracking-wider cursor-pointer`}
            >
              Masuk Sistem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
