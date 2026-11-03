import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
      )}
      <aside style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, width: '280px',
        backgroundColor: '#0f172a', color: '#ffffff', zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease-in-out',
        boxShadow: '4px 0 15px rgba(0,0,0,0.3)', overflowY: 'auto'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>SEAFOOD OS</h2>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>Procurement & BI</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer', padding: '4px' }}>✕</button>
        </div>

        <div style={{ padding: '20px', flex: 1 }}>
          {/* UTAMA */}
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Utama</p>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', marginBottom: '18px', fontWeight: '500', fontSize: '14px' }}>
            <span>📊</span> Overview
          </a>
          
          {/* OPERASIONAL & BISNIS */}
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Operasional & Bisnis</p>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>👥</span> Hotel & Customers</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>🐟</span> Supplier & Nelayan</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>📦</span> Fish Catalog</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '18px', borderRadius: '6px', fontSize: '13px' }}><span>📄</span> Quotation</a>

          {/* RANTAI PASOK & GUDANG */}
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Rantai Pasok & Gudang</p>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>🛒</span> Purchase Orders</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>📥</span> Procurement</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>🛡️</span> Quality Control</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '18px', borderRadius: '6px', fontSize: '13px' }}><span>🧊</span> Inventory (Cold Storage)</a>

          {/* PENJUALAN & DISTRIBUSI */}
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Penjualan & Distribusi</p>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>📈</span> Sales Orders</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '4px', borderRadius: '6px', fontSize: '13px' }}><span>🚚</span> Delivery Management</a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '10px', borderRadius: '6px', fontSize: '13px' }}><span>↩️</span> Returns Management</a>
        </div>

        <div style={{ padding: '15px 20px', borderTop: '1px solid #1e293b', backgroundColor: '#020617', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>A</div>
          <div>
            <p style={{ fontSize: '14px', margin: 0, fontWeight: '500', color: '#fff' }}>Agus</p>
            <p style={{ fontSize: '11px', color: '#34d399', margin: 0, fontWeight: '500' }}>● Production Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
