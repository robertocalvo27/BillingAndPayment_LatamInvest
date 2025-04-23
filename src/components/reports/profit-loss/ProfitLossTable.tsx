import React from 'react';
import { PeriodType, FinancialItem } from '../../../types/financial-statements';

interface MonthlyData {
  [month: string]: number;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];

const generateExampleMonthlyData = (baseAmount: number): MonthlyData => {
  return MONTHS.reduce((acc, month, index) => {
    // Genera datos de ejemplo con variación aleatoria
    const variation = Math.random() * 0.4 - 0.2; // -20% a +20%
    acc[month] = Math.round(baseAmount * (1 + variation));
    return acc;
  }, {} as MonthlyData);
};

const calculateQuarterlyData = (monthlyData: MonthlyData): { [quarter: string]: number } => {
  return QUARTERS.reduce((acc, quarter, index) => {
    const startMonth = index * 3;
    const quarterSum = MONTHS.slice(startMonth, startMonth + 3)
      .reduce((sum, month) => sum + (monthlyData[month] || 0), 0);
    acc[quarter] = quarterSum;
    return acc;
  }, {} as { [quarter: string]: number });
};

interface FinancialItemRowProps {
  item: FinancialItem;
  periodType: PeriodType;
  monthlyData: MonthlyData;
  level?: number;
}

const FinancialItemRow: React.FC<FinancialItemRowProps> = ({ 
  item, 
  periodType, 
  monthlyData,
  level = 0 
}) => {
  const quarterlyData = calculateQuarterlyData(monthlyData);
  const periods = periodType === 'months' ? MONTHS : QUARTERS;
  const data = periodType === 'months' ? monthlyData : quarterlyData;

  return (
    <>
      <tr className={`${level > 0 ? 'pl-' + (level * 4) : ''}`}>
        <td className="px-4 py-2 font-medium">{item.name}</td>
        {periods.map((period) => (
          <td key={period} className="px-4 py-2 text-right">
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN'
            }).format(data[period] || 0)}
          </td>
        ))}
      </tr>
      {item.children?.map((child) => (
        <FinancialItemRow
          key={child.id}
          item={child}
          periodType={periodType}
          monthlyData={generateExampleMonthlyData(child.amount)}
          level={level + 1}
        />
      ))}
    </>
  );
};

interface ProfitLossTableProps {
  periodType: PeriodType;
}

export const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ periodType }) => {
  // Datos de ejemplo
  const salesData = {
    id: '1',
    name: 'Ventas',
    amount: 100000,
    children: [
      { id: '1.1', name: 'Ventas Nacionales', amount: 70000 },
      { id: '1.2', name: 'Exportaciones', amount: 30000 }
    ]
  };

  const costsData = {
    id: '2',
    name: 'Costos',
    amount: 60000,
    children: [
      { id: '2.1', name: 'Materia Prima', amount: 35000 },
      { id: '2.2', name: 'Mano de Obra', amount: 25000 }
    ]
  };

  const periods = periodType === 'months' ? MONTHS : QUARTERS;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Concepto</th>
            {periods.map((period) => (
              <th key={period} className="px-4 py-2 text-right">{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <FinancialItemRow
            item={salesData}
            periodType={periodType}
            monthlyData={generateExampleMonthlyData(salesData.amount)}
          />
          <FinancialItemRow
            item={costsData}
            periodType={periodType}
            monthlyData={generateExampleMonthlyData(costsData.amount)}
          />
        </tbody>
      </table>
    </div>
  );
}; 