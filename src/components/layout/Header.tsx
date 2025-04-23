import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-slate-900">Sistema de Gestión de Facturación</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <button
            type="button"
            className="p-2 rounded-full text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span className="sr-only">Ver notificaciones</span>
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="border-l border-slate-200 h-6 mx-2"></div>
          
          <div className="relative">
            <button
              type="button"
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
            >
              <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
              <span className="ml-2 font-medium text-slate-700 hidden md:block">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;