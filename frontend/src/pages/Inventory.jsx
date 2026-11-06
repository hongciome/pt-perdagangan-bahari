import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Sesuaikan path jika file supabase.ts/js berada di folder berbeda

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [fishName, setFishName] = useState('');
  const [gradeSize, setGradeSize] = useState('');
  const [stockKg, setStockKg] = useState('');
  const [pricePerKg, setPricePerKg] = useState('');
  const [loading, setLoading] = useState(false);

  // Ambil data stok saat komponen dimuat
  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const { data, error } = await supabase.from('inventory').select('*').order('id', { ascending: false });
    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      setInventory(data || []);
    }
  }

  // Fungsi tambah stok ikan baru ke Supabase
  async function handleAddStock(e) {
    e.preventDefault();
    if (!fishName || !gradeSize || !stockKg || !pricePerKg) return;

    setLoading(true);
    const { error } = await supabase.from('inventory').insert([
      {
        fish_name: fishName,
        grade_size: gradeSize,
        stock_kg: parseFloat(stockKg),
        price_per_kg: parseFloat(pricePerKg),
      },
    ]);

    if (error) {
      console.error('Error inserting stock:', error);
      alert('Gagal menambah stok!');
    } else {
      // Reset form & refresh data
      setFishName('');
      setGradeSize('');
      setStockKg('');
      setPricePerKg('');
      fetchInventory();
    }
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manajemen Stok Komoditas Ikan Segar</h1>

      {/* Form Input Stok Baru */}
      <form onSubmit={handleAddStock} className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ikan</label>
          <input
            type="text"
            placeholder="Cth: Tuna / Kakap"
            value={fishName}
            onChange={(e) => setFishName(e.target.value)}
            className="w-full border rounded-md p-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade / Ukuran</label>
          <input
            type="text"
            placeholder="Cth: Grade A / Super"
            value={gradeSize}
            onChange={(e) => setGradeSize(e.target.value)}
            className="w-full border rounded-md p-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stok (Kg)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={stockKg}
            onChange={(e) => setStockKg(e.target.value)}
            className="w-full border rounded-md p-2 text-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harga / Kg (Rp)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0"
            value={pricePerKg}
            onChange={(e) => setPricePerKg(e.target.value)}
            className="w-full border rounded-md p-2 text-black"
            required
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Menyimpan...' : 'Tambah Stok Ikan'}
          </button>
        </div>
      </form>

      {/* Tabel Daftar Stok */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-600">Nama Ikan</th>
              <th className="text-left p-4 font-semibold text-gray-600">Grade / Ukuran</th>
              <th className="text-right p-4 font-semibold text-gray-600">Stok (Kg)</th>
              <th className="text-right p-4 font-semibold text-gray-600">Harga / Kg</th>
            </tr>
          </thead>
          <tbody className="divide-y text-black">
            {inventory.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Belum ada data stok ikan. Silakan tambah lewat form di atas.
                </td>
              </tr>
            ) : (
              inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.fish_name}</td>
                  <td className="p-4 text-gray-600">{item.grade_size}</td>
                  <td className="p-4 text-right">{item.stock_kg} Kg</td>
                  <td className="p-4 text-right">Rp {Number(item.price_per_kg).toLocaleString('id-ID')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}