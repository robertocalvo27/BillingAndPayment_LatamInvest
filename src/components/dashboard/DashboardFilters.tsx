import React, { useEffect } from 'react';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { BusinessUnit, Country, Currency, DatePreset, DashboardFiltersState, CURRENCY_NAMES } from '../../types/financial-statements';

interface DashboardFiltersProps {
  filters: DashboardFiltersState;
  onFiltersChange: (filters: DashboardFiltersState) => void;
}

const DATE_PRESETS: { label: string; value: DatePreset }[] = [
  { label: 'Hoy', value: 'today' },
  { label: 'Ayer', value: 'yesterday' },
  { label: 'Esta Semana', value: 'this-week' },
  { label: 'Este Mes', value: 'this-month' },
  { label: 'Año hasta la fecha', value: 'year-to-date' },
  { label: 'Personalizado', value: 'custom' },
];

const COUNTRIES: { label: string; value: Country }[] = [
  { label: 'Todas las operaciones', value: 'all' },
  { label: 'Perú', value: 'peru' },
  { label: 'Chile', value: 'chile' },
  { label: 'Costa Rica', value: 'costa-rica' },
  { label: 'Panamá', value: 'panama' },
  { label: 'Otros', value: 'otros' },
];

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleDatePresetChange = (preset: DatePreset) => {
    const today = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (preset) {
      case 'today':
        startDate = startOfDay(today);
        endDate = endOfDay(today);
        break;
      case 'yesterday':
        startDate = startOfDay(new Date(today.setDate(today.getDate() - 1)));
        endDate = endOfDay(new Date(today));
        break;
      case 'this-week':
        startDate = startOfWeek(today, { locale: es });
        endDate = endOfWeek(today, { locale: es });
        break;
      case 'this-month':
        startDate = startOfMonth(today);
        endDate = endOfMonth(today);
        break;
      case 'year-to-date':
        startDate = startOfYear(today);
        endDate = endOfDay(today);
        break;
      default:
        return; // Para 'custom' no cambiamos las fechas
    }

    onFiltersChange({
      ...filters,
      period: {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        preset,
      },
    });
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    onFiltersChange({
      ...filters,
      period: {
        ...filters.period,
        [field]: value,
        preset: 'custom',
      },
    });
  };

  const handleBusinessUnitChange = (value: BusinessUnit) => {
    onFiltersChange({
      ...filters,
      businessUnit: value,
    });
  };

  const handleCountryChange = (value: Country) => {
    onFiltersChange({
      ...filters,
      country: value,
    });
  };

  const handleCurrencyChange = (value: Currency) => {
    onFiltersChange({
      ...filters,
      currency: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Periodo del informe */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Periodo del informe
          </label>
          <div className="flex flex-col space-y-2">
            <select
              value={filters.period.preset || 'custom'}
              onChange={(e) => handleDatePresetChange(e.target.value as DatePreset)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {DATE_PRESETS.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
            
            <div className="flex space-x-2">
              <input
                type="date"
                value={filters.period.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <span className="flex items-center text-gray-500">hasta</span>
              <input
                type="date"
                value={filters.period.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* País */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            País
          </label>
          <select
            value={filters.country}
            onChange={(e) => handleCountryChange(e.target.value as Country)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Unidad de Negocio */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Unidad de Negocio
          </label>
          <select
            value={filters.businessUnit}
            onChange={(e) => handleBusinessUnitChange(e.target.value as BusinessUnit)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="all">Todas las unidades</option>
            <option value="logifit">Logifit</option>
            <option value="bizflow-tech">Bizflow Tech</option>
            <option value="logiflex">Logiflex</option>
          </select>
        </div>

        {/* Moneda */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Moneda
          </label>
          <select
            value={filters.currency}
            onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {Object.entries(CURRENCY_NAMES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}; 