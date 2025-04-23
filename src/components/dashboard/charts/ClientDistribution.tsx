import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BusinessUnit } from '../../../types/financial-statements';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ClientDistributionProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const ClientDistribution: React.FC<ClientDistributionProps> = ({ filters }) => {
  const data = {
    labels: ['GYM CONCENTRADORA', 'HV CONTRATISTAS S.A.', 'CUMBRIA INGENIERIA', 'OPERADORA SURPERU S.A.'],
    datasets: [
      {
        data: [75.2, 10.8, 8.5, 5.5],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(234, 179, 8)',
          'rgb(34, 197, 94)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Distribución de Ventas por Cliente',
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
}; 