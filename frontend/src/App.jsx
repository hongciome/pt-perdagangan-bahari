import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // State daftar pesanan (bisa ditambah langsung lewat form)
  const [orders, setOrders] = useState([
    { id: '#ORD-2026-001', client: 'Gumaya Tower Hotel', fish: 'Ikan Kakap Merah (Segar) - 50 Kg', total: 'Rp 3.500.000', status: 'Selesai / Dikirim' },
    { id: '#ORD-2026-002', client: 'Restoran Bahari Indah', fish: 'Ikan Kerapu Macan - 30 Kg', total: 'Rp 4.200.000', status: 'Proses Gudang' },
    { id: '#ORD-2026-003', client: 'Hotel Santika Semarang', fish: 'Udang Tiger & Cumi Segar - 45 Kg', total: 'Rp 5.800.000', status: 'Menunggu Konfirmasi' }
  ]);

  // State untuk form input transaksi baru
  const [newClient, setNewClient] = useState('');
  const [newFish, setNewFish] = useState('');
  const [newTotal, setNewTotal] = useState('');
  const [newStatus, setNewStatus] = useState('Proses Gudang');

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newClient || !newFish || !newTotal) return;

    const newOrder = {
      id: `#ORD-2026-00${orders.length + 1}`,
      client: newClient,
      fish: newFish,
      total: newTotal.startsWith('Rp') ? newTotal : `Rp ${newTotal}`,
      status: newStatus
    };

    setOrders([newOrder, ...orders]);
    setNewClient('');
    setNewFish('');
    setNewTotal('');
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header Atas */}
        <header style={{ height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              ☰
            </button>
            <span style={{ fontWeight: '600', color: '#334155', fontSize: '15px' }}>SEAFOOD OS / Overview & Dashboard</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: '#334155', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            Sigit Prakoso <span style={{ color: '#2563eb', fontWeight: '600' }}>(Owner)</span>
          </div>
        </header>

        {/* Konten Utama Halaman Overview */}
        <main style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 6px 0' }}>Dashboard Overview</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>PT Perdagangan Bahari Koh Ahong - Pusat Komoditas Ikan Segar B2B.</p>
            </div>
            <div>
              <button 
                onClick={() => setShowModal(true)}
                style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                + Tambah Transaksi
              </button>
            </div>
          </div>

          {/* Kartu Metrik Utama */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Total Revenue (Bulan Ini)</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Rp 48.500.000</p>
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: '600', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>↑ 12% dari bulan lalu</span>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Gross Profit</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Rp 14.200.000</p>
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: '600', backgroundColor: '#ecfdf5', padding: '2px 6px', borderRadius: '4px' }}>Margin Stabil</span>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Net Profit</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Rp 9.800.000</p>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '600', backgroundColor: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>Aktif Berjalan</span>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Total Suplier & Nelayan</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>24 Mitra</p>
              <span style={{ fontSize: '12px', color: '#d97706', fontWeight: '600', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>Semarang & Sekitarnya</span>
            </div>
          </div>

          {/* Tabel Pesanan Terbaru */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Pesanan B2B & Hotel Terbaru</h3>
              <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>Total: {orders.length} Transaksi</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px 24px', fontWeight: '600' }}>ID Pesanan</th>
                    <th style={{ padding: '12px 24px', fontWeight: '600' }}>Klien / Hotel / Resto</th>
                    <th style={{ padding: '12px 24px', fontWeight: '600' }}>Komoditas Ikan</th>
                    <th style={{ padding: '12px 24px', fontWeight: '600' }}>Total (Rp)</th>
                    <th style={{ padding: '12px 24px', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: '#2563eb' }}>{order.id}</td>
                      <td style={{ padding: '16px 24px', fontWeight: '500' }}>{order.client}</td>
                      <td style={{ padding: '16px 24px', color: '#475569' }}>{order.fish}</td>
                      <td style={{ padding: '16px 24px', fontWeight: '700', color: '#0f172a' }}>{order.total}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          backgroundColor: order.status === 'Selesai / Dikirim' ? '#ecfdf5' : order.status === 'Proses Gudang' ? '#eff6ff' : '#fef3c7', 
                          color: order.status === 'Selesai / Dikirim' ? '#059669' : order.status === 'Proses Gudang' ? '#2563eb' : '#d97706', 
                          padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' 
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* POPUP MODAL TAMBAH TRANSAKSI */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '500px', borderRadius: '12px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Tambah Transaksi Baru</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>
            
            <form onSubmit={handleAddTransaction} style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Nama Klien / Hotel / Resto</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Hotel Tentrem Semarang" 
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Komoditas Ikan & Berat</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Ikan Bandeng Segar - 40 Kg" 
                  value={newFish}
                  onChange={(e) => setNewFish(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Total Harga (Rp)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Rp 2.500.000" 
                  value={newTotal}
                  onChange={(e) => setNewTotal(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Status Pesanan</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#fff' }}
                >
                  <option value="Proses Gudang">Proses Gudang</option>
                  <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                  <option value="Selesai / Dikirim">Selesai / Dikirim</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  style={{ backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
