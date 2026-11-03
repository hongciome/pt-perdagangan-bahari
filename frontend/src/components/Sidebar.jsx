import React, { useEffect } from 'react';

export default function Sidebar({ isOpen, onClose }) {
  // Menutup sidebar otomatis jika layar diklik di luar area menu saat aktif di HP
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest('#mobile-sidebar') && !event.target.closest('#sidebar-toggle-btn')) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'bg-black/50 visible' : 'bg-transparent invisible pointer-events-none'}`}>
      <div id="mobile-sidebar" className={`absolute left-0 top-0 bottom-0 w-64 bg-slate-900 text-white p-4 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">SEAFOOD OS</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold p-2">✕</button>
        </div>
        {/* Menu Navigasi */}
        <nav className="space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-slate-800">Overview</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800">Hotel & Customers</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800">Supplier & Nelayan</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800">Fish Catalog</a>
          <a href="#" className="block p-2 rounded hover:bg-slate-800">Settings</a>
        </nav>
      </div>
    </div>
  );
}
