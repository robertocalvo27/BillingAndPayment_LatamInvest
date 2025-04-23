import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

interface MonthlyRevenueProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const MonthlyRevenue: React.FC<MonthlyRevenueProps> = ({ filters }) => {
  // Datos de ejemplo basados en la imagen
  const data = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'Facturación mensual (Soles)',
        data: [78324.26, 28829.79, 114216.36, 33072.43, 76590.07, 44507.09, 69501.05, 14876.63, 158091.37, 37492.60, 112546.87],
        backgroundColor: 'rgb(59, 130, 246)',
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
        text: 'Facturación Mensual',
      },
    },
    scales: {
      y: {
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