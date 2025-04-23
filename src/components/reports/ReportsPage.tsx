import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Report, ReportSection } from '../../types/reports';
import ReportList from './ReportList';
import { ChartBarIcon, DocumentTextIcon, CalculatorIcon } from '@heroicons/react/24/outline';

const defaultReports: Report[] = [
  {
    id: 'dashboard-financiero',
    title: 'Dashboard Financiero',
    category: 'financial',
    isFavorite: true,
    path: '/reports/financial-dashboard',
    icon: '📊'
  },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Reportes</h1>
        <p className="mt-2 text-sm text-slate-500">
          Accede a todos los reportes financieros y de gestión
        </p>
      </div>

      <ReportList
        sections={sections}
        onToggleFavorite={toggleFavorite}
        onSelectReport={handleSelectReport}
      />
    </div>
  );
};

export default ReportsPage; 