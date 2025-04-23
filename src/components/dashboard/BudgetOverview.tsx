import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BudgetOverviewProps {
  filters: DashboardFiltersState;
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({ filters }) => {
  const kpis = [
    {
      title: 'Cumplimiento Ventas',
      value: '92.5%',
      change: -7.5,
      trend: 'down' as const,
      icon: <Target className="w-6 h-6" />,
      description: 'Presupuesto de ventas alcanzado'
    },
    {
      title: 'Control de Gastos',
      value: '85.2%',
      change: 14.8,
      trend: 'up' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Gastos bajo el presupuesto'
    },
    {
      title: 'Alertas',
      value: '3',
      change: 0,
      trend: 'neutral' as const,
      icon: <AlertTriangle className="w-6 h-6" />,
      description: 'Partidas sobre presupuesto'
    },
    {
      title: 'Metas Cumplidas',
      value: '8/10',
      change: 2,
      trend: 'up' as const,
      icon: <CheckCircle className="w-6 h-6" />,
      description: 'Objetivos presupuestales'
    }
  ];

  const budgetComparisonData = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'Presupuestado',
        data: [120000, 125000, 130000, 128000, 135000, 140000, 138000, 142000, 145000, 150000, 148000, 155000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Real',
        data: [115000, 118000, 125000, 122000, 130000, 133000, 132000, 138000, 140000, 142000, 141000, 148000],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderWidth: 2,
        fill: true,
      }
    ]
  };

  const budgetVarianceData = {
    labels: ['Personal', 'Marketing', 'Operaciones', 'IT', 'Administrativo', 'Otros'],
    datasets: [
      {
        label: 'Variación vs Presupuesto (%)',
        data: [-5.2, 8.4, -2.1, 12.5, -3.8, 1.5],
        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex];
          return value > 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(34, 197, 94, 0.7)';
        },
      }
    ]
  };

  const budgetComparisonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Presupuesto vs Real',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            return `S/ ${value.toLocaleString('es-PE')}`;
          },
        },
      },
    },
  };

  const budgetVarianceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Variación Presupuestal por Categoría',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            return `${value > 0 ? '+' : ''}${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                {React.cloneElement(kpi.icon, {
                  className: 'w-6 h-6 text-blue-500',
                })}
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  kpi.trend === 'up'
                    ? 'bg-green-100 text-green-800'
                    : kpi.trend === 'down'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {kpi.change > 0 ? '+' : ''}
                {kpi.change !== 0 ? `${kpi.change}%` : 'N/A'}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{kpi.value}</p>
              <p className="mt-1 text-sm text-gray-500">{kpi.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Line options={budgetComparisonOptions} data={budgetComparisonData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Bar options={budgetVarianceOptions} data={budgetVarianceData} />
        </div>
      </div>

      {/* Alertas de Presupuesto */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alertas de Presupuesto</h3>
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Gastos de Marketing sobre presupuesto</h4>
              <p className="mt-1 text-sm text-red-700">
                Los gastos de marketing superan en 8.4% el presupuesto asignado para el periodo.
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-red-800">Gastos de IT sobre presupuesto</h4>
              <p className="mt-1 text-sm text-red-700">
                Los gastos de IT superan en 12.5% el presupuesto asignado para el periodo.
              </p>
            </div>
          </div>
          <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Ingresos bajo presupuesto</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Los ingresos están 7.5% por debajo del presupuesto proyectado para el periodo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 