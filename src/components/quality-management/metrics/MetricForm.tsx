import React, { useState } from 'react';
import { QualityMetric, ProcessCategory } from '../../../types/quality-management';
import { useQualityManagementStore } from '../../../store/qualityManagementStore';
import { Card } from '../../common/Card';
import { X, Save, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface MetricFormProps {
  metric?: QualityMetric;
  onClose: () => void;
}

interface HistoryEntry {
  id: string;
  date: string;
  value: number;
  notes: string;
}

const MetricForm: React.FC<MetricFormProps> = ({ metric, onClose }) => {
  const { addMetric, updateMetric } = useQualityManagementStore();
  const isEditMode = !!metric;

  const [formData, setFormData] = useState<Partial<QualityMetric>>({
    id: metric?.id || '',
    name: metric?.name || '',
    description: metric?.description || '',
    category: metric?.category || 'software_development',
    target: metric?.target || 0,
    unit: metric?.unit || '',
    frequency: metric?.frequency || 'monthly',
    responsible: metric?.responsible || '',
    currentValue: metric?.currentValue || 0,
  });

  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>(
    metric?.history.map(entry => ({
      id: uuidv4(),
      date: entry.date,
      value: entry.value,
      notes: entry.notes || '',
    })) || []
  );

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;
    
    // Convert numeric values
    if (name === 'target' || name === 'currentValue') {
      processedValue = value === '' ? 0 : parseFloat(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear validation error if field is filled
    if (validationErrors[name] && value.trim() !== '') {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleHistoryChange = (id: string, field: keyof HistoryEntry, value: string | number) => {
    setHistoryEntries(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleAddHistoryEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    setHistoryEntries(prev => [
      ...prev,
      {
        id: uuidv4(),
        date: today,
        value: formData.currentValue || 0,
        notes: '',
      },
    ]);
  };

  const handleRemoveHistoryEntry = (id: string) => {
    setHistoryEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.description || formData.description.trim() === '') {
      errors.description = 'La descripción es obligatoria';
    }
    
    if (!formData.unit || formData.unit.trim() === '') {
      errors.unit = 'La unidad de medida es obligatoria';
    }
    
    if (!formData.responsible || formData.responsible.trim() === '') {
      errors.responsible = 'El responsable es obligatorio';
    }
    
    // Validate history entries if any
    if (historyEntries.length > 0) {
      const hasInvalidEntries = historyEntries.some(entry => !entry.date);
      if (hasInvalidEntries) {
        errors.history = 'Todos los registros históricos deben tener una fecha válida';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare history entries for submission
    const history = historyEntries.map(entry => ({
      date: entry.date,
      value: typeof entry.value === 'string' ? parseFloat(entry.value) : entry.value,
      notes: entry.notes,
    }));

    // Sort history by date
    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const metricData: QualityMetric = {
      id: formData.id || uuidv4(),
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category as ProcessCategory,
      target: typeof formData.target === 'string' ? parseFloat(formData.target) : (formData.target || 0),
      unit: formData.unit || '',
      frequency: (formData.frequency || 'monthly') as 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
      responsible: formData.responsible || '',
      currentValue: typeof formData.currentValue === 'string' ? parseFloat(formData.currentValue) : (formData.currentValue || 0),
      history: history,
    };
    
    if (isEditMode && metric) {
      updateMetric(metric.id, metricData);
    } else {
      addMetric(metricData);
    }
    
    onClose();
  };

  const categoryOptions = [
    { value: 'software_development', label: 'Desarrollo de Software' },
    { value: 'project_management', label: 'Gestión de Proyectos' },
    { value: 'customer_service', label: 'Servicio al Cliente' },
    { value: 'quality_assurance', label: 'Aseguramiento de Calidad' },
    { value: 'resource_management', label: 'Gestión de Recursos' },
    { value: 'risk_management', label: 'Gestión de Riesgos' },
    { value: 'continuous_improvement', label: 'Mejora Continua' },
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' },
  ];

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            {isEditMode ? 'Editar Métrica' : 'Nueva Métrica'}
          </h3>
          <button
            type="button"
            className="btn btn-icon btn-outline"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input w-full ${
                    validationErrors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Nombre de la métrica"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input w-full"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`input w-full ${
                  validationErrors.description ? 'border-red-500' : ''
                }`}
                placeholder="Descripción detallada de la métrica"
              ></textarea>
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Meta *
                </label>
                <input
                  type="number"
                  name="target"
                  value={formData.target}
                  onChange={handleInputChange}
                  step="any"
                  className="input w-full"
                  placeholder="Valor objetivo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Valor Actual
                </label>
                <input
                  type="number"
                  name="currentValue"
                  value={formData.currentValue}
                  onChange={handleInputChange}
                  step="any"
                  className="input w-full"
                  placeholder="Valor actual"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Unidad *
                </label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className={`input w-full ${
                    validationErrors.unit ? 'border-red-500' : ''
                  }`}
                  placeholder="%, días, puntos, etc."
                />
                {validationErrors.unit && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.unit}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Frecuencia *
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="input w-full"
                >
                  {frequencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Responsable *
                </label>
                <input
                  type="text"
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleInputChange}
                  className={`input w-full ${
                    validationErrors.responsible ? 'border-red-500' : ''
                  }`}
                  placeholder="Nombre o cargo del responsable"
                />
                {validationErrors.responsible && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.responsible}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-slate-700">
                  Historial de Valores
                </label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={handleAddHistoryEntry}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Añadir Registro
                </button>
              </div>
              {validationErrors.history && (
                <p className="mb-2 text-sm text-red-600">{validationErrors.history}</p>
              )}
              <div className="bg-slate-50 rounded-md border border-slate-200 divide-y divide-slate-200">
                {historyEntries.length === 0 ? (
                  <div className="p-4 text-center text-slate-500">
                    No hay registros históricos. Añade uno para empezar a registrar la evolución.
                  </div>
                ) : (
                  historyEntries.map(entry => (
                    <div key={entry.id} className="p-4 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Fecha
                        </label>
                        <input
                          type="date"
                          value={entry.date}
                          onChange={(e) => handleHistoryChange(entry.id, 'date', e.target.value)}
                          className="input w-full"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Valor
                        </label>
                        <input
                          type="number"
                          value={entry.value}
                          onChange={(e) => handleHistoryChange(entry.id, 'value', parseFloat(e.target.value))}
                          step="any"
                          className="input w-full"
                        />
                      </div>
                      <div className="col-span-6">
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Notas
                        </label>
                        <input
                          type="text"
                          value={entry.notes}
                          onChange={(e) => handleHistoryChange(entry.id, 'notes', e.target.value)}
                          className="input w-full"
                        />
                      </div>
                      <div className="col-span-1 flex items-end justify-end">
                        <button
                          type="button"
                          className="btn btn-icon btn-sm btn-outline text-red-500 hover:bg-red-50"
                          onClick={() => handleRemoveHistoryEntry(entry.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                <Save className="h-4 w-4 mr-2" />
                {isEditMode ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default MetricForm; 