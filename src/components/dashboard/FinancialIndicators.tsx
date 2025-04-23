import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { PieChart, BarChart3, TrendingUp, Clock, Wallet, DollarSign } from 'lucide-react';

interface FinancialIndicatorsProps {
  filters: DashboardFiltersState;
}

interface IndicatorCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  description: string;
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, change, trend, icon, description }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </span>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {trend === 'up' ? '+' : '-'}{Math.abs(change)}%
      </span>
    </div>
    <h3 className="mt-4 text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

export const FinancialIndicators: React.FC<FinancialIndicatorsProps> = ({ filters }) => {
  const indicators = [
    {
      title: 'Margen Bruto',
      value: '35.8%',
      change: 2.4,
      trend: 'up' as const,
      icon: <PieChart className="w-6 h-6" />,
      description: 'Ingresos menos costos directos'
    },
    {
      title: 'ROE',
      value: '22.5%',
      change: -1.2,
      trend: 'down' as const,
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'Retorno sobre el patrimonio'
    },
    {
      title: 'ROA',
      value: '15.3%',
      change: 1.8,
      trend: 'up' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Retorno sobre activos'
    },
    {
      title: 'DSO',
      value: '45 días',
      change: -5,
      trend: 'up' as const,
      icon: <Clock className="w-6 h-6" />,
      description: 'Días promedio de cobro'
    },
    {
      title: 'DPO',
      value: '30 días',
      change: 2,
      trend: 'down' as const,
      icon: <Clock className="w-6 h-6" />,
      description: 'Días promedio de pago'
    },
    {
      title: 'Capital de Trabajo',
      value: 'S/ 850,000',
      change: 12.5,
      trend: 'up' as const,
      icon: <Wallet className="w-6 h-6" />,
      description: 'Activo corriente - Pasivo corriente'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indicators.map((indicator, index) => (
          <IndicatorCard key={index} {...indicator} />
        ))}
      </div>
    </div>
  );
}; 