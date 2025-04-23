import React from 'react';
import { PeriodType, FinancialItem } from '../../../types/financial-statements';

interface MonthlyData {
  [month: string]: number;
}

const MONTHS = [
  'ENE.', 'FEB.', 'MAR.', 'ABR.', 'MAY.', 'JUN.',
  'JUL.', 'AGO.', 'SET.', 'OCT.', 'NOV.', 'DIC.'
];

const QUARTERS = ['ENE. - MAR.', 'ABR. - JUN.', 'JUL. - SET.', 'OCT. - DIC.'];

const generateExampleMonthlyData = (baseAmount: number): MonthlyData => {
  return MONTHS.reduce((acc, month, index) => {
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
  isTotal?: boolean;
}

const FinancialItemRow: React.FC<FinancialItemRowProps> = ({
  item,
  periodType,
  monthlyData,
  level = 0,
  isTotal = false
}) => {
  const quarterlyData = calculateQuarterlyData(monthlyData);
  const periods = periodType === 'months' ? MONTHS : QUARTERS;
  const data = periodType === 'months' ? monthlyData : quarterlyData;

  return (
    <>
      <tr className={`${level > 0 ? 'pl-' + (level * 4) : ''} ${isTotal ? 'font-bold bg-gray-50' : ''}`}>
        <td className={`px-4 py-2 ${level > 0 ? 'pl-8' : ''}`}>{item.name}</td>
        {periods.map((period) => (
          <td key={period} className="px-4 py-2 text-right">
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN',
              minimumFractionDigits: 2
            }).format(data[period] || 0)}
          </td>
        ))}
        <td className="px-4 py-2 text-right font-semibold bg-gray-50">
          {new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2
          }).format(item.amount)}
        </td>
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

const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ periodType }) => {
  // Datos de ejemplo basados en la estructura de Logifit
  const data = {
    companyName: 'LOGIFIT, SAC',
    period: 'Enero - diciembre 2024',
    income: [
      {
        id: '1',
        name: 'Ingresos',
        amount: 869657.53,
        children: [
          {
            id: '1.1',
            name: 'Sales',
            amount: 869657.53,
            children: [
              { id: '1.1.1', name: 'Banda de Somnolencia y Fatiga', amount: 221137.47 },
              { id: '1.1.2', name: 'SaaS', amount: 648520.06 }
            ]
          }
        ]
      }
    ],
    costOfSales: [
      {
        id: '2',
        name: 'Costo de las ventas',
        amount: 41186.88,
        children: [
          { id: '2.1', name: 'Cost of sales', amount: 41186.88 }
        ]
      }
    ],
    otherExpenses: [
      {
        id: '3',
        name: 'Otros gastos',
        amount: -0.10,
        children: [
          { id: '3.1', name: 'Ganancias o pérdidas no efectivas', amount: 0 },
          { id: '3.2', name: 'Exchange Gain or Loss', amount: -0.10 }
        ]
      }
    ]
  };

  const periods = periodType === 'months' ? MONTHS : QUARTERS;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold">{data.companyName}</h2>
        <h3 className="text-lg">Pérdidas y ganancias</h3>
        <p className="text-gray-600">{data.period}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Concepto</th>
              {periods.map((period) => (
                <th key={period} className="px-4 py-2 text-right">{period}</th>
              ))}
              <th className="px-4 py-2 text-right bg-gray-200">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {/* Ingresos */}
            {data.income.map((item) => (
              <FinancialItemRow
                key={item.id}
                item={item}
                periodType={periodType}
                monthlyData={generateExampleMonthlyData(item.amount)}
              />
            ))}

            {/* Beneficio Bruto */}
            <tr className="bg-green-50 font-bold">
              <td className="px-4 py-2">BENEFICIO BRUTO</td>
              {periods.map((period) => (
                <td key={period} className="px-4 py-2 text-right">
                  {new Intl.NumberFormat('es-PE', {
                    style: 'currency',
                    currency: 'PEN'
                  }).format(828470.65 / periods.length)}
                </td>
              ))}
              <td className="px-4 py-2 text-right bg-gray-50">
                {new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN'
                }).format(828470.65)}
              </td>
            </tr>

            {/* Costos de Ventas */}
            {data.costOfSales.map((item) => (
              <FinancialItemRow
                key={item.id}
                item={item}
                periodType={periodType}
                monthlyData={generateExampleMonthlyData(item.amount)}
              />
            ))}

            {/* Otros Gastos */}
            {data.otherExpenses.map((item) => (
              <FinancialItemRow
                key={item.id}
                item={item}
                periodType={periodType}
                monthlyData={generateExampleMonthlyData(item.amount)}
              />
            ))}

            {/* Ganancias Netas */}
            <tr className="bg-green-100 font-bold text-lg">
              <td className="px-4 py-3">GANANCIAS NETAS</td>
              {periods.map((period) => (
                <td key={period} className="px-4 py-3 text-right">
                  {new Intl.NumberFormat('es-PE', {
                    style: 'currency',
                    currency: 'PEN'
                  }).format(828470.75 / periods.length)}
                </td>
              ))}
              <td className="px-4 py-3 text-right bg-gray-50">
                {new Intl.NumberFormat('es-PE', {
                  style: 'currency',
                  currency: 'PEN'
                }).format(828470.75)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLossTable; 