import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '../store/invoiceStore';
import InvoiceDetail from '../components/invoices/InvoiceDetail';
import InvoiceForm from '../components/invoices/InvoiceForm';
import { InvoiceStatus } from '../types';
import { toast } from 'react-hot-toast';

const InvoiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    invoices, 
    fetchInvoices, 
    updateInvoice, 
    updateInvoiceStatus, 
    isLoading 
  } = useInvoiceStore();
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (invoices.length === 0) {
      fetchInvoices();
    }
  }, [fetchInvoices, invoices.length]);
  
  const invoice = invoices.find(inv => inv.id === Number(id));
  
  if (!invoice && !isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-500">Factura no encontrada</p>
        <button 
          onClick={() => navigate('/invoices')}
          className="mt-4 btn-primary"
        >
          Volver a Facturas
        </button>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        <p className="mt-2 text-slate-500">Cargando información de la factura...</p>
      </div>
    );
  }
  
  const handleUpdateInvoice = (data: Partial<typeof invoice>) => {
    if (invoice) {
      updateInvoice(invoice.id, data)
        .then(() => {
          setIsEditing(false);
          toast.success('Factura actualizada exitosamente');
        })
        .catch(() => {
          toast.error('Error al actualizar la factura');
        });
    }
  };
  
  const handleStatusChange = (status: InvoiceStatus) => {
    if (invoice) {
      updateInvoiceStatus(invoice.id, status)
        .then(() => {
          toast.success(`Estado actualizado a "${status}"`);
        })
        .catch(() => {
          toast.error('Error al actualizar el estado');
        });
    }
  };
  
  if (isEditing && invoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Editar Factura #{invoice.noFactura}</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <InvoiceForm 
            defaultValues={invoice}
            onSubmit={handleUpdateInvoice}
            onCancel={() => setIsEditing(false)}
            isSubmitting={isLoading}
          />
        </div>
      </div>
    );
  }
  
  return (
    invoice && (
      <InvoiceDetail 
        invoice={invoice}
        onEdit={() => setIsEditing(true)}
        onStatusChange={handleStatusChange}
        onBack={() => navigate('/invoices')}
      />
    )
  );
};

export default InvoiceDetailPage;