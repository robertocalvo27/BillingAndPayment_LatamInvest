import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';
import PaymentsPage from './pages/PaymentsPage';
import ReportsPage from './components/reports/ReportsPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'invoices',
        element: <InvoicesPage />,
      },
      {
        path: 'invoices/:id',
        element: <InvoiceDetailPage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: '*',
        element: <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-slate-900">Página no encontrada</h1>
          <p className="mt-4 text-slate-500">La página que estás buscando no existe.</p>
        </div>,
      }
    ],
  },
];

export const router = createBrowserRouter(routes);