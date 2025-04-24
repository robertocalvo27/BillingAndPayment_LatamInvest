export type DocumentStatus = 'draft' | 'review' | 'approved' | 'obsolete' | 'pending';

export type DocumentType = 
  | 'policy'
  | 'procedure'
  | 'work_instruction'
  | 'form'
  | 'record'
  | 'manual';

export type ProcessCategory =
  | 'software_development'
  | 'project_management'
  | 'customer_service'
  | 'quality_assurance'
  | 'resource_management'
  | 'risk_management'
  | 'continuous_improvement';

export interface QualityDocument {
  id: string;
  title: string;
  type: DocumentType;
  category: ProcessCategory;
  status: DocumentStatus;
  revision: string | number;
  updatedAt: string;
  description: string;
  content: string;
}

export interface VersionHistory {
  version: string;
  date: string;
  author: string;
  description: string;
}

export interface DocumentChange {
  version: string;
  date: string;
  author: string;
  description: string;
}

export interface QualityMetric {
  id: string;
  name: string;
  description: string;
  category: ProcessCategory;
  target: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  responsible: string;
  currentValue?: number;
  history: MetricHistory[];
}

export interface MetricHistory {
  date: string;
  value: number;
  notes?: string;
}

export interface QualityObjective {
  id: string;
  description: string;
  category: ProcessCategory;
  target: string;
  metrics: string[];
  startDate: string;
  endDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  progress: number;
}

export interface AuditRecord {
  id: string;
  type: 'internal' | 'external';
  date: string;
  auditor: string;
  scope: string;
  findings: AuditFinding[];
  status: 'planned' | 'in_progress' | 'completed';
  nextAuditDate: string;
}

export interface AuditFinding {
  id: string;
  type: 'nonconformity' | 'observation' | 'opportunity';
  description: string;
  process: ProcessCategory;
  status: 'open' | 'in_progress' | 'closed';
  correctiveAction?: string;
  dueDate: string;
  closedDate?: string;
}

export interface RiskAssessment {
  id: string;
  process: ProcessCategory;
  description: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  mitigationPlan: string;
  responsible: string;
  status: 'identified' | 'assessed' | 'mitigated' | 'monitored';
  reviewDate: string;
}

export interface TrainingRecord {
  id: string;
  title: string;
  description: string;
  type: 'induction' | 'technical' | 'quality' | 'security' | 'process';
  participants: string[];
  trainer: string;
  date: string;
  duration: number;
  materials: string[];
  evaluationResults?: {
    participantId: string;
    score: number;
    passed: boolean;
  }[];
}

export interface CustomerFeedback {
  id: string;
  customerId: string;
  projectId: string;
  date: string;
  type: 'satisfaction_survey' | 'complaint' | 'suggestion' | 'praise';
  category: ProcessCategory;
  description: string;
  rating?: number;
  status: 'received' | 'under_review' | 'in_progress' | 'resolved' | 'closed';
  response?: string;
  actionTaken?: string;
  closedDate?: string;
} 