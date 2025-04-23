export type PeriodType = 'months' | 'quarters' | 'years';

export type AccountingMethod = 'cash' | 'accrual';

export type BusinessUnit = 'all' | 'logifit' | 'bizflow-tech' | 'logiflex';

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