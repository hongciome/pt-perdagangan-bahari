import { useState } from 'react';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-001', name: 'Pak Darsono (Ketua Kelompok Nelayan Mangkang)', commodity: 'Ikan Kakap Merah & Kerapu', phone: '081234567890', area: 'Pelabuhan Tanjung Mas, Semarang' },
    { id: 'SUP-002', name: 'UD. Hasil Laut Barokah', commodity: 'Cumi Segar & Udang Tiger', phone: '085678901234', area: 'Kendal / Sayung Demak' },
    { id: 'SUP-003', name: 'Pak Madi (Pengepul Tambak)', commodity: 'Bandeng Super & Udang Vaname', phone: '081987654321', area: 'Genuk, Semarang' },
  ]);

  const [form, setForm] = useState({ name: '', commodity: '', phone: '', area: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.commodity) return;
    const newId = `SUP-00${suppliers.length + 1}`;
    setSuppliers([...suppliers, { id: newId, ...form }]);
    setForm({ name: '', commodity: '', phone: '', area: '' });
  };

  return (
    <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Supplier & Nelayan Mitra</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Daftar jaringan penyuplai komoditas ikan segar PT Perdagangan Bahari Koh Ahong.
        </p>
      </div>

      {/* Form Tambah Mitra */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Tambah Mitra Supplier / Nelayan Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NAMA MITRA / KELOMPOK</label>
            <input 
              type="text" 
              placeholder="Cth: Pak Slamet (Nelayan)" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>KOMODITAS UTAMA</label>
            <input 
              type="text" 
              placeholder="Cth: Ikan Kakap & Cumi" 
              value={form.commodity} 
              onChange={(e) => setForm({ ...form, commodity: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NOMOR TELEPON / WA</label>
            <input 
              type="text" 
              placeholder="Cth: 08123456789" 
              value={form.phone} 
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>AREA / WILAYAH</label>
            <input 
              type="text" 
              placeholder="Cth: Semarang / Kendal" 
              value={form.area} 
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <button type="submit" style={{ width: '100%', padding: '11px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              + Tambah Mitra
            </button>
          </div>

        </form>
      </div>

      {/* Tabel Supplier & Nelayan */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Daftar Mitra Supplier & Nelayan Aktif</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
                <th style={{ padding: '14px 20px' }}>ID Mitra</th>
                <th style={{ padding: '14px 20px' }}>Nama Supplier / Nelayan</th>
                <th style={{ padding: '14px 20px' }}>Komoditas Utama</th>
                <th style={{ padding: '14px 20px' }}>Kontak (WhatsApp)</th>
                <th style={{ padding: '14px 20px' }}>Wilayah / Pangkalan</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#1e293b' }}>{item.name}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.commodity}</td>
                  <td style={{ padding: '16px 20px', color: '#0f172a' }}>{item.phone}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}