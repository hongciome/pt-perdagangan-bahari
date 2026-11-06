import { useState } from 'react';

export default function SalesOrder() {
  const [salesOrders, setSalesOrders] = useState([
    { id: 'SO-202611-045', client: 'Hotel Tentrem', date: '2026-11-04', items: 'Kerapu Macan (50kg)', total: 5750000, status: 'DELIVERED' },
    { id: 'SO-202611-046', client: 'Gumaya Tower Hotel', date: '2026-11-04', items: 'Kakap Merah (30kg)', total: 2550000, status: 'PROCESSING' },
    { id: 'SO-202611-047', client: 'Awann Sewu Boutique', date: '2026-11-03', items: 'Udang Vaname (20kg)', total: 1900000, status: 'COMPLETED' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSO, setNewSO] = useState({ client: '', items: '', total: 0 });

  const handleAddSO = (e) => {
    e.preventDefault();
    if (!newSO.client || !newSO.items) return;

    const nextId = `SO-202611-0${String(salesOrders.length + 48).padStart(2, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    setSalesOrders([
      ...salesOrders,
      {
        id: nextId,
        ...newSO,
        total: Number(newSO.total) || 0,
        date: today,
        status: 'PROCESSING'
      }
    ]);
    setNewSO({ client: '', items: '', total: 0 });
    setShowModal(false);
  };

  const handleCalculateMargin = (order) => {
    const estHpp = order.total * 0.7; // Estimasi HPP 70%
    const estMargin = order.total - estHpp;
    alert(`PROFITABILITY ENGINE - ${order.id}\n==============================\nKlien: ${order.client}\nTotal Omzet: Rp ${order.total.toLocaleString('id-ID')}\nEst. HPP (Cost): Rp ${estHpp.toLocaleString('id-ID')}\nEst. Gross Profit (30%): Rp ${estMargin.toLocaleString('id-ID')}`);
  };

  const totalOmzet = salesOrders.reduce((acc, curr) => acc + Number(curr.total), 0);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header Halaman */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>🛒 SALES ORDERS (SO)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Kelola pesanan pelanggan dan analisis margin keuntungan per transaksi.
          </p>
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
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Transaksi Sales Order</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{salesOrders.length} Order</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Nilai Pesanan (Omzet)</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            Rp {totalOmzet.toLocaleString('id-ID')}
          </h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Pesanan Dalam Proses</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#d97706' }}>
            {salesOrders.filter(s => s.status === 'PROCESSING').length} Order
          </h3>
        </div>
      </div>

      {/* Tabel Data Sales Order */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a', fontSize: '15px' }}>
          📄 Daftar Pesanan Aktif
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. SO & Pelanggan</th>
              <th style={{ padding: '12px 16px' }}>Tanggal</th>
              <th style={{ padding: '12px 16px' }}>Rincian Item</th>
              <th style={{ padding: '12px 16px' }}>Nilai Pesanan (Omzet)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Profitability Engine</th>
            </tr>
          </thead>
          <tbody>
            {salesOrders.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#2563eb' }}>{item.id}</div>
                  <div style={{ color: '#1e293b', fontWeight: 'bold', marginTop: '2px' }}>{item.client}</div>
                </td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.items}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>
                  Rp {item.total.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status === 'COMPLETED' || item.status === 'DELIVERED' ? '#dcfce7' : '#e0f2fe',
                    color: item.status === 'COMPLETED' || item.status === 'DELIVERED' ? '#15803d' : '#0369a1'
                  }}>
                    ✔ {item.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleCalculateMargin(item)}
                    style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    🧮 Hitung Margin
                  </button>
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
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Pelanggan / Hotel</label>
                <input 
                  type="text" 
                  required 
                  value={newSO.client} 
                  onChange={(e) => setNewSO({...newSO, client: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Awann Sewu Boutique"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Rincian Item & Volume</label>
                <input 
                  type="text" 
                  required
                  value={newSO.items} 
                  onChange={(e) => setNewSO({...newSO, items: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Kerapu Macan (50kg)"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nilai Pesanan Omzet (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={newSO.total} 
                  onChange={(e) => setNewSO({...newSO, total: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="5750000"
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