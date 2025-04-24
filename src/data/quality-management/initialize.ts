import { useQualityManagementStore } from '../../store/qualityManagementStore';
import { softwareDevelopmentDocs } from './documents/software-development';
import { projectManagementDocs } from './documents/project-management';
import { customerServiceDocs } from './documents/customer-service';
import { qualityAssuranceDocs } from './documents/quality-assurance';
import { resourceManagementDocs } from './documents/resource-management';
import { riskManagementDocs } from './documents/risk-management';
import { continuousImprovementDocs } from './documents/continuous-improvement';
import { QualityDocument } from '../../types/quality-management';
import { allMetrics } from './metrics/sample-metrics';

/**
 * Inicializa el store de gestión de calidad con los documentos predefinidos
 * Esta función debe llamarse durante la inicialización de la aplicación
 */
export function initializeQualityManagementData(): void {
  const store = useQualityManagementStore.getState();
  
  // Combinar todos los documentos de las diferentes categorías
  const allDocuments: QualityDocument[] = [
    ...softwareDevelopmentDocs,
    ...projectManagementDocs,
    ...customerServiceDocs,
    ...qualityAssuranceDocs,
    ...resourceManagementDocs,
    ...riskManagementDocs,
    ...continuousImprovementDocs,
    // Aquí se pueden agregar más documentos de otras categorías
  ];
  
  // Cargar los documentos en el store
  store.setDocuments(allDocuments);
  
  // Cargar las métricas en el store
  store.setMetrics(allMetrics);
  
  console.log('Store de gestión de calidad inicializado con', allDocuments.length, 'documentos y', allMetrics.length, 'métricas');
} 