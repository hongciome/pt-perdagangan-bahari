import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }} />
      )}
      <aside style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, width: '260px',
        backgroundColor: '#0f172a', color: '#ffffff', zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease-in-out',
        boxShadow: '4px 0 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>SEAFOOD OS</h2>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>PT Perdagangan Bahari</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer', padding: '4px' }}>✕</button>
        </div>

        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Utama</p>
          <a href="#" style={{ display: 'block', padding: '10px 12px', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', marginBottom: '20px', fontWeight: '500', fontSize: '14px' }}>Overview</a>
          
          <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Operasional & Bisnis</p>
          <a href="#" style={{ display: 'block', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '6px', borderRadius: '6px', fontSize: '14px' }}>Hotel & Customers</a>
          <a href="#" style={{ display: 'block', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '6px', borderRadius: '6px', fontSize: '14px' }}>Supplier & Nelayan</a>
          <a href="#" style={{ display: 'block', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '6px', borderRadius: '6px', fontSize: '14px' }}>Fish Catalog</a>
          <a href="#" style={{ display: 'block', padding: '8px 12px', color: '#cbd5e1', textDecoration: 'none', marginBottom: '6px', borderRadius: '6px', fontSize: '14px' }}>Quotation</a>
        </div>

        <div style={{ padding: '15px 20px', borderTop: '1px solid #1e293b', backgroundColor: '#020617', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>SP</div>
          <div>
            <p style={{ fontSize: '14px', margin: 0, fontWeight: '500', color: '#fff' }}>Sigit Prakoso</p>
            <p style={{ fontSize: '11px', color: '#34d399', margin: 0, fontWeight: '500' }}>● Owner Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
