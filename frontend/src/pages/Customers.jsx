import { useState } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Gumaya Tower Hotel', type: 'Hotel 5 Stars', phone: '0812-3456-7890', status: 'Aktif', unpaid: 4500000 },
    { id: 2, name: 'Restoran Seafood Super', type: 'Restoran / Cafe', phone: '0813-9876-5432', status: 'Aktif', unpaid: 0 },
    { id: 3, name: 'Grand Candi Hotel', type: 'Hotel 5 Stars', phone: '0811-2233-4455', status: 'Pending', unpaid: 12000000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', type: 'Hotel 4 Stars', phone: '', unpaid: 0 });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustomer.name) return;
    setCustomers([
      ...customers,
      { id: Date.now(), ...newCustomer, status: 'Aktif', unpaid: Number(newCustomer.unpaid) || 0 }
    ]);
    setNewCustomer({ name: '', type: 'Hotel 4 Stars', phone: '', unpaid: 0 });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header Halaman */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Manajemen Hotel & Customers B2B</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Kelola daftar mitra hotel, restoran, dan pemantauan piutang PT Perdagangan Bahari Koh Ahong.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Tambah Mitra B2B
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Mitra B2B</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{customers.length} Klien</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Mitra Aktif</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>{customers.filter(c => c.status === 'Aktif').length} Klien</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Piutang Berjalan</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#dc2626' }}>
            Rp {customers.reduce((acc, curr) => acc + Number(curr.unpaid), 0).toLocaleString('id-ID')}
          </h3>
        </div>
      </div>

      {/* Tabel Data Mitra */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Nama Perusahaan / Klien</th>
              <th style={{ padding: '12px 16px' }}>Kategori</th>
              <th style={{ padding: '12px 16px' }}>No. WhatsApp / Telepon</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>Piutang (Rp)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>{item.name}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.type}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.phone}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status === 'Aktif' ? '#dcfce7' : '#fef3c7',
                    color: item.status === 'Aktif' ? '#15803d' : '#b45309'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: item.unpaid > 0 ? '#dc2626' : '#16a34a' }}>
                  Rp {item.unpaid.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <button style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup Tambah Mitra */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Tambah Mitra B2B Baru</h3>
            <form onSubmit={handleAddCustomer}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Perusahaan / Hotel</label>
                <input 
                  type="text" 
                  required 
                  value={newCustomer.name} 
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Hotel Ciputra Semarang"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Kategori</label>
                <select 
                  value={newCustomer.type} 
                  onChange={(e) => setNewCustomer({...newCustomer, type: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  <option value="Hotel 5 Stars">Hotel 5 Stars</option>
                  <option value="Hotel 4 Stars">Hotel 4 Stars</option>
                  <option value="Hotel 3 Stars">Hotel 3 Stars</option>
                  <option value="Restoran / Cafe">Restoran / Cafe</option>
                  <option value="Grosir / Distributor">Grosir / Distributor</option>
                </select>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>No. WhatsApp / Telp</label>
                <input 
                  type="text" 
                  value={newCustomer.phone} 
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="0812xxxxxxx"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Piutang Awal (Rp)</label>
                <input 
                  type="number" 
                  value={newCustomer.unpaid} 
                  onChange={(e) => setNewCustomer({...newCustomer, unpaid: e.target.value})}
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
                  Simpan Mitra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}