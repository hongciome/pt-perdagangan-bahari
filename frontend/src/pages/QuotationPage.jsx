import { useState } from 'react';

export default function QuotationPage() {
  const [quotations, setQuotations] = useState([
    { id: 'QT-202611-001', client: 'Hotel Tentrem Semarang', items: 'Kakap Merah Grade A (30kg), Udang Vaname (20kg)', total: 4500000, date: '2026-11-01', validUntil: '2026-11-15', status: 'APPROVED' },
    { id: 'QT-202611-002', client: 'PO Semarang Resto', items: 'Cumi Sero (40kg), Tenggiri Giling (25kg)', total: 2800000, date: '2026-11-03', validUntil: '2026-11-17', status: 'SENT' },
    { id: 'QT-202611-003', client: 'Novotel Semarang', items: 'Kerapu Macan (15kg), Salmon Fillet (10kg)', total: 4200000, date: '2026-11-06', validUntil: '2026-11-20', status: 'DRAFT' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newQuo, setNewQuo] = useState({ client: '', items: '', total: 0, validUntil: '' });

  const handleAddQuo = (e) => {
    e.preventDefault();
    if (!newQuo.client || !newQuo.items) return;

    const nextId = `QT-202611-0${String(quotations.length + 1).padStart(2, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    setQuotations([
      ...quotations,
      {
        id: nextId,
        ...newQuo,
        total: Number(newQuo.total) || 0,
        date: today,
        status: 'SENT'
      }
    ]);
    setNewQuo({ client: '', items: '', total: 0, validUntil: '' });
    setShowModal(false);
  };

  const totalValue = quotations.reduce((acc, curr) => acc + Number(curr.total), 0);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header Halaman */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>QUOTATION (PENAWARAN HARGA)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Kelola draf penawaran harga komoditas ikan segar untuk klien VIP hotel dan restoran.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Buat Quotation Baru
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Dokumen Quotation</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{quotations.length} Dokumen</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Potensi Nilai Penawaran</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            Rp {totalValue.toLocaleString('id-ID')}
          </h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Status Disetujui (Approved)</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#2563eb' }}>
            {quotations.filter(q => q.status === 'APPROVED').length} Dokumen
          </h3>
        </div>
      </div>

      {/* Tabel Data Quotation */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold', color: '#0f172a', fontSize: '15px' }}>
          📄 Daftar Dokumen Quotation B2B
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Quotation</th>
              <th style={{ padding: '12px 16px' }}>Nama Klien (Hotel / Restoran)</th>
              <th style={{ padding: '12px 16px' }}>Tanggal Dibuat</th>
              <th style={{ padding: '12px 16px' }}>Estimasi Nilai</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Aksi Dokumen</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>{item.client}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>
                  Rp {item.total.toLocaleString('id-ID')}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status === 'APPROVED' ? '#dcfce7' : item.status === 'SENT' ? '#e0f2fe' : '#f1f5f9',
                    color: item.status === 'APPROVED' ? '#15803d' : item.status === 'SENT' ? '#0369a1' : '#64748b'
                  }}>
                    {item.status === 'APPROVED' ? '✔ APPROVED' : item.status === 'SENT' ? '📩 SENT' : '📝 DRAFT'}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <button 
                    onClick={() => alert(`Mencetak PDF untuk ${item.id}`)}
                    style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    🖨️ Cetak PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Popup Buat Quotation Baru */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Buat Penawaran Harga Baru</h3>
            <form onSubmit={handleAddQuo}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Nama Klien / Hotel / Restoran</label>
                <input 
                  type="text" 
                  required 
                  value={newQuo.client} 
                  onChange={(e) => setNewQuo({...newQuo, client: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Hotel Aruss Semarang"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Rincian Komoditas & Volume</label>
                <input 
                  type="text" 
                  required
                  value={newQuo.items} 
                  onChange={(e) => setNewQuo({...newQuo, items: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: Kakap Merah (25kg), Cumi (15kg)"
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Total Estimasi Nilai (Rp)</label>
                <input 
                  type="number" 
                  required
                  value={newQuo.total} 
                  onChange={(e) => setNewQuo({...newQuo, total: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="4500000"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Berlaku Sampai Tanggal</label>
                <input 
                  type="date" 
                  required
                  value={newQuo.validUntil} 
                  onChange={(e) => setNewQuo({...newQuo, validUntil: e.target.value})}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
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
                  Simpan Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}