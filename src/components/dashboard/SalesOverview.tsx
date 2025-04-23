import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import { MonthlyRevenue } from './charts/MonthlyRevenue';
import { QuarterlyRevenue } from './charts/QuarterlyRevenue';
import { ClientDistribution } from './charts/ClientDistribution';
import { ServiceDistribution } from './charts/ServiceDistribution';
import { MonthlyByClient } from './charts/MonthlyByClient';
import { SalesTarget } from './charts/SalesTarget';

interface SalesOverviewProps {
  filters: DashboardFiltersState;
}

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend, icon }) => (
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
  </div>
);

export const SalesOverview: React.FC<SalesOverviewProps> = ({ filters }) => {
  const kpis = [
    {
      title: 'Crecimiento Anual',
      value: '24.5%',
      change: 24.5,
      trend: 'up' as const,
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: 'Nuevos Clientes',
      value: '12',
      change: 33.3,
      trend: 'up' as const,
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Meta Mensual',
      value: '85%',
      change: -5,
      trend: 'down' as const,
      icon: <Target className="w-6 h-6" />
    },
    {
      title: 'Ticket Promedio',
      value: 'S/ 45,000',
      change: 12.8,
      trend: 'up' as const,
      icon: <BarChart3 className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primera fila */}
        <div className="bg-white p-4 rounded-lg shadow">
          <MonthlyRevenue filters={filters} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <QuarterlyRevenue filters={filters} />
        </div>

        {/* Segunda fila */}
        <div className="bg-white p-4 rounded-lg shadow">
          <ClientDistribution filters={filters} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <ServiceDistribution filters={filters} />
        </div>

        {/* Tercera fila */}
        <div className="bg-white p-4 rounded-lg shadow">
          <MonthlyByClient filters={filters} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <SalesTarget filters={filters} />
        </div>
      </div>
    </div>
  );
}; 