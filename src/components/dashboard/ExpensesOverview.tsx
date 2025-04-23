import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { TrendingDown, DollarSign, Building2, Users } from 'lucide-react';
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

interface ExpensesOverviewProps {
  filters: DashboardFiltersState;
}

export const ExpensesOverview: React.FC<ExpensesOverviewProps> = ({ filters }) => {
  const kpis = [
    {
      title: 'Gastos Totales',
      value: 'S/ 1,250,000',
      change: -5.2,
      trend: 'down' as const,
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Total de gastos del periodo'
    },
    {
      title: 'Gastos Operativos',
      value: 'S/ 850,000',
      change: -3.8,
      trend: 'down' as const,
      icon: <Building2 className="w-6 h-6" />,
      description: 'Gastos de operación'
    },
    {
      title: 'Gastos Administrativos',
      value: 'S/ 400,000',
      change: -8.5,
      trend: 'down' as const,
      icon: <Users className="w-6 h-6" />,
      description: 'Gastos administrativos y de personal'
    },
    {
      title: 'Reducción YoY',
      value: '5.2%',
      change: 5.2,
      trend: 'up' as const,
      icon: <TrendingDown className="w-6 h-6" />,
      description: 'Reducción respecto al año anterior'
    }
  ];

  const monthlyExpensesData = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'Gastos Operativos',
        data: [75000, 72000, 68000, 71000, 69000, 73000, 70000, 68000, 72000, 69000, 71000, 72000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Gastos Administrativos',
        data: [35000, 33000, 34000, 32000, 33000, 35000, 34000, 32000, 33000, 32000, 33000, 34000],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
      }
    ]
  };

  const expensesByCategoryData = {
    labels: ['Personal', 'Servicios', 'Mantenimiento', 'Marketing', 'IT', 'Otros'],
    datasets: [
      {
        label: 'Distribución de Gastos',
        data: [450000, 280000, 180000, 150000, 120000, 70000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(107, 114, 128, 0.7)',
        ],
      }
    ]
  };

  const monthlyExpensesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolución Mensual de Gastos',
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

  const expensesByCategoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribución de Gastos por Categoría',
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
                  kpi.change > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {kpi.change > 0 ? '+' : ''}
                {kpi.change}%
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
          <Line options={monthlyExpensesOptions} data={monthlyExpensesData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Bar options={expensesByCategoryOptions} data={expensesByCategoryData} />
        </div>
      </div>
    </div>
  );
}; 