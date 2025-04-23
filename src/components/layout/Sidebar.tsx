import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSpreadsheet,
  DollarSign,
  FileBarChart,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Landmark,
  CheckCircle2,
  Shield,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Facturas', path: '/invoices', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { name: 'Pagos', path: '/payments', icon: <DollarSign className="h-5 w-5" /> },
    { name: 'Detracciones', path: '/detractions', icon: <Landmark className="h-5 w-5" /> },
    { name: 'Validaciones', path: '/validations', icon: <CheckCircle2 className="h-5 w-5" /> },
    { name: 'Reportes', path: '/reports', icon: <FileBarChart className="h-5 w-5" /> },
    { 
      name: 'Gestión de Calidad', 
      path: '/quality-management', 
      icon: <Shield className="h-5 w-5" /> 
    },
    { name: 'Clientes', path: '/clients', icon: <Users className="h-5 w-5" /> },
    { name: 'Alertas', path: '/alerts', icon: <AlertCircle className="h-5 w-5" /> },
    { name: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <aside 
      className={`bg-primary-800 text-white transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 border-b border-primary-700`}>
        {!collapsed && (
          <h1 className="text-xl font-bold">BMS</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="rounded-full p-1 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="flex-1 pt-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                  ${isActive 
                    ? 'bg-primary-700 text-white' 
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-primary-700">
        <div className={`flex ${collapsed ? 'justify-center' : 'items-center'}`}>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-primary-100">Versión 1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;