import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BusinessUnit } from '../../../types/financial-statements';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyByClientProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const MonthlyByClient: React.FC<MonthlyByClientProps> = ({ filters }) => {
  const data = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'GYM CONCENTRADORA',
        data: [100000, 75000, 25000, 30000, 50000, 100000, 60000, 110000, 30000, 80000, 75000],
        backgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'HV CONTRATISTAS S.A.',
        data: [20000, 15000, 0, 0, 0, 10000, 0, 15000, 0, 10000, 0],
        backgroundColor: 'rgb(239, 68, 68)',
      },
      {
        label: 'CUMBRIA INGENIERIA',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 20000, 0],
        backgroundColor: 'rgb(234, 179, 8)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Facturación Mensual por Cliente',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: function(value: string | number) {
            if (typeof value === 'number') {
              return 'S/ ' + value.toLocaleString('es-PE');
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}; 