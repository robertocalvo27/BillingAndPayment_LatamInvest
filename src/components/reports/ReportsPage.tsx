import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Report, ReportSection } from '../../types/reports';
import ReportList from './ReportList';
import { ChartBarIcon, DocumentTextIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const defaultReports: Report[] = [
  {
    id: 'balance-general',
    title: 'Balance general',
    category: 'financial',
    isFavorite: true,
    path: '/reports/balance',
    icon: '📊'
  },
  {
    id: 'perdidas-ganancias',
    title: 'Pérdidas y ganancias',
    category: 'financial',
    isFavorite: true,
    path: '/reports/profit-loss',
    icon: '💰'
  },
  {
    id: 'antiguedad-cuentas',
    title: 'Resumen de antigüedad de las cuentas por cobrar',
    category: 'accounts',
    isFavorite: true,
    path: '/reports/accounts-aging',
    icon: '📅'
  },
  {
    id: 'perdidas-mes',
    title: 'Pérdidas y ganancias por mes',
    category: 'financial',
    isFavorite: false,
    path: '/reports/monthly-pyl',
    icon: '📈'
  },
  {
    id: 'porcentaje-pyl',
    title: 'Porcentaje de pérdidas y ganancias del ingreso total',
    category: 'financial',
    isFavorite: false,
    path: '/reports/pyl-percentage',
    icon: '📊'
  }
];

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>(defaultReports);

  const toggleFavorite = useCallback((reportId: string) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, isFavorite: !report.isFavorite }
          : report
      )
    );
  }, []);

  const handleSelectReport = useCallback((report: Report) => {
    navigate(report.path);
  }, [navigate]);

  const sections: ReportSection[] = [
    {
      title: 'Favoritos',
      reports: reports.filter((r) => r.isFavorite),
    },
    {
      title: 'Información general de la empresa',
      reports: reports.filter((r) => r.category === 'general'),
    },
    {
      title: 'Quién te debe',
      reports: reports.filter((r) => r.category === 'accounts'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Informes</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Informes estándar
          </button>
          <button className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Personalizar informes
          </button>
          <button className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            Informes de gerencia
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4">
            <input
              type="text"
              placeholder="Escribe aquí el nombre del informe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <ReportList
            sections={sections}
            onToggleFavorite={toggleFavorite}
            onSelectReport={handleSelectReport}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 