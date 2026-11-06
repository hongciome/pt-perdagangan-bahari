import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Catalog from './pages/Catalog';
import QuotationPage from './pages/QuotationPage';
import Orders from './pages/Orders';
import Procurement from './pages/Procurement';
import QualityControlPage from './pages/QualityControlPage';
import Inventory from './pages/Inventory';
import SalesOrder from './pages/SalesOrder';
import DeliveryManagement from './pages/DeliveryManagement';
import ReturnsManagement from './pages/ReturnsManagement';
import Invoices from './pages/Invoices';

function MainContent({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const pageTitles = {
    '/': 'Overview & Dashboard',
    '/customers': 'Hotel & Customers',
    '/suppliers': 'Supplier & Nelayan',
    '/catalog': 'Fish Catalog',
    '/quotations': 'Quotation',
    '/orders': 'Purchase Orders',
    '/procurement': 'Procurement',
    '/quality-control': 'Quality Control',
    '/inventory': 'Inventory (Cold Storage)',
    '/sales-orders': 'Sales Orders',
    '/delivery': 'Delivery Management',
    '/returns': 'Returns Management',
    '/invoices': 'Invoices'
  };

  const currentPage = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto', backgroundColor: '#f8fafc' }}>
      
      {/* Top Header Bar dengan Padding Kanan yang Presisi */}
      <div style={{ padding: '16px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', borderBottom: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Sisi Kiri: Tombol Toggle & Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ 
              width: '36px', 
              height: '36px', 
              backgroundColor: '#ffffff', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '16px', 
              color: '#1e293b',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              flexShrink: 0
            }}>
            ≡
          </button>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', fontFamily: 'Georgia, serif' }}>
              SEAFOOD OS
            </span>
            <span style={{ fontSize: '15px', color: '#64748b', fontFamily: 'Georgia, serif' }}>
              / {currentPage}
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Badge Owner & Tombol Rata Kanan */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #c7d2fe' }}>
            Sigit Prakoso <span style={{ color: '#2563eb', fontWeight: 'bold' }}>(Owner)</span>
          </span>

          <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            + Tambah Transaksi
          </button>
        </div>

      </div>

      {/* Area Konten Utama */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/quotations" element={<QuotationPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/quality-control" element={<QualityControlPage />} />
          <Route path="/inventory" element-[<Inventory />} />
          <Route path="/sales-orders" element={<SalesOrder />} />
          <Route path="/delivery" element={<DeliveryManagement />} />
          <Route path="/returns" element={<ReturnsManagement />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </div>

    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
        
        <div style={{ 
          width: sidebarOpen ? '260px' : '0px', 
          flexShrink: 0, 
          height: '100vh', 
          transition: 'width 0.3s ease', 
          overflow: 'hidden',
          backgroundColor: '#0f172a' 
        }}>
          <Sidebar isOpen={sidebarOpen} />
        </div>

        <MainContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
    </Router>
  );
}