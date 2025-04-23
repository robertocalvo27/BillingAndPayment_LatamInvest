import React from 'react';
import { DashboardFilters } from './DashboardFilters';
import { DashboardTabs } from './DashboardTabs';
import { FinancialIndicators } from './FinancialIndicators';
import { SalesOverview } from './SalesOverview';
import { ExpensesOverview } from './ExpensesOverview';
import { BudgetOverview } from './BudgetOverview';
import { ImprovementsOverview } from './ImprovementsOverview';
import { DashboardFiltersState } from '../../types/financial-statements';

const FinancialDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'indicators' | 'sales' | 'expenses' | 'budget' | 'improvements' | 'projections'>('indicators');
  const [filters, setFilters] = React.useState<DashboardFiltersState>({
    period: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      preset: 'year-to-date',
    },
    businessUnit: 'all',
    country: 'all',
    currency: 'USD',
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'indicators':
        return <FinancialIndicators filters={filters} />;
      case 'sales':
        return <SalesOverview filters={filters} />;
      case 'expenses':
        return <ExpensesOverview filters={filters} />;
      case 'budget':
        return <BudgetOverview filters={filters} />;
      case 'improvements':
        return (
          <div className="text-center py-10">
            <p className="text-gray-500">Módulo de mejoras financieras con IA en desarrollo</p>
          </div>
        );
      case 'projections':
        return (
          <div className="text-center py-10">
            <p className="text-gray-500">Módulo de proyecciones en desarrollo</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Dashboard Financiero</h1>
        <p className="text-gray-600">Análisis gráfico del desempeño financiero</p>
      </div>

      <DashboardFilters filters={filters} onFiltersChange={setFilters} />
      
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default FinancialDashboard; 