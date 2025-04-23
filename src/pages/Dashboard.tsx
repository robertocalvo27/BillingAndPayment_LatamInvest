import React, { useEffect } from 'react';
import DashboardSummary from '../components/dashboard/DashboardSummary';
import RecentInvoices from '../components/dashboard/RecentInvoices';
import { useInvoiceStore } from '../store/invoiceStore';
import { mockStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { invoices, fetchInvoices, isLoading } = useInvoiceStore();
  
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  
  const recentInvoices = invoices.slice(0, 5);
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-slate-500">Cargando información...</p>
        </div>
      ) : (
        <>
          <DashboardSummary stats={mockStats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentInvoices invoices={recentInvoices} />
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-card overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-lg font-medium text-slate-900">Actividad Reciente</h3>
                </div>
                
                <div className="divide-y divide-slate-200">
                  <div className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">Factura E-137 cobrada</p>
                    <p className="text-xs text-slate-500 mt-1">Hace 2 días</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">Nueva factura registrada E-139</p>
                    <p className="text-xs text-slate-500 mt-1">Hace 3 días</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">Validación cliente aprobada</p>
                    <p className="text-xs text-slate-500 mt-1">Hace 5 días</p>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">Actualización tipo de cambio</p>
                    <p className="text-xs text-slate-500 mt-1">Hace 1 semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;