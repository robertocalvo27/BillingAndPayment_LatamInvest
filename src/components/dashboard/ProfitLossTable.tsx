import React from 'react';
import { DashboardFiltersState } from '../../types/financial-statements';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ProfitLossTableProps {
  filters: DashboardFiltersState;
}

interface FinancialRow {
  concept: string;
  amount: number;
  percentage: number;
  change: number;
}

export const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ filters }) => {
  const data: FinancialRow[] = [
    {
      concept: 'Ingresos',
      amount: 1250000,
      percentage: 100,
      change: 15.2
    },
    {
      concept: 'Costo de Ventas',
      amount: -802500,
      percentage: -64.2,
      change: -8.5
    },
    {
      concept: 'Utilidad Bruta',
      amount: 447500,
      percentage: 35.8,
      change: 2.4
    },
    {
      concept: 'Gastos Operativos',
      amount: -187500,
      percentage: -15,
      change: -5.3
    },
    {
      concept: 'Utilidad Operativa',
      amount: 260000,
      percentage: 20.8,
      change: 12.7
    },
    {
      concept: 'Gastos Financieros',
      amount: -37500,
      percentage: -3,
      change: -1.2
    },
    {
      concept: 'Utilidad antes de Impuestos',
      amount: 222500,
      percentage: 17.8,
      change: 8.9
    },
    {
      concept: 'Impuestos',
      amount: -65637,
      percentage: -5.25,
      change: -2.6
    },
    {
      concept: 'Utilidad Neta',
      amount: 156863,
      percentage: 12.55,
      change: 6.3
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Concepto
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              % Ingresos
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Var. %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.concept}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatAmount(row.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatPercentage(row.percentage)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <span className={`inline-flex items-center ${
                  row.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {row.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                  )}
                  {Math.abs(row.change)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 