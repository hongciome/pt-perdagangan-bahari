import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Sesuaikan path jika folder lib berbeda

export default function SalesOrder() {
  const [salesOrders, setSalesOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [inventory, setInventory] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedFish, setSelectedFish] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchClients();
    fetchInventory();
  }, []);

  // Ambil data transaksi dari Supabase beserta relasi klien
  async function fetchOrders() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, clients(client_name), transaction_items(quantity_kg, inventory(fish_name, grade_size))')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      // Format data agar mudah dibaca di tabel
      const formatted = (data || []).map(trx => {
        const itemDetail = trx.transaction_items?.[0];
        const fishDesc = itemDetail 
          ? `${itemDetail.inventory?.fish_name} (${itemDetail.inventory?.grade_size}) - ${itemDetail.quantity_kg} Kg` 
          : 'Komoditas Seafood';

        return {
          id: trx.id,
          client: trx.clients?.client_name || 'Klien Umum',
          items: fishDesc,
          total: Number(trx.total_amount) || 0,
          date: trx.order_date ? trx.order_date.split('T')[0] : '',
          status: trx.status || 'Menunggu Konfirmasi'
        };
      });
      setSalesOrders(formatted);
    }
  }

  async function fetchClients() {
    const { data, error } = await supabase.from('clients').select('*');
    if (!error) setClients(data || []);
  }

  async function fetchInventory() {
    const { data, error } = await supabase.from('inventory').select('*');
    if (!error) setInventory(data || []);
  }

  // Fungsi simpan Sales Order baru ke Supabase
  const handleAddSO = async (e) => {
    e.preventDefault();
    if (!selectedClient || !selectedFish || !quantityKg) return;

    setLoading(true);
    const fishItem = inventory.find((item) => item.id === parseInt(selectedFish));
    if (!fishItem) {
      alert('Pilihan ikan tidak ditemukan!');
      setLoading(false);
      return;
    }

    const qty = parseFloat(quantityKg);
    const subtotal = qty * fishItem.price_per_kg;
    const transactionId = '#SO-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);

    // 1. Insert ke tabel transactions
    const { error: trxError } = await supabase.from('transactions').insert([
      {
        id: transactionId,
        client_id: parseInt(selectedClient),
        total_amount: subtotal,
        status: 'Menunggu Konfirmasi'
      }
    ]);

    if (trxError) {
      console.error('Error insert transaction:', trxError);
      alert('Gagal menyimpan Sales Order!');
      setLoading(false);
      return;
    }

    // 2. Insert ke tabel transaction_items
    await supabase.from('transaction_items').insert([
      {
        transaction_id: transactionId,
        inventory_id: fishItem.id,
        quantity_kg: qty,
        subtotal: subtotal
      }
    ]);

    // Reset form & tutup modal
    setSelectedClient('');
    setSelectedFish('');
    setQuantityKg('');
    setShowModal(false);
    setLoading(false);
    fetchOrders(); // Refresh data tabel
  };

  const totalRevenue = salesOrders.reduce((acc, curr) => acc + Number(curr.total), 0);

  return (
    <div style={{ padding: '30px', width: '100%', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#1e293b' }}>Sales Orders (Pesanan Penjualan B2B Hotel & Resto)</h2>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '14px' }}>Pencatatan pesanan penjualan komoditas seafood yang masuk dari mitra hotel & restoran.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          style={{ padding: '10px 18px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Buat Sales Order Baru
        </button>
      </div>

      {/* Ringkasan Statistik */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Transaksi Penjualan</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#0f172a' }}>{salesOrders.length} Order</h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Omset Penjualan</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#16a34a' }}>
            Rp {totalRevenue.toLocaleString('id-ID')}
          </h3>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Status Butuh Konfirmasi</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#d97706' }}>
            {salesOrders.filter(s => s.status === 'Menunggu Konfirmasi').length} Order
          </h3>
        </div>
      </div>

      {/* Tabel Data Sales Order */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>No. Sales Order</th>
              <th style={{ padding: '12px 16px' }}>Tanggal</th>
              <th style={{ padding: '12px 16px' }}>Klien / Hotel / Resto</th>
              <th style={{ padding: '12px 16px' }}>Detail Komoditas & Volume</th>
              <th style={{ padding: '12px 16px' }}>Total Tagihan (Rp)</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Status Order</th>
            </tr>
          </thead>
          <tbody>
            {salesOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                  Belum ada data Sales Order. Silakan buat pesanan baru.
                </td>
              </tr>
            ) : (
              salesOrders.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#2563eb' }}>{item.id}</td>
                  <td style={{ padding: '14px 16px', color: '#64748b' }}>{item.date}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#1e293b' }}>🏨 {item.client}</td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{item.items}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 'bold', color: '#0f172a' }}>
                    Rp {item.total.toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold',
                      backgroundColor: item.status === 'Selesai / Dikirim' ? '#dcfce7' : item.status === 'Proses Gudang' ? '#e0f2fe' : '#fef3c7',
                      color: item.status === 'Selesai / Dikirim' ? '#15803d' : item.status === 'Proses Gudang' ? '#0369a1' : '#b45309'
                    }}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Tambah SO (Terhubung Supabase) */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', width: '450px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a' }}>Buat Sales Order Baru</h3>
            <form onSubmit={handleAddSO}>
              
              {/* Dropdown Klien */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Pilih Klien / Hotel / Resto</label>
                <select 
                  required 
                  value={selectedClient} 
                  onChange={(e) => setSelectedClient(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                >
                  <option value="">-- Pilih Mitra Klien --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.client_name}</option>
                  ))}
                </select>
              </div>

              {/* Dropdown Komoditas Ikan dari Inventory */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Pilih Stok Ikan</label>
                <select 
                  required 
                  value={selectedFish} 
                  onChange={(e) => setSelectedFish(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                >
                  <option value="">-- Pilih Komoditas Ikan --</option>
                  {inventory.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.fish_name} ({inv.grade_size}) - Rp {Number(inv.price_per_kg).toLocaleString('id-ID')}/Kg
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Volume Kg */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '4px' }}>Volume (Kg)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={quantityKg} 
                  onChange={(e) => setQuantityKg(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
                  placeholder="Contoh: 50"
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
                  disabled={loading}
                  style={{ padding: '8px 14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {loading ? 'Menyimpan...' : 'Simpan Sales Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}