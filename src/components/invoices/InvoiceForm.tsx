import React from 'react';
import { useForm } from 'react-hook-form';
import { Invoice, InvoiceStatus } from '../../types';
import Button from '../common/Button';
import TabNavigation from '../common/TabNavigation';
import { FileText, DollarSign, Calendar, ClipboardList } from 'lucide-react';

interface InvoiceFormProps {
  defaultValues?: Partial<Invoice>;
  onSubmit: (data: Partial<Invoice>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [activeTab, setActiveTab] = React.useState('general');
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Invoice>>({
    defaultValues: defaultValues || {
      moneda: 'DÓLARES',
      estado: '04- VIGENTE',
    },
  });

  const handleFormSubmit = (data: Partial<Invoice>) => {
    // Solo permitir el envío del formulario cuando se hace clic en el botón de submit
    if (!isSubmitting) {
      onSubmit(data);
    }
  };

  const handleTabChange = (tabId: string) => {
    // Prevenir el envío del formulario al cambiar de tab
    setActiveTab(tabId);
  };

  const statusOptions: InvoiceStatus[] = [
    '04- VIGENTE',
    '05- OBSERVADA',
    '06- ENVIADA A VALORIZACION',
    '07- VALORIZACION APROBADO',
    '08- FACTURA EMITIDA',
    '09- FACTURA REGISTRADA',
    '10- COBRADO',
    '11- CANCELADA',
    '12-FACTORING',
  ];

  const tabs = [
    { id: 'general', label: 'Información General', icon: <FileText className="h-4 w-4" /> },
    { id: 'detail', label: 'Detalle', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'tracking', label: 'Seguimiento', icon: <Calendar className="h-4 w-4" /> },
    { id: 'additional', label: 'Información Adicional', icon: <ClipboardList className="h-4 w-4" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="usuario" className="label">Nombre de la Cuenta</label>
              <input
                id="usuario"
                type="text"
                className={`input ${errors.usuario ? 'border-error-500' : ''}`}
                {...register('usuario', { required: 'Este campo es requerido' })}
              />
              {errors.usuario && (
                <p className="mt-1 text-xs text-error-500">{errors.usuario.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="ruc" className="label">RUC</label>
              <input
                id="ruc"
                type="text"
                className="input"
                {...register('ruc')}
              />
            </div>
            
            <div>
              <label htmlFor="direccion" className="label">Dirección</label>
              <input
                id="direccion"
                type="text"
                className="input"
                {...register('direccion')}
              />
            </div>
            
            <div>
              <label htmlFor="telefono" className="label">Central telefónica</label>
              <input
                id="telefono"
                type="text"
                className="input"
                {...register('telefono')}
              />
            </div>
          </div>
        );
      
      case 'detail':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ocOs" className="label">OC/OS</label>
                <input
                  id="ocOs"
                  type="text"
                  className="input"
                  {...register('ocOs')}
                />
              </div>
              
              <div>
                <label htmlFor="noFactura" className="label">No. Factura</label>
                <input
                  id="noFactura"
                  type="text"
                  className={`input ${errors.noFactura ? 'border-error-500' : ''}`}
                  {...register('noFactura', { required: 'Este campo es requerido' })}
                />
                {errors.noFactura && (
                  <p className="mt-1 text-xs text-error-500">{errors.noFactura.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="estado" className="label">Estado</label>
                <select
                  id="estado"
                  className={`select ${errors.estado ? 'border-error-500' : ''}`}
                  {...register('estado', { required: 'Este campo es requerido' })}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.estado && (
                  <p className="mt-1 text-xs text-error-500">{errors.estado.message}</p>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Detalle de Productos/Servicios</h3>
              </div>
              
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-2 text-left">No. línea</th>
                    <th className="px-4 py-2 text-left">Producto</th>
                    <th className="px-4 py-2 text-left">Detalle</th>
                    <th className="px-4 py-2 text-right">Cant.</th>
                    <th className="px-4 py-2 text-left">Moneda</th>
                    <th className="px-4 py-2 text-right">Precio Unit.</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                    <th className="px-4 py-2 text-right">IGV</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="input"
                        {...register('nombreProducto')}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="input"
                        {...register('detalle')}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        className="input text-right"
                        {...register('cantidad', { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="select"
                        {...register('moneda')}
                      >
                        <option value="DÓLARES">DÓLARES</option>
                        <option value="SOLES">SOLES</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        className="input text-right"
                        {...register('precioUnitario', { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        className="input text-right"
                        {...register('subtotal', { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        className="input text-right"
                        {...register('igv', { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        className="input text-right"
                        {...register('total', { valueAsNumber: true })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'tracking':
        return (
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Bitácora de Seguimiento</h3>
                <button
                  type="button"
                  className="btn-outline btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Aquí se implementará la lógica para agregar nuevo seguimiento
                    console.log('Agregar nuevo seguimiento');
                  }}
                >
                  Agregar Seguimiento
                </button>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start space-x-3">
                    <textarea
                      rows={3}
                      className="input flex-1"
                      placeholder="Ingrese comentarios de seguimiento o contacto para cobranza..."
                      {...register('seguimiento')}
                      onKeyDown={(e) => {
                        // Prevenir envío del formulario con Enter
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        // Aquí se implementará la lógica para guardar el seguimiento
                        console.log('Guardar seguimiento');
                      }}
                    >
                      Guardar Nota
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Historial de Seguimiento</h3>
              <div className="space-y-4">
                {/* Ejemplo de historial de seguimiento */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Usuario Ejemplo</p>
                      <p className="text-xs text-slate-500">15/03/2024 10:30 AM</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Se realizó llamada al cliente para seguimiento de pago. Cliente indica que procesará el pago la próxima semana.
                  </p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Usuario Ejemplo</p>
                      <p className="text-xs text-slate-500">14/03/2024 3:45 PM</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Se envió correo de recordatorio de pago al cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'additional':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="observaciones" className="label">Observaciones</label>
              <textarea
                id="observaciones"
                rows={4}
                className="input"
                {...register('observaciones')}
              ></textarea>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
      
      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {defaultValues ? 'Actualizar Factura' : 'Crear Factura'}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;