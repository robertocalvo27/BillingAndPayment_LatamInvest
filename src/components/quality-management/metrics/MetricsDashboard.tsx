import React, { useState } from 'react';
import { QualityMetric, ProcessCategory } from '../../../types/quality-management';
import { Card } from '../../common/Card';
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  Filter
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
  ArcElement
);

interface MetricsDashboardProps {
  metrics: QualityMetric[];
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ metrics }) => {
  const [categoryFilter, setCategoryFilter] = useState<ProcessCategory | 'all'>('all');
  
  const filteredMetrics = metrics.filter(metric => 
    categoryFilter === 'all' || metric.category === categoryFilter
  );

  // Obtener las métricas con tendencia (las que tienen al menos 2 entradas históricas)
  const metricsWithTrend = filteredMetrics.filter(
    metric => metric.history.length >= 2
  );

  // Calcular tendencias para cada métrica
  const getTrend = (metric: QualityMetric) => {
    if (metric.history.length < 2) return 'neutral';
    
    const sortedHistory = [...metric.history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const latest = sortedHistory[sortedHistory.length - 1].value;
    const previous = sortedHistory[sortedHistory.length - 2].value;
    
    // Para métricas donde un valor menor es mejor (como defectos o tiempo de respuesta)
    const isLowerBetter = 
      metric.name.toLowerCase().includes('defecto') || 
      metric.name.toLowerCase().includes('tiempo') ||
      metric.name.toLowerCase().includes('incidente') ||
      metric.name.toLowerCase().includes('error');
    
    if (latest === previous) return 'neutral';
    
    if (isLowerBetter) {
      return latest < previous ? 'positive' : 'negative';
    } else {
      return latest > previous ? 'positive' : 'negative';
    }
  };

  // Obtener estado de cumplimiento para cada métrica
  const getStatus = (metric: QualityMetric) => {
    if (metric.currentValue === undefined || metric.target === undefined) {
      return 'unknown';
    }
    
    // Para métricas donde un valor menor es mejor
    const isLowerBetter = 
      metric.name.toLowerCase().includes('defecto') || 
      metric.name.toLowerCase().includes('tiempo') ||
      metric.name.toLowerCase().includes('incidente') ||
      metric.name.toLowerCase().includes('error');
    
    if (isLowerBetter) {
      if (metric.currentValue <= metric.target) return 'success';
      if (metric.currentValue <= metric.target * 1.2) return 'warning';
      return 'danger';
    } else {
      if (metric.currentValue >= metric.target) return 'success';
      if (metric.currentValue >= metric.target * 0.8) return 'warning';
      return 'danger';
    }
  };

  // Agrupar métricas por categoría
  const metricsByCategory = filteredMetrics.reduce<Record<string, QualityMetric[]>>(
    (acc, metric) => {
      const category = metric.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(metric);
      return acc;
    },
    {}
  );

  // Preparar datos para el gráfico radar por categoría
  const radarData = {
    labels: Object.keys(metricsByCategory).map(category => {
      const categoryMap: Record<string, string> = {
        'software_development': 'Desarrollo',
        'project_management': 'Proyectos',
        'customer_service': 'Servicio',
        'quality_assurance': 'Calidad',
        'resource_management': 'Recursos',
        'risk_management': 'Riesgos',
        'continuous_improvement': 'Mejora',
      };
      return categoryMap[category] || category;
    }),
    datasets: [
      {
        label: 'Cumplimiento de metas (%)',
        data: Object.values(metricsByCategory).map(categoryMetrics => {
          // Calcular promedio de cumplimiento para cada categoría
          const avgCompliance = categoryMetrics.reduce((sum, metric) => {
            if (metric.currentValue === undefined || metric.target === undefined) {
              return sum;
            }
            
            // Para métricas donde un valor menor es mejor
            const isLowerBetter = 
              metric.name.toLowerCase().includes('defecto') || 
              metric.name.toLowerCase().includes('tiempo') ||
              metric.name.toLowerCase().includes('incidente') ||
              metric.name.toLowerCase().includes('error');
            
            let compliance;
            if (isLowerBetter) {
              compliance = metric.target === 0 ? 100 : Math.min(100, 100 * (metric.target / Math.max(metric.currentValue, 0.01)));
            } else {
              compliance = metric.target === 0 ? 0 : Math.min(100, 100 * (metric.currentValue / metric.target));
            }
            
            return sum + compliance;
          }, 0) / categoryMetrics.length;
          
          return avgCompliance;
        }),
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(79, 70, 229, 1)',
        pointRadius: 4,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Seleccionar algunas métricas clave para mostrar en tendencias
  const topMetricsForTrend = metricsWithTrend
    .filter(m => m.history.length >= 3)
    .slice(0, 3);

  // Datos para gráfico de tendencias
  const trendData = {
    labels: topMetricsForTrend.length > 0 
      ? topMetricsForTrend[0].history.map(h => {
          const date = new Date(h.date);
          return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        })
      : [],
    datasets: topMetricsForTrend.map((metric, index) => {
      const colors = [
        { border: 'rgb(79, 70, 229)', background: 'rgba(79, 70, 229, 0.1)' },
        { border: 'rgb(34, 197, 94)', background: 'rgba(34, 197, 94, 0.1)' },
        { border: 'rgb(249, 115, 22)', background: 'rgba(249, 115, 22, 0.1)' },
      ];
      
      return {
        label: metric.name,
        data: metric.history.map(h => h.value),
        borderColor: colors[index % colors.length].border,
        backgroundColor: colors[index % colors.length].background,
        tension: 0.3,
        fill: true,
      };
    }),
  };

  const trendOptions = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Datos para gráfico de barras de métricas clave
  const keyMetrics = filteredMetrics
    .filter(m => m.currentValue !== undefined && m.target !== undefined)
    .slice(0, 6);

  const barData = {
    labels: keyMetrics.map(m => m.name.length > 15 ? m.name.slice(0, 15) + '...' : m.name),
    datasets: [
      {
        label: 'Valor Actual',
        data: keyMetrics.map(m => m.currentValue),
        backgroundColor: keyMetrics.map(m => {
          const status = getStatus(m);
          return status === 'success' ? 'rgba(34, 197, 94, 0.8)' :
                 status === 'warning' ? 'rgba(249, 115, 22, 0.8)' :
                 'rgba(239, 68, 68, 0.8)';
        }),
        borderWidth: 1,
      },
      {
        label: 'Meta',
        data: keyMetrics.map(m => m.target),
        backgroundColor: 'rgba(100, 116, 139, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Calcular estadísticas generales
  const totalMetrics = filteredMetrics.length;
  const metricsOnTarget = filteredMetrics.filter(m => getStatus(m) === 'success').length;
  const metricsInWarning = filteredMetrics.filter(m => getStatus(m) === 'warning').length;
  const metricsInDanger = filteredMetrics.filter(m => getStatus(m) === 'danger').length;
  const compliancePercent = totalMetrics === 0 ? 0 : Math.round((metricsOnTarget / totalMetrics) * 100);

  // Opciones para filtrar por categoría
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
        <h3 className="text-xl font-semibold text-slate-900">
          Dashboard de Métricas
        </h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            className="input"
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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <span className="text-sm font-medium text-slate-500">Cumplimiento General</span>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-3xl font-bold text-slate-900">{compliancePercent}%</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${
                compliancePercent >= 80 ? 'bg-green-100 text-green-800' :
                compliancePercent >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {compliancePercent >= 80 ? <ChevronUp className="w-3 h-3 mr-1" /> :
                 compliancePercent >= 60 ? <Minus className="w-3 h-3 mr-1" /> :
                 <ChevronDown className="w-3 h-3 mr-1" />}
                Meta: 80%
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
              <div
                className={`h-2 rounded-full ${
                  compliancePercent >= 80 ? 'bg-green-500' :
                  compliancePercent >= 60 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${compliancePercent}%` }}
              />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <span className="text-sm font-medium text-slate-500">Métricas en Meta</span>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-3xl font-bold text-green-600">{metricsOnTarget}</h3>
              <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                {totalMetrics === 0 ? '0' : Math.round((metricsOnTarget / totalMetrics) * 100)}%
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              De un total de {totalMetrics} métricas
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <span className="text-sm font-medium text-slate-500">En Riesgo</span>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-3xl font-bold text-yellow-600">{metricsInWarning}</h3>
              <div className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
                {totalMetrics === 0 ? '0' : Math.round((metricsInWarning / totalMetrics) * 100)}%
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Requieren atención pronto
            </p>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <span className="text-sm font-medium text-slate-500">Críticas</span>
            <div className="flex justify-between items-end mt-2">
              <h3 className="text-3xl font-bold text-red-600">{metricsInDanger}</h3>
              <div className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                {totalMetrics === 0 ? '0' : Math.round((metricsInDanger / totalMetrics) * 100)}%
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Requieren acción inmediata
            </p>
          </div>
        </Card>
      </div>

      {/* Gráficos y más detalle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="p-6">
            <h4 className="text-lg font-medium text-slate-900 mb-4">Cumplimiento por Categoría</h4>
            <div className="h-80">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>
        </Card>
        
        <Card className="md:col-span-2">
          <div className="p-6">
            <h4 className="text-lg font-medium text-slate-900 mb-4">Métricas Clave</h4>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h4 className="text-lg font-medium text-slate-900 mb-4">Tendencias</h4>
          <div className="h-80">
            <Line data={trendData} options={trendOptions} />
          </div>
        </div>
      </Card>

      {/* Métricas con tendencia */}
      <div>
        <h4 className="text-lg font-medium text-slate-900 mb-4">Resumen de Tendencias</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricsWithTrend.slice(0, 6).map(metric => {
            const trend = getTrend(metric);
            const status = getStatus(metric);
            
            return (
              <Card key={metric.id}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h5 className="text-base font-medium text-slate-900">{metric.name}</h5>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status === 'success' ? 'bg-green-100 text-green-800' :
                      status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      status === 'danger' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {status === 'success' ? 'En meta' :
                       status === 'warning' ? 'En riesgo' :
                       status === 'danger' ? 'Crítico' : 'N/A'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`p-2 rounded-full ${
                      trend === 'positive' ? 'bg-green-100' :
                      trend === 'negative' ? 'bg-red-100' :
                      'bg-slate-100'
                    }`}>
                      {trend === 'positive' ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      ) : trend === 'negative' ? (
                        <ArrowDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-500">Actual vs Meta:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold">
                          {metric.currentValue} {metric.unit}
                        </span>
                        <span className="text-sm text-slate-500">
                          / {metric.target} {metric.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Progreso</span>
                      <span className={`font-medium ${
                        status === 'success' ? 'text-green-600' :
                        status === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {metric.currentValue !== undefined && metric.target !== undefined
                          ? Math.round((metric.currentValue / metric.target) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          status === 'success' ? 'bg-green-500' :
                          status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
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
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard; 