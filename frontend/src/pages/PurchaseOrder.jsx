import React, { useEffect, useState } from 'react';
import { Truck, Plus, CheckCircle, XCircle, ArrowLeft, Thermometer, ShieldCheck } from 'lucide-react';

const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);

export default function PurchaseOrder({ onBack }) {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPOModal, setShowPOModal] = useState(false);
  const [showQCModal, setShowQCModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);

  const [formPO, setFormPO] = useState({ supplierId: '', productId: '', orderedQtyKg: 100 });
  const [formQC, setFormQC] = useState({ receivedQtyKg: 100, tempCelsius: 2, shrinkagePct: 1, isPassed: true });

  const fetchData = () => {
    fetch('/api/purchase/orders').then(res => res.json()).then(setOrders);
    fetch('/api/suppliers').then(res => res.json()).then(setSuppliers);
    fetch('/api/products').then(res => res.json()).then(setProducts);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmitPO = (e) => {
    e.preventDefault();
    fetch('/api/purchase/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formPO)
    }).then(() => { setShowPOModal(false); fetchData(); });
  };

  const handleOpenQC = (po) => {
    setSelectedPO(po);
    setFormQC({ receivedQtyKg: po.orderedQtyKg, tempCelsius: 2, shrinkagePct: 1, isPassed: true });
    setShowQCModal(true);
  };

  const handleSubmitQC = (e) => {
    e.preventDefault();
    fetch(`/api/purchase/orders/${selectedPO.id}/receive-qc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formQC)
    }).then(() => { setShowQCModal(false); fetchData(); });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button onClick={onBack} className="text-xs font-semibold text-blue-600 hover:underline mb-1 flex items-center gap-1">
            <ArrowLeft size={14} /> Kembali ke Dashboard
          </button>
          <h1 className="text-2xl font-bold text-slate-900">MODUL PEMBELIAN & QUALITY CONTROL</h1>
        </div>
        <button onClick={() => setShowPOModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
          <Plus size={18} /> Buat PO Baru
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b">
              <th className="p-3">No. PO</th>
              <th className="p-3">Order (KG)</th>
              <th className="p-3">Total Biaya</th>
              <th className="p-3">Status QC</th>
              <th className="p-3 text-center">Aksi QC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((po) => (
              <tr key={po.id} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-blue-600">{po.poNumber}</td>
                <td className="p-3 font-bold">{po.orderedQtyKg} kg</td>
                <td className="p-3 font-semibold">{formatRupiah(po.totalCost)}</td>
                <td className="p-3">
                  {po.qualityStatus === 'PENDING' && <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-semibold">Menunggu QC</span>}
                  {po.qualityStatus === 'PASSED' && <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">Lolos QC</span>}
                  {po.qualityStatus === 'REJECTED' && <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-full font-semibold">Ditolak</span>}
                </td>
                <td className="p-3 text-center">
                  {po.qualityStatus === 'PENDING' ? (
                    <button onClick={() => handleOpenQC(po)} className="bg-emerald-600 text-white text-xs px-3 py-1 rounded font-semibold">Input QC</button>
                  ) : <span className="text-xs text-slate-400">Selesai</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPOModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Buat PO Baru</h3>
            <form onSubmit={handleSubmitPO} className="space-y-3">
              <select value={formPO.supplierId} onChange={e => setFormPO({...formPO, supplierId: e.target.value})} className="w-full p-2 border rounded text-sm bg-white" required>
                <option value="">-- Pilih Supplier --</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select value={formPO.productId} onChange={e => setFormPO({...formPO, productId: e.target.value})} className="w-full p-2 border rounded text-sm bg-white" required>
                <option value="">-- Pilih Produk --</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <input type="number" required value={formPO.orderedQtyKg} onChange={e => setFormPO({...formPO, orderedQtyKg: e.target.value})} className="w-full p-2 border rounded text-sm" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPOModal(false)} className="px-3 py-1.5 border rounded text-sm">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-semibold">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showQCModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-3">Verifikasi Quality Control</h3>
            <form onSubmit={handleSubmitQC} className="space-y-3">
              <input type="number" step="0.1" required value={formQC.receivedQtyKg} onChange={e => setFormQC({...formQC, receivedQtyKg: e.target.value})} className="w-full p-2 border rounded text-sm" placeholder="Berat Diterima (KG)" />
              <input type="number" step="0.1" required value={formQC.tempCelsius} onChange={e => setFormQC({...formQC, tempCelsius: e.target.value})} className="w-full p-2 border rounded text-sm" placeholder="Suhu (°C)" />
              <input type="number" step="0.1" required value={formQC.shrinkagePct} onChange={e => setFormQC({...formQC, shrinkagePct: e.target.value})} className="w-full p-2 border rounded text-sm" placeholder="Susut (%)" />
              <select value={formQC.isPassed} onChange={e => setFormQC({...formQC, isPassed: e.target.value === 'true'})} className="w-full p-2 border rounded text-sm bg-white font-semibold">
                <option value="true">✅ LOLOS QC (Terima)</option>
                <option value="false">❌ TOLAK QC</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowQCModal(false)} className="px-3 py-1.5 border rounded text-sm">Batal</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 text-white rounded text-sm font-semibold">Simpan QC</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
