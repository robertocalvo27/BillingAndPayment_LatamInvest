import { QualityDocument } from '../../../types/quality-management';

// Documentos para la categoría "Aseguramiento de Calidad"
export const qualityAssuranceDocs: QualityDocument[] = [
  {
    id: 'SGC-QA-001',
    title: 'Procedimiento de Gestión de No Conformidades',
    type: 'procedure',
    category: 'quality_assurance',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-10',
    description: 'Establece el método para identificar, registrar, analizar y gestionar las no conformidades detectadas en el Sistema de Gestión de Calidad.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-QA-002',
    title: 'Procedimiento de Auditorías Internas',
    type: 'procedure',
    category: 'quality_assurance',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-12',
    description: 'Establece la metodología para planificar, ejecutar y documentar las auditorías internas del Sistema de Gestión de Calidad.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-QA-003',
    title: 'Procedimiento de Control y Validación de Herramientas de Software',
    type: 'procedure',
    category: 'quality_assurance',
    status: 'approved',
    revision: '2',
    updatedAt: '2024-05-01',
    description: 'Establece la metodología para el control, mantenimiento y validación de las herramientas de software utilizadas en los procesos críticos de desarrollo, pruebas y monitoreo.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-QA-004',
    title: 'Procedimiento de Revisión por la Dirección',
    type: 'procedure',
    category: 'quality_assurance',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-18',
    description: 'Establece la metodología para realizar la revisión del Sistema de Gestión de Calidad por parte de la Alta Dirección.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-QA-005',
    title: 'Procedimiento de Gestión de Mejora Continua',
    type: 'procedure',
    category: 'quality_assurance',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-04-20',
    description: 'Establece la metodología para identificar, planificar, implementar y evaluar acciones de mejora continua en el Sistema de Gestión de Calidad.',
    content: '' // El contenido se cargará desde el archivo Markdown
  }
];

export default qualityAssuranceDocs; 