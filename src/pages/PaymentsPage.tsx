import React, { useEffect } from 'react';
import { useInvoiceStore } from '../store/invoiceStore';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { Search, Filter, DollarSign, CheckCircle2 } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const { invoices, fetchInvoices, isLoading } = useInvoiceStore();
  
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  
  const pendingInvoices = invoices.filter(invoice => 
    invoice.estado !== '10- COBRADO' && 
    invoice.estado !== '11- CANCELADA'
  );
  
  const paidInvoices = invoices.filter(invoice => 
    invoice.estado === '10- COBRADO'
  );
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Gestión de Pagos</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar pagos..."
            className="input pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            icon={<Filter className="h-4 w-4" />}
          >
            Filtros
          </Button>
          
          <Button 
            variant="primary" 
            size="sm"
            icon={<DollarSign className="h-4 w-4" />}
          >
            Registrar Pago
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-slate-500">Cargando pagos...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">Pendientes de Pago ({pendingInvoices.length})</h3>
              <span className="text-sm text-slate-500">Total: ${pendingInvoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0).toFixed(2)}</span>
            </div>
            
            <div className="table-container">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">No. Factura</th>
                    <th className="table-header-cell">Cliente</th>
                    <th className="table-header-cell">Monto</th>
                    <th className="table-header-cell">Emisión</th>
                    <th className="table-header-cell">Vencimiento</th>
                    <th className="table-header-cell">Estado</th>
                    <th className="table-header-cell">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {pendingInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                        No hay facturas pendientes de pago
                      </td>
                    </tr>
                  ) : (
                    pendingInvoices.map((invoice) => (
                      <tr key={invoice.id} className="table-row">
                        <td className="table-cell font-medium">{invoice.noFactura}</td>
                        <td className="table-cell">{invoice.usuario}</td>
                        <td className="table-cell">${(invoice.total ?? 0).toFixed(2)}</td>
                        <td className="table-cell">{invoice.fechaFact}</td>
                        <td className="table-cell">{invoice.dueDate}</td>
                        <td className="table-cell">
                          <StatusBadge status={invoice.estado} />
                        </td>
                        <td className="table-cell">
                          <Button 
                            variant="primary" 
                            size="sm"
                            icon={<DollarSign className="h-4 w-4" />}
                          >
                            Pago
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">Pagos Recientes ({paidInvoices.length})</h3>
              <span className="text-sm text-slate-500">Total: ${paidInvoices.reduce((sum, inv) => sum + (inv.total ?? 0), 0).toFixed(2)}</span>
            </div>
            
            <div className="table-container">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">No. Factura</th>
                    <th className="table-header-cell">Cliente</th>
                    <th className="table-header-cell">Monto</th>
                    <th className="table-header-cell">Fecha de Pago</th>
                    <th className="table-header-cell">No. Operación</th>
                    <th className="table-header-cell">Estado</th>
                    <th className="table-header-cell">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {paidInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                        No hay pagos recientes
                      </td>
                    </tr>
                  ) : (
                    paidInvoices.map((invoice) => (
                      <tr key={invoice.id} className="table-row">
                        <td className="table-cell font-medium">{invoice.noFactura}</td>
                        <td className="table-cell">{invoice.usuario}</td>
                        <td className="table-cell">${(invoice.total ?? 0).toFixed(2)}</td>
                        <td className="table-cell">{invoice.fechaRealPago || 'N/A'}</td>
                        <td className="table-cell">{invoice.numeroOperacion || 'N/A'}</td>
                        <td className="table-cell">
                          <StatusBadge status={invoice.estado} />
                        </td>
                        <td className="table-cell">
                          <Button 
                            variant="outline" 
                            size="sm"
                            icon={<CheckCircle2 className="h-4 w-4" />}
                          >
                            Detalles
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;