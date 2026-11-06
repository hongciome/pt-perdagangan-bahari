import { useState } from 'react';

export default function QuotationPage() {
  const [quotations, setQuotations] = useState([
    { id: 'QT-2026-001', client: 'Gumaya Tower Hotel', date: '2026-11-06', items: 'Ikan Kakap Merah Super (50 Kg)', total: 3750000, status: 'Terkirim' },
    { id: 'QT-2026-002', client: 'Hotel Santika Semarang', date: '2026-11-05', items: 'Cumi Segar & Udang Tiger (40 Kg)', total: 5200000, status: 'Disetujui' },
  ]);

  const [form, setForm] = useState({ client: '', items: '', total: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.client || !form.items || !form.total) return;
    const newId = `QT-2026-00${quotations.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    
    setQuotations([...quotations, { id: newId, client: form.client, date: today, items: form.items, total: Number(form.total), status: 'Draft / Terkirim' }]);
    setForm({ client: '', items: '', total: '' });
  };

  return (
    <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Surat Penawaran Harga (Quotation)</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Kelola draf dan pengiriman penawaran harga komoditas ikan segar ke klien hotel & restoran.
        </p>
      </div>

      {/* Form Buat Quotation Baru */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>Buat Penawaran Harga Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NAMA KLIEN / HOTEL</label>
            <input 
              type="text" 
              placeholder="Cth: Hotel Tentrem Semarang" 
              value={form.client} 
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>DETAIL KOMODITAS & QTY</label>
            <input 
              type="text" 
              placeholder="Cth: Kerapu Macan - 30 Kg" 
              value={form.items} 
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>ESTIMASI TOTAL (RP)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={form.total} 
              onChange={(e) => setForm({ ...form, total: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <button type="submit" style={{ width: '100%', padding: '11px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              + Buat Quotation
            </button>
          </div>

        </form>
      </div>

      {/* Tabel Daftar Quotation */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Riwayat Surat Penawaran Harga</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
                <th style={{ padding: '14px 20px' }}>No. Quotation</th>
                <th style={{ padding: '14px 20px' }}>Klien / Hotel</th>
                <th style={{ padding: '14px 20px' }}>Tanggal</th>
                <th style={{ padding: '14px 20px' }}>Komoditas</th>
                <th style={{ padding: '14px 20px' }}>Total Estimasi</th>
                <th style={{ padding: '14px 20px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#1e293b' }}>{item.client}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.date}</td>
                  <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.items}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#0f172a' }}>Rp {item.total.toLocaleString('id-ID')}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: item.status === 'Disetujui' ? '#dcfce7' : '#e0f2fe',
                      color: item.status === 'Disetujui' ? '#15803d' : '#0369a1'
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}