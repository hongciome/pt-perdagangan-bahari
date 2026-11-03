import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif', color: '#1e293b' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: '60px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', position: 'sticky', top: 0, zIndex: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => setSidebarOpen(true)}
              style={{ background: 'none', border: '1px solid #cbd5i1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}
            >
              ☰
            </button>
            <span style={{ fontWeight: 600, color: '#475569' }}>SEAFOOD OS / Dashboard</span>
          </div>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>
            Sigit Prakoso <span style={{ color: '#64748b', fontSize: '12px' }}>(Owner)</span>
          </div>
        </header>

        <main style={{ padding: '25px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Total Revenue</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Rp 0</p>
            </div>
            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Gross Profit</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Rp 0</p>
            </div>
            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 5px 0' }}>Net Profit</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Rp 0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
