import { useState } from 'react';

export default function SalesOrder() {
  const [salesOrders, setSalesOrders] = useState([
    { id: '#SO-2026-001', client: 'Gumaya Tower Hotel', items: 'Ikan Kakap Merah (Segar) - 50 Kg', total: 3500000, date: '2026-11-05', status: 'Selesai / Dikirim' },
    { id: '#SO-2026-002', client: 'Restoran Bahari Indah', items: 'Ikan Kerapu Macan - 30 Kg', total: 4200000, date: '2026-11-06', status: 'Proses Gudang' },
    { id: '#SO-2026-003', client: 'Hotel Santika Semarang', items: 'Udang Tiger & Cumi Segar - 45 Kg', total: 5800000, date: '2026-11-06', status: 'Menunggu Konfirmasi' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSO, setNewSO] = useState({ client: '', items: '', total: 0 });

  const handleAddSO = (e) => {
    e.preventDefault();
    if (!newSO.client || !newSO.items) return;

    const nextId = `#SO-2026-0${String(salesOrders.length + 1).padStart(2, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    setSalesOrders([
      ...salesOrders,
      {
        id: nextId,
        ...newSO,
        total: Number(newSO.total) || 0,
        date: today,
        status: 'Menunggu Konfirmasi'
      }
    ]);
    setNewSO({ client: '', items: '', total: 0 });
    setShowModal(false);
  };

  const totalRevenue = salesOrders.reduce((acc, curr) => acc + Number(curr.total), 0);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Sales Orders (Pesanan Penjualan B2B Hotel & Resto)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Pencatatan pesanan penjualan komoditas seafood yang masuk dari mitra hotel & restoran.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Buat Sales Order Baru
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Transaksi Penjualan</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{salesOrders.length} Order</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Omset Penjualan</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            Rp {totalRevenue.toLocaleString('id-ID')}
          </h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Status Butuh Konfirmasi</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#d97706' }}>
            {salesOrders.filter(s => s.status === 'Menunggu Konfirmasi').length} Order
          </h3>
        </div>
      </div>

      {/* Tabel Data Sales Order */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Sales Order</th>
              <th style={{ padding: '12px 16px' }}>Tanggal</th>
              <th style={{ padding: '12px 16px' }}>Klien / Hotel / Resto</th>
              <th style={{ padding: '12px 16px' }}>Detail Komoditas & Volume</th>
              <th style={{ padding: '12px 16px' }}>Total Tagihan (Rp)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status Order</th>
            </tr>
          </thead>
          <tbody>
            {salesOrders.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🏨 {item.client}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.items}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>
                  Rp {item.total.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
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

      {/* Modal Form Tambah SO */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Buat Sales Order Baru</h3>
            <form onSubmit={handleAddSO}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Klien / Hotel / Resto</label>
                <input 
                  type="text" 
                  required 
                  value={newSO.client} 
                  onChange={(e) => setNewSO({...newSO, client: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Gumaya Tower Hotel"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Rincian Komoditas & Volume (Kg)</label>
                <input 
                  type="text" 
                  required
                  value={newSO.items} 
                  onChange={(e) => setNewSO({...newSO, items: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Kakap Merah Segar - 50 Kg"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Total Tagihan (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={newSO.total} 
                  onChange={(e) => setNewSO({...newSO, total: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="3500000"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Batal
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Simpan Sales Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}