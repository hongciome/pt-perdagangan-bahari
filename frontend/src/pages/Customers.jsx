import { useState } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'Gumaya Tower Hotel', category: 'Hotel Bintang 5', contact: 'Chef Executive / Purchasing', phone: '024-8449888', area: 'Semarang Tengah' },
    { id: 'CUST-002', name: 'Hotel Santika Semarang', category: 'Hotel Bintang 4', contact: 'Pak Joko (F&B Manager)', phone: '024-8413191', area: 'Simpang Lima, Semarang' },
    { id: 'CUST-003', name: 'Restoran Bahari Indah', category: 'Fine Dining Seafood', contact: 'Bu Siska (Owner)', phone: '081233445566', area: 'Marina, Semarang' },
  ]);

  const [form, setForm] = useState({ name: '', category: '', contact: '', phone: '', area: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    const newId = `CUST-00${customers.length + 1}`;
    setCustomers([...customers, { id: newId, ...form }]);
    setForm({ name: '', category: '', contact: '', phone: '', area: '' });
  };

  return (
    <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Hotel & Customers B2B</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Daftar klien hotel bintang, restoran, dan katering mitra PT Perdagangan Bahari Koh Ahong.
        </p>
      </div>

      {/* Form Tambah Klien */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Tambah Klien Hotel / Restoran Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NAMA HOTEL / RESTO</label>
            <input 
              type="text" 
              placeholder="Cth: Hotel Tentrem" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>KATEGORI KLIEN</label>
            <input 
              type="text" 
              placeholder="Cth: Hotel Bintang 5" 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>KONTAK / PIC</label>
            <input 
              type="text" 
              placeholder="Cth: Purchasing / Chef" 
              value={form.contact} 
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>TELEPON</label>
            <input 
              type="text" 
              placeholder="Cth: 024-xxxxxxx" 
              value={form.phone} 
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>WILAYAH</label>
            <input 
              type="text" 
              placeholder="Cth: Semarang Pusat" 
              value={form.area} 
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <button type="submit" style={{ width: '100%', padding: '11px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              + Tambah Klien
            </button>
          </div>

        </form>
      </div>

      {/* Tabel Customers */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Daftar Klien Hotel & Restoran Aktif</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
                <th style={{ padding: '14px 20px' }}>ID Klien</th>
                <th style={{ padding: '14px 20px' }}>Nama Hotel / Resto</th>
                <th style={{ padding: '14px 20px' }}>Kategori</th>
                <th style={{ padding: '14px 20px' }}>Kontak PIC</th>
                <th style={{ padding: '14px 20px' }}>Telepon</th>
                <th style={{ padding: '14px 20px' }}>Wilayah</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#1e293b' }}>{item.name}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.category}</td>
                  <td style={{ padding: '16px 20px', color: '#0f172a' }}>{item.contact}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.phone}</td>
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