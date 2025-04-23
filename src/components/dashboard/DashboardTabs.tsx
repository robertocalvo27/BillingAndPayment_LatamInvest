import React from 'react';
import { BarChart, TrendingUp, PieChart } from 'lucide-react';

interface DashboardTabsProps {
  activeTab: 'indicators' | 'sales' | 'projections';
  onTabChange: (tab: 'indicators' | 'sales' | 'projections') => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'indicators',
      label: 'Indicadores Financieros',
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      id: 'sales',
      label: 'Ventas',
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      id: 'projections',
      label: 'Proyecciones',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as 'indicators' | 'sales' | 'projections')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className={`
                mr-2
                ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}
              `}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}; 