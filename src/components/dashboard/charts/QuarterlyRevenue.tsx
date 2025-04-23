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

interface QuarterlyRevenueProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const QuarterlyRevenue: React.FC<QuarterlyRevenueProps> = ({ filters }) => {
  const data = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Facturación trimestral (Soles)',
        data: [221370.41, 154169.59, 242469.05, 150039.47],
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
        text: 'Facturación Trimestral',
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