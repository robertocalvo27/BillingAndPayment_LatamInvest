import React from 'react';
import { ProfitLossFilters as Filters, PeriodType, AccountingMethod, BusinessUnit } from '../../../types/financial-statements';

interface ProfitLossFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const periodOptions: { value: PeriodType; label: string }[] = [
  { value: 'months', label: 'Meses' },
  { value: 'quarters', label: 'Trimestres' },
  { value: 'years', label: 'Años' },
];

const businessUnitOptions: { value: BusinessUnit; label: string }[] = [
  { value: 'all', label: 'Todas las unidades' },
  { value: 'logifit', label: 'Logifit' },
  { value: 'bizflow-tech', label: 'Bizflow Tech' },
  { value: 'logiflex', label: 'Logiflex' },
];

const ProfitLossFilters: React.FC<ProfitLossFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    onFiltersChange({
      ...filters,
      period: {
        ...filters.period,
        [field]: value,
      },
    });
  };

  const handleShowColumnsChange = (value: PeriodType) => {
    onFiltersChange({
      ...filters,
      showColumns: value,
    });
  };

  const handleAccountingMethodChange = (method: AccountingMethod) => {
    onFiltersChange({
      ...filters,
      accountingMethod: method,
    });
  };

  const handleBusinessUnitChange = (value: BusinessUnit) => {
    onFiltersChange({
      ...filters,
      businessUnit: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Periodo del informe */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Periodo del informe
          </label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={filters.period.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <span className="flex items-center text-gray-500">hasta</span>
            <input
              type="date"
              value={filters.period.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Unidad de Negocio */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Unidad de Negocio
          </label>
          <select
            value={filters.businessUnit}
            onChange={(e) => handleBusinessUnitChange(e.target.value as BusinessUnit)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            {businessUnitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar columnas por */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mostrar columnas por
          </label>
          <select
            value={filters.showColumns}
            onChange={(e) => handleShowColumnsChange(e.target.value as PeriodType)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Método de contabilización */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Método de contabilización
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={filters.accountingMethod === 'cash'}
                onChange={() => handleAccountingMethodChange('cash')}
                className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2">Efectivo</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={filters.accountingMethod === 'accrual'}
                onChange={() => handleAccountingMethodChange('accrual')}
                className="form-radio h-4 w-4 text-green-600 focus:ring-green-500"
              />
              <span className="ml-2">Devengo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Opciones adicionales */}
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={filters.showOnlyWithValue}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                showOnlyWithValue: e.target.checked,
              })
            }
            className="form-checkbox h-4 w-4 text-green-600 focus:ring-green-500"
          />
          <span className="ml-2 text-sm">Mostrar solo lo que tenga un valor diferente de 0</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={filters.showNonCashItems}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                showNonCashItems: e.target.checked,
              })
            }
            className="form-checkbox h-4 w-4 text-green-600 focus:ring-green-500"
          />
          <span className="ml-2 text-sm">Mostrar ganancias o pérdidas no efectivas</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Ejecutar informe
        </button>
      </div>
    </div>
  );
};

export default ProfitLossFilters; 