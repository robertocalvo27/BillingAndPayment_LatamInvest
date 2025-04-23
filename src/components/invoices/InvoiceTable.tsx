import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, Filter, ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react';
import { Invoice } from '../../types';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

interface InvoiceTableProps {
  invoices: Invoice[];
  onEditInvoice: (id: number) => void;
  onDeleteInvoice: (id: number) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ 
  invoices = [], // Provide default empty array
  onEditInvoice,
  onDeleteInvoice
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Invoice>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: keyof Invoice) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: keyof Invoice) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };
  
  const filteredInvoices = invoices.filter(invoice => 
    (invoice.usuario?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (invoice.nombreProducto?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (invoice.noFactura?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );
  
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  if (!Array.isArray(invoices)) {
    return (
      <div className="bg-error-50 text-error-700 p-4 rounded-lg">
        <p>Error: No se pudieron cargar las facturas</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por cliente, producto o número de factura..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          >
            Nueva Factura
          </Button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center">
                  ID {getSortIcon('id')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('usuario')}
              >
                <div className="flex items-center">
                  Cliente {getSortIcon('usuario')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('nombreProducto')}
              >
                <div className="flex items-center">
                  Producto/Servicio {getSortIcon('nombreProducto')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('total')}
              >
                <div className="flex items-center">
                  Total {getSortIcon('total')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('fechaFact')}
              >
                <div className="flex items-center">
                  Fecha {getSortIcon('fechaFact')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('estado')}
              >
                <div className="flex items-center">
                  Estado {getSortIcon('estado')}
                </div>
              </th>
              <th 
                className="table-header-cell cursor-pointer"
                onClick={() => handleSort('noFactura')}
              >
                <div className="flex items-center">
                  No. Factura {getSortIcon('noFactura')}
                </div>
              </th>
              <th className="table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {sortedInvoices.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-slate-500">
                  No se encontraron facturas
                </td>
              </tr>
            ) : (
              sortedInvoices.map((invoice) => (
                <tr key={invoice.id} className="table-row">
                  <td className="table-cell font-medium">{invoice.id}</td>
                  <td className="table-cell">{invoice.usuario}</td>
                  <td className="table-cell">
                    <div className="max-w-xs truncate" title={invoice.nombreProducto}>
                      {invoice.nombreProducto}
                    </div>
                  </td>
                  <td className="table-cell">
                    ${invoice.total?.toFixed(2) || '0.00'} 
                    <span className="text-xs text-slate-500 ml-1">
                      {invoice.moneda}
                    </span>
                  </td>
                  <td className="table-cell">{invoice.fechaFact}</td>
                  <td className="table-cell">
                    <StatusBadge status={invoice.estado} />
                  </td>
                  <td className="table-cell">{invoice.noFactura}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <Link to={`/invoices/${invoice.id}`}>
                        <button className="p-1 text-slate-400 hover:text-primary-600 rounded-full hover:bg-slate-100">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button 
                        className="p-1 text-slate-400 hover:text-primary-600 rounded-full hover:bg-slate-100"
                        onClick={() => onEditInvoice(invoice.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-slate-400 hover:text-error-600 rounded-full hover:bg-slate-100"
                        onClick={() => onDeleteInvoice(invoice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;