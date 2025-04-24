import React from 'react';
import { QualityMetric } from '../../../types/quality-management';
import { ArrowUpDown, BarChart } from 'lucide-react';

interface MetricsListProps {
  metrics: QualityMetric[];
  onSelectMetric: (metric: QualityMetric) => void;
  selectedMetricId?: string;
}

const getCategoryLabel = (category: string): string => {
  const categories: Record<string, string> = {
    'software_development': 'Desarrollo de Software',
    'project_management': 'Gestión de Proyectos',
    'customer_service': 'Servicio al Cliente',
    'quality_assurance': 'Aseguramiento de Calidad',
    'resource_management': 'Gestión de Recursos',
    'risk_management': 'Gestión de Riesgos',
    'continuous_improvement': 'Mejora Continua',
  };
  
  return categories[category] || category;
};

const getStatusIndicator = (currentValue?: number, target?: number) => {
  if (currentValue === undefined || target === undefined) return null;
  
  let color = 'bg-gray-200';
  if (currentValue >= target) {
    color = 'bg-green-500';
  } else if (currentValue >= target * 0.8) {
    color = 'bg-yellow-500';
  } else {
    color = 'bg-red-500';
  }
  
  return <div className={`h-2 w-2 rounded-full ${color}`} />;
};

const MetricsList: React.FC<MetricsListProps> = ({ 
  metrics, 
  onSelectMetric,
  selectedMetricId 
}) => {
  if (metrics.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">No se encontraron métricas</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {metrics.map((metric) => (
        <div 
          key={metric.id} 
          className={`p-4 cursor-pointer hover:bg-slate-50 ${
            selectedMetricId === metric.id ? 'bg-slate-50' : ''
          }`}
          onClick={() => onSelectMetric(metric)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary-100 p-2 rounded-md">
                <BarChart className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-900">{metric.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">
                    {getCategoryLabel(metric.category)}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">
                    {metric.frequency === 'monthly' ? 'Mensual' : 
                     metric.frequency === 'quarterly' ? 'Trimestral' : 
                     metric.frequency === 'yearly' ? 'Anual' : 
                     metric.frequency === 'weekly' ? 'Semanal' : 'Diario'}
                  </span>
                </div>
              </div>
            </div>
            {getStatusIndicator(metric.currentValue, metric.target)}
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div className="w-full">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Actual: {metric.currentValue} {metric.unit}</span>
                <span className="text-slate-500">Meta: {metric.target} {metric.unit}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.currentValue !== undefined && metric.target !== undefined
                      ? metric.currentValue >= metric.target 
                        ? 'bg-green-500' 
                        : metric.currentValue >= metric.target * 0.8 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      : 'bg-gray-300'
                  }`}
                  style={{ 
                    width: `${Math.min(
                      100, 
                      metric.currentValue !== undefined && metric.target !== undefined 
                        ? (metric.currentValue / metric.target) * 100 
                        : 0
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsList; 