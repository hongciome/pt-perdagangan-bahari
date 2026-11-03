import React, { useState } from 'react';
import { Anchor, ShoppingCart, Search, Clock, CheckCircle, LogOut, Package, RotateCcw, Building2, Sparkles, FileText, Printer, ShieldCheck, UserCheck, X } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

// Fungsi helper untuk menghasilkan kode klien otomatis 3 huruf (Misal: "Hotel Tentrem" -> "TNT")
const getClientPrefix = (name) => {
  if (!name) return 'HTL';
  const clean = name.replace(/hotel|resort|resto|boutique/gi, '').trim();
  const words = clean.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase() + (words[2] ? words[2][0].toUpperCase() : 'X');
  }
  return clean.substring(0, 3).toUpperCase();
};

export default function B2BPortal({ currentUser, onLogout }) {
  const [cart, setCart] = useState([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [hotelStaff, setHotelStaff] = useState(null);
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [selectedRoleType, setSelectedRoleType] = useState('CHEF');
  const [printingOrder, setPrintingOrder] = useState(null);

  // Kode unik otomatis berdasarkan nama institusi login
  const clientPrefix = getClientPrefix(currentUser.name);

  const [myOrders, setMyOrders] = useState([
    { 
      id: `PO-${clientPrefix}-202611-088`, 
      invoiceId: `INV-${clientPrefix}-202611-088`,
      date: '4 Nov 2026', 
      items: [
        { name: 'Ikan Kerapu Macan Grade A', qty: 50, price: 115000 },
        { name: 'Udang Vaname Size 40', qty: 20, price: 95000 }
      ], 
      total: 7650000, 
      status: 'MENUNGGU APPROVAL MANAJER', 
      chef: 'Chef Budi', 
      managerApproved: false,
      managerName: ''
    }
  ]);

  const catalog = [
    { id: 1, name: 'Ikan Kerapu Macan', grade: 'Grade A (Export)', price: 115000, stock: 'Tersedia' },
    { id: 2, name: 'Ikan Kakap Merah', grade: 'Grade A', price: 85000, stock: 'Tersedia' },
    { id: 3, name: 'Udang Vaname', grade: 'Size 40', price: 95000, stock: 'Terbatas' },
  ];

  const handleStaffLogin = (e) => {
    e.preventDefault();
    if (!staffUsername || !staffPassword) return alert('Masukkan username dan password.');
    if (selectedRoleType === 'CHEF' && staffPassword !== 'chef123') return alert('Password Chef salah! (Gunakan: chef123)');
    if (selectedRoleType === 'MANAGER' && staffPassword !== 'manajer123') return alert('Password Manajer salah! (Gunakan: manajer123)');

    setHotelStaff({ role: selectedRoleType, name: staffUsername });
  };

  const handleAddToCart = (product) => {
    const existing = cart.find(c => c.id === product.id);
    if (existing) {
      setCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 10 } : c));
    } else {
      setCart([...cart, { ...product, qty: 10 }]);
    }
  };

  const handleChefSubmitOrder = () => {
    if(cart.length === 0) return alert('Keranjang masih kosong!');
    const randomCode = Math.floor(Math.random() * 89 + 10);
    const totalAmount = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
    
    // PEMBUATAN NOMOR SERI OTOMATIS BERDASARKAN KODE KLIEN
    const newOrder = {
      id: `PO-${clientPrefix}-202611-${randomCode}`,
      invoiceId: `INV-${clientPrefix}-202611-${randomCode}`,
      date: 'Hari ini',
      items: cart.map(c => ({ name: `${c.name} (${c.grade})`, qty: c.qty, price: c.price })),
      total: totalAmount,
      status: 'MENUNGGU APPROVAL MANAJER',
      chef: hotelStaff.name,
      managerApproved: false,
      managerName: ''
    };
    setMyOrders([newOrder, ...myOrders]);
    setCart([]);
    alert(`Draf PO Berhasil Dibuat!\nNo. Seri Terintegrasi: ${newOrder.id}`);
  };

  const handleManagerApprove = (orderId) => {
    setMyOrders(myOrders.map(ord => ord.id === orderId ? { 
      ...ord, 
      status: 'DISETUJUI & DIKIRIM KE PT BAHARI', 
      managerApproved: true,
      managerName: hotelStaff.name 
    } : ord));
    alert(`PO ${orderId} disetujui oleh Manajer ${hotelStaff.name} dan resmi masuk sistem pusat PT Perdagangan Bahari Koh Ahong!`);
  };

  if (!hotelStaff) {
    return (
      <div className="min-h-screen bg-[#14263D] font-sans flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-[#E5EAF0] max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#168C85] text-white rounded-xl flex items-center justify-center mx-auto shadow-md">
              <Building2 size={28} />
            </div>
            <h1 className="text-xl font-black text-slate-900">{currentUser.name}</h1>
            <p className="text-xs text-slate-500 font-semibold">Kode Cabang Klien: <span className="text-[#2457A6] font-bold">[{clientPrefix}]</span></p>
          </div>

          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Pilih Bagian</label>
              <select value={selectedRoleType} onChange={(e) => setSelectedRoleType(e.target.value)} className="w-full p-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-bold text-slate-800 focus:outline-none">
                <option value="CHEF">Chef / Tim Dapur</option>
                <option value="MANAGER">Purchasing / F&B Manager</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Nama Pengguna</label>
              <input type="text" placeholder={selectedRoleType === 'CHEF' ? "Contoh: Chef Budi" : "Contoh: Pak Hartono"} value={staffUsername} onChange={(e) => setStaffUsername(e.target.value)} className="w-full p-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Kata Sandi</label>
              <input type="password" placeholder={selectedRoleType === 'CHEF' ? "chef123" : "manajer123"} value={staffPassword} onChange={(e) => setStaffPassword(e.target.value)} className="w-full p-2.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-xl text-xs font-semibold text-slate-800 focus:outline-none" required />
              <p className="text-[10px] text-slate-400 mt-1 italic">Demo sandi: chef123 atau manajer123</p>
            </div>
            <div className="pt-2 flex gap-2">
              <button type="button" onClick={onLogout} className="w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-xs font-bold cursor-pointer">Keluar</button>
              <button type="submit" className="w-2/3 bg-[#168C85] hover:bg-teal-700 text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer">Masuk Sistem</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-slate-800 relative">
      
      {/* MODAL PRATINJAU DOKUMEN DENGAN KODE KLIEN UNIK */}
      {printingOrder && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[95vh]">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center print:hidden">
              <h3 className="text-xs font-bold uppercase">Dokumen Resmi Cabang [{clientPrefix}]</h3>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="bg-[#168C85] text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 cursor-pointer">
                  <Printer size={14} /> Cetak / Simpan PDF
                </button>
                <button onClick={() => setPrintingOrder(null)} className="p-1 bg-slate-800 hover:bg-rose-600 rounded cursor-pointer"><X size={16} /></button>
              </div>
            </div>

            <div className="p-8 space-y-6 bg-white text-slate-900 font-sans overflow-y-auto">
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div>
                  <h1 className="text-lg font-black">{currentUser.name.toUpperCase()}</h1>
                  <p className="text-xs text-slate-500">Cabang Klien ID: <span className="font-bold text-[#2457A6]">{clientPrefix}</span> • Dapur Utama</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-slate-100 border border-slate-300 text-xs font-extrabold rounded">PURCHASE ORDER & INVOICE</span>
                  <p className="text-xs font-bold text-[#2457A6] mt-1">No. PO: {printingOrder.id}</p>
                  <p className="text-xs font-bold text-emerald-700">No. Inv: {printingOrder.invoiceId}</p>
                  <p className="text-[10px] text-slate-400">Tanggal: {printingOrder.date}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Supplier Resmi:</p>
                  <p className="font-extrabold text-slate-900">PT Perdagangan Bahari Koh Ahong</p>
                  <p className="text-slate-600">Semarang, Jawa Tengah</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status:</p>
                  <p className="font-bold text-emerald-700">{printingOrder.status}</p>
                  <p className="text-[10px] text-slate-500">Pembuat: {printingOrder.chef}</p>
                </div>
              </div>

              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-2 font-bold">No</th>
                    <th className="p-2 font-bold">Nama Item Seafood</th>
                    <th className="p-2 font-bold text-center">Jumlah</th>
                    <th className="p-2 font-bold text-right">Harga Satuan</th>
                    <th className="p-2 font-bold text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {printingOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2 font-semibold">{it.name}</td>
                      <td className="p-2 text-center">{it.qty} Kg</td>
                      <td className="p-2 text-right">{formatRupiah(it.price)}</td>
                      <td className="p-2 text-right font-bold">{formatRupiah(it.qty * it.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end pt-2">
                <div className="w-48 space-y-1 text-xs">
                  <div className="flex justify-between border-t border-slate-300 pt-2">
                    <span className="font-bold">Total Tagihan:</span>
                    <span className="font-black text-sm">{formatRupiah(printingOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 pt-12 text-center text-xs">
                <div>
                  <p className="text-slate-500 mb-14">Disetujui Oleh (Manajer)</p>
                  <p className="font-bold border-b border-slate-400 pb-1 inline-block px-6">
                    {printingOrder.managerApproved ? `(${printingOrder.managerName})` : '( Belum Approve )'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 mb-14">Dibuat Oleh (Chef)</p>
                  <p className="font-bold border-b border-slate-400 pb-1 inline-block px-6">({printingOrder.chef})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-[#14263D] text-white py-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-[#2457A6] p-2 rounded-lg text-white shadow-sm"><Anchor size={24} /></div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wide">SEAFOOD OS <span className="font-light text-slate-300">| B2B Hotel Portal</span></h1>
            <p className="text-[11px] text-emerald-400 font-medium">Cabang Klien: {currentUser.name} [{clientPrefix}]</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
            <p className="text-xs font-bold text-white">{hotelStaff.name} <span className="text-[10px] bg-teal-600 px-1.5 py-0.5 rounded text-white ml-1">{hotelStaff.role}</span></p>
            <button onClick={() => setHotelStaff(null)} className="text-[10px] text-rose-400 hover:underline font-semibold cursor-pointer">Ganti Akun</button>
          </div>
          <button onClick={onLogout} className="p-2.5 bg-slate-800 hover:bg-rose-600 rounded-xl transition-colors cursor-pointer" title="Keluar"><LogOut size={18} /></button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-4 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-[#E5EAF0] shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{hotelStaff.role === 'CHEF' ? 'Dapur Utama • Katalog Pesanan' : 'Manajemen Purchasing • Pusat Approval PO'}</h2>
            <p className="text-sm text-slate-500 mt-1">Sistem otomatis menghasilkan seri kode unik cabang <span className="font-bold text-[#2457A6]">[{clientPrefix}]</span>.</p>
          </div>
          {hotelStaff.role === 'CHEF' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-4 items-center">
              <ShoppingCart size={24} className="text-[#2457A6]" />
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Keranjang Draf</p>
                <p className="text-lg font-extrabold text-[#2457A6]">{cart.length} Jenis Ikan</p>
              </div>
              {cart.length > 0 && (
                <button onClick={handleChefSubmitOrder} className="ml-4 bg-[#168C85] hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md cursor-pointer">
                  Kirim Draf ke Manajer
                </button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {hotelStaff.role === 'CHEF' ? (
              <>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2"><Package size={18} className="text-[#2457A6]" /> Katalog Bahan Baku</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {catalog.map(item => (
                    <div key={item.id} className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-bold">{item.stock}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-4">{item.grade}</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Harga / Kg</p>
                          <p className="text-lg font-extrabold text-[#2457A6]">{formatRupiah(item.price)}</p>
                        </div>
                        <button onClick={() => handleAddToCart(item)} className="bg-[#F5F7FA] hover:bg-[#2457A6] hover:text-white text-[#2457A6] border border-[#E5EAF0] px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer">
                          + Pilih (10kg)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-[#E5EAF0] shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2"><ShieldCheck size={18} className="text-[#168C85]" /> Daftar Draf PO Cabang [{clientPrefix}]</h3>
                <div className="space-y-3">
                  {myOrders.map((ord, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-[#2457A6]">{ord.id} <span className="text-slate-400">({ord.invoiceId})</span> • {ord.chef}</p>
                        <p className="text-xs font-bold text-slate-700 mt-1">Total: {formatRupiah(ord.total)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setPrintingOrder(ord)} className="bg-slate-800 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer">
                          <Printer size={14} /> Lihat / PDF
                        </button>
                        {!ord.managerApproved && (
                          <button onClick={() => handleManagerApprove(ord.id)} className="bg-[#168C85] hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-xs font-bold cursor-pointer">
                            Approve PO
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#E5EAF0] shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase flex items-center gap-2"><Clock size={16} className="text-[#168C85]" /> Dokumen Cabang [{clientPrefix}]</h3>
              {myOrders.map((ord, i) => (
                <div key={i} className="border-l-4 border-l-[#2457A6] pl-3 py-2 space-y-1 bg-slate-50 rounded-r-lg pr-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold">{ord.id}</p>
                      <p className="text-xs font-extrabold text-slate-800">{formatRupiah(ord.total)}</p>
                    </div>
                    <span className="text-[9px] bg-blue-50 text-[#2457A6] px-2 py-0.5 rounded font-bold">{ord.managerApproved ? 'Approved' : 'Pending'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-end">
                    <button onClick={() => setPrintingOrder(ord)} className="w-full bg-[#2457A6] hover:bg-blue-800 text-white py-1.5 rounded text-xs font-bold flex items-center justify-center gap-1 cursor-pointer">
                      <Printer size={14} /> Cetak Dokumen Resmi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
