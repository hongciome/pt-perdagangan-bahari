import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '0' }} className="main-content-area">
        <header style={{ height: '64px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
            >
              ☰
            </button>
            <span style={{ fontWeight: '600', color: '#334155', fontSize: '15px' }}>SEAFOOD OS / Dashboard</span>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: '#334155', backgroundColor: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            Sigit Prakoso <span style={{ color: '#2563eb', fontWeight: '600' }}>(Owner)</span>
          </div>
        </header>

        <main style={{ padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 6px 0' }}>Dashboard Overview</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Sistem manajemen terpadu PT Perdagangan Bahari Koh Ahong.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Total Revenue</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Rp 0</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Gross Profit</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Rp 0</p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>Net Profit</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Rp 0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
