import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BusinessUnit } from '../../../types/financial-statements';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface ServiceDistributionProps {
  filters: {
    period: {
      startDate: string;
      endDate: string;
    };
    businessUnit: BusinessUnit;
  };
}

export const ServiceDistribution: React.FC<ServiceDistributionProps> = ({ filters }) => {
  const data = {
    labels: ['Servicios Complementarios', 'Suscripciones', 'Suma total'],
    datasets: [
      {
        data: [26, 24, 50],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(234, 179, 8)',
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
        text: 'Distribución de Ventas por Tipo de Servicio',
      },
    },
    cutout: '50%',
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}; 