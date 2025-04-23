export interface Report {
  id: string;
  title: string;
  category: 'general' | 'financial' | 'accounts';
  isFavorite: boolean;
  path: string;
  description?: string;
  icon?: string;
}

export interface ReportCategory {
  id: string;
  name: string;
  reports: Report[];
}

export interface ReportSection {
  title: string;
  reports: Report[];
} 