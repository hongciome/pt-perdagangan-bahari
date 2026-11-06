import { useState } from 'react';

export default function Catalog() {
  const [fishes, setFishes] = useState([
    { id: 1, name: 'Ikan Kakap Merah', category: 'Ikan Laut', buyPrice: 65000, sellPrice: 95000, grade: 'Grade A', status: 'Tersedia' },
    { id: 2, name: 'Cumi-cumi Sero', category: 'Cephalopoda', buyPrice: 70000, sellPrice: 110000, grade: 'Grade A', status: 'Tersedia' },
    { id: 3, name: 'Udang Vaname', category: 'Udang', buyPrice: 85000, sellPrice: 125000, grade: 'Grade B', status: 'Stok Tipis' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newFish, setNewFish] = useState({ name: '', category: 'Ikan Laut', buyPrice: 0, sellPrice: 0, grade: 'Grade A' });

  const handleAddFish = (e) => {
    e.preventDefault();
    if (!newFish.name) return;
    setFishes([
      ...fishes,
      { 
        id: Date.now(), 
        ...newFish, 
        buyPrice: Number(newFish.buyPrice), 
        sellPrice: Number(newFish.sellPrice),
        status: 'Tersedia' 
      }
    ]);
    setNewFish({ name: '', category: 'Ikan Laut', buyPrice: 0, sellPrice: 0, grade: 'Grade A' });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Katalog Komoditi Ikan & Margin B2B</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Pengaturan harga beli supplier, harga jual B2B, dan analisis estimasi margin per kg.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Tambah Komoditi Ikan
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Jenis Komoditi</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{fishes.length} Item</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Rata-rata Margin B2B</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            Rp {Math.round(fishes.reduce((acc, curr) => acc + (curr.sellPrice - curr.buyPrice), 0) / fishes.length).toLocaleString('id-ID')} / kg
          </h3>
        </div>
      </div>

      {/* Tabel Data Katalog */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Nama Komoditi</th>
              <th style={{ padding: '12px 16px' }}>Kategori</th>
              <th style={{ padding: '12px 16px' }}>Kualitas</th>
              <th style={{ padding: '12px 16px' }}>Harga Beli (HPP)</th>
              <th style={{ padding: '12px 16px' }}>Harga Jual B2B</th>
              <th style={{ padding: '12px 16px' }}>Margin / kg</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {fishes.map((item) => {
              const margin = item.sellPrice - item.buyPrice;
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🐟 {item.name}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '12px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 'bold' }}>
                      {item.grade}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>Rp {item.buyPrice.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>Rp {item.sellPrice.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#16a34a' }}>
                    +Rp {margin.toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: item.status === 'Tersedia' ? '#dcfce7' : '#fef3c7',
                      color: item.status === 'Tersedia' ? '#15803d' : '#b45309'
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Popup Tambah Komoditi */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Tambah Komoditi Ikan Baru</h3>
            <form onSubmit={handleAddFish}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Komoditi / Ikan</label>
                <input 
                  type="text" 
                  required 
                  value={newFish.name} 
                  onChange={(e) => setNewFish({...newFish, name: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Ikan Tenggiri"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Kategori</label>
                <select 
                  value={newFish.category} 
                  onChange={(e) => setNewFish({...newFish, category: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  <option value="Ikan Laut">Ikan Laut</option>
                  <option value="Cephalopoda">Cephalopoda (Cumi/Gurita)</option>
                  <option value="Udang">Udang & Kepiting</option>
                  <option value="Ikan Tawar">Ikan Tawar</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Kualitas / Grade</label>
                <select 
                  value={newFish.grade} 
                  onChange={(e) => setNewFish({...newFish, grade: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  <option value="Grade A">Grade A (Ekspor / Hotel 5 Star)</option>
                  <option value="Grade B">Grade B (Restoran / Cafe)</option>
                  <option value="Grade C">Grade C (Pasar Lokal)</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Harga Beli / HPP per kg (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={newFish.buyPrice} 
                  onChange={(e) => setNewFish({...newFish, buyPrice: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="65000"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Harga Jual B2B per kg (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={newFish.sellPrice} 
                  onChange={(e) => setNewFish({...newFish, sellPrice: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="95000"
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
                  Simpan Komoditi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}