import { create } from 'zustand';
import {
  QualityDocument,
  QualityMetric,
  QualityObjective,
  AuditRecord,
  RiskAssessment,
  TrainingRecord,
  CustomerFeedback
} from '../types/quality-management';

interface QualityManagementState {
  // Document Management
  documents: QualityDocument[];
  activeDocument: QualityDocument | null;
  documentFilters: {
    status: string[];
    type: string[];
    category: string[];
  };
  
  // Metrics and Objectives
  metrics: QualityMetric[];
  objectives: QualityObjective[];
  
  // Audits and Findings
  audits: AuditRecord[];
  upcomingAudits: AuditRecord[];
  
  // Risk Management
  risks: RiskAssessment[];
  criticalRisks: RiskAssessment[];
  
  // Training
  trainingRecords: TrainingRecord[];
  upcomingTraining: TrainingRecord[];
  
  // Customer Feedback
  feedback: CustomerFeedback[];
  openFeedback: CustomerFeedback[];
  
  // Actions
  setDocuments: (documents: QualityDocument[]) => void;
  setActiveDocument: (document: QualityDocument | null) => void;
  setDocumentFilters: (filters: typeof QualityManagementState.prototype.documentFilters) => void;
  addDocument: (document: QualityDocument) => void;
  updateDocument: (id: string, updates: Partial<QualityDocument>) => void;
  deleteDocument: (id: string) => void;
  
  setMetrics: (metrics: QualityMetric[]) => void;
  addMetric: (metric: QualityMetric) => void;
  updateMetric: (id: string, updates: Partial<QualityMetric>) => void;
  
  setObjectives: (objectives: QualityObjective[]) => void;
  addObjective: (objective: QualityObjective) => void;
  updateObjective: (id: string, updates: Partial<QualityObjective>) => void;
  
  setAudits: (audits: AuditRecord[]) => void;
  addAudit: (audit: AuditRecord) => void;
  updateAudit: (id: string, updates: Partial<AuditRecord>) => void;
  
  setRisks: (risks: RiskAssessment[]) => void;
  addRisk: (risk: RiskAssessment) => void;
  updateRisk: (id: string, updates: Partial<RiskAssessment>) => void;
  
  setTrainingRecords: (records: TrainingRecord[]) => void;
  addTrainingRecord: (record: TrainingRecord) => void;
  updateTrainingRecord: (id: string, updates: Partial<TrainingRecord>) => void;
  
  setFeedback: (feedback: CustomerFeedback[]) => void;
  addFeedback: (feedback: CustomerFeedback) => void;
  updateFeedback: (id: string, updates: Partial<CustomerFeedback>) => void;
}

export const useQualityManagementStore = create<QualityManagementState>((set) => ({
  // Initial State
  documents: [],
  activeDocument: null,
  documentFilters: {
    status: [],
    type: [],
    category: [],
  },
  metrics: [],
  objectives: [],
  audits: [],
  upcomingAudits: [],
  risks: [],
  criticalRisks: [],
  trainingRecords: [],
  upcomingTraining: [],
  feedback: [],
  openFeedback: [],

  // Document Actions
  setDocuments: (documents) => set({ documents }),
  setActiveDocument: (activeDocument) => set({ activeDocument }),
  setDocumentFilters: (documentFilters) => set({ documentFilters }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  updateDocument: (id, updates) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    })),
  deleteDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),

  // Metrics Actions
  setMetrics: (metrics) => set({ metrics }),
  addMetric: (metric) =>
    set((state) => ({ metrics: [...state.metrics, metric] })),
  updateMetric: (id, updates) =>
    set((state) => ({
      metrics: state.metrics.map((metric) =>
        metric.id === id ? { ...metric, ...updates } : metric
      ),
    })),

  // Objectives Actions
  setObjectives: (objectives) => set({ objectives }),
  addObjective: (objective) =>
    set((state) => ({ objectives: [...state.objectives, objective] })),
  updateObjective: (id, updates) =>
    set((state) => ({
      objectives: state.objectives.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    })),

  // Audit Actions
  setAudits: (audits) => set({ audits }),
  addAudit: (audit) =>
    set((state) => ({ audits: [...state.audits, audit] })),
  updateAudit: (id, updates) =>
    set((state) => ({
      audits: state.audits.map((audit) =>
        audit.id === id ? { ...audit, ...updates } : audit
      ),
    })),

  // Risk Actions
  setRisks: (risks) => set({ risks }),
  addRisk: (risk) =>
    set((state) => ({ risks: [...state.risks, risk] })),
  updateRisk: (id, updates) =>
    set((state) => ({
      risks: state.risks.map((risk) =>
        risk.id === id ? { ...risk, ...updates } : risk
      ),
    })),

  // Training Actions
  setTrainingRecords: (trainingRecords) => set({ trainingRecords }),
  addTrainingRecord: (record) =>
    set((state) => ({
      trainingRecords: [...state.trainingRecords, record],
    })),
  updateTrainingRecord: (id, updates) =>
    set((state) => ({
      trainingRecords: state.trainingRecords.map((record) =>
        record.id === id ? { ...record, ...updates } : record
      ),
    })),

  // Feedback Actions
  setFeedback: (feedback) => set({ feedback }),
  addFeedback: (feedback) =>
    set((state) => ({
      feedback: [...state.feedback, feedback],
    })),
  updateFeedback: (id, updates) =>
    set((state) => ({
      feedback: state.feedback.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),
})); 