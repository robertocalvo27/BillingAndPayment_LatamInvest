import React, { useState } from 'react';
import { useQualityManagementStore } from '../../store/qualityManagementStore';
import { Card } from '../common/Card';
import DocumentViewer from './DocumentViewer';
import {
  FileText,
  FolderOpen,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { ProcessCategory, DocumentType } from '../../types/quality-management';

const DocumentCategories: Record<ProcessCategory, { title: string; description: string }> = {
  software_development: {
    title: "Desarrollo de Software",
    description: "Procesos y estándares para el desarrollo de soluciones digitales"
  },
  project_management: {
    title: "Gestión de Proyectos",
    description: "Metodologías y procedimientos para la gestión de proyectos"
  },
  customer_service: {
    title: "Servicio al Cliente",
    description: "Protocolos y estándares de atención al cliente"
  },
  quality_assurance: {
    title: "Aseguramiento de Calidad",
    description: "Procedimientos y controles de calidad"
  },
  resource_management: {
    title: "Gestión de Recursos",
    description: "Administración de recursos humanos y materiales"
  },
  risk_management: {
    title: "Gestión de Riesgos",
    description: "Evaluación y mitigación de riesgos"
  },
  continuous_improvement: {
    title: "Mejora Continua",
    description: "Procesos de mejora y optimización"
  }
};

const DocumentTypes: Record<DocumentType, { title: string; description: string }> = {
  policy: {
    title: "Políticas",
    description: "Directrices y lineamientos organizacionales"
  },
  procedure: {
    title: "Procedimientos",
    description: "Pasos detallados para ejecutar procesos"
  },
  work_instruction: {
    title: "Instrucciones de Trabajo",
    description: "Guías específicas para tareas"
  },
  form: {
    title: "Formularios",
    description: "Documentos para registro de información"
  },
  record: {
    title: "Registros",
    description: "Evidencias de actividades realizadas"
  },
  manual: {
    title: "Manuales",
    description: "Documentación completa de sistemas o procesos"
  },
  document: {
    title: "Documentos",
    description: "Documentación general del sistema"
  }
};

const DocumentManagement: React.FC = () => {
  const { documents, documentFilters } = useQualityManagementStore();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProcessCategory | null>(null);

  // Obtener documentos filtrados por categoría "software_development"
  const softwareDevelopmentDocuments = documents.filter(
    doc => doc.category === 'software_development'
  );

  // Obtener documentos filtrados por categoría "project_management"
  const projectManagementDocuments = documents.filter(
    doc => doc.category === 'project_management'
  );

  // Otros filtros para el resto de categorías
  const customerServiceDocuments = documents.filter(
    doc => doc.category === 'customer_service'
  );

  const qualityAssuranceDocuments = documents.filter(
    doc => doc.category === 'quality_assurance'
  );

  const resourceManagementDocuments = documents.filter(
    doc => doc.category === 'resource_management'
  );

  const riskManagementDocuments = documents.filter(
    doc => doc.category === 'risk_management'
  );

  const continuousImprovementDocuments = documents.filter(
    doc => doc.category === 'continuous_improvement'
  );

  // Obtener documentos de la categoría seleccionada o todos si no hay categoría seleccionada
  const filteredDocuments = selectedCategory 
    ? documents.filter(doc => doc.category === selectedCategory)
    : [];

  // Función para manejar el clic en una categoría
  const handleCategoryClick = (category: ProcessCategory) => {
    setSelectedCategory(category);
  };

  const mandatoryDocs = [
    {
      code: "SGC-POL-001",
      title: "Política de Calidad",
      category: "quality_assurance",
      type: "policy",
      description: "Política de calidad de Bizflow enfocada en soluciones tecnológicas ágiles y de alto impacto"
    },
    {
      code: "SGC-MAN-001",
      title: "Manual de Calidad",
      category: "quality_assurance",
      type: "manual",
      description: "Manual del Sistema de Gestión de Calidad ISO 9001:2015"
    },
    {
      code: "SGC-PRO-001",
      title: "Control de Documentos y Registros",
      category: "quality_assurance",
      type: "procedure",
      description: "Procedimiento para el control de documentos y registros del SGC"
    },
    {
      code: "SGC-PRO-002",
      title: "Auditorías Internas",
      category: "quality_assurance",
      type: "procedure",
      description: "Procedimiento para la realización de auditorías internas"
    },
    {
      code: "SGC-PRO-003",
      title: "Gestión de Riesgos y Oportunidades",
      category: "risk_management",
      type: "procedure",
      description: "Procedimiento para la gestión de riesgos y oportunidades"
    }
  ];

  // Función para generar una lista de elementos de documento
  const renderDocumentItems = (documents: any[]) => {
    if (documents.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          No hay documentos en esta categoría
        </div>
      );
    }

    return documents.map(doc => (
      <div 
        key={doc.id} 
        className="border-b border-gray-100 py-4 hover:bg-gray-50 cursor-pointer"
        onClick={() => setSelectedDocument(doc.id)}
      >
        <div className="flex items-start">
          <div className="text-primary-600 mr-4">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-gray-500 mr-2">{doc.id}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Aprobado
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mt-1">{doc.title}</h3>
              </div>
              <div className="text-xs text-right">
                <p className="text-gray-900">Rev. {doc.revision}</p>
                <p className="text-gray-500">Actualizado: {doc.updatedAt}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1 truncate">{doc.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  if (selectedDocument) {
    return <DocumentViewer documentCode={selectedDocument} onBack={() => setSelectedDocument(null)} />;
  }

  // Si hay una categoría seleccionada, mostrar los documentos de esa categoría
  if (selectedCategory) {
    const categoryName = DocumentCategories[selectedCategory].title;
    const categoryDocuments = documents.filter(doc => doc.category === selectedCategory);
    
    return (
      <div className="space-y-6">
        {/* Cabecera con botón para volver */}
        <div className="flex items-center mb-4">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a categorías
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{categoryName}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {DocumentCategories[selectedCategory].description}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn btn-primary flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Documento
            </button>
          </div>
        </div>
        
        {/* Barra de búsqueda */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Buscar en ${categoryName}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Ordenar
          </button>
        </div>
        
        {/* Lista de documentos */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-start">
              <FileText className="w-5 h-5 mr-2 mt-0.5" />
              Documentos de {categoryName}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({categoryDocuments.length} {categoryDocuments.length === 1 ? 'documento' : 'documentos'})
              </span>
            </h3>
            <div>
              {renderDocumentItems(categoryDocuments)}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Vista principal con categorías
  return (
    <div className="space-y-6">
      {/* Sección de documentos obligatorios */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Documentos Obligatorios del SGC</h3>
          <div>
            {renderDocumentItems(mandatoryDocs.map(doc => ({ 
              ...doc, 
              id: doc.code, 
              updatedAt: '2024-03-01' 
            })))}
          </div>
        </div>
      </Card>
      
      {/* Categorías de documentos */}
      <h3 className="text-lg font-semibold">Categorías de Documentos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(DocumentCategories).map(([key, category]) => {
          const categoryKey = key as ProcessCategory;
          const count = documents.filter(doc => doc.category === categoryKey).length;
          
          return (
            <Card key={key} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleCategoryClick(categoryKey)}>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FolderOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {count} {count === 1 ? 'documento' : 'documentos'}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mt-4">{category.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentManagement; 