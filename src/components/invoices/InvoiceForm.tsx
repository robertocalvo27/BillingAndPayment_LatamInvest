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
    { id: 'amounts', label: 'Montos', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'dates', label: 'Fechas', icon: <Calendar className="h-4 w-4" /> },
    { id: 'additional', label: 'Información Adicional', icon: <ClipboardList className="h-4 w-4" /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="usuario" className="label">Cliente</label>
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
              <label htmlFor="nombreProducto" className="label">Producto/Servicio</label>
              <input
                id="nombreProducto"
                type="text"
                className={`input ${errors.nombreProducto ? 'border-error-500' : ''}`}
                {...register('nombreProducto', { required: 'Este campo es requerido' })}
              />
              {errors.nombreProducto && (
                <p className="mt-1 text-xs text-error-500">{errors.nombreProducto.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="detalle" className="label">Detalle</label>
              <input
                id="detalle"
                type="text"
                className={`input ${errors.detalle ? 'border-error-500' : ''}`}
                {...register('detalle')}
              />
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
              <label htmlFor="ocOs" className="label">OC/OS</label>
              <input
                id="ocOs"
                type="text"
                className="input"
                {...register('ocOs')}
              />
            </div>
          </div>
        );
      
      case 'amounts':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="noBandas" className="label">No. Bandas</label>
              <input
                id="noBandas"
                type="number"
                className="input"
                {...register('noBandas', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="bandas" className="label">Bandas ($)</label>
              <input
                id="bandas"
                type="number"
                step="0.01"
                className="input"
                {...register('bandas', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="servicios" className="label">Servicios ($)</label>
              <input
                id="servicios"
                type="number"
                step="0.01"
                className="input"
                {...register('servicios', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="otros" className="label">Otros ($)</label>
              <input
                id="otros"
                type="number"
                step="0.01"
                className="input"
                {...register('otros', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="subtotal" className="label">Subtotal ($)</label>
              <input
                id="subtotal"
                type="number"
                step="0.01"
                className={`input ${errors.subtotal ? 'border-error-500' : ''}`}
                {...register('subtotal', { 
                  required: 'Este campo es requerido',
                  valueAsNumber: true
                })}
              />
              {errors.subtotal && (
                <p className="mt-1 text-xs text-error-500">{errors.subtotal.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="igv" className="label">IGV ($)</label>
              <input
                id="igv"
                type="number"
                step="0.01"
                className={`input ${errors.igv ? 'border-error-500' : ''}`}
                {...register('igv', { 
                  required: 'Este campo es requerido',
                  valueAsNumber: true
                })}
              />
              {errors.igv && (
                <p className="mt-1 text-xs text-error-500">{errors.igv.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="total" className="label">Total ($)</label>
              <input
                id="total"
                type="number"
                step="0.01"
                className={`input ${errors.total ? 'border-error-500' : ''}`}
                {...register('total', { 
                  required: 'Este campo es requerido',
                  valueAsNumber: true
                })}
              />
              {errors.total && (
                <p className="mt-1 text-xs text-error-500">{errors.total.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="moneda" className="label">Moneda</label>
              <select
                id="moneda"
                className="select"
                {...register('moneda')}
              >
                <option value="DÓLARES">DÓLARES</option>
                <option value="SOLES">SOLES</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="tc" className="label">Tipo de Cambio</label>
              <input
                id="tc"
                type="number"
                step="0.001"
                className="input"
                {...register('tc', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="totalSoles" className="label">Total (S/)</label>
              <input
                id="totalSoles"
                type="number"
                step="0.01"
                className="input"
                {...register('totalSoles', { valueAsNumber: true })}
              />
            </div>
          </div>
        );
      
      case 'dates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="periodo" className="label">Periodo</label>
              <input
                id="periodo"
                type="text"
                className="input"
                {...register('periodo')}
              />
            </div>
            
            <div>
              <label htmlFor="mes" className="label">Mes</label>
              <input
                id="mes"
                type="text"
                className="input"
                {...register('mes')}
              />
            </div>
            
            <div>
              <label htmlFor="anio" className="label">Año</label>
              <input
                id="anio"
                type="number"
                className="input"
                {...register('anio', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="term" className="label">Término (días)</label>
              <input
                id="term"
                type="number"
                className="input"
                {...register('term', { valueAsNumber: true })}
              />
            </div>
            
            <div>
              <label htmlFor="fechaFact" className="label">Fecha Factura</label>
              <input
                id="fechaFact"
                type="date"
                className="input"
                {...register('fechaFact')}
              />
            </div>
            
            <div>
              <label htmlFor="fechaRegistro" className="label">Fecha Registro</label>
              <input
                id="fechaRegistro"
                type="date"
                className="input"
                {...register('fechaRegistro')}
              />
            </div>
            
            <div>
              <label htmlFor="dueDate" className="label">Fecha Vencimiento</label>
              <input
                id="dueDate"
                type="date"
                className="input"
                {...register('dueDate')}
              />
            </div>
            
            <div>
              <label htmlFor="fechaRealPago" className="label">Fecha Real Pago</label>
              <input
                id="fechaRealPago"
                type="date"
                className="input"
                {...register('fechaRealPago')}
              />
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
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