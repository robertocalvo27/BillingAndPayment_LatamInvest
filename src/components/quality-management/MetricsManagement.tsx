import React, { useState } from 'react';
import { useQualityManagementStore } from '../../store/qualityManagementStore';
import { Card } from '../common/Card';
import MetricsList from './metrics/MetricsList';
import MetricDetail from './metrics/MetricDetail';
import MetricForm from './metrics/MetricForm';
import MetricsDashboard from './metrics/MetricsDashboard';
import { ProcessCategory, QualityMetric } from '../../types/quality-management';
import { 
  BarChart3, 
  ClipboardList, 
  Target, 
  PlusCircle,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/Tabs';

const MetricsManagement: React.FC = () => {
  const { metrics } = useQualityManagementStore();
  const [activeMetric, setActiveMetric] = useState<QualityMetric | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProcessCategory | 'all'>('all');

  const filteredMetrics = metrics.filter(metric => {
    // Filtro por categoría
    const matchesCategory = categoryFilter === 'all' || metric.category === categoryFilter;
    
    // Filtro por término de búsqueda (nombre o descripción)
    const matchesSearch = 
      metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleSelectMetric = (metric: QualityMetric) => {
    setActiveMetric(metric);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setActiveMetric(null);
    setIsCreating(true);
  };

  const handleCloseForm = () => {
    setIsCreating(false);
  };

  const categoryOptions = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'software_development', label: 'Desarrollo de Software' },
    { value: 'project_management', label: 'Gestión de Proyectos' },
    { value: 'customer_service', label: 'Servicio al Cliente' },
    { value: 'quality_assurance', label: 'Aseguramiento de Calidad' },
    { value: 'resource_management', label: 'Gestión de Recursos' },
    { value: 'risk_management', label: 'Gestión de Riesgos' },
    { value: 'continuous_improvement', label: 'Mejora Continua' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900">
          Gestión de Métricas de Calidad
        </h2>
        <button 
          className="btn btn-primary"
          onClick={handleCreateNew}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Nueva Métrica
        </button>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <ClipboardList className="w-4 h-4 mr-2" />
            Métricas
          </TabsTrigger>
          <TabsTrigger value="objectives">
            <Target className="w-4 h-4 mr-2" />
            Objetivos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <MetricsDashboard metrics={metrics} />
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <div className="p-4 border-b border-slate-200">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      className="input pl-10 w-full"
                      placeholder="Buscar métricas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                      className="input flex-1"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as ProcessCategory | 'all')}
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                  <MetricsList 
                    metrics={filteredMetrics} 
                    onSelectMetric={handleSelectMetric}
                    selectedMetricId={activeMetric?.id}
                  />
                </div>
              </Card>
            </div>

            <div className="md:col-span-2">
              {isCreating ? (
                <MetricForm onClose={handleCloseForm} />
              ) : activeMetric ? (
                <MetricDetail metric={activeMetric} />
              ) : (
                <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-card p-6 text-center">
                  <div>
                    <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No hay métricas seleccionadas</h3>
                    <p className="text-slate-500 max-w-md">
                      Selecciona una métrica de la lista para ver sus detalles o crea una nueva métrica usando el botón "Nueva Métrica".
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="objectives">
          <div className="bg-white rounded-lg shadow-card p-6 text-center">
            <Target className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Objetivos de Calidad</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              La gestión de objetivos de calidad estará disponible en próximas actualizaciones.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsManagement; 