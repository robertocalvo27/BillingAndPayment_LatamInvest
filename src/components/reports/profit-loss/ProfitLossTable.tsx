import React from 'react';
import { ProfitLossData, FinancialItem } from '../../../types/financial-statements';
import { formatCurrency } from '../../../utils/format';

interface ProfitLossTableProps {
  data: ProfitLossData;
}

const FinancialItemRow: React.FC<{
  item: FinancialItem;
  level?: number;
  isTotal?: boolean;
}> = ({ item, level = 0, isTotal = false }) => {
  const paddingLeft = `${level * 1.5}rem`;
  
  return (
    <>
      <tr className={isTotal ? 'font-bold bg-gray-50' : ''}>
        <td className="px-4 py-2" style={{ paddingLeft }}>
          {item.name}
        </td>
        <td className="px-4 py-2 text-right">
          {formatCurrency(item.amount)}
        </td>
      </tr>
      {item.children?.map((child) => (
        <FinancialItemRow
          key={child.id}
          item={child}
          level={level + 1}
        />
      ))}
    </>
  );
};

const ProfitLossTable: React.FC<ProfitLossTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-900">{data.companyName}</h2>
        <p className="text-sm text-gray-500">Pérdidas y ganancias</p>
        <p className="text-sm text-gray-500">{data.period}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Concepto
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Ingresos */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-2">Ingresos</td>
              <td></td>
            </tr>
            {data.income.map((item) => (
              <FinancialItemRow key={item.id} item={item} level={1} />
            ))}

            {/* Costo de ventas */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-2">Costo de las ventas</td>
              <td></td>
            </tr>
            {data.costOfSales.map((item) => (
              <FinancialItemRow key={item.id} item={item} level={1} />
            ))}

            {/* Beneficio bruto */}
            <tr className="bg-green-50 font-bold">
              <td className="px-4 py-2">BENEFICIO BRUTO</td>
              <td className="px-4 py-2 text-right">
                {formatCurrency(data.grossProfit)}
              </td>
            </tr>

            {/* Gastos operativos */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-4 py-2">Gastos</td>
              <td></td>
            </tr>
            {data.operatingExpenses.map((item) => (
              <FinancialItemRow key={item.id} item={item} level={1} />
            ))}

            {/* Otros gastos */}
            {data.otherExpenses.length > 0 && (
              <>
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-2">Otros gastos</td>
                  <td></td>
                </tr>
                {data.otherExpenses.map((item) => (
                  <FinancialItemRow key={item.id} item={item} level={1} />
                ))}
              </>
            )}

            {/* Ganancias netas */}
            <tr className="bg-green-100 font-bold text-lg">
              <td className="px-4 py-3">GANANCIAS NETAS</td>
              <td className="px-4 py-3 text-right">
                {formatCurrency(data.netIncome)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitLossTable; 