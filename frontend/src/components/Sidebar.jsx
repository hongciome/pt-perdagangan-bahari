import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    color: isActive(path) ? '#ffffff' : '#94a3b8',
    backgroundColor: isActive(path) ? '#2563eb' : 'transparent',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    fontFamily: 'sans-serif',
    fontWeight: isActive(path) ? 'bold' : 'normal',
    marginBottom: '4px',
    whiteSpace: 'nowrap'
  });

  const sectionTitleStyle = {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#475569',
    letterSpacing: '1px',
    marginTop: '20px',
    marginBottom: '8px',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    fontFamily: 'sans-serif'
  };

  return (
    <aside style={{ 
      width: isOpen ? '260px' : '0px', 
      backgroundColor: '#090d16', 
      color: 'white', 
      height: '100vh', 
      padding: isOpen ? '20px' : '0px', 
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-in-out',
      overflowX: 'hidden',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0
    }}>
      {/* Logo Header */}
      <div style={{ marginBottom: '20px', minWidth: '220px' }}>
        <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>SEAFOOD OS</h2>
        <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif' }}>PT Perdagangan Bahari</span>
      </div>

      {/* Menu Navigation */}
      <div style={{ flex: 1, minWidth: '220px' }}>
        <div style={{ ...sectionTitleStyle, marginTop: 0 }}>UTAMA</div>
        <Link to="/" style={linkStyle('/')}>📊 <span>Overview</span></Link>

        <div style={sectionTitleStyle}>OPERASIONAL & BISNIS</div>
        <Link to="/customers" style={linkStyle('/customers')}>👥 <span>Hotel & Customers</span></Link>
        <Link to="/suppliers" style={linkStyle('/suppliers')}>🐟 <span>Supplier & Nelayan</span></Link>
        <Link to="/catalog" style={linkStyle('/catalog')}>📦 <span>Fish Catalog</span></Link>
        <Link to="/quotations" style={linkStyle('/quotations')}>📄 <span>Quotation</span></Link>

        <div style={sectionTitleStyle}>RANTAI PASOK & GUDANG</div>
        <Link to="/orders" style={linkStyle('/orders')}>🛒 <span>Purchase Orders</span></Link>
        <Link to="/procurement" style={linkStyle('/procurement')}>🏗️ <span>Procurement</span></Link>
        <Link to="/quality-control" style={linkStyle('/quality-control')}>🛡️ <span>Quality Control</span></Link>
        <Link to="/inventory" style={linkStyle('/inventory')}>❄️ <span>Inventory (Cold Storage)</span></Link>

        <div style={sectionTitleStyle}>PENJUALAN & DISTRIBUSI</div>
        <Link to="/sales-orders" style={linkStyle('/sales-orders')}>📈 <span>Sales Orders</span></Link>
        <Link to="/delivery" style={linkStyle('/delivery')}>🚚 <span>Delivery Management</span></Link>
        <Link to="/returns" style={linkStyle('/returns')}>🔄 <span>Returns Management</span></Link>
      </div>

      {/* User Profile Footer */}
      <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', fontFamily: 'sans-serif' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px' }}>
          A
        </div>
        <div>
          <div style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '14px' }}>Agus</div>
          <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '8px' }}>●</span> Production Active
          </div>
        </div>
      </div>
    </aside>
  );
}