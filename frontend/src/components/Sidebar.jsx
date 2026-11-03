import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay hitam transparan di belakang sidebar saat terbuka di HP */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Konten Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <h1 className="font-bold text-lg tracking-wider">SEAFOOD OS</h1>
            <p className="text-xs text-slate-400">Procurement & BI</p>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-2 text-xl font-bold">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Utama</p>
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-600 text-white rounded-lg font-medium">Overview</a>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Operasional & Bisnis</p>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Hotel & Customers</a>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Supplier & Nelayan</a>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Fish Catalog</a>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">SP</div>
            <div>
              <p className="text-sm font-medium">Sigit Prakoso</p>
              <p className="text-xs text-emerald-400">● Production Active</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
