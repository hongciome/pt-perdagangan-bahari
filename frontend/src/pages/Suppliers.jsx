import { useState } from 'react';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Pak Kasan (KM Bahari 02)', origin: 'TPI Bajomulyo Juwana', phone: '0852-1122-3344', mainCatch: 'Kakap Merah & Tenggiri', debt: 15000000, status: 'Aktif' },
    { id: 2, name: 'H. Slamet (UD Laut Jaya)', origin: 'TPI Tambaklorok Semarang', phone: '0813-4455-6677', mainCatch: 'Cumi-cumi & Udang', debt: 0, status: 'Aktif' },
    { id: 3, name: 'Armada Kapal Nelayan Pekalongan', origin: 'TPI Kota Pekalongan', phone: '0878-9900-1122', mainCatch: 'Ikan Tongkol & Layang', debt: 8400000, status: 'Pending' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', origin: 'TPI Tambaklorok Semarang', phone: '', mainCatch: '', debt: 0 });

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!newSupplier.name) return;
    setSuppliers([
      ...suppliers,
      { 
        id: Date.now(), 
        ...newSupplier, 
        debt: Number(newSupplier.debt) || 0,
        status: 'Aktif' 
      }
    ]);
    setNewSupplier({ name: '', origin: 'TPI Tambaklorok Semarang', phone: '', mainCatch: '', debt: 0 });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Manajemen Nelayan & Supplier Pemasok</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Pencatatan mitra armada kapal, TPI asal, dan saldo kewajiban pembayaran setoran ikan.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Tambah Supplier Nelayan
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Mitra Pemasok</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{suppliers.length} Nelayan / UD</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Utang Pembayaran Setoran</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#d97706' }}>
            Rp {suppliers.reduce((acc, curr) => acc + Number(curr.debt), 0).toLocaleString('id-ID')}
          </h3>
        </div>
      </div>

      {/* Tabel Data Supplier */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Nama Nelayan / Armada / UD</th>
              <th style={{ padding: '12px 16px' }}>Pelabuhan / TPI Asal</th>
              <th style={{ padding: '12px 16px' }}>Komoditi Utama</th>
              <th style={{ padding: '12px 16px' }}>Kontak WhatsApp</th>
              <th style={{ padding: '12px 16px' }}>Tagihan / Utang Setoran</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🎣 {item.name}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.origin}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.mainCatch}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.phone}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: item.debt > 0 ? '#d97706' : '#16a34a' }}>
                  Rp {item.debt.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status === 'Aktif' ? '#dcfce7' : '#fef3c7',
                    color: item.status === 'Aktif' ? '#15803d' : '#b45309'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup Tambah Supplier */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Tambah Mitra Supplier / Nelayan</h3>
            <form onSubmit={handleAddSupplier}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Nelayan / KM / UD</label>
                <input 
                  type="text" 
                  required 
                  value={newSupplier.name} 
                  onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Pak Darso (KM Sinar Laut)"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>TPI / Pelabuhan Asal</label>
                <input 
                  type="text" 
                  value={newSupplier.origin} 
                  onChange={(e) => setNewSupplier({...newSupplier, origin: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: TPI Bajomulyo Juwana"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Komoditi Hasil Tangkapan Utama</label>
                <input 
                  type="text" 
                  value={newSupplier.mainCatch} 
                  onChange={(e) => setNewSupplier({...newSupplier, mainCatch: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Cumi Sero & Kakap"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>No. WhatsApp</label>
                <input 
                  type="text" 
                  value={newSupplier.phone} 
                  onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="0812xxxxxxx"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Saldo Utang Setoran Awal (Rp)</label>
                <input 
                  type="number" 
                  value={newSupplier.debt} 
                  onChange={(e) => setNewSupplier({...newSupplier, debt: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="0"
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
                  Simpan Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}