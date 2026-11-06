import { useState } from 'react';

export default function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState([
    { id: '#SJ-202611-001', destination: 'Gumaya Tower Hotel', driver: 'Budi (L300 Box Freezer H-1829-BA)', cargo: 'Kakap Merah 50kg + Es 30kg', date: '2026-11-06 06:30', status: 'Terkirim & TTD' },
    { id: '#SJ-202611-002', destination: 'Restoran Bahari Indah', driver: 'Agus (Grandmax Cold Chain H-9021-QA)', cargo: 'Kerapu Macan 30kg', date: '2026-11-06 08:15', status: 'Dalam Perjalanan' },
    { id: '#SJ-202611-003', destination: 'Hotel Santika Semarang', driver: 'Budi (L300 Box Freezer H-1829-BA)', cargo: 'Udang Tiger 25kg, Cumi 20kg', date: '2026-11-06 09:00', status: 'Siap Jalan' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSJ, setNewSJ] = useState({ destination: '', driver: 'Budi (L300 Box Freezer H-1829-BA)', cargo: '' });

  const handleAddSJ = (e) => {
    e.preventDefault();
    if (!newSJ.destination || !newSJ.cargo) return;
    const nextId = `#SJ-202611-0${String(deliveries.length + 1).padStart(2, '0')}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setDeliveries([...deliveries, { id: nextId, ...newSJ, date: nowStr, status: 'Siap Jalan' }]);
    setNewSJ({ destination: '', driver: 'Budi (L300 Box Freezer H-1829-BA)', cargo: '' });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Surat Jalan & Pengiriman (Delivery Management)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Penugasan armada cold chain, packing es batu, dan penyerahan barang ke hotel.</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Buat Surat Jalan Baru
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Surat Jalan</th>
              <th style={{ padding: '12px 16px' }}>Tujuan Hotel / Resto</th>
              <th style={{ padding: '12px 16px' }}>Armada & Driver</th>
              <th style={{ padding: '12px 16px' }}>Rincian Muatan & Es</th>
              <th style={{ padding: '12px 16px' }}>Waktu Keberangkatan</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🏨 {item.destination}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>🚚 {item.driver}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.cargo}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', backgroundColor: item.status.includes('Terkirim') ? '#dcfce7' : item.status.includes('Jalan') ? '#e0f2fe' : '#fef3c7', color: item.status.includes('Terkirim') ? '#15803d' : item.status.includes('Jalan') ? '#0369a1' : '#b45309' }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '420px' }}>
            <h3 style={{ marginTop: 0 }}>Buat Surat Jalan Baru</h3>
            <form onSubmit={handleAddSJ}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Tujuan Hotel / Resto</label>
                <input type="text" required value={newSJ.destination} onChange={(e) => setNewSJ({...newSJ, destination: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Armada & Driver</label>
                <select value={newSJ.driver} onChange={(e) => setNewSJ({...newSJ, driver: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                  <option value="Budi (L300 Box Freezer H-1829-BA)">Budi (L300 Box Freezer H-1829-BA)</option>
                  <option value="Agus (Grandmax Cold Chain H-9021-QA)">Agus (Grandmax Cold Chain H-9021-QA)</option>
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>Rincian Muatan & Packing Es</label>
                <input type="text" required value={newSJ.cargo} onChange={(e) => setNewSJ({...newSJ, cargo: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '4px' }}>Batal</button>
                <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>Simpan Surat Jalan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}