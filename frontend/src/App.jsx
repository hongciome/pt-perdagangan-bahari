import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ backgroundColor: '#2563eb', color: '#white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
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

          {/* Tabel Aktivitas / Pesanan Masuk Terbaru */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Pesanan B2B & Hotel Terbaru</h3>
              <a href="#" style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Lihat Semua →</a>
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
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#2563eb' }}>#ORD-2026-001</td>
                    <td style={{ padding: '16px 24px' }}>Gumaya Tower Hotel</td>
                    <td style={{ padding: '16px 24px' }}>Ikan Kakap Merah (Segar) - 50 Kg</td>
                    <td style={{ padding: '16px 24px', fontWeight: '600' }}>Rp 3.500.000</td>
                    <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Selesai / Dikirim</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#2563eb' }}>#ORD-2026-002</td>
                    <td style={{ padding: '16px 24px' }}>Restoran Bahari Indah</td>
                    <td style={{ padding: '16px 24px' }}>Ikan Kerapu Macan - 30 Kg</td>
                    <td style={{ padding: '16px 24px', fontWeight: '600' }}>Rp 4.200.000</td>
                    <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Proses Gudang</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: '#2563eb' }}>#ORD-2026-003</td>
                    <td style={{ padding: '16px 24px' }}>Hotel Santika Semarang</td>
                    <td style={{ padding: '16px 24px' }}>Udang Tiger & Cumi Segar - 45 Kg</td>
                    <td style={{ padding: '16px 24px', fontWeight: '600' }}>Rp 5.800.000</td>
                    <td style={{ padding: '16px 24px' }}><span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>Menunggu Konfirmasi</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
