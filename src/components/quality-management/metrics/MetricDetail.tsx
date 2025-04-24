import React from 'react';
import { QualityMetric } from '../../../types/quality-management';
import { 
  BarChart,
  Edit2,
  Trash2,
  Calendar,
  User,
  Target,
  Repeat,
  BarChart4
} from 'lucide-react';
import { Card } from '../../common/Card';
import { Line } from 'react-chartjs-2';
import { useQualityManagementStore } from '../../../store/qualityManagementStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricDetailProps {
  metric: QualityMetric;
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

const getFrequencyLabel = (frequency: string): string => {
  const frequencies: Record<string, string> = {
    'daily': 'Diario',
    'weekly': 'Semanal',
    'monthly': 'Mensual',
    'quarterly': 'Trimestral',
    'yearly': 'Anual',
  };
  
  return frequencies[frequency] || frequency;
};

const getStatusClass = (currentValue?: number, target?: number) => {
  if (currentValue === undefined || target === undefined) return 'text-gray-500';
  if (currentValue >= target) return 'text-green-600';
  if (currentValue >= target * 0.8) return 'text-yellow-600';
  return 'text-red-600';
};

const MetricDetail: React.FC<MetricDetailProps> = ({ metric }) => {
  const { updateMetric } = useQualityManagementStore();
  
  // Preparar datos para la gráfica
  const chartData = {
    labels: metric.history.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }),
    datasets: [
      {
        label: 'Valor',
        data: metric.history.map(item => item.value),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Meta',
        data: metric.history.map(() => metric.target),
        borderColor: 'rgba(34, 197, 94, 0.7)',
        borderDash: [5, 5],
        backgroundColor: 'transparent',
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 10,
          useBorderRadius: true,
          borderRadius: 5,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        displayColors: true,
        usePointStyle: true,
      },
    },
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-primary-100 p-3 rounded-md">
              <BarChart className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {metric.name}
              </h3>
              <p className="text-slate-500 mt-1">
                {metric.description}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-icon btn-outline">
              <Edit2 className="h-4 w-4" />
            </button>
            <button className="btn btn-icon btn-outline text-red-500 hover:bg-red-50">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Meta</div>
                <div className="text-lg font-medium text-slate-900">
                  {metric.target} {metric.unit}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <BarChart4 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Valor Actual</div>
                <div className={`text-lg font-medium ${getStatusClass(metric.currentValue, metric.target)}`}>
                  {metric.currentValue} {metric.unit}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Repeat className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Frecuencia</div>
                <div className="text-lg font-medium text-slate-900">
                  {getFrequencyLabel(metric.frequency)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Última Actualización</div>
                <div className="text-lg font-medium text-slate-900">
                  {new Date(metric.history[metric.history.length - 1]?.date || new Date()).toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-cyan-100 p-2 rounded-full">
                <User className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Responsable</div>
                <div className="text-lg font-medium text-slate-900">
                  {metric.responsible}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-slate-500">Categoría</div>
                <div className="text-lg font-medium text-slate-900">
                  {getCategoryLabel(metric.category)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h4 className="text-md font-medium text-slate-900 mb-4">Evolución</h4>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium text-slate-900 mb-4">Historial de Valores</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-3 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-3 py-3 bg-slate-50 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {metric.history
                  .slice()
                  .reverse()
                  .map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-900">
                        {new Date(record.date).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900">
                        {record.value} {metric.unit}
                      </td>
                      <td className="px-3 py-2 text-sm text-slate-500">
                        {record.notes || '-'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricDetail; 