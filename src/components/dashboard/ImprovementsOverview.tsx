import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { 
  Lightbulb,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  BarChart4,
  Zap,
  DollarSign,
  Target
} from 'lucide-react';

interface ImprovementsOverviewProps {
  filters: DashboardFiltersState;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'cost_reduction' | 'efficiency' | 'anomaly' | 'trend';
  potentialSavings?: string;
  recommendedActions: string[];
  metrics?: {
    label: string;
    value: string;
    change: number;
  }[];
}

export const ImprovementsOverview: React.FC<ImprovementsOverviewProps> = ({ filters }) => {
  // Simulación de insights generados por IA
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      title: 'Patrones de Gasto Inusuales en IT',
      description: 'Se detectaron incrementos significativos en gastos de servicios cloud que no correlacionan con el crecimiento del negocio.',
      impact: 'high',
      category: 'anomaly',
      potentialSavings: 'S/ 45,000 anuales',
      recommendedActions: [
        'Revisar y optimizar instancias cloud no utilizadas',
        'Implementar política de auto-scaling',
        'Negociar términos con proveedores cloud actuales'
      ],
      metrics: [
        {
          label: 'Gasto Cloud Actual',
          value: 'S/ 12,500',
          change: 45.2
        },
        {
          label: 'Benchmark del Sector',
          value: 'S/ 8,600',
          change: 0
        }
      ]
    },
    {
      id: '2',
      title: 'Optimización de Gastos Operativos',
      description: 'Análisis de tendencias muestra oportunidades de consolidación en servicios administrativos.',
      impact: 'medium',
      category: 'efficiency',
      potentialSavings: 'S/ 28,000 anuales',
      recommendedActions: [
        'Centralizar servicios administrativos',
        'Automatizar procesos manuales repetitivos',
        'Renegociar contratos con proveedores'
      ],
      metrics: [
        {
          label: 'Gastos Administrativos',
          value: 'S/ 35,000',
          change: 12.5
        },
        {
          label: 'Objetivo Propuesto',
          value: 'S/ 27,000',
          change: -22.8
        }
      ]
    },
    {
      id: '3',
      title: 'Tendencia de Incremento en Marketing Digital',
      description: 'El ROI de campañas digitales muestra rendimientos decrecientes en los últimos 3 meses.',
      impact: 'medium',
      category: 'trend',
      potentialSavings: 'S/ 15,000 trimestrales',
      recommendedActions: [
        'Revisar la segmentación de campañas',
        'Optimizar canales con mejor conversión',
        'Ajustar presupuesto por canal según ROI'
      ],
      metrics: [
        {
          label: 'ROI Actual',
          value: '2.1x',
          change: -18.5
        },
        {
          label: 'ROI Objetivo',
          value: '3.5x',
          change: 0
        }
      ]
    }
  ];

  const getImpactColor = (impact: AIInsight['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const getCategoryIcon = (category: AIInsight['category']) => {
    switch (category) {
      case 'cost_reduction':
        return <TrendingDown className="w-5 h-5" />;
      case 'efficiency':
        return <Zap className="w-5 h-5" />;
      case 'anomaly':
        return <AlertTriangle className="w-5 h-5" />;
      case 'trend':
        return <BarChart4 className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/10 px-2 py-1 rounded">
              Ahorro Potencial
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">S/ 88,000</h3>
          <p className="text-blue-100">Ahorro anual proyectado</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/10 px-2 py-1 rounded">
              Oportunidades
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">3</h3>
          <p className="text-purple-100">Áreas de mejora identificadas</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-lg shadow-sm text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium bg-white/10 px-2 py-1 rounded">
              Eficiencia
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">15.2%</h3>
          <p className="text-emerald-100">Mejora potencial en eficiencia</p>
        </div>
      </div>

      {/* Lista de Insights */}
      <div className="space-y-6">
        {aiInsights.map((insight) => (
          <div
            key={insight.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getImpactColor(insight.impact)}`}>
                    {getCategoryIcon(insight.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {insight.title}
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {insight.description}
                    </p>
                  </div>
                </div>
                {insight.potentialSavings && (
                  <div className="ml-4 flex-shrink-0">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Ahorro: {insight.potentialSavings}
                    </div>
                  </div>
                )}
              </div>

              {/* Métricas */}
              {insight.metrics && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {insight.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <p className="text-sm text-gray-600">{metric.label}</p>
                      <div className="mt-1 flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">
                          {metric.value}
                        </p>
                        <p
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            metric.change > 0
                              ? 'text-red-600'
                              : metric.change < 0
                              ? 'text-green-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {metric.change > 0 ? '+' : ''}
                          {metric.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Acciones Recomendadas */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Acciones Recomendadas
                </h4>
                <ul className="mt-2 space-y-2">
                  {insight.recommendedActions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 