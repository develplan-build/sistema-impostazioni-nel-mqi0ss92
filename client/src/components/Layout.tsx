import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Building2, Mail, 
  FileText, CreditCard, FolderOpen, BarChart3, Bell, 
  Settings, LogOut, Menu, X, Moon, Sun, Database
} from 'lucide-react';
import { HAS_BACKEND } from '../config';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  loadDemoData: () => void;
  clearData: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme, loadDemoData, clearData }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/app', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/app/crm', icon: Users, label: 'CRM Clienti' },
    { path: '/app/properties', icon: Building2, label: 'Immobili' },
    { path: '/app/calendar', icon: Calendar, label: 'Agenda' },
    { path: '/app/documents', icon: FolderOpen, label: 'Documenti' },
    { path: '/app/billing', icon: CreditCard, label: 'Fatturazione' },
    { path: '/app/reports', icon: BarChart3, label: 'Report BI' },
    { path: '/app/notifications', icon: Bell, label: 'Notifiche' },
    { path: '/app/settings', icon: Settings, label: 'Impostazioni' },
  ];

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 45 }} 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/app" className="sidebar-logo">
            <Building2 size={28} />
            CasaPro
          </Link>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="flex items-center gap-4">
            <button 
              className="btn-ghost btn-icon mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="header-title">
              {navItems.find(item => item.path === location.pathname)?.label || 'CasaPro'}
            </h1>
          </div>

          <div className="header-actions">
            {!HAS_BACKEND && (
              <div className="hidden md:flex items-center gap-2 mr-4">
                <button onClick={loadDemoData} className="btn btn-secondary text-sm">
                  <Database size={16} /> Carica Demo
                </button>
                <button onClick={clearData} className="btn btn-ghost text-sm text-danger">
                  Azzera
                </button>
              </div>
            )}
            
            <button onClick={toggleTheme} className="btn-ghost btn-icon">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link to="/app/notifications" className="btn-ghost btn-icon relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </Link>

            <div className="relative">
              <button 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-bg-surface-hover transition-colors"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  MR
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-surface border border-border-color rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-border-color">
                    <p className="text-sm font-medium">Marco Rossi</p>
                    <p className="text-xs text-muted">Admin</p>
                  </div>
                  <Link to="/app/settings" className="block px-4 py-2 text-sm hover:bg-bg-surface-hover">
                    Impostazioni
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-bg-surface-hover flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Esci
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Demo Banner */}
        {!HAS_BACKEND && (
          <div className="bg-accent-light text-accent px-4 py-2 text-sm flex justify-between items-center">
            <span>
              <strong>Modalità Demo:</strong> I dati sono salvati localmente. Scarica il codice e configura il backend per attivare database e pagamenti reali.
            </span>
          </div>
        )}

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};
