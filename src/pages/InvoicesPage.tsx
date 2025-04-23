import React, { useEffect, useState } from 'react';
import InvoiceTable from '../components/invoices/InvoiceTable';
import InvoiceForm from '../components/invoices/InvoiceForm';
import { useInvoiceStore } from '../store/invoiceStore';
import { Invoice } from '../types';
import { toast } from 'react-hot-toast';

const InvoicesPage: React.FC = () => {
  const { invoices, fetchInvoices, addInvoice, updateInvoice, deleteInvoice, isLoading } = useInvoiceStore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  
  const handleCreateInvoice = (data: Partial<Invoice>) => {
    addInvoice(data as Omit<Invoice, 'id'>)
      .then(() => {
        setIsCreating(false);
        toast.success('Factura creada exitosamente');
      })
      .catch(() => {
        toast.error('Error al crear la factura');
      });
  };
  
  const handleUpdateInvoice = (data: Partial<Invoice>) => {
    if (editingInvoice) {
      updateInvoice(editingInvoice.id, data)
        .then(() => {
          setEditingInvoice(null);
          toast.success('Factura actualizada exitosamente');
        })
        .catch(() => {
          toast.error('Error al actualizar la factura');
        });
    }
  };
  
  const handleDeleteInvoice = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta factura?')) {
      deleteInvoice(id)
        .then(() => {
          toast.success('Factura eliminada exitosamente');
        })
        .catch(() => {
          toast.error('Error al eliminar la factura');
        });
    }
  };
  
  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Nueva Factura</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <InvoiceForm 
            onSubmit={handleCreateInvoice}
            onCancel={() => setIsCreating(false)}
            isSubmitting={isLoading}
          />
        </div>
      </div>
    );
  }
  
  if (editingInvoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Editar Factura #{editingInvoice.noFactura}</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <InvoiceForm 
            defaultValues={editingInvoice}
            onSubmit={handleUpdateInvoice}
            onCancel={() => setEditingInvoice(null)}
            isSubmitting={isLoading}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Facturas</h1>
        <button 
          className="btn-primary"
          onClick={() => setIsCreating(true)}
        >
          Nueva Factura
        </button>
      </div>
      
      {isLoading && invoices.length === 0 ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-slate-500">Cargando facturas...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-card p-6">
          <InvoiceTable 
            invoices={invoices}
            onEditInvoice={(id) => setEditingInvoice(invoices.find(inv => inv.id === id) || null)}
            onDeleteInvoice={handleDeleteInvoice}
          />
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;