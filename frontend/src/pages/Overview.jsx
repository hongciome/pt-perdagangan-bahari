import { useState } from 'react';

export default function Overview() {
  const [orders] = useState([
    { id: '#ORD-2026-001', client: 'Gumaya Tower Hotel', items: 'Ikan Kakap Merah (Segar) - 50 Kg', total: 3500000, status: 'Selesai / Dikirim' },
    { id: '#ORD-2026-002', client: 'Restoran Bahari Indah', items: 'Ikan Kerapu Macan - 30 Kg', total: 4200000, status: 'Proses Gudang' },
    { id: '#ORD-2026-003', client: 'Hotel Santika Semarang', items: 'Udang Tiger & Cumi Segar - 45 Kg', total: 5800000, status: 'Menunggu Konfirmasi' },
  ]);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Top Bar / Owner Badge */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
          Sigit Prakoso <span style={{ color: '#2563eb', fontWeight: 'bold' }}>(Owner)</span>
        </span>
      </div>

      {/* Header Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Dashboard Overview</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            PT Perdagangan Bahari Koh Ahong - Pusat Komoditas Ikan Segar B2B.
          </p>
        </div>
        <button style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Tambah Transaksi
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        
        {/* Total Revenue */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px' }}>TOTAL REVENUE (BULAN INI)</span>
          <h3 style={{ margin: '10px 0 10px 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>Rp 48.500.000</h3>
          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            ↑ 12% dari bulan lalu
          </span>
        </div>

        {/* Gross Profit */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px' }}>GROSS PROFIT</span>
          <h3 style={{ margin: '10px 0 10px 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>Rp 14.200.000</h3>
          <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            Margin Stabil
          </span>
        </div>

        {/* Net Profit */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px' }}>NET PROFIT</span>
          <h3 style={{ margin: '10px 0 10px 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>Rp 9.800.000</h3>
          <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            Aktif Berjalan
          </span>
        </div>

        {/* Total Supplier & Nelayan */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', letterSpacing: '0.5px' }}>TOTAL SUPLIER & NELAYAN</span>
          <h3 style={{ margin: '10px 0 10px 0', fontSize: '24px', color: '#0f172a', fontWeight: 'bold' }}>24 Mitra</h3>
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            Semarang & Sekitarnya
          </span>
        </div>

      </div>

      {/* Tabel Pesanan Terbaru */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Pesanan B2B & Hotel Terbaru</h3>
          <span style={{ color: '#64748b', fontSize: '13px' }}>Total: {orders.length} Transaksi</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
              <th style={{ padding: '14px 20px' }}>ID Pesanan</th>
              <th style={{ padding: '14px 20px' }}>Klien / Hotel / Resto</th>
              <th style={{ padding: '14px 20px' }}>Komoditas Ikan</th>
              <th style={{ padding: '14px 20px' }}>Total (Rp)</th>
              <th style={{ padding: '14px 20px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#1e293b' }}>{item.client}</td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.items}</td>
                <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#0f172a' }}>Rp {item.total.toLocaleString('id-ID')}</td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status === 'Selesai / Dikirim' ? '#dcfce7' : item.status === 'Proses Gudang' ? '#e0f2fe' : '#fef3c7',
                    color: item.status === 'Selesai / Dikirim' ? '#15803d' : item.status === 'Proses Gudang' ? '#0369a1' : '#b45309'
                  }}>
                    {item.status}
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