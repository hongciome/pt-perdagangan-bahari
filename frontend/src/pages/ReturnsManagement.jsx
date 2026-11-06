import { useState } from 'react';

export default function ReturnsManagement() {
  const [returns] = useState([
    { id: '#RET-202611-001', customer: 'Novotel Semarang', item: 'Ikan Kakap Merah (3 Kg)', reason: 'Suhu Es Drop Saat Pengiriman', action: 'Ganti Barang Baru', status: 'Selesai' },
  ]);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ margin: 0, color: '#1e293b' }}>Retur & Klaim Kualitas (Returns Management)</h2>
      <p style={{ margin: '5px 0 20px 0', color: '#64748b', fontSize: '14px' }}>Pencatatan komplain, penggantian komoditas rusak, dan pemotongan nota faktur.</p>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Klaim Retur</th>
              <th style={{ padding: '12px 16px' }}>Nama Hotel / Resto</th>
              <th style={{ padding: '12px 16px' }}>Komoditas Diberitahukan</th>
              <th style={{ padding: '12px 16px' }}>Alasan Retur</th>
              <th style={{ padding: '12px 16px' }}>Tindakan Solusi</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#dc2626' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🏨 {item.customer}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.item}</td>
                <td style={{ padding: '14px 16px', color: '#dc2626', fontWeight: 'bold' }}>{item.reason}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.action}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#dcfce7', color: '#15803d' }}>
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