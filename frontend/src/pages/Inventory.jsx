import { useState } from 'react';

export default function Inventory() {
  const [inventoryList, setInventoryList] = useState([
    { name: 'Cumi Segar', grade: 'Super / Grade A', stock: 150, price: 85000 },
    { name: 'Udang Tiger', grade: 'Grade A', stock: 120, price: 110000 },
    { name: 'Ikan Kerapu Macan', grade: 'Fresh Live', stock: 180, price: 140000 },
    { name: 'Ikan Kakap Merah (Segar)', grade: 'Super', stock: 250, price: 70000 },
  ]);

  const [form, setForm] = useState({ name: '', grade: '', stock: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.stock || !form.price) return;
    setInventoryList([...inventoryList, { ...form, stock: Number(form.stock), price: Number(form.price) }]);
    setForm({ name: '', grade: '', stock: '', price: '' });
  };

  return (
    <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Manajemen Stok Komoditas Ikan Segar</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Kontrol stok gudang cold storage PT Perdagangan Bahari Koh Ahong.
        </p>
      </div>

      {/* Form Tambah Stok */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Tambah Stok Komoditas Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NAMA IKAN</label>
            <input 
              type="text" 
              placeholder="Cth: Tuna / Kakap" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>GRADE / UKURAN</label>
            <input 
              type="text" 
              placeholder="Cth: Grade A / Super" 
              value={form.grade} 
              onChange={(e) => setForm({ ...form, grade: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>STOK (KG)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={form.stock} 
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>HARGA / KG (RP)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={form.price} 
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <button type="submit" style={{ width: '100%', padding: '11px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              + Tambah Stok Ikan
            </button>
          </div>

        </form>
      </div>

      {/* Tabel Inventaris */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Daftar Stok Cold Storage</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
                <th style={{ padding: '14px 20px' }}>Nama Ikan</th>
                <th style={{ padding: '14px 20px' }}>Grade / Ukuran</th>
                <th style={{ padding: '14px 20px' }}>Stok (Kg)</th>
                <th style={{ padding: '14px 20px' }}>Harga / Kg</th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#1e293b' }}>{item.name}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.grade || '-'}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.stock} Kg</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#0f172a' }}>Rp {item.price.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}