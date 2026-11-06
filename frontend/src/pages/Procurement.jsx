import { useState } from 'react';

export default function Procurement() {
  const [procurements, setProcurements] = useState([
    { id: '#PR-202611-001', item: 'Es Balok Kristal (100 Balok)', supplier: 'Pabrik Es Semarang Jaya', cost: 1500000, date: '2026-11-05', status: 'Selesai' },
    { id: '#PR-202611-002', item: 'Box Styrofoam Jumbo (50 Pcs)', supplier: 'UD Plastik Bahari', cost: 2250000, date: '2026-11-06', status: 'Proses Pengiriman' },
    { id: '#PR-202611-003', item: 'Garam Krosok Pengawet (10 Sak)', supplier: 'Toko Garam Madura', cost: 450000, date: '2026-11-06', status: 'Selesai' },
  ]);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ margin: 0, color: '#1e293b' }}>Procurement & Perbekalan Gudang</h2>
      <p style={{ margin: '5px 0 20px 0', color: '#64748b', fontSize: '14px' }}>Pengadaan es balok, box styrofoam, dan plastik vacuum operasional cold storage.</p>
      
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Procurement</th>
              <th style={{ padding: '12px 16px' }}>Nama Barang / Bahan Baku</th>
              <th style={{ padding: '12px 16px' }}>Supplier / Vendor</th>
              <th style={{ padding: '12px 16px' }}>Tanggal</th>
              <th style={{ padding: '12px 16px' }}>Total Biaya (Rp)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {procurements.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🧊 {item.item}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.supplier}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>Rp {item.cost.toLocaleString('id-ID')}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: item.status === 'Selesai' ? '#dcfce7' : '#e0f2fe', color: item.status === 'Selesai' ? '#15803d' : '#0369a1' }}>
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