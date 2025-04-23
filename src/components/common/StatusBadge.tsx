import React from 'react';
import { InvoiceStatus } from '../../types';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case '04- VIGENTE':
        return 'bg-blue-50 text-blue-700';
      case '05- OBSERVADA':
        return 'bg-amber-50 text-amber-700';
      case '06- ENVIADA A VALORIZACION':
        return 'bg-indigo-50 text-indigo-700';
      case '07- VALORIZACION APROBADO':
        return 'bg-purple-50 text-purple-700';
      case '08- FACTURA EMITIDA':
        return 'bg-sky-50 text-sky-700';
      case '09- FACTURA REGISTRADA':
        return 'bg-teal-50 text-teal-700';
      case '10- COBRADO':
        return 'bg-green-50 text-green-700';
      case '11- CANCELADA':
        return 'bg-red-50 text-red-700';
      case '12-FACTORING':
        return 'bg-violet-50 text-violet-700';
      default:
        return 'bg-slate-50 text-slate-700';
    }
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getStatusColor(status),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;