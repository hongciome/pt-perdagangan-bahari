import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
      )}
      <aside style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, width: '260px',
        backgroundColor: '#0f172a', color: '#fff', zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>SEAFOOD OS</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Procurement & BI</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Utama</p>
          <a href="#" style={{ display: 'block', padding: '10px', background: '#2563eb', color: '#fff', borderRadius: '6px', textDecoration: 'none', marginBottom: '15px' }}>Overview</a>
          
          <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>Operasional</p>
          <a href="#" style={{ display: 'block', padding: '8px 10px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '5px' }}>Hotel & Customers</a>
          <a href="#" style={{ display: 'block', padding: '8px 10px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '5px' }}>Supplier & Nelayan</a>
          <a href="#" style={{ display: 'block', padding: '8px 10px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '5px' }}>Fish Catalog</a>
        </div>
        <div style={{ padding: '15px 20px', borderTop: '1px solid #1e293b', background: '#020617', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>SP</div>
          <div>
            <p style={{ fontSize: '14px', margin: 0, fontWeight: 500 }}>Sigit Prakoso</p>
            <p style={{ fontSize: '11px', color: '#34d399', margin: 0 }}>● Production Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
