export type PeriodType = 'months' | 'quarters' | 'years';

export type AccountingMethod = 'cash' | 'accrual';

export type BusinessUnit = 'all' | 'logifit' | 'bizflow-tech' | 'logiflex';

export type Country = 'all' | 'peru' | 'chile' | 'costa-rica' | 'panama' | 'otros';

export type Currency = 'USD' | 'PEN' | 'CLP' | 'CRC' | 'PAB';

export type DatePreset = 
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'this-month'
  | 'year-to-date'
  | 'custom';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ProfitLossFilters {
  period: DateRange;
  showColumns: PeriodType;
  showOnlyWithValue: boolean;
  compareWithPeriod?: DateRange;
  accountingMethod: AccountingMethod;
  showNonCashItems: boolean;
  businessUnit: BusinessUnit;
}

export interface FinancialItem {
  id: string;
  name: string;
  amount: number;
  children?: FinancialItem[];
}

export interface ProfitLossData {
  companyName: string;
  period: string;
  income: FinancialItem[];
  costOfSales: FinancialItem[];
  grossProfit: number;
  operatingExpenses: FinancialItem[];
  otherExpenses: FinancialItem[];
  netIncome: number;
}

export interface MonthlyData {
  [key: string]: {
    income: { [key: string]: number };
    costOfSales: { [key: string]: number };
    expenses: { [key: string]: number };
    otherExpenses: { [key: string]: number };
  };
}

export interface Period {
  startDate: string;
  endDate: string;
  preset?: DatePreset;
}

export interface DashboardFiltersState {
  period: Period;
  businessUnit: BusinessUnit;
  country: Country;
  currency: Currency;
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  PEN: 'S/',
  CLP: 'CLP$',
  CRC: '₡',
  PAB: 'B/.'
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: 'Dólar Americano',
  PEN: 'Sol Peruano',
  CLP: 'Peso Chileno',
  CRC: 'Colón Costarricense',
  PAB: 'Balboa Panameño'
}; 