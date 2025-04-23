import React, { useState } from 'react';
import ProfitLossFilters from './ProfitLossFilters';
import ProfitLossTable from './ProfitLossTable';
import { ProfitLossFilters as Filters, ProfitLossData } from '../../../types/financial-statements';

const defaultFilters: Filters = {
  period: {
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  showColumns: 'months',
  showOnlyWithValue: false,
  accountingMethod: 'accrual',
  showNonCashItems: true,
};

// Datos de ejemplo
const sampleData: ProfitLossData = {
  companyName: 'LOGIFIT, SAC',
  period: 'Enero - diciembre 2024',
  income: [
    {
      id: 'sales',
      name: 'Sales',
      amount: 869657.53,
      children: [
        {
          id: 'banda-somnolencia',
          name: 'Banda de Somnolencia y Fatiga',
          amount: 221137.47,
        },
        {
          id: 'saas',
          name: 'SaaS',
          amount: 648520.06,
        },
      ],
    },
  ],
  costOfSales: [
    {
      id: 'cost-of-sales',
      name: 'Cost of sales',
      amount: 41186.88,
    },
  ],
  grossProfit: 828470.65,
  operatingExpenses: [],
  otherExpenses: [
    {
      id: 'non-cash-gains',
      name: 'Ganancias o pérdidas no efectivas',
      amount: 0.00,
    },
    {
      id: 'exchange-diff',
      name: 'Exchange Gain or Loss',
      amount: -0.10,
    },
  ],
  netIncome: 828470.75,
};

const ProfitLossReport: React.FC = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Aquí se implementará la lógica para actualizar los datos según los filtros
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Informe de Pérdidas y ganancias</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualiza el rendimiento financiero de tu empresa
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>←</span>
          <span>Volver a los informes estándar</span>
        </button>
      </div>

      <ProfitLossFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          Contraer
        </button>
        <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          Ordenar ▼
        </button>
        <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          Agregar notas
        </button>
        <div className="border-l border-gray-300" />
        <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          📧
        </button>
        <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          🖨️
        </button>
        <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          ⬇️
        </button>
        <button className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
          ⚙️
        </button>
      </div>

      <ProfitLossTable data={sampleData} />
    </div>
  );
};

export default ProfitLossReport; 