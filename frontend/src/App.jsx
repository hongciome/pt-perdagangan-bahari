import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import SidebarLayout from './components/SidebarLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MasterData from './pages/MasterData.jsx';
import SalesOrder from './pages/SalesOrder.jsx';
import PurchaseOrder from './pages/PurchaseOrder.jsx';
import Invoices from './pages/Invoices.jsx';
import Inventory from './pages/Inventory.jsx';
import CustomerIntelligence from './pages/CustomerIntelligence.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';
import QuotationPage from './pages/QuotationPage.jsx';
import B2BPortal from './pages/B2BPortal.jsx';
import SupplierPortal from './pages/SupplierPortal.jsx';
import './index.css';

function PlaceholderPage({ title, description, onBack }) {
  return (
    <div className="p-8">
      <div className="bg-white rounded-[10px] border border-[#E5EAF0] p-8 shadow-2xs max-w-3xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 bg-blue-50 text-[#2457A6] rounded-full flex items-center justify-center mx-auto font-bold text-lg">📋</div>
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">{description}</p>
        <div className="pt-2">
          <button onClick={onBack} className="bg-[#2457A6] text-white px-4 py-2 rounded-[10px] text-xs font-semibold shadow-2xs cursor-pointer">
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [profileName, setProfileName] = useState('Admin');
  const [profileImage, setProfileImage] = useState(null);

  // 1. JIKA BELUM LOGIN, TAMPILKAN HALAMAN LOGIN
  if (!user) {
    return <LoginPage onLoginSuccess={(userData) => {
      setUser(userData);
      setProfileName(userData.name);
    }} />;
  }

  // 2. PROTEKSI KETAT: JIKA KLIEN HOTEL, LANGSUNG ARAHKAN KE PORTAL B2B
  if (user.role === 'HOTEL_CLIENT') {
    return <B2BPortal currentUser={user} onLogout={() => setUser(null)} />;
  }

  // 3. PROTEKSI KETAT: JIKA SUPPLIER/NELAYAN, LANGSUNG ARAHKAN KE PORTAL SUPPLIER
  if (user.role === 'SUPPLIER') {
    return <SupplierPortal currentUser={user} onLogout={() => setUser(null)} />;
  }

  // 4. JIKA INTERNAL (OWNER / ADMIN / SALES), RENDER DASHBOARD & SIDEBAR LENGKAP
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'customers':
      case 'catalog': return <MasterData onBack={() => setCurrentPage('dashboard')} />;
      case 'suppliers': return <SuppliersPage onBack={() => setCurrentPage('dashboard')} />;
      case 'purchaseOrder':
      case 'procurement':
      case 'qualityControl': return <PurchaseOrder onBack={() => setCurrentPage('dashboard')} />;
      case 'salesOrder':
      case 'delivery': return <SalesOrder onBack={() => setCurrentPage('dashboard')} />;
      case 'inventory': return <Inventory onBack={() => setCurrentPage('dashboard')} />;
      case 'invoices': return <Invoices onBack={() => setCurrentPage('dashboard')} />;
      case 'bi':
      case 'reports': return <CustomerIntelligence onBack={() => setCurrentPage('dashboard')} />;
      case 'quotation': return <QuotationPage onBack={() => setCurrentPage('dashboard')} />;
      case 'returns': return <PlaceholderPage title="Returns Management" description="Kelola retur pengiriman hotel." onBack={() => setCurrentPage('dashboard')} />;
      case 'settings':
        return (
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[10px] border border-[#E5EAF0] p-6 shadow-2xs space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase">Pengaturan Akun</h2>
              <p className="text-xs text-slate-500">Masuk sebagai <strong className="text-slate-800">{profileName}</strong> ({user.role})</p>
              <button onClick={() => setUser(null)} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer">
                Keluar Sesi (Logout)
              </button>
            </div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <SidebarLayout 
      activePage={currentPage} 
      setActivePage={setCurrentPage} 
      currentUser={user} 
      onLogout={() => setUser(null)}
      profileName={profileName}
      setProfileName={setProfileName}
      profileImage={profileImage}
      setProfileImage={setProfileImage}
    >
      {renderContent()}
    </SidebarLayout>
  );
}

export default App;
