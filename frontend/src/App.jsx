import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex text-slate-800">
      {/* Sidebar Komponen */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Header atas khusus mobile / umum */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              ☰
            </button>
            <span className="font-semibold text-slate-700">SEAFOOD OS / Dashboard</span>
          </div>
          <div className="text-sm font-medium text-slate-600">
            Sigit Prakoso <span className="text-xs text-slate-400">(Owner)</span>
          </div>
        </header>

        {/* Area Dashboard / Konten */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">Rp 0</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Gross Profit</p>
              <p className="text-2xl font-bold mt-1">Rp 0</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-semibold uppercase">Net Profit</p>
              <p className="text-2xl font-bold mt-1">Rp 0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
