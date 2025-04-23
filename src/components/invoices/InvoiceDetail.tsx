import React from 'react';
import { Invoice } from '../../types';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';
import TabNavigation from '../common/TabNavigation';
import { FileText, DollarSign, AlertCircle, MessageSquare, Calendar, ArrowDownCircle } from 'lucide-react';

interface InvoiceDetailProps {
  invoice: Invoice;
  onEdit: () => void;
  onStatusChange: (status: Invoice['estado']) => void;
  onBack: () => void;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  onEdit,
  onStatusChange,
  onBack,
}) => {
  const [activeTab, setActiveTab] = React.useState('details');

  const tabs = [
    { id: 'details', label: 'Detalles', icon: <FileText className="h-4 w-4" /> },
    { id: 'payments', label: 'Pagos', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'status', label: 'Estado', icon: <AlertCircle className="h-4 w-4" /> },
    { id: 'observations', label: 'Observaciones', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-500">Cliente</p>
              <p className="text-base font-medium">{invoice.usuario}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Producto/Servicio</p>
              <p className="text-base">{invoice.nombreProducto}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Detalle</p>
              <p className="text-base">{invoice.detalle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">No. Bandas</p>
              <p className="text-base">{invoice.noBandas || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Bandas ($)</p>
              <p className="text-base">{invoice.bandas ? `$${invoice.bandas.toFixed(2)}` : '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Servicios ($)</p>
              <p className="text-base">{invoice.servicios ? `$${invoice.servicios.toFixed(2)}` : '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Otros ($)</p>
              <p className="text-base">{invoice.otros ? `$${invoice.otros.toFixed(2)}` : '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Subtotal ($)</p>
              <p className="text-base">${invoice.subtotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">IGV ($)</p>
              <p className="text-base">${invoice.igv.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total ($)</p>
              <p className="text-base font-semibold">${invoice.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Moneda</p>
              <p className="text-base">{invoice.moneda}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">TC</p>
              <p className="text-base">{invoice.tc}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total (S/)</p>
              <p className="text-base font-semibold">S/{invoice.totalSoles.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">No. Factura</p>
              <p className="text-base">{invoice.noFactura}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Período</p>
              <p className="text-base">{invoice.periodo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Mes / Año</p>
              <p className="text-base">{invoice.mes} / {invoice.anio}</p>
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500">Fecha Factura</p>
                <p className="text-base">{invoice.fechaFact}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Fecha Registro</p>
                <p className="text-base">{invoice.fechaRegistro}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Fecha Vencimiento</p>
                <p className="text-base">{invoice.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Fecha Real Pago</p>
                <p className="text-base">{invoice.fechaRealPago || 'Pendiente'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Días Vencimiento</p>
                <p className="text-base">{invoice.vencimientoDias || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Días Real Pago</p>
                <p className="text-base">{invoice.diasRealPago !== null ? invoice.diasRealPago : '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Cobro Parcial</p>
                <p className="text-base">{invoice.cobroParcial !== null ? `$${invoice.cobroParcial.toFixed(2)}` : '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Saldo</p>
                <p className="text-base">{invoice.saldo !== null ? `$${invoice.saldo.toFixed(2)}` : '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Término (días)</p>
                <p className="text-base">{invoice.term}</p>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Registrar Pago</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="fechaPago" className="label">Fecha de Pago</label>
                  <input type="date" id="fechaPago" className="input" />
                </div>
                <div>
                  <label htmlFor="montoPago" className="label">Monto</label>
                  <input type="number" id="montoPago" step="0.01" className="input" />
                </div>
                <div>
                  <label htmlFor="numeroOperacion" className="label">Número de Operación</label>
                  <input type="text" id="numeroOperacion" className="input" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="primary"
                  icon={<DollarSign className="h-4 w-4" />}
                >
                  Registrar Pago
                </Button>
              </div>
            </div>
          </div>
        );
      case 'status':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-slate-500">Estado Actual:</p>
              <StatusBadge status={invoice.estado} />
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Cambiar Estado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['04- VIGENTE', '05- OBSERVADA', '06- ENVIADA A VALORIZACION', '07- VALORIZACION APROBADO', 
                  '08- FACTURA EMITIDA', '09- FACTURA REGISTRADA', '10- COBRADO', '11- CANCELADA', '12-FACTORING'].map((status) => (
                  <Button
                    key={status}
                    variant={invoice.estado === status ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onStatusChange(status as Invoice['estado'])}
                    disabled={invoice.estado === status}
                    className="justify-center"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Línea de Tiempo</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 mt-1"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Factura emitida</p>
                    <p className="text-sm text-slate-500">{invoice.fechaRegistro}</p>
                  </div>
                </div>
                
                {invoice.fechaRealPago && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 mt-1"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">Pago realizado</p>
                      <p className="text-sm text-slate-500">{invoice.fechaRealPago}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'observations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Historial de Observaciones</h3>
              <div className="bg-slate-50 rounded-md p-4 border border-slate-200">
                <div className="space-y-2">
                  {invoice.observaciones.split('\n').map((line, index) => (
                    <p key={index} className="text-sm">{line}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Agregar Observación</h3>
              <div>
                <textarea 
                  rows={4}
                  placeholder="Escribe una nueva observación..."
                  className="input"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="primary"
                  icon={<MessageSquare className="h-4 w-4" />}
                >
                  Agregar Observación
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-primary-600 hover:text-primary-700 mb-2 flex items-center"
          >
            <ArrowDownCircle className="h-4 w-4 mr-1 transform rotate-90" />
            Volver a la lista
          </button>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-900">Factura #{invoice.noFactura}</h1>
            <StatusBadge status={invoice.estado} className="ml-4" />
          </div>
          <p className="text-slate-500 mt-1">{invoice.usuario} - {invoice.nombreProducto}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline"
            icon={<Calendar className="h-4 w-4" />}
          >
            Historial
          </Button>
          <Button 
            variant="primary"
            onClick={onEdit}
            icon={<FileText className="h-4 w-4" />}
          >
            Editar
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="px-6 pt-4"
        />
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;