import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ invoice_number: '', client_id: '', total_amount: '', due_date: '', payment_status: 'Belum Lunas' });
  const [loading, setLoading] = useState(true);

  // Ambil data dari tabel 'invoices' Supabase saat halaman dibuka
  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('invoices').select('*');
      if (error) throw error;
      if (data) setInvoices(data);
    } catch (error) {
      console.error('Gagal memuat invoices:', error.message);
    } finally {
      setLoading(false);
    }
  }

  // Tambah faktur baru ke Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.invoice_number || !form.client_id || !form.total_amount || !form.due_date) return;

    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert([
          { 
            invoice_number: form.invoice_number, 
            client_id: Number(form.client_id), 
            total_amount: Number(form.total_amount), 
            due_date: form.due_date,
            payment_status: form.payment_status 
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        setInvoices([...invoices, data[0]]);
        setForm({ invoice_number: '', client_id: '', total_amount: '', due_date: '', payment_status: 'Belum Lunas' });
      }
    } catch (error) {
      console.error('Gagal menambah faktur:', error.message);
      alert('Gagal menyimpan faktur ke database Supabase.');
    }
  };

  return (
    <div style={{ width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      
      {/* Header Halaman */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '26px' }}>Manajemen Faktur & Tagihan (Invoices)</h2>
        <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>
          Kontrol penagihan piutang dan tempo pembayaran klien hotel & restoran (Live Supabase).
        </p>
      </div>

      {/* Form Tambah Faktur */}
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#0f172a' }}>+ Buat Faktur Tagihan Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>NO. FAKTUR</label>
            <input 
              type="text" 
              placeholder="Cth: INV-2026-001" 
              value={form.invoice_number} 
              onChange={(e) => setForm({ ...form, invoice_number: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>ID KLIEN (SUPABASE)</label>
            <input 
              type="number" 
              placeholder="Cth: 1" 
              value={form.client_id} 
              onChange={(e) => setForm({ ...form, client_id: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>TOTAL TAGIHAN (RP)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={form.total_amount} 
              onChange={(e) => setForm({ ...form, total_amount: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>JATUH TEMPO</label>
            <input 
              type="date" 
              value={form.due_date} 
              onChange={(e) => setForm({ ...form, due_date: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', backgroundColor: 'white' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '6px' }}>STATUS PEMBAYARAN</label>
            <select 
              value={form.payment_status} 
              onChange={(e) => setForm({ ...form, payment_status: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box', backgroundColor: 'white' }}>
              <option value="Belum Lunas">Belum Lunas</option>
              <option value="Lunas">Lunas</option>
              <option value="Jatuh Tempo">Jatuh Tempo</option>
            </select>
          </div>

          <div>
            <button type="submit" style={{ width: '100%', padding: '11px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
              Simpan Faktur
            </button>
          </div>

        </form>
      </div>

      {/* Tabel Invoices */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px' }}>Daftar Faktur (Live Supabase)</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Memuat data faktur...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px', minWidth: '600px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
                  <th style={{ padding: '14px 20px' }}>No. Faktur</th>
                  <th style={{ padding: '14px 20px' }}>ID Klien</th>
                  <th style={{ padding: '14px 20px' }}>Total Tagihan</th>
                  <th style={{ padding: '14px 20px' }}>Jatuh Tempo</th>
                  <th style={{ padding: '14px 20px' }}>Status Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Belum ada data faktur di database.</td>
                  </tr>
                ) : (
                  invoices.map((item, index) => (
                    <tr key={item.id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#2563eb' }}>{item.invoice_number}</td>
                      <td style={{ padding: '16px 20px', color: '#1e293b' }}>Klien ID: {item.client_id}</td>
                      <td style={{ padding: '16px 20px', fontWeight: 'bold', color: '#0f172a' }}>Rp {Number(item.total_amount).toLocaleString('id-ID')}</td>
                      <td style={{ padding: '16px 20px', color: '#64748b' }}>{item.due_date}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                          backgroundColor: item.payment_status === 'Lunas' ? '#dcfce7' : item.payment_status === 'Jatuh Tempo' ? '#fee2e2' : '#fef08a',
                          color: item.payment_status === 'Lunas' ? '#15803d' : item.payment_status === 'Jatuh Tempo' ? '#991b1b' : '#854d0e'
                        }}>
                          {item.payment_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}