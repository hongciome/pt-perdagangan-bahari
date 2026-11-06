import { useState } from 'react';

export default function QualityControlPage() {
  const [inspections, setInspections] = useState([
    { id: '#QC-202611-001', batch: 'BTCH-KM02-01', supplier: 'Pak Kasan (KM Bahari 02)', commodity: 'Ikan Kakap Merah Segar', temp: -1.5, score: '9.2 / 10', inspector: 'Sigit Prakoso', status: 'Lolos QC (Grade A)' },
    { id: '#QC-202611-002', batch: 'BTCH-UDLJ-04', supplier: 'H. Slamet (UD Laut Jaya)', commodity: 'Cumi-cumi Sero', temp: 0.2, score: '8.5 / 10', inspector: 'Sigit Prakoso', status: 'Lolos QC (Grade A)' },
    { id: '#QC-202611-003', batch: 'BTCH-PKL-02', supplier: 'Armada Pekalongan', commodity: 'Udang Vaname', temp: 3.5, score: '6.8 / 10', inspector: 'Sigit Prakoso', status: 'Downgrade (Grade B)' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newQC, setNewQC] = useState({ batch: '', supplier: '', commodity: '', temp: 0, score: '9.0', status: 'Lolos QC (Grade A)' });

  const handleAddQC = (e) => {
    e.preventDefault();
    if (!newQC.batch || !newQC.supplier) return;
    const nextId = `#QC-202611-0${String(inspections.length + 1).padStart(2, '0')}`;
    setInspections([
      ...inspections,
      {
        id: nextId,
        ...newQC,
        temp: Number(newQC.temp),
        score: `${newQC.score} / 10`,
        inspector: 'Sigit Prakoso'
      }
    ]);
    setNewQC({ batch: '', supplier: '', commodity: '', temp: 0, score: '9.0', status: 'Lolos QC (Grade A)' });
    setShowModal(false);
  };

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Inspeksi Mutu & Quality Control (QC)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Pengujian suhu palka/es, organoleptik mata & insang saat pembongkaran ikan dari nelayan.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Input Inspeksi QC
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Inspeksi Pembongkaran</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{inspections.length} Batch</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Tingkat Kelulusan Grade A</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            {Math.round((inspections.filter(i => i.status.includes('Grade A')).length / inspections.length) * 100)}%
          </h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Rata-rata Suhu Palka / Es</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0369a1' }}>
            {(inspections.reduce((a, b) => a + b.temp, 0) / inspections.length).toFixed(1)} °C
          </h3>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Laporan QC</th>
              <th style={{ padding: '12px 16px' }}>Kode Batch Pasokan</th>
              <th style={{ padding: '12px 16px' }}>Supplier Nelayan</th>
              <th style={{ padding: '12px 16px' }}>Komoditas</th>
              <th style={{ padding: '12px 16px' }}>Suhu (°C)</th>
              <th style={{ padding: '12px 16px' }}>Skor Kesegaran</th>
              <th style={{ padding: '12px 16px' }}>Inspektor</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Hasil QC</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>{item.batch}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.supplier}</td>
                <td style={{ padding: '14px 16px', color: '#475569' }}>{item.commodity}</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: item.temp <= 2 ? '#0284c7' : '#dc2626' }}>{item.temp} °C</td>
                <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>{item.score}</td>
                <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.inspector}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                    backgroundColor: item.status.includes('Grade A') ? '#dcfce7' : '#fef3c7',
                    color: item.status.includes('Grade A') ? '#15803d' : '#b45309'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Input Inspeksi QC Baru</h3>
            <form onSubmit={handleAddQC}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Kode Batch Pasokan</label>
                <input type="text" required value={newQC.batch} onChange={(e) => setNewQC({...newQC, batch: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="BTCH-KM02-05" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Supplier / Armada Nelayan</label>
                <input type="text" required value={newQC.supplier} onChange={(e) => setNewQC({...newQC, supplier: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Pak Kasan (KM Bahari 02)" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Komoditas Ikan</label>
                <input type="text" required value={newQC.commodity} onChange={(e) => setNewQC({...newQC, commodity: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Ikan Kakap Merah Segar" />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Suhu Palka (°C)</label>
                <input type="number" step="0.1" required value={newQC.temp} onChange={(e) => setNewQC({...newQC, temp: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="-1.5" />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Keputusan QC</label>
                <select value={newQC.status} onChange={(e) => setNewQC({...newQC, status: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                  <option value="Lolos QC (Grade A)">Lolos QC (Grade A)</option>
                  <option value="Downgrade (Grade B)">Downgrade (Grade B)</option>
                  <option value="Tolak / Reject">Tolak / Reject</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: '8px 14px', backgroundColor: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Batal</button>
                <button type="submit" style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Simpan QC</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}