import React from 'react';
import { 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { DashboardStats } from '../../types';

interface DashboardSummaryProps {
  stats: DashboardStats;
}

const SummaryCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  iconBgColor: string;
}> = ({ title, value, icon, trend, iconBgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${iconBgColor}`}>{icon}</div>
        <div className="ml-5">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <div
            className={`flex items-center text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>{trend.value}%</span>
          </div>
          <span className="text-xs text-slate-500 ml-2">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Facturas"
        value={stats.totalInvoices}
        icon={<FileText className="h-6 w-6 text-white" />}
        iconBgColor="bg-blue-500"
        trend={{ value: 12, isPositive: true }}
      />
      
      <SummaryCard
        title="Facturas Cobradas"
        value={stats.invoicesPaid}
        icon={<CheckCircle className="h-6 w-6 text-white" />}
        iconBgColor="bg-green-500"
        trend={{ value: 8, isPositive: true }}
      />
      
      <SummaryCard
        title="Facturas Pendientes"
        value={stats.invoicesPending}
        icon={<Clock className="h-6 w-6 text-white" />}
        iconBgColor="bg-amber-500"
        trend={{ value: 3, isPositive: false }}
      />
      
      <SummaryCard
        title="Monto Total ($)"
        value={`$${stats.totalAmount.toFixed(2)}`}
        icon={<DollarSign className="h-6 w-6 text-white" />}
        iconBgColor="bg-indigo-500"
        trend={{ value: 15, isPositive: true }}
      />
      
      <SummaryCard
        title="Monto Cobrado ($)"
        value={`$${stats.paidAmount.toFixed(2)}`}
        icon={<DollarSign className="h-6 w-6 text-white" />}
        iconBgColor="bg-teal-500"
        trend={{ value: 10, isPositive: true }}
      />
      
      <SummaryCard
        title="Monto Pendiente ($)"
        value={`$${stats.pendingAmount.toFixed(2)}`}
        icon={<DollarSign className="h-6 w-6 text-white" />}
        iconBgColor="bg-red-500"
        trend={{ value: 5, isPositive: false }}
      />
    </div>
  );
};

export default DashboardSummary;