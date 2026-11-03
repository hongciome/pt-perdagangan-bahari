import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, Truck, Package, FileText, 
  ShoppingCart, ShieldCheck, Database, Send, RotateCcw, 
  CreditCard, BarChart3, PieChart, Settings, Search, Bell, ChevronLeft, ChevronRight, Anchor, CheckCircle2, AlertTriangle, User, Camera, LogOut, Info 
} from 'lucide-react';

export default function SidebarLayout({ activePage, setActivePage, children, currentUser, onLogout, profileName, setProfileName, profileImage, setProfileImage }) {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DAFTAR NOTIFIKASI TERINTEGRASI DARI PORTAL B2B & SUPPLIER
  const notifications = [
    { id: 1, title: 'Laporan Tangkapan Baru', desc: 'Nelayan Jepara melaporkan 150 kg Kerapu Macan. Segera buat PO.', time: 'Baru saja', type: 'info', targetPage: 'purchaseOrder' },
    { id: 2, title: 'Pesanan Baru (B2B Portal)', desc: 'Hotel Tentrem mengirim PO untuk 50 kg Kakap Merah.', time: '5 menit lalu', type: 'success', targetPage: 'salesOrder' },
    { id: 3, title: 'Permintaan Retur Barang', desc: 'Hotel Gumaya mengajukan retur untuk SO-202610-099.', time: '12 menit lalu', type: 'warning', targetPage: 'returns' },
    { id: 4, title: 'Stok Ikan Menipis', desc: 'Sisa stok Udang Vaname di cold storage tersisa 15 kg.', time: '1 jam lalu', type: 'warning', targetPage: 'inventory' }
  ];

  const handleNotificationClick = (targetPage) => {
    setActivePage(targetPage);
    setShowNotifications(false);
  };

  const menuGroups = [
    {
      title: "UTAMA",
      items: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
      ]
    },
    {
      title: "OPERASIONAL & BISNIS",
      items: [
        { id: 'customers', label: 'Hotel & Customers', icon: Users },
        { id: 'suppliers', label: 'Supplier & Nelayan', icon: Truck },
        { id: 'catalog', label: 'Fish Catalog', icon: Package },
        { id: 'quotation', label: 'Quotation', icon: FileText },
      ]
    },
    {
      title: "RANTAI PASOK & GUDANG",
      items: [
        { id: 'purchaseOrder', label: 'Purchase Orders', icon: ShoppingCart },
        { id: 'procurement', label: 'Procurement', icon: Database },
        { id: 'qualityControl', label: 'Quality Control', icon: ShieldCheck },
        { id: 'inventory', label: 'Inventory (Cold Storage)', icon: Package },
      ]
    },
    {
      title: "PENJUALAN & DISTRIBUSI",
      items: [
        { id: 'salesOrder', label: 'Sales Orders', icon: ShoppingCart },
        { id: 'delivery', label: 'Delivery Management', icon: Send },
        { id: 'returns', label: 'Returns Management', icon: RotateCcw },
      ]
    },
    {
      title: "KEUANGAN & ANALITIK",
      items: [
        { id: 'invoices', label: 'Finance & Accounting', icon: CreditCard },
        { id: 'bi', label: 'Business Intelligence', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: PieChart },
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setShowProfileMenu(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F7FA] text-slate-800 font-sans overflow-hidden">
      {/* FIXED SIDEBAR */}
      <aside className={`${collapsed ? 'w-20' : 'w-[250px]'} bg-[#14263D] text-slate-300 flex flex-col transition-all duration-300 border-r border-[#E5EAF0]/10 z-30 shadow-sm relative`}>
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="bg-[#2457A6] p-2 rounded-lg text-white shadow-sm">
                <Anchor size={20} />
              </div>
              <div>
                <h1 className="font-extrabold text-white text-sm tracking-wide">SEAFOOD OS</h1>
                <p className="text-[10px] text-slate-400 font-medium">Procurement & BI</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 mx-auto cursor-pointer"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              {!collapsed && (
                <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      title={collapsed ? item.label : ''}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-xs font-medium transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#2457A6] text-white shadow-sm font-semibold' 
                          : 'text-slate-300 hover:bg-[#2457A6]/20 hover:text-white'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-white' : 'text-[#168C85]'} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* PROFIL KIRI BAWAH */}
        {!collapsed && (
          <div className="relative border-t border-slate-700/50 bg-[#14263D]/80" ref={profileMenuRef}>
            {showProfileMenu && (
              <div className="absolute bottom-16 left-3 w-56 bg-white rounded-xl shadow-2xl border border-[#E5EAF0] p-2 z-50 text-slate-800 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{profileName}</p>
                  <p className="text-[10px] text-slate-500">{currentUser?.role || 'Administrator'}</p>
                </div>
                
                <label className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                  <Camera size={14} className="text-[#2457A6]" />
                  <span>Ganti Foto Profil</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <button 
                  onClick={() => {
                    const newName = prompt('Masukkan nama baru:', profileName);
                    if (newName) setProfileName(newName);
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors text-left cursor-pointer"
                >
                  <User size={14} className="text-[#168C85]" />
                  <span>Ubah Nama Akun</span>
                </button>

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold transition-colors text-left cursor-pointer"
                  >
                    <LogOut size={14} />
                    <span>Keluar Sesi (Logout)</span>
                  </button>
                </div>
              </div>
            )}

            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-3 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-[#168C85]" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#168C85] text-white flex items-center font-bold text-xs justify-center shadow-xs">
                    {profileName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">{profileName}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">● Production Active</p>
                </div>
              </div>
              <span className="text-slate-400 text-xs">▲</span>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-14 bg-white border-b border-[#E5EAF0] px-6 flex justify-between items-center shadow-xs z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center text-xs font-semibold text-slate-500">
              <span className="text-slate-400">SEAFOOD OS</span>
              <span className="mx-2">/</span>
              <span className="text-[#2457A6] capitalize">{activePage}</span>
            </div>

            <div className="relative max-w-md w-full ml-6">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari transaksi, hotel, atau jenis ikan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-[#F5F7FA] border border-[#E5EAF0] rounded-[10px] text-xs focus:outline-none focus:border-[#2457A6]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-[#F5F7FA] hover:bg-slate-100 text-slate-600 relative transition-colors cursor-pointer"
            >
              <Bell size={18} />
              {/* Lencana angka jumlah notifikasi baru */}
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">{notifications.length}</span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-[#E5EAF0] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center pb-2.5 border-b border-[#E5EAF0]">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Pemberitahuan Sistem</h4>
                  <span className="text-[10px] bg-blue-50 text-[#2457A6] font-semibold px-2 py-0.5 rounded-full">{notifications.length} Baru</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-1 custom-scrollbar">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleNotificationClick(n.targetPage)}
                      className="py-2.5 hover:bg-blue-50/70 px-2 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'warning' ? (
                          <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        ) : n.type === 'success' ? (
                          <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        ) : (
                          <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-[#2457A6] transition-colors">{n.title}</p>
                          <p className="text-[11px] text-slate-500 leading-snug">{n.desc}</p>
                          <span className="text-[9px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-right border-l pl-3 border-[#E5EAF0]">
              <p className="text-xs font-bold text-slate-900">{profileName}</p>
              <p className="text-[10px] text-slate-500">Semarang, Jawa Tengah</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F5F7FA] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
