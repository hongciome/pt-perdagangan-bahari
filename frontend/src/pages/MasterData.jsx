import React, { useEffect, useState } from 'react';
import { Package, Users, Truck, Plus, Trash2, Search, ArrowLeft } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function MasterData({ onBack }) {
  const [activeTab, setActiveTab] = useState('products');
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  
  const [formProduct, setFormProduct] = useState({ sku: '', name: '', category: 'Ikan Laut', unit: 'KG', minStock: 50, standardCost: 0, standardPrice: 0 });
  const [formCustomer, setFormCustomer] = useState({ code: '', name: '', type: 'RESTORAN', phone: '', address: '', creditLimit: 0 });
  const [formSupplier, setFormSupplier] = useState({ code: '', name: '', contactPerson: '', phone: '', originRegion: '', bankAccount: '' });

  const fetchData = () => {
    fetch(`/api/${activeTab}`)
      .then(res => res.json())
      .then(data => setDataList(Array.isArray(data) ? data : []))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    fetch(`/api/${activeTab}/${id}`, { method: 'DELETE' })
      .then(() => fetchData())
      .catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = activeTab === 'products' ? formProduct : activeTab === 'customers' ? formCustomer : formSupplier;
    
    fetch(`/api/${activeTab}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => {
        setShowModal(false);
        fetchData();
      })
      .catch(console.error);
  };

  const filteredData = dataList.filter(item => 
    item.name?.toLowerCase().includes(search.toLowerCase()) || 
    item.sku?.toLowerCase().includes(search.toLowerCase()) ||
    item.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-blue-600 hover:underline mb-1 flex items-center gap-1">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-2xl font-bold text-slate-900">MODUL MASTER DATA</h1>
          <p className="text-sm text-slate-500">Kelola Produk Ikan, Pelanggan, dan Supplier</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Tambah Data Baru
        </button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 mb-6">
        <button 
          onClick={() => { setActiveTab('products'); setSearch(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-sm border-b-2 ${activeTab === 'products' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
        >
          <Package size={18} /> Katalog Produk Ikan
        </button>
        <button 
          onClick={() => { setActiveTab('customers'); setSearch(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-sm border-b-2 ${activeTab === 'customers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
        >
          <Users size={18} /> Data Pelanggan
        </button>
        <button 
          onClick={() => { setActiveTab('suppliers'); setSearch(''); }}
          className={`flex items-center gap-2 px-4 py-2.5 font-semibold text-sm border-b-2 ${activeTab === 'suppliers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}
        >
          <Truck size={18} /> Data Supplier
        </button>
      </div>

      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Cari berdasarkan nama atau kode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              {activeTab === 'products' && (
                <>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Nama Produk</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Harga Beli</th>
                  <th className="p-3">Harga Jual</th>
                  <th className="p-3 text-center">Aksi</th>
                </>
              )}
              {activeTab === 'customers' && (
                <>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Restoran / Hotel</th>
                  <th className="p-3">Tipe</th>
                  <th className="p-3">Telepon</th>
                  <th className="p-3 text-center">Aksi</th>
                </>
              )}
              {activeTab === 'suppliers' && (
                <>
                  <th className="p-3">Kode</th>
                  <th className="p-3">Nama Supplier</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3">Daerah Asal</th>
                  <th className="p-3 text-center">Aksi</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 text-slate-700">
                {activeTab === 'products' && (
                  <>
                    <td className="p-3 font-semibold text-slate-900">{item.sku}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{formatRupiah(item.standardCost)}</td>
                    <td className="p-3 font-semibold text-emerald-600">{formatRupiah(item.standardPrice)}</td>
                  </>
                )}
                {activeTab === 'customers' && (
                  <>
                    <td className="p-3 font-semibold text-slate-900">{item.code}</td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.type}</td>
                    <td className="p-3">{item.phone}</td>
                  </>
                )}
                {activeTab === 'suppliers' && (
                  <>
                    <td className="p-3 font-semibold text-slate-900">{item.code}</td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">{item.contactPerson}</td>
                    <td className="p-3">{item.originRegion}</td>
                  </>
                )}
                <td className="p-3 text-center">
                  <button onClick={() => handleDelete(item.id)} className="text-rose-500 hover:text-rose-700 p-1">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tambah Data Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {activeTab === 'products' && (
                <>
                  <input type="text" placeholder="SKU" required value={formProduct.sku} onChange={e => setFormProduct({...formProduct, sku: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Nama Produk" required value={formProduct.name} onChange={e => setFormProduct({...formProduct, name: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="number" placeholder="Harga Beli" required value={formProduct.standardCost} onChange={e => setFormProduct({...formProduct, standardCost: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="number" placeholder="Harga Jual" required value={formProduct.standardPrice} onChange={e => setFormProduct({...formProduct, standardPrice: e.target.value})} className="w-full p-2 border rounded text-sm" />
                </>
              )}
              {activeTab === 'customers' && (
                <>
                  <input type="text" placeholder="Kode Customer" required value={formCustomer.code} onChange={e => setFormCustomer({...formCustomer, code: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Nama Restoran/Hotel" required value={formCustomer.name} onChange={e => setFormCustomer({...formCustomer, name: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Telepon" required value={formCustomer.phone} onChange={e => setFormCustomer({...formCustomer, phone: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <textarea placeholder="Alamat" required value={formCustomer.address} onChange={e => setFormCustomer({...formCustomer, address: e.target.value})} className="w-full p-2 border rounded text-sm"></textarea>
                  <input type="number" placeholder="Batas Kredit" required value={formCustomer.creditLimit} onChange={e => setFormCustomer({...formCustomer, creditLimit: e.target.value})} className="w-full p-2 border rounded text-sm" />
                </>
              )}
              {activeTab === 'suppliers' && (
                <>
                  <input type="text" placeholder="Kode Supplier" required value={formSupplier.code} onChange={e => setFormSupplier({...formSupplier, code: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Nama Supplier" required value={formSupplier.name} onChange={e => setFormSupplier({...formSupplier, name: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Kontak" required value={formSupplier.contactPerson} onChange={e => setFormSupplier({...formSupplier, contactPerson: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Telepon" required value={formSupplier.phone} onChange={e => setFormSupplier({...formSupplier, phone: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Daerah Asal" required value={formSupplier.originRegion} onChange={e => setFormSupplier({...formSupplier, originRegion: e.target.value})} className="w-full p-2 border rounded text-sm" />
                  <input type="text" placeholder="Rekening Bank" required value={formSupplier.bankAccount} onChange={e => setFormSupplier({...formSupplier, bankAccount: e.target.value})} className="w-full p-2 border rounded text-sm" />
                </>
              )}
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-sm">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
