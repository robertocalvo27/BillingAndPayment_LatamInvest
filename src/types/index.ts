export interface Invoice {
  id: number;
  usuario: string;
  ruc: string;
  direccion: string;
  telefono: string;
  nombreProducto: string;
  detalle: string;
  cantidad: number;
  precioUnitario: number;
  noBandas: number | null;
  bandas: number | null;
  servicios: number | null;
  otros: number | null;
  subtotal: number;
  igv: number;
  total: number;
  totalSoles: number;
  moneda: 'DÓLARES' | 'SOLES';
  periodo: string;
  mes: string;
  anio: number;
  estado: InvoiceStatus;
  ocOs: string;
  term: number;
  tc: number;
  fechaFact: string;
  fechaFactMonth: string;
  fechaRegistro: string;
  dueDate: string;
  fechaRealPago: string | null;
  vencimientoDias: number | null;
  diasRealPago: number | null;
  cobroParcial: number | null;
  saldo: number | null;
  noFactura: string;
  estatusFactura: string;
  observaciones: string;
  seguimiento: string;
  fechaInicial: string | null;
  fechaFinal: string | null;
  validacionClienteDias: number | null;
  fechaEspDet: string | null;
  fechaRealDet: string | null;
  codOperacion: string | null;
  montoEsperDetra: number | null;
  montoRealDepo: number | null;
  estadoDetraccion: string | null;
  aplicaComision: boolean;
  nombreVendedor: string | null;
  montoComision: number | null;
  fechaPago: string | null;
  numeroOperacion: string | null;
  periodoPagoDias: number | null;
  vencimiento: number | null;
}

export type InvoiceStatus = 
  | '04- VIGENTE'
  | '05- OBSERVADA'
  | '06- ENVIADA A VALORIZACION'
  | '07- VALORIZACION APROBADO'
  | '08- FACTURA EMITIDA'
  | '09- FACTURA REGISTRADA'
  | '10- COBRADO'
  | '11- CANCELADA'
  | '12-FACTORING';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface DashboardStats {
  totalInvoices: number;
  invoicesPaid: number;
  invoicesPending: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
}