import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BusinessUnit } from '../../../types/financial-statements';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesTargetProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const SalesTarget: React.FC<SalesTargetProps> = ({ filters }) => {
  const data = {
    labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    datasets: [
      {
        label: 'Total Proyectado',
        data: [50000, 35000, 35000, 40000, 55000, 75000, 55000, 75000, 90000, 85000, 95000, 100000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Total Real',
        data: [55000, 115000, 80000, 35000, 50000, 55000, 85000, 80000, 35000, 80000, 90000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
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
        text: 'Cumplimiento Plan de Ventas',
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
      <Line options={options} data={data} />
    </div>
  );
}; 