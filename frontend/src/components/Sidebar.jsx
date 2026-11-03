import React from 'react';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" />
      )}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg tracking-wider text-white">SEAFOOD OS</h2>
            <p className="text-xs text-slate-400">PT Perdagangan Bahari</p>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white text-xl font-bold p-1">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Utama</p>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-600 text-white rounded-lg font-medium shadow-sm">Overview</a>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Operasional & Bisnis</p>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Hotel & Customers</a>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Supplier & Nelayan</a>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Fish Catalog</a>
            <a href="#" className="block px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Quotation</a>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow">SP</div>
          <div>
            <p className="text-sm font-medium text-white">Sigit Prakoso</p>
            <p className="text-xs text-emerald-400 font-medium">● Owner Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
