import { useQualityManagementStore } from '../../store/qualityManagementStore';
import { softwareDevelopmentDocs } from './documents/software-development';
import { projectManagementDocs } from './documents/project-management';
import { QualityDocument } from '../../types/quality-management';

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
    // Aquí se pueden agregar más documentos de otras categorías
  ];
  
  // Cargar los documentos en el store
  store.setDocuments(allDocuments);
  
  console.log('Store de gestión de calidad inicializado con', allDocuments.length, 'documentos');
} 