import { QualityDocument } from '../../../types/quality-management';

// Documentos para la categoría "Gestión de Recursos"
export const resourceManagementDocs: QualityDocument[] = [
  {
    id: 'SGC-RH-001',
    title: 'Procedimiento de Gestión de Capacidades y Competencias',
    type: 'procedure',
    category: 'resource_management',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-05-05',
    description: 'Establece la metodología para identificar, desarrollar y mantener las capacidades y competencias técnicas del personal, asegurando el talento necesario para entregar soluciones de software de alta calidad.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-RH-002',
    title: 'Procedimiento de Gestión de Asignación de Recursos a Proyectos',
    type: 'procedure',
    category: 'resource_management',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-05-05',
    description: 'Establece la metodología para la planificación, asignación y seguimiento de recursos humanos a los proyectos de desarrollo de software, asegurando una distribución óptima del talento técnico.',
    content: '' // El contenido se cargará desde el archivo Markdown
  },
  {
    id: 'SGC-RH-003',
    title: 'Procedimiento de Gestión del Ambiente de Trabajo',
    type: 'procedure',
    category: 'resource_management',
    status: 'approved',
    revision: '1',
    updatedAt: '2024-05-05',
    description: 'Establece las directrices para la gestión del ambiente de trabajo, garantizando condiciones óptimas para el desarrollo de software que promuevan la productividad, bienestar y eficiencia del equipo técnico.',
    content: '' // El contenido se cargará desde el archivo Markdown
  }
];

export default resourceManagementDocs; 