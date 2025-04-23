import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Invoice } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface RecentInvoicesProps {
  invoices: Invoice[];
}

const RecentInvoices: React.FC<RecentInvoicesProps> = ({ invoices }) => {
  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200">
        <h3 className="text-lg font-medium text-slate-900">Facturas Recientes</h3>
      </div>
      
      <div className="divide-y divide-slate-200">
        {invoices.length === 0 ? (
          <p className="py-6 text-center text-slate-500">No hay facturas recientes</p>
        ) : (
          invoices.map((invoice) => (
            <Link
              key={invoice.id}
              to={`/invoices/${invoice.id}`}
              className="block hover:bg-slate-50 transition-colors"
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">{invoice.id}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900 truncate max-w-xs">
                      {invoice.nombreProducto}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {invoice.usuario}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <StatusBadge status={invoice.estado} />
                  <ChevronRight className="ml-3 h-5 w-5 text-slate-400" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
        <Link
          to="/invoices"
          className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center"
        >
          Ver todas las facturas
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecentInvoices;