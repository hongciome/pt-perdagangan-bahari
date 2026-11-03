import React, { useState } from 'react';
import Sidebar from './components/Sidebar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col md:pl-64">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none border border-slate-200"
            >
              ☰
            </button>
            <span className="font-semibold text-slate-700 text-sm md:text-base">SEAFOOD OS / Dashboard</span>
          </div>
          <div className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Sigit Prakoso <span className="text-xs text-blue-600 font-semibold">(Owner)</span>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
            <p className="text-sm text-slate-500 mt-1">Sistem manajemen terpadu PT Perdagangan Bahari Koh Ahong.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Revenue</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">Rp 0</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Gross Profit</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">Rp 0</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Net Profit</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-2">Rp 0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
